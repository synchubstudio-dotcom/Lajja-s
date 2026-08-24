import React from "react";
import { Truck, Clock, ShieldCheck, MapPin } from "lucide-react";
import { LocationData } from "@/types/location";
import { formatPrice } from "@/lib/utils";

interface CityDeliveryInfoProps {
  location: LocationData;
}

export function CityDeliveryInfo({ location }: CityDeliveryInfoProps) {
  return (
    <div className="bg-warm-50 rounded-2xl p-6 sm:p-8 border border-terracotta-200/60 my-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-stone-300/60 gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-terracotta-700">
            Local Delivery Schedule & Windows
          </span>
          <h3 className="text-xl font-bold font-serif text-stone-900 mt-1">
            Doorstep Delivery in {location.cityName}
          </h3>
        </div>
        <div className="flex items-center gap-2 text-xs font-bold text-herbal-800 bg-herbal-100 px-3 py-1.5 rounded-full self-start sm:self-auto">
          <ShieldCheck className="w-4 h-4 text-herbal-700" />
          <span>Kitchen-Dispatched Daily</span>
        </div>
      </div>

      {/* Schedule Table */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
        {location.deliverySchedule.map((sched, idx) => (
          <div
            key={idx}
            className="bg-white p-4 rounded-xl border border-stone-200 shadow-2xs space-y-2"
          >
            <div className="flex items-start justify-between gap-2">
              <h4 className="text-sm font-bold text-stone-900">{sched.area}</h4>
              {sched.expressAvailable && (
                <span className="text-[10px] font-bold bg-kesari-100 text-kesari-800 px-2 py-0.5 rounded-md shrink-0">
                  Express Available
                </span>
              )}
            </div>

            <div className="space-y-1 text-xs text-stone-600">
              <div className="flex items-center gap-2">
                <Truck className="w-3.5 h-3.5 text-terracotta-700" />
                <span className="font-semibold text-stone-800">{sched.timeline}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-3.5 h-3.5 text-stone-400" />
                <span>{sched.cutoffTime}</span>
              </div>
              <div className="text-[11px] text-stone-500 pt-1">
                Min. Order: {formatPrice(sched.minimumOrder)}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Direct Pickup Hub Address if present */}
      {location.localPickupAddress && (
        <div className="mt-6 pt-6 border-t border-stone-300/60 bg-white/70 p-4 rounded-xl border border-stone-200">
          <div className="flex items-start gap-3">
            <div className="p-2 rounded-lg bg-kesari-100 text-kesari-800 shrink-0">
              <MapPin className="w-4 h-4" />
            </div>
            <div className="text-xs space-y-1">
              <h5 className="font-bold text-stone-900 text-sm">
                Direct Kitchen Pickup Hub
              </h5>
              <p className="text-stone-700">
                {location.localPickupAddress.street}, {location.localPickupAddress.neighborhood}, {location.localPickupAddress.city} - {location.localPickupAddress.pincode}
              </p>
              <p className="text-stone-500 text-[11px]">
                Landmark: {location.localPickupAddress.landmark} | Hours: {location.localPickupAddress.operatingHours}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
