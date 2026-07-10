import { notFound } from "next/navigation";
import { getNewsPostById } from "@/lib/data";
import { ValidationButtons } from "@/components/news/ValidationButtons";
import { Badge } from "@/components/ui/Badge";

export const revalidate = 60;

type NewsDetailPageProps = {
  params: Promise<{ id: string }>;
};

export default async function NewsDetailPage({ params }: NewsDetailPageProps) {
  const { id } = await params;
  const post = await getNewsPostById(id);
  if (!post || post.status !== "live") notFound();

  const verified = post.news_post_stats?.is_community_verified ?? false;

  return (
    <div className="px-6 py-10">
      <div className="mx-auto max-w-2xl">
        <Badge variant={verified ? "verified" : "unverified"}>
          {verified ? "Verified by community" : "Community report, unverified"}
        </Badge>
        <h1 className="mt-4 text-3xl font-bold text-teal-900">{post.title}</h1>
        <p className="mt-6 whitespace-pre-wrap text-ink-soft">{post.body}</p>
        <div className="mt-8 border-t border-line pt-6">
          <p className="mb-3 text-sm font-semibold text-ink">Was this accurate?</p>
          <ValidationButtons newsPostId={post.id} />
        </div>
      </div>
    </div>
  );
}
