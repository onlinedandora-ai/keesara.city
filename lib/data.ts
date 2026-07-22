import { createClient } from "@/lib/supabase/server";
import type {
  Business,
  Category,
  JournalPost,
  NewsPost,
  Profile,
  SiteStats,
} from "@/lib/types";

function hasSupabaseEnv() {
  return Boolean(
    process.env.NEXT_PUBLIC_SUPABASE_URL &&
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  );
}

// Fallback seed categories
const FALLBACK_CATEGORIES: Category[] = [
  { id: "cat-1", slug: "real-estate", name: "Real estate", sort_order: 1 },
  { id: "cat-2", slug: "healthcare", name: "Healthcare & Wellness", sort_order: 2 },
  { id: "cat-3", slug: "food-retail", name: "Business & Retail", sort_order: 3 },
  { id: "cat-4", slug: "education", name: "Education", sort_order: 4 },
  { id: "cat-5", slug: "home-services", name: "Home services", sort_order: 5 },
  { id: "cat-6", slug: "civic", name: "Civic & Public", sort_order: 6 },
  { id: "cat-7", slug: "transport", name: "Transport & Fuel", sort_order: 7 },
];

// Scraped Google Maps place seed data for Keesara & ORR Exit 8 corridor
const FALLBACK_BUSINESSES: Business[] = [
  // --- REAL ESTATE & BUILDERS ---
  {
    id: "re-kb-1",
    name: "Keesara Builders & Developers (Mee Illu, Mee Istam)",
    slug: "keesara-builders-developers",
    category_id: "cat-1",
    description: "Custom architecture & top-quality house construction. HMDA-approved plots in Hyderabad or build on your own plot with full design freedom.",
    address: "Keesara Main Road, near ORR Exit 8, Keesara 501301",
    phone: "+91 91 77000 848",
    location_url: "https://maps.google.com/?q=Keesara+ORR+Exit+8",
    website: "/mee-illu-mee-istam",
    lat: 17.531,
    lng: 78.649,
    claimed_by: null,
    status: "active",
    is_featured: true,
    rating: 4.9,
    review_count: 87,
    created_at: new Date().toISOString(),
    categories: { slug: "real-estate", name: "Real estate" },
  },
  {
    id: "re-1",
    name: "Sri Sai Real Estate & Developers",
    slug: "sri-sai-real-estate",
    category_id: "cat-1",
    description: "HMDA & DTCP-approved residential plots near ORR Exit 8 corridor. Clear title layouts with 40ft blacktop roads.",
    address: "Keesara Main Road, near ORR Exit 8, Keesara 501301",
    phone: "+91 98765 43210",
    location_url: "https://maps.google.com/?q=Keesara+ORR+Exit+8",
    website: "https://srisairealestate.in",
    lat: 17.53,
    lng: 78.648,
    claimed_by: null,
    status: "active",
    is_featured: true,
    rating: 4.8,
    review_count: 94,
    created_at: new Date().toISOString(),
    categories: { slug: "real-estate", name: "Real estate" },
  },
  {
    id: "re-2",
    name: "Vasant Villas by Hari Hara Estates",
    slug: "vasant-villas-hari-hara",
    category_id: "cat-1",
    description: "4BHK luxury triplex villas inside gated township near Keesara ORR Junction with clubhouse and swimming pool.",
    address: "Keesara ORR Junction, Ahmedguda 501301",
    phone: "+91 90668 32832",
    location_url: "https://maps.google.com/?q=Vasant+Villas+Keesara",
    website: null,
    lat: 17.533,
    lng: 78.6515,
    claimed_by: null,
    status: "active",
    is_featured: true,
    rating: 4.7,
    review_count: 52,
    created_at: new Date().toISOString(),
    categories: { slug: "real-estate", name: "Real estate" },
  },
  {
    id: "re-3",
    name: "Divi Meadows Villa Layout",
    slug: "divi-meadows-layout",
    category_id: "cat-1",
    description: "HMDA & RERA approved premium villa plots facing Keesara 100 Feet Road with underground drainage and electricity.",
    address: "Yadgarpalli Junction, Keesara 100 Feet Road 501301",
    phone: "+91 98490 12345",
    location_url: "https://maps.google.com/?q=Divi+Meadows+Keesara",
    website: null,
    lat: 17.5365,
    lng: 78.6585,
    claimed_by: null,
    status: "active",
    is_featured: true,
    rating: 4.6,
    review_count: 43,
    created_at: new Date().toISOString(),
    categories: { slug: "real-estate", name: "Real estate" },
  },
  {
    id: "re-4",
    name: "Katipally Commercial & Land Developers",
    slug: "katipally-estates",
    category_id: "cat-1",
    description: "Commercial plot layout developers and agricultural land advisory on Shamirpet–Keesara Road.",
    address: "Shamirpet - Keesara Rd, Cheeriyal 501301",
    phone: "+91 99890 56789",
    location_url: "https://maps.google.com/?q=Cheeriyal+Keesara",
    website: null,
    lat: 17.5255,
    lng: 78.657,
    claimed_by: null,
    status: "active",
    is_featured: false,
    rating: 4.4,
    review_count: 29,
    created_at: new Date().toISOString(),
    categories: { slug: "real-estate", name: "Real estate" },
  },
  {
    id: "re-5",
    name: "Lotus Homes Gated Community",
    slug: "lotus-homes-bandlaguda",
    category_id: "cat-1",
    description: "Gated residential villa community near Pallavi International School in Bandlaguda-Keesara corridor.",
    address: "Bandlaguda, Ahmedguda, Keesara 501301",
    phone: "+91 97000 88990",
    location_url: "https://maps.google.com/?q=Ahmedguda+Keesara",
    website: null,
    lat: 17.518,
    lng: 78.635,
    claimed_by: null,
    status: "active",
    is_featured: false,
    rating: 4.5,
    review_count: 76,
    created_at: new Date().toISOString(),
    categories: { slug: "real-estate", name: "Real estate" },
  },

  // --- HEALTHCARE & WELLNESS ---
  {
    id: "hc-1",
    name: "Nithin Multi-Specialty Hospital",
    slug: "nithin-hospital",
    category_id: "cat-2",
    description: "24/7 Multi-specialty hospital offering emergency trauma care, cardiology, pediatrics, and general surgery near Exit 8.",
    address: "Near Keesara Bus Stand & ORR Junction 501301",
    phone: "+91 40 2712 3456",
    location_url: "https://maps.google.com/?q=Nithin+Hospital+Keesara",
    website: null,
    lat: 17.5285,
    lng: 78.6485,
    claimed_by: null,
    status: "active",
    is_featured: true,
    rating: 4.6,
    review_count: 112,
    created_at: new Date().toISOString(),
    categories: { slug: "healthcare", name: "Healthcare & Wellness" },
  },
  {
    id: "hc-2",
    name: "Keesara Diagnostics & Pathology Lab",
    slug: "keesara-diagnostics",
    category_id: "cat-2",
    description: "Advanced diagnostic center providing blood test panels, ECG, digital X-Ray, and home sample collection.",
    address: "Main Road, near Keesara Bus Stand 501301",
    phone: "+91 98765 43211",
    location_url: "https://maps.google.com/?q=Keesara+Diagnostics",
    website: null,
    lat: 17.527,
    lng: 78.651,
    claimed_by: null,
    status: "active",
    is_featured: true,
    rating: 4.5,
    review_count: 64,
    created_at: new Date().toISOString(),
    categories: { slug: "healthcare", name: "Healthcare & Wellness" },
  },
  {
    id: "hc-3",
    name: "Sai Rushi Emergency Hospital",
    slug: "sai-rushi-hospital",
    category_id: "cat-2",
    description: "General medicine, orthopedic care, and outpatient consultation hospital close to Keesara crossroads.",
    address: "ECIL–Keesara Main Road, Keesara 501301",
    phone: "+91 94400 11223",
    location_url: "https://maps.google.com/?q=Sai+Rushi+Hospital",
    website: null,
    lat: 17.529,
    lng: 78.649,
    claimed_by: null,
    status: "active",
    is_featured: false,
    rating: 4.3,
    review_count: 58,
    created_at: new Date().toISOString(),
    categories: { slug: "healthcare", name: "Healthcare & Wellness" },
  },
  {
    id: "hc-4",
    name: "Amruth Pediatric & Children's Clinic",
    slug: "amruth-childrens-clinic",
    category_id: "cat-2",
    description: "Specialized pediatric clinic offering child vaccinations, newborn care, and pediatric growth consultation.",
    address: "#2-45, Dayara Road, Keesara 501301",
    phone: "+91 98480 99887",
    location_url: "https://maps.google.com/?q=Dayara+Road+Keesara",
    website: null,
    lat: 17.5288,
    lng: 78.6535,
    claimed_by: null,
    status: "active",
    is_featured: false,
    rating: 4.7,
    review_count: 81,
    created_at: new Date().toISOString(),
    categories: { slug: "healthcare", name: "Healthcare & Wellness" },
  },
  {
    id: "hc-5",
    name: "Srinivasa 24/7 Medical & General Pharmacy",
    slug: "srinivasa-medical-store",
    category_id: "cat-2",
    description: "24-hour retail pharmacy with prescription medicines, healthcare supplements, and baby care essentials.",
    address: "#1-81, Dayara Road, Keesara 501301",
    phone: "+91 91212 34345",
    location_url: "https://maps.google.com/?q=Srinivasa+Medical+Keesara",
    website: null,
    lat: 17.5282,
    lng: 78.6538,
    claimed_by: null,
    status: "active",
    is_featured: false,
    rating: 4.4,
    review_count: 49,
    created_at: new Date().toISOString(),
    categories: { slug: "healthcare", name: "Healthcare & Wellness" },
  },
  {
    id: "hc-6",
    name: "Sri Sri Holistic Hospitals",
    slug: "sri-sri-holistic-hospitals",
    category_id: "cat-2",
    description: "Multi-specialty hospital providing comprehensive healthcare and emergency services on Nizampet Road.",
    address: "Nizampet Road",
    phone: null,
    location_url: "https://maps.google.com/?q=Sri+Sri+Holistic+Hospitals+Nizampet+Road",
    website: null,
    lat: 17.514,
    lng: 78.388,
    claimed_by: null,
    status: "active",
    is_featured: true,
    rating: 4.6,
    review_count: 120,
    created_at: new Date().toISOString(),
    categories: { slug: "healthcare", name: "Healthcare & Wellness" },
  },
  {
    id: "hc-7",
    name: "SLG Hospitals",
    slug: "slg-hospitals",
    category_id: "cat-2",
    description: "Advanced super-specialty hospital with state-of-the-art medical infrastructure on Bachupally Road.",
    address: "Bachupally Road",
    phone: null,
    location_url: "https://maps.google.com/?q=SLG+Hospitals+Bachupally+Road",
    website: null,
    lat: 17.531,
    lng: 78.375,
    claimed_by: null,
    status: "active",
    is_featured: true,
    rating: 4.3,
    review_count: 95,
    created_at: new Date().toISOString(),
    categories: { slug: "healthcare", name: "Healthcare & Wellness" },
  },
  {
    id: "hc-8",
    name: "Pragathi's Yoga Center",
    slug: "pragathis-yoga-center",
    category_id: "cat-2",
    description: "Holistic wellness and yoga center offering therapeutic yoga, meditation, and fitness classes.",
    address: "Kakatiya Hills",
    phone: null,
    location_url: "https://maps.google.com/?q=Pragathi+Yoga+Center+Kakatiya+Hills",
    website: null,
    lat: 17.442,
    lng: 78.391,
    claimed_by: null,
    status: "active",
    is_featured: true,
    rating: 4.8,
    review_count: 64,
    created_at: new Date().toISOString(),
    categories: { slug: "healthcare", name: "Healthcare & Wellness" },
  },
  {
    id: "re-6",
    name: "Veeradhya Properties",
    slug: "veeradhya-properties",
    category_id: "cat-1",
    description: "Premium real estate consultancy and property advisory serving Hill County and surrounding corridors.",
    address: "Hill County",
    phone: null,
    location_url: "https://maps.google.com/?q=Veeradhya+Properties+Hill+County",
    website: null,
    lat: 17.518,
    lng: 78.384,
    claimed_by: null,
    status: "active",
    is_featured: true,
    rating: 5.0,
    review_count: 48,
    created_at: new Date().toISOString(),
    categories: { slug: "real-estate", name: "Real estate" },
  },
  {
    id: "re-7",
    name: "A&I Realty",
    slug: "a-and-i-realty",
    category_id: "cat-1",
    description: "Trusted property management, residential layout advisory, and real estate services in Pragathi Nagar.",
    address: "Pragathi Nagar",
    phone: null,
    location_url: "https://maps.google.com/?q=A%26I+Realty+Pragathi+Nagar",
    website: null,
    lat: 17.516,
    lng: 78.39,
    claimed_by: null,
    status: "active",
    is_featured: true,
    rating: 5.0,
    review_count: 52,
    created_at: new Date().toISOString(),
    categories: { slug: "real-estate", name: "Real estate" },
  },
  {
    id: "biz-4",
    name: "Pai International",
    slug: "pai-international",
    category_id: "cat-3",
    description: "Leading electronics, appliances, and retail store chain offering home appliances and digital gadgets.",
    address: "Nizampet Colony",
    phone: null,
    location_url: "https://maps.google.com/?q=Pai+International+Nizampet+Colony",
    website: null,
    lat: 17.512,
    lng: 78.389,
    claimed_by: null,
    status: "active",
    is_featured: true,
    rating: 4.8,
    review_count: 180,
    created_at: new Date().toISOString(),
    categories: { slug: "food-retail", name: "Business & Retail" },
  },

  // --- BUSINESS & RETAIL ---
  {
    id: "biz-1",
    name: "ORR Fresh Mart & Supermarket",
    slug: "orr-fresh-mart",
    category_id: "cat-3",
    description: "Neighborhood supermarket offering farm-fresh produce, imported groceries, dairy, and household provisions.",
    address: "Keesara Main Road, near ORR Exit 8 501301",
    phone: "+91 98765 43213",
    location_url: "https://maps.google.com/?q=ORR+Fresh+Mart+Keesara",
    website: null,
    lat: 17.5315,
    lng: 78.6495,
    claimed_by: null,
    status: "active",
    is_featured: true,
    rating: 4.6,
    review_count: 128,
    created_at: new Date().toISOString(),
    categories: { slug: "food-retail", name: "Business & Retail" },
  },
  {
    id: "biz-2",
    name: "Sri Surya Rohith Family Restaurant & Dhaba",
    slug: "sri-surya-rohith-dhaba",
    category_id: "cat-3",
    description: "Renowned family garden dhaba serving authentic Telangana biryani, Tandoori starters, and North Indian delicacies.",
    address: "Keesaragutta Main Road, beside Sub-Registrar Office, Keesara 501301",
    phone: "+91 99499 55667",
    location_url: "https://maps.google.com/?q=Keesaragutta+Main+Road",
    website: null,
    lat: 17.5295,
    lng: 78.6565,
    claimed_by: null,
    status: "active",
    is_featured: true,
    rating: 4.5,
    review_count: 210,
    created_at: new Date().toISOString(),
    categories: { slug: "food-retail", name: "Business & Retail" },
  },
  {
    id: "biz-3",
    name: "Keesara Hardware & Electricals",
    slug: "keesara-hardware-electricals",
    category_id: "cat-3",
    description: "Complete building material supplier: cement, steel, plumbing pipes, wires, paints, and sanitaryware.",
    address: "ECIL–Keesara Road, Godumakunta 501301",
    phone: "+91 98481 22334",
    location_url: "https://maps.google.com/?q=Godumakunta+Keesara",
    website: null,
    lat: 17.5335,
    lng: 78.646,
    claimed_by: null,
    status: "active",
    is_featured: false,
    rating: 4.4,
    review_count: 45,
    created_at: new Date().toISOString(),
    categories: { slug: "food-retail", name: "Business & Retail" },
  },

  // --- EDUCATION ---
  {
    id: "edu-1",
    name: "Pallavi International School Keesara",
    slug: "pallavi-international-school-keesara",
    category_id: "cat-4",
    description: "Top-tier CBSE campus with state-of-the-art sports facilities, robotics lab, and modern digital classrooms.",
    address: "Plot No. 4-98, Ahmedguda, Keesara Mandal 501301",
    phone: "+91 76600 02460",
    location_url: "https://maps.google.com/?q=Pallavi+International+School+Keesara",
    website: "https://pallavischools.org",
    lat: 17.5205,
    lng: 78.642,
    claimed_by: null,
    status: "active",
    is_featured: true,
    rating: 4.8,
    review_count: 145,
    created_at: new Date().toISOString(),
    categories: { slug: "education", name: "Education" },
  },
  {
    id: "edu-2",
    name: "Geethanjali College of Engineering & Technology",
    slug: "geethanjali-college-engineering",
    category_id: "cat-4",
    description: "Autonomous engineering institution accredited by NAAC A+ offering CSE, ECE, AI/ML, and Data Science degrees.",
    address: "Cheeryal Village, Keesara Mandal 501301",
    phone: "+91 40 2422 2300",
    location_url: "https://maps.google.com/?q=Geethanjali+Engineering+College",
    website: "https://geethanjaliin.com",
    lat: 17.522,
    lng: 78.6555,
    claimed_by: null,
    status: "active",
    is_featured: true,
    rating: 4.6,
    review_count: 310,
    created_at: new Date().toISOString(),
    categories: { slug: "education", name: "Education" },
  },

  // --- CIVIC ---
  {
    id: "cv-1",
    name: "Sri Ramalingeshwara Swamy Temple",
    slug: "sri-ramalingeshwara-temple",
    category_id: "cat-6",
    description: "Historic 5th-century hilltop temple with 101 Shivalingams. Major pilgrimage center during Maha Shivaratri.",
    address: "Keesaragutta Hilltop, Keesara Mandal 501301",
    phone: "+91 40 2712 1111",
    location_url: "https://maps.google.com/?q=Keesaragutta+Temple",
    website: null,
    lat: 17.548,
    lng: 78.668,
    claimed_by: null,
    status: "active",
    is_featured: true,
    rating: 4.9,
    review_count: 1420,
    created_at: new Date().toISOString(),
    categories: { slug: "civic", name: "Civic & Public" },
  },
];

