import { BlogArticle } from "@/types/blog";

export const BLOG_ARTICLES: BlogArticle[] = [
  {
    id: "post-what-is-thepla",
    slug: "what-is-thepla-history-varieties-culinary-secrets",
    categorySlug: "thepla",
    categoryName: "Thepla",
    title: "What Is Thepla? The Complete Guide to Gujarat's Iconic Spiced Flatbread",
    excerpt: "Discover the centuries-old history, traditional ingredients, and artisanal kneading techniques behind Gujarat's beloved Thepla, and why it remains India's premier travel food.",
    content: `
## What Is a Traditional Gujarati Thepla?

In the vast spectrum of Indian flatbreads, the **Thepla (થેપલા)** holds an unparalleled status. Unlike everyday rotis or chapatis, a Thepla is not merely bread meant to accompany a curry—it is an independent, nutritionally complete, shelf-stable culinary marvel.

Originating in the vibrant state of Gujarat in Western India, Thepla is traditionally rolled razor-thin and cooked with cold-pressed oil on heavy iron tawas. The infusion of fresh greens (most prominently fenugreek or *methi*), whole spices, cooling yogurt (*dahi*), and warming turmeric creates a multi-layered flavor profile that is simultaneously earthy, mildly spiced, savory, and soothing.

---

## The Historical Origin: The Merchant and Pilgrim's Sustenance

The true genius of the Thepla lies in its extraordinary shelf life. Historically, Gujarati merchants, spice traders, and Jain pilgrims embarked on arduous journeys across arid deserts, high seas, and long trade routes connecting Saurashtra to Africa and Southeast Asia.

Perishable foods would spoil within hours in the searing heat. Gujarati homemakers engineered a dough that integrated natural antimicrobials:
1. **Turmeric (*Haldi*)**: A natural preservative and antiseptic.
2. **Carom Seeds (*Ajwain*)**: Enhances digestive fire (*Agni*) and prevents gastrointestinal discomfort.
3. **Mustard & Groundnut Oil**: Seals moisture within the dough layers while preventing microbial growth.
4. **Yogurt (*Dahi*)**: The mild lactic acid softens gluten chains, keeping the bread tender for days without synthetic chemical emulsifiers.

Thus, the Thepla became the quintessential companion for travelers, earning its reputation as India's premier travel sustenance.

---

## Key Varieties of Gujarati Thepla

While Methi Thepla is the most iconic, traditional Gujarati households prepare a rich repertoire:

### 1. Methi Thepla (Fenugreek Flatbread)
The benchmark standard. Packed with finely chopped, fresh bitter-sweet fenugreek leaves that provide natural iron, dietary fiber, and a distinctive herbal fragrance.

### 2. Masala Thepla
A bolder variation layered with roasted cumin powder, red Kashmiri chili flakes, and ajwain. Highly favored for chilly winter mornings and monsoon picnics.

### 3. Multigrain / Bajra-Jowar Thepla
Common across rural Saurashtra and Kutch, incorporating winter millets like sorghum, pearl millet, and besan (gram flour) for high fiber and sustained energy release.

### 4. Doodhi (Bottle Gourd) Thepla
Grated tender bottle gourd (*lauki*) is kneaded into the flour, resulting in an exceptionally soft flatbread that melts in the mouth.

---

## How Thepla Differs from Paratha

| Feature | Gujarati Thepla | North Indian Paratha |
| :--- | :--- | :--- |
| **Thickness** | Razor-thin and pliable | Thicker, often layered or stuffed |
| **Dough Integration** | Spices and greens kneaded *directly into* dough | Spices often in a separate central filling |
| **Cooking Fat** | Light brushing of cold-pressed oil | Generous ghee or butter shallow-frying |
| **Shelf Life** | Stays soft for 15-20+ days without refrigeration | Best eaten hot within 12-24 hours |
| **Serving Style** | Ready-to-eat at room temperature with chundo/tea | Served hot with curries, dal, or butter |

---

## The Culinary Secret: Stone Grinding and Thermal Moisture Sealing

At **Lajja’s Foods**, we maintain ancestral preparation rituals. We strictly avoid refined flour (maida). Pure whole wheat is stone-ground at low temperatures to preserve germ nutrients. 

When roasted on seasoned iron griddles, the moisture from fresh yogurt and fenugreek is thermally sealed inside the delicate wheat matrix. As soon as the theplas cool, they are multi-layer vacuum sealed, preserving the tawa-fresh aroma without a single drop of artificial chemicals.
    `,
    featuredImage: {
      url: "https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?auto=format&fit=crop&w=1200&q=80",
      alt: "Authentic Gujarati Methi Thepla with fenugreek and spices",
      caption: "Freshly roasted Methi Thepla with spiced tea and mango chundo"
    },
    author: {
      name: "Lajjaben Patel",
      role: "Master Culinary Curator & Co-Founder",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80",
      bio: "Preserving authentic Gujarati recipes and traditional food preservation crafts for over 25 years."
    },
    publishedAt: "2026-01-15",
    updatedAt: "2026-02-18",
    readTimeMinutes: 7,
    tags: ["Thepla", "Gujarati Culture", "Traditional Food", "Travel Snacks", "Authentic Recipes"],
    tableOfContents: [
      { id: "what-is-a-traditional-gujarati-thepla", title: "What Is a Traditional Gujarati Thepla?", level: 2 },
      { id: "the-historical-origin-the-merchant-and-pilgrims-sustenance", title: "The Historical Origin", level: 2 },
      { id: "key-varieties-of-gujarati-thepla", title: "Key Varieties of Gujarati Thepla", level: 2 },
      { id: "how-thepla-differs-from-paratha", title: "How Thepla Differs from Paratha", level: 2 },
      { id: "the-culinary-secret-stone-grinding-and-thermal-moisture-sealing", title: "The Culinary Secret", level: 2 }
    ],
    relatedProductSlugs: ["methi-thepla", "masala-thepla", "multigrain-thepla"],
    relatedArticleSlugs: ["how-to-store-thepla-for-long-flights", "difference-between-thepla-and-paratha"],
    seo: {
      title: "What Is Thepla? Origin, Varieties & Culinary Guide | Lajja’s Foods",
      description: "Learn what makes Gujarati Thepla unique, its history as India's premier travel food, traditional ingredients, and how it differs from paratha.",
      canonicalUrl: "https://lajjasfoods.com/blog/thepla/what-is-thepla-history-varieties-culinary-secrets/",
      keywords: ["what is thepla", "thepla history", "gujarati thepla ingredients", "thepla vs paratha", "methi thepla tradition"]
    }
  },
  {
    id: "post-travel-thepla-preservation",
    slug: "how-to-store-thepla-for-long-flights-and-international-travel",
    categorySlug: "travel-snacks",
    categoryName: "Travel Snacks",
    title: "How to Store Thepla for Long Flights and International Travel: Expert Tips",
    excerpt: "The complete guide to packing and storing theplas for international journeys, study-abroad students, and road trips so they stay soft and fresh for weeks.",
    content: `
## Why Thepla Is the Ultimate International Travel Snack

When boarding a 15-hour flight from India to London, New York, or Toronto, transit meal options are often bland, overly processed, or lacking genuine vegetarian purity. For generations, Indian travelers have relied on **Gujarati Thepla** as the gold standard of travel nourishment.

A properly kneaded and packed Thepla requires no heating, generates zero mess, will not crush like delicate pastries, and retains its soft texture across continents.

---

## 5 Rules for Packing Theplas for Long-Distance Travel

### 1. Knead with Curd and Extra Oil, Avoid Excessive Raw Water
Water accelerates starch retrogradation and bacterial activity. Traditional travel theplas are kneaded primarily with fresh yogurt and a generous touch of cold-pressed oil, which lubricates the gluten strands and acts as a natural moisture barrier.

### 2. Cool Completely Before Sealing
Never package warm theplas directly into foil or plastic pouches. Trapped steam condenses on the container walls into water droplets, leading to mold growth within 48 hours. Let each disc cool flat on a clean cotton cloth before packaging.

### 3. The Power of Multi-Layer Vacuum Sealing
At **Lajja’s Foods**, we utilize 5-layer food-grade barrier vacuum pouches that evacuate all oxygen. Without oxygen and moisture fluctuations, our theplas remain shelf-stable for **20+ days** at room temperature without requiring refrigeration.

### 4. Luggage Packing: Carry-On vs. Checked Baggage
* **In Carry-On**: Keep a pack of 10 in your hand luggage for immediate consumption during layovers or delayed flights.
* **In Checked Baggage**: Place vacuum-sealed packs between soft clothing layers in your suitcase. The sturdy pouch prevents crushing even under heavy bag handling.

### 5. Customs & Airport Regulations
Cooked whole-wheat flatbreads like Thepla are recognized by international airport customs (including US TSA, UK Border Force, and Canadian CBSA) as commercially processed shelf-stable baked goods. Retain the original branded commercial vacuum label for seamless customs clearance.
    `,
    featuredImage: {
      url: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=1200&q=80",
      alt: "Travel packed theplas ready for long distance flights",
      caption: "Vacuum-sealed travel theplas maintain freshness across continents"
    },
    author: {
      name: "Lajjaben Patel",
      role: "Master Culinary Curator & Co-Founder",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80",
      bio: "Preserving authentic Gujarati recipes and traditional food preservation crafts for over 25 years."
    },
    publishedAt: "2026-01-28",
    updatedAt: "2026-02-15",
    readTimeMinutes: 5,
    tags: ["Travel Food", "Thepla Storage", "Flight Snacks", "NRI Food", "Student Abroad"],
    tableOfContents: [
      { id: "why-thepla-is-the-ultimate-international-travel-snack", title: "Why Thepla Is the Ultimate Travel Snack", level: 2 },
      { id: "5-rules-for-packing-theplas-for-long-distance-travel", title: "5 Rules for Packing Theplas", level: 2 }
    ],
    relatedProductSlugs: ["travel-combo", "methi-thepla"],
    relatedArticleSlugs: ["what-is-thepla-history-varieties-culinary-secrets"],
    seo: {
      title: "How to Store Thepla for Flights & Overseas Travel | Lajja’s Foods",
      description: "Learn how to pack and store Gujarati thepla for international flights and travel. Discover shelf-life tips, vacuum packaging, and customs guidance.",
      canonicalUrl: "https://lajjasfoods.com/blog/travel-snacks/how-to-store-thepla-for-long-flights-and-international-travel/",
      keywords: ["how to store thepla for travel", "thepla on international flights", "packing thepla for abroad", "travel food tips"]
    }
  },
  {
    id: "post-what-is-khakhra",
    slug: "what-is-khakhra-art-of-hand-pressing-roasted-crisps",
    categorySlug: "khakhra",
    categoryName: "Khakhra",
    title: "What Is Khakhra? The Art of Slow-Roasted Gujarati Whole Wheat Crisps",
    excerpt: "Explore the artisanal craft of hand-pressed Khakhra, its low-calorie health benefits, and why it is the quintessential guilt-free tea-time snack.",
    content: `
## The Artisanal Heritage of Gujarati Khakhra

Khakhra is the world's original low-calorie, non-fried whole wheat crisp. Born out of the Gujarati Jain ethic of resourcefulness and non-violence (*Ahimsa*), Khakhra is prepared by rolling whole wheat dough into ultra-thin rounds and dry-roasting them patiently on cast-iron griddles using flat wooden presses (*Botiya*).

---

## Why Khakhra Is the Healthiest Indian Snack

1. **100% Roasted, Zero Frying**: Unlike deep-fried snacks (such as potato chips, samosas, or puri), Khakhra absorbs almost zero cooking fat.
2. **Whole Grain Fiber**: Made with fiber-dense whole wheat flour that aids in gentle digestion and smooth bowel movements.
3. **Calorie Controlled**: Two whole khakhras contain only ~120 calories, making it ideal for weight watchers, diabetics, and fitness enthusiasts.
4. **90+ Days Freshness Naturally**: The complete removal of moisture through slow roasting gives khakhra an impressive natural shelf life without chemicals.

---

## How to Enjoy Khakhra: From Traditional to Modern Chaats

* **Traditional Breakfast**: Spread a teaspoon of pure desi cow ghee and sprinkle spicy *methi sambhar* (pickle masala).
* **Office Desk Crunch**: Snap into shards and dip in curd or mint chutney.
* **Khakhra Pizza / Chaat**: Layer with diced onions, tomatoes, cucumber, chaat masala, nylon sev, and a splash of lemon juice for a 2-minute gourmet evening snack.
    `,
    featuredImage: {
      url: "https://images.unsplash.com/photo-1599488615731-7e5c2823ff28?auto=format&fit=crop&w=1200&q=80",
      alt: "Crisp hand pressed Methi Khakhra",
      caption: "Hand-pressed roasted Khakhra served with morning tea"
    },
    author: {
      name: "Lajjaben Patel",
      role: "Master Culinary Curator & Co-Founder",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80",
      bio: "Preserving authentic Gujarati recipes and traditional food preservation crafts for over 25 years."
    },
    publishedAt: "2026-02-04",
    updatedAt: "2026-02-16",
    readTimeMinutes: 4,
    tags: ["Khakhra", "Healthy Snacking", "Roasted Snacks", "Gujarati Traditions"],
    tableOfContents: [
      { id: "the-artisanal-heritage-of-gujarati-khakhra", title: "The Artisanal Heritage of Khakhra", level: 2 },
      { id: "why-khakhra-is-the-healthiest-indian-snack", title: "Why Khakhra Is the Healthiest Indian Snack", level: 2 },
      { id: "how-to-enjoy-khakhra-from-traditional-to-modern-chaats", title: "How to Enjoy Khakhra", level: 2 }
    ],
    relatedProductSlugs: ["methi-khakhra", "masala-khakhra", "plain-khakhra"],
    relatedArticleSlugs: ["what-is-thepla-history-varieties-culinary-secrets"],
    seo: {
      title: "What Is Khakhra? Health Benefits & Artisanal Craft | Lajja’s Foods",
      description: "Discover why Gujarati Khakhra is the ultimate healthy, non-fried roasted tea-time snack. Explore its heritage, nutrition, and serving ideas.",
      canonicalUrl: "https://lajjasfoods.com/blog/khakhra/what-is-khakhra-art-of-hand-pressing-roasted-crisps/",
      keywords: ["what is khakhra", "khakhra health benefits", "roasted gujarati snacks", "how to make khakhra"]
    }
  },
  {
    id: "post-thepla-vs-paratha",
    slug: "difference-between-thepla-and-paratha",
    categorySlug: "recipes-traditions",
    categoryName: "Recipes & Traditions",
    title: "Difference Between Thepla and Paratha: The Complete Culinary Comparison",
    excerpt: "Understand the structural, textural, and ingredient differences between Gujarat's iconic Thepla and North Indian Paratha.",
    content: `
## Thepla vs. Paratha: Two Distinct Indian Flatbread Legacies

While both thepla and paratha are cherished flatbreads across the Indian subcontinent, their dough formulation, cooking techniques, texture, and cultural functions are vastly different.

---

## 1. Dough Formulation
* **Thepla**: Spices (turmeric, ajwain, chili, ginger paste), yogurt, and fresh greens (methi) are kneaded **directly into the flour** from the beginning.
* **Paratha**: The dough is typically plain whole wheat. Flavors are added either via laminating layers with ghee (plain paratha) or through a separate spiced potato, cauliflower, or paneer stuffing in the center (stuffed paratha).

---

## 2. Thickness & Texture
* **Thepla**: Rolled paper-thin (1-2mm) and pliable. Stays tender even when cold.
* **Paratha**: Substantially thicker (3-6mm), crispy on the outside, and flaky or pillowy inside.

---

## 3. Cooking Medium & Longevity
* **Thepla**: Lightly roasted on high heat with a gentle brush of oil, then removed before browning excessively. Stays fresh for 20+ days without chilling.
* **Paratha**: Pan-fried generously with ghee or butter till deep golden and blistered. Must be consumed hot right off the griddle.
    `,
    featuredImage: {
      url: "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=1200&q=80",
      alt: "Comparison between thepla and paratha flatbreads",
      caption: "Thin spiced thepla compared to heavy stuffed paratha"
    },
    author: {
      name: "Lajjaben Patel",
      role: "Master Culinary Curator & Co-Founder",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80",
      bio: "Preserving authentic Gujarati recipes and traditional food preservation crafts for over 25 years."
    },
    publishedAt: "2026-02-08",
    updatedAt: "2026-02-18",
    readTimeMinutes: 5,
    tags: ["Thepla vs Paratha", "Indian Bread", "Gujarati Recipes", "Food Traditions"],
    tableOfContents: [
      { id: "thepla-vs-paratha-two-distinct-indian-flatbread-legacies", title: "Two Distinct Flatbread Legacies", level: 2 },
      { id: "1-dough-formulation", title: "1. Dough Formulation", level: 2 },
      { id: "2-thickness-texture", title: "2. Thickness & Texture", level: 2 },
      { id: "3-cooking-medium-longevity", title: "3. Cooking Medium & Longevity", level: 2 }
    ],
    relatedProductSlugs: ["methi-thepla", "masala-thepla"],
    relatedArticleSlugs: ["what-is-thepla-history-varieties-culinary-secrets"],
    seo: {
      title: "Thepla vs Paratha: Key Differences & Comparison | Lajja’s Foods",
      description: "Understand the key differences between Gujarati Thepla and North Indian Paratha. Dough recipe, shelf life, thickness, and nutritional comparison.",
      canonicalUrl: "https://lajjasfoods.com/blog/recipes-traditions/difference-between-thepla-and-paratha/",
      keywords: ["thepla vs paratha", "difference between thepla and paratha", "is thepla paratha", "gujarati bread vs punjabi paratha"]
    }
  },
  {
    id: "post-food-nutrition-thepla",
    slug: "nutritional-benefits-of-methi-thepla-and-roasted-gujarati-snacks",
    categorySlug: "food-nutrition",
    categoryName: "Food & Nutrition",
    title: "Nutritional Benefits of Methi Thepla and Traditional Roasted Snacks",
    excerpt: "Why traditional Gujarati food wisdom aligns with modern clinical nutrition: high fiber, low GI, blood sugar balance, and gut-friendly spices.",
    content: `
## The Nutritional Genius of Ancestral Gujarati Diet

Ancient Gujarati culinary science is rooted in Ayurveda—the philosophy that food should balance bodily humors (*Doshas*) and nourish sustained vitality (*Ojas*). 

Modern nutritional biochemistry validates these exact food combinations:

---

## 1. Fenugreek (Methi) for Blood Sugar Regulation
Fresh methi leaves contain **galactomannan**, a soluble fiber that slows the rate of sugar absorption into the bloodstream. When combined with whole wheat, it significantly lowers the glycemic index (GI) of the meal, preventing insulin spikes.

---

## 2. Ajwain and Turmeric for Gut Health
Ajwain contains **thymol**, which stimulates the secretion of gastric juices and digestive enzymes, preventing bloating. Turmeric’s **curcumin** provides potent anti-inflammatory protection for the intestinal lining.

---

## 3. High Plant-Based Protein in Roasted Sing & Chana
Sand-roasted peanuts (Khari Sing) and roasted Bengal gram (Chana) provide over **20-25% plant protein by weight** along with heart-healthy monounsaturated fats (MUFA) and zero dietary cholesterol.
    `,
    featuredImage: {
      url: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=1200&q=80",
      alt: "Nutritious methi leaves and whole grains used in Gujarati cooking",
      caption: "Wholesome ingredients supporting sustained vitality and digestion"
    },
    author: {
      name: "Lajjaben Patel",
      role: "Master Culinary Curator & Co-Founder",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80",
      bio: "Preserving authentic Gujarati recipes and traditional food preservation crafts for over 25 years."
    },
    publishedAt: "2026-02-12",
    updatedAt: "2026-02-18",
    readTimeMinutes: 6,
    tags: ["Nutrition", "Fenugreek Benefits", "Healthy Eating", "Ayurvedic Food"],
    tableOfContents: [
      { id: "the-nutritional-genius-of-ancestral-gujarati-diet", title: "Ancestral Gujarati Nutritional Science", level: 2 },
      { id: "1-fenugreek-methi-for-blood-sugar-regulation", title: "1. Fenugreek for Blood Sugar Balance", level: 2 },
      { id: "2-ajwain-and-turmeric-for-gut-health", title: "2. Ajwain & Turmeric for Gut Health", level: 2 },
      { id: "3-high-plant-based-protein-in-roasted-sing-chana", title: "3. Plant Protein in Roasted Snacks", level: 2 }
    ],
    relatedProductSlugs: ["multigrain-thepla", "salted-khari-sing", "masala-chana"],
    relatedArticleSlugs: ["what-is-thepla-history-varieties-culinary-secrets"],
    seo: {
      title: "Nutritional Benefits of Methi Thepla & Roasted Snacks | Lajja’s Foods",
      description: "Discover the evidence-based nutritional benefits of Methi Thepla and roasted Gujarati snacks. High fiber, gut health, and low-glycemic breakfast benefits.",
      canonicalUrl: "https://lajjasfoods.com/blog/food-nutrition/nutritional-benefits-of-methi-thepla-and-roasted-gujarati-snacks/",
      keywords: ["methi thepla nutrition", "is thepla healthy", "thepla calories and protein", "gujarati healthy snacks"]
    }
  },
  {
    id: "post-gujarati-snacks-culture",
    slug: "top-10-traditional-gujarati-snacks-you-must-try",
    categorySlug: "gujarati-snacks",
    categoryName: "Gujarati Snacks",
    title: "Top 10 Traditional Gujarati Snacks You Must Try Once in Your Life",
    excerpt: "A celebration of Gujarat's most beloved savory snacks—from tender Methi Thepla and wafer-thin Khakhra to Bharuchi Khari Sing and spiced Peanuts.",
    content: `
## Why Gujarat Is India's Ultimate Snacking Capital

Nowhere in India is the craft of morning and evening snacking (*Nasto*) elevated to such an art form as in Gujarat. Gujarati snacks achieve an exquisite equilibrium of sweet, savory, salty, and spicy notes (*Khatta Meetha Teekha*).

---

## The Essential Gujarati Snack Repertoire

### 1. Methi Thepla
Soft, spiced, fenugreek-infused whole wheat flatbreads. The universal breakfast across Gujarat.

### 2. Hand-Pressed Roasted Khakhra
Crisp, non-fried whole wheat crackers available in Methi, Masala, and Jeera flavors.

### 3. Bharuchi Salted Khari Sing
Jumbo groundnuts brined and sand-roasted in traditional clay pans for a distinctive smoky saltiness.

### 4. Roasted Masala Chana
Skin-on Bengal gram dry-roasted and dusted with digestive black salt and roasted cumin.

### 5. Hing Jeera Roasted Peanuts
Crunchy golden peanuts tossed in pungent asafoetida and hand-ground cumin.

### 6. Gujarati Mango Chundo
Sun-cooked grated raw mango preserve spiced with red chili and cumin—the ultimate thepla companion.
    `,
    featuredImage: {
      url: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=1200&q=80",
      alt: "Assortment of traditional Gujarati snacks and delicacies",
      caption: "Gujarat's celebrated tea-time snack heritage"
    },
    author: {
      name: "Lajjaben Patel",
      role: "Master Culinary Curator & Co-Founder",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80",
      bio: "Preserving authentic Gujarati recipes and traditional food preservation crafts for over 25 years."
    },
    publishedAt: "2026-02-14",
    updatedAt: "2026-02-18",
    readTimeMinutes: 5,
    tags: ["Gujarati Snacks", "Nasto", "Food Culture", "Snacking Heritage"],
    tableOfContents: [
      { id: "why-gujarat-is-indias-ultimate-snacking-capital", title: "Why Gujarat Is India's Snacking Capital", level: 2 },
      { id: "the-essential-gujarati-snack-repertoire", title: "The Essential Gujarati Snack Repertoire", level: 2 }
    ],
    relatedProductSlugs: ["family-combo", "breakfast-combo", "methi-thepla"],
    relatedArticleSlugs: ["what-is-thepla-history-varieties-culinary-secrets"],
    seo: {
      title: "Top Traditional Gujarati Snacks You Must Try | Lajja’s Foods",
      description: "Explore the most famous and authentic Gujarati snacks. Learn about Methi Thepla, Khakhra, Bharuchi Khari Sing, and roasted delicacies.",
      canonicalUrl: "https://lajjasfoods.com/blog/gujarati-snacks/top-10-traditional-gujarati-snacks-you-must-try/",
      keywords: ["traditional gujarati snacks", "famous gujarati nasto", "thepla and khakhra", "gujarati food culture"]
    }
  }
];

