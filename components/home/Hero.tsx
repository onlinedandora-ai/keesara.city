import { SearchBar } from "@/components/ui/SearchBar";
import { SITE } from "@/lib/constants";
import type { SiteStats } from "@/lib/types";

type HeroProps = {
  stats: SiteStats;
};

export function Hero({ stats }: HeroProps) {
  return (
    <section className="px-4 py-10 text-center sm:px-6 sm:py-16 md:py-20">
      <p className="text-xs font-semibold uppercase tracking-widest text-teal-700">
        {SITE.tagline}
      </p>
      <h1 className="mx-auto mt-3 max-w-3xl text-2xl font-bold leading-tight text-teal-900 sm:text-3xl md:text-4xl">
        Everything Keesara. News, businesses, and neighbors — in one place.
      </h1>
      <p className="mx-auto mt-2.5 max-w-lg text-sm text-ink-soft sm:text-base">{SITE.description}</p>
      <div className="mt-7 hidden md:block">
        <SearchBar />
      </div>
      <div className="mt-7 flex flex-wrap justify-center gap-6 sm:gap-9">
        <div className="text-center">
          <b className="block text-xl sm:text-2xl text-teal-900">{stats.businessCount || "300+"}</b>
          <span className="text-xs text-ink-mute">businesses listed</span>
        </div>
        <div className="text-center">
          <b className="block text-xl sm:text-2xl text-teal-900">16</b>
          <span className="text-xs text-ink-mute">villages covered</span>
        </div>
        <div className="text-center">
          <b className="block text-xl sm:text-2xl text-teal-900">
            {stats.residentCount > 0 ? `${stats.residentCount}+` : "—"}
          </b>
          <span className="text-xs text-ink-mute">residents on {SITE.name}</span>
        </div>
      </div>
    </section>
  );
}
