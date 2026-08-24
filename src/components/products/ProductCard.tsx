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
    <div className="group flex flex-col bg-white rounded-2xl border border-stone-200/80 hover:border-terracotta-300 shadow-xs hover:shadow-card transition-all duration-300 overflow-hidden">
      {/* Product Image Link Container */}
      <Link href={productUrl} className="relative aspect-4/3 w-full bg-stone-100 overflow-hidden block">
        <Image
          src={primaryImage.url}
          alt={primaryImage.alt}
          fill
          priority={priority}
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

        {/* Badges */}
        <div className="absolute top-2.5 left-2.5 flex flex-col gap-1 z-10">
          {product.bestSeller && (
            <span className="bg-terracotta-700 text-white text-[10px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded-md shadow-xs">
              Best Seller
            </span>
          )}
          {product.featured && !product.bestSeller && (
            <span className="bg-kesari-600 text-white text-[10px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded-md shadow-xs flex items-center gap-1">
              <Sparkles className="w-2.5 h-2.5" /> Featured
            </span>
          )}
          {discountPercent > 0 && (
            <span className="bg-herbal-700 text-white text-[10px] font-extrabold px-1.5 py-0.5 rounded-md shadow-xs">
              Save {discountPercent}%
            </span>
          )}
        </div>

        {/* Shelf Life Pill */}
        <div className="absolute bottom-2.5 right-2.5 bg-stone-950/80 backdrop-blur-xs text-white text-[10px] font-medium px-2 py-0.5 rounded-md">
          {product.shelfLife.split(",")[0]}
        </div>
      </Link>

      {/* Product Details Body */}
      <div className="flex-1 p-4 flex flex-col justify-between">
        <div>
          {/* Category Tag & Rating */}
          <div className="flex items-center justify-between text-xs mb-1.5">
            <Link
              href={`/${product.categorySlug}/`}
              className="text-stone-600 hover:text-terracotta-700 font-medium uppercase tracking-wider text-[11px]"
            >
              {product.categoryName}
            </Link>
            <div className="flex items-center gap-1 text-kesari-700 font-bold text-xs">
              <Star className="w-3.5 h-3.5 fill-kesari-500 text-kesari-500" />
              <span>{product.rating}</span>
              <span className="text-stone-500 text-[10px]">({product.reviewCount})</span>
            </div>
          </div>

          {/* Product Title */}
          <h3 className="text-base font-bold text-stone-900 group-hover:text-terracotta-800 transition-colors font-serif line-clamp-1">
            <Link href={productUrl}>
              {product.name}
            </Link>
          </h3>

          {/* Short Description */}
          <p className="text-xs text-stone-500 mt-1 line-clamp-2 leading-relaxed">
            {product.shortDescription}
          </p>

          {/* Pack Options Selector */}
          {product.packOptions.length > 1 && (
            <div className="mt-3 pt-2 border-t border-stone-100">
              <label className="block text-[10px] uppercase font-bold text-stone-600 mb-1">
                Select Pack Size:
              </label>
              <div className="flex flex-wrap gap-1.5">
                {product.packOptions.map((pack, idx) => (
                  <button
                    key={pack.sku}
                    type="button"
                    onClick={(e) => {
                      e.preventDefault();
                      setSelectedPackIndex(idx);
                    }}
                    className={`text-[11px] px-2 py-1 rounded-lg border font-medium transition-all ${
                      selectedPackIndex === idx
                        ? "bg-terracotta-50 border-terracotta-600 text-terracotta-800 font-bold"
                        : "bg-white border-stone-300 text-stone-600 hover:border-stone-400"
                    }`}
                  >
                    {pack.size.split("(")[0].trim()}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Pricing & Add to Cart */}
        <div className="mt-4 pt-3 border-t border-stone-100 flex items-center justify-between gap-2">
          <div>
            <div className="flex items-baseline gap-1.5">
              <span className="text-lg font-extrabold text-stone-900 font-serif">
                {formatPrice(selectedPack.price)}
              </span>
              {selectedPack.compareAtPrice && (
                <span className="text-xs text-stone-500 line-through">
                  {formatPrice(selectedPack.compareAtPrice)}
                </span>
              )}
            </div>
            <span className="text-[10px] text-stone-500 block">
              Inclusive of all taxes
            </span>
          </div>

          <button
            onClick={handleAddToCart}
            className="flex items-center gap-1.5 bg-terracotta-700 hover:bg-terracotta-800 active:scale-95 text-white px-3.5 py-2 rounded-xl text-xs font-bold shadow-xs transition-all"
            aria-label={`Add ${product.name} to cart`}
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>Add</span>
          </button>
        </div>
      </div>
    </div>
  );
}
