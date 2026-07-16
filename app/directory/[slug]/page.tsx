import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getBusinessBySlug } from "@/lib/data";
import { Badge } from "@/components/ui/Badge";

export const revalidate = 60;

type BusinessPageProps = {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ listed?: string }>;
};

export async function generateMetadata({
  params,
}: BusinessPageProps): Promise<Metadata> {
  const { slug } = await params;
  const business = await getBusinessBySlug(slug);
  if (!business) return { title: "Business not found" };
  return {
    title: `${business.name} in Keesara`,
    description: business.description ?? `${business.name} — Keesara business directory`,
  };
}

export default async function BusinessPage({ params, searchParams }: BusinessPageProps) {
  const { slug } = await params;
  const { listed } = await searchParams;
  const business = await getBusinessBySlug(slug);
  if (!business) notFound();

  const categoryName = business.categories?.name ?? "Business";

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: business.name,
    description: business.description,
    address: business.address,
    telephone: business.phone,
    url: business.website ?? undefined,
    geo:
      business.lat && business.lng
        ? {
            "@type": "GeoCoordinates",
            latitude: business.lat,
            longitude: business.lng,
          }
        : undefined,
    aggregateRating: business.rating
      ? {
          "@type": "AggregateRating",
          ratingValue: business.rating,
          reviewCount: business.review_count ?? 0,
        }
      : undefined,
  };

  return (
    <div className="px-6 py-10">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="mx-auto max-w-3xl">
        <Link href="/directory" className="text-sm font-semibold text-teal-700">
          ← Back to directory
        </Link>

        {listed === "1" && (
          <div className="mt-4 rounded-xl border border-teal-100 bg-teal-100 px-4 py-3 text-sm text-teal-900">
            Your business is live on the directory. Share this page with customers.
          </div>
        )}

        <div className="mt-6 rounded-2xl border border-line bg-card p-8">
          {business.is_featured && (
            <Badge variant="featured" className="mb-3">
              Featured
            </Badge>
          )}
          <p className="text-sm font-medium text-teal-700">{categoryName}</p>
          <h1 className="mt-1 text-3xl font-bold text-teal-900">{business.name}</h1>
          {business.rating != null && (
            <p className="mt-2 text-sm text-ink-mute">
              ★ {business.rating} · {business.review_count ?? 0} reviews
            </p>
          )}
          {business.description && (
            <p className="mt-5 text-ink-soft">{business.description}</p>
          )}
          <dl className="mt-6 space-y-3 text-sm">
            {business.address && (
              <div>
                <dt className="font-semibold text-ink">Address</dt>
                <dd className="text-ink-soft">{business.address}</dd>
              </div>
            )}
            {business.phone && (
              <div>
                <dt className="font-semibold text-ink">Phone</dt>
                <dd>
                  <a href={`tel:${business.phone}`} className="text-teal-700">
                    {business.phone}
                  </a>
                </dd>
              </div>
            )}
            {business.website && (
              <div>
                <dt className="font-semibold text-ink">Website</dt>
                <dd>
                  <a
                    href={business.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="break-all text-teal-700"
                  >
                    {business.website.replace(/^https?:\/\//, "")}
                  </a>
                </dd>
              </div>
            )}
            {business.location_url && (
              <div>
                <dt className="font-semibold text-ink">Location</dt>
                <dd>
                  <a
                    href={business.location_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 font-semibold text-amber-600 hover:text-amber-700"
                  >
                    Open in Google Maps →
                  </a>
                  {business.lat != null && business.lng != null && (
                    <span className="mt-1 block text-xs text-ink-mute">
                      {business.lat.toFixed(5)}, {business.lng.toFixed(5)}
                    </span>
                  )}
                </dd>
              </div>
            )}
          </dl>
        </div>
      </div>
    </div>
  );
}
