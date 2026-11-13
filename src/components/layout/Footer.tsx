import React from "react";
import Link from "next/link";
import { 
  Phone, 
  Mail, 
  MapPin, 
  ShieldCheck, 
  Truck, 
  Sparkles, 
  HeartHandshake,
  ArrowRight 
} from "lucide-react";
import { SITE_CONFIG, FOOTER_SECTIONS } from "@/lib/constants";

export function Footer() {
  return (
    <footer className="bg-white-950 text-stone-300 pt-16 pb-12 border-t border-stone-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Value Proposition Badges */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pb-12  text-green-800">
          <div className="flex items-start gap-3">
            <div className="p-2.5 rounded-xl bg-terracotta-900/90 text-kesari-400 shrink-0">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold font-serif text-green-800">100% Traditional Recipe</h4>
              <p className="text-xs text-yellow-400 mt-0.5">Zero maida, cold-pressed oils & whole spices</p>
            </div>  
          </div>

          <div className="flex items-start gap-3">
            <div className="p-2.5 rounded-xl bg-terracotta-900/90 text-kesari-400 shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold font-serif text-green-800">Vacuum Stay-Fresh Seal</h4>
              <p className="text-xs text-yellow-400 mt-0.5">20-90 days shelf-life without preservatives</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="p-2.5 rounded-xl bg-terracotta-900/90 text-kesari-400 shrink-0">
              <Truck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold font-serif text-green-800">Fast Kitchen Dispatch</h4>
              <p className="text-xs text-yellow-400 mt-0.5">Same-day in Vadodara, express across Gujarat</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="p-2.5 rounded-xl bg-terracotta-900/90 text-kesari-400 shrink-0">
              <HeartHandshake className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold font-serif text-green-800">Flight & Travel Ready</h4>
              <p className="text-xs text-yellow-400 mt-0.5">International customs & luggage compliant</p>
            </div>
          </div>
        </div>

        {/* Main Footer Links Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 py-12">
          {/* Brand Info & Story */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="inline-block">
              <span className="text-2xl font-extrabold font-serif text-green-800 hover:text-kesari-400 tracking-tight">
                {SITE_CONFIG.name}
              </span>
              <span className="block text-xs uppercase tracking-widest text-green-800 font-semibold font-sans  hover:text-kesari-400 ">
                Authentic Gujarati Delicacies
              </span>
            </Link>
            <p className="text-sm text-green-800 leading-relaxed pr-6  hover:text-kesari-400 ">
              Handcrafted Gujarati foods prepared with ancestral reverence in Vadodara. Our Thepla, Khakhra, and Bharuchi roasted snacks bring the heartwarming taste of home to breakfast tables and travelers across the world.
            </p>

            <div className="space-y-2 pt-2 text-xs text-green-800  hover:text-kesari-400 ">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-kesari-400 shrink-0" />
                <span>Plot 14, Heritage Food Estate, Vadodara, Gujarat 390020</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-kesari-400 shrink-0" />
                <span>Call / WhatsApp: {SITE_CONFIG.contact.phone}</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-kesari-400 shrink-0" />
                <span>{SITE_CONFIG.contact.email}</span>
              </div>
            </div>
          </div>

          {/* Product Categories */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider  text-green-800 hover:text-kesari-400  mb-4 border-b border-stone-800 pb-2">
              Snack Categories
            </h4>
            <ul className="space-y-2 text-sm">
              {FOOTER_SECTIONS.categories.map((cat) => (
                <li key={cat.href}>
                  <Link
                    href={cat.href}
                    className="text-green-800 hover:text-kesari-400 transition-colors block py-0.5"
                  >
                    {cat.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Gujarat Locations */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-green-800 mb-4 border-b border-stone-800 pb-2  hover:text-kesari-400 ">
              Serving Gujarat
            </h4>
            <ul className="space-y-2 text-sm">
              {FOOTER_SECTIONS.locations.map((loc) => (
                <li key={loc.href}>
                  <Link
                    href={loc.href}
                    className="text-green-800 hover:text-kesari-400 transition-colors block py-0.5"
                  >
                    {loc.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick & Legal Links */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-green-800  hover:text-kesari-400  mb-4 border-b border-stone-800 pb-2">
              Explore & Legal
            </h4>
            <ul className="space-y-2 text-sm">
              {FOOTER_SECTIONS.quickLinks.slice(0, 4).map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-green-800 hover:text-kesari-400 transition-colors block py-0.5"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
              {FOOTER_SECTIONS.legal.map((legal) => (
                <li key={legal.href}>
                  <Link
                    href={legal.href}
                    className="text-green-800 hover:text-kesari-400 transition-colors block py-0.5"
                  >
                    {legal.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 mt-8 border-t border-stone-800/80 flex flex-col sm:flex-row items-center justify-between text-xs text-green-800 gap-4">
          <p>© {new Date().getFullYear()} {SITE_CONFIG.name}. All Rights Reserved. Crafted with Gujarati tradition.</p>
          <div className="flex items-center gap-6">
            <Link href="/privacy-policy/" className="hover:text-kesari-400">Privacy</Link>
            <Link href="/terms-and-conditions/" className="hover:text-kesari-400">Terms</Link>
            <Link href="/shipping-policy/" className="hover:text-kesari-400">Shipping</Link>
            <Link href="/sitemap.xml" className="hover:text-kesari-400">XML Sitemap</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
