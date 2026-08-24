"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Package, Truck, Calendar, MapPin, CheckCircle2, ArrowRight } from "lucide-react";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { Order } from "@/types/order";
import { formatPrice, formatDate } from "@/lib/utils";

export default function MyOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem("lajjas_foods_orders");
    if (saved) {
      try {
        setOrders(JSON.parse(saved));
      } catch (e) {
        console.error(e);
      }
    }
  }, []);

  return (
    <div className="py-8 sm:py-12 bg-warm-50/40">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <Breadcrumbs
          items={[
            { name: "My Account", url: "/my-account/" },
            { name: "Orders & Tracking", url: "/my-account/orders/" },
          ]}
        />

        <div className="space-y-1">
          <h1 className="text-3xl sm:text-4xl font-extrabold font-serif text-stone-900">
            Orders & Tracking
          </h1>
          <p className="text-xs sm:text-sm text-stone-500">
            Real-time status and item details for your Gujarati snack orders.
          </p>
        </div>

        {orders.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 text-center border border-stone-200 shadow-xs space-y-4">
            <Package className="w-12 h-12 text-stone-300 mx-auto" />
            <h2 className="text-xl font-bold font-serif text-stone-900">
              No orders found
            </h2>
            <p className="text-xs text-stone-500 max-w-xs mx-auto">
              You have not placed any orders yet. Treat yourself to fresh thepla and khakhra!
            </p>
            <Link
              href="/products/all-products/"
              className="px-6 py-3 bg-terracotta-700 hover:bg-terracotta-800 text-white text-xs font-bold rounded-xl inline-block"
            >
              Shop Delicacies
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map((order) => (
              <div
                key={order.id}
                className="bg-white rounded-3xl border border-stone-200/80 shadow-xs overflow-hidden"
              >
                {/* Order Header */}
                <div className="p-4 sm:p-6 bg-warm-50/80 border-b border-stone-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                  <div className="space-y-1">
                    <span className="font-extrabold text-stone-900 text-base font-serif">
                      Order #{order.orderNumber}
                    </span>
                    <p className="text-stone-500">
                      Placed on {formatDate(order.createdAt)}
                    </p>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="px-3 py-1 bg-herbal-100 text-herbal-800 font-bold rounded-full uppercase text-[10px]">
                      {order.status}
                    </span>
                    <span className="text-sm font-extrabold text-terracotta-800 font-serif">
                      {formatPrice(order.total)}
                    </span>
                  </div>
                </div>

                {/* Items in Order */}
                <div className="p-4 sm:p-6 divide-y divide-stone-100">
                  {order.items.map((item) => (
                    <div
                      key={item.id}
                      className="py-3 first:pt-0 last:pb-0 flex items-center justify-between gap-4"
                    >
                      <div className="flex items-center gap-3">
                        <div className="relative w-12 h-12 rounded-xl overflow-hidden bg-stone-100 border border-stone-200 shrink-0">
                          <Image src={item.image} alt={item.name} fill sizes="48px" className="object-cover" />
                        </div>
                        <div>
                          <Link
                            href={`/${item.categorySlug}/${item.productSlug}/`}
                            className="text-xs font-bold text-stone-900 hover:text-terracotta-700 font-serif"
                          >
                            {item.name}
                          </Link>
                          <p className="text-[11px] text-stone-500">
                            {item.packOption.size} • Qty: {item.quantity}
                          </p>
                        </div>
                      </div>

                      <span className="text-xs font-bold font-serif text-stone-800">
                        {formatPrice(item.packOption.price * item.quantity)}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Shipping & Delivery Footer */}
                <div className="p-4 sm:p-6 bg-stone-50/60 border-t border-stone-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-stone-600">
                  <div className="flex items-center gap-2">
                    <Truck className="w-4 h-4 text-terracotta-700 shrink-0" />
                    <span>Carrier: <strong>{order.carrier}</strong> (Tracking #{order.trackingNumber})</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-kesari-600 shrink-0" />
                    <span>Deliver to: {order.shippingAddress.city}, {order.shippingAddress.pincode}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
