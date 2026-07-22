import {
  getBusinesses,
  getJournalPosts,
  getNewsPosts,
  getSiteStats,
} from "@/lib/data";
import { AdPlaceholder } from "@/components/home/AdPlaceholder";
import { AddBusinessCTA } from "@/components/home/AddBusinessCTA";
import { DirectoryGrid } from "@/components/home/DirectoryGrid";
import { Hero } from "@/components/home/Hero";
import { Highlights } from "@/components/home/Highlights";
import { JournalSidebar } from "@/components/home/JournalSidebar";
import { LocalNews } from "@/components/home/LocalNews";
import { NewsFeed } from "@/components/home/NewsFeed";
import { TopBannerAd } from "@/components/home/TopBannerAd";

export const revalidate = 60;

export default async function HomePage() {
  const [stats, news, journal, businesses] = await Promise.all([
    getSiteStats(),
    getNewsPosts(5),
    getJournalPosts(3),
    getBusinesses({ limit: 4, featuredFirst: true }),
  ]);

  return (
    <>
      <TopBannerAd />
      <Hero stats={stats} />
      <Highlights />
      <AdPlaceholder />
      <LocalNews posts={journal} />
      <section className="px-6 py-12">
        <div className="mx-auto grid max-w-6xl gap-9 lg:grid-cols-[1.6fr_1fr]">
          <NewsFeed posts={news} />
          <JournalSidebar posts={journal} />
        </div>
      </section>
      <DirectoryGrid businesses={businesses} />
      <AddBusinessCTA />
    </>
  );
}


