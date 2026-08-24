import React from "react";
import { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { LocationCard } from "@/components/locations/LocationCard";
import { LOCATIONS } from "@/data/locations";
import { constructMetadata } from "@/lib/seo";

export const metadata: Metadata = constructMetadata({
  title: "Delivery Locations Across Gujarat | Fresh Gujarati Snacks | Lajja’s Foods",
  description: "Explore our delivery coverage across Vadodara, Ahmedabad, Surat, Rajkot, Anand, and Bharuch. Direct central kitchen dispatch for fresh Thepla and Khakhra.",
  canonicalUrl: "https://lajjasfoods.com/locations/",
});

export default function LocationsHubPage() {
  return (
    <div className="py-8 sm:py-12 bg-warm-50/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <Breadcrumbs items={[{ name: "Locations", url: "/locations/" }]} />

        {/* Page Header */}
        <div className="text-left max-w-3xl space-y-2">
          <span className="text-xs font-bold uppercase tracking-widest text-terracotta-700 bg-terracotta-100 px-3 py-1 rounded-full">
            Gujarat Direct Kitchen Network
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-serif text-stone-900">
            Fresh Gujarati Snacks Delivered Across Gujarat
          </h1>
          <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
            From our central artisanal kitchen in Vadodara to doorsteps in Ahmedabad, Surat, Rajkot, Anand, and Bharuch. Experience same-day and express next-day delivery of authentic Gujarati theplas, khakhras, and roasted snacks.
          </p>
        </div>

        {/* Cities Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {LOCATIONS.map((loc) => (
            <LocationCard key={loc.id} location={loc} />
          ))}
        </div>
      </div>
    </div>
  );
}
