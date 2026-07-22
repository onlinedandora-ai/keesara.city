import type { MetadataRoute } from "next";
import { getBusinesses, getJournalPosts } from "@/lib/data";
import { SITE } from "@/lib/constants";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = SITE.url;

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/directory`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/journal`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/news`,
      lastModified: new Date(),
      changeFrequency: "hourly",
      priority: 0.9,
    },
  ];

  const [businesses, journalPosts] = await Promise.all([
    getBusinesses(),
    getJournalPosts(50),
  ]);

  const businessRoutes: MetadataRoute.Sitemap = businesses.map((business) => ({
    url: `${baseUrl}/directory/${business.slug}`,
    lastModified: business.created_at ? new Date(business.created_at) : new Date(),
    changeFrequency: "weekly",
    priority: 0.7,
  }));

  const journalRoutes: MetadataRoute.Sitemap = journalPosts.map((post) => ({
    url: `${baseUrl}/journal/${post.slug}`,
    lastModified: post.published_at ? new Date(post.published_at) : post.created_at ? new Date(post.created_at) : new Date(),
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  return [...staticRoutes, ...businessRoutes, ...journalRoutes];
}
