import React from "react";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Calendar, Clock, User, ArrowRight, Share2, Tag } from "lucide-react";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { JsonLd } from "@/components/seo/JsonLd";
import { TableOfContents } from "@/components/blog/TableOfContents";
import { ProductCard } from "@/components/products/ProductCard";
import { BlogCard } from "@/components/blog/BlogCard";
import { BLOG_ARTICLES } from "@/data/blog";
import { PRODUCTS } from "@/data/products";
import { constructMetadata } from "@/lib/seo";
import { generateArticleSchema } from "@/lib/schema";
import { formatDate } from "@/lib/utils";

interface BlogArticlePageProps {
  params: Promise<{
    category: string;
    slug: string;
  }>;
}

export async function generateStaticParams() {
  return BLOG_ARTICLES.map((art) => ({
    category: art.categorySlug,
    slug: art.slug,
  }));
}

export async function generateMetadata({ params }: BlogArticlePageProps): Promise<Metadata> {
  const { category: categorySlug, slug: articleSlug } = await params;
  const article = BLOG_ARTICLES.find(
    (a) => a.categorySlug === categorySlug && a.slug === articleSlug
  );

  if (!article) {
    return constructMetadata({ title: "Article Not Found", noIndex: true });
  }

  return constructMetadata({
    title: article.seo.title,
    description: article.seo.description,
    canonicalUrl: article.seo.canonicalUrl,
    image: article.featuredImage.url,
    type: "article",
    publishedTime: article.publishedAt,
    authors: [article.author.name],
  });
}

