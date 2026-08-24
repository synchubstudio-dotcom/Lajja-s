"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { 
  X, 
  Trash2, 
  Plus, 
  Minus, 
  ShoppingBag, 
  ArrowRight, 
  Sparkles, 
  CheckCircle2, 
  Tag 
} from "lucide-react";
import { useCartStore } from "@/store/cartStore";
import { formatPrice } from "@/lib/utils";

export function CartDrawer() {
  const { 
    items, 
    isDrawerOpen, 
    setDrawerOpen, 
    updateQuantity, 
    removeItem, 
    coupon, 
    applyCoupon, 
    removeCoupon,
    getTotals 
  } = useCartStore();

  const [couponInput, setCouponInput] = useState("");
  const [couponFeedback, setCouponFeedback] = useState<{ success: boolean; message: string } | null>(null);

  const totals = getTotals();

  if (!isDrawerOpen) return null;

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!couponInput.trim()) return;
    const result = applyCoupon(couponInput);
    setCouponFeedback(result);
    if (result.success) {
      setCouponInput("");
    }
  };

  const freeShippingProgress = Math.min(
    100,
    Math.round((totals.subtotal / totals.freeShippingThreshold) * 100)
  );

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
        onClick={() => setDrawerOpen(false)}
        aria-hidden="true"
      />

      <div className="fixed inset-y-0 right-0 max-w-md w-full bg-white shadow-2xl flex flex-col z-50">
        {/* Drawer Header */}
        <div className="p-4 border-b border-stone-200 flex items-center justify-between bg-warm-50">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-terracotta-700" />
            <h3 className="font-bold font-serif text-lg text-stone-900">Your Fresh Cart</h3>
            <span className="text-xs bg-terracotta-100 text-terracotta-800 font-bold px-2 py-0.5 rounded-full">
              {items.reduce((s, i) => s + i.quantity, 0)} items
            </span>
          </div>
          <button
            onClick={() => setDrawerOpen(false)}
            className="p-1.5 text-stone-500 hover:text-stone-900 rounded-lg hover:bg-stone-200/50 transition-colors"
            aria-label="Close cart drawer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Free Shipping Progress Bar */}
        <div className="bg-kesari-50/80 p-3.5 border-b border-kesari-100">
          {totals.amountNeededForFreeShipping > 0 ? (
            <div>
              <p className="text-xs text-stone-700 font-medium">
                Add <span className="font-bold text-terracotta-700">{formatPrice(totals.amountNeededForFreeShipping)}</span> more to unlock <span className="font-bold text-herbal-700">FREE Standard Delivery</span>!
              </p>
              <div className="w-full bg-stone-200 h-2 rounded-full overflow-hidden mt-2">
                <div
                  className="bg-kesari-600 h-full rounded-full transition-all duration-300"
                  style={{ width: `${freeShippingProgress}%` }}
                />
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-2 text-xs font-bold text-herbal-800">
              <CheckCircle2 className="w-4 h-4 text-herbal-600" />
              <span>You unlocked FREE Standard Delivery across Gujarat!</span>
            </div>
          )}
        </div>

        {/* Items List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-4">
              <div className="w-16 h-16 rounded-full bg-kesari-100 text-kesari-700 flex items-center justify-center">
                <ShoppingBag className="w-8 h-8" />
              </div>
              <div>
                <h4 className="font-bold text-stone-800 text-base font-serif">Your cart is empty</h4>
                <p className="text-xs text-stone-500 mt-1 max-w-xs">
                  Discover freshly roasted Methi Thepla, hand-pressed Khakhra, and Bharuchi salted peanuts.
                </p>
              </div>
              <Link
                href="/products/all-products/"
                onClick={() => setDrawerOpen(false)}
                className="px-5 py-2.5 bg-terracotta-700 hover:bg-terracotta-800 text-white text-xs font-bold rounded-xl shadow-sm transition-all"
              >
                Browse Authentic Snacks
              </Link>
            </div>
          ) : (
            items.map((item) => (
              <div
                key={item.id}
                className="flex gap-3 bg-stone-50/80 p-3 rounded-xl border border-stone-200/70"
              >
                <div className="relative w-16 h-16 rounded-lg overflow-hidden bg-stone-200 shrink-0">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    sizes="64px"
                    className="object-cover"
                  />
                </div>

                <div className="flex-1 min-w-0 flex flex-col justify-between">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <Link
                        href={`/${item.categorySlug}/${item.productSlug}/`}
                        onClick={() => setDrawerOpen(false)}
                        className="text-xs font-bold text-stone-900 hover:text-terracotta-700 line-clamp-1"
                      >
                        {item.name}
                      </Link>
                      <p className="text-[11px] text-stone-500">{item.packOption.size}</p>
                    </div>
                    <button
                      onClick={() => removeItem(item.id)}
                      className="text-stone-400 hover:text-red-600 p-1 transition-colors"
                      aria-label={`Remove ${item.name} from cart`}
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <div className="flex items-center justify-between mt-2 pt-1 border-t border-stone-200/50">
                    <div className="flex items-center border border-stone-300 rounded-lg bg-white overflow-hidden">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="p-1 text-stone-500 hover:bg-stone-100"
                        aria-label="Decrease quantity"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="px-2 text-xs font-bold text-stone-800">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="p-1 text-stone-500 hover:bg-stone-100"
                        aria-label="Increase quantity"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>

                    <span className="text-xs font-bold text-terracotta-800 font-serif">
                      {formatPrice(item.packOption.price * item.quantity)}
                    </span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Drawer Footer & Checkout Actions */}
        {items.length > 0 && (
          <div className="p-4 border-t border-stone-200 bg-warm-50 space-y-3">
            {/* Coupon Box */}
            {coupon ? (
              <div className="flex items-center justify-between bg-herbal-50 border border-herbal-200 px-3 py-2 rounded-lg text-xs">
                <div className="flex items-center gap-1.5 text-herbal-800 font-semibold">
                  <Tag className="w-3.5 h-3.5" />
                  <span>Coupon applied: <strong>{coupon.code}</strong></span>
                </div>
                <button
                  onClick={removeCoupon}
                  className="text-red-600 hover:underline text-[11px] font-bold"
                >
                  Remove
                </button>
              </div>
            ) : (
              <form onSubmit={handleApplyCoupon} className="flex gap-2">
                <input
                  type="text"
                  placeholder="Coupon code (e.g. GUJARAT10)"
                  value={couponInput}
                  onChange={(e) => setCouponInput(e.target.value)}
                  className="flex-1 px-3 py-1.5 text-xs bg-white border border-stone-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-terracotta-500 uppercase"
                />
                <button
                  type="submit"
                  className="px-3 py-1.5 text-xs font-bold bg-stone-800 text-white hover:bg-stone-900 rounded-lg shrink-0"
                >
                  Apply
                </button>
              </form>
            )}

            {couponFeedback && !coupon && (
              <p className={`text-[11px] ${couponFeedback.success ? "text-herbal-700" : "text-red-600"}`}>
                {couponFeedback.message}
              </p>
            )}

            {/* Price Calculations */}
            <div className="space-y-1.5 text-xs pt-2 border-t border-stone-200">
              <div className="flex justify-between text-stone-600">
                <span>Subtotal</span>
                <span>{formatPrice(totals.subtotal)}</span>
              </div>
              {totals.discount > 0 && (
                <div className="flex justify-between text-herbal-700 font-medium">
                  <span>Discount</span>
                  <span>-{formatPrice(totals.discount)}</span>
                </div>
              )}
              <div className="flex justify-between text-stone-600">
                <span>Standard Delivery</span>
                <span>{totals.shipping === 0 ? "FREE" : formatPrice(totals.shipping)}</span>
              </div>
              <div className="flex justify-between text-sm font-bold text-stone-900 pt-1.5 border-t border-stone-300 font-serif">
                <span>Grand Total</span>
                <span className="text-terracotta-800">{formatPrice(totals.total)}</span>
              </div>
            </div>

            {/* CTAs */}
            <div className="grid grid-cols-2 gap-2 pt-2">
              <Link
                href="/cart/"
                onClick={() => setDrawerOpen(false)}
                className="w-full py-2.5 px-3 text-center bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-bold rounded-xl transition-colors"
              >
                View Full Cart
              </Link>
              <Link
                href="/checkout/"
                onClick={() => setDrawerOpen(false)}
                className="w-full py-2.5 px-3 text-center bg-terracotta-700 hover:bg-terracotta-800 text-white text-xs font-bold rounded-xl shadow-sm transition-all flex items-center justify-center gap-1 group"
              >
                <span>Checkout</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
