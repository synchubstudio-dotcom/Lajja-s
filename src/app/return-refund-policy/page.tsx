import React from "react";
import { Metadata } from "next";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { constructMetadata } from "@/lib/seo";
import { SITE_CONFIG } from "@/lib/constants";

export const metadata: Metadata = constructMetadata({
  title: "Return & Refund Policy | Lajja’s Foods",
  description: "Return and refund guidelines for perishable and packaged traditional Gujarati foods from Lajja’s Foods.",
  canonicalUrl: "https://lajjasfoods.com/return-refund-policy/",
});

export default function ReturnRefundPolicyPage() {
  return (
    <div className="py-8 sm:py-12 bg-warm-50/40">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <Breadcrumbs items={[{ name: "Return & Refund Policy", url: "/return-refund-policy/" }]} />

        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-stone-200 shadow-xs space-y-6 text-sm text-stone-700 leading-relaxed">
          <h1 className="text-3xl font-bold font-serif text-stone-900">
            Return & Refund Policy
          </h1>
          <p className="text-xs text-stone-400">Last updated: February 2026</p>

          <section className="space-y-3">
            <h2 className="text-xl font-bold font-serif text-stone-900">1. Perishable Food Policy</h2>
            <p>
              Because our food items are prepared fresh to order without artificial chemical preservatives, returns of opened or consumable food packages cannot be accepted for food safety and hygiene reasons.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold font-serif text-stone-900">2. Transit Damage or Defective Seal Guarantee</h2>
            <p>
              If your package arrives damaged in courier transit or if the inner primary vacuum seal was compromised during delivery, please notify us with photos within 24 hours of delivery at {SITE_CONFIG.contact.email} or WhatsApp {SITE_CONFIG.contact.phone}. We will immediately issue a replacement batch or a 100% full refund to your original payment method.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold font-serif text-stone-900">3. Refund Processing</h2>
            <p>
              Approved refunds are credited to the customer&apos;s bank account or UPI within 3-5 business days.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
