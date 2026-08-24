import React from "react";
import Link from "next/link";
import Image from "next/image";
import { MapPin, Truck, ArrowRight, Sparkles } from "lucide-react";
import { LocationData } from "@/types/location";

interface LocationCardProps {
  location: LocationData;
}

export function LocationCard({ location }: LocationCardProps) {
  const locationUrl = `/locations/${location.slug}/`;

  return (
    <div className="group bg-white rounded-2xl border border-stone-200/80 hover:border-kesari-300 shadow-xs hover:shadow-card transition-all duration-300 overflow-hidden flex flex-col justify-between">
      <div>
        <div className="relative aspect-16/9 w-full bg-stone-100 overflow-hidden">
          <Image
            src={location.heroImage}
            alt={`Authentic Gujarati snacks delivery in ${location.cityName}`}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

          <div className="absolute bottom-3 left-3 text-white">
            <span className="text-xs text-kesari-300 font-semibold uppercase tracking-wider block">
              {location.state}
            </span>
            <h3 className="text-xl font-bold font-serif text-white">
              {location.cityName} {location.gujaratiCityName && `(${location.gujaratiCityName})`}
            </h3>
          </div>

          {location.isKitchenHub && (
            <div className="absolute top-3 right-3 bg-kesari-600 text-white text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-md shadow-sm flex items-center gap-1">
              <Sparkles className="w-3 h-3" /> Central Kitchen
            </div>
          )}
        </div>

        <div className="p-5 space-y-3">
          <p className="text-xs text-stone-600 line-clamp-2 leading-relaxed">
            {location.shortDescription}
          </p>

          <div className="pt-2 border-t border-stone-100 space-y-1.5 text-xs text-stone-600">
            <div className="flex items-center gap-2 font-medium">
              <Truck className="w-3.5 h-3.5 text-terracotta-700 shrink-0" />
              <span>{location.deliverySchedule[0]?.timeline || "Fast Delivery Available"}</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="w-3.5 h-3.5 text-kesari-600 shrink-0" />
              <span className="line-clamp-1">
                Areas: {location.servingAreas.slice(0, 4).join(", ")} +more
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="p-5 pt-0">
        <Link
          href={locationUrl}
          className="w-full py-2.5 px-4 bg-stone-100 hover:bg-terracotta-700 hover:text-white text-stone-800 text-xs font-bold rounded-xl transition-all flex items-center justify-center gap-1.5 group-hover:bg-terracotta-700 group-hover:text-white"
        >
          <span>View {location.cityName} Delivery Info</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  );
}