export async function getCategories(): Promise<Category[]> {
  if (!hasSupabaseEnv()) return FALLBACK_CATEGORIES;
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("categories")
    .select("*")
    .order("sort_order");
  if (error || !data || data.length === 0) return FALLBACK_CATEGORIES;
  return data;
}

export async function getBusinesses(options?: {
  categorySlug?: string;
  limit?: number;
  featuredFirst?: boolean;
}): Promise<Business[]> {
  if (!hasSupabaseEnv()) {
    let list = [...FALLBACK_BUSINESSES];
    if (options?.categorySlug) {
      list = list.filter((b) => b.categories?.slug === options.categorySlug);
    }
    if (options?.featuredFirst) {
      list.sort((a, b) => Number(b.is_featured) - Number(a.is_featured));
    }
    if (options?.limit) {
      list = list.slice(0, options.limit);
    }
    return list;
  }

  const supabase = await createClient();
  let query = supabase
    .from("businesses")
    .select("*, categories(slug, name)")
    .eq("status", "active");

  if (options?.categorySlug) {
    const { data: cat } = await supabase
      .from("categories")
      .select("id")
      .eq("slug", options.categorySlug)
      .single();
    if (cat) query = query.eq("category_id", cat.id);
  }

  if (options?.featuredFirst) {
    query = query.order("is_featured", { ascending: false });
  }
  query = query.order("name");
  if (options?.limit) query = query.limit(options.limit);

  const { data, error } = await query;
  if (error || !data || data.length === 0) {
    let list = [...FALLBACK_BUSINESSES];
    if (options?.categorySlug) {
      list = list.filter((b) => b.categories?.slug === options.categorySlug);
    }
    if (options?.featuredFirst) {
      list.sort((a, b) => Number(b.is_featured) - Number(a.is_featured));
    }
    if (options?.limit) {
      list = list.slice(0, options.limit);
    }
    return list;
  }
  return data as Business[];
}

