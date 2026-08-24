import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Sparkles, ShieldCheck, Clock, Award } from "lucide-react";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-warm-50/80 border-b border-stone-200/80 py-16 sm:py-24">
      {/* Background Decorative Gradient */}
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 rounded-full bg-kesari-200/40 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-96 h-96 rounded-full bg-terracotta-200/30 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Text Content Column */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-kesari-100/80 border border-kesari-200 text-terracotta-800 text-xs font-bold shadow-2xs">
              <Sparkles className="w-3.5 h-3.5 text-kesari-700" />
              <span>Ancestral Gujarati Recipes • 100% Whole Wheat & Zero Maida</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold font-serif text-stone-900 tracking-tight leading-[1.15]">
              Authentic Gujarati Snacks Made with <span className="text-terracotta-800">Tradition & Purity</span>
            </h1>

            <p className="text-base sm:text-lg text-stone-600 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
              Experience the nostalgic warmth of freshly roasted Methi Thepla, hand-pressed Khakhra, and Bharuchi salted groundnuts. Prepared in small batches with cold-pressed spices and vacuum-sealed for 20+ days of travel freshness.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              <Link
                href="/products/all-products/"
                className="w-full sm:w-auto px-8 py-4 bg-terracotta-700 hover:bg-terracotta-800 active:scale-95 text-white font-bold text-sm rounded-xl shadow-card transition-all flex items-center justify-center gap-2 group"
              >
                <span>Shop All Snacks</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>

              <Link
                href="/combo-packs/travel-combo/"
                className="w-full sm:w-auto px-7 py-4 bg-white hover:bg-stone-50 active:scale-95 text-stone-800 font-bold text-sm rounded-xl border border-stone-300 shadow-2xs transition-all flex items-center justify-center gap-2"
              >
                <Sparkles className="w-4 h-4 text-kesari-600" />
                <span>Explore Travel Combos</span>
              </Link>
            </div>

            {/* Micro Trust Indicators */}
            <div className="pt-6 border-t border-stone-200/80 grid grid-cols-3 gap-4 text-left">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-lg bg-kesari-100 text-kesari-800 shrink-0">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div>
                  <span className="block text-xs font-bold text-stone-900 font-serif">Vacuum Sealed</span>
                  <span className="text-[11px] text-stone-500">20+ Days Fresh</span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <div className="p-2 rounded-lg bg-kesari-100 text-kesari-800 shrink-0">
                  <Clock className="w-4 h-4" />
                </div>
                <div>
                  <span className="block text-xs font-bold text-stone-900 font-serif">Daily Kitchen</span>
                  <span className="text-[11px] text-stone-500">Roasted to Order</span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <div className="p-2 rounded-lg bg-kesari-100 text-kesari-800 shrink-0">
                  <Award className="w-4 h-4" />
                </div>
                <div>
                  <span className="block text-xs font-bold text-stone-900 font-serif">100% Purity</span>
                  <span className="text-[11px] text-stone-500">Zero Added Chem</span>
                </div>
              </div>
            </div>
          </div>

          {/* Hero Imagery Column */}
          <div className="lg:col-span-5 relative">
            <div className="relative aspect-4/3 sm:aspect-square w-full rounded-3xl overflow-hidden shadow-hover border-4 border-white bg-stone-100">
              <Image
                src="https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?auto=format&fit=crop&w=1200&q=80"
                alt="Freshly roasted traditional Gujarati Methi Thepla served with sweet mango chundo and tea"
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 500px"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

              {/* Floating Testimonial Pill */}
              <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-md p-3.5 rounded-2xl border border-stone-200/80 shadow-card">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full overflow-hidden bg-stone-200 shrink-0 relative">
                    <Image
                      src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=100&q=80"
                      alt="Lajjaben Patel"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="text-xs">
                    <p className="font-bold text-stone-900">
                      &quot;Crafted just like our grandmother rolled them in Vadodara.&quot;
                    </p>
                    <p className="text-[11px] text-stone-500">
                      — Lajjaben Patel, Culinary Curator
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
