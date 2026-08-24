"use client";

import React, { useState } from "react";
import { MapPin, Plus, CheckCircle2 } from "lucide-react";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";

export default function MyAddressesPage() {
  const [savedAddresses, setSavedAddresses] = useState([
    {
      id: "addr-1",
      name: "Home (Vadodara)",
      address: "402, Shivam Heights, Near ISKCON Temple, Vasna-Bhayli Road",
      city: "Vadodara",
      state: "Gujarat",
      pincode: "390020",
      isDefault: true,
    },
  ]);

  return (
    <div className="py-8 sm:py-12 bg-warm-50/40">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <Breadcrumbs
          items={[
            { name: "My Account", url: "/my-account/" },
            { name: "Addresses", url: "/my-account/addresses/" },
          ]}
        />

        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl sm:text-4xl font-extrabold font-serif text-stone-900">
              Saved Shipping Addresses
            </h1>
            <p className="text-xs sm:text-sm text-stone-500 mt-1">
              Addresses used for delivering fresh Gujarati thepla and snack orders.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {savedAddresses.map((addr) => (
            <div
              key={addr.id}
              className="bg-white rounded-3xl p-6 border-2 border-terracotta-500 shadow-xs space-y-3 relative"
            >
              <div className="flex items-center justify-between">
                <span className="font-bold text-stone-900 text-sm font-serif">{addr.name}</span>
                {addr.isDefault && (
                  <span className="text-[10px] font-bold bg-terracotta-100 text-terracotta-800 px-2 py-0.5 rounded-full">
                    Default
                  </span>
                )}
              </div>
              <p className="text-xs text-stone-600 leading-relaxed">
                {addr.address}, {addr.city}, {addr.state} - {addr.pincode}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
