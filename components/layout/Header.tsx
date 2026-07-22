"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useApp } from "@/components/providers/AppProvider";
import { SearchBar } from "@/components/ui/SearchBar";
import { Button } from "@/components/ui/Button";
import { ThemeToggle } from "@/components/ui/ThemeToggle";

export function Header() {
  const pathname = usePathname();
  const { user, openAuth, openPostNews, signOut } = useApp();
  const isHome = pathname === "/";

  return (
    <header className="sticky top-0 z-20 border-b border-line bg-paper/92 backdrop-blur-sm">
      <nav className="mx-auto flex max-w-6xl items-center justify-between gap-5 px-6 py-4">
        <Link href="/" className="flex items-center gap-2 text-xl font-bold text-teal-900">
          <span className="inline-block h-2.5 w-2.5 rounded-full bg-amber-500" />
          <span>keesara.city</span>
          <span className="hidden sm:inline-block ml-1 text-[10px] font-semibold tracking-wider text-amber-600 bg-amber-100/60 dark:bg-amber-900/40 px-2 py-0.5 rounded-full uppercase border border-amber-500/20">
            by onlinedandora-ai
          </span>
        </Link>

        <div className="hidden items-center gap-7 text-sm font-medium text-ink-soft md:flex">
          <Link href="/directory" className="hover:text-teal-700">
            Directory
          </Link>
          <Link href="/journal" className="hover:text-teal-700">
            Journal
          </Link>
          <Link href="/#highlights" className="hover:text-teal-700">
            Highlights
          </Link>
          <Link href="/news" className="hover:text-teal-700">
            News
          </Link>
        </div>

        <div className="hidden items-center gap-2.5 md:flex">
          <ThemeToggle variant="pill" showLabel={false} />
          <Button variant="ghost" onClick={openPostNews}>
            Post news
          </Button>
          {user ? (
            <>
              <span className="max-w-[140px] truncate text-sm font-medium text-teal-700">
                {user.user_metadata?.display_name ??
                  user.user_metadata?.name ??
                  user.phone ??
                  user.email ??
                  "Resident"}
              </span>
              <Button variant="ghost" onClick={() => void signOut()}>
                Logout
              </Button>
            </>
          ) : (
            <Button onClick={openAuth}>Login</Button>
          )}
        </div>
      </nav>

      {isHome && (
        <div className="border-t border-line px-6 pb-4 md:hidden">
          <SearchBar />
        </div>
      )}
    </header>
  );
}
