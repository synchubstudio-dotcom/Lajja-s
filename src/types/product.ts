export interface NutritionInfo {
  servingSize: string;
  calories: number;
  protein: string;
  carbohydrates: string;
  fat: string;
  fiber?: string;
  sodium?: string;
}

export interface PackOption {
  size: string; // e.g. "250g", "500g", "1kg", "Pack of 10"
  weightGrams: number;
  price: number;
  compareAtPrice?: number;
  sku: string;
  inStock: boolean;
}

export interface ProductHighlight {
  title: string;
  description: string;
  icon?: string;
}

export interface ProductReview {
  id: string;
  author: string;
  location: string;
  rating: number;
  date: string;
  title: string;
  comment: string;
  verifiedPurchase: boolean;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  gujaratiName?: string;
  categorySlug: "thepla" | "khakhra" | "khari-sing-chana" | "roasted-peanuts" | "combo-packs";
  categoryName: string;
  shortDescription: string;
  description: string;
  heritageStory?: string;
  images: {
    url: string;
    alt: string;
    isPrimary?: boolean;
  }[];
  price: number; // Base price for default pack
  compareAtPrice?: number;
  sku: string;
  inStock: boolean;
  stockCount: number;
  packOptions: PackOption[];
  ingredients: string[];
  dietaryTags: string[]; // e.g. "100% Vegetarian", "No Added Preservatives", "Handcrafted", "Jain Friendly Available"
  nutrition: NutritionInfo;
  shelfLife: string; // e.g. "20 Days in Ambient, 45 Days Refrigerated"
  storageInstructions: string;
  shippingInfo: string;
  highlights: ProductHighlight[];
  preparationMethod?: string;
  pairingSuggestions?: string[];
  featured: boolean;
  bestSeller: boolean;
  rating: number;
  reviewCount: number;
  reviews: ProductReview[];
  faqs: {
    question: string;
    answer: string;
  }[];
  seo: {
    title: string;
    description: string;
    canonicalUrl: string;
    keywords: string[];
  };
}
