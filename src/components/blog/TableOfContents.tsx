"use client";

import React from "react";
import { List } from "lucide-react";

interface TableOfContentsProps {
  items: {
    id: string;
    title: string;
    level: number;
  }[];
}

export function TableOfContents({ items }: TableOfContentsProps) {
  if (items.length === 0) return null;

  return (
    <div className="bg-stone-50 rounded-2xl p-5 border border-stone-200 my-8">
      <div className="flex items-center gap-2 pb-3 border-b border-stone-200 text-stone-900 font-bold text-sm font-serif">
        <List className="w-4 h-4 text-terracotta-700" />
        <span>Table of Contents</span>
      </div>

      <nav aria-label="Table of contents" className="mt-3">
        <ol className="space-y-2 text-xs">
          {items.map((item, index) => (
            <li
              key={item.id}
              className={`${item.level === 3 ? "pl-4 text-stone-500" : "font-medium text-stone-700"}`}
            >
              <a
                href={`#${item.id}`}
                className="hover:text-terracotta-700 hover:underline flex items-start gap-1.5 py-0.5"
              >
                <span className="text-kesari-600 font-bold">{index + 1}.</span>
                <span>{item.title}</span>
              </a>
            </li>
          ))}
        </ol>
      </nav>
    </div>
  );
}