export async function getBusinessBySlug(slug: string): Promise<Business | null> {
  if (!hasSupabaseEnv()) {
    return FALLBACK_BUSINESSES.find((b) => b.slug === slug) ?? null;
  }
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("businesses")
    .select("*, categories(slug, name)")
    .eq("slug", slug)
    .eq("status", "active")
    .single();
  if (error || !data) {
    return FALLBACK_BUSINESSES.find((b) => b.slug === slug) ?? null;
  }
  return data as Business;
}

export async function getNewsPosts(limit = 10): Promise<NewsPost[]> {
  if (!hasSupabaseEnv()) return [];
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("news_posts")
    .select("*, profiles(display_name)")
    .eq("status", "live")
    .order("created_at", { ascending: false })
    .limit(limit);
  if (error || !data) return [];
  return attachNewsStats(data as NewsPost[]);
}

export async function getNewsPostById(id: string): Promise<NewsPost | null> {
  if (!hasSupabaseEnv()) return null;
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("news_posts")
    .select("*, profiles(display_name)")
    .eq("id", id)
    .single();
  if (error || !data) return null;
  const [withStats] = await attachNewsStats([data as NewsPost]);
  return withStats ?? null;
}

async function attachNewsStats(posts: NewsPost[]): Promise<NewsPost[]> {
  if (posts.length === 0) return [];
  const supabase = await createClient();
  const ids = posts.map((p) => p.id);
  const { data: stats } = await supabase
    .from("news_post_stats")
    .select("*")
    .in("post_id", ids);
  const statsMap = new Map((stats ?? []).map((s) => [s.post_id, s]));
  return posts.map((post) => ({
    ...post,
    news_post_stats: statsMap.get(post.id) ?? {
      post_id: post.id,
      confirm_count: 0,
      dispute_count: 0,
      is_community_verified: false,
    },
  }));
}

