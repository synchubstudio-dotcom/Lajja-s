import React from "react";
import { Metadata } from "next";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { JsonLd } from "@/components/seo/JsonLd";
import { constructMetadata } from "@/lib/seo";
import { generateItemListSchema } from "@/lib/schema";
import { PRODUCTS } from "@/data/products";
import { AllProductsClient } from "./AllProductsClient";

export const metadata: Metadata = constructMetadata({
  title: "All Products | Buy Authentic Gujarati Snacks Online",
  description: "Browse the complete collection of handcrafted Gujarati snacks by Lajja’s Foods. Methi Thepla, roasted Khakhra, Bharuchi Khari Sing, and curated travel combos.",
  canonicalUrl: "https://lajjasfoods.com/products/all-products/",
});

export default function AllProductsPage() {
  const itemListSchema = generateItemListSchema(
    "Lajja's Foods - All Gujarati Snacks",
    PRODUCTS.map((p) => ({
      name: p.name,
      url: `https://lajjasfoods.com/${p.categorySlug}/${p.slug}/`,
    }))
  );

  return (
    <div className="py-8 sm:py-12 bg-warm-50/40">
      <JsonLd data={itemListSchema} />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Breadcrumbs items={[{ name: "All Products", url: "/products/all-products/" }]} />

        {/* Page Header */}
        <div className="mb-10 text-left space-y-2">
          <span className="text-xs font-bold uppercase tracking-widest text-terracotta-700 bg-terracotta-100 px-3 py-1 rounded-full">
            Complete Snack Catalogue
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-serif text-stone-900">
            Handcrafted Traditional Gujarati Snacks
          </h1>
          <p className="text-stone-600 text-sm sm:text-base max-w-3xl leading-relaxed">
            All our delicacies are made with 100% whole wheat, pure cold-pressed oils, and traditional roasting techniques. Vacuum-sealed fresh to order for daily breakfast and overseas travel.
          </p>
        </div>

        {/* Interactive Filter & Product Catalogue */}
        <AllProductsClient products={PRODUCTS} />
      </div>
    </div>
  );
}
