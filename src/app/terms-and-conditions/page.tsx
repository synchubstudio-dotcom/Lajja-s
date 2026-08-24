import React from "react";
import { Metadata } from "next";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { constructMetadata } from "@/lib/seo";
import { SITE_CONFIG } from "@/lib/constants";

export const metadata: Metadata = constructMetadata({
  title: "Terms & Conditions | Lajja’s Foods",
  description: "Terms and conditions governing the purchase of traditional snacks from Lajja’s Foods website.",
  canonicalUrl: "https://lajjasfoods.com/terms-and-conditions/",
});

export default function TermsPage() {
  return (
    <div className="py-8 sm:py-12 bg-warm-50/40">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <Breadcrumbs items={[{ name: "Terms & Conditions", url: "/terms-and-conditions/" }]} />

        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-stone-200 shadow-xs space-y-6 text-sm text-stone-700 leading-relaxed">
          <h1 className="text-3xl font-bold font-serif text-stone-900">
            Terms & Conditions
          </h1>
          <p className="text-xs text-stone-400">Last updated: February 2026</p>

          <section className="space-y-3">
            <h2 className="text-xl font-bold font-serif text-stone-900">1. Product Quality & Authenticity</h2>
            <p>
              {SITE_CONFIG.name} handcrafts traditional food items with authentic ingredients without chemical preservatives. Colors and slight textures may naturally vary between batches due to the use of seasonal fresh fenugreek (methi) and stone-ground grains.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold font-serif text-stone-900">2. Pricing and Taxes</h2>
            <p>
              All prices listed on the website are in Indian Rupees (INR) and inclusive of applicable GST.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold font-serif text-stone-900">3. Governing Law</h2>
            <p>
              Any disputes arising out of purchases on this website shall be subject to the exclusive jurisdiction of the courts in Vadodara, Gujarat, India.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
