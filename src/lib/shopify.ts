const domain = process.env.SHOPIFY_STORE_DOMAIN ?? "0ws15g-k8.myshopify.com";
// Optional: product and collection data can be read tokenlessly.
const token = process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN;
const apiVersion = process.env.SHOPIFY_API_VERSION ?? "2026-07";

// Shopify collection handles that feed each section of the collection page.
const SIGNATURE_HANDLE =
  process.env.SHOPIFY_SIGNATURE_COLLECTION ?? "signature-collection";
const EVERYDAY_HANDLE =
  process.env.SHOPIFY_EVERYDAY_COLLECTION ?? "everyday-classics";

// Re-fetch product data from Shopify at most every 5 minutes.
const REVALIDATE_SECONDS = 300;

export type Product = {
  id: string;
  name: string;
  image: string;
  images: { url: string; alt: string }[];
  price: number;
  // Pre-discount price ("Compare-at price" in Shopify), when the product is on sale.
  originalPrice?: number;
  currency: string;
  summary: string;
  descriptionHtml: string;
};

type ShopifyProductNode = {
  handle: string;
  title: string;
  description: string;
  descriptionHtml: string;
  featuredImage: { url: string } | null;
  images: { nodes: { url: string; altText: string | null }[] };
  priceRange: { minVariantPrice: { amount: string; currencyCode: string } };
  compareAtPriceRange: { minVariantPrice: { amount: string } };
};

const PRODUCT_FIELDS = `
  handle
  title
  description
  descriptionHtml
  featuredImage { url }
  images(first: 10) { nodes { url altText } }
  priceRange { minVariantPrice { amount currencyCode } }
  compareAtPriceRange { minVariantPrice { amount } }
`;

async function shopifyFetch<T>(
  query: string,
  variables: Record<string, unknown> = {}
): Promise<T> {
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };
  if (token) headers["X-Shopify-Storefront-Access-Token"] = token;

  const res = await fetch(
    `https://${domain}/api/${apiVersion}/graphql.json`,
    {
      method: "POST",
      headers,
      body: JSON.stringify({ query, variables }),
      cache: "force-cache",
      next: { revalidate: REVALIDATE_SECONDS, tags: ["shopify"] },
    }
  );

  const json = await res.json();
  if (!res.ok || json.errors) {
    throw new Error(
      `Shopify request failed (${res.status}): ${JSON.stringify(json.errors ?? json)}`
    );
  }
  return json.data as T;
}

// Card text: the first paragraph of the description, trimmed to a sentence or two.
function toSummary(node: ShopifyProductNode) {
  const firstParagraph = node.descriptionHtml.match(/<p>([\s\S]*?)<\/p>/)?.[1];
  const text = (firstParagraph ?? node.description)
    .replace(/<[^>]+>/g, "")
    .replace(/\s+/g, " ")
    .trim();
  if (text.length <= 160) return text;
  return `${text.slice(0, 160).replace(/\s+\S*$/, "")}…`;
}

function toProduct(node: ShopifyProductNode): Product {
  const { amount, currencyCode } = node.priceRange.minVariantPrice;
  const price = Number(amount);
  const compareAt = Number(node.compareAtPriceRange.minVariantPrice.amount);
  return {
    id: node.handle,
    name: node.title,
    image: node.featuredImage?.url ?? "/images/hero-watch.jpg",
    images: node.images.nodes.map((image) => ({
      url: image.url,
      alt: image.altText ?? node.title,
    })),
    price,
    originalPrice: compareAt > price ? compareAt : undefined,
    currency: currencyCode,
    summary: toSummary(node),
    descriptionHtml: node.descriptionHtml,
  };
}

async function getCollectionProducts(handle: string): Promise<Product[]> {
  const data = await shopifyFetch<{
    collection: { products: { nodes: ShopifyProductNode[] } } | null;
  }>(
    `query CollectionProducts($handle: String!) {
      collection(handle: $handle) {
        products(first: 100) { nodes { ${PRODUCT_FIELDS} } }
      }
    }`,
    { handle }
  );

  return (data.collection?.products.nodes ?? []).map(toProduct);
}

export async function getAllProducts(): Promise<Product[]> {
  const data = await shopifyFetch<{
    products: { nodes: ShopifyProductNode[] };
  }>(
    `query AllProducts {
      products(first: 250, sortKey: CREATED_AT, reverse: true) {
        nodes { ${PRODUCT_FIELDS} }
      }
    }`
  );

  return data.products.nodes.map(toProduct);
}

export async function getProduct(handle: string): Promise<Product | null> {
  const data = await shopifyFetch<{ product: ShopifyProductNode | null }>(
    `query Product($handle: String!) {
      product(handle: $handle) { ${PRODUCT_FIELDS} }
    }`,
    { handle }
  );

  return data.product ? toProduct(data.product) : null;
}

// Until the signature/everyday collections exist in Shopify, show every
// product under the signature section so the page is never empty.
export async function getCollectionSections() {
  const [signature, everyday] = await Promise.all([
    getCollectionProducts(SIGNATURE_HANDLE),
    getCollectionProducts(EVERYDAY_HANDLE),
  ]);

  if (signature.length === 0 && everyday.length === 0) {
    return { signature: await getAllProducts(), everyday: [] };
  }
  return { signature, everyday };
}

export function formatAmount(product: Product, amount: number) {
  return `${product.currency} ${amount.toLocaleString()}`;
}

export function formatPrice(product: Product) {
  return formatAmount(product, product.price);
}

export function discountPercent(product: Product) {
  if (!product.originalPrice) return 0;
  return Math.round((1 - product.price / product.originalPrice) * 100);
}
