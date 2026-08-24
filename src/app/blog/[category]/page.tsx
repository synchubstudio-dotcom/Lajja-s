import React from "react";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { BlogCard } from "@/components/blog/BlogCard";
import { BLOG_ARTICLES, BLOG_CATEGORIES } from "@/data/blog";
import { constructMetadata } from "@/lib/seo";

interface BlogCategoryPageProps {
  params: Promise<{
    category: string;
  }>;
}

export async function generateStaticParams() {
  return BLOG_CATEGORIES.map((cat) => ({
    category: cat.slug,
  }));
}

export async function generateMetadata({ params }: BlogCategoryPageProps): Promise<Metadata> {
  const { category: categorySlug } = await params;
  const category = BLOG_CATEGORIES.find((c) => c.slug === categorySlug);

  if (!category) {
    return constructMetadata({ title: "Blog Category Not Found", noIndex: true });
  }

  return constructMetadata({
    title: `${category.name} Articles & Guides | Lajja’s Foods Blog`,
    description: category.description,
    canonicalUrl: `https://lajjasfoods.com/blog/${category.slug}/`,
  });
}

export default async function BlogCategoryPage({ params }: BlogCategoryPageProps) {
  const { category: categorySlug } = await params;
  const category = BLOG_CATEGORIES.find((c) => c.slug === categorySlug);

  if (!category) {
    notFound();
  }

  const categoryArticles = BLOG_ARTICLES.filter((a) => a.categorySlug === category.slug);

  return (
    <div className="py-8 sm:py-12 bg-warm-50/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <Breadcrumbs
          items={[
            { name: "Blog", url: "/blog/" },
            { name: category.name, url: `/blog/${category.slug}/` },
          ]}
        />

        {/* Category Header */}
        <div className="max-w-3xl space-y-2">
          <span className="text-xs font-bold uppercase tracking-widest text-terracotta-700 bg-terracotta-100 px-3 py-1 rounded-full">
            Blog Category
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-serif text-stone-900">
            {category.name} Articles
          </h1>
          <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
            {category.description}
          </p>
        </div>

        {/* Category Switcher Tabs */}
        <div className="flex flex-wrap gap-2 pt-2 border-b border-stone-200 pb-6">
          <Link
            href="/blog/"
            className="px-4 py-2 rounded-xl text-xs font-bold bg-white text-stone-700 hover:bg-stone-100 border border-stone-200"
          >
            All Articles
          </Link>
          {BLOG_CATEGORIES.map((cat) => (
            <Link
              key={cat.slug}
              href={`/blog/${cat.slug}/`}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                cat.slug === category.slug
                  ? "bg-terracotta-700 text-white shadow-xs"
                  : "bg-white text-stone-700 hover:bg-stone-100 border border-stone-200"
              }`}
            >
              {cat.name}
            </Link>
          ))}
        </div>

        {/* Article Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categoryArticles.map((article) => (
            <BlogCard key={article.id} article={article} />
          ))}
        </div>
      </div>
    </div>
  );
}
