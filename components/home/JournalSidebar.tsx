import Link from "next/link";
import type { JournalPost } from "@/lib/types";

type JournalSidebarProps = {
  posts: JournalPost[];
};

export function JournalSidebar({ posts }: JournalSidebarProps) {
  return (
    <div>
      <div className="mb-2 flex items-baseline justify-between">
        <h2 className="text-2xl font-bold text-teal-900">From the journal</h2>
        <Link href="/journal" className="text-sm font-semibold text-teal-700">
          All articles →
        </Link>
      </div>
      {posts.length === 0 ? (
        <p className="py-4 text-sm text-ink-mute">Editorial pieces coming soon.</p>
      ) : (
        posts.map((post) => (
          <article key={post.id} className="mb-4 border-b border-line pb-4 last:border-b-0">
            {post.category && (
              <p className="font-editorial text-[11px] italic text-amber-600">
                {post.category}
              </p>
            )}
            <h4 className="font-editorial mt-1.5 text-[17px] font-bold leading-snug">
              <Link href={`/journal/${post.slug}`} className="hover:text-teal-700">
                {post.title}
              </Link>
            </h4>
            {post.excerpt && (
              <p className="font-editorial mt-1.5 text-[13px] text-ink-soft">{post.excerpt}</p>
            )}
            <p className="mt-2 text-[11px] text-ink-mute">
              By {post.profiles?.display_name ?? "the keesara.city team"}
            </p>
          </article>
        ))
      )}
    </div>
  );
}
