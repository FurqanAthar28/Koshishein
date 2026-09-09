import Link from "next/link";

const services = [
  {
    number: "01",
    title: "Engraving & Personalization",
    description:
      "Send us your own watch and we will engrave it with the design or text you choose, with careful, precise finishing.",
    price: "Custom engraving",
  },
  {
    number: "02",
    title: "Signature Collection",
    description:
      "Explore our premium signature designs, chosen for customers who love a distinctive, refined watch.",
    price: "Unique premium designs",
  },
  {
    number: "03",
    title: "Everyday Classics",
    description:
      "Simple, elegant and comfortable watches designed for everyday wear.",
    price: "Ready to wear",
  },
];

export default function Services() {
  return (
    <section className="services-section">
      <div className="container">
        {/* Section heading */}
        <div className="section-heading">
          <div>
            <p className="section-eyebrow">WHAT WE OFFER</p>

            <h2>
              Made with care.
              <span>Made for you.</span>
            </h2>
          </div>

          <p>
            From engraving your own watch to ready-to-wear designs, Koshishein
            brings timeless craftsmanship and simple elegance together.
          </p>
        </div>

        {/* Service cards */}
        <div className="services-grid">
          {services.map((service) => (
            <article className="service-card" key={service.number}>
              <span className="service-number">{service.number}</span>

              <div className="service-card-content">
                <h3>{service.title}</h3>

                <p>{service.description}</p>

                <span className="service-price">{service.price}</span>

                <Link href="/collection" className="service-link">
                  Explore
                  <span>→</span>
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
