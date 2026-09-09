const steps = [
  {
    number: "01",
    title: "Send Your Watch",
    description:
      "Send us your own watch for custom engraving and personalization.",
  },
  {
    number: "02",
    title: "Share Your Design",
    description:
      "Share the design, text, or initials you'd like engraved with us on WhatsApp.",
  },
  {
    number: "03",
    title: "We Engrave",
    description:
      "Our experienced team carefully engraves and finishes your watch.",
  },
  {
    number: "04",
    title: "We Deliver",
    description:
      "Once your watch is ready, we send it to you across Pakistan.",
  },
];

export default function HowItWorks() {
  return (
    <section className="how-it-works">
      <div className="container">
        <div className="section-heading how-it-works-heading">
          <div>
            <p className="section-eyebrow">HOW IT WORKS</p>

            <h2>
              From your watch
              <span>to a personal keepsake.</span>
            </h2>
          </div>

          <p>
            Getting your watch engraved with Koshishein is simple. Just follow
            four easy steps.
          </p>
        </div>

        <div className="steps-grid">
          {steps.map((step) => (
            <article className="step-card" key={step.number}>
              <span className="step-number">{step.number}</span>

              <div className="step-line" />

              <h3>{step.title}</h3>

              <p>{step.description}</p>
            </article>
          ))}
        </div>

        <div className="how-it-works-note">
          <strong>Custom engraving available.</strong>
          <span>
            Delivery charges are separate.
          </span>
        </div>
      </div>
    </section>
  );
}
