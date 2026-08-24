import React from "react";
import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Heart, ShieldCheck, Award, Sparkles, CheckCircle2, ArrowRight } from "lucide-react";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { constructMetadata } from "@/lib/seo";

export const metadata: Metadata = constructMetadata({
  title: "About Us | Traditional Gujarati Food Heritage | Lajja’s Foods",
  description: "Learn about Lajja’s Foods, our founding vision in Vadodara, ancestral Gujarati recipes, women-led kitchen empowerment, and clean ingredient commitment.",
  canonicalUrl: "https://lajjasfoods.com/about-us/",
});

export default function AboutUsPage() {
  return (
    <div className="py-8 sm:py-12 bg-warm-50/40">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <Breadcrumbs items={[{ name: "About Us", url: "/about-us/" }]} />

        {/* Hero Header */}
        <div className="space-y-4 text-center max-w-3xl mx-auto">
          <span className="text-xs font-bold uppercase tracking-widest text-terracotta-700 bg-terracotta-100 px-3 py-1 rounded-full">
            Founded in Vadodara, Gujarat
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-serif text-stone-900 leading-tight">
            Preserving Gujarat’s Ancestral Culinary Soul
          </h1>
          <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
            At Lajja’s Foods, we believe traditional food is not a commodity—it is a sacred bridge connecting family memories, home warmth, and genuine health.
          </p>
        </div>

        {/* Main Brand Image */}
        <div className="relative aspect-16/9 w-full rounded-3xl overflow-hidden shadow-card border border-stone-200 bg-stone-100">
          <Image
            src="https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?auto=format&fit=crop&w=1600&q=80"
            alt="Handcrafting traditional Gujarati thepla in our Vadodara kitchen"
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
        </div>

        {/* Our Story Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="space-y-4 text-stone-700 text-sm sm:text-base leading-relaxed">
            <h2 className="text-2xl font-bold font-serif text-stone-900">
              From a Vadodara Family Hearth to Tables Across Continents
            </h2>
            <p>
              Lajja’s Foods began as a humble kitchen effort in Vadodara. When family members and children traveled overseas to university or work in the UK, USA, and Canada, we sought a way to pack wholesome homemade Methi Theplas and crunchy Khakhras that would never spoil in transit.
            </p>
            <p>
              By combining ancestral dough kneading techniques—utilizing yogurt, cold-pressed groundnut oil, turmeric, and ajwain—with modern 5-layer oxygen-barrier vacuum sealing, we cracked the code to keeping homemade theplas soft for weeks without a single pinch of synthetic preservatives.
            </p>
          </div>

          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-stone-200 shadow-xs space-y-4">
            <h3 className="text-xl font-bold font-serif text-stone-900">
              Our 4 Pillars of Integrity
            </h3>
            <div className="space-y-3 text-xs sm:text-sm text-stone-700">
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-herbal-700 shrink-0 mt-0.5" />
                <span><strong>100% Whole Wheat:</strong> Zero refined maida or artificial thickeners.</span>
              </div>
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-herbal-700 shrink-0 mt-0.5" />
                <span><strong>Pure Cold-Pressed Oils:</strong> Healthy unrefined groundnut and mustard fats.</span>
              </div>
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-herbal-700 shrink-0 mt-0.5" />
                <span><strong>Zero Chemical Additives:</strong> Shelf-stability achieved purely through culinary physics and vacuum sealing.</span>
              </div>
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-herbal-700 shrink-0 mt-0.5" />
                <span><strong>Women Artisans:</strong> Handcrafted with dignity by experienced Gujarati mothers and home chefs.</span>
              </div>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="bg-gradient-to-r from-terracotta-800 to-terracotta-900 rounded-3xl p-8 sm:p-12 text-white text-center space-y-4 shadow-card">
          <h3 className="text-2xl sm:text-3xl font-bold font-serif">
            Taste the Difference of Genuine Heritage
          </h3>
          <p className="text-stone-300 text-xs sm:text-sm max-w-lg mx-auto">
            Order your freshly roasted thepla, khakhra, and roasted groundnut packs today.
          </p>
          <div className="pt-2">
            <Link
              href="/products/all-products/"
              className="px-8 py-3.5 bg-kesari-500 hover:bg-kesari-400 text-stone-950 font-bold text-xs sm:text-sm rounded-xl shadow-xs inline-flex items-center gap-2"
            >
              <span>Explore All Delicacies</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
