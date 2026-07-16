export type UserRole = "resident" | "team_editor" | "business_owner" | "admin";

export type Profile = {
  id: string;
  display_name: string;
  phone: string | null;
  role: UserRole;
  created_at: string;
};

export type Category = {
  id: string;
  slug: string;
  name: string;
  sort_order: number;
};

export type Business = {
  id: string;
  name: string;
  slug: string;
  category_id: string;
  description: string | null;
  address: string | null;
  phone: string | null;
  location_url: string | null;
  website: string | null;
  lat: number | null;
  lng: number | null;
  claimed_by: string | null;
  status: "active" | "pending" | "removed";
  is_featured: boolean;
  rating: number | null;
  review_count: number | null;
  created_at: string;
  categories?: Pick<Category, "slug" | "name"> | null;
};

export type NewsPost = {
  id: string;
  author_id: string;
  title: string;
  body: string;
  status: "live" | "flagged" | "removed";
  created_at: string;
  profiles?: Pick<Profile, "display_name"> | null;
  news_post_stats?: NewsPostStats | null;
};

export type NewsPostStats = {
  post_id: string;
  confirm_count: number;
  dispute_count: number;
  is_community_verified: boolean;
};

export type JournalPost = {
  id: string;
  author_id: string | null;
  title: string;
  slug: string;
  excerpt: string | null;
  body: string;
  category: string | null;
  published_at: string | null;
  featured: boolean;
  created_at: string;
  profiles?: Pick<Profile, "display_name"> | null;
};

export type SiteStats = {
  businessCount: number;
  residentCount: number;
};
