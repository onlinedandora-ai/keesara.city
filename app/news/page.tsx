import { getNewsPosts } from "@/lib/data";
import { NewsCard } from "@/components/news/NewsCard";
import { PostNewsTrigger } from "@/components/news/PostNewsTrigger";

export const revalidate = 60;

export default async function NewsPage() {
  const posts = await getNewsPosts(30);

  return (
    <div className="px-6 py-10">
      <div className="mx-auto max-w-2xl">
        <div className="mb-8 flex items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-teal-900">Community news</h1>
            <p className="mt-2 text-ink-soft">
              Local updates from residents — confirm what you&apos;ve seen firsthand.
            </p>
          </div>
          <PostNewsTrigger />
        </div>
        {posts.length === 0 ? (
          <p className="text-sm text-ink-mute">No posts yet. Be the first to share an update.</p>
        ) : (
          posts.map((post) => (
            <NewsCard key={post.id} post={post} showActions />
          ))
        )}
      </div>
    </div>
  );
}
