"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useApp } from "@/components/providers/AppProvider";
import { SearchBar } from "@/components/ui/SearchBar";
import { Button } from "@/components/ui/Button";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { SITE } from "@/lib/constants";

export function Header() {
  const pathname = usePathname();
  const { user, openAuth, openPostNews, signOut } = useApp();
  const isHome = pathname === "/";

  return (
    <header className="sticky top-0 z-20 border-b border-line bg-paper/92 backdrop-blur-sm">
      <nav className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-6 md:py-4">
        <Link href="/" className="flex shrink-0 items-center gap-2 text-xl font-bold text-teal-900">
          <span className="inline-block h-2.5 w-2.5 rounded-full bg-amber-500" />
          <span>{SITE.name}</span>
        </Link>

        <div className="hidden items-center gap-5 text-sm font-medium text-ink-soft md:flex lg:gap-7">
          <Link href="/directory" className="transition-colors hover:text-teal-700">
            Directory
          </Link>
          <Link href="/directory?category=real-estate" className="transition-colors hover:text-teal-700">
            Real estate
          </Link>
          <Link href="/directory?category=healthcare" className="transition-colors hover:text-teal-700">
            Healthcare
          </Link>
          <Link href="/news" className="transition-colors hover:text-teal-700">
            Local news
          </Link>
        </div>

        <div className="hidden shrink-0 items-center gap-2 md:flex sm:gap-2.5">
          <ThemeToggle showLabel={false} />
          <Button variant="ghost" size="sm" onClick={openPostNews}>
            Post news
          </Button>
          {user ? (
            <>
              <span className="max-w-[120px] truncate text-sm font-medium text-teal-700">
                {user.user_metadata?.display_name ??
                  user.user_metadata?.name ??
                  user.phone ??
                  user.email ??
                  "Resident"}
              </span>
              <Button variant="ghost" size="sm" onClick={() => void signOut()}>
                Logout
              </Button>
            </>
          ) : (
            <Button size="sm" onClick={openAuth}>Login</Button>
          )}
          <a
            href="https://dandora.online"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button variant="ghost" size="sm">
              Dandora
            </Button>
          </a>
        </div>
      </nav>

      {isHome && (
        <div className="border-t border-line px-4 pb-3 sm:px-6 md:hidden">
          <SearchBar />
        </div>
      )}
    </header>
  );
}
