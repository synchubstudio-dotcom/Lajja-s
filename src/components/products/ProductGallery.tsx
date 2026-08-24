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
      {/* Main Large Image Container */}
      <div className="relative aspect-4/3 sm:aspect-square w-full rounded-2xl overflow-hidden bg-stone-100 border border-stone-200 shadow-sm">
        <Image
          src={activeImage.url}
          alt={activeImage.alt || productName}
          fill
          priority
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover transition-all duration-300"
        />
        <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-xs text-[10px] font-bold text-stone-800 uppercase px-2.5 py-1 rounded-md shadow-xs">
          Authentic Gujarati Craft
        </div>
      </div>

      {/* Thumbnails Row (if multiple images exist) */}
      {images.length > 1 && (
        <div className="flex gap-3 overflow-x-auto pb-2">
          {images.map((img, idx) => (
            <button
              key={img.url}
              onClick={() => setActiveImageIndex(idx)}
              className={`relative w-20 h-20 rounded-xl overflow-hidden bg-stone-100 border-2 shrink-0 transition-all ${
                activeImageIndex === idx
                  ? "border-terracotta-700 ring-2 ring-terracotta-200"
                  : "border-stone-200 opacity-70 hover:opacity-100"
              }`}
              aria-label={`View ${productName} image ${idx + 1}`}
            >
              <Image
                src={img.url}
                alt={img.alt}
                fill
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
