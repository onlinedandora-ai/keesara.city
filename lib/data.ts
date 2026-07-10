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

export async function getCategories(): Promise<Category[]> {
  if (!hasSupabaseEnv()) return [];
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("categories")
    .select("*")
    .order("sort_order");
  if (error) return [];
  return data ?? [];
}

export async function getBusinesses(options?: {
  categorySlug?: string;
  limit?: number;
  featuredFirst?: boolean;
}): Promise<Business[]> {
  if (!hasSupabaseEnv()) return [];
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
  if (error) return [];
  return (data ?? []) as Business[];
}

export async function getBusinessBySlug(slug: string): Promise<Business | null> {
  if (!hasSupabaseEnv()) return null;
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("businesses")
    .select("*, categories(slug, name)")
    .eq("slug", slug)
    .eq("status", "active")
    .single();
  if (error) return null;
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

export async function getJournalPosts(limit = 10): Promise<JournalPost[]> {
  if (!hasSupabaseEnv()) return [];
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("journal_posts")
    .select("*, profiles(display_name)")
    .not("published_at", "is", null)
    .lte("published_at", new Date().toISOString())
    .order("published_at", { ascending: false })
    .limit(limit);
  if (error) return [];
  return data ?? [];
}

export async function getJournalPostBySlug(
  slug: string,
): Promise<JournalPost | null> {
  if (!hasSupabaseEnv()) return null;
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("journal_posts")
    .select("*, profiles(display_name)")
    .eq("slug", slug)
    .not("published_at", "is", null)
    .lte("published_at", new Date().toISOString())
    .single();
  if (error) return null;
  return data;
}

export async function getSiteStats(): Promise<SiteStats> {
  if (!hasSupabaseEnv()) {
    return { businessCount: 0, residentCount: 0 };
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
    businessCount: businesses.count ?? 0,
    residentCount: residents.count ?? 0,
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
  if (!hasSupabaseEnv() || !query.trim()) {
    return { businesses: [] as Business[], news: [] as NewsPost[] };
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

  return {
    businesses: (businessesResult.data ?? []) as Business[],
    news,
  };
}

export function formatRelativeTime(dateString: string) {
  const date = new Date(dateString);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMins / 60);
  const diffDays = Math.floor(diffHours / 24);

  if (diffMins < 1) return "just now";
  if (diffMins < 60) return `${diffMins}m ago`;
  if (diffHours < 24) return `${diffHours}h ago`;
  if (diffDays === 1) return "yesterday";
  if (diffDays < 7) return `${diffDays}d ago`;
  return date.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export function getInitials(name: string) {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}
