import React from "react";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import Link from "next/link";
import { 
  ShieldCheck, 
  Truck, 
  Sparkles, 
  Clock, 
  CheckCircle2, 
  Star,
  Layers,
  UtensilsCrossed
} from "lucide-react";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { JsonLd } from "@/components/seo/JsonLd";
import { NutritionTable } from "@/components/products/NutritionTable";
import { RelatedProducts } from "@/components/products/RelatedProducts";
import { PRODUCTS } from "@/data/products";
import { CATEGORIES } from "@/data/categories";
import { BLOG_ARTICLES } from "@/data/blog";
import { constructMetadata } from "@/lib/seo";
import { generateProductSchema, generateFAQSchema } from "@/lib/schema";
import { ProductDetailsClient } from "./ProductDetailsClient";

interface ProductPageProps {
  params: Promise<{
    category: string;
    slug: string;
  }>;
}

export async function generateStaticParams() {
  return PRODUCTS.map((product) => ({
    category: product.categorySlug,
    slug: product.slug,
  }));
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { category: categorySlug, slug: productSlug } = await params;
  const product = PRODUCTS.find(
    (p) => p.categorySlug === categorySlug && p.slug === productSlug
  );

  if (!product) {
    return constructMetadata({ title: "Product Not Found", noIndex: true });
  }

  const primaryImage = product.images.find((i) => i.isPrimary) || product.images[0];

  return constructMetadata({
    title: product.seo.title,
    description: product.seo.description,
    canonicalUrl: product.seo.canonicalUrl,
    image: primaryImage.url,
  });
}