export default async function BlogArticlePage({ params }: BlogArticlePageProps) {
  const { category: categorySlug, slug: articleSlug } = await params;
  const article = BLOG_ARTICLES.find(
    (a) => a.categorySlug === categorySlug && a.slug === articleSlug
  );

  if (!article) {
    notFound();
  }

  const relatedProducts = PRODUCTS.filter((p) =>
    article.relatedProductSlugs.includes(p.slug)
  );

  const relatedArticles = BLOG_ARTICLES.filter(
    (a) => a.id !== article.id && (a.categorySlug === article.categorySlug || article.relatedArticleSlugs.includes(a.slug))
  ).slice(0, 3);

  return (
    <div className="py-8 sm:py-12 bg-warm-50/40">
      <JsonLd data={generateArticleSchema(article)} />

      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Breadcrumb Navigation */}
        <Breadcrumbs
          items={[
            { name: "Blog", url: "/blog/" },
            { name: article.categoryName, url: `/blog/${article.categorySlug}/` },
            { name: article.title, url: `/blog/${article.categorySlug}/${article.slug}/` },
          ]}
        />

        {/* Article Header */}
        <header className="space-y-4">
          <Link
            href={`/blog/${article.categorySlug}/`}
            className="inline-block text-xs font-bold uppercase tracking-widest text-terracotta-700 bg-terracotta-100 px-3 py-1 rounded-full hover:bg-terracotta-200 transition-colors"
          >
            {article.categoryName}
          </Link>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-serif text-stone-900 leading-tight">
            {article.title}
          </h1>

          {/* Author & Meta Row */}
          <div className="flex flex-wrap items-center justify-between gap-4 py-4 border-t border-b border-stone-200 text-xs text-stone-600">
            <div className="flex items-center gap-3">
              <div className="relative w-10 h-10 rounded-full overflow-hidden bg-stone-200">
                <Image
                  src={article.author.avatar}
                  alt={article.author.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <span className="block font-bold text-stone-900 text-sm">
                  {article.author.name}
                </span>
                <span className="text-[11px] text-stone-500">{article.author.role}</span>
              </div>
            </div>

            <div className="flex items-center gap-4 text-xs text-stone-500">
              <span className="flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5" />
                {formatDate(article.publishedAt)}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" />
                {article.readTimeMinutes} min read
              </span>
            </div>
          </div>
        </header>

        {/* Featured Image */}
        <div className="space-y-2">
          <div className="relative aspect-16/9 w-full rounded-3xl overflow-hidden shadow-card border border-stone-200 bg-stone-100">
            <Image
              src={article.featuredImage.url}
              alt={article.featuredImage.alt}
              fill
              priority
              sizes="100vw"
              className="object-cover"
            />
          </div>
          {article.featuredImage.caption && (
            <p className="text-xs text-stone-500 text-center italic">
              {article.featuredImage.caption}
            </p>
          )}
        </div>

        {/* Table of Contents */}
        <TableOfContents items={article.tableOfContents} />

        {/* Rich Article Body */}
        <div className="prose prose-stone max-w-none prose-headings:font-serif prose-headings:font-bold prose-h2:text-2xl prose-h3:text-xl prose-p:text-stone-700 prose-p:leading-relaxed prose-li:text-stone-700 bg-white p-6 sm:p-10 rounded-3xl border border-stone-200 shadow-xs">
          <div
            className="space-y-6 text-sm sm:text-base leading-relaxed text-stone-700"
            dangerouslySetInnerHTML={{
              __html: article.content
                .split("\n\n")
                .map((paragraph) => {
                  if (paragraph.startsWith("## ")) {
                    const headingText = paragraph.replace("## ", "");
                    const id = headingText
                      .toLowerCase()
                      .replace(/[^a-z0-9]+/g, "-")
                      .replace(/(^-|-$)/g, "");
                    return `<h2 id="${id}" class="text-2xl font-bold font-serif text-stone-900 mt-8 mb-4">${headingText}</h2>`;
                  }
                  if (paragraph.startsWith("### ")) {
                    const headingText = paragraph.replace("### ", "");
                    return `<h3 class="text-xl font-bold font-serif text-stone-900 mt-6 mb-3">${headingText}</h3>`;
                  }
                  if (paragraph.startsWith("---")) {
                    return `<hr class="my-8 border-stone-200" />`;
                  }
                  return `<p class="my-4">${paragraph.replace(/\n/g, "<br/>")}</p>`;
                })
                .join(""),
            }}
          />
        </div>

        {/* Tags */}
        <div className="flex flex-wrap items-center gap-2 pt-4">
          <Tag className="w-3.5 h-3.5 text-stone-400" />
          {article.tags.map((t) => (
            <span
              key={t}
              className="text-xs bg-white text-stone-600 px-3 py-1 rounded-lg border border-stone-200"
            >
              #{t}
            </span>
          ))}
        </div>

        {/* Author Bio Box */}
        <div className="bg-white rounded-3xl p-6 border border-stone-200 flex items-start gap-4 shadow-xs">
          <div className="relative w-14 h-14 rounded-2xl overflow-hidden bg-stone-200 shrink-0">
            <Image
              src={article.author.avatar}
              alt={article.author.name}
              fill
              className="object-cover"
            />
          </div>
          <div className="space-y-1 text-xs">
            <h4 className="font-bold text-stone-900 text-sm font-serif">
              About the Author: {article.author.name}
            </h4>
            <p className="text-stone-500">{article.author.role}</p>
            <p className="text-stone-600 leading-relaxed pt-1">{article.author.bio}</p>
          </div>
        </div>

        {/* Related Products Showcase */}
        {relatedProducts.length > 0 && (
          <div className="pt-8 border-t border-stone-200">
            <h3 className="text-2xl font-bold font-serif text-stone-900 mb-6">
              Taste the Authentic Delicacies Mentioned in this Article
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {relatedProducts.map((prod) => (
                <ProductCard key={prod.id} product={prod} />
              ))}
            </div>
          </div>
        )}

        {/* Related Articles */}
        {relatedArticles.length > 0 && (
          <div className="pt-8 border-t border-stone-200">
            <h3 className="text-2xl font-bold font-serif text-stone-900 mb-6">
              Continue Reading Food & Culinary Guides
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedArticles.map((art) => (
                <BlogCard key={art.id} article={art} />
              ))}
            </div>
          </div>
        )}
      </article>
    </div>
  );
}