export const BLOG_CATEGORIES = [
  {
    slug: "thepla",
    name: "Thepla",
    description: "Deep dive into thepla history, traditional fenugreek recipes, kneading techniques, and travel preservation.",
    heroImage: "https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?auto=format&fit=crop&w=1200&q=80"
  },
  {
    slug: "gujarati-snacks",
    name: "Gujarati Snacks",
    description: "Explore the vast world of Gujarati tea-time snacks, street delicacies, and authentic nasto culture.",
    heroImage: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=1200&q=80"
  },
  {
    slug: "khakhra",
    name: "Khakhra",
    description: "Artisanal hand-pressed khakhra, roasting techniques, low-calorie benefits, and gourmet toppings.",
    heroImage: "https://images.unsplash.com/photo-1599488615731-7e5c2823ff28?auto=format&fit=crop&w=1200&q=80"
  },
  {
    slug: "food-nutrition",
    name: "Food & Nutrition",
    description: "Evidence-based nutritional breakdowns of traditional Gujarati ingredients like methi, ajwain, and millets.",
    heroImage: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=1200&q=80"
  },
  {
    slug: "recipes-traditions",
    name: "Recipes & Traditions",
    description: "Generational culinary traditions, stone-grinding rituals, festive foods, and regional comparisons.",
    heroImage: "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=1200&q=80"
  },
  {
    slug: "travel-snacks",
    name: "Travel Snacks",
    description: "Expert packing tips, long flight food preservation, customs regulations, and student care packages.",
    heroImage: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=1200&q=80"
  }
];
