"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import type { Category } from "@/lib/types";

type CategoryChipsProps = {
  categories: Category[];
  basePath?: string;
};

export function CategoryChips({ categories, basePath = "/directory" }: CategoryChipsProps) {
  const searchParams = useSearchParams();
  const active = searchParams.get("category");

  const hrefFor = (slug?: string) => {
    if (!slug) return basePath;
    const params = new URLSearchParams(searchParams.toString());
    params.set("category", slug);
    return `${basePath}?${params.toString()}`;
  };

  return (
    <div className="mb-7 flex flex-wrap gap-2.5">
      <Link
        href={hrefFor()}
        className={`rounded-full border px-4 py-1.5 text-[13px] font-medium ${
          !active
            ? "border-teal-700 bg-teal-700 text-white"
            : "border-line bg-card text-ink-soft"
        }`}
      >
        All
      </Link>
      {categories.map((cat) => (
        <Link
          key={cat.id}
          href={hrefFor(cat.slug)}
          className={`rounded-full border px-4 py-1.5 text-[13px] font-medium ${
            active === cat.slug
              ? "border-teal-700 bg-teal-700 text-white"
              : "border-line bg-card text-ink-soft"
          }`}
        >
          {cat.name}
        </Link>
      ))}
    </div>
  );
}
