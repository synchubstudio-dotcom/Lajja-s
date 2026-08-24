"use client";

import React, { useState } from "react";
import Link from "next/link";
import { X, ChevronDown, Phone, ShoppingBag, MapPin, Sparkles } from "lucide-react";
import { NAV_LINKS, SITE_CONFIG } from "@/lib/constants";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  const [expandedCategory, setExpandedCategory] = useState<string | null>("thepla");
  const productsNav = NAV_LINKS.find((link) => link.isMega);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 lg:hidden">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Slide-out Drawer */}
      <div className="fixed inset-y-0 left-0 max-w-xs w-full bg-white shadow-2xl z-50 flex flex-col overflow-y-auto">
        {/* Drawer Header */}
        <div className="p-4 border-b border-stone-200 flex items-center justify-between bg-warm-50">
          <div>
            <span className="text-lg font-bold font-serif text-terracotta-800 tracking-tight">
              {SITE_CONFIG.name}
            </span>
            <p className="text-[10px] text-stone-500 uppercase tracking-wider">
              Authentic Gujarati Delicacies
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-stone-600 hover:text-stone-900 rounded-lg hover:bg-stone-200/50"
            aria-label="Close navigation menu"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Content */}
        <div className="flex-1 px-4 py-4 space-y-3">
          <Link
            href="/"
            onClick={onClose}
            className="block py-2 text-sm font-semibold text-stone-800 hover:text-terracotta-700"
          >
            Home
          </Link>

          {/* Products Collapsible Accordion */}
          <div className="border-t border-b border-stone-100 py-2">
            <div className="flex items-center justify-between py-2">
              <Link
                href="/products/all-products/"
                onClick={onClose}
                className="text-sm font-bold text-terracotta-800 flex items-center gap-1.5"
              >
                <ShoppingBag className="w-4 h-4 text-kesari-600" />
                <span>All Products</span>
              </Link>
            </div>

            {/* Category list */}
            <div className="pl-2 space-y-2 mt-2">
              {productsNav?.categories?.map((cat) => {
                const isExpanded = expandedCategory === cat.slug;
                return (
                  <div key={cat.slug} className="border-l-2 border-kesari-200 pl-3 py-1">
                    <div className="flex items-center justify-between">
                      <Link
                        href={cat.href}
                        onClick={onClose}
                        className="text-xs font-bold text-stone-800 hover:text-terracotta-700"
                      >
                        {cat.name}
                      </Link>
                      <button
                        onClick={() => setExpandedCategory(isExpanded ? null : cat.slug)}
                        className="p-1 text-stone-400 hover:text-stone-700"
                        aria-label={`Toggle ${cat.name} sub-items`}
                      >
                        <ChevronDown
                          className={`w-3.5 h-3.5 transition-transform ${
                            isExpanded ? "rotate-180" : ""
                          }`}
                        />
                      </button>
                    </div>

                    {isExpanded && (
                      <ul className="mt-1.5 space-y-1 pl-1">
                        {cat.items.map((item) => (
                          <li key={item.href}>
                            <Link
                              href={item.href}
                              onClick={onClose}
                              className="text-[11px] text-stone-600 hover:text-terracotta-700 block py-0.5"
                            >
                              {item.name}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Other Main Links */}
          <Link
            href="/about-us/"
            onClick={onClose}
            className="block py-2 text-sm font-medium text-stone-700 hover:text-terracotta-700"
          >
            About Us
          </Link>

          <Link
            href="/locations/"
            onClick={onClose}
            className="block py-2 text-sm font-medium text-stone-700 hover:text-terracotta-700 flex items-center justify-between"
          >
            <span className="flex items-center gap-1.5">
              <MapPin className="w-4 h-4 text-terracotta-600" />
              <span>Locations (Gujarat)</span>
            </span>
            <span className="text-[10px] bg-kesari-100 text-kesari-800 font-semibold px-2 py-0.5 rounded-full">
              6 Cities
            </span>
          </Link>

          <Link
            href="/portfolio/"
            onClick={onClose}
            className="block py-2 text-sm font-medium text-stone-700 hover:text-terracotta-700"
          >
            Portfolio & Heritage
          </Link>

          <Link
            href="/blog/"
            onClick={onClose}
            className="block py-2 text-sm font-medium text-stone-700 hover:text-terracotta-700"
          >
            Food & Recipe Blog
          </Link>

          <Link
            href="/faq/"
            onClick={onClose}
            className="block py-2 text-sm font-medium text-stone-700 hover:text-terracotta-700"
          >
            FAQ
          </Link>

          <Link
            href="/contact-us/"
            onClick={onClose}
            className="block py-2 text-sm font-medium text-stone-700 hover:text-terracotta-700"
          >
            Contact Us
          </Link>
        </div>

        {/* Drawer Footer with Quick Support */}
        <div className="p-4 border-t border-stone-200 bg-stone-50 text-xs space-y-2">
          <div className="flex items-center gap-2 text-stone-700 font-semibold">
            <Phone className="w-3.5 h-3.5 text-herbal-700" />
            <span>Order Assistance: {SITE_CONFIG.contact.phone}</span>
          </div>
          <p className="text-[11px] text-stone-500">
            Fresh kitchen dispatched daily from Vadodara.
          </p>
        </div>
      </div>
    </div>
  );
}
