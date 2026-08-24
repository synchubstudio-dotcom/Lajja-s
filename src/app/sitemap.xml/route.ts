import { NextResponse } from "next/server";
import { SITE_CONFIG } from "@/lib/constants";
import { CATEGORIES } from "@/data/categories";
import { PRODUCTS } from "@/data/products";
import { LOCATIONS } from "@/data/locations";
import { BLOG_ARTICLES, BLOG_CATEGORIES } from "@/data/blog";
import { PORTFOLIO_ITEMS } from "@/data/portfolio";

export async function GET() {
  const baseUrl = SITE_CONFIG.url;

  const staticUrls = [
    { loc: `${baseUrl}/`, priority: "1.0", changefreq: "daily" },
    { loc: `${baseUrl}/about-us/`, priority: "0.8", changefreq: "monthly" },
    { loc: `${baseUrl}/locations/`, priority: "0.9", changefreq: "weekly" },
    { loc: `${baseUrl}/portfolio/`, priority: "0.8", changefreq: "monthly" },
    { loc: `${baseUrl}/blog/`, priority: "0.9", changefreq: "daily" },
    { loc: `${baseUrl}/faq/`, priority: "0.7", changefreq: "monthly" },
    { loc: `${baseUrl}/contact-us/`, priority: "0.7", changefreq: "monthly" },
    { loc: `${baseUrl}/products/all-products/`, priority: "0.95", changefreq: "daily" },
    { loc: `${baseUrl}/privacy-policy/`, priority: "0.3", changefreq: "yearly" },
    { loc: `${baseUrl}/terms-and-conditions/`, priority: "0.3", changefreq: "yearly" },
    { loc: `${baseUrl}/shipping-policy/`, priority: "0.4", changefreq: "monthly" },
    { loc: `${baseUrl}/return-refund-policy/`, priority: "0.4", changefreq: "monthly" },
    { loc: `${baseUrl}/cancellation-policy/`, priority: "0.4", changefreq: "monthly" },
  ];

  const categoryUrls = CATEGORIES.map((cat) => ({
    loc: `${baseUrl}/${cat.slug}/`,
    priority: "0.9",
    changefreq: "weekly",
  }));

  const productUrls = PRODUCTS.map((prod) => ({
    loc: `${baseUrl}/${prod.categorySlug}/${prod.slug}/`,
    priority: "0.85",
    changefreq: "weekly",
  }));

  const locationUrls = LOCATIONS.map((loc) => ({
    loc: `${baseUrl}/locations/${loc.slug}/`,
    priority: "0.85",
    changefreq: "weekly",
  }));

  const blogCategoryUrls = BLOG_CATEGORIES.map((bcat) => ({
    loc: `${baseUrl}/blog/${bcat.slug}/`,
    priority: "0.75",
    changefreq: "weekly",
  }));

  const blogArticleUrls = BLOG_ARTICLES.map((art) => ({
    loc: `${baseUrl}/blog/${art.categorySlug}/${art.slug}/`,
    priority: "0.8",
    changefreq: "monthly",
    lastmod: (art.updatedAt || art.publishedAt),
  }));

  const portfolioUrls = PORTFOLIO_ITEMS.map((item) => ({
    loc: `${baseUrl}/portfolio/${item.slug}/`,
    priority: "0.7",
    changefreq: "monthly",
  }));

  const allEntries = [
    ...staticUrls,
    ...categoryUrls,
    ...productUrls,
    ...locationUrls,
    ...blogCategoryUrls,
    ...blogArticleUrls,
    ...portfolioUrls,
  ];

  const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allEntries
  .map(
    (entry) => `  <url>
    <loc>${entry.loc}</loc>
    ${"lastmod" in entry ? `<lastmod>${entry.lastmod}</lastmod>` : `<lastmod>${new Date().toISOString().split("T")[0]}</lastmod>`}
    <changefreq>${entry.changefreq}</changefreq>
    <priority>${entry.priority}</priority>
  </url>`
  )
  .join("\n")}
</urlset>`;

  return new NextResponse(sitemapXml, {
    status: 200,
    headers: {
      "Content-Type": "application/xml",
      "Cache-Control": "public, max-age=86400, s-maxage=86400, stale-while-revalidate=86400",
    },
  });
}
