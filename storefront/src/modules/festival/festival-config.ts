export type FestivalId = "diwali" | "holi" | "christmas" | "newyear" | "harvest" | "default"

export interface FestivalCampaign {
  id: FestivalId
  name: string
  greeting: string
  tagline: string
  bannerTitle: string
  bannerSubtitle: string
  code: string
  discountPercent: number
  badgeText: string
  themeColor: string // primary accent
  themeBg: string // background color or gradient
  accentColor: string // gold/warm highlight
  textColor: string
  badgeBg: string
  badgeTextCol: string
  icon: string
  countdownTargetHours: number // hours from current time for dynamic realistic timer
  perks: string[]
}

export const FESTIVAL_CAMPAIGNS: Record<FestivalId, FestivalCampaign> = {
  diwali: {
    id: "diwali",
    name: "Diwali Dhamaka",
    greeting: "🪔 Shubh Deepawali Special",
    tagline: "Celebrate the Festival of Lights with pure farm sweetness & Vedic Ghee",
    bannerTitle: "Diwali Mahotsav • Purity in Every Diya",
    bannerSubtitle: "Flat 20% OFF on Pure A2 Desi Cow Ghee & Festive Gift Hampers",
    code: "DIWALI20",
    discountPercent: 20,
    badgeText: "DIWALI SPECIAL • 20% OFF",
    themeColor: "#934008", // rich terracotta amber
    themeBg: "linear-gradient(135deg, #1f0d04 0%, #451a03 50%, #78350f 100%)",
    accentColor: "#F59E0B", // festive glowing gold
    textColor: "#FEF3C7",
    badgeBg: "#D97706",
    badgeTextCol: "#FFFFFF",
    icon: "🪔",
    countdownTargetHours: 36,
    perks: ["Free Festive Diya with Ghee Jars", "Free Gift Packaging", "Express Delivery"],
  },
  holi: {
    id: "holi",
    name: "Holi Purity Fest",
    greeting: "🌸 Colors of Nature & Wellness",
    tagline: "100% Chemical-free pure oils & raw honey for vibrant health",
    bannerTitle: "Holi Utsav • Organic Wellness Celebration",
    bannerSubtitle: "Flat 15% OFF on Cold-Pressed Oils, Raw Honey & Vedic Sweeteners",
    code: "HOLI15",
    discountPercent: 15,
    badgeText: "HOLI FEST • 15% OFF",
    themeColor: "#9D174D",
    themeBg: "linear-gradient(135deg, #4c0519 0%, #831843 50%, #be185d 100%)",
    accentColor: "#F472B6",
    textColor: "#FCE7F3",
    badgeBg: "#BE185D",
    badgeTextCol: "#FFFFFF",
    icon: "🌸",
    countdownTargetHours: 48,
    perks: ["Organic Herbal Gulal Pack Free", "Wood-Pressed Skin Oils", "Eco Friendly"],
  },
  christmas: {
    id: "christmas",
    name: "Winter Wellness & Christmas",
    greeting: "🎄 Winter Wellness Holiday Fest",
    tagline: "Pure immunity boosters: Raw Wild Forest Honey & Ginger Infused Ghee",
    bannerTitle: "Holiday Harvest & Christmas Specials",
    bannerSubtitle: "Special Winter Savings • Extra 18% OFF on All Immunity Combos",
    code: "WINTER18",
    discountPercent: 18,
    badgeText: "HOLIDAY DEAL • 18% OFF",
    themeColor: "#14532D",
    themeBg: "linear-gradient(135deg, #052e16 0%, #14532d 50%, #15803d 100%)",
    accentColor: "#FACC15",
    textColor: "#DCFCE7",
    badgeBg: "#16A34A",
    badgeTextCol: "#FFFFFF",
    icon: "🎄",
    countdownTargetHours: 54,
    perks: ["Festive Gift Box Included", "Immunity Booster Sample", "Guaranteed Purity"],
  },
  newyear: {
    id: "newyear",
    name: "New Year Purity Resolution",
    greeting: "✨ New Year, Pure Lifestyle 2027",
    tagline: "Switch to 100% natural, unadulterated farm staples for your family",
    bannerTitle: "New Year Health Resolution",
    bannerSubtitle: "Flat ₹250 OFF on orders above ₹1,499 | Code: PURE2027",
    code: "PURE2027",
    discountPercent: 15,
    badgeText: "NEW YEAR • 15% OFF",
    themeColor: "#1E1B4B",
    themeBg: "linear-gradient(135deg, #0f172a 0%, #1e1b4b 50%, #312e81 100%)",
    accentColor: "#38BDF8",
    textColor: "#E0F2FE",
    badgeBg: "#0284C7",
    badgeTextCol: "#FFFFFF",
    icon: "✨",
    countdownTargetHours: 72,
    perks: ["Free Health Diet Guide", "Zero Preservatives", "Pan-India Shipping"],
  },
  harvest: {
    id: "harvest",
    name: "Farm Harvest Festival",
    greeting: "🌾 Baisakhi & Sankranti Mahotsav",
    tagline: "Celebrating the golden harvest of Indian ancestral organic soils",
    bannerTitle: "Fresh Crop Harvest Carnival",
    bannerSubtitle: "Up to 25% OFF on Fresh Season Jaggery, Raw Honey & Mustard Oil",
    code: "HARVEST25",
    discountPercent: 25,
    badgeText: "HARVEST FEST • 25% OFF",
    themeColor: "#78350F",
    themeBg: "linear-gradient(135deg, #271302 0%, #5b2807 50%, #854d0e 100%)",
    accentColor: "#FBBF24",
    textColor: "#FEF9C3",
    badgeBg: "#B45309",
    badgeTextCol: "#FFFFFF",
    icon: "🌾",
    countdownTargetHours: 42,
    perks: ["Direct from Farmers", "Wood-Churned Purity", "Batch Lab Tested"],
  },
  default: {
    id: "default",
    name: "Pure Farm Everyday",
    greeting: "🌿 100% Certified Organic & Vedic Purity",
    tagline: "Time-honored Indian traditions direct from Seth Organic Farm",
    bannerTitle: "Welcome to Seth Organic Farm",
    bannerSubtitle: "Enjoy Flat 10% OFF on your first purchase • Use Code: SETH10",
    code: "SETH10",
    discountPercent: 10,
    badgeText: "ORGANIC SPECIAL • 10% OFF",
    themeColor: "#143625",
    themeBg: "linear-gradient(135deg, #091c13 0%, #143625 50%, #1d4d35 100%)",
    accentColor: "#E6C79C",
    textColor: "#F5EFE6",
    badgeBg: "#7C5338",
    badgeTextCol: "#FFFFFF",
    icon: "🌿",
    countdownTargetHours: 24,
    perks: ["Free Shipping Over ₹999", "Glass Jar Eco Packaging", "Lab Certified"],
  },
}
