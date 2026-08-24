"use client";

import React, { useState } from "react";
import { User, CheckCircle2 } from "lucide-react";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";

export default function AccountDetailsPage() {
  const [profile, setProfile] = useState({
    firstName: "Anand",
    lastName: "Patel",
    email: "anand.patel@example.com",
    phone: "+91 98765 43210",
  });
  const [saved, setSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="py-8 sm:py-12 bg-warm-50/40">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <Breadcrumbs
          items={[
            { name: "My Account", url: "/my-account/" },
            { name: "Account Details", url: "/my-account/account-details/" },
          ]}
        />

        <div className="space-y-1">
          <h1 className="text-3xl sm:text-4xl font-extrabold font-serif text-stone-900">
            Personal Account Details
          </h1>
          <p className="text-xs sm:text-sm text-stone-500">
            Manage your personal profile and communication preferences.
          </p>
        </div>

        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-stone-200 shadow-xs">
          {saved && (
            <div className="mb-6 p-3.5 bg-herbal-50 border border-herbal-200 rounded-xl text-xs font-bold text-herbal-800 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-herbal-600" />
              <span>Your profile details have been saved successfully!</span>
            </div>
          )}

          <form onSubmit={handleSave} className="space-y-4 text-xs sm:text-sm">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase text-stone-700 mb-1">
                  First Name
                </label>
                <input
                  type="text"
                  value={profile.firstName}
                  onChange={(e) => setProfile({ ...profile, firstName: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-stone-50 border border-stone-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-terracotta-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-stone-700 mb-1">
                  Last Name
                </label>
                <input
                  type="text"
                  value={profile.lastName}
                  onChange={(e) => setProfile({ ...profile, lastName: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-stone-50 border border-stone-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-terracotta-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase text-stone-700 mb-1">
                Email Address
              </label>
              <input
                type="email"
                value={profile.email}
                onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                className="w-full px-3.5 py-2.5 bg-stone-50 border border-stone-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-terracotta-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase text-stone-700 mb-1">
                Phone Number
              </label>
              <input
                type="tel"
                value={profile.phone}
                onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                className="w-full px-3.5 py-2.5 bg-stone-50 border border-stone-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-terracotta-500"
              />
            </div>

            <div className="pt-2">
              <button
                type="submit"
                className="px-6 py-3 bg-terracotta-700 hover:bg-terracotta-800 text-white font-bold text-xs rounded-xl shadow-xs transition-colors"
              >
                Save Changes
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
