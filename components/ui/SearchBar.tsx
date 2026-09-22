"use client";

import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";

type SearchBarProps = {
  placeholder?: string;
  className?: string;
  defaultValue?: string;
};

export function SearchBar({
  placeholder = "Search businesses, news, or “plumber near ORR exit 8”",
  className,
  defaultValue = "",
}: SearchBarProps) {
  const router = useRouter();
  const [query, setQuery] = useState(defaultValue);

  const submit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      const trimmed = query.trim();
      if (trimmed) {
        router.push(`/search?q=${encodeURIComponent(trimmed)}`);
      }
    },
    [query, router],
  );

  return (
    <form
      onSubmit={submit}
      className={`mx-auto flex w-full max-w-xl items-center rounded-xl border border-line bg-card p-1 shadow-xs transition-shadow focus-within:border-amber-500/80 focus-within:ring-2 focus-within:ring-amber-500/20 sm:p-1.5 ${className ?? ""}`}
    >
      <input
        type="search"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder={placeholder}
        className="min-w-0 flex-1 bg-transparent px-3 py-1.5 text-xs text-ink outline-none placeholder:text-ink-mute placeholder:truncate sm:py-2.5 sm:text-sm"
        aria-label="Search"
      />
      <button
        type="submit"
        className="shrink-0 rounded-lg bg-amber-500 px-3.5 py-1.5 text-xs font-semibold text-[#3a2200] transition-colors hover:bg-amber-400 active:scale-95 sm:px-5 sm:py-2.5 sm:text-sm cursor-pointer"
      >
        Search
      </button>
    </form>
  );
}
