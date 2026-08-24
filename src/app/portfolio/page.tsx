import React from "react";
import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Sparkles, ShieldCheck, Flame, Heart } from "lucide-react";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { PORTFOLIO_ITEMS } from "@/data/portfolio";
import { constructMetadata } from "@/lib/seo";

export const metadata: Metadata = constructMetadata({
  title: "Portfolio & Craft | Artisanal Preparation & Packaging | Lajja’s Foods",
  description: "Explore the culinary craft of Lajja’s Foods. Learn about our traditional stone grinding, tawa roasting rituals, and 5-layer stay-fresh packaging philosophy.",
  canonicalUrl: "https://lajjasfoods.com/portfolio/",
});

export default function PortfolioHubPage() {
  const categoryIcons: Record<string, typeof Sparkles> = {
    preparation: Flame,
    packaging: ShieldCheck,
    products: Sparkles,
    "our-journey": Heart,
  };

  return (
    <div className="py-8 sm:py-12 bg-warm-50/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <Breadcrumbs items={[{ name: "Portfolio", url: "/portfolio/" }]} />

        {/* Page Header */}
        <div className="max-w-3xl space-y-2">
          <span className="text-xs font-bold uppercase tracking-widest text-terracotta-700 bg-terracotta-100 px-3 py-1 rounded-full">
            Artisanal Culinary Craftsmanship
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-serif text-stone-900">
            Our Kitchen Rituals & Packaging Science
          </h1>
          <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
            At Lajja’s Foods, making authentic Gujarati food is an art of patience and devotion. Discover our traditional tawa roasting methods, hygienic preparation clean-rooms, and multi-layer vacuum technology that enables travel freshness.
          </p>
        </div>

        {/* Portfolio 4 Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {PORTFOLIO_ITEMS.map((item) => {
            const Icon = categoryIcons[item.category] || Sparkles;
            const itemUrl = `/portfolio/${item.slug}/`;

            return (
              <div
                key={item.id}
                className="group bg-white rounded-3xl border border-stone-200/80 hover:border-terracotta-300 shadow-xs hover:shadow-card transition-all duration-300 overflow-hidden flex flex-col justify-between"
              >
                <div>
                  <div className="relative aspect-16/9 w-full bg-stone-100 overflow-hidden">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                    <div className="absolute bottom-4 left-4 text-white">
                      <span className="text-xs text-kesari-300 font-bold uppercase tracking-wider block">
                        {item.subtitle}
                      </span>
                      <h3 className="text-xl sm:text-2xl font-bold font-serif text-white">
                        {item.title}
                      </h3>
                    </div>
                  </div>

                  <div className="p-6 space-y-4">
                    <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                      {item.description}
                    </p>

                    <div className="space-y-2 pt-2 border-t border-stone-100">
                      {item.keyHighlights.slice(0, 3).map((hl, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-xs text-stone-700">
                          <Icon className="w-3.5 h-3.5 text-terracotta-700 shrink-0" />
                          <span>{hl}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="p-6 pt-0">
                  <Link
                    href={itemUrl}
                    className="w-full py-3 px-4 bg-stone-100 hover:bg-terracotta-700 hover:text-white text-stone-800 text-xs font-bold rounded-xl transition-all flex items-center justify-center gap-1.5 group-hover:bg-terracotta-700 group-hover:text-white"
                  >
                    <span>Explore {item.title}</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
