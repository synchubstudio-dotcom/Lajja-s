import React from "react";
import { Product } from "@/types/product";
import { ProductCard } from "./ProductCard";

interface ProductGridProps {
  products: Product[];
  emptyMessage?: string;
}

export function ProductGrid({
  products,
  emptyMessage = "No traditional snacks found matching your criteria.",
}: ProductGridProps) {
  if (products.length === 0) {
    return (
      <div className="text-center py-16 px-4 bg-stone-50 rounded-2xl border border-stone-200">
        <p className="text-sm font-medium text-stone-600">{emptyMessage}</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
      {products.map((product, index) => (
        <ProductCard
          key={product.id}
          product={product}
          priority={index < 3}
        />
      ))}
    </div>
  );
}
