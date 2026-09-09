import Image from "next/image";
import Link from "next/link";

export default function AboutSnippet() {
  return (
    <section className="about-snippet">
      <div className="container about-snippet-inner">
        <div className="about-snippet-image">
          <Image
            src="/images/founder.jpg"
            alt="Koshishein heritage watch"
            fill
            sizes="(max-width: 768px) 100vw, 45vw"
          />
        </div>

        <div className="about-snippet-content">
          <p className="section-eyebrow">OUR STORY</p>

          <h2>
            A legacy of
            <span>timeless craftsmanship.</span>
          </h2>

          <p>
            Koshishein began with a simple belief: a good watch should tell a
            story as well as the time. From signature pieces to everyday
            classics, every watch is chosen for its craftsmanship and character.
          </p>

          <p>
            Send us your own watch for engraving, or choose from our
            collection with personalization available on every piece.
          </p>

          <Link href="/about" className="text-link">
            Read Our Story
            <span>→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
