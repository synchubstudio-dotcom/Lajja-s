"use client";

import React, { useState } from "react";
import Image from "next/image";

interface ProductGalleryProps {
  images: {
    url: string;
    alt: string;
    isPrimary?: boolean;
  }[];
  productName: string;
}

export function ProductGallery({ images, productName }: ProductGalleryProps) {
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const activeImage = images[activeImageIndex] || images[0];

  return (
    <div className="flex flex-col gap-4">
      <div className="relative aspect-[1.15/1] w-full overflow-hidden rounded-[16px] border border-[#e5ddd0] bg-[#f2ecdf] shadow-sm">
        <Image
          src={activeImage.url}
          alt={activeImage.alt || productName}
          fill
          priority
          loading="eager"
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover"
        />
      </div>

      {images.length > 1 && (
        <div className="flex gap-3 overflow-x-auto pb-2">
          {images.map((img, idx) => (
            <button
              key={img.url + idx}
              onClick={() => setActiveImageIndex(idx)}
              className={`relative h-20 w-20 shrink-0 overflow-hidden rounded-xl border-2 bg-stone-100 transition-all ${
                activeImageIndex === idx
                  ? "border-[#245a3d] ring-2 ring-[#dfeae3]"
                  : "border-[#e7dfd2] opacity-70 hover:opacity-100"
              }`}
              aria-label={`View ${productName} image ${idx + 1}`}
            >
              <Image
                src={img.url}
                alt={img.alt}
                fill
                loading="lazy"
                sizes="80px"
                className="object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
