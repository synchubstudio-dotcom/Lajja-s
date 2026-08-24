export const SITE_CONFIG = {
  name: "Lajja’s Foods",
  tagline: "Authentic Gujarati Snacks Made with Tradition",
  description: "Order authentic handcrafted Gujarati Thepla, Khakhra, Bharuchi Khari Sing, and Roasted Peanuts online. Vacuum sealed for long-lasting travel freshness.",
  url: "https://lajjasfoods.com",
  ogImage: "https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?auto=format&fit=crop&w=1200&q=80",
  contact: {
    phone: "+91 98765 43210",
    whatsapp: "+91 98765 43210",
    email: "care@lajjasfoods.com",
    address: {
      street: "Plot 14, Heritage Food Estate, Near Old Padra Road",
      city: "Vadodara",
      state: "Gujarat",
      country: "India",
      pincode: "390020",
    },
    openingHours: "Mon-Sun 08:00 AM - 08:30 PM",
  },
  social: {
    instagram: "https://instagram.com/lajjasfoods",
    facebook: "https://facebook.com/lajjasfoods",
    youtube: "https://youtube.com/@lajjasfoods",
  },
  currency: {
    symbol: "₹",
    code: "INR",
  },
  shipping: {
    freeShippingThreshold: 500,
    standardShippingFee: 60,
    expressShippingFee: 120,
  },
  coupons: [
    {
      code: "GUJARAT10",
      discountType: "percentage" as const,
      value: 10,
      minOrderValue: 399,
      description: "10% OFF on traditional snack orders above ₹399",
    },
    {
      code: "FREESHIP",
      discountType: "fixed" as const,
      value: 60,
      minOrderValue: 499,
      description: "Free Standard Shipping on orders above ₹499",
    },
    {
      code: "FESTIVE100",
      discountType: "fixed" as const,
      value: 100,
      minOrderValue: 899,
      description: "Flat ₹100 OFF on Family & Travel Combos above ₹899",
    },
  ],
};

export const NAV_LINKS = [
  { label: "Home", href: "/" },
  {
    label: "Products",
    href: "/products/all-products/",
    isMega: true,
    categories: [
      {
        name: "Thepla",
        href: "/thepla/",
        slug: "thepla",
        tagline: "Soft, spiced Gujarati flatbreads",
        image: "https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?auto=format&fit=crop&w=400&q=80",
        items: [
          { name: "Methi Thepla", href: "/thepla/methi-thepla/" },
          { name: "Masala Thepla", href: "/thepla/masala-thepla/" },
          { name: "Multigrain Thepla", href: "/thepla/multigrain-thepla/" },
          { name: "Plain Thepla (Jain)", href: "/thepla/plain-thepla/" },
          { name: "Jeera Thepla", href: "/thepla/jeera-thepla/" },
        ],
      },
      {
        name: "Khakhra",
        href: "/khakhra/",
        slug: "khakhra",
        tagline: "Crisp hand-pressed roasted wafers",
        image: "https://images.unsplash.com/photo-1599488615731-7e5c2823ff28?auto=format&fit=crop&w=400&q=80",
        items: [
          { name: "Methi Khakhra", href: "/khakhra/methi-khakhra/" },
          { name: "Masala Khakhra", href: "/khakhra/masala-khakhra/" },
          { name: "Plain Khakhra (Jain)", href: "/khakhra/plain-khakhra/" },
        ],
      },
      {
        name: "Khari Sing Chana",
        href: "/khari-sing-chana/",
        slug: "khari-sing-chana",
        tagline: "Bharuchi salted peanuts & roasted chana",
        image: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=400&q=80",
        items: [
          { name: "Bharuchi Salted Khari Sing", href: "/khari-sing-chana/salted-khari-sing/" },
          { name: "Roasted Masala Chana", href: "/khari-sing-chana/masala-chana/" },
        ],
      },
      {
        name: "Roasted Peanuts",
        href: "/roasted-peanuts/",
        slug: "roasted-peanuts",
        tagline: "Slow-roasted Saurashtra groundnuts",
        image: "https://images.unsplash.com/photo-1567620832903-9fc6debc209f?auto=format&fit=crop&w=400&q=80",
        items: [
          { name: "Hing Jeera Peanuts", href: "/roasted-peanuts/hing-jeera-peanuts/" },
          { name: "Classic Salted Peanuts", href: "/roasted-peanuts/classic-salted-peanuts/" },
        ],
      },
      {
        name: "Combo Packs",
        href: "/combo-packs/",
        slug: "combo-packs",
        tagline: "Curated breakfast & travel snack hampers",
        image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=400&q=80",
        items: [
          { name: "Breakfast Combo", href: "/combo-packs/breakfast-combo/" },
          { name: "Travel Combo (Flight Ready)", href: "/combo-packs/travel-combo/" },
          { name: "Grand Family Snack Box", href: "/combo-packs/family-combo/" },
        ],
      },
    ],
  },
  { label: "About Us", href: "/about-us/" },
  { label: "Locations", href: "/locations/" },
  { label: "Portfolio", href: "/portfolio/" },
  { label: "Blog", href: "/blog/" },
  { label: "FAQ", href: "/faq/" },
  { label: "Contact", href: "/contact-us/" },
];

export const FOOTER_SECTIONS = {
  categories: [
    { label: "Thepla", href: "/thepla/" },
    { label: "Khakhra", href: "/khakhra/" },
    { label: "Khari Sing Chana", href: "/khari-sing-chana/" },
    { label: "Roasted Peanuts", href: "/roasted-peanuts/" },
    { label: "Combo Packs", href: "/combo-packs/" },
    { label: "All Products", href: "/products/all-products/" },
  ],
  locations: [
    { label: "Vadodara (HQ Kitchen)", href: "/locations/vadodara/" },
    { label: "Ahmedabad", href: "/locations/ahmedabad/" },
    { label: "Surat", href: "/locations/surat/" },
    { label: "Rajkot", href: "/locations/rajkot/" },
    { label: "Anand & Vidyanagar", href: "/locations/anand/" },
    { label: "Bharuch & Ankleshwar", href: "/locations/bharuch/" },
  ],
  quickLinks: [
    { label: "About Us", href: "/about-us/" },
    { label: "Portfolio & Craft", href: "/portfolio/" },
    { label: "Preparation Process", href: "/portfolio/preparation/" },
    { label: "Travel Packaging", href: "/portfolio/packaging/" },
    { label: "Food & Heritage Blog", href: "/blog/" },
    { label: "Frequently Asked Questions", href: "/faq/" },
    { label: "Contact Us", href: "/contact-us/" },
  ],
  legal: [
    { label: "Privacy Policy", href: "/privacy-policy/" },
    { label: "Terms & Conditions", href: "/terms-and-conditions/" },
    { label: "Shipping Policy", href: "/shipping-policy/" },
    { label: "Return & Refund Policy", href: "/return-refund-policy/" },
    { label: "Cancellation Policy", href: "/cancellation-policy/" },
  ],
};
