import React from "react";
import Link from "next/link";
import { MapPin, Truck, ArrowRight } from "lucide-react";
import { LOCATIONS } from "@/data/locations";

export function LocalCoverage() {
  return (
    <section className="py-16 sm:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4">
          <div>
            <span className="text-xs uppercase font-bold text-kesari-700 tracking-wider">
              Local Delivery Across Gujarat
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold font-serif text-stone-900 mt-1">
              Fresh From Our Central Kitchen in Vadodara
            </h2>
          </div>
          <Link
            href="/locations/"
            className="inline-flex items-center gap-1.5 text-sm font-bold text-terracotta-700 hover:text-terracotta-800 group"
          >
            <span>Explore All 6 Delivery Cities</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {LOCATIONS.map((loc) => (
            <Link
              key={loc.id}
              href={`/locations/${loc.slug}/`}
              className="group p-4 bg-stone-50/80 hover:bg-kesari-50/50 rounded-2xl border border-stone-200/80 hover:border-kesari-300 transition-all text-center flex flex-col items-center justify-between min-h-[140px]"
            >
              <div className="w-10 h-10 rounded-full bg-white text-terracotta-700 flex items-center justify-center shadow-2xs border border-stone-100 group-hover:bg-terracotta-700 group-hover:text-white transition-all">
                <MapPin className="w-5 h-5" />
              </div>

              <div>
                <h3 className="text-sm font-bold text-stone-900 font-serif group-hover:text-terracotta-800 transition-colors">
                  {loc.cityName}
                </h3>
                <span className="text-[11px] text-stone-500 block">
                  {loc.isKitchenHub ? "HQ Kitchen Hub" : "Next-Day Delivery"}
                </span>
              </div>

              <span className="text-[10px] font-bold text-terracotta-700 group-hover:underline">
                View Timelines →
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
