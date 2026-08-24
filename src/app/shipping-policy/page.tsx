import React from "react";
import { Metadata } from "next";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { constructMetadata } from "@/lib/seo";
import { SITE_CONFIG } from "@/lib/constants";

export const metadata: Metadata = constructMetadata({
  title: "Shipping & Delivery Policy | Lajja’s Foods",
  description: "Shipping timelines, Gujarat delivery areas, international travel packaging standards, and courier dispatch guidelines for Lajja’s Foods.",
  canonicalUrl: "https://lajjasfoods.com/shipping-policy/",
});

export default function ShippingPolicyPage() {
  return (
    <div className="py-8 sm:py-12 bg-warm-50/40">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <Breadcrumbs items={[{ name: "Shipping Policy", url: "/shipping-policy/" }]} />

        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-stone-200 shadow-xs space-y-6 text-sm text-stone-700 leading-relaxed">
          <h1 className="text-3xl font-bold font-serif text-stone-900">
            Shipping & Delivery Policy
          </h1>
          <p className="text-xs text-stone-400">Last updated: February 2026</p>

          <section className="space-y-3">
            <h2 className="text-xl font-bold font-serif text-stone-900">1. Fresh Batch Roasting & Dispatch</h2>
            <p>
              To ensure peak taste and freshness, all our Theplas, Khakhras, and Roasted Peanuts are roasted and vacuum-packed to order in our Vadodara kitchen and dispatched within 24 hours of order placement.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold font-serif text-stone-900">2. Delivery Timelines</h2>
            <ul className="list-disc pl-5 space-y-1.5 text-xs sm:text-sm">
              <li><strong>Vadodara (Kitchen HQ):</strong> Same-day delivery (within 3-5 hours for orders placed before 2 PM).</li>
              <li><strong>Ahmedabad, Surat, Anand, Bharuch, Rajkot:</strong> Express delivery within 24 hours.</li>
              <li><strong>Rest of Gujarat & Major Indian Metros:</strong> 2 to 4 business days via express air/surface courier.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold font-serif text-stone-900">3. Shipping Fees & Free Delivery</h2>
            <p>
              Standard delivery across Gujarat is ₹{SITE_CONFIG.shipping.standardShippingFee}. All orders above ₹{SITE_CONFIG.shipping.freeShippingThreshold} qualify for <strong>FREE Standard Delivery</strong>.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold font-serif text-stone-900">4. Flight-Ready Travel Packaging</h2>
            <p>
              For international travelers, all theplas are sealed in multi-barrier EVOH vacuum pouches and encased in crush-proof cartons suitable for checked-in or cabin luggage.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
