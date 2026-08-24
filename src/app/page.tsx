import React from "react";
import Link from "next/link";
import { ArrowRight, Sparkles, HelpCircle, CheckCircle2 } from "lucide-react";
import { HeroSection } from "@/components/home/HeroSection";
import { CategoryBento } from "@/components/home/CategoryBento";
import { StorySection } from "@/components/home/StorySection";
import { ProcessHighlight } from "@/components/home/ProcessHighlight";
import { Testimonials } from "@/components/home/Testimonials";
import { LocalCoverage } from "@/components/home/LocalCoverage";
import { ProductCard } from "@/components/products/ProductCard";
import { BlogCard } from "@/components/blog/BlogCard";
import { JsonLd } from "@/components/seo/JsonLd";
import { PRODUCTS } from "@/data/products";
import { BLOG_ARTICLES } from "@/data/blog";
import { FAQS } from "@/data/faqs";
import { generateFAQSchema } from "@/lib/schema";

export default function HomePage() {
  const bestSellers = PRODUCTS.filter((p) => p.bestSeller);
  const featuredArticles = BLOG_ARTICLES.slice(0, 3);
  const homeFaqs = FAQS.slice(0, 6);

  return (
    <>
      <JsonLd data={generateFAQSchema(homeFaqs)} />

      {/* 1. Hero Section */}
      <HeroSection />

      {/* 2. Featured Categories Bento */}
      <CategoryBento />

      {/* 3. Best Sellers Section */}
      <section className="py-16 sm:py-24 bg-warm-50/60 border-t border-stone-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4">
            <div>
              <span className="text-xs uppercase font-bold text-terracotta-700 tracking-wider">
                Customer Favorites
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold font-serif text-stone-900 mt-1">
                Our Most Loved Traditional Snacks
              </h2>
            </div>
            <Link
              href="/products/all-products/"
              className="inline-flex items-center gap-1.5 text-sm font-bold text-terracotta-700 hover:text-terracotta-800 group"
            >
              <span>Explore All {PRODUCTS.length} Delicacies</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {bestSellers.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* 4. Authentic Gujarati Story */}
      <StorySection />

      {/* 5. Process & Packaging Science */}
      <ProcessHighlight />

      {/* 6. Local Delivery Across Gujarat */}
      <LocalCoverage />

      {/* 7. Customer Reviews & Trust */}
      <Testimonials />

      {/* 8. Featured Blog & Culinary Heritage Articles */}
      <section className="py-16 sm:py-24 bg-white border-t border-stone-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4">
            <div>
              <span className="text-xs uppercase font-bold text-kesari-700 tracking-wider">
                Culinary Stories & Guides
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold font-serif text-stone-900 mt-1">
                Explore Gujarati Food Culture & Nutrition
              </h2>
            </div>
            <Link
              href="/blog/"
              className="inline-flex items-center gap-1.5 text-sm font-bold text-terracotta-700 hover:text-terracotta-800 group"
            >
              <span>View All Articles</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {featuredArticles.map((article) => (
              <BlogCard key={article.id} article={article} />
            ))}
          </div>
        </div>
      </section>

      {/* 9. Frequently Asked Questions Accordion */}
      <section className="py-16 sm:py-24 bg-warm-50/70 border-t border-stone-200/80">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 space-y-3">
            <span className="text-xs uppercase font-bold text-terracotta-700 tracking-wider">
              Common Questions
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold font-serif text-stone-900">
              Frequently Asked Questions
            </h2>
            <p className="text-sm text-stone-600">
              Everything you need to know about our ingredients, vacuum shelf-life, and international travel packaging.
            </p>
          </div>

          <div className="space-y-4">
            {homeFaqs.map((faq) => (
              <details
                key={faq.id}
                className="group bg-white rounded-2xl p-5 border border-stone-200/80 shadow-2xs open:border-terracotta-300 transition-all"
              >
                <summary className="font-bold text-stone-900 font-serif text-base cursor-pointer list-none flex items-center justify-between gap-4">
                  <span className="group-hover:text-terracotta-800 transition-colors">{faq.question}</span>
                  <span className="text-stone-400 group-open:rotate-180 transition-transform text-lg shrink-0">
                    ▾
                  </span>
                </summary>
                <div className="mt-3 pt-3 border-t border-stone-100 text-xs sm:text-sm text-stone-600 leading-relaxed">
                  {faq.answer}
                </div>
              </details>
            ))}
          </div>

          <div className="mt-10 text-center">
            <Link
              href="/faq/"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-terracotta-700 hover:text-terracotta-800"
            >
              <span>Have more questions? Read our full FAQ directory</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </section>

      {/* 10. Final Call to Action Banner */}
      <section className="relative overflow-hidden bg-gradient-to-r from-terracotta-900 via-terracotta-800 to-warm-950 text-white py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/10 text-kesari-300 text-xs font-bold backdrop-blur-xs">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Fast Fresh Delivery Across Gujarat & India</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-serif max-w-2xl mx-auto leading-tight">
            Ready to Taste Authentic Gujarati Tradition?
          </h2>

          <p className="text-stone-300 text-sm sm:text-base max-w-xl mx-auto">
            Order your freshly roasted Methi Thepla, crisp Khakhra, and travel food hampers directly from our Vadodara kitchen.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Link
              href="/products/all-products/"
              className="w-full sm:w-auto px-8 py-4 bg-kesari-500 hover:bg-kesari-400 text-stone-950 font-bold text-sm rounded-xl shadow-card transition-all"
            >
              Order Snacks Online
            </Link>
            <Link
              href="/contact-us/"
              className="w-full sm:w-auto px-7 py-4 bg-white/10 hover:bg-white/20 text-white font-bold text-sm rounded-xl border border-white/20 transition-all"
            >
              Contact Vadodara Kitchen
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
