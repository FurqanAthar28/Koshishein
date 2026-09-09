import Image from "next/image";
import Link from "next/link";
import {
  signatureCollection,
  everydayClassics,
} from "@/data/collection";
import siteConfig from "@/data/siteConfig";

export default function CollectionPage() {
  return (
    <main>
      {/* Page Banner */}
      <section className="collection-page-banner">
        <div className="container">
          <p className="section-eyebrow">KOSHISHEIN</p>
          <h1>Our Collections</h1>
          <p>
            Discover our custom engraving service, signature designs, and
            everyday classic watches.
          </p>
        </div>
      </section>

      {/* Custom Engraving */}
      <section className="collection-section custom-stitching-section">
        <div className="container">
          <div className="collection-intro">
            <div>
              <p className="section-eyebrow">CUSTOM ENGRAVING</p>

              <h2>
                Your watch.
                <span>Our perfect engraving.</span>
              </h2>
            </div>

            <div>
              <p>
                Bring your own watch and chosen design. Our experienced team
                will turn it into a beautifully personalized keepsake.
              </p>

              <p className="collection-note">
                Delivery charges are separate.
              </p>

              <Link
                href={`https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent(
                  "Assalamualaikum, I want to book custom engraving."
                )}`}
                className="primary-button"
                target="_blank"
                rel="noopener noreferrer"
              >
                Book Your Engraving
              </Link>
            </div>
          </div>

          <div className="stitching-gallery">
  <div className="stitching-gallery-main">
    <Image
      src="/images/products/executive-steel-elite.jpg"
      alt="Custom engraving sample"
      fill
      sizes="(max-width: 768px) 100vw, 50vw"
    />
  </div>

  <div className="stitching-gallery-medium">
    <Image
      src="/images/products/minimalist-canvas-black.jpg"
      alt="Custom engraving sample"
      fill
      sizes="(max-width: 768px) 50vw, 30vw"
    />
  </div>

  <div className="stitching-gallery-small">
    <Image
      src="/images/products/trail-leather-tan.jpg"
      alt="Custom engraving sample"
      fill
      sizes="(max-width: 768px) 50vw, 20vw"
    />
  </div>
</div>
        </div>
      </section>

      {/* Signature Collection */}
      <section className="collection-section handmade-section">
        <div className="container">
          <div className="collection-heading">
            <div>
              <p className="section-eyebrow">KOSHISHEIN SIGNATURE</p>

              <h2>
                Signature designs
                <span>built for distinction.</span>
              </h2>
            </div>

            <p>
              Explore our premium signature watches, created for customers
              who appreciate elegant details and timeless style.
            </p>
          </div>

          <div className="collection-product-grid">
            {signatureCollection.map((product) => (
              <article className="collection-product-card" key={product.id}>
                <Link
                  href={`/catalog?product=${product.id}`}
                  className="collection-product-image"
                >
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    sizes="(max-width: 600px) 100vw, (max-width: 900px) 50vw, 33vw"
                  />
                </Link>

                <div className="collection-product-info">
                  <div>
                    <h3>{product.name}</h3>
                    <p>{product.description}</p>
                  </div>

                  <strong>PKR {product.price.toLocaleString()}</strong>
                </div>

                <Link
                  href={`/catalog?product=${product.id}`}
                  className="product-order-link"
                >
                  View & Order
                  <span>→</span>
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Everyday Classics */}
      <section className="collection-section plain-section">
        <div className="container">
          <div className="collection-heading">
            <div>
              <p className="section-eyebrow">EVERYDAY CLASSICS</p>

              <h2>
                Simple.
                <span>Elegant. Everyday.</span>
              </h2>
            </div>

            <p>
              Comfortable everyday watches designed for daily use, with the
              neat finishing Koshishein is known for.
            </p>
          </div>

          <div className="collection-product-grid">
            {everydayClassics.map((product) => (
              <article className="collection-product-card" key={product.id}>
                <Link
                  href={`/catalog?product=${product.id}`}
                  className="collection-product-image"
                >
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    sizes="(max-width: 600px) 100vw, (max-width: 900px) 50vw, 33vw"
                  />
                </Link>

                <div className="collection-product-info">
                  <div>
                    <h3>{product.name}</h3>
                    <p>{product.description}</p>
                  </div>

                  <strong>PKR {product.price.toLocaleString()}</strong>
                </div>

                <Link
                  href={`/catalog?product=${product.id}`}
                  className="product-order-link"
                >
                  View & Order
                  <span>→</span>
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
