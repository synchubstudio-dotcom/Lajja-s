export interface BlogAuthor {
  name: string;
  role: string;
  avatar: string;
  bio: string;
}

export interface BlogArticle {
  id: string;
  slug: string;
  categorySlug: "thepla" | "gujarati-snacks" | "khakhra" | "food-nutrition" | "recipes-traditions" | "travel-snacks";
  categoryName: string;
  title: string;
  excerpt: string;
  content: string; // Markdown or rich HTML structure
  featuredImage: {
    url: string;
    alt: string;
    caption?: string;
  };
  author: BlogAuthor;
  publishedAt: string;
  updatedAt: string;
  readTimeMinutes: number;
  tags: string[];
  tableOfContents: {
    id: string;
    title: string;
    level: number;
  }[];
  relatedProductSlugs: string[];
  relatedArticleSlugs: string[];
  seo: {
    title: string;
    description: string;
    canonicalUrl: string;
    keywords: string[];
  };
}
