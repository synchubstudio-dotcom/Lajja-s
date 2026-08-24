import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Clock, Calendar, ArrowRight } from "lucide-react";
import { BlogArticle } from "@/types/blog";
import { formatDate } from "@/lib/utils";

interface BlogCardProps {
  article: BlogArticle;
}

export function BlogCard({ article }: BlogCardProps) {
  const articleUrl = `/blog/${article.categorySlug}/${article.slug}/`;

  return (
    <article className="group flex flex-col bg-white rounded-2xl border border-stone-200/80 hover:border-kesari-300 shadow-xs hover:shadow-card transition-all duration-300 overflow-hidden">
      <Link href={articleUrl} className="relative aspect-16/10 w-full bg-stone-100 overflow-hidden block">
        <Image
          src={article.featuredImage.url}
          alt={article.featuredImage.alt}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-xs text-xs font-bold text-stone-800 px-2.5 py-1 rounded-md shadow-xs">
          {article.categoryName}
        </div>
      </Link>

      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Metadata info */}
          <div className="flex items-center gap-3 text-xs text-stone-500 mb-2">
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

          {/* Title */}
          <h3 className="text-lg font-bold text-stone-900 group-hover:text-terracotta-800 transition-colors font-serif line-clamp-2">
            <Link href={articleUrl}>
              {article.title}
            </Link>
          </h3>

          {/* Excerpt */}
          <p className="text-xs text-stone-600 mt-2 line-clamp-3 leading-relaxed">
            {article.excerpt}
          </p>
        </div>

        {/* Read More Link */}
        <div className="mt-5 pt-3 border-t border-stone-100 flex items-center justify-between">
          <span className="text-xs font-medium text-stone-500">
            By {article.author.name}
          </span>
          <Link
            href={articleUrl}
            className="inline-flex items-center gap-1 text-xs font-bold text-terracotta-700 hover:text-terracotta-900 group-hover:translate-x-1 transition-all"
          >
            <span>Read Article</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </article>
  );
}
