"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { 
  Package, 
  MapPin, 
  User, 
  Clock, 
  ShoppingBag, 
  ArrowRight,
  ShieldCheck
} from "lucide-react";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { Order } from "@/types/order";
import { formatPrice, formatDate } from "@/lib/utils";

export default function MyAccountPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    fetch("/api/auth/session")
      .then((response) => response.json())
      .then((session) => setIsAdmin(session.user?.role === "admin"))
      .catch((error) => console.error("Unable to load account session:", error));

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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <Breadcrumbs items={[{ name: "My Account", url: "/my-account/" }]} />

        <div className="space-y-1">
          <h1 className="text-3xl sm:text-4xl font-extrabold font-serif text-stone-900">
            My Account & Orders
          </h1>
          <p className="text-xs sm:text-sm text-stone-500">
            Manage your traditional snack orders, track courier deliveries, and update addresses.
          </p>
        </div>

        {/* Shortcuts and admin tools */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Link
            href="/my-account/orders/"
            className="p-6 bg-white rounded-3xl border border-stone-200 hover:border-terracotta-300 shadow-xs hover:shadow-card transition-all flex items-start gap-4"
          >
            <div className="p-3 bg-terracotta-100 text-terracotta-800 rounded-2xl shrink-0">
              <Package className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-base font-bold font-serif text-stone-900">Orders & Tracking</h2>
              <p className="text-xs text-stone-500 mt-1">View active orders and tracking codes</p>
              <span className="inline-block mt-3 text-xs font-bold text-terracotta-700">
                {orders.length} Past Orders →
              </span>
            </div>
          </Link>

          <Link
            href="/my-account/addresses/"
            className="p-6 bg-white rounded-3xl border border-stone-200 hover:border-terracotta-300 shadow-xs hover:shadow-card transition-all flex items-start gap-4"
          >
            <div className="p-3 bg-kesari-100 text-kesari-800 rounded-2xl shrink-0">
              <MapPin className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-base font-bold font-serif text-stone-900">Saved Addresses</h2>
              <p className="text-xs text-stone-500 mt-1">Manage delivery locations in Gujarat</p>
              <span className="inline-block mt-3 text-xs font-bold text-terracotta-700">
                Manage Addresses →
              </span>
            </div>
          </Link>

          <Link
            href="/my-account/account-details/"
            className="p-6 bg-white rounded-3xl border border-stone-200 hover:border-terracotta-300 shadow-xs hover:shadow-card transition-all flex items-start gap-4"
          >
            <div className="p-3 bg-herbal-100 text-herbal-800 rounded-2xl shrink-0">
              <User className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-base font-bold font-serif text-stone-900">Account Details</h2>
              <p className="text-xs text-stone-500 mt-1">Personal profile & contact preferences</p>
              <span className="inline-block mt-3 text-xs font-bold text-terracotta-700">
                Edit Profile →
              </span>
            </div>
          </Link>

          {isAdmin && (
            <Link
              href="/admin/products/"
              className="p-6 bg-[#1f5a3d] text-white rounded-3xl border border-[#1f5a3d] hover:bg-[#17462f] shadow-xs transition-all flex items-start gap-4 md:col-span-3"
            >
              <div className="p-3 bg-white/15 rounded-2xl shrink-0">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-base font-bold font-serif">Manage Products</h2>
                <p className="text-xs text-white/80 mt-1">Add, edit, or remove products from the storefront.</p>
                <span className="inline-block mt-3 text-xs font-bold">Open Product Management →</span>
              </div>
            </Link>
          )}
        </div>

        {/* Recent Orders Overview */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200 shadow-xs space-y-6">
          <div className="flex items-center justify-between border-b border-stone-200 pb-4">
            <h2 className="text-xl font-bold font-serif text-stone-900">
              Recent Orders
            </h2>
            <Link
              href="/products/all-products/"
              className="text-xs font-bold text-terracotta-700 hover:underline"
            >
              Order More Snacks →
            </Link>
          </div>

          {orders.length === 0 ? (
            <div className="text-center py-10 space-y-3">
              <Package className="w-10 h-10 text-stone-300 mx-auto" />
              <p className="text-xs text-stone-500">You haven&apos;t placed any orders yet.</p>
              <Link
                href="/products/all-products/"
                className="px-5 py-2.5 bg-terracotta-700 text-white text-xs font-bold rounded-xl inline-block"
              >
                Browse Authentic Snacks
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {orders.slice(0, 3).map((order) => (
                <div
                  key={order.id}
                  className="bg-stone-50 p-4 sm:p-5 rounded-2xl border border-stone-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-stone-900 text-sm">
                        Order #{order.orderNumber}
                      </span>
                      <span className="px-2 py-0.5 bg-kesari-100 text-kesari-800 font-bold rounded-md uppercase text-[10px]">
                        {order.status}
                      </span>
                    </div>
                    <p className="text-stone-500">
                      Placed on {formatDate(order.createdAt)} • {order.items.length} items
                    </p>
                    <p className="text-stone-700 font-medium">
                      Tracking: {order.trackingNumber} ({order.carrier})
                    </p>
                  </div>

                  <div className="flex items-center gap-4 w-full sm:w-auto justify-between sm:justify-end border-t sm:border-t-0 pt-2 sm:pt-0">
                    <span className="text-sm font-extrabold text-terracotta-800 font-serif">
                      {formatPrice(order.total)}
                    </span>
                    <Link
                      href="/my-account/orders/"
                      className="px-3.5 py-1.5 bg-white border border-stone-300 hover:border-stone-400 font-bold rounded-lg"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
