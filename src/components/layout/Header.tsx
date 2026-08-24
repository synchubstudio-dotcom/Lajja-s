"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  ShoppingBag, 
  Menu, 
  ChevronDown, 
  Search, 
  Phone, 
  User, 
  Sparkles,
  MapPin
} from "lucide-react";
import { NAV_LINKS, SITE_CONFIG } from "@/lib/constants";
import { MegaMenu } from "./MegaMenu";
import { MobileMenu } from "./MobileMenu";
import { useCartStore } from "@/store/cartStore";

export function Header() {
  const pathname = usePathname();
  const [isMegaOpen, setIsMegaOpen] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const megaTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const itemCount = useCartStore((state) => state.getItemCount());
  const setDrawerOpen = useCartStore((state) => state.setDrawerOpen);

  const handleMouseEnter = () => {
    if (megaTimeoutRef.current) clearTimeout(megaTimeoutRef.current);
    setIsMegaOpen(true);
  };

  const handleMouseLeave = () => {
    megaTimeoutRef.current = setTimeout(() => {
      setIsMegaOpen(false);
    }, 150);
  };

  // Close menus on route changes
  useEffect(() => {
    setIsMegaOpen(false);
    setIsMobileOpen(false);
    setIsSearchOpen(false);
  }, [pathname]);

  return (
    <>
      {/* Top Notification Announcement Bar */}
      <div className="bg-terracotta-900 text-terracotta-50 text-[11px] sm:text-xs py-1.5 px-4 font-medium">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="bg-kesari-500 text-stone-950 font-bold px-1.5 py-0.2 rounded text-[10px] uppercase">
              Fresh Daily
            </span>
            <span className="hidden sm:inline">
              Handcrafted in Vadodara with 100% Whole Wheat & Cold-Pressed Spices
            </span>
            <span className="sm:hidden">
              Vacuum-Sealed Gujarati Snacks Delivered Fresh
            </span>
          </div>

          <div className="flex items-center gap-4">
            <Link
              href="/combo-packs/travel-combo/"
              className="text-kesari-300 hover:text-white flex items-center gap-1 transition-colors"
            >
              <Sparkles className="w-3 h-3 text-kesari-400" />
              <span>International Travel Packs</span>
            </Link>
            <a
              href={`tel:${SITE_CONFIG.contact.phone}`}
              className="hidden md:flex items-center gap-1 text-stone-300 hover:text-white"
            >
              <Phone className="w-3 h-3" />
              <span>{SITE_CONFIG.contact.phone}</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Semantic Navigation Bar */}
      <header className="sticky top-0 z-50 bg-white border-b border-stone-200 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Mobile Menu Button */}
            <div className="flex items-center gap-2 lg:hidden">
              <button
                onClick={() => setIsMobileOpen(true)}
                className="p-2 text-stone-700 hover:text-stone-900 rounded-lg hover:bg-stone-100"
                aria-label="Open mobile menu"
              >
                <Menu className="w-6 h-6" />
              </button>
            </div>

            {/* Brand Logo & Tagline */}
            <div className="flex items-center gap-4">
              <Link href="/" className="group flex flex-col">
                <span className="text-2xl sm:text-3xl font-extrabold font-serif tracking-tight text-terracotta-800 group-hover:text-kesari-700 transition-colors">
                  {SITE_CONFIG.name}
                </span>
                <span className="text-[10px] tracking-widest uppercase font-semibold text-kesari-700 -mt-1 font-sans">
                  Authentic Gujarati Delicacies
                </span>
              </Link>
            </div>

            {/* Desktop Navigation Links */}
            <nav
              aria-label="Main Navigation"
              className="hidden lg:flex items-center gap-6 xl:gap-8"
            >
              <Link
                href="/"
                className={`text-sm font-semibold transition-colors py-2 ${
                  pathname === "/"
                    ? "text-terracotta-800 border-b-2 border-terracotta-700 font-bold"
                    : "text-stone-700 hover:text-terracotta-700"
                }`}
              >
                Home
              </Link>

              {/* Products Navigation Trigger */}
              <div
                className="py-2"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                <Link
                  href="/products/all-products/"
                  className={`text-sm font-semibold transition-colors flex items-center gap-1 py-2 ${
                    pathname.startsWith("/products") ||
                    pathname.startsWith("/thepla") ||
                    pathname.startsWith("/khakhra") ||
                    pathname.startsWith("/khari-sing") ||
                    pathname.startsWith("/roasted-peanuts") ||
                    pathname.startsWith("/combo-packs")
                      ? "text-terracotta-800 font-bold border-b-2 border-terracotta-700"
                      : "text-stone-700 hover:text-terracotta-700"
                  }`}
                  aria-expanded={isMegaOpen}
                >
                  <span>Products</span>
                  <ChevronDown
                    className={`w-4 h-4 transition-transform duration-200 ${
                      isMegaOpen ? "rotate-180 text-terracotta-700" : "text-stone-400"
                    }`}
                  />
                </Link>
              </div>

              <Link
                href="/about-us/"
                className={`text-sm font-semibold transition-colors py-2 ${
                  pathname === "/about-us/"
                    ? "text-terracotta-800 border-b-2 border-terracotta-700 font-bold"
                    : "text-stone-700 hover:text-terracotta-700"
                }`}
              >
                About Us
              </Link>

              <Link
                href="/locations/"
                className={`text-sm font-semibold transition-colors py-2 flex items-center gap-1 ${
                  pathname.startsWith("/locations")
                    ? "text-terracotta-800 border-b-2 border-terracotta-700 font-bold"
                    : "text-stone-700 hover:text-terracotta-700"
                }`}
              >
                <MapPin className="w-3.5 h-3.5 text-kesari-600" />
                <span>Locations</span>
              </Link>

              <Link
                href="/portfolio/"
                className={`text-sm font-semibold transition-colors py-2 ${
                  pathname.startsWith("/portfolio")
                    ? "text-terracotta-800 border-b-2 border-terracotta-700 font-bold"
                    : "text-stone-700 hover:text-terracotta-700"
                }`}
              >
                Portfolio
              </Link>

              <Link
                href="/blog/"
                className={`text-sm font-semibold transition-colors py-2 ${
                  pathname.startsWith("/blog")
                    ? "text-terracotta-800 border-b-2 border-terracotta-700 font-bold"
                    : "text-stone-700 hover:text-terracotta-700"
                }`}
              >
                Blog
              </Link>

              <Link
                href="/faq/"
                className={`text-sm font-semibold transition-colors py-2 ${
                  pathname === "/faq/"
                    ? "text-terracotta-800 border-b-2 border-terracotta-700 font-bold"
                    : "text-stone-700 hover:text-terracotta-700"
                }`}
              >
                FAQ
              </Link>

              <Link
                href="/contact-us/"
                className={`text-sm font-semibold transition-colors py-2 ${
                  pathname === "/contact-us/"
                    ? "text-terracotta-800 border-b-2 border-terracotta-700 font-bold"
                    : "text-stone-700 hover:text-terracotta-700"
                }`}
              >
                Contact
              </Link>
            </nav>

            {/* Action Icons (Search, Account, Cart) */}
            <div className="flex items-center gap-3 sm:gap-4">
              {/* Search Toggle */}
              <button
                onClick={() => setIsSearchOpen(!isSearchOpen)}
                className="p-2 text-stone-700 hover:text-terracotta-800 rounded-full hover:bg-stone-100 transition-colors"
                aria-label="Search traditional snacks"
              >
                <Search className="w-5 h-5" />
              </button>

              {/* My Account */}
              <Link
                href="/my-account/"
                className="p-2 text-stone-700 hover:text-terracotta-800 rounded-full hover:bg-stone-100 transition-colors hidden sm:flex"
                aria-label="My Account and Orders"
              >
                <User className="w-5 h-5" />
              </Link>

              {/* Cart Drawer Trigger Button */}
              <button
                onClick={() => setDrawerOpen(true)}
                className="relative flex items-center gap-2 bg-terracotta-700 hover:bg-terracotta-800 text-white px-3.5 py-2 rounded-xl text-sm font-bold shadow-sm transition-all hover:shadow"
                aria-label={`Shopping cart with ${itemCount} items`}
              >
                <ShoppingBag className="w-4 h-4" />
                <span className="hidden sm:inline">Cart</span>
                <span className="w-5 h-5 bg-white text-terracotta-800 font-bold rounded-full text-xs flex items-center justify-center">
                  {itemCount}
                </span>
              </button>
            </div>
          </div>

          {/* Collapsible Search Bar */}
          {isSearchOpen && (
            <div className="py-3 border-t border-stone-100 animate-in fade-in slide-in-from-top-1 duration-200">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  if (searchQuery.trim()) {
                    window.location.href = `/products/all-products/?q=${encodeURIComponent(
                      searchQuery.trim()
                    )}`;
                  }
                }}
                className="relative max-w-2xl mx-auto flex items-center"
              >
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search for Methi Thepla, Khakhra, Bharuchi Sing, Travel Combos..."
                  className="w-full pl-10 pr-24 py-2.5 bg-stone-50 border border-stone-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-terracotta-500 focus:border-transparent text-stone-800"
                  autoFocus
                />
                <Search className="w-4 h-4 text-stone-400 absolute left-3.5" />
                <button
                  type="submit"
                  className="absolute right-2 px-3 py-1.5 bg-terracotta-700 text-white rounded-lg text-xs font-bold hover:bg-terracotta-800"
                >
                  Search
                </button>
              </form>
            </div>
          )}
        </div>

        {/* Full Width Dropdown MegaMenu */}
        <MegaMenu
          isOpen={isMegaOpen}
          onClose={() => setIsMegaOpen(false)}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        />
      </header>

      {/* Mobile Drawer */}
      <MobileMenu
        isOpen={isMobileOpen}
        onClose={() => setIsMobileOpen(false)}
      />
    </>
  );
}