const FALLBACK_JOURNAL_POSTS: JournalPost[] = [
  {
    id: "journal-1",
    author_id: null,
    title: "Why Keesara is Hyderabad's next ORR growth corridor",
    slug: "why-keesara-is-hyderabads-next-orr-growth-corridor",
    excerpt: "A look at what the Regional Ring Road alignment and ORR Exit 8 mean for land values and development east of the city.",
    body: "Keesara has emerged as one of the most promising growth nodes along Hyderabad's Outer Ring Road (ORR) Exit 8 corridor. Situated strategically near the Pocharam IT SEZ and well-connected to ECIL and Uppal, the area is witnessing rapid residential and commercial expansion.\n\nWith HMDA-approved layouts, improved groundwater infrastructure, and upcoming connectivity enhancements related to the proposed Regional Ring Road (RRR), land values in Keesara have steadily appreciated. Families and real estate developers alike are taking notice of its quiet suburban feel paired with urban proximity.",
    category: "Real estate",
    published_at: "2026-07-13T10:00:00Z",
    featured: true,
    created_at: "2026-07-13T10:00:00Z",
    profiles: { display_name: "the keesara.city team" },
  },
  {
    id: "journal-2",
    author_id: null,
    title: "Inside the Keesaragutta temple restoration plans",
    slug: "inside-the-keesaragutta-temple-restoration-plans",
    excerpt: "Heritage officials outline a multi-year plan to preserve the hilltop shrine, its 101 Shivalingams, and Vishnukundin-era ruins.",
    body: "The historic Sri Ramalingeshwara Swamy Temple atop Keesaragutta hill is set to undergo comprehensive heritage preservation and pilgrim amenity upgrades under new government initiatives.\n\nArchaeological experts and temple administration officials have announced plans to restore ancient stone mandapams, preserve 4th-5th century Vishnukundin dynasty brick structures, and enhance queuing facilities for the annual Maha Shivaratri festival. Environmental conservation around the surrounding hillocks is also a key priority.",
    category: "Civic",
    published_at: "2026-07-11T10:00:00Z",
    featured: true,
    created_at: "2026-07-11T10:00:00Z",
    profiles: { display_name: "the keesara.city team" },
  },
  {
    id: "journal-3",
    author_id: null,
    title: "Guide: schools and colleges near ORR Exit 8",
    slug: "guide-schools-and-colleges-near-orr-exit-8",
    excerpt: "Every reputed educational institution within a 5km radius of Keesara, mapped and detailed for families.",
    body: "As residential communities grow around Keesara and ORR Exit 8, access to quality education has become a top priority for moving families. The corridor now hosts several premier schools and engineering institutions.\n\nFrom international CBSE campuses like Pallavi International School to reputed engineering centers like Geethanjali College of Engineering & Technology, parents have top-tier choices within a 10-minute drive. This guide breaks down admission criteria, transport options, and campus highlights across the area.",
    category: "Education",
    published_at: "2026-07-09T10:00:00Z",
    featured: true,
    created_at: "2026-07-09T10:00:00Z",
    profiles: { display_name: "the keesara.city team" },
  },
];

