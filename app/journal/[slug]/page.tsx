import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getJournalPostBySlug } from "@/lib/data";

export const revalidate = 3600;

type JournalArticlePageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({
  params,
}: JournalArticlePageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getJournalPostBySlug(slug);
  if (!post) return { title: "Article not found" };
  return {
    title: post.title,
    description: post.excerpt ?? undefined,
  };
}

export default async function JournalArticlePage({ params }: JournalArticlePageProps) {
  const { slug } = await params;
  const post = await getJournalPostBySlug(slug);
  if (!post) notFound();

  const paragraphs = post.body.split("\n\n");

  return (
    <article className="px-6 py-10">
      <div className="mx-auto max-w-2xl">
        <Link href="/journal" className="text-sm font-semibold text-teal-700">
          ← Back to journal
        </Link>
        {post.category && (
          <p className="font-editorial mt-6 text-sm italic text-amber-600">{post.category}</p>
        )}
        <h1 className="font-editorial mt-2 text-3xl font-bold leading-tight text-teal-900 md:text-4xl">
          {post.title}
        </h1>
        <p className="mt-4 text-sm text-ink-mute">
          By {post.profiles?.display_name ?? "the keesara.city team"}
          {post.published_at &&
            ` · ${new Date(post.published_at).toLocaleDateString("en-IN", {
              day: "numeric",
              month: "long",
              year: "numeric",
            })}`}
        </p>
        {post.excerpt && (
          <p className="font-editorial mt-6 text-lg text-ink-soft">{post.excerpt}</p>
        )}
        <div className="font-editorial mt-8 space-y-5 text-[17px] leading-relaxed text-ink">
          {paragraphs.map((para, i) => (
            <p key={i}>{para}</p>
          ))}
        </div>
      </div>
    </article>
  );
}
