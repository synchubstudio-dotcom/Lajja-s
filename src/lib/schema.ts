import { SITE_CONFIG } from "./constants";
import { Product } from "@/types/product";
import { BlogArticle } from "@/types/blog";
import { LocationData } from "@/types/location";
import { FaqItem } from "@/types/faq";

export function generateOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE_CONFIG.name,
    url: SITE_CONFIG.url,
    logo: `${SITE_CONFIG.url}/logo.png`,
    description: SITE_CONFIG.description,
    telephone: SITE_CONFIG.contact.phone,
    email: SITE_CONFIG.contact.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: SITE_CONFIG.contact.address.street,
      addressLocality: SITE_CONFIG.contact.address.city,
      addressRegion: SITE_CONFIG.contact.address.state,
      postalCode: SITE_CONFIG.contact.address.pincode,
      addressCountry: "IN",
    },
    sameAs: [
      SITE_CONFIG.social.instagram,
      SITE_CONFIG.social.facebook,
      SITE_CONFIG.social.youtube,
    ],
  };
}

export function generateWebSiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_CONFIG.name,
    url: SITE_CONFIG.url,
    potentialAction: {
      "@type": "SearchAction",
      target: `${SITE_CONFIG.url}/products/all-products/?q={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };
}

export function generateProductSchema(product: Product) {
  const primaryImage = product.images.find((img) => img.isPrimary) || product.images[0];

  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    image: product.images.map((img) => ({
      "@type": "ImageObject",
      url: img.url,
      ...(img.width ? { width: img.width } : {}),
      ...(img.height ? { height: img.height } : {}),
      caption: img.caption || img.alt,
    })),
    description: product.description,
    sku: product.sku,
    brand: {
      "@type": "Brand",
      name: SITE_CONFIG.name,
    },
    offers: product.packOptions.map((pack) => ({
      "@type": "Offer",
      name: `${product.name} - ${pack.size}`,
      sku: pack.sku,
      price: pack.price,
      priceCurrency: "INR",
      availability: pack.inStock ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
      url: product.seo.canonicalUrl,
      seller: {
        "@type": "Organization",
        name: SITE_CONFIG.name,
      },
    })),
    aggregateRating: product.reviewCount > 0 ? {
      "@type": "AggregateRating",
      ratingValue: product.rating,
      reviewCount: product.reviewCount,
      bestRating: "5",
      worstRating: "1",
    } : undefined,
    review: product.reviews.map((rev) => ({
      "@type": "Review",
      author: {
        "@type": "Person",
        name: rev.author,
      },
      datePublished: rev.date,
      reviewBody: rev.comment,
      name: rev.title,
      reviewRating: {
        "@type": "Rating",
        ratingValue: rev.rating,
        bestRating: "5",
        worstRating: "1",
      },
    })),
  };
}

export function generateBreadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url.startsWith("http") ? item.url : `${SITE_CONFIG.url}${item.url}`,
    })),
  };
}

export function generateLocalBusinessSchema(location: LocationData) {
  return {
    "@context": "https://schema.org",
    "@type": "FoodEstablishment",
    name: `${SITE_CONFIG.name} - ${location.cityName}`,
    image: location.heroImage,
    description: location.shortDescription,
    telephone: location.contactPhone,
    email: location.contactEmail,
    url: location.seo.canonicalUrl,
    address: {
      "@type": "PostalAddress",
      streetAddress: location.localPickupAddress?.street || SITE_CONFIG.contact.address.street,
      addressLocality: location.cityName,
      addressRegion: location.state,
      postalCode: location.localPickupAddress?.pincode || "390020",
      addressCountry: "IN",
    },
    areaServed: location.servingAreas.map((area) => ({
      "@type": "AdministrativeArea",
      name: `${area}, ${location.cityName}`,
    })),
    servesCuisine: ["Gujarati", "Indian Traditional", "Vegetarian"],
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
          "Sunday",
        ],
        opens: "08:00",
        closes: "20:30",
      },
    ],
  };
}

export function generateArticleSchema(article: BlogArticle) {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: article.title,
    description: article.excerpt,
    image: article.featuredImage.url,
    datePublished: article.publishedAt,
    dateModified: article.updatedAt,
    author: {
      "@type": "Person",
      name: article.author.name,
      jobTitle: article.author.role,
    },
    publisher: {
      "@type": "Organization",
      name: SITE_CONFIG.name,
      logo: {
        "@type": "ImageObject",
        url: `${SITE_CONFIG.url}/logo.png`,
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": article.seo.canonicalUrl,
    },
  };
}

export function generateFAQSchema(faqs: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

export function generateItemListSchema(title: string, items: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: title,
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      url: item.url.startsWith("http") ? item.url : `${SITE_CONFIG.url}${item.url}`,
    })),
  };
}