export default async function ProductDetailPage({ params }: ProductPageProps) {
  const { category: categorySlug, slug: productSlug } = await params;
  const product = PRODUCTS.find(
    (p) => p.categorySlug === categorySlug && p.slug === productSlug
  );

  if (!product) {
    notFound();
  }

  const relatedProducts = PRODUCTS.filter(
    (p) => p.categorySlug === product.categorySlug && p.id !== product.id
  );

  const relatedArticles = BLOG_ARTICLES.filter(
    (a) => a.categorySlug === product.categorySlug || a.relatedProductSlugs.includes(product.slug)
  );

  const breadcrumbs = [
    { name: product.categoryName, url: `/${product.categorySlug}/` },
    { name: product.name, url: `/${product.categorySlug}/${product.slug}/` },
  ];

  return (
    <div className="py-8 sm:py-12 bg-warm-50/30">
      <JsonLd data={generateProductSchema(product)} />
      {product.faqs.length > 0 && (
        <JsonLd data={generateFAQSchema(product.faqs)} />
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Breadcrumb List */}
        <Breadcrumbs items={breadcrumbs} />

        {/* Product Interactive Main Grid (Gallery + Buy Box) */}
        <ProductDetailsClient product={product} />

        {/* Detailed Product Narrative & Culinary Highlights */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-8 border-t border-stone-200">
          {/* Left Narrative Column */}
          <div className="lg:col-span-8 space-y-8">
            {/* Story & Description */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200/80 shadow-xs space-y-4">
              <h2 className="text-2xl font-bold font-serif text-stone-900">
                About {product.name}
              </h2>
              <p className="text-stone-700 text-sm sm:text-base leading-relaxed">
                {product.description}
              </p>
              {product.heritageStory && (
                <div className="bg-warm-50 p-4 rounded-2xl border border-kesari-200/60 mt-4">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-terracotta-800 mb-1">
                    Ancestral Culinary Wisdom
                  </h3>
                  <p className="text-xs text-stone-600 leading-relaxed">
                    {product.heritageStory}
                  </p>
                </div>
              )}
            </div>

            {/* Ingredients & Dietary Purity */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200/80 shadow-xs space-y-4">
              <h3 className="text-xl font-bold font-serif text-stone-900 flex items-center gap-2">
                <Layers className="w-5 h-5 text-terracotta-700" />
                <span>Pure Ingredients & Spices</span>
              </h3>
              <div className="flex flex-wrap gap-2 pt-1">
                {product.ingredients.map((ing, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1.5 bg-stone-100 text-stone-800 text-xs font-medium rounded-xl border border-stone-200"
                  >
                    {ing}
                  </span>
                ))}
              </div>
              <p className="text-xs text-stone-500 italic pt-2">
                100% Vegetarian • Zero Chemical Preservatives • Zero Artificial Flavors
              </p>
            </div>

            {/* Preparation & Pairing Suggestions */}
            {product.pairingSuggestions && product.pairingSuggestions.length > 0 && (
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200/80 shadow-xs space-y-4">
                <h3 className="text-xl font-bold font-serif text-stone-900 flex items-center gap-2">
                  <UtensilsCrossed className="w-5 h-5 text-terracotta-700" />
                  <span>How to Enjoy & Serving Pairings</span>
                </h3>
                {product.preparationMethod && (
                  <p className="text-xs sm:text-sm text-stone-700 leading-relaxed">
                    {product.preparationMethod}
                  </p>
                )}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  {product.pairingSuggestions.map((pair, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-xs text-stone-800 bg-kesari-50/60 p-3 rounded-xl border border-kesari-200/60 font-semibold">
                      <Sparkles className="w-4 h-4 text-kesari-600 shrink-0" />
                      <span>{pair}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Customer Reviews */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200/80 shadow-xs space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-stone-200">
                <div>
                  <h3 className="text-xl font-bold font-serif text-stone-900">
                    Customer Reviews
                  </h3>
                  <div className="flex items-center gap-2 text-xs text-stone-600 mt-1">
                    <div className="flex text-kesari-500">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-kesari-500 text-kesari-500" />
                      ))}
                    </div>
                    <span>
                      <strong>{product.rating}</strong> out of 5 based on <strong>{product.reviewCount}</strong> orders
                    </span>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                {product.reviews.map((rev) => (
                  <div key={rev.id} className="bg-stone-50/80 p-4 rounded-2xl border border-stone-200 space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-xs text-stone-900">{rev.author}</span>
                        <span className="text-[11px] text-stone-500">({rev.location})</span>
                      </div>
                      <span className="text-[10px] text-stone-400">{rev.date}</span>
                    </div>
                    <div className="flex text-kesari-500">
                      {[...Array(rev.rating)].map((_, i) => (
                        <Star key={i} className="w-3 h-3 fill-kesari-500 text-kesari-500" />
                      ))}
                    </div>
                    <h4 className="text-xs font-bold text-stone-800">{rev.title}</h4>
                    <p className="text-xs text-stone-600 leading-relaxed italic">
                      &quot;{rev.comment}&quot;
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Product FAQs */}
            {product.faqs.length > 0 && (
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200/80 shadow-xs space-y-4">
                <h3 className="text-xl font-bold font-serif text-stone-900">
                  {product.name} FAQs
                </h3>
                <div className="space-y-3">
                  {product.faqs.map((faq, idx) => (
                    <details
                      key={idx}
                      className="group bg-stone-50 rounded-xl p-4 border border-stone-200 open:border-terracotta-300"
                    >
                      <summary className="font-bold text-stone-900 text-xs sm:text-sm cursor-pointer list-none flex items-center justify-between">
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
          </div>

          {/* Right Sidebar: Nutrition & Storage Details */}
          <div className="lg:col-span-4 space-y-6">
            {/* Nutrition Facts */}
            <NutritionTable nutrition={product.nutrition} />

            {/* Shelf Life & Storage Card */}
            <div className="bg-warm-50 rounded-2xl p-6 border border-terracotta-200/60 space-y-4">
              <h4 className="font-bold text-stone-900 font-serif text-base flex items-center gap-2">
                <Clock className="w-4 h-4 text-terracotta-700" />
                <span>Shelf Life & Storage</span>
              </h4>
              <div className="space-y-2 text-xs text-stone-700">
                <p>
                  <strong>Shelf Life:</strong> {product.shelfLife}
                </p>
                <p>
                  <strong>Storage:</strong> {product.storageInstructions}
                </p>
                <p>
                  <strong>Dispatch:</strong> {product.shippingInfo}
                </p>
              </div>
            </div>

            {/* Related Blog Article Card */}
            {relatedArticles.length > 0 && (
              <div className="bg-white rounded-2xl p-5 border border-stone-200 space-y-3">
                <span className="text-[10px] uppercase font-bold text-kesari-700 tracking-wider">
                  Learn More
                </span>
                <h4 className="text-sm font-bold font-serif text-stone-900 line-clamp-2">
                  <Link
                    href={`/blog/${relatedArticles[0].categorySlug}/${relatedArticles[0].slug}/`}
                    className="hover:text-terracotta-700 transition-colors"
                  >
                    {relatedArticles[0].title}
                  </Link>
                </h4>
                <p className="text-xs text-stone-500 line-clamp-2">
                  {relatedArticles[0].excerpt}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Related Products within Category */}
        <RelatedProducts
          products={relatedProducts}
          title={`More Delicious ${product.categoryName}`}
          categorySlug={product.categorySlug}
          categoryName={product.categoryName}
        />
      </div>
    </div>
  );
}
