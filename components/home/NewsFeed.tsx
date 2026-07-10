import Link from "next/link";
import type { NewsPost } from "@/lib/types";
import { NewsCard } from "@/components/news/NewsCard";

type NewsFeedProps = {
  posts: NewsPost[];
  limit?: number;
};

export function NewsFeed({ posts, limit }: NewsFeedProps) {
  const items = limit ? posts.slice(0, limit) : posts;

  return (
    <div>
      <div className="mb-2 flex items-baseline justify-between">
        <h2 className="text-2xl font-bold text-teal-900">Community news</h2>
        <Link href="/news" className="text-sm font-semibold text-teal-700">
          View all →
        </Link>
      </div>
      {items.length === 0 ? (
        <p className="py-8 text-sm text-ink-mute">
          No community reports yet. Be the first to post an update.
        </p>
      ) : (
        items.map((post) => <NewsCard key={post.id} post={post} compact />)
      )}
    </div>
  );
}
