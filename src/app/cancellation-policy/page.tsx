import React from "react";
import { Metadata } from "next";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { constructMetadata } from "@/lib/seo";
import { SITE_CONFIG } from "@/lib/constants";

export const metadata: Metadata = constructMetadata({
  title: "Cancellation Policy | Lajja’s Foods",
  description: "Order cancellation terms and cutoff guidelines for orders placed on Lajja’s Foods.",
  canonicalUrl: "https://lajjasfoods.com/cancellation-policy/",
});

export default function CancellationPolicyPage() {
  return (
    <div className="py-8 sm:py-12 bg-warm-50/40">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <Breadcrumbs items={[{ name: "Cancellation Policy", url: "/cancellation-policy/" }]} />

        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-stone-200 shadow-xs space-y-6 text-sm text-stone-700 leading-relaxed">
          <h1 className="text-3xl font-bold font-serif text-stone-900">
            Order Cancellation Policy
          </h1>
          <p className="text-xs text-stone-400">Last updated: February 2026</p>

          <section className="space-y-3">
            <h2 className="text-xl font-bold font-serif text-stone-900">1. Cancellation Window</h2>
            <p>
              You may cancel your snack order at any time before the fresh kitchen dough preparation and roasting process begins (typically within 2 hours of placing the order).
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold font-serif text-stone-900">2. How to Request Cancellation</h2>
            <p>
              To cancel an order, quickly WhatsApp or call our Vadodara kitchen coordinator at {SITE_CONFIG.contact.phone} with your Order Number.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold font-serif text-stone-900">3. Post-Dispatch Status</h2>
            <p>
              Orders that have already been vacuum-sealed and handed over to courier logistics cannot be cancelled.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
