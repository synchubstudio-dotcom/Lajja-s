import React from "react";
import Link from "next/link";
import { Search, Home, ArrowRight, ShoppingBag } from "lucide-react";
import { CATEGORIES } from "@/data/categories";
import { PRODUCTS } from "@/data/products";
import { ProductCard } from "@/components/products/ProductCard";

export default function NotFound() {
  const popularProducts = PRODUCTS.filter((p) => p.bestSeller).slice(0, 3);

  return (
    <div className="py-16 sm:py-24 bg-warm-50/50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
        <span className="text-sm font-bold uppercase tracking-widest text-terracotta-700 bg-terracotta-100 px-3 py-1 rounded-full">
          Page Not Found (404)
        </span>

        <h1 className="text-4xl sm:text-5xl font-extrabold font-serif text-stone-900">
          Looking for Delicious Gujarati Snacks?
        </h1>

        <p className="text-base text-stone-600 max-w-lg mx-auto">
          The page you are looking for might have been moved or renamed. Explore our authentic menu below or search our catalogue.
        </p>

        {/* Search Bar */}
        <div className="max-w-md mx-auto">
          <form
            action="/products/all-products/"
            method="GET"
            className="relative flex items-center"
          >
            <input
              type="text"
              name="q"
              placeholder="Search Methi Thepla, Khakhra, Khari Sing..."
              className="w-full pl-10 pr-24 py-3 bg-white border border-stone-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-terracotta-500 shadow-xs"
            />
            <Search className="w-4 h-4 text-stone-400 absolute left-3.5" />
            <button
              type="submit"
              className="absolute right-2 px-3.5 py-1.5 bg-terracotta-700 text-white rounded-lg text-xs font-bold hover:bg-terracotta-800"
            >
              Search
            </button>
          </form>
        </div>

        {/* Quick Category Chips */}
        <div className="pt-4">
          <p className="text-xs uppercase font-bold text-stone-400 tracking-wider mb-3">
            Popular Categories
          </p>
          <div className="flex flex-wrap items-center justify-center gap-2">
            {CATEGORIES.map((cat) => (
              <Link
                key={cat.slug}
                href={`/${cat.slug}/`}
                className="px-4 py-2 rounded-xl bg-white border border-stone-200 text-xs font-bold text-stone-700 hover:border-terracotta-400 hover:text-terracotta-800 shadow-2xs transition-all"
              >
                {cat.name}
              </Link>
            ))}
          </div>
        </div>

        {/* Back to Home CTA */}
        <div className="pt-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 bg-stone-900 text-white text-xs font-bold rounded-xl hover:bg-stone-800 transition-colors"
          >
            <Home className="w-4 h-4" />
            <span>Return to Homepage</span>
          </Link>
        </div>
      </div>

      {/* Recommended Products Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16 pt-16 border-t border-stone-200">
        <h2 className="text-2xl font-bold font-serif text-stone-900 text-center mb-8">
          You Might Love Our Best Sellers
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {popularProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
}
