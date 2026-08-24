import React from "react";
import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";
import { JsonLd } from "./JsonLd";
import { generateBreadcrumbSchema } from "@/lib/schema";

export interface BreadcrumbItem {
  name: string;
  url: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  className?: string;
}

export function Breadcrumbs({ items, className = "" }: BreadcrumbsProps) {
  const fullItems: BreadcrumbItem[] = [
    { name: "Home", url: "/" },
    ...items,
  ];

  return (
    <nav
      aria-label="Breadcrumb"
      className={`py-3 text-sm text-stone-600 ${className}`}
    >
      <JsonLd data={generateBreadcrumbSchema(fullItems)} />
      <ol className="flex flex-wrap items-center gap-1.5 md:gap-2">
        {fullItems.map((item, index) => {
          const isLast = index === fullItems.length - 1;
          const isFirst = index === 0;

          return (
            <li key={`${item.url}-${index}`} className="flex items-center gap-1.5 md:gap-2">
              {index > 0 && (
                <ChevronRight className="w-3.5 h-3.5 text-stone-400 shrink-0" aria-hidden="true" />
              )}
              {isLast ? (
                <span
                  className="font-medium text-terracotta-800 line-clamp-1"
                  aria-current="page"
                >
                  {item.name}
                </span>
              ) : (
                <Link
                  href={item.url}
                  className="hover:text-kesari-700 transition-colors flex items-center gap-1 text-stone-500 hover:underline"
                >
                  {isFirst && <Home className="w-3.5 h-3.5 inline mb-0.5" />}
                  <span>{item.name}</span>
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