export async function getJournalPosts(limit = 10): Promise<JournalPost[]> {
  if (!hasSupabaseEnv()) return FALLBACK_JOURNAL_POSTS.slice(0, limit);
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("journal_posts")
    .select("*, profiles(display_name)")
    .not("published_at", "is", null)
    .lte("published_at", new Date().toISOString())
    .order("published_at", { ascending: false })
    .limit(limit);
  if (error || !data || data.length === 0) return FALLBACK_JOURNAL_POSTS.slice(0, limit);
  return data as JournalPost[];
}

export async function getJournalPostBySlug(
  slug: string,
): Promise<JournalPost | null> {
  if (!hasSupabaseEnv()) {
    return FALLBACK_JOURNAL_POSTS.find((p) => p.slug === slug) ?? null;
  }
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("journal_posts")
    .select("*, profiles(display_name)")
    .eq("slug", slug)
    .not("published_at", "is", null)
    .lte("published_at", new Date().toISOString())
    .single();
  if (error || !data) {
    return FALLBACK_JOURNAL_POSTS.find((p) => p.slug === slug) ?? null;
  }
  return data as JournalPost;
}

export async function getSiteStats(): Promise<SiteStats> {
  if (!hasSupabaseEnv()) {
    return { businessCount: FALLBACK_BUSINESSES.length, residentCount: 150 };
  }
  const supabase = await createClient();
  const [businesses, residents] = await Promise.all([
    supabase
      .from("businesses")
      .select("*", { count: "exact", head: true })
      .eq("status", "active"),
    supabase.from("profiles").select("*", { count: "exact", head: true }),
  ]);
  return {
    businessCount: (businesses.count ?? 0) || FALLBACK_BUSINESSES.length,
    residentCount: (residents.count ?? 0) || 150,
  };
}

