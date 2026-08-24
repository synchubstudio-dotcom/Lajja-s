import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { CATEGORIES } from "@/data/categories";

export function CategoryBento() {
  return (
    <section className="py-16 sm:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4">
          <div>
            <span className="text-xs uppercase font-bold text-kesari-700 tracking-wider">
              Artisanal Gujarati Categories
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold font-serif text-stone-900 mt-1">
              Explore Our Authentic Specialties
            </h2>
          </div>
          <Link
            href="/products/all-products/"
            className="inline-flex items-center gap-1.5 text-sm font-bold text-terracotta-700 hover:text-terracotta-800 group"
          >
            <span>View All Products</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {CATEGORIES.map((cat, idx) => (
            <Link
              key={cat.id}
              href={`/${cat.slug}/`}
              className={`group relative rounded-3xl overflow-hidden bg-stone-100 border border-stone-200/80 hover:border-terracotta-400 shadow-xs hover:shadow-card transition-all duration-300 flex flex-col justify-end p-6 min-h-[300px] ${
                idx === 0 || idx === 4 ? "md:col-span-2 lg:col-span-2" : "md:col-span-1 lg:col-span-1"
              }`}
            >
              <Image
                src={cat.heroImage}
                alt={cat.name}
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent" />

              <div className="relative z-10 text-white space-y-1.5">
                <span className="text-xs text-kesari-300 font-bold uppercase tracking-wider block">
                  {cat.gujaratiName}
                </span>
                <h3 className="text-xl sm:text-2xl font-bold font-serif text-white">
                  {cat.name}
                </h3>
                <p className="text-xs text-stone-300 line-clamp-2 leading-relaxed">
                  {cat.description}
                </p>

                <div className="pt-2 flex items-center gap-1 text-xs font-bold text-kesari-300 group-hover:text-white transition-colors">
                  <span>Shop {cat.name}</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
