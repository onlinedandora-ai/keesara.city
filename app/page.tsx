import type { Metadata } from "next";
import {
  getBusinesses,
  getJournalPosts,
  getNewsPosts,
  getSiteStats,
} from "@/lib/data";
import { AddBusinessCTA } from "@/components/home/AddBusinessCTA";
import { DirectoryGrid } from "@/components/home/DirectoryGrid";
import { Hero } from "@/components/home/Hero";
import { Highlights } from "@/components/home/Highlights";
import { JournalSidebar } from "@/components/home/JournalSidebar";
import { LocalNews } from "@/components/home/LocalNews";
import { MasterPlanSection } from "@/components/home/MasterPlanSection";
import { NewsFeed } from "@/components/home/NewsFeed";
import { TopBannerAd } from "@/components/home/TopBannerAd";
import { SITE } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Keesara.city — KVR Landmark-2 @ Keesara (HMDA Approved · 25.5 Acres)",
  description:
    "Buy your plot and get it constructed as you like. Just 300m from ORR Exit 8. 320+ Open Plots. HMDA Approved 25.5 Acres Layout & Local Keesara Journal.",
  openGraph: {
    title: "Keesara.city — KVR Landmark-2 @ Keesara",
    description:
      "Buy your plot and get it constructed as you like. Just 300m from ORR Exit 8. 320+ Open Plots. HMDA Approved 25.5 Acres.",
    url: SITE.url,
    siteName: "Keesara.city",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: `${SITE.url}/images/mee-illu-mee-istam/hero-tagged.jpg`,
        secureUrl: `${SITE.url}/images/mee-illu-mee-istam/hero-tagged.jpg`,
        width: 1024,
        height: 576,
        type: "image/jpeg",
        alt: "Keesara.city — మీ ఇల్లు మీ ఇష్టం | KVR Landmark-2",
      },
      {
        url: `${SITE.url}/og-image.jpg`,
        secureUrl: `${SITE.url}/og-image.jpg`,
        width: 1024,
        height: 576,
        type: "image/jpeg",
        alt: "Keesara.city",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Keesara.city — KVR Landmark-2 @ Keesara",
    description:
      "Buy your plot and get it constructed as you like. Just 300m from ORR Exit 8. 320+ Open Plots.",
    images: [`${SITE.url}/images/mee-illu-mee-istam/hero-tagged.jpg`],
  },
};

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
      <MasterPlanSection />
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