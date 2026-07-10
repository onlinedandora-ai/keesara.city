import { Suspense } from "react";
import { getBusinesses, getCategories } from "@/lib/data";
import { BusinessCard } from "@/components/directory/BusinessCard";
import { CategoryChips } from "@/components/directory/CategoryChips";

export const revalidate = 3600;

type DirectoryPageProps = {
  searchParams: Promise<{ category?: string }>;
};

export default async function DirectoryPage({ searchParams }: DirectoryPageProps) {
  const { category } = await searchParams;
  const [categories, businesses] = await Promise.all([
    getCategories(),
    getBusinesses({ categorySlug: category, featuredFirst: true }),
  ]);

  return (
    <div className="px-6 py-10">
      <div className="mx-auto max-w-6xl">
        <h1 className="mb-2 text-3xl font-bold text-teal-900">Business directory</h1>
        <p className="mb-8 text-ink-soft">
          Find local businesses across Keesara — real estate, schools, healthcare, and more.
        </p>
        <Suspense fallback={<div className="mb-7 h-10" />}>
          <CategoryChips categories={categories} />
        </Suspense>
        {businesses.length === 0 ? (
          <p className="text-sm text-ink-mute">No businesses in this category yet.</p>
        ) : (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {businesses.map((business) => (
              <BusinessCard key={business.id} business={business} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
