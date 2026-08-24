"use client";

import React, { useState, useMemo } from "react";
import { Search, SlidersHorizontal, RotateCcw } from "lucide-react";
import { Product } from "@/types/product";
import { ProductGrid } from "@/components/products/ProductGrid";
import { CATEGORIES } from "@/data/categories";

interface AllProductsClientProps {
  products: Product[];
}

export function AllProductsClient({ products }: AllProductsClientProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [sortBy, setSortBy] = useState<string>("featured");
  const [selectedDietaryTag, setSelectedDietaryTag] = useState<string>("all");

  const filteredProducts = useMemo(() => {
    return products
      .filter((p) => {
        // Search filter
        if (searchQuery.trim()) {
          const query = searchQuery.toLowerCase();
          const matchesName = p.name.toLowerCase().includes(query);
          const matchesDesc = p.description.toLowerCase().includes(query);
          const matchesIngredients = p.ingredients.some((ing) => ing.toLowerCase().includes(query));
          if (!matchesName && !matchesDesc && !matchesIngredients) return false;
        }

        // Category filter
        if (selectedCategory !== "all" && p.categorySlug !== selectedCategory) {
          return false;
        }

        // Dietary Tag filter
        if (selectedDietaryTag !== "all") {
          if (!p.dietaryTags.some((t) => t.toLowerCase().includes(selectedDietaryTag.toLowerCase()))) {
            return false;
          }
        }

        return true;
      })
      .sort((a, b) => {
        if (sortBy === "price-asc") return a.price - b.price;
        if (sortBy === "price-desc") return b.price - a.price;
        if (sortBy === "rating") return b.rating - a.rating;
        // Default: featured first
        return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
      });
  }, [products, searchQuery, selectedCategory, sortBy, selectedDietaryTag]);

  const handleResetFilters = () => {
    setSearchQuery("");
    setSelectedCategory("all");
    setSortBy("featured");
    setSelectedDietaryTag("all");
  };

  return (
    <div className="space-y-8">
      {/* Controls Bar: Search, Category Filters, Sort */}
      <div className="bg-white p-4 sm:p-6 rounded-2xl border border-stone-200/80 shadow-xs space-y-4">
        {/* Top Row: Search & Sort */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="relative w-full sm:max-w-md">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by snack name, ingredients (e.g. methi, ajwain)..."
              className="w-full pl-10 pr-4 py-2.5 bg-stone-50 border border-stone-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-terracotta-500 focus:border-transparent text-stone-900"
            />
            <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-3" />
          </div>

          <div className="flex items-center gap-2.5 w-full sm:w-auto justify-end">
            <label className="text-xs font-bold text-stone-500 whitespace-nowrap">
              Sort by:
            </label>
            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="appearance-none pl-3.5 pr-8 py-2 bg-stone-50 hover:bg-stone-100/80 border border-stone-300 rounded-xl text-xs font-bold text-stone-800 focus:outline-none focus:ring-2 focus:ring-terracotta-500 cursor-pointer shadow-2xs transition-all"
              >
                <option value="featured">Featured & Best Sellers</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="rating">Highest Rated (★ 4.8+)</option>
              </select>
              <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2.5 text-stone-500">
                <svg className="w-3.5 h-3.5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </span>
            </div>
          </div>
        </div>

        {/* Category Pill Filters */}
        <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-stone-100">
          <button
            onClick={() => setSelectedCategory("all")}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
              selectedCategory === "all"
                ? "bg-terracotta-700 text-white shadow-xs"
                : "bg-stone-100 text-stone-700 hover:bg-stone-200"
            }`}
          >
            All Delicacies ({products.length})
          </button>
          {CATEGORIES.map((cat) => {
            const count = products.filter((p) => p.categorySlug === cat.slug).length;
            return (
              <button
                key={cat.slug}
                onClick={() => setSelectedCategory(cat.slug)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  selectedCategory === cat.slug
                    ? "bg-terracotta-700 text-white shadow-xs"
                    : "bg-stone-100 text-stone-700 hover:bg-stone-200"
                }`}
              >
                {cat.name} ({count})
              </button>
            );
          })}
        </div>

        {/* Dietary Tag Quick Filters */}
        <div className="flex flex-wrap items-center gap-2 pt-2 text-xs">
          <span className="text-stone-400 text-[11px] font-semibold uppercase mr-1">
            Special Diets:
          </span>
          {["Jain", "High Protein", "Travel", "High Fiber"].map((tag) => (
            <button
              key={tag}
              onClick={() => setSelectedDietaryTag(selectedDietaryTag === tag ? "all" : tag)}
              className={`px-2.5 py-1 rounded-lg border text-[11px] font-medium transition-all ${
                selectedDietaryTag === tag
                  ? "bg-kesari-100 border-kesari-600 text-kesari-900 font-bold"
                  : "bg-white border-stone-200 text-stone-600 hover:border-stone-400"
              }`}
            >
              {tag === "Jain" ? "Jain Friendly" : tag === "Travel" ? "Flight Ready / Travel" : tag}
            </button>
          ))}

          {(searchQuery || selectedCategory !== "all" || selectedDietaryTag !== "all" || sortBy !== "featured") && (
            <button
              onClick={handleResetFilters}
              className="ml-auto text-xs text-red-600 hover:underline flex items-center gap-1 font-bold py-1"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Reset Filters</span>
            </button>
          )}
        </div>
      </div>

      {/* Results Count */}
      <div className="flex items-center justify-between text-xs text-stone-500 px-1">
        <span>
          Showing <strong>{filteredProducts.length}</strong> of <strong>{products.length}</strong> items
        </span>
      </div>

      {/* Products Grid */}
      <ProductGrid
        products={filteredProducts}
        emptyMessage="No snacks found matching your selected filters. Try changing your search query or category."
      />
    </div>
  );
}
