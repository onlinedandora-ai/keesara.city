import Link from "next/link";
import { formatRelativeTime } from "@/lib/data";
import type { NewsPost } from "@/lib/types";
import { Avatar } from "@/components/ui/Avatar";
import { Badge } from "@/components/ui/Badge";
import { ValidationButtons } from "@/components/news/ValidationButtons";

type NewsCardProps = {
  post: NewsPost;
  showActions?: boolean;
  compact?: boolean;
};

export function NewsCard({ post, showActions = false, compact = false }: NewsCardProps) {
  const authorName = post.profiles?.display_name ?? "Resident";
  const stats = post.news_post_stats;
  const verified = stats?.is_community_verified ?? false;

  return (
    <article className="flex gap-3.5 border-b border-line py-4 last:border-b-0">
      <Avatar name={authorName} />
      <div className="min-w-0 flex-1">
        <Badge variant={verified ? "verified" : "unverified"}>
          {verified ? "Verified by community" : "Community report, unverified"}
        </Badge>
        <h4 className="mt-1.5 text-[15px] font-semibold leading-snug">
          <Link href={`/news/${post.id}`} className="hover:text-teal-700">
            {post.title}
          </Link>
        </h4>
        <p className="mt-1 text-xs text-ink-mute">
          Posted by {authorName} · {formatRelativeTime(post.created_at)}
        </p>
        {!compact && (
          <p className="mt-2 line-clamp-2 text-sm text-ink-soft">{post.body}</p>
        )}
        <div className="mt-2 flex flex-wrap gap-3.5 text-xs text-ink-mute">
          <span>{stats?.confirm_count ?? 0} confirmed</span>
          <span>{stats?.dispute_count ?? 0} disputed</span>
        </div>
        {showActions && <ValidationButtons newsPostId={post.id} className="mt-3" />}
      </div>
    </article>
  );
}
