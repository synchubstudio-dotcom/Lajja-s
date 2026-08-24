import React from "react";
import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Sparkles, ArrowRight } from "lucide-react";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { PORTFOLIO_ITEMS } from "@/data/portfolio";
import { constructMetadata } from "@/lib/seo";

export const metadata: Metadata = constructMetadata({
  title: "Signature Product Craftsmanship Showcase | Lajja’s Foods",
  description: "A visual showcase of Lajja’s Foods signature Gujarati products: Methi Thepla, hand-pressed Khakhra, Bharuchi Khari Sing, and curated travel hampers.",
  canonicalUrl: "https://lajjasfoods.com/portfolio/products/",
});

export default function ProductsPortfolioPage() {
  const item = PORTFOLIO_ITEMS.find((p) => p.slug === "products")!;

  return (
    <div className="py-8 sm:py-12 bg-warm-50/40">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <Breadcrumbs
          items={[
            { name: "Portfolio", url: "/portfolio/" },
            { name: "Product Showcase", url: "/portfolio/products/" },
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

        {/* Gallery */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {item.galleryImages.map((img, idx) => (
            <div key={idx} className="space-y-2 bg-white p-4 rounded-3xl border border-stone-200 shadow-xs">
              <div className="relative aspect-4/3 rounded-2xl overflow-hidden bg-stone-100">
                <Image src={img.url} alt={img.caption} fill sizes="50vw" className="object-cover" />
              </div>
              <h3 className="text-sm font-bold font-serif text-stone-900">{img.caption}</h3>
            </div>
          ))}
        </div>

        <div className="pt-6 border-t border-stone-200 flex items-center justify-between">
          <Link href="/portfolio/preparation/" className="text-xs font-bold text-stone-600 hover:text-stone-900">
            ← Kitchen Preparation Rituals
          </Link>
          <Link
            href="/products/all-products/"
            className="px-6 py-3 bg-terracotta-700 text-white font-bold text-xs rounded-xl shadow-xs hover:bg-terracotta-800"
          >
            Shop Complete Catalogue
          </Link>
        </div>
      </div>
    </div>
  );
}
