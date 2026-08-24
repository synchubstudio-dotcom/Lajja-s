"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { 
  Star, 
  ShoppingBag, 
  Zap, 
  ShieldCheck, 
  Sparkles, 
  Truck, 
  Plus, 
  Minus,
  CheckCircle2
} from "lucide-react";
import { Product } from "@/types/product";
import { ProductGallery } from "@/components/products/ProductGallery";
import { formatPrice, calculateDiscount } from "@/lib/utils";
import { useCartStore } from "@/store/cartStore";

interface ProductDetailsClientProps {
  product: Product;
}

export function ProductDetailsClient({ product }: ProductDetailsClientProps) {
  const router = useRouter();
  const [selectedPackIndex, setSelectedPackIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);

  const addItem = useCartStore((state) => state.addItem);
  const selectedPack = product.packOptions[selectedPackIndex] || product.packOptions[0];
  const discountPercent = calculateDiscount(selectedPack.price, selectedPack.compareAtPrice);

  const handleAddToCart = () => {
    addItem(product, selectedPack, quantity);
  };

  const handleBuyNow = () => {
    addItem(product, selectedPack, quantity);
    router.push("/checkout/");
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
      {/* Product Image Gallery */}
      <div className="lg:col-span-6">
        <ProductGallery images={product.images} productName={product.name} />
      </div>

      {/* Product Buy Box & Options */}
      <div className="lg:col-span-6 space-y-6">
        <div>
          {/* Category & Gujarati Tag */}
          <div className="flex items-center gap-2 mb-2">
            <Link
              href={`/${product.categorySlug}/`}
              className="text-xs font-bold uppercase tracking-wider text-terracotta-700 hover:underline"
            >
              {product.categoryName}
            </Link>
            {product.gujaratiName && (
              <span className="text-xs font-serif font-bold text-kesari-700 bg-kesari-100/70 px-2 py-0.5 rounded-md">
                {product.gujaratiName}
              </span>
            )}
          </div>

          {/* Product H1 */}
          <h1 className="text-3xl sm:text-4xl font-extrabold font-serif text-stone-900 leading-tight">
            {product.name}
          </h1>

          {/* Rating & Short Review Meta */}
          <div className="flex items-center gap-3 mt-2.5 text-xs text-stone-600">
            <div className="flex items-center gap-1 text-kesari-600 font-bold">
              <Star className="w-4 h-4 fill-kesari-500 text-kesari-500" />
              <span className="text-stone-900">{product.rating}</span>
            </div>
            <span>•</span>
            <span className="text-stone-500">
              <strong>{product.reviewCount}</strong> Verified Customer Reviews
            </span>
            <span>•</span>
            <span className="text-herbal-700 font-semibold flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" /> In Stock
            </span>
          </div>

          {/* Short Lead Description */}
          <p className="text-sm text-stone-600 mt-3 leading-relaxed">
            {product.shortDescription}
          </p>
        </div>

        {/* Pricing Box */}
        <div className="bg-white p-4 sm:p-5 rounded-2xl border border-stone-200 shadow-2xs space-y-4">
          <div className="flex items-baseline gap-3">
            <span className="text-3xl font-extrabold font-serif text-stone-900">
              {formatPrice(selectedPack.price * quantity)}
            </span>
            {selectedPack.compareAtPrice && (
              <span className="text-sm text-stone-400 line-through">
                {formatPrice(selectedPack.compareAtPrice * quantity)}
              </span>
            )}
            {discountPercent > 0 && (
              <span className="text-xs font-bold text-herbal-800 bg-herbal-100 px-2.5 py-0.5 rounded-full">
                Save {discountPercent}% OFF
              </span>
            )}
          </div>

          {/* Pack Options Selector */}
          <div>
            <label className="block text-xs font-bold uppercase text-stone-700 mb-2">
              Choose Pack Size:
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
              {product.packOptions.map((pack, idx) => {
                const isSelected = selectedPackIndex === idx;
                return (
                  <button
                    key={pack.sku}
                    type="button"
                    onClick={() => setSelectedPackIndex(idx)}
                    className={`p-3 rounded-xl border text-left transition-all ${
                      isSelected
                        ? "bg-terracotta-50/70 border-terracotta-600 ring-2 ring-terracotta-200"
                        : "bg-stone-50 border-stone-200 hover:border-stone-300"
                    }`}
                  >
                    <span className="block text-xs font-bold text-stone-900">
                      {pack.size}
                    </span>
                    <span className="block text-xs text-terracotta-700 font-extrabold font-serif mt-1">
                      {formatPrice(pack.price)}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Quantity Stepper */}
          <div className="flex items-center gap-4 pt-2">
            <label className="text-xs font-bold uppercase text-stone-700">
              Quantity:
            </label>
            <div className="flex items-center border border-stone-300 rounded-xl bg-stone-50 overflow-hidden">
              <button
                type="button"
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="p-2.5 text-stone-600 hover:bg-stone-200/60"
                aria-label="Decrease quantity"
              >
                <Minus className="w-3.5 h-3.5" />
              </button>
              <span className="px-4 text-xs font-bold text-stone-900">
                {quantity}
              </span>
              <button
                type="button"
                onClick={() => setQuantity(quantity + 1)}
                className="p-2.5 text-stone-600 hover:bg-stone-200/60"
                aria-label="Increase quantity"
              >
                <Plus className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* CTAs */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            <button
              type="button"
              onClick={handleAddToCart}
              className="w-full py-3.5 px-4 bg-terracotta-700 hover:bg-terracotta-800 active:scale-95 text-white font-bold text-xs sm:text-sm rounded-xl shadow-card transition-all flex items-center justify-center gap-2"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>Add to Cart</span>
            </button>
            <button
              type="button"
              onClick={handleBuyNow}
              className="w-full py-3.5 px-4 bg-stone-900 hover:bg-stone-800 active:scale-95 text-white font-bold text-xs sm:text-sm rounded-xl shadow-xs transition-all flex items-center justify-center gap-2"
            >
              <Zap className="w-4 h-4 text-kesari-400" />
              <span>Buy Now (Express)</span>
            </button>
          </div>
        </div>

        {/* Value Highlights */}
        <div className="grid grid-cols-2 gap-3 pt-2">
          <div className="flex items-center gap-2.5 bg-white p-3 rounded-xl border border-stone-200 text-xs text-stone-700">
            <ShieldCheck className="w-4 h-4 text-terracotta-700 shrink-0" />
            <span>Vacuum Sealed Freshness</span>
          </div>
          <div className="flex items-center gap-2.5 bg-white p-3 rounded-xl border border-stone-200 text-xs text-stone-700">
            <Truck className="w-4 h-4 text-terracotta-700 shrink-0" />
            <span>Dispatched in 24 Hours</span>
          </div>
          <div className="flex items-center gap-2.5 bg-white p-3 rounded-xl border border-stone-200 text-xs text-stone-700">
            <Sparkles className="w-4 h-4 text-terracotta-700 shrink-0" />
            <span>100% Whole Wheat & Spices</span>
          </div>
          <div className="flex items-center gap-2.5 bg-white p-3 rounded-xl border border-stone-200 text-xs text-stone-700">
            <CheckCircle2 className="w-4 h-4 text-terracotta-700 shrink-0" />
            <span>Zero Added Chemicals</span>
          </div>
        </div>
      </div>
    </div>
  );
}
