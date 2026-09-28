import Image from "next/image";
import Link from "next/link";

import {
  formatAmount,
  formatPrice,
  getAllProducts,
  getProduct,
} from "@/lib/shopify";
import siteConfig from "@/data/siteConfig";
import Price from "@/components/Price";
import ProductGallery from "@/components/ProductGallery";

type CatalogPageProps = {
  searchParams: Promise<{
    product?: string;
  }>;
};

export default async function CatalogPage({
  searchParams,
}: CatalogPageProps) {
  const params = await searchParams;
  const selectedProductId = params.product;

  const selectedProduct = selectedProductId
    ? await getProduct(selectedProductId)
    : null;
  const products = selectedProduct ? [] : await getAllProducts();

  return (
    <main>
      {/* Page Banner */}
      <section className="catalog-page-banner">
        <div className="container">
          <p className="section-eyebrow">KOSHISHEIN</p>

          <h1>Our Catalog</h1>

          <p>
            Explore our signature designs and everyday classics. Choose a
            watch and contact us directly to place your order.
          </p>
        </div>
      </section>

      {/* Selected Product */}
      {selectedProduct ? (
        <section className="catalog-product-section">
          <div className="container">
            <Link href="/catalog" className="catalog-back-link">
              <span>←</span>
              Back to Catalog
            </Link>

            <div className="catalog-product-detail">
              <ProductGallery
                images={
                  selectedProduct.images.length > 0
                    ? selectedProduct.images
                    : [{ url: selectedProduct.image, alt: selectedProduct.name }]
                }
              />

              <div className="catalog-product-content">
                <p className="section-eyebrow">KOSHISHEIN</p>

                <h2>{selectedProduct.name}</h2>

                <Price
                  className="catalog-product-price"
                  product={selectedProduct}
                />

                {/* Formatted description written in the Shopify admin. */}
                <div
                  className="catalog-product-description"
                  dangerouslySetInnerHTML={{
                    __html: selectedProduct.descriptionHtml,
                  }}
                />

                <div className="catalog-product-note">
                  <strong>Ordering Information</strong>

                  <p>
                    Contact us on WhatsApp to confirm availability, sizing,
                    delivery details, and your order.
                  </p>
                </div>

                <Link
                  href={`https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent(
                    `Assalamualaikum, I want to order ${selectedProduct.name}. Price: ${formatPrice(selectedProduct)}${
                      selectedProduct.originalPrice
                        ? ` (was ${formatAmount(selectedProduct, selectedProduct.originalPrice)})`
                        : ""
                    }`
                  )}`}
                  className="primary-button"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Order on WhatsApp
                </Link>
              </div>
            </div>
          </div>
        </section>
      ) : (
        /* All Products */
        <section className="catalog-section">
          <div className="container">
            <div className="catalog-heading">
              <div>
                <p className="section-eyebrow">ALL WATCHES</p>

                <h2>
                  Find your
                  <span>next favorite.</span>
                </h2>
              </div>

              <p>
                Browse our current watches and select any piece to view its
                details and place an order.
              </p>
            </div>

            <div className="catalog-product-grid">
              {products.map((product) => (
                <article className="catalog-card" key={product.id}>
                  <Link
                    href={`/catalog?product=${encodeURIComponent(product.id)}`}
                    className="catalog-card-image"
                  >
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      sizes="(max-width: 600px) 100vw, (max-width: 900px) 50vw, 33vw"
                    />
                  </Link>

                  <div className="catalog-card-info">
                    <div>
                      <h3>{product.name}</h3>

                      <p>{product.summary}</p>
                    </div>

                    <Price product={product} />
                  </div>

                  <Link
                    href={`/catalog?product=${encodeURIComponent(product.id)}`}
                    className="catalog-card-link"
                  >
                    View Details
                    <span>→</span>
                  </Link>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Custom Engraving CTA */}
      <section className="catalog-stitching-cta">
        <div className="container">
          <p className="section-eyebrow">CUSTOM ENGRAVING</p>

          <h2>
            Have your own
            <span>watch?</span>
          </h2>

          <p>
            Bring your own watch and chosen design. Our team can engrave a
            beautifully finished keepsake.
          </p>

          <Link href="/collection" className="primary-button">
            Explore Custom Engraving
          </Link>
        </div>
      </section>
    </main>
  );
}
