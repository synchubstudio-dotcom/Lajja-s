import React from "react";
import { Metadata } from "next";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { constructMetadata } from "@/lib/seo";
import { SITE_CONFIG } from "@/lib/constants";

export const metadata: Metadata = constructMetadata({
  title: "Privacy Policy | Lajja’s Foods",
  description: "Privacy Policy for Lajja’s Foods. How we collect, store, and protect your personal information when ordering traditional snacks online.",
  canonicalUrl: "https://lajjasfoods.com/privacy-policy/",
});

export default function PrivacyPolicyPage() {
  return (
    <div className="py-8 sm:py-12 bg-warm-50/40">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <Breadcrumbs items={[{ name: "Privacy Policy", url: "/privacy-policy/" }]} />

        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-stone-200 shadow-xs space-y-6 text-sm text-stone-700 leading-relaxed">
          <h1 className="text-3xl font-bold font-serif text-stone-900">
            Privacy Policy
          </h1>
          <p className="text-xs text-stone-400">Last updated: February 2026</p>

          <section className="space-y-3">
            <h2 className="text-xl font-bold font-serif text-stone-900">1. Information We Collect</h2>
            <p>
              When you purchase traditional Gujarati snacks from {SITE_CONFIG.name}, we collect personal details necessary to process and fulfill your delivery: your full name, phone number, shipping address, and email address.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold font-serif text-stone-900">2. How We Use Your Information</h2>
            <p>
              We use your data solely for processing orders, communicating shipment tracking updates with regional couriers across Gujarat and India, and improving your website experience. We do not sell or rent your personal information to third parties.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold font-serif text-stone-900">3. Payment Security</h2>
            <p>
              All online payments (UPI, Credit/Debit cards) are processed through secure, encrypted payment gateways. {SITE_CONFIG.name} does not store credit card numbers or banking passwords on its servers.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold font-serif text-stone-900">4. Contact Us</h2>
            <p>
              For privacy queries, please reach out to us at {SITE_CONFIG.contact.email} or call {SITE_CONFIG.contact.phone}.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
