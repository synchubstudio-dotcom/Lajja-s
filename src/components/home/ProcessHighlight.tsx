import React from "react";
import Link from "next/link";
import { ArrowRight, ShieldCheck, Flame, Layers, Truck } from "lucide-react";

export function ProcessHighlight() {
  const steps = [
    {
      num: "01",
      icon: Layers,
      title: "Grain Selection & Stone Milling",
      desc: "Local Sharbati wheat milled at low temperatures daily to preserve the nutrient-rich germ layer."
    },
    {
      num: "02",
      icon: Flame,
      title: "Artisanal Tawa Roasting",
      desc: "Hand-rolled razor thin and slow-roasted on seasoned iron griddles with fresh fenugreek and dahi."
    },
    {
      num: "03",
      icon: ShieldCheck,
      title: "5-Layer Vacuum Sealing",
      desc: "Hermetically sealed in oxygen-barrier pouches in a clean-room to lock in tawa freshness for 20+ days."
    },
    {
      num: "04",
      icon: Truck,
      title: "Direct Doorstep Dispatch",
      desc: "Dispatched within 24 hours of roasting directly to your doorstep across Gujarat and India."
    }
  ];

  return (
    <section className="py-16 sm:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <span className="text-xs uppercase font-bold text-kesari-700 tracking-wider">
            Artisanal Preparation Standards
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold font-serif text-stone-900">
            From Sacred Griddle to Your Travel Bag
          </h2>
          <p className="text-sm sm:text-base text-stone-600">
            How we maintain unmatched softness, crispness, and zero-preservative longevity in every batch.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step) => {
            const Icon = step.icon;
            return (
              <div
                key={step.num}
                className="bg-stone-50/80 rounded-2xl p-6 border border-stone-200/70 relative hover:bg-kesari-50/40 hover:border-kesari-300 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-2xl font-black font-serif text-terracotta-200">
                      {step.num}
                    </span>
                    <div className="p-2.5 rounded-xl bg-white text-terracotta-700 shadow-2xs border border-stone-100">
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>
                  <h3 className="text-base font-bold font-serif text-stone-900 mb-2">
                    {step.title}
                  </h3>
                  <p className="text-xs text-stone-600 leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-12 text-center">
          <Link
            href="/portfolio/preparation/"
            className="inline-flex items-center gap-2 text-xs font-bold text-terracotta-700 hover:text-terracotta-800"
          >
            <span>Explore the Detailed Kitchen Ritual & Packaging Science</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
