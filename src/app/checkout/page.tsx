"use client";

import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { 
  CheckCircle2, 
  ShieldCheck, 
  Truck, 
  CreditCard, 
  QrCode, 
  Banknote, 
  ArrowRight, 
  ShoppingBag,
  MessageCircle
} from "lucide-react";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { useCartStore } from "@/store/cartStore";
import { formatPrice } from "@/lib/utils";
import { Order } from "@/types/order";
import { SITE_CONFIG } from "@/lib/constants";

export default function CheckoutPage() {
  const router = useRouter();
  const { items, clearCart, coupon, getTotals } = useCartStore();
  const totals = getTotals();

  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    email: "",
    addressLine1: "",
    addressLine2: "",
    landmark: "",
    city: "Vadodara",
    state: "Gujarat",
    pincode: "390020",
  });

  const [paymentMethod, setPaymentMethod] = useState<"cod" | "upi" | "card">("upi");
  const [isProcessing, setIsProcessing] = useState(false);
  const [completedOrder, setCompletedOrder] = useState<Order | null>(null);
  const checkoutFormRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    fetch("/api/auth/session")
      .then((response) => response.json())
      .then((session) => {
        if (!session.user) router.replace(`/login/?returnTo=${encodeURIComponent("/checkout/")}`);
      });
  }, [router]);

  if (items.length === 0 && !completedOrder) {
    return (
      <div className="py-16 sm:py-24 bg-warm-50/40 text-center">
        <div className="max-w-md mx-auto p-8 bg-white rounded-3xl border border-stone-200 shadow-xs space-y-4">
          <ShoppingBag className="w-12 h-12 text-stone-400 mx-auto" />
          <h1 className="text-xl font-bold font-serif text-stone-900">Your cart is empty</h1>
          <p className="text-xs text-stone-500">Please add items to your cart before proceeding to checkout.</p>
          <Link
            href="/products/all-products/"
            className="px-6 py-3 bg-terracotta-700 text-white text-xs font-bold rounded-xl inline-block"
          >
            Browse Gujarati Snacks
          </Link>
        </div>
      </div>
    );
  }

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    setTimeout(() => {
      const orderNum = `LJ-${Math.floor(100000 + Math.random() * 900000)}`;
      const newOrder: Order = {
        id: `ord-${Date.now()}`,
        orderNumber: orderNum,
        items: [...items],
        shippingAddress: { ...formData },
        paymentMethod,
        paymentStatus: "pending",
        subtotal: totals.subtotal,
        discount: totals.discount,
        shippingFee: totals.shipping,
        total: totals.total,
        couponCode: coupon?.code,
        status: "confirmed",
        trackingNumber: `TRK-GUJ-${Math.floor(10000 + Math.random() * 90000)}`,
        carrier: "Gujarat Express Logistics",
        estimatedDelivery: "Within 24 to 48 Hours",
        createdAt: new Date().toISOString(),
      };

      // Save order in localStorage for My Account lookup
      const existingOrders = JSON.parse(localStorage.getItem("lajjas_foods_orders") || "[]");
      localStorage.setItem("lajjas_foods_orders", JSON.stringify([newOrder, ...existingOrders]));

      clearCart();
      setCompletedOrder(newOrder);
      setIsProcessing(false);
    }, 1200);
  };

  const handleWhatsAppOrder = () => {
    if (!checkoutFormRef.current?.reportValidity()) return;

    const phoneNumber = SITE_CONFIG.contact.whatsapp.replace(/\D/g, "");
    const itemLines = items
      .map(
        (item) =>
          `• ${item.name} (${item.packOption.size}) x${item.quantity} - ${formatPrice(
            item.packOption.price * item.quantity
          )}`
      )
      .join("\n");
    const address = [
      formData.fullName,
      formData.phone,
      formData.addressLine1,
      formData.addressLine2,
      formData.landmark ? `Near ${formData.landmark}` : "",
      `${formData.city}, ${formData.state} - ${formData.pincode}`,
    ]
      .filter(Boolean)
      .join(", ");
    const message = [
      "Hello Lajja's Foods, I would like to place an order on WhatsApp.",
      "",
      "Items:",
      itemLines,
      "",
      `Subtotal: ${formatPrice(totals.subtotal)}`,
      `Discount: ${formatPrice(totals.discount)}`,
      `Delivery: ${totals.shipping === 0 ? "FREE" : formatPrice(totals.shipping)}`,
      `Grand Total: ${formatPrice(totals.total)}`,
      "",
      `Delivery address: ${address}`,
      `Preferred payment: ${paymentMethod.toUpperCase()} (payment confirmation pending)`,
    ].join("\n");

    window.open(`https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`, "_blank", "noopener,noreferrer");
  };

  // Order Success Screen
  if (completedOrder) {
    return (
      <div className="py-12 sm:py-20 bg-warm-50/40">
        <div className="max-w-2xl mx-auto px-4 text-center space-y-6">
          <div className="bg-white rounded-3xl p-8 sm:p-10 border border-stone-200 shadow-card space-y-6">
            <div className="w-16 h-16 rounded-full bg-herbal-100 text-herbal-700 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div className="space-y-2">
              <span className="text-xs uppercase font-bold tracking-widest text-herbal-800 bg-herbal-50 px-3 py-1 rounded-full border border-herbal-200">
                Order Placed Successfully
              </span>
              <h1 className="text-2xl sm:text-3xl font-extrabold font-serif text-stone-900">
                Thank You, {completedOrder.shippingAddress.fullName}!
              </h1>
              <p className="text-xs sm:text-sm text-stone-600">
                Order Reference: <strong>#{completedOrder.orderNumber}</strong>
              </p>
            </div>

            <div className="bg-stone-50 p-4 rounded-2xl border border-stone-200 text-left text-xs space-y-2">
              <div className="flex justify-between font-bold text-stone-900">
                <span>Estimated Kitchen Dispatch & Delivery:</span>
                <span className="text-terracotta-800">{completedOrder.estimatedDelivery}</span>
              </div>
              <div className="text-stone-600">
                <span>Shipping to: </span>
                <strong>{completedOrder.shippingAddress.addressLine1}, {completedOrder.shippingAddress.city} - {completedOrder.shippingAddress.pincode}</strong>
              </div>
              <div className="text-stone-600">
                <span>Payment Mode: </span>
                <strong className="uppercase">{completedOrder.paymentMethod}</strong> ({completedOrder.paymentStatus})
              </div>
              <div className="pt-2 border-t border-stone-200 flex justify-between font-bold text-sm text-stone-900 font-serif">
                <span>Total Paid:</span>
                <span className="text-terracotta-800">{formatPrice(completedOrder.total)}</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
              <Link
                href="/my-account/orders/"
                className="w-full sm:w-auto px-6 py-3 bg-terracotta-700 hover:bg-terracotta-800 text-white text-xs font-bold rounded-xl shadow-xs"
              >
                Track Order Status
              </Link>
              <Link
                href="/products/all-products/"
                className="w-full sm:w-auto px-6 py-3 bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-bold rounded-xl"
              >
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="py-8 sm:py-12 bg-warm-50/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <Breadcrumbs
          items={[
            { name: "Cart", url: "/cart/" },
            { name: "Secure Checkout", url: "/checkout/" },
          ]}
        />

        <div className="space-y-1">
          <h1 className="text-3xl sm:text-4xl font-extrabold font-serif text-stone-900">
            Secure Delivery Checkout
          </h1>
          <p className="text-xs sm:text-sm text-stone-500">
            Provide your Gujarat or national shipping address and select payment method.
          </p>
        </div>

        <form ref={checkoutFormRef} onSubmit={handlePlaceOrder} className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Delivery Address & Payment */}
          <div className="lg:col-span-7 space-y-8">
            {/* 1. Address Box */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200 shadow-xs space-y-6">
              <h2 className="text-xl font-bold font-serif text-stone-900 flex items-center gap-2">
                <Truck className="w-5 h-5 text-terracotta-700" />
                <span>1. Doorstep Delivery Address</span>
              </h2>

              <div className="space-y-4 text-xs sm:text-sm">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase text-stone-700 mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      placeholder="e.g. Anand Patel"
                      className="w-full px-3.5 py-2.5 bg-stone-50 border border-stone-300 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-terracotta-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase text-stone-700 mb-1">
                      Phone Number (for Courier Updates) *
                    </label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="e.g. 9876543210"
                      className="w-full px-3.5 py-2.5 bg-stone-50 border border-stone-300 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-terracotta-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-stone-700 mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="e.g. anand@example.com"
                    className="w-full px-3.5 py-2.5 bg-stone-50 border border-stone-300 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-terracotta-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-stone-700 mb-1">
                    Flat / House No., Building, Street *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.addressLine1}
                    onChange={(e) => setFormData({ ...formData, addressLine1: e.target.value })}
                    placeholder="e.g. 402, Shivam Heights, Near ISKCON Temple"
                    className="w-full px-3.5 py-2.5 bg-stone-50 border border-stone-300 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-terracotta-500"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase text-stone-700 mb-1">
                      City *
                    </label>
                    <select
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-stone-50 border border-stone-300 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-terracotta-500 font-semibold"
                    >
                      <option value="Vadodara">Vadodara</option>
                      <option value="Ahmedabad">Ahmedabad</option>
                      <option value="Surat">Surat</option>
                      <option value="Rajkot">Rajkot</option>
                      <option value="Anand">Anand</option>
                      <option value="Bharuch">Bharuch</option>
                      <option value="Other">Other India</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase text-stone-700 mb-1">
                      State *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.state}
                      onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-stone-50 border border-stone-300 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-terracotta-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase text-stone-700 mb-1">
                      Pincode *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.pincode}
                      onChange={(e) => setFormData({ ...formData, pincode: e.target.value })}
                      placeholder="390020"
                      className="w-full px-3.5 py-2.5 bg-stone-50 border border-stone-300 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-terracotta-500"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* 2. Payment Method Selector */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200 shadow-xs space-y-6">
              <h2 className="text-xl font-bold font-serif text-stone-900 flex items-center gap-2">
                <CreditCard className="w-5 h-5 text-terracotta-700" />
                <span>2. Select Payment Method</span>
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <button
                  type="button"
                  onClick={() => setPaymentMethod("upi")}
                  className={`p-4 rounded-2xl border text-left flex flex-col justify-between transition-all ${
                    paymentMethod === "upi"
                      ? "bg-terracotta-50 border-terracotta-600 ring-2 ring-terracotta-200"
                      : "bg-stone-50 border-stone-200 hover:border-stone-300"
                  }`}
                >
                  <QrCode className="w-6 h-6 text-terracotta-700 mb-2" />
                  <div>
                    <span className="block font-bold text-xs text-stone-900">UPI Instant</span>
                    <span className="text-[11px] text-stone-500">GPay, PhonePe, Paytm</span>
                  </div>
                  <p className="text-xs text-stone-500">
                    Online payment is currently pending until payment gateway integration is completed. We will confirm payment with you.
                  </p>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod("card")}
                  className={`p-4 rounded-2xl border text-left flex flex-col justify-between transition-all ${
                    paymentMethod === "card"
                      ? "bg-terracotta-50 border-terracotta-600 ring-2 ring-terracotta-200"
                      : "bg-stone-50 border-stone-200 hover:border-stone-300"
                  }`}
                >
                  <CreditCard className="w-6 h-6 text-terracotta-700 mb-2" />
                  <div>
                    <span className="block font-bold text-xs text-stone-900">Credit / Debit Card</span>
                    <span className="text-[11px] text-stone-500">Visa, Mastercard, RuPay</span>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod("cod")}
                  className={`p-4 rounded-2xl border text-left flex flex-col justify-between transition-all ${
                    paymentMethod === "cod"
                      ? "bg-terracotta-50 border-terracotta-600 ring-2 ring-terracotta-200"
                      : "bg-stone-50 border-stone-200 hover:border-stone-300"
                  }`}
                >
                  <Banknote className="w-6 h-6 text-terracotta-700 mb-2" />
                  <div>
                    <span className="block font-bold text-xs text-stone-900">Cash on Delivery</span>
                    <span className="text-[11px] text-stone-500">Pay upon doorstep receipt</span>
                  </div>
                </button>
              </div>
            </div>
          </div>

          {/* Right Column: Order Review & Place Order Button */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200 shadow-xs space-y-4">
              <h3 className="text-lg font-bold font-serif text-stone-900 border-b border-stone-200 pb-3">
                Review Items ({items.reduce((s, i) => s + i.quantity, 0)})
              </h3>

              <div className="divide-y divide-stone-100 max-h-72 overflow-y-auto space-y-2 pr-1">
                {items.map((item) => (
                  <div key={item.id} className="pt-2 flex items-center justify-between gap-3 text-xs">
                    <div className="flex items-center gap-3">
                      <div className="relative w-12 h-12 rounded-xl overflow-hidden bg-stone-100 border border-stone-200 shrink-0">
                        <Image src={item.image} alt={item.name} fill sizes="48px" className="object-cover" />
                      </div>
                      <div>
                        <span className="font-bold text-stone-900 block line-clamp-1">{item.name}</span>
                        <span className="text-[11px] text-stone-500">{item.packOption.size} × {item.quantity}</span>
                      </div>
                    </div>
                    <span className="font-bold font-serif text-stone-900">
                      {formatPrice(item.packOption.price * item.quantity)}
                    </span>
                  </div>
                ))}
              </div>

              {/* Price Calculations */}
              <div className="space-y-2 text-xs text-stone-600 pt-4 border-t border-stone-200">
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
                  <span>Delivery Fee</span>
                  <span>{totals.shipping === 0 ? "FREE" : formatPrice(totals.shipping)}</span>
                </div>
                <div className="flex justify-between text-base font-extrabold text-stone-900 pt-2 border-t border-stone-300 font-serif">
                  <span>Grand Total</span>
                  <span className="text-terracotta-800">{formatPrice(totals.total)}</span>
                </div>
              </div>

              {/* Submit CTA */}
              <button
                type="submit"
                disabled={isProcessing}
                className="w-full py-4 bg-terracotta-700 hover:bg-terracotta-800 disabled:opacity-50 active:scale-95 text-white font-bold text-sm rounded-xl shadow-card transition-all flex items-center justify-center gap-2"
              >
                {isProcessing ? (
                  <span>Securing Your Fresh Batch...</span>
                ) : (
                  <>
                    <span>Confirm Order ({formatPrice(totals.total)})</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
              <button
                type="button"
                onClick={handleWhatsAppOrder}
                className="w-full py-3.5 border border-[#2d7b4d] bg-[#edf5ee] hover:bg-[#f6f0e5] text-[#1f5a3d] font-bold text-sm rounded-xl transition-all flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Place Order on WhatsApp</span>
              </button>
              <p className="text-center text-[11px] text-stone-500">
                Your cart, delivery address, and total will open in WhatsApp for confirmation.
              </p>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
