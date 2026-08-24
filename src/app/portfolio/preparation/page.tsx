import React from "react";
import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Flame, CheckCircle2, ArrowRight, Layers } from "lucide-react";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { PORTFOLIO_ITEMS } from "@/data/portfolio";
import { constructMetadata } from "@/lib/seo";

export const metadata: Metadata = constructMetadata({
  title: "Artisanal Kitchen & Preparation Rituals | Lajja’s Foods",
  description: "Witness the authentic step-by-step culinary journey behind every batch of Lajja’s Foods theplas and khakhras. Stone grinding, hand kneading, and iron tawa roasting.",
  canonicalUrl: "https://lajjasfoods.com/portfolio/preparation/",
});

export default function PreparationPortfolioPage() {
  const item = PORTFOLIO_ITEMS.find((p) => p.slug === "preparation")!;

  return (
    <div className="py-8 sm:py-12 bg-warm-50/40">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <Breadcrumbs
          items={[
            { name: "Portfolio", url: "/portfolio/" },
            { name: "Preparation Rituals", url: "/portfolio/preparation/" },
          ]}
        />

        {/* Title */}
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

        {/* Hero Image */}
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

        {/* Step-by-Step Process */}
        {item.processSteps && (
          <div className="bg-white rounded-3xl p-6 sm:p-10 border border-stone-200 shadow-xs space-y-8">
            <h2 className="text-2xl font-bold font-serif text-stone-900">
              The 4 Sacred Kitchen Stages
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {item.processSteps.map((step) => (
                <div
                  key={step.stepNumber}
                  className="bg-stone-50 p-5 rounded-2xl border border-stone-200/80 space-y-2"
                >
                  <span className="w-8 h-8 rounded-full bg-terracotta-700 text-white font-bold text-xs flex items-center justify-center font-serif">
                    {step.stepNumber}
                  </span>
                  <h3 className="text-base font-bold text-stone-900 font-serif">
                    {step.title}
                  </h3>
                  <p className="text-xs text-stone-600 leading-relaxed">
                    {step.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Gallery Images */}
        <div className="space-y-4">
          <h3 className="text-xl font-bold font-serif text-stone-900">
            Kitchen Gallery & Handcraft Moments
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {item.galleryImages.map((img, idx) => (
              <div key={idx} className="space-y-1.5">
                <div className="relative aspect-4/3 rounded-2xl overflow-hidden border border-stone-200 bg-stone-100">
                  <Image src={img.url} alt={img.caption} fill sizes="33vw" className="object-cover" />
                </div>
                <p className="text-[11px] text-stone-500 text-center">{img.caption}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="pt-6 border-t border-stone-200 flex items-center justify-between">
          <Link href="/portfolio/packaging/" className="text-xs font-bold text-stone-600 hover:text-stone-900">
            Next: Packaging Philosophy →
          </Link>
          <Link
            href="/products/all-products/"
            className="px-6 py-3 bg-terracotta-700 text-white font-bold text-xs rounded-xl shadow-xs hover:bg-terracotta-800"
          >
            Taste Our Handcrafted Snacks
          </Link>
        </div>
      </div>
    </div>
  );
}
