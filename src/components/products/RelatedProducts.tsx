import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Product } from "@/types/product";
import { ProductCard } from "./ProductCard";

interface RelatedProductsProps {
  products: Product[];
  title?: string;
  categorySlug?: string;
  categoryName?: string;
}

export function RelatedProducts({
  products,
  title = "You May Also Love",
  categorySlug,
  categoryName,
}: RelatedProductsProps) {
  if (products.length === 0) return null;

  return (
    <section className="py-12 border-t border-stone-200">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
        <div>
          <span className="text-xs uppercase font-bold text-kesari-700 tracking-wider">
            Curated Gujarati Flavors
          </span>
          <h2 className="text-2xl font-bold font-serif text-stone-900 mt-1">
            {title}
          </h2>
        </div>

        {categorySlug && categoryName && (
          <Link
            href={`/${categorySlug}/`}
            className="inline-flex items-center gap-1 text-sm font-bold text-terracotta-700 hover:text-terracotta-800 group"
          >
            <span>Explore All {categoryName}</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.slice(0, 3).map((prod) => (
          <ProductCard key={prod.id} product={prod} />
        ))}
      </div>
    </section>
  );
}
