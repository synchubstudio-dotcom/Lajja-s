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

  const requireLogin = async () => {
    const response = await fetch("/api/auth/session");
    const session = await response.json();
    if (!session.user) {
      router.push(`/login/?returnTo=${encodeURIComponent(window.location.pathname)}`);
      return false;
    }
    return true;
  };

  const handleAddToCart = async () => {
    if (!(await requireLogin())) return;
    addItem(product, selectedPack, quantity);
  };

  const handleBuyNow = async () => {
    if (!(await requireLogin())) return;
    addItem(product, selectedPack, quantity);
    router.push("/checkout/");
  };

  return (
    <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-12 lg:gap-12">
      <div className="lg:col-span-6">
        <ProductGallery images={product.images} productName={product.name} />
      </div>

      <div className="lg:col-span-6 space-y-5">
        <div>
          <div className="mb-2 flex items-center gap-2">
            <Link
              href={`/${product.categorySlug}/`}
              className="text-xs font-bold uppercase tracking-wider text-[#1f5a3d] hover:underline"
            >
              {product.categoryName}
            </Link>
            {product.gujaratiName && (
              <span className="rounded-md bg-[#f1e5c8] px-2 py-0.5 text-xs font-serif font-bold text-[#2b6d47]">
                {product.gujaratiName}
              </span>
            )}
          </div>

          <h1 className="font-serif text-4xl font-extrabold leading-tight text-[#1d1b1a] sm:text-5xl">
            {product.name}
          </h1>

          <div className="mt-3 flex items-center gap-3 text-xs text-stone-600">
            <div className="flex items-center gap-1 font-bold text-[#d7b16b]">
              <Star className="h-4 w-4 fill-current" />
              <span className="text-stone-900">{product.rating}</span>
            </div>
            <span>•</span>
            <span>
              <strong>{product.reviewCount}</strong> reviews
            </span>
            <span>•</span>
            <span className="flex items-center gap-1 font-semibold text-[#1f5a3d]">
              <CheckCircle2 className="h-3.5 w-3.5" /> In Stock
            </span>
          </div>

          <p className="mt-3 text-sm leading-relaxed text-stone-600">
            {product.shortDescription}
          </p>
        </div>

        <div className="space-y-4 rounded-[18px] border border-[#e6dfd3] bg-[#fffdf9] p-4 sm:p-5">
          <div className="flex items-baseline gap-3">
            <span className="font-serif text-4xl font-extrabold text-[#1d1b1a]">
              {formatPrice(selectedPack.price * quantity)}
            </span>
            {selectedPack.compareAtPrice && (
              <span className="text-sm text-stone-400 line-through">
                {formatPrice(selectedPack.compareAtPrice * quantity)}
              </span>
            )}
            {discountPercent > 0 && (
              <span className="rounded-full bg-[#edf5ee] px-2.5 py-0.5 text-[10px] font-bold text-[#1f5a3d]">
                Save {discountPercent}%
              </span>
            )}
          </div>

          <div>
            <label className="mb-2 block text-[11px] font-bold uppercase tracking-wide text-stone-700">
              Pack Size
            </label>
            <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-3">
              {product.packOptions.map((pack, idx) => {
                const isSelected = selectedPackIndex === idx;
                return (
                  <button
                    key={pack.sku}
                    type="button"
                    onClick={() => setSelectedPackIndex(idx)}
                    className={`rounded-xl border p-3 text-left transition-all ${
                      isSelected
                        ? "border-[#1f5a3d] bg-[#eef5f1] ring-2 ring-[#dfeae3]"
                        : "border-[#e7dfd2] bg-[#f9f7f3] hover:border-[#d2c8ba]"
                    }`}
                  >
                    <span className="block text-xs font-bold text-stone-900">{pack.size}</span>
                    <span className="mt-1 block font-serif text-base font-extrabold text-[#1f5a3d]">
                      {formatPrice(pack.price)}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="flex items-center gap-4 pt-1">
            <label className="text-[11px] font-bold uppercase tracking-wide text-stone-700">
              Quantity
            </label>
            <div className="flex items-center overflow-hidden rounded-lg border border-stone-300 bg-stone-50">
              <button
                type="button"
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="p-2.5 text-stone-600 hover:bg-stone-200/60"
                aria-label="Decrease quantity"
              >
                <Minus className="h-3.5 w-3.5" />
              </button>
              <span className="px-4 text-xs font-bold text-stone-900">{quantity}</span>
              <button
                type="button"
                onClick={() => setQuantity(quantity + 1)}
                className="p-2.5 text-stone-600 hover:bg-stone-200/60"
                aria-label="Increase quantity"
              >
                <Plus className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-3 pt-1 sm:grid-cols-2">
            <button
              type="button"
              onClick={handleAddToCart}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#214f3a] px-4 py-3.5 text-xs font-bold text-white shadow-sm transition hover:bg-[#183f2e]"
            >
              <ShoppingBag className="h-4 w-4" />
              <span>Add to Cart</span>
            </button>
            <button
              type="button"
              onClick={handleBuyNow}
              className="flex w-full items-center justify-center gap-2 rounded-xl border border-[#d9d1c3] bg-white px-4 py-3.5 text-xs font-bold text-[#1d1b1a] transition hover:bg-[#f5f1ea]"
            >
              <Zap className="h-4 w-4 text-[#d7b16b]" />
              <span>Buy Now</span>
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
