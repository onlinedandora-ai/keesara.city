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
  bannerImage: "/images/mee-illu-mee-istam/hero-tagged.jpg",
  heroImage: "/images/mee-illu-mee-istam/hero-tagged.jpg",
  logoImage: "/images/mee-illu-mee-istam/mee-illu-logo.png",
  aerialMapImage: "/images/mee-illu-mee-istam/exit8-aerial-map.jpg",
  masterLayoutImage: "/images/mee-illu-mee-istam/master-layout-plan.jpg",
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
  { name: "GHATKESAR ORR", distance: "4 km", label: "Highway" },
  { name: "JUBILEE HILLS SCHOOL", distance: "2 km", label: "Education" },
  { name: "KLR INDUSTRIAL PARK", distance: "2 km", label: "Industrial" },
  { name: "DRDL TOWNSHIP", distance: "4 km", label: "Township" },
  { name: "MMTS", distance: "5 km", label: "Transit" },
  { name: "GENPACT & INFOSYS", distance: "6 km", label: "IT Hub" },
] as const;

export const DESIGN_STYLES = [
  {
    id: "traditional",
    title: "Traditional Elegance",
    tag: "Artisanal Jali & Sandstone",
    image: "/images/mee-illu-mee-istam/villa-traditional.jpg",
    description: "Two-storey timeless residence with earthy sandstone masonry, decorative jali lattice boundary wall, and warm teak accents.",
  },
  {
    id: "minimalist-pavilion",
    title: "Minimalist Pavilion",
    tag: "Open Green & Timber Slats",
    image: "/images/mee-illu-mee-istam/villa-pavilion.jpg",
    description: "Low-slung single-storey pavilion architecture set amidst open lawn with vertical timber screens and outdoor patio dining.",
  },
  {
    id: "contemporary-luxury",
    title: "Contemporary Luxury",
    tag: "Geometric Frame & Glass",
    image: "/images/mee-illu-mee-istam/villa-02.jpg",
    description: "Striking cubic frame architecture with vertical wood louvers, seamless glass balustrade, and integrated sconce illumination.",
  },
] as const;

export const ALL_VILLA_DESIGNS = [
  {
    id: "1",
    title: "Traditional Elegance Villa",
    tag: "Traditional",
    image: "/images/mee-illu-mee-istam/villa-traditional.jpg",
    description: "Artisanal sandstone facade, traditional jali compound wall, warm wood trims, and grand entrance foyer.",
  },
  {
    id: "2",
    title: "Minimalist Meadow Pavilion",
    tag: "Minimalist",
    image: "/images/mee-illu-mee-istam/villa-pavilion.jpg",
    description: "Single-level expansive living pavilion with covered timber porch, fireplace chimney, and panoramic meadow views.",
  },
  {
    id: "3",
    title: "Geometric Frame Luxury Residence",
    tag: "Geometric Luxury",
    image: "/images/mee-illu-mee-istam/villa-02.jpg",
    description: "Cubic white cantilevered frame, seamless glass balustrade, vertical slat accents, and architectural sconce lighting.",
  },
  {
    id: "4",
    title: "Horizontal Timber Louver Villa",
    tag: "Modern Minimalist",
    image: "/images/mee-illu-mee-istam/villa-01.jpg",
    description: "Sleek horizontal architecture with natural wood vertical louvers, private boundary wall, and wide front landscaping.",
  },
  {
    id: "5",
    title: "Contemporary Stone Accent Villa",
    tag: "Contemporary",
    image: "/images/mee-illu-mee-istam/villa-03.jpg",
    description: "Richly textured stone masonry, spacious upper terrace balcony, and modern horizontal charcoal privacy gate.",
  },
  {
    id: "6",
    title: "Warm Illumination Modern Villa",
    tag: "Architectural Lighting",
    image: "/images/mee-illu-mee-istam/villa-04.jpg",
    description: "Bespoke dusk illumination, warm wood ceiling soffits, expansive corner glass, and designer gate piers.",
  },
  {
    id: "7",
    title: "Night Ambient Louver Residence",
    tag: "Modern Minimalist",
    image: "/images/mee-illu-mee-istam/villa-night-louver.jpg",
    description: "Warm boundary uplighting, wood-clad upper volume, tinted sliding glass doors, and secure louvered gate.",
  },
  {
    id: "8",
    title: "Dusk Stone & Glass Estate",
    tag: "Contemporary Luxury",
    image: "/images/mee-illu-mee-istam/villa-evening-stone.jpg",
    description: "Floor-to-ceiling glass living hall, natural brick facade, ambient sconce lighting, and designer sliding gate.",
  },
  {
    id: "9",
    title: "Twilight Garden Terrace Residence",
    tag: "Luxury Terrace",
    image: "/images/mee-illu-mee-istam/villa-twilight-garden.jpg",
    description: "Multi-level evening illumination with landscaped terrace garden, exposed stone wall, and illuminated driveway piers.",
  },
  {
    id: "10",
    title: "Daylight Minimalist Frame Villa",
    tag: "Modern Minimalist",
    image: "/images/mee-illu-mee-istam/hero-villa-cover.jpg",
    description: "Expansive white geometric box architecture, dark garage portico, and upper floor panoramic balcony with glass balustrade.",
  },
  {
    id: "11",
    title: "Textured Facade Contemporary Duplex",
    tag: "Contemporary",
    image: "/images/mee-illu-mee-istam/villa-05.jpg",
    description: "Sophisticated blend of natural earthy stone tiles, glass balcony railing, and landscaped front verge.",
  },
  {
    id: "12",
    title: "Minimalist Dual-Level Villa",
    tag: "Minimalist",
    image: "/images/mee-illu-mee-istam/villa-06.jpg",
    description: "Double height glass windows, vertical timber privacy screening, and clean cubic volumes.",
  },
  {
    id: "13",
    title: "Grand Estate Villa",
    tag: "Luxury",
    image: "/images/mee-illu-mee-istam/villa-07.jpg",
    description: "Wide double-storey layout with expansive terrace sundeck, large family lounge, and grand driveway gate.",
  },
  {
    id: "14",
    title: "Scandinavian Modern Villa",
    tag: "Contemporary",
    image: "/images/mee-illu-mee-istam/villa-10.jpg",
    description: "Harmonious wood and stone proportions, wide sliding glass doors, and integrated carport entry.",
  },
] as const;




export const SITE = {
  name: process.env.NEXT_PUBLIC_SITE_NAME || "keesara.city",
  domain: "keesara.city",
  url:
    process.env.NEXT_PUBLIC_SITE_URL &&
    !process.env.NEXT_PUBLIC_SITE_URL.includes("localhost")
      ? process.env.NEXT_PUBLIC_SITE_URL
      : "https://keesara.city",
  tagline: "Keesara, Telangana — local & unfiltered",
  description:
    "The local journal and business directory built for Keesara.",
  author: "Keesara City Team",
  brand: "Keesara City",
  github: "",
} as const;
