import { Metadata } from "next";
import { SITE_CONFIG } from "./constants";

export interface ConstructMetadataProps {
  title?: string;
  description?: string;
  image?: string;
  canonicalUrl?: string;
  noIndex?: boolean;
  type?: "website" | "article";
  publishedTime?: string;
  authors?: string[];
}

export function constructMetadata({
  title = SITE_CONFIG.tagline,
  description = SITE_CONFIG.description,
  image = SITE_CONFIG.ogImage,
  canonicalUrl = SITE_CONFIG.url,
  noIndex = false,
  type = "website",
  publishedTime,
  authors,
}: ConstructMetadataProps = {}): Metadata {
  const fullTitle = title.includes(SITE_CONFIG.name) ? title : `${title} | ${SITE_CONFIG.name}`;

  return {
    title: fullTitle,
    description,
    metadataBase: new URL(SITE_CONFIG.url),
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: fullTitle,
      description,
      url: canonicalUrl,
      siteName: SITE_CONFIG.name,
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: fullTitle,
        },
      ],
      locale: "en_IN",
      type,
      ...(publishedTime ? { publishedTime } : {}),
      ...(authors ? { authors } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [image],
      creator: "@lajjasfoods",
    },
    robots: {
      index: !noIndex,
      follow: !noIndex,
      googleBot: {
        index: !noIndex,
        follow: !noIndex,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
  };
}
