import Link from "next/link";
import type { Business } from "@/lib/types";
import { Badge } from "@/components/ui/Badge";

type BusinessCardProps = {
  business: Business;
};

export function BusinessCard({ business }: BusinessCardProps) {
  const categoryName =
    business.categories?.name ??
    (typeof business.categories === "object" && business.categories
      ? (business.categories as { name?: string }).name
      : "Business");

  return (
    <Link
      href={`/directory/${business.slug}`}
      className="relative block overflow-hidden rounded-xl border border-line bg-card transition-shadow hover:shadow-md"
    >
      {business.is_featured && (
        <span className="absolute left-2.5 top-2.5 z-10">
          <Badge variant="featured">Featured</Badge>
        </span>
      )}
      <div className="h-28 bg-teal-100" />
      <div className="p-4">
        <h4 className="text-sm font-semibold">{business.name}</h4>
        <p className="mt-0.5 text-[11.5px] text-teal-700">{categoryName}</p>
        {business.rating != null && (
          <p className="mt-1.5 text-xs text-ink-mute">
            ★ {business.rating} · {business.review_count ?? 0} reviews
          </p>
        )}
      </div>
    </Link>
  );
}
