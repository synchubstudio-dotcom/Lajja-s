import React from "react";
import { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { BlogCard } from "@/components/blog/BlogCard";
import { BLOG_ARTICLES, BLOG_CATEGORIES } from "@/data/blog";
import { constructMetadata } from "@/lib/seo";

export const metadata: Metadata = constructMetadata({
  title: "Gujarati Food, Recipes & Snacking Blog | Lajja’s Foods",
  description: "Read in-depth guides on traditional Gujarati food, thepla preservation for international travel, khakhra making methods, and ancestral food nutrition.",
  canonicalUrl: "https://lajjasfoods.com/blog/",
});

export default function BlogHubPage() {
  return (
    <div className="py-8 sm:py-12 bg-warm-50/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <Breadcrumbs items={[{ name: "Blog", url: "/blog/" }]} />

        {/* Blog Header */}
        <div className="max-w-3xl space-y-2">
          <span className="text-xs font-bold uppercase tracking-widest text-terracotta-700 bg-terracotta-100 px-3 py-1 rounded-full">
            Culinary Heritage & Food Wisdom
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-serif text-stone-900">
            Lajja’s Gujarati Food & Recipe Journal
          </h1>
          <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
            Explore authentic food traditions, travel snack storage guides, health benefits of fenugreek and whole grains, and regional culinary comparisons.
          </p>
        </div>

        {/* Blog Category Pills */}
        <div className="flex flex-wrap gap-2 pt-2 border-b border-stone-200 pb-6">
          <Link
            href="/blog/"
            className="px-4 py-2 rounded-xl text-xs font-bold bg-terracotta-700 text-white shadow-xs"
          >
            All Articles ({BLOG_ARTICLES.length})
          </Link>
          {BLOG_CATEGORIES.map((cat) => (
            <Link
              key={cat.slug}
              href={`/blog/${cat.slug}/`}
              className="px-4 py-2 rounded-xl text-xs font-bold bg-white text-stone-700 hover:bg-stone-100 border border-stone-200"
            >
              {cat.name}
            </Link>
          ))}
        </div>

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {BLOG_ARTICLES.map((article) => (
            <BlogCard key={article.id} article={article} />
          ))}
        </div>
      </div>
    </div>
  );
}
