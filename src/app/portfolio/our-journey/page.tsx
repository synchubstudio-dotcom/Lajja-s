import React from "react";
import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Heart, ArrowRight } from "lucide-react";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { PORTFOLIO_ITEMS } from "@/data/portfolio";
import { constructMetadata } from "@/lib/seo";

export const metadata: Metadata = constructMetadata({
  title: "Our Heritage Journey: From Home Kitchen to Global Tables | Lajja’s Foods",
  description: "The story of how Lajja’s Foods grew from a beloved Vadodara family kitchen into Gujarat’s premier traditional food brand. Preserving culinary love and purity.",
  canonicalUrl: "https://lajjasfoods.com/portfolio/our-journey/",
});

export default function OurJourneyPortfolioPage() {
  const item = PORTFOLIO_ITEMS.find((p) => p.slug === "our-journey")!;

  return (
    <div className="py-8 sm:py-12 bg-warm-50/40">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <Breadcrumbs
          items={[
            { name: "Portfolio", url: "/portfolio/" },
            { name: "Our Journey", url: "/portfolio/our-journey/" },
          ]}
        />

        <div className="space-y-3">
          <span className="text-xs font-bold uppercase tracking-widest text-terracotta-700 bg-terracotta-100 px-3 py-1 rounded-full">
            {item.subtitle}
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-serif text-stone-900">
            {item.title}
          </h1>
          <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
            {item.detailedStory}
          </p>
        </div>

        <div className="relative aspect-16/9 w-full rounded-3xl overflow-hidden shadow-card border border-stone-200 bg-stone-100">
          <Image
            src={item.image}
            alt={item.title}
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
        </div>

        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-stone-200 shadow-xs space-y-4">
          <h2 className="text-2xl font-bold font-serif text-stone-900">
            Our Pillars of Culinary Integrity
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            {item.keyHighlights.map((hl, idx) => (
              <div key={idx} className="flex items-center gap-2.5 bg-warm-50 p-4 rounded-2xl border border-stone-200 text-xs font-semibold text-stone-800">
                <Heart className="w-4 h-4 text-terracotta-700 shrink-0" />
                <span>{hl}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="pt-6 border-t border-stone-200 flex items-center justify-between">
          <Link href="/about-us/" className="text-xs font-bold text-stone-600 hover:text-stone-900">
            Learn More About Our Team →
          </Link>
          <Link
            href="/products/all-products/"
            className="px-6 py-3 bg-terracotta-700 text-white font-bold text-xs rounded-xl shadow-xs hover:bg-terracotta-800"
          >
            Explore Snacks
          </Link>
        </div>
      </div>
    </div>
  );
}
