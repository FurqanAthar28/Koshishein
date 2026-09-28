"use client";

import Image from "next/image";
import { useState } from "react";

type ProductGalleryProps = {
  images: { url: string; alt: string }[];
};

export default function ProductGallery({ images }: ProductGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const active = images[activeIndex];

  return (
    <div className="catalog-product-gallery">
      <div className="catalog-product-image">
        <Image
          src={active.url}
          alt={active.alt}
          fill
          priority
          sizes="(max-width: 900px) 100vw, 55vw"
        />
      </div>

      {images.length > 1 && (
        <div className="catalog-product-thumbs">
          {images.map((image, index) => (
            <button
              key={image.url}
              type="button"
              className="catalog-product-thumb"
              aria-current={index === activeIndex}
              aria-label={`Show image ${index + 1} of ${images.length}`}
              onClick={() => setActiveIndex(index)}
            >
              <Image src={image.url} alt="" fill sizes="84px" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
