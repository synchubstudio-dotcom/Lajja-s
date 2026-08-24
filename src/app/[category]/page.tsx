import React from "react";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, CheckCircle2, ShieldCheck, Sparkles, HelpCircle } from "lucide-react";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { JsonLd } from "@/components/seo/JsonLd";
import { ProductCard } from "@/components/products/ProductCard";
import { CATEGORIES } from "@/data/categories";
import { PRODUCTS } from "@/data/products";
import { constructMetadata } from "@/lib/seo";
import { generateItemListSchema, generateFAQSchema } from "@/lib/schema";

interface CategoryPageProps {
  params: Promise<{
    category: string;
  }>;
}

export async function generateStaticParams() {
  return CATEGORIES.map((cat) => ({
    category: cat.slug,
  }));
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const { category: categorySlug } = await params;
  const category = CATEGORIES.find((c) => c.slug === categorySlug);

  if (!category) {
    return constructMetadata({ title: "Category Not Found", noIndex: true });
  }

  return constructMetadata({
    title: category.seo.title,
    description: category.seo.description,
    canonicalUrl: category.seo.canonicalUrl,
    image: category.heroImage,
  });
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { category: categorySlug } = await params;
  const category = CATEGORIES.find((c) => c.slug === categorySlug);

  if (!category) {
    notFound();
  }

  const categoryProducts = PRODUCTS.filter((p) => p.categorySlug === category.slug);
  const otherCategories = CATEGORIES.filter((c) => c.slug !== category.slug);

  const itemListSchema = generateItemListSchema(
    `${category.name} - Lajja's Foods`,
    categoryProducts.map((p) => ({
      name: p.name,
      url: `https://lajjasfoods.com/${p.categorySlug}/${p.slug}/`,
    }))
  );

  return (
    <div className="py-8 sm:py-12 bg-warm-50/40">
      <JsonLd data={itemListSchema} />
      <JsonLd data={generateFAQSchema(category.faqs)} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Breadcrumb Navigation */}
        <Breadcrumbs items={[{ name: category.name, url: `/${category.slug}/` }]} />

        {/* Category Hero Banner */}
        <div className="relative rounded-3xl overflow-hidden bg-stone-900 text-white p-8 sm:p-12 lg:p-16 border border-stone-800 shadow-card">
          <Image
            src={category.heroImage}
            alt={category.name}
            fill
            priority
            sizes="100vw"
            className="object-cover opacity-35"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-stone-950/90 via-stone-950/70 to-transparent" />

          <div className="relative z-10 max-w-2xl space-y-4">
            <span className="inline-block text-xs font-bold uppercase tracking-widest text-kesari-300 bg-kesari-900/60 border border-kesari-700/50 px-3 py-1 rounded-full">
              {category.gujaratiName ? `${category.name} (${category.gujaratiName})` : category.name}
            </span>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-serif text-white tracking-tight leading-tight">
              Gujarati {category.name}
            </h1>

            <p className="text-stone-300 text-sm sm:text-base leading-relaxed">
              {category.tagline}
            </p>
          </div>
        </div>

        {/* Category Introduction & Cultural Story */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-stone-200/80 shadow-xs space-y-6">
          <div>
            <span className="text-xs uppercase font-bold text-terracotta-700 tracking-wider">
              Artisanal Heritage
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold font-serif text-stone-900 mt-1">
              {category.traditionContent.heading}
            </h2>
          </div>

          <div className="space-y-4 text-stone-600 text-sm sm:text-base leading-relaxed">
            {category.traditionContent.paragraphs.map((p, idx) => (
              <p key={idx}>{p}</p>
            ))}
          </div>

          {/* Culinary Highlights Badges */}
          <div className="pt-4 border-t border-stone-100">
            <h3 className="text-xs font-bold uppercase text-stone-400 tracking-wider mb-3">
              Why Choose Lajja’s Foods {category.name}
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {category.culinaryHighlights.map((hl, idx) => (
                <div key={idx} className="flex items-center gap-2 text-xs font-semibold text-stone-800 bg-warm-50 p-2.5 rounded-xl border border-stone-200/60">
                  <CheckCircle2 className="w-4 h-4 text-herbal-700 shrink-0" />
                  <span>{hl}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Product Grid */}
        <div>
          <div className="flex items-center justify-between mb-8">
            <div>
              <span className="text-xs uppercase font-bold text-kesari-700 tracking-wider">
                Freshly Handcrafted Varieties
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold font-serif text-stone-900 mt-1">
                Available {category.name} Delicacies ({categoryProducts.length})
              </h2>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {categoryProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>

        {/* Benefits & Storage Tips */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Benefits */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200 shadow-xs space-y-6">
            <h3 className="text-xl font-bold font-serif text-stone-900">
              Nutritional & Lifestyle Benefits
            </h3>
            <div className="space-y-4">
              {category.benefits.map((b, idx) => (
                <div key={idx} className="space-y-1">
                  <h4 className="text-sm font-bold text-stone-900 flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-kesari-600" />
                    <span>{b.title}</span>
                  </h4>
                  <p className="text-xs text-stone-600 leading-relaxed pl-6">
                    {b.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Storage & Travel Advice */}
          <div className="bg-warm-50 rounded-3xl p-6 sm:p-8 border border-terracotta-200/60 space-y-6">
            <h3 className="text-xl font-bold font-serif text-stone-900 flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-terracotta-700" />
              <span>Storage & Travel Guidelines</span>
            </h3>
            <ul className="space-y-3 text-xs text-stone-700">
              {category.storageAndTravelTips.map((tip, idx) => (
                <li key={idx} className="flex items-start gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-terracotta-100 text-terracotta-800 text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5">
                    {idx + 1}
                  </span>
                  <span className="leading-relaxed">{tip}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Category FAQs */}
        {category.faqs.length > 0 && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200 shadow-xs space-y-6">
            <div>
              <span className="text-xs uppercase font-bold text-terracotta-700 tracking-wider">
                Common Questions
              </span>
              <h2 className="text-2xl font-bold font-serif text-stone-900 mt-1">
                {category.name} FAQs
              </h2>
            </div>

            <div className="space-y-3">
              {category.faqs.map((faq, idx) => (
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

        {/* Related Categories Navigation */}
        <div className="pt-6 border-t border-stone-200">
          <h3 className="text-sm font-bold uppercase text-stone-400 tracking-wider mb-4">
            Explore Other Gujarati Snacks
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {otherCategories.map((c) => (
              <Link
                key={c.slug}
                href={`/${c.slug}/`}
                className="p-4 bg-white rounded-2xl border border-stone-200 hover:border-terracotta-400 hover:shadow-card transition-all text-center group"
              >
                <span className="text-xs font-bold text-stone-900 font-serif group-hover:text-terracotta-800 block">
                  {c.name}
                </span>
                <span className="text-[11px] text-terracotta-700 font-medium group-hover:underline">
                  Shop {c.name} →
                </span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
