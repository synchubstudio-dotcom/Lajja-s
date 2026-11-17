import Link from "next/link";
import {
  ArrowRight,
} from "lucide-react";
import { HeroSection } from "@/components/home/HeroSection";
import { ProductCard } from "@/components/products/ProductCard";
import { JsonLd } from "@/components/seo/JsonLd";
import { PRODUCTS } from "@/data/products";
import { FAQS } from "@/data/faqs";
import { generateFAQSchema } from "@/lib/schema";
import { getCatalogCategories } from "@/lib/category-catalog";

export const dynamic = "force-dynamic";
export default async function HomePage() {
  const categories = await getCatalogCategories();

  // Remove duplicate categories that point to the same URL.
  const uniqueCategories = Array.from(
    new Map(
      categories.map((category) => [category.slug, category])
    ).values()
  );

  const bestSellers = PRODUCTS.filter((product) => product.bestSeller);
  const homeFaqs = FAQS.slice(0, 4);

  // Keep the rest of your existing JSX below.

  return (
    <>
      <JsonLd data={generateFAQSchema(homeFaqs)} />
      <div className="bg-[#1f5a3d] px-4 py-2 text-center text-xs font-semibold text-white">
        Fresh Gujarati snacks delivered across India · Free shipping on orders
        above ₹999
      </div>

      <HeroSection />

      <main className="bg-white pb-16">
        <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
          <div className="mb-7 flex items-end justify-between gap-4">
            <div>
              <p className="mb-2 text-xs font-bold uppercase tracking-[0.22em] text-terracotta-800">
                Made with tradition
              </p>
              <h2 className="font-serif text-2xl font-bold text-terracotta-800 sm:text-3xl">
                Shop by Category
              </h2>
              <p className="mt-2 text-sm text-stone-650">
                Discover something delicious for every craving.
              </p>
            </div>

            <Link
              href="/products/all-products/"
              className="hidden items-center gap-2 text-sm font-semibold text-amber-700 transition hover:text-[#1f5a3d] sm:inline-flex"
            >
              View all <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="grid grid-cols-2 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-4">
           {uniqueCategories.slice(0, 4).map((category, index) => (
              <Link
                key={`${category.slug}-${index}`}
                href={`/${category.slug}/`}
                className="group relative overflow-hidden rounded-2xl border border-[#0f681b] bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#805612] hover:shadow-xl hover:shadow-stone-900/10"
              >
                <div className="relative overflow-hidden bg-[#f5efe4]">
                  <img
                    src={category.heroImage}
                    alt={category.name}
                    loading={index < 4 ? "eager" : "lazy"}
                    className="aspect-[4/3] w-full object-cover transition-transform duration-500 ease-out group-hover:scale-110"
                  />

                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/15 via-transparent to-transparent opacity-70" />

                  <span className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-[#1f5a3d] shadow-sm backdrop-blur-sm transition-all duration-300 group-hover:rotate-45 group-hover:bg-[#1f5a3d] group-hover:text-white">
                    <ArrowRight className="h-4 w-4" />
                  </span>
                </div>

                <div className="p-3 sm:p-5">
                  <h3 className="font-serif text-base font-bold text-[#1f5a3d] transition-colors group-hover:text-stone-900 sm:text-xl">
                    {category.name}
                  </h3>

                  <div className="mt-2 flex items-center justify-between gap-2">
                    <span className="text-xs font-medium text-stone-500 sm:text-sm">
                      Explore collection
                      <span className="ml-1 inline-block transition-transform group-hover:translate-x-1">
                        <ArrowRight className="h-3 w-3" />
                      </span>
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <Link
            href="/products/all-products/"
            className="mt-6 flex items-center justify-center gap-2 rounded-xl border border-[#1f5a3d]/20 bg-white px-4 py-3 text-sm font-bold text-[#1f5a3d] transition hover:bg-[#1f5a3d] hover:text-white sm:hidden"
          >
            Explore all categories
            <ArrowRight className="h-4 w-4" />
          </Link>
        </section>
      </main>
    </>
  );
}
