import { searchSite } from "@/lib/data";
import { BusinessCard } from "@/components/directory/BusinessCard";
import { NewsCard } from "@/components/news/NewsCard";
import { SearchBar } from "@/components/ui/SearchBar";

type SearchPageProps = {
  searchParams: Promise<{ q?: string }>;
};

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const { q } = await searchParams;
  const query = q?.trim() ?? "";
  const { businesses, news } = query ? await searchSite(query) : { businesses: [], news: [] };

  return (
    <div className="px-6 py-10">
      <div className="mx-auto max-w-3xl">
        <h1 className="mb-6 text-2xl font-bold text-teal-900">Search</h1>
        <SearchBar defaultValue={query} />

        {query && (
          <div className="mt-10 space-y-10">
            <section>
              <h2 className="mb-4 text-lg font-semibold text-teal-900">
                Businesses ({businesses.length})
              </h2>
              {businesses.length === 0 ? (
                <p className="text-sm text-ink-mute">No businesses matched.</p>
              ) : (
                <div className="grid gap-4 sm:grid-cols-2">
                  {businesses.map((b) => (
                    <BusinessCard key={b.id} business={b} />
                  ))}
                </div>
              )}
            </section>
            <section>
              <h2 className="mb-4 text-lg font-semibold text-teal-900">
                News ({news.length})
              </h2>
              {news.length === 0 ? (
                <p className="text-sm text-ink-mute">No news matched.</p>
              ) : (
                news.map((post) => <NewsCard key={post.id} post={post} compact />)
              )}
            </section>
          </div>
        )}

        {!query && (
          <p className="mt-8 text-sm text-ink-mute">
            Try searching for a business name, neighborhood, or local update.
          </p>
        )}
      </div>
    </div>
  );
}
