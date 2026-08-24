import React from "react";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Phone, Mail, MapPin, Sparkles, CheckCircle2, ArrowRight } from "lucide-react";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { JsonLd } from "@/components/seo/JsonLd";
import { CityDeliveryInfo } from "@/components/locations/CityDeliveryInfo";
import { ProductCard } from "@/components/products/ProductCard";
import { LOCATIONS } from "@/data/locations";
import { PRODUCTS } from "@/data/products";
import { constructMetadata } from "@/lib/seo";
import { generateLocalBusinessSchema, generateFAQSchema } from "@/lib/schema";

interface LocationCityPageProps {
  params: Promise<{
    city: string;
  }>;
}

export async function generateStaticParams() {
  return LOCATIONS.map((loc) => ({
    city: loc.slug,
  }));
}

export async function generateMetadata({ params }: LocationCityPageProps): Promise<Metadata> {
  const { city: citySlug } = await params;
  const location = LOCATIONS.find((l) => l.slug === citySlug);

  if (!location) {
    return constructMetadata({ title: "City Not Found", noIndex: true });
  }

  return constructMetadata({
    title: location.seo.title,
    description: location.seo.description,
    canonicalUrl: location.seo.canonicalUrl,
    image: location.heroImage,
  });
}

export default async function LocationCityPage({ params }: LocationCityPageProps) {
  const { city: citySlug } = await params;
  const location = LOCATIONS.find((l) => l.slug === citySlug);

  if (!location) {
    notFound();
  }

  const popularProducts = PRODUCTS.filter((p) =>
    location.popularSnacks.includes(p.slug)
  );

  const otherLocations = LOCATIONS.filter((l) => l.slug !== location.slug);

  return (
    <div className="py-8 sm:py-12 bg-warm-50/40">
      <JsonLd data={generateLocalBusinessSchema(location)} />
      {location.faqs.length > 0 && (
        <JsonLd data={generateFAQSchema(location.faqs)} />
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Breadcrumb Navigation */}
        <Breadcrumbs
          items={[
            { name: "Locations", url: "/locations/" },
            { name: location.cityName, url: `/locations/${location.slug}/` },
          ]}
        />

        {/* City Hero Section */}
        <div className="relative rounded-3xl overflow-hidden bg-stone-900 text-white p-8 sm:p-12 lg:p-16 border border-stone-800 shadow-card">
          <Image
            src={location.heroImage}
            alt={`Gujarati snacks in ${location.cityName}`}
            fill
            priority
            sizes="100vw"
            className="object-cover opacity-35"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-stone-950/90 via-stone-950/75 to-transparent" />

          <div className="relative z-10 max-w-3xl space-y-4">
            <span className="inline-block text-xs font-bold uppercase tracking-widest text-kesari-300 bg-kesari-900/60 border border-kesari-700/50 px-3 py-1 rounded-full">
              {location.isKitchenHub ? "Central Kitchen Hub" : "Regional Direct Delivery"} • {location.state}
            </span>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-serif text-white tracking-tight leading-tight">
              {location.headline}
            </h1>

            <p className="text-stone-300 text-sm sm:text-base leading-relaxed">
              {location.shortDescription}
            </p>
          </div>
        </div>

        {/* City Cultural & Delivery Narrative */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-stone-200/80 shadow-xs space-y-6">
          <span className="text-xs uppercase font-bold text-terracotta-700 tracking-wider">
            Local Heritage
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold font-serif text-stone-900">
            Serving Authentic Gujarati Snacks to {location.cityName}
          </h2>
          <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
            {location.localStory}
          </p>

          {/* Serving Areas Pill Matrix */}
          <div className="pt-4 border-t border-stone-100">
            <h3 className="text-xs font-bold uppercase text-stone-400 tracking-wider mb-3">
              Delivery Coverage Areas in {location.cityName}
            </h3>
            <div className="flex flex-wrap gap-2">
              {location.servingAreas.map((area, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1.5 bg-warm-50 text-stone-800 text-xs font-semibold rounded-xl border border-stone-200"
                >
                  {area}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Detailed Local Delivery Schedule Table & Hub Info */}
        <CityDeliveryInfo location={location} />

        {/* Popular Snacks in this City */}
        <div>
          <div className="flex items-center justify-between mb-8">
            <div>
              <span className="text-xs uppercase font-bold text-kesari-700 tracking-wider">
                Top Picks in {location.cityName}
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold font-serif text-stone-900 mt-1">
                Popular Snacks Ordered in {location.cityName}
              </h2>
            </div>
            <Link
              href="/products/all-products/"
              className="inline-flex items-center gap-1 text-sm font-bold text-terracotta-700 hover:text-terracotta-800 group"
            >
              <span>View All Products</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {popularProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>

        {/* City Specific FAQs */}
        {location.faqs.length > 0 && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200 shadow-xs space-y-6">
            <div>
              <span className="text-xs uppercase font-bold text-terracotta-700 tracking-wider">
                Local Questions
              </span>
              <h2 className="text-2xl font-bold font-serif text-stone-900 mt-1">
                Frequently Asked Questions for {location.cityName}
              </h2>
            </div>

            <div className="space-y-3">
              {location.faqs.map((faq, idx) => (
                <details
                  key={idx}
                  className="group bg-stone-50 rounded-xl p-4 border border-stone-200 open:border-terracotta-300"
                >
                  <summary className="font-bold text-stone-900 text-sm cursor-pointer list-none flex items-center justify-between">
                    <span>{faq.question}</span>
                    <span className="text-stone-400 group-open:rotate-180 transition-transform">▾</span>
                  </summary>
                  <p className="mt-2 text-xs text-stone-600 leading-relaxed border-t border-stone-200/60 pt-2">
                    {faq.answer}
                  </p>
                </details>
              ))}
            </div>
          </div>
        )}

        {/* Other Cities Links */}
        <div className="pt-6 border-t border-stone-200">
          <h3 className="text-sm font-bold uppercase text-stone-400 tracking-wider mb-4">
            Other Delivery Locations in Gujarat
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
            {otherLocations.map((l) => (
              <Link
                key={l.slug}
                href={`/locations/${l.slug}/`}
                className="p-4 bg-white rounded-2xl border border-stone-200 hover:border-terracotta-400 hover:shadow-card transition-all text-center group"
              >
                <span className="text-xs font-bold text-stone-900 font-serif group-hover:text-terracotta-800 block">
                  {l.cityName}
                </span>
                <span className="text-[11px] text-terracotta-700 font-medium group-hover:underline">
                  Delivery Info →
                </span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
