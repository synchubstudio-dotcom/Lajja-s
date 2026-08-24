"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { 
  Trash2, 
  Plus, 
  Minus, 
  ShoppingBag, 
  ArrowRight, 
  Tag, 
  ShieldCheck, 
  Truck, 
  CheckCircle2 
} from "lucide-react";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { useCartStore } from "@/store/cartStore";
import { formatPrice } from "@/lib/utils";

export default function CartPage() {
  const { 
    items, 
    updateQuantity, 
    removeItem, 
    clearCart, 
    coupon, 
    applyCoupon, 
    removeCoupon, 
    getTotals 
  } = useCartStore();

  const [couponCode, setCouponCode] = useState("");
  const [couponMsg, setCouponMsg] = useState<{ success: boolean; message: string } | null>(null);

  const totals = getTotals();

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!couponCode.trim()) return;
    const res = applyCoupon(couponCode);
    setCouponMsg(res);
    if (res.success) setCouponCode("");
  };

  const freeShippingProgress = Math.min(
    100,
    Math.round((totals.subtotal / totals.freeShippingThreshold) * 100)
  );

  return (
    <div className="py-8 sm:py-12 bg-warm-50/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <Breadcrumbs items={[{ name: "Shopping Cart", url: "/cart/" }]} />

        <div className="space-y-1">
          <h1 className="text-3xl sm:text-4xl font-extrabold font-serif text-stone-900">
            Your Shopping Cart
          </h1>
          <p className="text-xs sm:text-sm text-stone-500">
            Review your traditional Gujarati snack items before proceeding to checkout.
          </p>
        </div>

        {items.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 text-center border border-stone-200 shadow-xs space-y-4 max-w-md mx-auto">
            <div className="w-16 h-16 rounded-full bg-kesari-100 text-kesari-700 flex items-center justify-center mx-auto">
              <ShoppingBag className="w-8 h-8" />
            </div>
            <h2 className="text-xl font-bold font-serif text-stone-900">
              Your cart is currently empty
            </h2>
            <p className="text-xs text-stone-500 max-w-xs mx-auto">
              Explore our freshly roasted Methi Thepla, hand-pressed Khakhra, and Bharuchi salted nuts.
            </p>
            <div className="pt-2">
              <Link
                href="/products/all-products/"
                className="px-6 py-3 bg-terracotta-700 hover:bg-terracotta-800 text-white text-xs font-bold rounded-xl shadow-xs inline-block transition-colors"
              >
                Browse Authentic Snacks
              </Link>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Cart Items Column */}
            <div className="lg:col-span-8 space-y-4">
              {/* Free Shipping Meter */}
              <div className="bg-kesari-50/80 p-4 rounded-2xl border border-kesari-200">
                {totals.amountNeededForFreeShipping > 0 ? (
                  <div>
                    <p className="text-xs text-stone-700 font-medium">
                      Add <strong className="text-terracotta-800">{formatPrice(totals.amountNeededForFreeShipping)}</strong> more to unlock <strong className="text-herbal-800">FREE Delivery across Gujarat</strong>!
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
                    <span>Congratulations! You qualify for FREE Delivery across Gujarat!</span>
                  </div>
                )}
              </div>

              {/* Items List */}
              <div className="bg-white rounded-3xl border border-stone-200 shadow-xs divide-y divide-stone-100 overflow-hidden">
                {items.map((item) => (
                  <div
                    key={item.id}
                    className="p-4 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                  >
                    <div className="flex items-center gap-4">
                      <div className="relative w-20 h-20 rounded-2xl overflow-hidden bg-stone-100 border border-stone-200 shrink-0">
                        <Image src={item.image} alt={item.name} fill sizes="80px" className="object-cover" />
                      </div>
                      <div>
                        <Link
                          href={`/${item.categorySlug}/${item.productSlug}/`}
                          className="text-sm sm:text-base font-bold text-stone-900 hover:text-terracotta-700 font-serif"
                        >
                          {item.name}
                        </Link>
                        <p className="text-xs text-stone-500 mt-0.5">{item.packOption.size}</p>
                        <span className="text-xs font-bold text-terracotta-800 sm:hidden block mt-1">
                          {formatPrice(item.packOption.price)} each
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between w-full sm:w-auto gap-6 pt-2 sm:pt-0">
                      {/* Quantity Stepper */}
                      <div className="flex items-center border border-stone-300 rounded-xl bg-stone-50 overflow-hidden">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="p-2 text-stone-600 hover:bg-stone-200/60"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="px-3 text-xs font-bold text-stone-900">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="p-2 text-stone-600 hover:bg-stone-200/60"
                          aria-label="Increase quantity"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      {/* Line Item Total */}
                      <span className="text-sm sm:text-base font-extrabold text-stone-900 font-serif min-w-[70px] text-right">
                        {formatPrice(item.packOption.price * item.quantity)}
                      </span>

                      {/* Remove Button */}
                      <button
                        onClick={() => removeItem(item.id)}
                        className="text-stone-400 hover:text-red-600 p-1.5 transition-colors"
                        aria-label={`Remove ${item.name} from cart`}
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex items-center justify-between pt-2">
                <Link
                  href="/products/all-products/"
                  className="text-xs font-bold text-terracotta-700 hover:underline"
                >
                  ← Continue Shopping
                </Link>
                <button
                  onClick={clearCart}
                  className="text-xs text-stone-500 hover:text-red-600 font-medium"
                >
                  Clear Entire Cart
                </button>
              </div>
            </div>

            {/* Order Summary Sidebar */}
            <div className="lg:col-span-4 space-y-6">
              <div className="bg-white rounded-3xl p-6 border border-stone-200 shadow-xs space-y-4">
                <h3 className="text-lg font-bold font-serif text-stone-900 border-b border-stone-200 pb-3">
                  Order Summary
                </h3>

                {/* Coupon Box */}
                {coupon ? (
                  <div className="flex items-center justify-between bg-herbal-50 border border-herbal-200 px-3.5 py-2.5 rounded-xl text-xs">
                    <div className="flex items-center gap-1.5 text-herbal-800 font-semibold">
                      <Tag className="w-4 h-4" />
                      <span>{coupon.code} Applied</span>
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
                      placeholder="Coupon Code"
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value)}
                      className="flex-1 px-3.5 py-2 text-xs bg-stone-50 border border-stone-300 rounded-xl focus:outline-none focus:ring-1 focus:ring-terracotta-500 uppercase"
                    />
                    <button
                      type="submit"
                      className="px-4 py-2 bg-stone-800 hover:bg-stone-900 text-white text-xs font-bold rounded-xl shrink-0"
                    >
                      Apply
                    </button>
                  </form>
                )}

                {couponMsg && !coupon && (
                  <p className={`text-xs ${couponMsg.success ? "text-herbal-700" : "text-red-600"}`}>
                    {couponMsg.message}
                  </p>
                )}

                {/* Calculations */}
                <div className="space-y-2 text-xs text-stone-600 pt-2 border-t border-stone-100">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span className="font-semibold text-stone-900">{formatPrice(totals.subtotal)}</span>
                  </div>
                  {totals.discount > 0 && (
                    <div className="flex justify-between text-herbal-700 font-medium">
                      <span>Coupon Discount</span>
                      <span>-{formatPrice(totals.discount)}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span>Standard Delivery</span>
                    <span>{totals.shipping === 0 ? "FREE" : formatPrice(totals.shipping)}</span>
                  </div>
                  <div className="flex justify-between text-base font-extrabold text-stone-900 pt-2 border-t border-stone-200 font-serif">
                    <span>Total Amount</span>
                    <span className="text-terracotta-800">{formatPrice(totals.total)}</span>
                  </div>
                </div>

                <Link
                  href="/checkout/"
                  className="w-full py-4 bg-terracotta-700 hover:bg-terracotta-800 active:scale-95 text-white font-bold text-xs sm:text-sm rounded-xl shadow-card transition-all flex items-center justify-center gap-2 group"
                >
                  <span>Proceed to Checkout</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>

                <div className="pt-2 text-[11px] text-stone-400 text-center space-y-1">
                  <p>Guaranteed safe & secure payment checkout.</p>
                  <p>Fresh batch dispatched from Vadodara.</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
