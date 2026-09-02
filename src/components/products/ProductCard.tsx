"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Star, ShoppingBag, Check, Sparkles } from "lucide-react";
import { Product } from "@/types/product";
import { formatPrice, calculateDiscount } from "@/lib/utils";
import { useCartStore } from "@/store/cartStore";

interface ProductCardProps {
  product: Product;
  priority?: boolean;
}

export function ProductCard({ product, priority = false }: ProductCardProps) {
  const [selectedPackIndex, setSelectedPackIndex] = useState(0);
  const addItem = useCartStore((state) => state.addItem);

  const selectedPack = product.packOptions[selectedPackIndex] || product.packOptions[0];
  const primaryImage = product.images.find((img) => img.isPrimary) || product.images[0];
  const discountPercent = calculateDiscount(selectedPack.price, selectedPack.compareAtPrice);

  const productUrl = `/${product.categorySlug}/${product.slug}/`;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    addItem(product, selectedPack, 1);
  };

  return (
    <div className="group flex flex-col overflow-hidden rounded-[18px] border border-[#e6e0d5] bg-[#fffdf9] shadow-sm transition-all duration-200 hover:border-[#dfe6df] hover:bg-[#f7f2ea] hover:shadow-md">
      <Link href={productUrl} className="relative block aspect-[4/3] overflow-hidden bg-[#f1eee8]">
        <Image
          src={primaryImage.url}
          alt={primaryImage.alt}
          fill
          priority={priority}
          loading={priority ? "eager" : "lazy"}
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent" />

        {product.bestSeller && (
          <span className="absolute left-2.5 top-2.5 rounded-md bg-[#2a5d41] px-2 py-0.5 text-[9px] font-bold uppercase tracking-wide text-white">
            Best Seller
          </span>
        )}
      </Link>

      <div className="flex flex-1 flex-col justify-between p-4">
        <div>
          <div className="mb-2 flex items-center justify-between text-[10px] uppercase tracking-wide text-[#5f5c58]">
            <span>{product.categoryName}</span>
            <div className="flex items-center gap-1 text-[#d7b16b]">
              <Star className="h-3.5 w-3.5 fill-current" />
              <span className="font-bold text-[#2a2a2a]">{product.rating}</span>
            </div>
          </div>

          <h3 className="font-serif text-xl font-bold text-[#1d1b1a]">
            <Link href={productUrl}>{product.name}</Link>
          </h3>
        </div>

        <div className="mt-4 flex items-end justify-between gap-3">
          <div>
            <div className="flex items-baseline gap-2">
              <span className="font-serif text-[1.6rem] font-extrabold leading-none text-[#1f1d1a]">
                {formatPrice(selectedPack.price)}
              </span>
              {selectedPack.compareAtPrice && (
                <span className="text-xs text-[#857f7a] line-through">
                  {formatPrice(selectedPack.compareAtPrice)}
                </span>
              )}
            </div>
          </div>

          <button
            onClick={handleAddToCart}
            className="inline-flex items-center gap-1.5 rounded-[10px] border border-[#d8d0c5] bg-[#f7f4f0] px-3 py-2 text-[11px] font-bold text-[#1f5a3d] transition-all duration-200 hover:bg-[#edf5ee] hover:border-[#bfd2c6]"
            aria-label={`Add ${product.name} to cart`}
          >
            <ShoppingBag className="h-3.5 w-3.5" />
            <span>Add to Cart</span>
          </button>
        </div>
      </div>
    </div>
  );
}
