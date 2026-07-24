import Link from "next/link";
import type { JournalPost } from "@/lib/types";
import { SITE } from "@/lib/constants";

type LocalNewsProps = {
  posts: JournalPost[];
};

export function LocalNews({ posts }: LocalNewsProps) {
  if (!posts || posts.length === 0) return null;

  return (
    <section className="px-6 py-10">
      <div className="mx-auto max-w-6xl">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-teal-950 md:text-3xl">Local news</h2>
          <Link
            href="/journal"
            className="flex items-center gap-1 text-sm font-semibold text-teal-700 hover:text-teal-900"
          >
            View all <span aria-hidden="true">→</span>
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
          {posts.map((post) => {
            const formattedDate = post.published_at
              ? new Date(post.published_at).toLocaleDateString("en-GB", {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                })
              : "13 Jul 2026";
            const author = post.profiles?.display_name ?? `the ${SITE.brand} team`;

            return (
              <article
                key={post.id}
                className="flex flex-col justify-between rounded-2xl border border-line bg-white p-6 shadow-xs"
              >
                <div>
                  {post.category && (
                    <span className="inline-block rounded-full bg-[#fef6e7] px-3 py-1 text-xs font-semibold text-[#b47119]">
                      {post.category}
                    </span>
                  )}
                  <h3 className="mt-3 text-lg font-bold leading-snug text-ink hover:text-teal-800">
                    <Link href={`/journal/${post.slug}`}>{post.title}</Link>
                  </h3>
                </div>
                <div className="mt-6 text-xs text-ink-mute">
                  {formattedDate} · {author}
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
