import Link from "next/link";
import { getJournalPosts } from "@/lib/data";
import { SITE } from "@/lib/constants";

export const revalidate = 3600;

export default async function JournalPage() {
  const posts = await getJournalPosts(20);

  return (
    <div className="px-6 py-10">
      <div className="mx-auto max-w-3xl">
        <h1 className="text-3xl font-bold text-teal-900">Journal</h1>
        <p className="mt-2 text-ink-soft">
          Editorial reporting and guides from the {SITE.brand} team.
        </p>
        <div className="mt-10 space-y-8">
          {posts.length === 0 ? (
            <p className="text-sm text-ink-mute">Articles coming soon.</p>
          ) : (
            posts.map((post) => (
              <article key={post.id} className="border-b border-line pb-8">
                {post.category && (
                  <p className="font-editorial text-sm italic text-amber-600">
                    {post.category}
                  </p>
                )}
                <h2 className="font-editorial mt-2 text-2xl font-bold leading-snug">
                  <Link href={`/journal/${post.slug}`} className="hover:text-teal-700">
                    {post.title}
                  </Link>
                </h2>
                {post.excerpt && (
                  <p className="font-editorial mt-3 text-ink-soft">{post.excerpt}</p>
                )}
                <p className="mt-3 text-xs text-ink-mute">
                  By {post.profiles?.display_name ?? `the ${SITE.brand} team`}
                </p>
              </article>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
