"use client";

import React from "react";
import { UserProfile } from "@clerk/nextjs";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";

export default function AccountDetailsPage() {
  return (
    <div className="py-8 sm:py-12 bg-warm-50/40 min-h-[80vh]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <Breadcrumbs
          items={[
            { name: "My Account", url: "/my-account/" },
            { name: "Account Details", url: "/my-account/account-details/" },
          ]}
        />

        <div className="space-y-1">
          <h1 className="text-3xl sm:text-4xl font-extrabold font-serif text-stone-900">
            Account Profile & Security
          </h1>
          <p className="text-xs sm:text-sm text-stone-500">
            Manage your personal profile, email, authentication, and security preferences.
          </p>
        </div>

        {/* Unified Clerk UserProfile Embedded Component */}
        <div className="flex justify-center pt-2">
          <UserProfile
            routing="hash"
            appearance={{
              elements: {
                rootBox: "w-full shadow-xs rounded-3xl overflow-hidden",
                cardBox: "w-full shadow-none border border-stone-200 rounded-3xl bg-white",
              },
            }}
          />
        </div>
      </div>
    </div>
  );
}
