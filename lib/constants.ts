export const VERIFICATION_THRESHOLD = {
  minConfirms: 5,
  maxDisputeRatio: 0.2,
} as const;

export const HIGHLIGHTS = [
  {
    title: "Sri Ramalingeshwara Swamy Temple",
    description:
      "An ancient hilltop temple at Keesaragutta with 101 shivalingams, said to be installed by Lord Hanuman. Major draw during Maha Shivaratri.",
    image:
      "https://commons.wikimedia.org/wiki/Special:FilePath/Keesaragutta_temple_view_from_ruins_01.JPG",
    imageAlt: "Keesaragutta temple view from the ruins",
  },
  {
    title: "Vishnukundin-era ruins",
    description:
      "Excavations near the temple uncovered brick structures and Jain Tirthankara idols dating to the 4th–5th century — real archaeological weight.",
    image:
      "https://commons.wikimedia.org/wiki/Special:FilePath/A_Semi_ruined_temple_at_Keesaragutta.JPG",
    imageAlt: "Ruins near Keesaragutta temple",
  },
  {
    title: "Hanuman monument",
    description:
      "A landmark statue in Keesara village, tied to the town's naming and its deep Ramayana-era temple lore.",
    image:
      "https://commons.wikimedia.org/wiki/Special:FilePath/Hanuman_Statue_1.JPG",
    imageAlt: "Hanuman statue monument in Keesara",
  },
  {
    title: "ORR Exit 8 growth corridor",
    description:
      "Keesara sits on Hyderabad's Outer Ring Road, fueling a real estate and infrastructure boom driven by nearby Pocharam IT SEZ.",
    image:
      "https://commons.wikimedia.org/wiki/Special:FilePath/Outer_Ring_Road,Hyderabad.jpg",
    imageAlt: "Hyderabad Outer Ring Road near Keesara",
  },
] as const;

export const HOUSE_AD = {
  tag: "Featured Builder & Layout",
  title: "మీ ఇల్లు మీ ఇష్టం — KVR Landmark-2 @ Keesara",
  description: "HMDA-approved 25.5 Acres gated layout with 320+ plots just 300m from ORR Exit 8. Custom architecture & construction built to your exact taste.",
  href: "/mee-illu-mee-istam",
  bannerImage: "/images/mee-illu-mee-istam/banner-landscape.jpg",
  heroImage: "/images/mee-illu-mee-istam/hero-square.jpg",
  logoImage: "/images/mee-illu-mee-istam/mee-illu-logo.png",
  aerialMapImage: "/images/mee-illu-mee-istam/exit8-aerial-map.jpg",
  hmdaLogo: "/images/mee-illu-mee-istam/hmda-logo.jpg",
  brochurePdf: "/keesara-city-brochure.pdf",
  phone: "+91 90100 28800",
  phoneRaw: "+919010028800",
  whatsapp: "919010028800",
  email: "keesaracity.info@gmail.com",
  projectName: "KVR Landmark-2 at Keesara",
  taglineTelugu: "మీ ఇల్లు మీ ఇష్టం",
  subTaglineTelugu: "ఆ కలను నిజం చేసే నమ్మకమైన భాగస్వామి",
  distanceFromExit8: "300 Meters",
  totalPlots: "320+ Open Plots",
  totalAcres: "25.5 Acres",
  approval: "HUDA / HMDA Approved Layout",
} as const;

export const ORR_PRICE_COMPARISON = [
  { exit: "Exit 6", corridor: "Medchal", priceRange: "₹50,000 – ₹1,00,000", isBestValue: false },
  { exit: "Exit 7", corridor: "Shamirpet", priceRange: "₹50,000 – ₹1,00,000", isBestValue: false },
  { exit: "Exit 9", corridor: "Ghatkesar", priceRange: "₹50,000 – ₹70,000", isBestValue: false },
  { exit: "Exit 8", corridor: "Keesara City (KVR Landmark-2)", priceRange: "₹30,000 – ₹35,000", isBestValue: true },
] as const;

export const CONNECTIVITY_HIGHLIGHTS = [
  { name: "Jubilee Hills School", distance: "2 km", label: "Education" },
  { name: "KLR Industrial Park", distance: "2 km", label: "Industrial" },
  { name: "Ghatkesar ORR", distance: "4 km", label: "Highway" },
  { name: "DRDL Township", distance: "4 km", label: "Township" },
  { name: "MMTS Station", distance: "5 km", label: "Transit" },
  { name: "Genpact & Infosys", distance: "6 km", label: "IT Hub" },
] as const;

export const DESIGN_STYLES = [
  {
    title: "Traditional Architecture",
    tag: "Heritage & Vastu",
    description: "Classic elevation with rich stone accents, decorative pillars, teakwood main doors, and vastu-compliant spacious living areas.",
  },
  {
    title: "Contemporary Living",
    tag: "Modern & Green",
    description: "Expansive glass facades, open-concept floor plans, lush terrace gardens, cantilever balconies, and ample natural sunlight.",
  },
  {
    title: "Minimalist Luxury",
    tag: "Sleek & Smart",
    description: "Clean geometric profiles, subtle ambient lighting, energy-efficient insulation, smart home integration, and premium designer finishes.",
  },
] as const;

export const SITE = {
  name: process.env.NEXT_PUBLIC_SITE_NAME || "keesara.city",
  domain: "keesara.city",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://keesara.city",
  tagline: "Keesara, Telangana — local & unfiltered",
  description:
    "The local journal and business directory built for Keesara.",
  author: "Keesara City Team",
  brand: "Keesara City",
  github: "",
} as const;
