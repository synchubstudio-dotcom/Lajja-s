export interface CategoryFaq {
  question: string;
  answer: string;
}

export interface CategoryBenefit {
  title: string;
  description: string;
}

export interface Category {
  id: string;
  slug: string;
  name: string;
  gujaratiName?: string;
  tagline: string;
  description: string;
  heroImage: string;
  traditionContent: {
    heading: string;
    paragraphs: string[];
  };
  culinaryHighlights: string[];
  storageAndTravelTips: string[];
  benefits: CategoryBenefit[];
  faqs: CategoryFaq[];
  seo: {
    title: string;
    description: string;
    canonicalUrl: string;
    keywords: string[];
  };
}
