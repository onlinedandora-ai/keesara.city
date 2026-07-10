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
      className={`mx-auto flex max-w-xl rounded-[10px] border border-line bg-card p-1.5 shadow-sm ${className ?? ""}`}
    >
      <input
        type="search"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder={placeholder}
        className="flex-1 bg-transparent px-3.5 py-2.5 text-sm outline-none"
        aria-label="Search"
      />
      <button
        type="submit"
        className="rounded-[7px] bg-amber-500 px-5 py-2.5 text-sm font-semibold text-[#3a2200]"
      >
        Search
      </button>
    </form>
  );
}
