"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Sparkles, ChevronRight } from "lucide-react";
import { NAV_LINKS } from "@/lib/constants";

interface MegaMenuProps {
  isOpen: boolean;
  onClose: () => void;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
}

export function MegaMenu({ isOpen, onClose, onMouseEnter, onMouseLeave }: MegaMenuProps) {
  const productsNav = NAV_LINKS.find((link) => link.isMega);
  if (!productsNav || !productsNav.categories) return null;

  return (
    <>
      {/* Background Dimming Scrim when MegaMenu is Open */}
      {isOpen && (
        <div
          className="fixed inset-0 top-[116px] bg-black/40 z-40 transition-opacity duration-200"
          onClick={onClose}
          onMouseEnter={onMouseLeave}
        />
      )}

      <div
        className={`absolute top-full left-0 right-0 w-full bg-white border-t border-b border-stone-200 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.3)] transition-all duration-200 z-50 overflow-hidden ${
          isOpen
            ? "opacity-100 visible translate-y-0"
            : "opacity-0 invisible -translate-y-2 pointer-events-none"
        }`}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-7 bg-white">
          {/* Mega Menu Top Header */}
          <div className="flex items-center justify-between pb-4 mb-5 border-b border-stone-100">
            <div className="flex items-center gap-3">
              <span className="text-xs font-bold uppercase tracking-wider text-terracotta-700 bg-terracotta-100 px-3 py-1 rounded-full">
                Traditional Food Categories
              </span>
              <h3 className="text-base sm:text-lg font-bold text-stone-900 font-serif hidden sm:inline">
                Handcrafted in Vadodara, Gujarat
              </h3>
            </div>
            <Link
              href="/products/all-products/"
              onClick={onClose}
              className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-terracotta-700 hover:text-terracotta-900 transition-colors group"
            >
              <span>View All Delicacies ({productsNav.categories.reduce((acc, c) => acc + c.items.length, 0)}+ Items)</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          {/* 5 Categories Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {productsNav.categories.map((category) => (
              <div
                key={category.slug}
                className="group/card flex flex-col bg-white hover:bg-kesari-50/70 rounded-2xl p-3 border border-stone-200 hover:border-terracotta-300 shadow-2xs hover:shadow-xs transition-all"
              >
                {/* Category Image */}
                <Link
                  href={category.href}
                  onClick={onClose}
                  className="relative h-28 w-full rounded-xl overflow-hidden mb-2.5 bg-stone-200 block shadow-2xs"
                >
                  <Image
                    src={category.image}
                    alt={category.name}
                    fill
                    sizes="(max-width: 1200px) 20vw, 240px"
                    className="object-cover group-hover/card:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                  <span className="absolute bottom-2 left-2.5 text-white text-sm font-bold font-serif leading-tight drop-shadow-xs">
                    {category.name}
                  </span>
                </Link>

                {/* Tagline */}
                <p className="text-[11px] text-stone-500 line-clamp-1 mb-2 font-medium px-0.5">
                  {category.tagline}
                </p>

                {/* Sub-items List */}
                <ul className="space-y-1 mt-auto pt-2 border-t border-stone-200/70 text-xs px-0.5">
                  {category.items.slice(0, 3).map((item) => (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        onClick={onClose}
                        className="text-stone-700 hover:text-terracotta-700 hover:underline flex items-center justify-between py-0.5 text-[11px] font-medium"
                      >
                        <span className="truncate">{item.name}</span>
                        <ChevronRight className="w-3 h-3 text-stone-400 group-hover/card:text-terracotta-600 shrink-0" />
                      </Link>
                    </li>
                  ))}
                </ul>

                {/* Explore Category Link */}
                <Link
                  href={category.href}
                  onClick={onClose}
                  className="mt-2.5 text-[11px] font-bold text-terracotta-700 hover:text-terracotta-900 flex items-center justify-between pt-1 px-0.5"
                >
                  <span>All {category.name}</span>
                  <span className="group-hover/card:translate-x-1 transition-transform">→</span>
                </Link>
              </div>
            ))}
          </div>

          {/* Highlight Travel Banner inside Mega Menu */}
          <div className="mt-5 bg-gradient-to-r from-terracotta-800 to-terracotta-900 rounded-2xl p-4 text-white flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-xs">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-kesari-500 text-stone-950 flex items-center justify-center shrink-0 font-bold">
                <Sparkles className="w-4 h-4" />
              </div>
              <div>
                <p className="text-xs sm:text-sm font-bold font-serif">
                  Flight & Travel-Ready Vacuum Packs (20+ Days Stay-Fresh Guarantee)
                </p>
                <p className="text-[11px] text-stone-300">
                  Multi-layer EVOH oxygen barrier keeps Theplas and Khakhras soft without chemicals or refrigeration.
                </p>
              </div>
            </div>
            <Link
              href="/combo-packs/travel-combo/"
              onClick={onClose}
              className="px-4 py-2 text-xs font-bold text-stone-950 bg-kesari-500 hover:bg-kesari-400 rounded-xl shadow-xs transition-colors shrink-0 text-center"
            >
              Order Flight Pack
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
