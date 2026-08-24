export interface LocalDeliverySchedule {
  area: string;
  timeline: string;
  cutoffTime: string;
  minimumOrder: number;
  expressAvailable: boolean;
}

export interface LocationData {
  id: string;
  slug: string; // e.g. "vadodara", "ahmedabad", "surat", "rajkot", "anand", "bharuch"
  cityName: string;
  gujaratiCityName?: string;
  state: string;
  isKitchenHub: boolean;
  heroImage: string;
  headline: string;
  shortDescription: string;
  localStory: string;
  servingAreas: string[];
  popularSnacks: string[]; // Product slugs popular in this city
  deliverySchedule: LocalDeliverySchedule[];
  localPickupAddress?: {
    street: string;
    neighborhood: string;
    city: string;
    pincode: string;
    landmark: string;
    googleMapsLink?: string;
    operatingHours: string;
  };
  contactPhone: string;
  contactEmail: string;
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
