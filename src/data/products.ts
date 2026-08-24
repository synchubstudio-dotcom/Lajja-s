import { Product } from "@/types/product";

export const PRODUCTS: Product[] = [
  // --- THEPLA ---
  {
    id: "prod-methi-thepla",
    slug: "methi-thepla",
    name: "Methi Thepla",
    gujaratiName: "મેથી થેપલા",
    categorySlug: "thepla",
    categoryName: "Thepla",
    shortDescription: "Traditional soft Gujarati flatbreads infused with fresh hand-chopped fenugreek leaves, curd, and aromatic spices.",
    description: "Our signature Methi Thepla is the quintessential taste of Gujarat. Hand-rolled to delicate thinness and slow-cooked on traditional tawas with fresh green methi, stone-ground whole wheat, turmeric, ajwain, and a gentle touch of ginger-chili paste. Vacuum sealed to retain fresh softness for weeks without artificial preservatives.",
    heritageStory: "Methi Thepla has sustained travelers across the arid landscapes of Gujarat for centuries. The naturally preservative properties of fenugreek, turmeric, and mustard oil allow these flatbreads to stay soft and fragrant for days on the go.",
    images: [
      {
        url: "https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?auto=format&fit=crop&w=1200&q=80",
        alt: "Freshly roasted Methi Thepla with spiced green fenugreek leaves served on a traditional plate",
        isPrimary: true
      },
      {
        url: "https://images.unsplash.com/photo-1599488615731-7e5c2823ff28?auto=format&fit=crop&w=1200&q=80",
        alt: "Stack of vacuum sealed soft Methi Thepla ready for travel",
      }
    ],
    price: 160,
    compareAtPrice: 190,
    sku: "LJ-THP-MTH-01",
    inStock: true,
    stockCount: 85,
    packOptions: [
      { size: "Pack of 10 (approx. 250g)", weightGrams: 250, price: 160, compareAtPrice: 190, sku: "LJ-THP-MTH-10", inStock: true },
      { size: "Pack of 20 (approx. 500g)", weightGrams: 500, price: 300, compareAtPrice: 360, sku: "LJ-THP-MTH-20", inStock: true },
      { size: "Pack of 40 (approx. 1kg - Family / Travel)", weightGrams: 1000, price: 580, compareAtPrice: 700, sku: "LJ-THP-MTH-40", inStock: true }
    ],
    ingredients: ["Stone-Ground Whole Wheat Flour", "Fresh Fenugreek Leaves (Methi)", "Pure Cow Curd (Dahi)", "Cold-Pressed Groundnut Oil", "Turmeric Powder", "Ajwain (Carom Seeds)", "Green Chili & Ginger Paste", "Coriander Cumin Powder", "Rock Salt"],
    dietaryTags: ["100% Vegetarian", "No Added Preservatives", "Zero Maida", "Travel Ready"],
    nutrition: {
      servingSize: "2 Theplas (approx. 50g)",
      calories: 145,
      protein: "3.8g",
      carbohydrates: "21.2g",
      fat: "5.1g",
      fiber: "3.2g",
      sodium: "220mg"
    },
    shelfLife: "20 Days in Ambient Vacuum Seal, 45 Days Refrigerated",
    storageInstructions: "Store unopened pack in a cool, dry place. Once opened, store in an airtight container or foil in the refrigerator.",
    shippingInfo: "Cooked fresh to order in Vadodara. Dispatched in tamper-evident vacuum pouches within 24 hours.",
    highlights: [
      { title: "Fresh Farm Fenugreek", description: "Harvested locally and washed thoroughly to retain natural iron and aroma." },
      { title: "Zero Maida Guarantee", description: "Pure whole wheat dough for wholesome digestion and sustained energy." },
      { title: "Multi-Barrier Vacuum Seal", description: "Locks in steam and softness so your theplas taste fresh off the tawa." }
    ],
    preparationMethod: "Ready to eat at room temperature. Alternatively, heat for 15 seconds on a dry skillet or 10 seconds in a microwave.",
    pairingSuggestions: ["Gujarati Mango Chundo", "Fresh Curd or Raita", "Hot Spiced Masala Chai", "Garlic Pickle (Lasan nu Athanu)"],
    featured: true,
    bestSeller: true,
    rating: 4.9,
    reviewCount: 142,
    reviews: [
      {
        id: "rev-01",
        author: "Bhavna Patel",
        location: "Ahmedabad",
        rating: 5,
        date: "2026-02-14",
        title: "Just like home! Soft and delicious for our USA flight",
        comment: "Packed 3 boxes of 40 theplas for my son traveling to New Jersey. They remained incredibly soft for over 10 days! Truly authentic taste.",
        verifiedPurchase: true
      },
      {
        id: "rev-02",
        author: "Jignesh Shah",
        location: "Vadodara",
        rating: 5,
        date: "2026-02-02",
        title: "Perfect methi flavor and softness",
        comment: "The methi is fresh, not bitter at all, and the balance of ajwain and salt is spot on. Our go-to weekend breakfast with chai.",
        verifiedPurchase: true
      }
    ],
    faqs: [
      { question: "How long will this Thepla last during an international flight?", answer: "Our multi-layer vacuum sealed pack keeps the theplas completely fresh and soft for at least 20 days at room temperature." },
      { question: "Is this made with pure wheat or is maida blended in?", answer: "We use 100% stone-ground whole wheat flour. Zero refined flour (maida) is ever added." }
    ],
    seo: {
      title: "Methi Thepla | Authentic Gujarati Snack | Lajja’s Foods",
      description: "Shop Methi Thepla from Lajja’s Foods. A traditional Gujarati snack made with fresh methi, whole wheat, and cold-pressed spices. Vacuum sealed for travel freshness.",
      canonicalUrl: "https://lajjasfoods.com/thepla/methi-thepla/",
      keywords: ["methi thepla", "gujarati methi thepla", "buy thepla online", "travel thepla", "fresh thepla vadodara"]
    }
  },
  {
    id: "prod-masala-thepla",
    slug: "masala-thepla",
    name: "Masala Thepla",
    gujaratiName: "મસાલા થેપલા",
    categorySlug: "thepla",
    categoryName: "Thepla",
    shortDescription: "Zesty spiced Gujarati flatbread layered with roasted cumin, carom seeds, red chili, and aromatic Gujarati masalas.",
    description: "For lovers of bold, aromatic Gujarati flavors, our Masala Thepla offers a vibrant spice profile. Kneaded with roasted cumin, ajwain, Kashmiri chili, turmeric, and cold-pressed oil, this thepla delivers a warming flavor that pairs remarkably well with afternoon tea or travel meals.",
    heritageStory: "Masala theplas were historically crafted for long monsoon journeys across Saurashtra, using warming spices that stimulate digestion and preserve bread without chilling.",
    images: [
      {
        url: "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=1200&q=80",
        alt: "Spiced Masala Thepla stacked with cumin seeds and red spice flecks",
        isPrimary: true
      }
    ],
    price: 155,
    compareAtPrice: 185,
    sku: "LJ-THP-MSL-01",
    inStock: true,
    stockCount: 60,
    packOptions: [
      { size: "Pack of 10 (approx. 250g)", weightGrams: 250, price: 155, compareAtPrice: 185, sku: "LJ-THP-MSL-10", inStock: true },
      { size: "Pack of 20 (approx. 500g)", weightGrams: 500, price: 290, compareAtPrice: 350, sku: "LJ-THP-MSL-20", inStock: true },
      { size: "Pack of 40 (approx. 1kg - Family / Travel)", weightGrams: 1000, price: 560, compareAtPrice: 680, sku: "LJ-THP-MSL-40", inStock: true }
    ],
    ingredients: ["100% Whole Wheat Flour", "Pure Dahi", "Groundnut Oil", "Roasted Cumin Powder", "Kashmiri Red Chili Powder", "Turmeric Powder", "Ajwain Seeds", "Rock Salt"],
    dietaryTags: ["100% Vegetarian", "No Added Preservatives", "Zero Maida"],
    nutrition: {
      servingSize: "2 Theplas (50g)",
      calories: 148,
      protein: "3.6g",
      carbohydrates: "21.5g",
      fat: "5.3g",
      fiber: "2.9g"
    },
    shelfLife: "20 Days in Ambient Vacuum Seal, 45 Days Refrigerated",
    storageInstructions: "Keep in a cool dry area. Refrigerate upon unsealing.",
    shippingInfo: "Dispatched fresh within 24 hours of order.",
    highlights: [
      { title: "Aromatic Spice Blend", description: "Hand-blended roasted cumin and Kashmiri chili for a rich, warming palate." },
      { title: "Digestive Ajwain", description: "Generous carom seeds to promote light and comfortable digestion." }
    ],
    preparationMethod: "Ready to eat. Lightly warm on tawa for enhanced aroma.",
    pairingSuggestions: ["Sweet Lemon Pickle", "Mint Coriander Chutney", "Morning Chai"],
    featured: true,
    bestSeller: false,
    rating: 4.8,
    reviewCount: 98,
    reviews: [
      {
        id: "rev-03",
        author: "Mehul Desai",
        location: "Surat",
        rating: 5,
        date: "2026-01-28",
        title: "The right spice kick!",
        comment: "Excellent spice balance. Not overly spicy, but full of flavor. Highly recommend.",
        verifiedPurchase: true
      }
    ],
    faqs: [
      { question: "Is this thepla very spicy?", answer: "It has a medium warmth from Kashmiri chili and cumin, suitable for all ages." }
    ],
    seo: {
      title: "Masala Thepla | Spiced Gujarati Flatbread | Lajja’s Foods",
      description: "Order handcrafted Masala Thepla from Lajja’s Foods. Infused with roasted cumin, ajwain, and Kashmiri chili. 100% whole wheat, vacuum sealed for travel.",
      canonicalUrl: "https://lajjasfoods.com/thepla/masala-thepla/",
      keywords: ["masala thepla", "spiced thepla", "gujarati travel bread", "buy masala thepla online"]
    }
  },
  {
    id: "prod-multigrain-thepla",
    slug: "multigrain-thepla",
    name: "Multigrain Thepla",
    gujaratiName: "મલ્ટીગ્રેન થેપલા",
    categorySlug: "thepla",
    categoryName: "Thepla",
    shortDescription: "Wholesome 5-grain Gujarati flatbread combining whole wheat, jowar, bajra, ragi, and besan with green herbs.",
    description: "A nutrient-rich evolution of the traditional thepla, blending five ancestral grains: Whole Wheat, Sorghum (Jowar), Pearl Millet (Bajra), Finger Millet (Ragi), and Gram Flour (Besan). Packed with dietary fiber, minerals, and plant protein.",
    heritageStory: "In rural Saurashtra, mixing winter millets like bajra and jowar into daily theplas was the secret to day-long vigor in agricultural fields.",
    images: [
      {
        url: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=1200&q=80",
        alt: "Multigrain Thepla made with five traditional Gujarati grains and fresh herbs",
        isPrimary: true
      }
    ],
    price: 175,
    compareAtPrice: 210,
    sku: "LJ-THP-MLT-01",
    inStock: true,
    stockCount: 45,
    packOptions: [
      { size: "Pack of 10 (approx. 250g)", weightGrams: 250, price: 175, compareAtPrice: 210, sku: "LJ-THP-MLT-10", inStock: true },
      { size: "Pack of 20 (approx. 500g)", weightGrams: 500, price: 330, compareAtPrice: 400, sku: "LJ-THP-MLT-20", inStock: true },
      { size: "Pack of 40 (approx. 1kg - Family / Travel)", weightGrams: 1000, price: 630, compareAtPrice: 760, sku: "LJ-THP-MLT-40", inStock: true }
    ],
    ingredients: ["Stone-Ground Wheat", "Jowar Flour", "Bajra Flour", "Ragi Flour", "Chana Besan", "Fresh Methi", "Cold-Pressed Groundnut Oil", "Ajwain", "Turmeric", "Himalayan Pink Salt"],
    dietaryTags: ["High Fiber", "Multi-Millet Blend", "100% Vegetarian", "Zero Maida"],
    nutrition: {
      servingSize: "2 Theplas (50g)",
      calories: 138,
      protein: "4.8g",
      carbohydrates: "19.5g",
      fat: "4.4g",
      fiber: "4.6g"
    },
    shelfLife: "20 Days Ambient, 45 Days Refrigerated",
    storageInstructions: "Store sealed in dry cool pantry. Refrigerate after opening.",
    shippingInfo: "Cooked fresh on order.",
    highlights: [
      { title: "5 Ancient Grains", description: "Combines wheat, jowar, bajra, ragi, and besan for rich micro-nutrition." },
      { title: "High Dietary Fiber", description: "Over 4.5g fiber per serving for sustained fullness and digestive balance." }
    ],
    featured: false,
    bestSeller: false,
    rating: 4.9,
    reviewCount: 76,
    reviews: [
      {
        id: "rev-04",
        author: "Rashmi Joshi",
        location: "Rajkot",
        rating: 5,
        date: "2026-02-09",
        title: "Incredible for diabetic breakfast",
        comment: "The multi-millet texture is wonderful and doesn't spike sugar levels like plain wheat. Soft and wholesome.",
        verifiedPurchase: true
      }
    ],
    faqs: [
      { question: "Is this suitable for healthy weight management diets?", answer: "Yes, the slow-release complex carbs from jowar, bajra, and ragi provide lasting satiety." }
    ],
    seo: {
      title: "Multigrain Thepla | 5-Grain Healthy Gujarati Snack | Lajja’s Foods",
      description: "Buy healthy Multigrain Thepla made with wheat, jowar, bajra, ragi, and besan. High in fiber and protein. Vacuum sealed for freshness. Order online.",
      canonicalUrl: "https://lajjasfoods.com/thepla/multigrain-thepla/",
      keywords: ["multigrain thepla", "healthy thepla online", "millet thepla", "gujarati diet food"]
    }
  },
  {
    id: "prod-plain-thepla",
    slug: "plain-thepla",
    name: "Plain Thepla",
    gujaratiName: "સાદા થેપલા",
    categorySlug: "thepla",
    categoryName: "Thepla",
    shortDescription: "Classic mild Gujarati flatbread seasoned with ajwain and turmeric. Jain-friendly with zero onion, garlic, or root vegetables.",
    description: "A soothing, timeless Gujarati classic. Kneaded simply with pure whole wheat, gentle turmeric, ajwain seeds, and cold-pressed oil. Completely Jain-friendly and mild, making it an ideal canvas for savory curries, sweet mango pickles, or tea dipping.",
    heritageStory: "The simple Plain Thepla is the foundation of Gujarati domestic comfort, served from early dawn in every traditional household.",
    images: [
      {
        url: "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=1200&q=80",
        alt: "Golden Plain Thepla folded with ajwain seeds and turmeric aroma",
        isPrimary: true
      }
    ],
    price: 150,
    compareAtPrice: 180,
    sku: "LJ-THP-PLN-01",
    inStock: true,
    stockCount: 70,
    packOptions: [
      { size: "Pack of 10 (approx. 250g)", weightGrams: 250, price: 150, compareAtPrice: 180, sku: "LJ-THP-PLN-10", inStock: true },
      { size: "Pack of 20 (approx. 500g)", weightGrams: 500, price: 280, compareAtPrice: 340, sku: "LJ-THP-PLN-20", inStock: true },
      { size: "Pack of 40 (approx. 1kg)", weightGrams: 1000, price: 540, compareAtPrice: 650, sku: "LJ-THP-PLN-40", inStock: true }
    ],
    ingredients: ["Stone-Ground Whole Wheat", "Pure Dahi", "Groundnut Oil", "Ajwain Seeds", "Turmeric Powder", "Rock Salt"],
    dietaryTags: ["100% Vegetarian", "Jain Friendly", "Zero Maida", "Mild Flavor"],
    nutrition: {
      servingSize: "2 Theplas (50g)",
      calories: 142,
      protein: "3.5g",
      carbohydrates: "21.0g",
      fat: "4.8g",
      fiber: "2.8g"
    },
    shelfLife: "20 Days Ambient, 45 Days Refrigerated",
    storageInstructions: "Store sealed in cool dry conditions.",
    shippingInfo: "Dispatched within 24 hours.",
    highlights: [
      { title: "Strictly Jain Friendly", description: "No root vegetables, ginger, or garlic; prepared in dedicated vegetarian kitchen." }
    ],
    featured: false,
    bestSeller: false,
    rating: 4.8,
    reviewCount: 54,
    reviews: [
      {
        id: "rev-05",
        author: "Ketan Shah",
        location: "Anand",
        rating: 5,
        date: "2026-01-15",
        title: "Pure Jain authenticity",
        comment: "Hard to find genuine Jain thepla online that stays this soft. Very pleased.",
        verifiedPurchase: true
      }
    ],
    faqs: [
      { question: "Is this strictly Jain?", answer: "Yes, it contains no root ingredients or green chilies." }
    ],
    seo: {
      title: "Plain Thepla | Jain Friendly Gujarati Flatbread | Lajja’s Foods",
      description: "Buy traditional Plain Thepla from Lajja’s Foods. Made with pure whole wheat, curd, and ajwain. 100% Jain friendly and vacuum sealed for freshness.",
      canonicalUrl: "https://lajjasfoods.com/thepla/plain-thepla/",
      keywords: ["plain thepla", "jain thepla", "gujarati plain thepla", "buy jain thepla online"]
    }
  },
  {
    id: "prod-jeera-thepla",
    slug: "jeera-thepla",
    name: "Jeera Thepla",
    gujaratiName: "જીરા થેપલા",
    categorySlug: "thepla",
    categoryName: "Thepla",
    shortDescription: "Aromatic thepla generously studded with whole roasted cumin seeds and cold-pressed spices for a warm, fragrant bite.",
    description: "Roasted cumin seeds (jeera) take center stage in this aromatic variation. As the whole seeds toast on the griddle, they release nutty, earthy notes that infuse the soft whole wheat layers.",
    heritageStory: "Jeera has always been Gujarat’s most prized digestive spice, cultivated extensively across Unjha and North Gujarat.",
    images: [
      {
        url: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&w=1200&q=80",
        alt: "Aromatic Jeera Thepla studded with roasted cumin seeds",
        isPrimary: true
      }
    ],
    price: 155,
    compareAtPrice: 185,
    sku: "LJ-THP-JRA-01",
    inStock: true,
    stockCount: 50,
    packOptions: [
      { size: "Pack of 10 (approx. 250g)", weightGrams: 250, price: 155, compareAtPrice: 185, sku: "LJ-THP-JRA-10", inStock: true },
      { size: "Pack of 20 (approx. 500g)", weightGrams: 500, price: 290, compareAtPrice: 350, sku: "LJ-THP-JRA-20", inStock: true },
      { size: "Pack of 40 (approx. 1kg)", weightGrams: 1000, price: 560, compareAtPrice: 680, sku: "LJ-THP-JRA-40", inStock: true }
    ],
    ingredients: ["Whole Wheat Flour", "Whole Roasted Jeera", "Pure Dahi", "Groundnut Oil", "Turmeric", "Ajwain", "Rock Salt"],
    dietaryTags: ["100% Vegetarian", "Digestive Spices", "Zero Maida"],
    nutrition: {
      servingSize: "2 Theplas (50g)",
      calories: 144,
      protein: "3.7g",
      carbohydrates: "21.1g",
      fat: "5.0g",
      fiber: "3.0g"
    },
    shelfLife: "20 Days Ambient, 45 Days Refrigerated",
    storageInstructions: "Store sealed at ambient room temperature.",
    shippingInfo: "Fresh dispatch within 24 hours.",
    highlights: [
      { title: "Whole Roasted Cumin", description: "Generous whole cumin kernels for an earthy crunch in every bite." }
    ],
    featured: false,
    bestSeller: false,
    rating: 4.8,
    reviewCount: 41,
    reviews: [
      {
        id: "rev-06",
        author: "Devang Trivedi",
        location: "Bharuch",
        rating: 5,
        date: "2026-01-20",
        title: "Wonderful cumin fragrance",
        comment: "Smells incredible right out of the packet. Tastes wonderful with hot morning tea.",
        verifiedPurchase: true
      }
    ],
    faqs: [
      { question: "What is the primary spice?", answer: "Roasted cumin seeds (Jeera) along with mild turmeric and ajwain." }
    ],
    seo: {
      title: "Jeera Thepla | Roasted Cumin Gujarati Flatbread | Lajja’s Foods",
      description: "Buy aromatic Jeera Thepla from Lajja’s Foods. Infused with whole roasted cumin seeds, turmeric, and pure wheat. Vacuum sealed for long freshness.",
      canonicalUrl: "https://lajjasfoods.com/thepla/jeera-thepla/",
      keywords: ["jeera thepla", "cumin thepla", "gujarati thepla online", "traditional thepla"]
    }
  },

  // --- KHAKHRA ---
  {
    id: "prod-methi-khakhra",
    slug: "methi-khakhra",
    name: "Methi Khakhra",
    gujaratiName: "મેથી ખાખરા",
    categorySlug: "khakhra",
    categoryName: "Khakhra",
    shortDescription: "Crispy, paper-thin Gujarati roasted discs hand-pressed with aromatic dried fenugreek leaves and digestive spices.",
    description: "Our hand-pressed Methi Khakhra is slow-roasted over low heat with wooden pads to create a wafer-thin, delightfully crispy snack. Infused with dried kasuri methi, turmeric, carom seeds, and a touch of roasted cumin. 100% roasted, never deep-fried.",
    heritageStory: "Khakhra was historically created in Gujarati homes to transform leftover chapati dough into a long-lasting, crisp traveling wafer that would never spoil in the desert heat.",
    images: [
      {
        url: "https://images.unsplash.com/photo-1599488615731-7e5c2823ff28?auto=format&fit=crop&w=1200&q=80",
        alt: "Crisp golden Methi Khakhra discs stacked on a wooden board with fenugreek aroma",
        isPrimary: true
      }
    ],
    price: 130,
    compareAtPrice: 155,
    sku: "LJ-KHK-MTH-01",
    inStock: true,
    stockCount: 110,
    packOptions: [
      { size: "200g Pouch (approx. 8-10 pieces)", weightGrams: 200, price: 130, compareAtPrice: 155, sku: "LJ-KHK-MTH-200", inStock: true },
      { size: "500g Box (approx. 20-25 pieces)", weightGrams: 500, price: 290, compareAtPrice: 350, sku: "LJ-KHK-MTH-500", inStock: true },
      { size: "1kg Bulk Pack (Family / Travel)", weightGrams: 1000, price: 540, compareAtPrice: 650, sku: "LJ-KHK-MTH-1000", inStock: true }
    ],
    ingredients: ["100% Whole Wheat Flour", "Kasuri Methi (Dried Fenugreek)", "Groundnut Oil (Minimal for roasting)", "Turmeric Powder", "Ajwain Seeds", "Rock Salt"],
    dietaryTags: ["100% Roasted", "Zero Deep Frying", "High Fiber", "90+ Days Shelf Life"],
    nutrition: {
      servingSize: "2 Khakhras (approx. 40g)",
      calories: 125,
      protein: "3.2g",
      carbohydrates: "23.4g",
      fat: "2.1g",
      fiber: "3.5g"
    },
    shelfLife: "90 Days in Sealed Barrier Pack",
    storageInstructions: "Store in an airtight container to preserve crispness. Keep away from humidity.",
    shippingInfo: "Packed in protective bubble cushioning to prevent transit breakage.",
    highlights: [
      { title: "100% Roasted (Not Fried)", description: "Slow-pressed over cast iron griddles for guilt-free crunch." },
      { title: "Long 90-Day Freshness", description: "Natural dry roasting completely eliminates moisture for extended shelf life." }
    ],
    preparationMethod: "Ready to eat. Enjoy plain or smeared with a teaspoon of pure ghee and methi sambhar pickle masala.",
    pairingSuggestions: ["Hot Masala Chai", "Pickle Masala (Achar Sambhar)", "Fresh Ghee", "Khakhra Chaat Toppings"],
    featured: true,
    bestSeller: true,
    rating: 4.9,
    reviewCount: 165,
    reviews: [
      {
        id: "rev-07",
        author: "Pooja Vora",
        location: "Surat",
        rating: 5,
        date: "2026-02-12",
        title: "Best crunch and non-oily!",
        comment: "Unlike supermarket khakhras, these are zero oily and genuinely hand pressed. Perfect with 4 PM tea.",
        verifiedPurchase: true
      }
    ],
    faqs: [
      { question: "Is this khakhra fried at all?", answer: "No, our khakhras are 100% dry-roasted on cast-iron griddles." }
    ],
    seo: {
      title: "Methi Khakhra | Crisp Handcrafted Gujarati Khakhra | Lajja’s Foods",
      description: "Buy crisp, slow-roasted Methi Khakhra from Lajja’s Foods. 100% whole wheat, non-fried, and seasoned with kasuri methi and ajwain. 90-day freshness guaranteed.",
      canonicalUrl: "https://lajjasfoods.com/khakhra/methi-khakhra/",
      keywords: ["methi khakhra", "gujarati khakhra online", "roasted khakhra", "healthy tea time snack"]
    }
  },
  {
    id: "prod-masala-khakhra",
    slug: "masala-khakhra",
    name: "Masala Khakhra",
    gujaratiName: "મસાલા ખાખરા",
    categorySlug: "khakhra",
    categoryName: "Khakhra",
    shortDescription: "Fiery and crunchy whole wheat roasted discs seasoned with red chili, roasted cumin, and traditional Gujarati chatpata spices.",
    description: "A zesty, savory crisp for those who love bold Gujarati street flavors. Hand-pressed whole wheat discs dusted with roasted cumin, spicy Kashmiri chili, black salt, and a hint of amchur.",
    heritageStory: "Masala khakhra is Gujarat’s favorite tea-time crunch, capturing the spirit of Ahmedabad’s bustling street snack culture.",
    images: [
      {
        url: "https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?auto=format&fit=crop&w=1200&q=80",
        alt: "Golden crispy Masala Khakhra with red spice blend and cumin seeds",
        isPrimary: true
      }
    ],
    price: 130,
    compareAtPrice: 155,
    sku: "LJ-KHK-MSL-01",
    inStock: true,
    stockCount: 80,
    packOptions: [
      { size: "200g Pouch (approx. 8-10 pieces)", weightGrams: 200, price: 130, compareAtPrice: 155, sku: "LJ-KHK-MSL-200", inStock: true },
      { size: "500g Box (approx. 20-25 pieces)", weightGrams: 500, price: 290, compareAtPrice: 350, sku: "LJ-KHK-MSL-500", inStock: true },
      { size: "1kg Bulk Pack", weightGrams: 1000, price: 540, compareAtPrice: 650, sku: "LJ-KHK-MSL-1000", inStock: true }
    ],
    ingredients: ["Whole Wheat Flour", "Groundnut Oil", "Red Chili Powder", "Roasted Jeera", "Ajwain", "Amchur", "Black Salt", "Rock Salt"],
    dietaryTags: ["100% Roasted", "Spicy & Savory", "Zero Maida"],
    nutrition: {
      servingSize: "2 Khakhras (40g)",
      calories: 128,
      protein: "3.1g",
      carbohydrates: "23.0g",
      fat: "2.3g",
      fiber: "3.3g"
    },
    shelfLife: "90 Days in Sealed Pack",
    storageInstructions: "Store in an airtight jar.",
    shippingInfo: "Shipped in shatter-resistant packaging.",
    highlights: [
      { title: "Chatpata Flavor", description: "Balanced with roasted cumin and dry mango powder for an addictive tang." }
    ],
    featured: false,
    bestSeller: true,
    rating: 4.8,
    reviewCount: 92,
    reviews: [
      {
        id: "rev-08",
        author: "Kavita Amin",
        location: "Ahmedabad",
        rating: 5,
        date: "2026-02-05",
        title: "Addictive flavor!",
        comment: "Great flavor with just the right amount of chili. We make Khakhra Pizza with this base!",
        verifiedPurchase: true
      }
    ],
    faqs: [
      { question: "Is this very hot?", answer: "It has a medium chatpata spice, very flavorful without overwhelming chili burn." }
    ],
    seo: {
      title: "Masala Khakhra | Chatpata Spiced Gujarati Khakhra | Lajja’s Foods",
      description: "Order zesty Masala Khakhra online from Lajja’s Foods. Handcrafted, dry-roasted, whole wheat snack with cumin and Kashmiri chili. 90-day crisp shelf life.",
      canonicalUrl: "https://lajjasfoods.com/khakhra/masala-khakhra/",
      keywords: ["masala khakhra", "spicy khakhra", "gujarati snacks online", "chatpata khakhra"]
    }
  },
  {
    id: "prod-plain-khakhra",
    slug: "plain-khakhra",
    name: "Plain Khakhra",
    gujaratiName: "સાદા ખાખરા",
    categorySlug: "khakhra",
    categoryName: "Khakhra",
    shortDescription: "Light, pure whole wheat roasted discs gently touched with turmeric, ajwain, and pink salt. Jain friendly.",
    description: "The minimalist pure version of Gujarati khakhra. Allows the toasted whole grain wheat aroma to shine through with gentle digestive ajwain and warming turmeric.",
    heritageStory: "An integral breakfast staple across Jain ascetic and pilgrim traditions for its purity and longevity.",
    images: [
      {
        url: "https://images.unsplash.com/photo-1599488615731-7e5c2823ff28?auto=format&fit=crop&w=1200&q=80",
        alt: "Clean toasted Plain Khakhra disc with golden turmeric hues",
        isPrimary: true
      }
    ],
    price: 125,
    compareAtPrice: 150,
    sku: "LJ-KHK-PLN-01",
    inStock: true,
    stockCount: 65,
    packOptions: [
      { size: "200g Pouch", weightGrams: 200, price: 125, compareAtPrice: 150, sku: "LJ-KHK-PLN-200", inStock: true },
      { size: "500g Box", weightGrams: 500, price: 275, compareAtPrice: 330, sku: "LJ-KHK-PLN-500", inStock: true },
      { size: "1kg Bulk Pack", weightGrams: 1000, price: 510, compareAtPrice: 620, sku: "LJ-KHK-PLN-1000", inStock: true }
    ],
    ingredients: ["Stone-Ground Whole Wheat", "Groundnut Oil", "Turmeric Powder", "Ajwain Seeds", "Rock Salt"],
    dietaryTags: ["100% Roasted", "Jain Friendly", "Zero Maida"],
    nutrition: {
      servingSize: "2 Khakhras (40g)",
      calories: 122,
      protein: "3.2g",
      carbohydrates: "23.8g",
      fat: "1.9g",
      fiber: "3.4g"
    },
    shelfLife: "90 Days",
    storageInstructions: "Airtight container.",
    shippingInfo: "Shipped within 24 hours.",
    highlights: [
      { title: "Pure Whole Wheat", description: "Unadulterated grain flavor with zero overpowering masalas." }
    ],
    featured: false,
    bestSeller: false,
    rating: 4.7,
    reviewCount: 38,
    reviews: [
      {
        id: "rev-09",
        author: "Nirav Gandhi",
        location: "Vadodara",
        rating: 5,
        date: "2026-01-18",
        title: "Clean and pure",
        comment: "Great quality wheat and very thin. Ideal for breakfast with ghee and jaggery.",
        verifiedPurchase: true
      }
    ],
    faqs: [
      { question: "Is this suitable for elders and children?", answer: "Yes, it is very mild, easy to digest, and crisp." }
    ],
    seo: {
      title: "Plain Khakhra | Jain Friendly Whole Wheat Khakhra | Lajja’s Foods",
      description: "Shop traditional Plain Khakhra from Lajja’s Foods. 100% roasted whole wheat flatbread, Jain-friendly, crisp and light for breakfast and tea time.",
      canonicalUrl: "https://lajjasfoods.com/khakhra/plain-khakhra/",
      keywords: ["plain khakhra", "jain khakhra", "diet khakhra", "whole wheat khakhra"]
    }
  },

  // --- KHARI SING CHANA ---
  {
    id: "prod-salted-khari-sing",
    slug: "salted-khari-sing",
    name: "Bharuchi Salted Khari Sing",
    gujaratiName: "ભરૂચી ખારી સીંગ",
    categorySlug: "khari-sing-chana",
    categoryName: "Khari Sing Chana",
    shortDescription: "Famous Bharuch-style jumbo roasted groundnuts, brined in natural salt water and sand-roasted in earthen griddles.",
    description: "Experience the authentic taste of Bharuch's legendary Khari Sing. We handpick jumbo Gujarat peanuts, soak them in calibrated mineral sea salt brine, and roast them in heated river sand. The husk remains crisp and protective while the inner peanut absorbs a savory, salty sweetness.",
    heritageStory: "For over 200 years, Bharuch railway station and the Narmada riverbank have been the birthplace of India's most celebrated salted peanuts.",
    images: [
      {
        url: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=1200&q=80",
        alt: "Golden Bharuchi Khari Sing jumbo salted groundnuts in earthen bowl",
        isPrimary: true
      }
    ],
    price: 140,
    compareAtPrice: 170,
    sku: "LJ-SNG-KHS-01",
    inStock: true,
    stockCount: 95,
    packOptions: [
      { size: "250g Pouch", weightGrams: 250, price: 140, compareAtPrice: 170, sku: "LJ-SNG-KHS-250", inStock: true },
      { size: "500g Pouch", weightGrams: 500, price: 260, compareAtPrice: 320, sku: "LJ-SNG-KHS-500", inStock: true },
      { size: "1kg Family Pack", weightGrams: 1000, price: 490, compareAtPrice: 600, sku: "LJ-SNG-KHS-1000", inStock: true }
    ],
    ingredients: ["Jumbo Gujarat Groundnuts (In Shell / Kernel)", "Natural Sea Salt Brine"],
    dietaryTags: ["100% Sand Roasted", "Zero Oil", "High Plant Protein", "Naturally Gluten Free"],
    nutrition: {
      servingSize: "30g",
      calories: 170,
      protein: "7.5g",
      carbohydrates: "5.2g",
      fat: "14.1g",
      fiber: "2.6g"
    },
    shelfLife: "60 Days in Sealed Pouch",
    storageInstructions: "Store in a dry airtight container.",
    shippingInfo: "Nitrogen flushed for maximum crunch retention.",
    highlights: [
      { title: "Artisanal Sand Roasting", description: "Heated sand roasting delivers even heat without burning the natural nutty oils." },
      { title: "High Plant Protein", description: "7.5g protein per 30g serving for healthy sustained energy." }
    ],
    featured: true,
    bestSeller: true,
    rating: 4.9,
    reviewCount: 118,
    reviews: [
      {
        id: "rev-10",
        author: "Prashant Bhatt",
        location: "Bharuch",
        rating: 5,
        date: "2026-02-10",
        title: "Real Bharuchi quality!",
        comment: "As someone from Bharuch, I can confirm this is the genuine roasting method. Large peanuts and perfect salt infusion.",
        verifiedPurchase: true
      }
    ],
    faqs: [
      { question: "Is oil used in the roasting?", answer: "No, it is 100% dry-roasted using the traditional salt brine and sand technique." }
    ],
    seo: {
      title: "Bharuchi Salted Khari Sing | Traditional Roasted Peanuts | Lajja’s Foods",
      description: "Buy authentic Bharuch style Khari Sing online from Lajja’s Foods. Jumbo Gujarat peanuts sand-roasted with sea salt brine. High protein, oil-free snacking.",
      canonicalUrl: "https://lajjasfoods.com/khari-sing-chana/salted-khari-sing/",
      keywords: ["khari sing", "bharuchi khari sing", "salted peanuts gujarat", "roasted sing online"]
    }
  },
  {
    id: "prod-masala-chana",
    slug: "masala-chana",
    name: "Roasted Masala Chana",
    gujaratiName: "શેકેલા મસાલા ચણા",
    categorySlug: "khari-sing-chana",
    categoryName: "Khari Sing Chana",
    shortDescription: "Crunchy dry-roasted Bengal gram with skin, tossed in tangy black salt, roasted cumin, and dry mango powder.",
    description: "Premium Bengal gram (Kala Chana) dry-roasted to a crispy burst with the fiber-rich skin intact, then coated with an aromatic dusting of hing, roasted cumin, amchur, and black rock salt.",
    heritageStory: "Roasted chana has been the powerhouse snack of Gujarati farmers and scholars for its unmatched low-glycemic plant protein.",
    images: [
      {
        url: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=1200&q=80",
        alt: "Golden spiced Roasted Masala Chana with aromatic black salt and cumin",
        isPrimary: true
      }
    ],
    price: 130,
    compareAtPrice: 160,
    sku: "LJ-SNG-CHN-01",
    inStock: true,
    stockCount: 75,
    packOptions: [
      { size: "250g Pouch", weightGrams: 250, price: 130, compareAtPrice: 160, sku: "LJ-SNG-CHN-250", inStock: true },
      { size: "500g Pouch", weightGrams: 500, price: 240, compareAtPrice: 300, sku: "LJ-SNG-CHN-500", inStock: true },
      { size: "1kg Family Pack", weightGrams: 1000, price: 450, compareAtPrice: 560, sku: "LJ-SNG-CHN-1000", inStock: true }
    ],
    ingredients: ["Roasted Bengal Gram (Chana with skin)", "Black Salt", "Roasted Jeera", "Amchur", "Hing", "Rock Salt"],
    dietaryTags: ["High Protein", "High Fiber", "Zero Oil", "Gluten Free"],
    nutrition: {
      servingSize: "30g",
      calories: 110,
      protein: "6.8g",
      carbohydrates: "17.2g",
      fat: "1.8g",
      fiber: "5.1g"
    },
    shelfLife: "90 Days",
    storageInstructions: "Store sealed in dry cool area.",
    shippingInfo: "Dispatched within 24 hours.",
    highlights: [
      { title: "Skin-On Fiber", description: "Natural whole skin provides 5g of dietary fiber per serving." }
    ],
    featured: false,
    bestSeller: false,
    rating: 4.8,
    reviewCount: 63,
    reviews: [
      {
        id: "rev-11",
        author: "Alpa Mehta",
        location: "Vadodara",
        rating: 5,
        date: "2026-01-22",
        title: "Crunchy and guilt-free",
        comment: "My daily desk snack. Keeps me full till lunch without heavy calories.",
        verifiedPurchase: true
      }
    ],
    faqs: [
      { question: "Is this fried?", answer: "No, 100% dry-roasted." }
    ],
    seo: {
      title: "Roasted Masala Chana | High Protein Gujarati Snack | Lajja’s Foods",
      description: "Buy high-protein Roasted Masala Chana from Lajja’s Foods. Dry-roasted Bengal gram with skin, seasoned with black salt and cumin. Order online.",
      canonicalUrl: "https://lajjasfoods.com/khari-sing-chana/masala-chana/",
      keywords: ["roasted chana", "masala chana", "gujarati roasted snacks", "healthy protein snack"]
    }
  },

  // --- ROASTED PEANUTS ---
  {
    id: "prod-hing-jeera-peanuts",
    slug: "hing-jeera-peanuts",
    name: "Hing Jeera Roasted Peanuts",
    gujaratiName: "હીંગ જીરા શેકેલા સીંગદાણા",
    categorySlug: "roasted-peanuts",
    categoryName: "Roasted Peanuts",
    shortDescription: "Golden roasted Saurashtra peanuts tossed in pungent componded asafoetida (hing), roasted cumin, and black salt.",
    description: "A signature Gujarati savory specialty. Selected Saurashtra groundnuts dry roasted to golden perfection and seasoned with aromatic compounded Hing, hand-ground roasted cumin seeds, and tangy black salt.",
    heritageStory: "Hing and Jeera are revered in Ayurvedic Gujarati cooking for balancing gastric agni and enhancing the nutty richness of peanuts.",
    images: [
      {
        url: "https://images.unsplash.com/photo-1567620832903-9fc6debc209f?auto=format&fit=crop&w=1200&q=80",
        alt: "Crispy golden roasted peanuts dusted with aromatic hing and jeera powder",
        isPrimary: true
      }
    ],
    price: 150,
    compareAtPrice: 180,
    sku: "LJ-PNT-HNG-01",
    inStock: true,
    stockCount: 88,
    packOptions: [
      { size: "250g Pouch", weightGrams: 250, price: 150, compareAtPrice: 180, sku: "LJ-PNT-HNG-250", inStock: true },
      { size: "500g Pouch", weightGrams: 500, price: 280, compareAtPrice: 340, sku: "LJ-PNT-HNG-500", inStock: true },
      { size: "1kg Family Pack", weightGrams: 1000, price: 530, compareAtPrice: 650, sku: "LJ-PNT-HNG-1000", inStock: true }
    ],
    ingredients: ["Bold Gujarat Peanuts", "Pure Compounded Asafoetida (Hing)", "Roasted Jeera Powder", "Black Salt", "Kala Namak", "Turmeric"],
    dietaryTags: ["100% Roasted", "Zero Trans Fat", "High Protein", "Digestive"],
    nutrition: {
      servingSize: "30g",
      calories: 168,
      protein: "7.2g",
      carbohydrates: "5.8g",
      fat: "13.9g",
      fiber: "2.5g"
    },
    shelfLife: "60 Days in Sealed Pouch",
    storageInstructions: "Store in airtight jar.",
    shippingInfo: "Vacuum-barrier packed.",
    highlights: [
      { title: "Royal Hing Seasoning", description: "Pungent, authentic asafoetida aroma that sparks the senses." }
    ],
    featured: true,
    bestSeller: true,
    rating: 4.9,
    reviewCount: 84,
    reviews: [
      {
        id: "rev-12",
        author: "Manish Somaiya",
        location: "Rajkot",
        rating: 5,
        date: "2026-02-01",
        title: "Unmatched hing flavor!",
        comment: "The aroma when you open the pack is unbelievable. Very crisp and clean roasting.",
        verifiedPurchase: true
      }
    ],
    faqs: [
      { question: "What makes these peanuts special?", answer: "We use bold Saurashtra peanuts seasoned with pure roasted cumin and compounded hing." }
    ],
    seo: {
      title: "Hing Jeera Roasted Peanuts | Gujarati Savory Snack | Lajja’s Foods",
      description: "Buy Hing Jeera Roasted Peanuts online from Lajja’s Foods. Golden roasted Saurashtra peanuts tossed with aromatic asafoetida, cumin, and black salt.",
      canonicalUrl: "https://lajjasfoods.com/roasted-peanuts/hing-jeera-peanuts/",
      keywords: ["hing jeera peanuts", "gujarati roasted peanuts", "asafoetida peanuts", "salted groundnuts online"]
    }
  },
  {
    id: "prod-classic-salted-peanuts",
    slug: "classic-salted-peanuts",
    name: "Classic Salted Roasted Peanuts",
    gujaratiName: "સાદા મીઠા વાળા સીંગદાણા",
    categorySlug: "roasted-peanuts",
    categoryName: "Roasted Peanuts",
    shortDescription: "Clean, simple roasted peanut kernels sprinkled with pure Himalayan pink crystal salt.",
    description: "For the purist who loves the natural sweet, buttery taste of Gujarat groundnuts. Slow dry-roasted and dusted with finely milled Himalayan pink salt.",
    heritageStory: "Saurashtra’s black cotton soil gives these nuts an inherent sweetness that needs nothing more than pure salt to shine.",
    images: [
      {
        url: "https://images.unsplash.com/photo-1567620832903-9fc6debc209f?auto=format&fit=crop&w=1200&q=80",
        alt: "Classic golden roasted peanut kernels sprinkled with crystal salt",
        isPrimary: true
      }
    ],
    price: 145,
    compareAtPrice: 175,
    sku: "LJ-PNT-SLT-01",
    inStock: true,
    stockCount: 70,
    packOptions: [
      { size: "250g Pouch", weightGrams: 250, price: 145, compareAtPrice: 175, sku: "LJ-PNT-SLT-250", inStock: true },
      { size: "500g Pouch", weightGrams: 500, price: 270, compareAtPrice: 330, sku: "LJ-PNT-SLT-500", inStock: true },
      { size: "1kg Family Pack", weightGrams: 1000, price: 510, compareAtPrice: 630, sku: "LJ-PNT-SLT-1000", inStock: true }
    ],
    ingredients: ["Gujarat Peanuts", "Himalayan Pink Salt"],
    dietaryTags: ["100% Roasted", "Zero Preservatives", "Gluten Free", "Jain Friendly"],
    nutrition: {
      servingSize: "30g",
      calories: 169,
      protein: "7.3g",
      carbohydrates: "5.5g",
      fat: "14.0g",
      fiber: "2.6g"
    },
    shelfLife: "60 Days",
    storageInstructions: "Store in cool dry container.",
    shippingInfo: "Dispatched in 24 hours.",
    highlights: [
      { title: "Pure Pink Salt", description: "Mineral-rich Himalayan crystal salt." }
    ],
    featured: false,
    bestSeller: false,
    rating: 4.8,
    reviewCount: 47,
    reviews: [
      {
        id: "rev-13",
        author: "Kiran Soni",
        location: "Surat",
        rating: 5,
        date: "2026-01-25",
        title: "Clean and tasty",
        comment: "Great quality kernels, no bad or bitter ones. High quality.",
        verifiedPurchase: true
      }
    ],
    faqs: [
      { question: "Is this Jain friendly?", answer: "Yes, it contains only roasted peanuts and Himalayan salt." }
    ],
    seo: {
      title: "Classic Salted Roasted Peanuts | Pure Gujarati Snacks | Lajja’s Foods",
      description: "Buy Classic Salted Roasted Peanuts from Lajja’s Foods. Premium Gujarat groundnuts roasted to perfection with Himalayan pink salt. Order online.",
      canonicalUrl: "https://lajjasfoods.com/roasted-peanuts/classic-salted-peanuts/",
      keywords: ["salted roasted peanuts", "gujarat peanuts", "healthy tea time snack"]
    }
  },

  // --- COMBO PACKS ---
  {
    id: "prod-breakfast-combo",
    slug: "breakfast-combo",
    name: "Gujarati Breakfast Combo",
    gujaratiName: "ગુજરાતી નાસ્તા કોમ્બો",
    categorySlug: "combo-packs",
    categoryName: "Combo Packs",
    shortDescription: "The ultimate morning pairing: 20 Fresh Methi Theplas, 10 Crisp Methi Khakhras, and a 250g jar of Mango Chundo.",
    description: "Start your mornings with the quintessential Gujarati breakfast. This curated combo brings together 20 vacuum-sealed Methi Theplas (soft, fresh, whole-wheat), a pack of hand-pressed Methi Khakhras, and traditional sweet-spicy Gujarati Mango Chundo. Everything you need for 7+ days of wholesome morning nourishment.",
    heritageStory: "Across Ahmedabad, Vadodara, and Surat, morning chai is incomplete without hot thepla and crisp khakhra shared among family.",
    images: [
      {
        url: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=1200&q=80",
        alt: "Gujarati Breakfast Combo hamper box with fresh theplas, khakhras, and pickle",
        isPrimary: true
      }
    ],
    price: 499,
    compareAtPrice: 590,
    sku: "LJ-CMB-BKF-01",
    inStock: true,
    stockCount: 40,
    packOptions: [
      { size: "Standard Breakfast Box (Serves 2-3 for 1 week)", weightGrams: 850, price: 499, compareAtPrice: 590, sku: "LJ-CMB-BKF-STD", inStock: true },
      { size: "Deluxe Breakfast Hamper (Serves 4-5)", weightGrams: 1600, price: 920, compareAtPrice: 1100, sku: "LJ-CMB-BKF-DLX", inStock: true }
    ],
    ingredients: ["Methi Thepla (Whole Wheat, Fenugreek, Dahi)", "Methi Khakhra (Whole Wheat, Spices)", "Traditional Gujarati Mango Chundo (Grated Green Mango, Sugar, Spices)"],
    dietaryTags: ["100% Vegetarian", "Curated Breakfast", "Save 15% on Bundle"],
    nutrition: {
      servingSize: "1 Breakfast Serving (2 Theplas + 1 Khakhra)",
      calories: 210,
      protein: "5.5g",
      carbohydrates: "33.0g",
      fat: "6.8g",
      fiber: "4.8g"
    },
    shelfLife: "Thepla 20 Days, Khakhra 90 Days",
    storageInstructions: "Store boxes in a cool dry pantry.",
    shippingInfo: "Packaged in rigid gift & travel box with bubble protection.",
    highlights: [
      { title: "Complete Morning Routine", description: "Soft theplas + crisp khakhras + authentic sweet mango chundo." },
      { title: "15% Bundle Savings", description: "Cheaper than buying individual items." }
    ],
    featured: true,
    bestSeller: true,
    rating: 4.9,
    reviewCount: 132,
    reviews: [
      {
        id: "rev-14",
        author: "Snehal Trivedi",
        location: "Ahmedabad",
        rating: 5,
        date: "2026-02-11",
        title: "Saved our morning breakfast hassle!",
        comment: "Ordering this every 2 weeks now. Fresh theplas and khakhras make weekday breakfast effortless and nutritious.",
        verifiedPurchase: true
      }
    ],
    faqs: [
      { question: "How many theplas are included?", answer: "The standard box includes 20 vacuum-sealed Methi Theplas, 10 Methi Khakhras, and a jar of Mango Chundo." }
    ],
    seo: {
      title: "Gujarati Breakfast Combo | Thepla, Khakhra & Chundo | Lajja’s Foods",
      description: "Order the Gujarati Breakfast Combo from Lajja’s Foods. Includes 20 soft Methi Theplas, crisp Khakhra, and authentic Mango Chundo. Save 15% on bundle. Order online.",
      canonicalUrl: "https://lajjasfoods.com/combo-packs/breakfast-combo/",
      keywords: ["gujarati breakfast combo", "thepla khakhra combo", "traditional indian breakfast kit", "buy breakfast hamper"]
    }
  },
  {
    id: "prod-travel-combo",
    slug: "travel-combo",
    name: "Gujarati Travel Snack Combo",
    gujaratiName: "મુસાફરી નાસ્તા કોમ્બો",
    categorySlug: "combo-packs",
    categoryName: "Combo Packs",
    shortDescription: "Engineered for international flights, road trips, and students abroad: 30 Methi Theplas, 2 packs Khakhra, and Bharuchi Khari Sing.",
    description: "Never travel hungry again. Our Travel Combo is specially packaged to survive rigorous flights, border luggage checks, and road journeys. Includes 30 vacuum-sealed Methi Theplas, 2 packs of assorted Khakhras, and 250g Bharuchi Khari Sing. Packaged in a compact, crush-proof container.",
    heritageStory: "Gujarati travelers are famous worldwide for carrying their beloved home snacks across the globe, ensuring comfort and vegetarian purity anywhere.",
    images: [
      {
        url: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=1200&q=80",
        alt: "Gujarati Travel Snack Combo in travel-tested packaging",
        isPrimary: true
      }
    ],
    price: 649,
    compareAtPrice: 780,
    sku: "LJ-CMB-TRV-01",
    inStock: true,
    stockCount: 50,
    packOptions: [
      { size: "Travel Pack (30 Theplas + 2 Khakhra Packs + 250g Sing)", weightGrams: 1200, price: 649, compareAtPrice: 780, sku: "LJ-CMB-TRV-STD", inStock: true },
      { size: "Overseas Student / Long Trip Kit (60 Theplas + 4 Khakhra Packs + 500g Sing)", weightGrams: 2400, price: 1249, compareAtPrice: 1490, sku: "LJ-CMB-TRV-LNG", inStock: true }
    ],
    ingredients: ["Methi Thepla (Whole Wheat, Spices)", "Assorted Khakhra (Methi & Masala)", "Bharuchi Salted Khari Sing"],
    dietaryTags: ["Flight Ready", "Travel Tested", "Extended Freshness", "100% Vegetarian"],
    nutrition: {
      servingSize: "1 Travel Snack Pack (2 Theplas + handful of Sing)",
      calories: 240,
      protein: "8.5g",
      carbohydrates: "28.0g",
      fat: "10.2g",
      fiber: "5.2g"
    },
    shelfLife: "Thepla 20 Days, Khakhra/Sing 60-90 Days",
    storageInstructions: "Keep in suitcase or carry-on. No refrigeration required.",
    shippingInfo: "Reinforced corrugated travel carton.",
    highlights: [
      { title: "Checked-in Luggage Safe", description: "Sturdy vacuum sealing prevents bursting or aroma leaks during high-altitude transit." },
      { title: "No Cooking Required", description: "Ready to eat directly anywhere in transit." }
    ],
    featured: true,
    bestSeller: true,
    rating: 5.0,
    reviewCount: 210,
    reviews: [
      {
        id: "rev-15",
        author: "Hardik Parekh",
        location: "Vadodara",
        rating: 5,
        date: "2026-02-14",
        title: "Carried to London - perfectly fresh!",
        comment: "Took the overseas kit to the UK. Survived 14 hours flight and lasted for 2 weeks in my student dorm. Exceptional quality.",
        verifiedPurchase: true
      }
    ],
    faqs: [
      { question: "Is this permitted on international airline flights?", answer: "Yes! As properly packaged, cooked, shelf-stable bakery/grain food in commercially sealed pouches, it is permissible in carry-on and checked luggage." }
    ],
    seo: {
      title: "Gujarati Travel Snack Combo | Flight Ready Thepla & Khakhra | Lajja’s Foods",
      description: "Buy travel-ready Gujarati snack hampers from Lajja’s Foods. Includes 30 Methi Theplas, Khakhra, and Bharuchi Khari Sing in luggage-safe vacuum packaging.",
      canonicalUrl: "https://lajjasfoods.com/combo-packs/travel-combo/",
      keywords: ["gujarati travel snack combo", "thepla for international travel", "travel food pack flight", "gujarati snacks for overseas trip"]
    }
  },
  {
    id: "prod-family-combo",
    slug: "family-combo",
    name: "Lajja’s Grand Family Snack Box",
    gujaratiName: "લાજ્જા ગ્રાન્ડ ફેમિલી નાસ્તા બોક્સ",
    categorySlug: "combo-packs",
    categoryName: "Combo Packs",
    shortDescription: "The complete celebratory hamper: Methi Thepla, Masala Thepla, Methi Khakhra, Bharuchi Sing, Roasted Chana, and Hing Jeera Peanuts.",
    description: "An opulent assortment celebrating the entire spectrum of Gujarati snacking. Features our top-rated Theplas, crisp Khakhras, Bharuchi sand-roasted nuts, and spiced chana. Perfect for family gatherings, festival celebrations, and authentic regional gifting.",
    heritageStory: "Created to embody the joyful generosity of Gujarati joint-family gatherings, where every member has their favorite snack.",
    images: [
      {
        url: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=1200&q=80",
        alt: "Lajja’s Grand Family Gujarati Snack Hamper Box filled with assorted savory snacks",
        isPrimary: true
      }
    ],
    price: 899,
    compareAtPrice: 1080,
    sku: "LJ-CMB-FAM-01",
    inStock: true,
    stockCount: 35,
    packOptions: [
      { size: "Grand Family Hamper (2kg Assortment)", weightGrams: 2000, price: 899, compareAtPrice: 1080, sku: "LJ-CMB-FAM-STD", inStock: true },
      { size: "Festive Mega Box (3.5kg Assortment)", weightGrams: 3500, price: 1549, compareAtPrice: 1850, sku: "LJ-CMB-FAM-MGA", inStock: true }
    ],
    ingredients: ["Methi Thepla", "Masala Thepla", "Methi Khakhra", "Plain Khakhra", "Bharuchi Khari Sing", "Roasted Masala Chana", "Hing Jeera Peanuts"],
    dietaryTags: ["100% Vegetarian", "Mega Hamper", "Gift Ready", "Save 20%"],
    nutrition: {
      servingSize: "Assorted Snack Portion (50g)",
      calories: 180,
      protein: "5.8g",
      carbohydrates: "22.5g",
      fat: "7.8g",
      fiber: "4.1g"
    },
    shelfLife: "20 to 90 Days across respective items",
    storageInstructions: "Store in cool dry place.",
    shippingInfo: "Luxury rigid gift packaging with gold foiled branding.",
    highlights: [
      { title: "7 Signature Snacks", description: "Comprehensive variety of soft, crisp, and roasted Gujarati delicacies." },
      { title: "Festive Gift Box", description: "Beautifully presented for Diwali, weddings, and corporate gifting." }
    ],
    featured: true,
    bestSeller: false,
    rating: 4.9,
    reviewCount: 94,
    reviews: [
      {
        id: "rev-16",
        author: "Dipali Shah",
        location: "Surat",
        rating: 5,
        date: "2026-02-08",
        title: "Magnificent gift hamper!",
        comment: "Sent this to my parents in Mumbai. The packaging was stunning and every single snack was fresh and authentic.",
        verifiedPurchase: true
      }
    ],
    faqs: [
      { question: "Can this be gifted with a personalized message?", answer: "Yes! During checkout, you can add a custom greeting card message for the recipient." }
    ],
    seo: {
      title: "Grand Family Gujarati Snack Box | Gift Hamper | Lajja’s Foods",
      description: "Order the Grand Family Gujarati Snack Box from Lajja’s Foods. Complete luxury hamper with Thepla, Khakhra, Bharuchi Khari Sing, and Roasted Peanuts. Order online.",
      canonicalUrl: "https://lajjasfoods.com/combo-packs/family-combo/",
      keywords: ["gujarati gift hamper", "family snack box", "thepla khakhra gift box", "authentic gujarati food gifts"]
    }
  }
];
