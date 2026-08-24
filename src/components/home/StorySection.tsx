import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, CheckCircle2 } from "lucide-react";

export function StorySection() {
  return (
    <section className="py-16 sm:py-24 bg-warm-50/70 border-t border-b border-stone-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Images Collages */}
          <div className="lg:col-span-6 relative">
            <div className="relative aspect-4/3 rounded-3xl overflow-hidden shadow-card border-4 border-white bg-stone-200">
              <Image
                src="https://images.unsplash.com/photo-1599488615731-7e5c2823ff28?auto=format&fit=crop&w=1000&q=80"
                alt="Hand pressing traditional Gujarati khakhra on cast-iron griddle"
                fill
                sizes="(max-width: 1024px) 100vw, 500px"
                className="object-cover"
              />
            </div>
            {/* Small Overlay Picture */}
            <div className="hidden sm:block absolute -bottom-8 -right-6 w-48 h-48 rounded-2xl overflow-hidden border-4 border-white shadow-hover bg-stone-100">
              <Image
                src="https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?auto=format&fit=crop&w=400&q=80"
                alt="Fresh thepla rolling"
                fill
                sizes="200px"
                className="object-cover"
              />
            </div>
          </div>

          {/* Text Content */}
          <div className="lg:col-span-6 space-y-6">
            <div>
              <span className="text-xs uppercase font-bold text-terracotta-700 tracking-wider">
                Authentic Food Heritage
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold font-serif text-stone-900 mt-1">
                The Generational Wisdom Behind Every Bite
              </h2>
            </div>

            <p className="text-sm sm:text-base text-stone-600 leading-relaxed">
              In Gujarati culture, food is far more than sustenance—it is a sacred language of affection, care, and hospitality. Every thepla rolled in our kitchen honors the ancestral technique of kneading stone-ground whole wheat with fresh yogurt and curative spices.
            </p>

            <div className="space-y-3 pt-2">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-herbal-700 shrink-0 mt-0.5" />
                <p className="text-xs sm:text-sm text-stone-700">
                  <strong>Zero Refined Flour (Maida):</strong> We never compromise with cheap fillers. 100% whole grain wheat for pure digestive vitality.
                </p>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-herbal-700 shrink-0 mt-0.5" />
                <p className="text-xs sm:text-sm text-stone-700">
                  <strong>Cold-Pressed Spices:</strong> Unheated mustard and groundnut oils preserve natural aromatic polyphenols.
                </p>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-herbal-700 shrink-0 mt-0.5" />
                <p className="text-xs sm:text-sm text-stone-700">
                  <strong>Women-Led Kitchen Artisans:</strong> Empowering skilled traditional Gujarati cooks who understand the precise touch needed for paper-thin thepla.
                </p>
              </div>
            </div>

            <div className="pt-4">
              <Link
                href="/portfolio/our-journey/"
                className="inline-flex items-center gap-2 text-sm font-bold text-terracotta-700 hover:text-terracotta-800 group"
              >
                <span>Read Our Full Story & Kitchen Journey</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
