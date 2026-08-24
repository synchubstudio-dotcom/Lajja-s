import { PortfolioItem } from "@/types/faq";

export const PORTFOLIO_ITEMS: PortfolioItem[] = [
  {
    id: "port-preparation",
    slug: "preparation",
    category: "preparation",
    title: "Artisanal Kitchen & Preparation Rituals",
    subtitle: "Stone Grinding, Hand Kneading & Iron Tawa Roasting",
    description: "Witness the authentic step-by-step culinary journey behind every batch of Lajja’s Foods theplas and khakhras.",
    detailedStory: "At our central kitchen in Vadodara, modern hygienic standards meet generational culinary devotion. Every morning begins with inspecting freshly harvested fenugreek leaves, stone grinding local whole wheat kernels, and preparing small-batch dough batches kneaded with whole spices and pure yogurt. We slow-roast on heavy seasoned cast-iron griddles to preserve natural vitamins, colors, and textures.",
    image: "https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?auto=format&fit=crop&w=1200&q=80",
    galleryImages: [
      { url: "https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?auto=format&fit=crop&w=800&q=80", caption: "Hand-kneading fresh methi and whole wheat dough" },
      { url: "https://images.unsplash.com/photo-1599488615731-7e5c2823ff28?auto=format&fit=crop&w=800&q=80", caption: "Slow roasting on heavy cast-iron tawas" },
      { url: "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=800&q=80", caption: "Precision temperature control for moisture retention" }
    ],
    keyHighlights: [
      "100% Stone-Ground Whole Grain Wheat (Zero Maida)",
      "Pure Cold-Pressed Groundnut Oil & Desi Cow Ghee",
      "Hand-Sorted Fresh Greens & Spices",
      "Sanitary Clean-Room Cooling Standards"
    ],
    processSteps: [
      { stepNumber: 1, title: "Grain Sourcing & Milling", description: "Sourcing premium Sharbati and indigenous Gujarat wheat, stone-milled daily at low RPM to retain the nutrient-rich germ." },
      { stepNumber: 2, title: "Herbal Kneading", description: "Kneading with farm-fresh methi leaves, cultured dahi, ajwain, turmeric, and cold-pressed oil to lock in natural moisture." },
      { stepNumber: 3, title: "Artisan Rolling & Roasting", description: "Rolling into ultra-thin sheets and roasting with calibrated heat on heavy iron griddles until golden and pliable." },
      { stepNumber: 4, title: "Thermal Sealing & Cooling", description: "Controlled cooling in a filtered-air clean room before immediate protective vacuum sealing." }
    ]
  },
  {
    id: "port-packaging",
    slug: "packaging",
    category: "packaging",
    title: "Stay-Fresh Vacuum & Travel Packaging Philosophy",
    subtitle: "5-Layer Barrier Protection Engineered for Global Transit",
    description: "How our multi-barrier vacuum sealing and crush-proof boxing keep Gujarati snacks tawa-fresh across thousands of miles.",
    detailedStory: "Food spoilage is caused by two main factors: oxygen oxidation and moisture migration. To eliminate both without using chemical preservatives, we invested in state-of-the-art 5-layer food-grade EVOH barrier pouches. When air is evacuated, natural antioxidants in turmeric and spices create a stable micro-environment where theplas stay soft and khakhras stay shatteringly crisp.",
    image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=1200&q=80",
    galleryImages: [
      { url: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80", caption: "5-layer oxygen-barrier vacuum sealing unit" },
      { url: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=800&q=80", caption: "Nitrogen flushed packaging for roasted nuts and chana" },
      { url: "https://images.unsplash.com/photo-1599488615731-7e5c2823ff28?auto=format&fit=crop&w=800&q=80", caption: "Rigid travel carton protecting delicate khakhra discs" }
    ],
    keyHighlights: [
      "5-Layer EVOH High Barrier Pouches",
      "Zero Oxygen & Zero Moisture Permeability",
      "Flight-Tested Crush-Proof Rigid Outer Cartons",
      "Commercially Labeled for International Airport Customs"
    ],
    processSteps: [
      { stepNumber: 1, title: "Air Evacuation", description: "Removing 99.8% of atmospheric oxygen from the pouch." },
      { stepNumber: 2, title: "Hermetic Heat Sealing", description: "Double-track thermal weld to prevent micro-leaks during altitude pressure changes." },
      { stepNumber: 3, title: "Shock-Absorbing Outer Box", description: "Corrugated exterior shielding fragile crisp snacks from courier impact." }
    ]
  },
  {
    id: "port-products",
    slug: "products",
    category: "products",
    title: "Signature Product Craftsmanship",
    subtitle: "A Visual Showcase of Authentic Gujarati Savories",
    description: "Explore our curated culinary creations spanning Theplas, Khakhras, Bharuchi Roasted Peanuts, and Celebration Hampers.",
    detailedStory: "Every product at Lajja’s Foods represents months of recipe refinement, balancing traditional taste with modern packaging science. We take pride in preserving ancestral flavors in their most authentic form.",
    image: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=1200&q=80",
    galleryImages: [
      { url: "https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?auto=format&fit=crop&w=800&q=80", caption: "Signature Methi Thepla" },
      { url: "https://images.unsplash.com/photo-1599488615731-7e5c2823ff28?auto=format&fit=crop&w=800&q=80", caption: "Hand-pressed Methi & Masala Khakhra" },
      { url: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=800&q=80", caption: "Bharuchi Salted Khari Sing" },
      { url: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80", caption: "Curated Breakfast & Travel Combos" }
    ],
    keyHighlights: [
      "15+ Curated Traditional Gujarati Snack SKUs",
      "Authentic Regional Spice Formulations",
      "Zero Chemical Preservatives or Added MSG",
      "Consistent Artisanal Quality Across Every Pack"
    ]
  },
  {
    id: "port-our-journey",
    slug: "our-journey",
    category: "our-journey",
    title: "Our Heritage Journey: From Home Kitchen to Global Tables",
    subtitle: "A Family Passion Dedicated to Authentic Gujarati Food",
    description: "The story of how Lajja’s Foods grew from a beloved Vadodara family kitchen into Gujarat’s premier traditional food brand.",
    detailedStory: "Lajja’s Foods began with a simple belief: when loved ones travel far from home, nothing provides comfort quite like the aroma of freshly roasted theplas and crunchy khakhra prepared with motherly care. What started in our Vadodara family kitchen as travel packs for visiting relatives soon expanded into a mission to bring authentic Gujarati culinary heritage to snack enthusiasts worldwide.",
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=1200&q=80",
    galleryImages: [
      { url: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=800&q=80", caption: "The foundational kitchen recipes in Vadodara" },
      { url: "https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?auto=format&fit=crop&w=800&q=80", caption: "Empowering skilled local women artisans" },
      { url: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80", caption: "Delivering across India and international travelers" }
    ],
    keyHighlights: [
      "Founded in Vadodara, Gujarat",
      "Women-Led Artisanal Kitchen Empowering Local Culinary Talent",
      "Over 50,000+ Packs Delivered to Travelers Worldwide",
      "Uncompromising Commitment to Purity and Heritage Recipes"
    ]
  }
];
