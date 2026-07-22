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
      <div className="h-28 bg-teal-100/40 dark:bg-slate-800 flex items-center justify-center p-3 text-center">
        <span className="text-2xl font-bold text-teal-800/40 dark:text-amber-500/30">
          {business.name.slice(0, 2).toUpperCase()}
        </span>
      </div>
      <div className="p-4">
        <div>
          <h4 className="text-sm font-semibold text-ink">{business.name}</h4>
        </div>
        <p className="mt-0.5 text-[11.5px] font-medium text-teal-700 dark:text-amber-500">
          {categoryName}
        </p>
        {business.address && (
          <p className="mt-1 text-xs text-ink-soft line-clamp-1">
            📍 {business.address}
          </p>
        )}
        {business.rating != null && (
          <p className="mt-1.5 text-xs text-ink-mute">
            ★ {business.rating} · {business.review_count ?? 0} reviews
          </p>
        )}
      </div>
    </Link>
  );
}
