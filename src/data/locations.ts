import { LocationData } from "@/types/location";

export const LOCATIONS: LocationData[] = [
  {
    id: "loc-vadodara",
    slug: "vadodara",
    cityName: "Vadodara",
    gujaratiCityName: "વડોદરા",
    state: "Gujarat",
    isKitchenHub: true,
    heroImage: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=1600&q=80",
    headline: "Freshly Handcrafted Gujarati Snacks in Vadodara — Direct from Our Central Kitchen",
    shortDescription: "Order piping hot handcrafted Methi Thepla, roasted Khakhra, and Bharuchi Khari Sing delivered within hours across Vadodara (Alkapuri, Manjalpur, Karelibaug, Gotri, Vasna).",
    localStory: "Vadodara (Baroda), the cultural capital of Gujarat, holds a revered culinary standard where afternoon tea and morning breakfasts are anchored in traditional thepla and sev usal. As the home of Lajja's Foods central artisanal kitchen, Vadodara residents enjoy same-day direct kitchen-to-door delivery with the highest level of warmth and freshness.",
    servingAreas: [
      "Alkapuri",
      "Akota",
      "Gotri",
      "Vasna-Bhayli Road",
      "Manjalpur",
      "Karelibaug",
      "Fatehgunj",
      "Sayajigunj",
      "Waghodia Road",
      "Sama-Savli Road",
      "Harni",
      "Tarsali"
    ],
    popularSnacks: [
      "methi-thepla",
      "masala-thepla",
      "salted-khari-sing",
      "breakfast-combo",
      "methi-khakhra"
    ],
    deliverySchedule: [
      {
        area: "Alkapuri, Gotri, Akota & Vasna",
        timeline: "Same-Day Delivery (within 3-5 hours)",
        cutoffTime: "Order before 2:00 PM",
        minimumOrder: 250,
        expressAvailable: true
      },
      {
        area: "Manjalpur, Karelibaug, Sama & Harni",
        timeline: "Same-Day Evening / Next-Morning Delivery",
        cutoffTime: "Order before 4:00 PM",
        minimumOrder: 250,
        expressAvailable: true
      },
      {
        area: "Greater Vadodara (Waghodia, Tarsali, Padra Road)",
        timeline: "Next Day Morning Delivery",
        cutoffTime: "Order before 8:00 PM",
        minimumOrder: 300,
        expressAvailable: false
      }
    ],
    localPickupAddress: {
      street: "Plot 14, Heritage Food Estate, Near Old Padra Road",
      neighborhood: "Alkapuri Extension",
      city: "Vadodara",
      pincode: "390020",
      landmark: "Opposite Inorbit Link Road",
      googleMapsLink: "https://maps.google.com/?q=Vadodara+Gujarat",
      operatingHours: "Monday to Sunday: 7:30 AM – 8:30 PM"
    },
    contactPhone: "+91 98765 43210",
    contactEmail: "vadodara@lajjasfoods.com",
    faqs: [
      {
        question: "Can I collect fresh thepla directly from the Vadodara kitchen?",
        answer: "Yes! You can choose 'Direct Kitchen Pickup' at checkout to pick up fresh hot theplas between 8:00 AM and 8:00 PM."
      },
      {
        question: "How fast is home delivery in Vadodara?",
        answer: "We offer express 3-5 hour delivery in Alkapuri, Gotri, Akota, and Vasna for orders placed before 2:00 PM."
      },
      {
        question: "Do you supply thepla packs for passengers taking the train from Vadodara Railway Station?",
        answer: "Yes, we frequently deliver travel-packed thepla boxes directly near Vadodara Junction / Alkapuri side for travelers."
      }
    ],
    seo: {
      title: "Fresh Gujarati Snacks & Thepla in Vadodara | Same Day Delivery | Lajja’s Foods",
      description: "Order fresh Methi Thepla, Khakhra & Bharuchi Sing delivered in Vadodara from Lajja’s Foods central kitchen. Same-day delivery across Alkapuri, Gotri, Manjalpur & more.",
      canonicalUrl: "https://lajjasfoods.com/locations/vadodara/",
      keywords: ["thepla in vadodara", "gujarati snacks vadodara", "buy thepla online vadodara", "khakhra vadodara", "food delivery vadodara"]
    }
  },
  {
    id: "loc-ahmedabad",
    slug: "ahmedabad",
    cityName: "Ahmedabad",
    gujaratiCityName: "અમદાવાદ",
    state: "Gujarat",
    isKitchenHub: false,
    heroImage: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=1600&q=80",
    headline: "Authentic Gujarati Snacks & Travel Thepla Delivered Across Ahmedabad",
    shortDescription: "Freshly roasted Methi Thepla, crisp Khakhra, and travel food combos delivered across Ahmedabad (Satellite, SG Highway, Bodakdev, Vastrapur, Navrangpura, Bopal).",
    localStory: "Ahmedabad is the vibrant commercial heartbeat of Gujarat, home to discerning snack lovers who value authentic preparation, crisp khakhra, and wholesome travel theplas for international flights departing from Sardar Vallabhbhai Patel International Airport.",
    servingAreas: [
      "Satellite",
      "Bodakdev",
      "Vastrapur",
      "Prahlad Nagar",
      "Bopal & South Bopal",
      "Navrangpura",
      "Ambawadi",
      "Sindhu Bhavan Road (SBR)",
      "Chandkheda",
      "Maninagar",
      "Gota",
      "Naranpura"
    ],
    popularSnacks: [
      "travel-combo",
      "methi-thepla",
      "methi-khakhra",
      "masala-khakhra",
      "breakfast-combo"
    ],
    deliverySchedule: [
      {
        area: "West Ahmedabad (Satellite, Bodakdev, SBR, Prahlad Nagar, Vastrapur)",
        timeline: "Express Next-Day Morning Delivery (by 11:00 AM)",
        cutoffTime: "Order before 6:00 PM",
        minimumOrder: 300,
        expressAvailable: true
      },
      {
        area: "East & North Ahmedabad (Maninagar, Chandkheda, Gota, Naranpura)",
        timeline: "Next-Day Delivery (within 24 hours)",
        cutoffTime: "Order before 7:00 PM",
        minimumOrder: 300,
        expressAvailable: false
      }
    ],
    contactPhone: "+91 98765 43210",
    contactEmail: "ahmedabad@lajjasfoods.com",
    faqs: [
      {
        question: "How quickly do you deliver to Ahmedabad?",
        answer: "Orders are prepared fresh in our kitchen and delivered across Ahmedabad within 24 hours via express temperature-controlled logistics."
      },
      {
        question: "Can I order travel theplas for flight departures from Ahmedabad airport?",
        answer: "Yes! We specialize in flight-ready vacuum-sealed travel combo boxes that stay fresh for 20+ days."
      }
    ],
    seo: {
      title: "Gujarati Snacks & Thepla in Ahmedabad | Travel Thepla | Lajja’s Foods",
      description: "Order handcrafted Methi Thepla, Khakhra, and Travel Combo packs delivered in Ahmedabad. Next-day delivery in Satellite, Bodakdev, Prahlad Nagar & Vastrapur.",
      canonicalUrl: "https://lajjasfoods.com/locations/ahmedabad/",
      keywords: ["thepla in ahmedabad", "khakhra in ahmedabad", "gujarati snacks ahmedabad", "travel thepla ahmedabad"]
    }
  },
  {
    id: "loc-surat",
    slug: "surat",
    cityName: "Surat",
    gujaratiCityName: "સુરત",
    state: "Gujarat",
    isKitchenHub: false,
    heroImage: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=1600&q=80",
    headline: "Surat’s Favorite Traditional Gujarati Thepla & Roasted Snacks",
    shortDescription: "Premium handcrafted snacks delivered across Surat (Vesu, Adajan, Piplod, City Light, Pal, Katargam). Pure taste and wholesome quality.",
    localStory: "Suratis are legendary connoisseurs of fine food ('Surat nu Jaman'). Lajja’s Foods satisfies Surat’s refined tastebuds with melt-in-the-mouth soft Methi Theplas, stone-pressed Khakhras, and perfectly roasted spiced groundnuts.",
    servingAreas: [
      "Vesu",
      "Piplod",
      "City Light",
      "Adajan",
      "Pal",
      "Ghod Dod Road",
      "Varachha",
      "Katargam",
      "Athwa Lines",
      "Althan"
    ],
    popularSnacks: [
      "methi-thepla",
      "hing-jeera-peanuts",
      "family-combo",
      "masala-thepla",
      "salted-khari-sing"
    ],
    deliverySchedule: [
      {
        area: "Vesu, Piplod, City Light & Adajan",
        timeline: "Express Next-Day Delivery",
        cutoffTime: "Order before 5:00 PM",
        minimumOrder: 300,
        expressAvailable: true
      },
      {
        area: "Varachha, Katargam & Outer Surat",
        timeline: "1-2 Business Days",
        cutoffTime: "Order before 7:00 PM",
        minimumOrder: 300,
        expressAvailable: false
      }
    ],
    contactPhone: "+91 98765 43210",
    contactEmail: "surat@lajjasfoods.com",
    faqs: [
      {
        question: "Do you deliver to Vesu and Adajan in Surat?",
        answer: "Yes, we provide next-day delivery across all major Surat neighborhoods including Vesu, Adajan, City Light, and Piplod."
      }
    ],
    seo: {
      title: "Gujarati Snacks & Thepla in Surat | Fresh Delivery | Lajja’s Foods",
      description: "Order authentic Gujarati Methi Thepla, Khakhra, and Hing Jeera Peanuts in Surat from Lajja’s Foods. Fast delivery to Vesu, Adajan, Piplod & City Light.",
      canonicalUrl: "https://lajjasfoods.com/locations/surat/",
      keywords: ["gujarati snacks in surat", "thepla in surat", "khakhra surat", "buy thepla online surat"]
    }
  },
  {
    id: "loc-rajkot",
    slug: "rajkot",
    cityName: "Rajkot",
    gujaratiCityName: "રાજકોટ",
    state: "Gujarat",
    isKitchenHub: false,
    heroImage: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=1600&q=80",
    headline: "Saurashtra’s Choice: Authentic Gujarati Thepla & Snacks in Rajkot",
    shortDescription: "Experience authentic Kathiyawadi quality with Lajja’s Foods. Delivering across Rajkot (Kalawad Road, Yagnik Road, Amin Marg, University Road, Nana Mava).",
    localStory: "Rajkot, the cultural capital of Saurashtra, cherishes bold, authentic culinary traditions. Our snacks cater to Saurashtra families who value the hearty richness of roasted peanuts, multigrain theplas, and spiced khakhra.",
    servingAreas: [
      "Kalawad Road",
      "Yagnik Road",
      "Amin Marg",
      "University Road",
      "Nana Mava",
      "150 Feet Ring Road",
      "Kotecha Chowk",
      "Pedak Road",
      "Gondal Road"
    ],
    popularSnacks: [
      "multigrain-thepla",
      "hing-jeera-peanuts",
      "masala-thepla",
      "breakfast-combo"
    ],
    deliverySchedule: [
      {
        area: "Kalawad Road, Amin Marg & University Road",
        timeline: "1-2 Business Days",
        cutoffTime: "Order before 6:00 PM",
        minimumOrder: 300,
        expressAvailable: true
      }
    ],
    contactPhone: "+91 98765 43210",
    contactEmail: "rajkot@lajjasfoods.com",
    faqs: [
      {
        question: "How are the snacks packed for delivery to Rajkot?",
        answer: "All items are packed in heavy-duty vacuum barrier pouches and sturdy corrugated boxes to ensure complete freshness upon arrival in Rajkot."
      }
    ],
    seo: {
      title: "Gujarati Snacks & Thepla in Rajkot | Fast Delivery | Lajja’s Foods",
      description: "Order fresh Thepla, roasted Khakhra, and Saurashtra-style spiced peanuts in Rajkot from Lajja’s Foods. Delivering to Kalawad Road, University Road & Yagnik Road.",
      canonicalUrl: "https://lajjasfoods.com/locations/rajkot/",
      keywords: ["thepla in rajkot", "gujarati snacks rajkot", "buy khakhra rajkot", "kathiyawadi snacks online"]
    }
  },
  {
    id: "loc-anand",
    slug: "anand",
    cityName: "Anand",
    gujaratiCityName: "આણંદ",
    state: "Gujarat",
    isKitchenHub: false,
    heroImage: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=1600&q=80",
    headline: "Pure Milk-City Fresh Gujarati Snacks Delivered in Anand & Vidyanagar",
    shortDescription: "Fresh Methi Thepla and crisp Khakhra delivered swiftly to Anand and Vallabh Vidyanagar. Ideal for university students, NRIs, and local families.",
    localStory: "Located in the lush Charotar heartland and home to Vallabh Vidyanagar's bustling student community and Anand's prominent NRI population, we provide wholesome, preservative-free traditional food that tastes just like home.",
    servingAreas: [
      "Vallabh Vidyanagar",
      "Amul Dairy Road",
      "Borsad Road",
      "Ganesh Meridian Area",
      "Jitodia Road",
      "Karamsad",
      "Bakrol"
    ],
    popularSnacks: [
      "methi-thepla",
      "plain-thepla",
      "travel-combo",
      "salted-khari-sing"
    ],
    deliverySchedule: [
      {
        area: "Anand Town & Vallabh Vidyanagar",
        timeline: "Same-Day / Next-Day Delivery",
        cutoffTime: "Order before 2:00 PM",
        minimumOrder: 250,
        expressAvailable: true
      }
    ],
    contactPhone: "+91 98765 43210",
    contactEmail: "anand@lajjasfoods.com",
    faqs: [
      {
        question: "Do you deliver to student hostels in Vallabh Vidyanagar?",
        answer: "Yes! We frequently deliver healthy breakfast thepla packs and travel combos directly to Vidyanagar hostels and student apartments."
      }
    ],
    seo: {
      title: "Gujarati Snacks & Thepla in Anand & Vidyanagar | Lajja’s Foods",
      description: "Order fresh Methi Thepla and Khakhra in Anand and Vallabh Vidyanagar from Lajja’s Foods. Fast local delivery for families, students, and travelers.",
      canonicalUrl: "https://lajjasfoods.com/locations/anand/",
      keywords: ["thepla in anand", "gujarati snacks vidyanagar", "khakhra anand", "student snacks vidyanagar"]
    }
  },
  {
    id: "loc-bharuch",
    slug: "bharuch",
    cityName: "Bharuch",
    gujaratiCityName: "ભરૂચ",
    state: "Gujarat",
    isKitchenHub: false,
    heroImage: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=1600&q=80",
    headline: "Authentic Bharuch Salted Khari Sing & Fresh Thepla in Bharuch & Ankleshwar",
    shortDescription: "Genuine sand-roasted Bharuchi Khari Sing, roasted Chana, and Methi Thepla delivered in Bharuch, Zadeshwar Road, and Ankleshwar GIDC.",
    localStory: "Bharuch is the historic cradle of sand-roasted Khari Sing along the sacred Narmada. Lajja’s Foods honors this regional legacy with pristine kernel selection, traditional brining, and authentic recipes delivered locally with pride.",
    servingAreas: [
      "Zadeshwar Road",
      "Link Road",
      "GNFC Township",
      "Bholav",
      "Station Road",
      "Ankleshwar GIDC",
      "Valia Road"
    ],
    popularSnacks: [
      "salted-khari-sing",
      "masala-chana",
      "methi-thepla",
      "family-combo"
    ],
    deliverySchedule: [
      {
        area: "Bharuch City & Zadeshwar Road",
        timeline: "Next-Day Delivery",
        cutoffTime: "Order before 4:00 PM",
        minimumOrder: 250,
        expressAvailable: true
      }
    ],
    contactPhone: "+91 98765 43210",
    contactEmail: "bharuch@lajjasfoods.com",
    faqs: [
      {
        question: "Can I order authentic Bharuchi Khari Sing in bulk from Bharuch?",
        answer: "Yes, we provide 1kg family packs and 5kg bulk packaging for festive and family orders across Bharuch and Ankleshwar."
      }
    ],
    seo: {
      title: "Authentic Khari Sing & Thepla in Bharuch | Local Delivery | Lajja’s Foods",
      description: "Order famous Bharuchi Khari Sing, roasted Chana, and fresh Methi Thepla in Bharuch and Ankleshwar from Lajja’s Foods. Fast local delivery.",
      canonicalUrl: "https://lajjasfoods.com/locations/bharuch/",
      keywords: ["khari sing bharuch", "thepla in bharuch", "gujarati snacks bharuch", "roasted peanuts bharuch"]
    }
  }
];
