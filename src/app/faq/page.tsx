import React from "react";
import { Metadata } from "next";
import Link from "next/link";
import { HelpCircle, Phone, MessageSquare } from "lucide-react";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { JsonLd } from "@/components/seo/JsonLd";
import { FAQS } from "@/data/faqs";
import { constructMetadata } from "@/lib/seo";
import { generateFAQSchema } from "@/lib/schema";
import { SITE_CONFIG } from "@/lib/constants";

export const metadata: Metadata = constructMetadata({
  title: "Frequently Asked Questions (FAQ) | Shelf Life, Packaging & Delivery | Lajja’s Foods",
  description: "Find answers about Lajja’s Foods Gujarati thepla shelf life, vacuum travel packaging, international flight rules, delivery timelines, and bulk ordering.",
  canonicalUrl: "https://lajjasfoods.com/faq/",
});

export default function FaqPage() {
  const categories = Array.from(new Set(FAQS.map((f) => f.category)));

  return (
    <div className="py-8 sm:py-12 bg-warm-50/40">
      <JsonLd data={generateFAQSchema(FAQS)} />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <Breadcrumbs items={[{ name: "FAQ", url: "/faq/" }]} />

        {/* Page Header */}
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <span className="text-xs font-bold uppercase tracking-widest text-terracotta-700 bg-terracotta-100 px-3 py-1 rounded-full">
            Help Center
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-serif text-stone-900">
            Frequently Asked Questions
          </h1>
          <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
            Everything you need to know about our authentic ingredients, vacuum stay-fresh packaging, flight compliance, and delivery across Gujarat.
          </p>
        </div>

        {/* Grouped FAQs by Category */}
        <div className="space-y-10">
          {categories.map((cat) => {
            const catFaqs = FAQS.filter((f) => f.category === cat);
            return (
              <div key={cat} className="space-y-4">
                <h2 className="text-xl font-bold font-serif text-stone-900 border-b border-stone-200 pb-2">
                  {cat}
                </h2>
                <div className="space-y-3">
                  {catFaqs.map((faq) => (
                    <details
                      key={faq.id}
                      className="group bg-white rounded-2xl p-5 border border-stone-200/80 shadow-2xs open:border-terracotta-300 transition-all"
                    >
                      <summary className="font-bold text-stone-900 text-sm sm:text-base cursor-pointer list-none flex items-center justify-between gap-4">
                        <span className="group-hover:text-terracotta-800 transition-colors">
                          {faq.question}
                        </span>
                        <span className="text-stone-400 group-open:rotate-180 transition-transform text-lg shrink-0">
                          ▾
                        </span>
                      </summary>
                      <div className="mt-3 pt-3 border-t border-stone-100 text-xs sm:text-sm text-stone-600 leading-relaxed">
                        {faq.answer}
                      </div>
                    </details>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Contact Assistance Box */}
        <div className="bg-white rounded-3xl p-8 border border-stone-200 shadow-xs text-center space-y-4">
          <h3 className="text-xl font-bold font-serif text-stone-900">
            Still Have Questions?
          </h3>
          <p className="text-xs sm:text-sm text-stone-600 max-w-md mx-auto">
            Our Vadodara kitchen support team is available Mon-Sun 8:00 AM - 8:30 PM to assist with orders and custom dietary needs.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <a
              href={`tel:${SITE_CONFIG.contact.phone}`}
              className="px-6 py-3 bg-terracotta-700 hover:bg-terracotta-800 text-white text-xs font-bold rounded-xl shadow-2xs flex items-center gap-2"
            >
              <Phone className="w-4 h-4" />
              <span>Call {SITE_CONFIG.contact.phone}</span>
            </a>
            <Link
              href="/contact-us/"
              className="px-6 py-3 bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-bold rounded-xl flex items-center gap-2"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Send Message</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
