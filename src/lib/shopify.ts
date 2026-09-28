import {
  signatureCollection as fallbackSignature,
  everydayClassics as fallbackEveryday,
  type CollectionProduct,
} from "@/data/collection";

const domain = process.env.SHOPIFY_STORE_DOMAIN;
const token = process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN;
const apiVersion = process.env.SHOPIFY_API_VERSION ?? "2026-07";

// Shopify collection handles that feed each section of the site.
export const SIGNATURE_HANDLE =
  process.env.SHOPIFY_SIGNATURE_COLLECTION ?? "signature-collection";
export const EVERYDAY_HANDLE =
  process.env.SHOPIFY_EVERYDAY_COLLECTION ?? "everyday-classics";

// Re-fetch product data from Shopify at most every 5 minutes.
const REVALIDATE_SECONDS = 300;

export const isShopifyConfigured = Boolean(domain && token);

type ShopifyProductNode = {
  handle: string;
  title: string;
  description: string;
  featuredImage: { url: string; altText: string | null } | null;
  priceRange: { minVariantPrice: { amount: string; currencyCode: string } };
};

const PRODUCT_FIELDS = `
  handle
  title
  description
  featuredImage { url altText }
  priceRange { minVariantPrice { amount currencyCode } }
`;

async function shopifyFetch<T>(
  query: string,
  variables: Record<string, unknown> = {}
): Promise<T> {
  const res = await fetch(
    `https://${domain}/api/${apiVersion}/graphql.json`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Shopify-Storefront-Access-Token": token!,
      },
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

function toProduct(
  node: ShopifyProductNode,
  category: CollectionProduct["category"]
): CollectionProduct {
  const { amount, currencyCode } = node.priceRange.minVariantPrice;
  return {
    id: node.handle,
    name: node.title,
    image: node.featuredImage?.url ?? "/images/hero-watch.jpg",
    price: Number(amount),
    currency: currencyCode,
    description: node.description,
    category,
  };
}

export async function getCollectionProducts(
  handle: string,
  category: CollectionProduct["category"]
): Promise<CollectionProduct[]> {
  if (!isShopifyConfigured) {
    return category === "Signature Collection"
      ? fallbackSignature
      : fallbackEveryday;
  }

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

  return (data.collection?.products.nodes ?? []).map((node) =>
    toProduct(node, category)
  );
}

export async function getSignatureCollection() {
  return getCollectionProducts(SIGNATURE_HANDLE, "Signature Collection");
}

export async function getEverydayClassics() {
  return getCollectionProducts(EVERYDAY_HANDLE, "Everyday Classics");
}

export async function getAllProducts(): Promise<CollectionProduct[]> {
  const [signature, everyday] = await Promise.all([
    getSignatureCollection(),
    getEverydayClassics(),
  ]);

  // A product can sit in both collections; show it once.
  const seen = new Set<string>();
  return [...signature, ...everyday].filter((product) => {
    if (seen.has(product.id)) return false;
    seen.add(product.id);
    return true;
  });
}

export function formatPrice(product: CollectionProduct) {
  return `${product.currency} ${product.price.toLocaleString()}`;
}