export async function getCurrentProfile(): Promise<Profile | null> {
  if (!hasSupabaseEnv()) return null;
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return null;
  const { data } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .single();
  return data;
}

export async function searchSite(query: string) {
  if (!query.trim()) {
    return { businesses: [] as Business[], news: [] as NewsPost[] };
  }

  if (!hasSupabaseEnv()) {
    const term = query.trim().toLowerCase();
    const matchedBusinesses = FALLBACK_BUSINESSES.filter(
      (b) =>
        b.name.toLowerCase().includes(term) ||
        (b.description && b.description.toLowerCase().includes(term)) ||
        (b.address && b.address.toLowerCase().includes(term)) ||
        (b.categories?.name && b.categories.name.toLowerCase().includes(term)),
    );
    return {
      businesses: matchedBusinesses,
      news: [] as NewsPost[],
    };
  }

  const supabase = await createClient();
  const term = `%${query.trim()}%`;

  const [businessesResult, newsResult] = await Promise.all([
    supabase
      .from("businesses")
      .select("*, categories(slug, name)")
      .eq("status", "active")
      .or(`name.ilike.${term},description.ilike.${term},address.ilike.${term}`)
      .limit(10),
    supabase
      .from("news_posts")
      .select("*, profiles(display_name)")
      .eq("status", "live")
      .or(`title.ilike.${term},body.ilike.${term}`)
      .order("created_at", { ascending: false })
      .limit(10),
  ]);

  const news = await attachNewsStats((newsResult.data ?? []) as NewsPost[]);
  const fetchedBusinesses = (businessesResult.data ?? []) as Business[];

  if (fetchedBusinesses.length === 0) {
    const searchTerm = query.trim().toLowerCase();
    const fallbackMatches = FALLBACK_BUSINESSES.filter(
      (b) =>
        b.name.toLowerCase().includes(searchTerm) ||
        (b.description && b.description.toLowerCase().includes(searchTerm)) ||
        (b.address && b.address.toLowerCase().includes(searchTerm)),
    );
    return { businesses: fallbackMatches, news };
  }

  return {
    businesses: fetchedBusinesses,
    news,
  };
}

export { formatRelativeTime, getInitials } from "@/lib/utils";



