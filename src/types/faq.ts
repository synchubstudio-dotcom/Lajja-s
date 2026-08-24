export interface FaqItem {
  id: string;
  category: "General" | "Thepla & Fresh Snacks" | "Khakhra & Dry Snacks" | "Packaging & Freshness" | "Ordering & Delivery" | "Custom & Bulk Orders";
  question: string;
  answer: string;
}

export interface PortfolioItem {
  id: string;
  slug: string;
  title: string;
  category: "products" | "preparation" | "packaging" | "our-journey";
  subtitle: string;
  description: string;
  detailedStory: string;
  image: string;
  galleryImages: {
    url: string;
    caption: string;
  }[];
  keyHighlights: string[];
  processSteps?: {
    stepNumber: number;
    title: string;
    description: string;
  }[];
  dateOrEpoch?: string;
}
