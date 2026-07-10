import Link from "next/link";
import type { Business } from "@/lib/types";
import { BusinessCard } from "@/components/directory/BusinessCard";

type DirectoryGridProps = {
  businesses: Business[];
};

export function DirectoryGrid({ businesses }: DirectoryGridProps) {
  return (
    <section id="directory" className="px-6 py-12">
      <div className="mx-auto max-w-6xl">
        <div className="mb-6 flex items-baseline justify-between">
          <h2 className="text-2xl font-bold text-teal-900">Business directory</h2>
          <Link href="/directory" className="text-sm font-semibold text-teal-700">
            Browse all →
          </Link>
        </div>
        {businesses.length === 0 ? (
          <p className="text-sm text-ink-mute">Directory listings coming soon.</p>
        ) : (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {businesses.map((business) => (
              <BusinessCard key={business.id} business={business} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
