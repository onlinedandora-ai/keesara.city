"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { useApp } from "@/components/providers/AppProvider";

function MobileNavContent() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const categoryParam = searchParams.get("category");
  const { user, openAuth, signOut } = useApp();

  const isHomeActive = pathname === "/";
  const isPlacesActive = pathname === "/directory" && !categoryParam;
  const isRealtyActive = pathname === "/directory" && categoryParam === "real-estate";
  const isHealthActive = pathname === "/directory" && categoryParam === "healthcare";
  const isLocalActive = pathname.startsWith("/news");

  return (
    <nav
      className="fixed inset-x-0 bottom-0 z-30 border-t border-line bg-card/95 backdrop-blur-sm md:hidden"
      aria-label="Mobile navigation"
    >
      <div className="mx-auto grid max-w-lg grid-cols-6 px-1">
        {/* 1. Home */}
        <Link
          href="/"
          className={`flex flex-col items-center gap-1 py-2 text-[11px] font-medium transition-colors ${
            isHomeActive ? "text-teal-700 font-semibold" : "text-ink-soft hover:text-ink"
          }`}
        >
          <svg className="h-5 w-5 stroke-current fill-none stroke-[1.75]" viewBox="0 0 24 24">
            <path d="M3 12l9-9 9 9M4 10v10a1 1 0 001 1h14a1 1 0 001-1V10" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <span>Home</span>
        </Link>

        {/* 2. Places */}
        <Link
          href="/directory"
          className={`flex flex-col items-center gap-1 py-2 text-[11px] font-medium transition-colors ${
            isPlacesActive ? "text-teal-700 font-semibold" : "text-ink-soft hover:text-ink"
          }`}
        >
          <svg className="h-5 w-5 stroke-current fill-none stroke-[1.75]" viewBox="0 0 24 24">
            <path d="M4 6h16M4 12h16M4 18h16" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <span>Places</span>
        </Link>

        {/* 3. Realty */}
        <Link
          href="/directory?category=real-estate"
          className={`flex flex-col items-center gap-1 py-2 text-[11px] font-medium transition-colors ${
            isRealtyActive ? "text-teal-700 font-semibold" : "text-ink-soft hover:text-ink"
          }`}
        >
          <svg className="h-5 w-5 stroke-current fill-none stroke-[1.75]" viewBox="0 0 24 24">
            <rect x="3" y="3" width="7" height="7" rx="1"/>
            <rect x="14" y="3" width="7" height="7" rx="1"/>
            <rect x="14" y="14" width="7" height="7" rx="1"/>
            <rect x="3" y="14" width="7" height="7" rx="1"/>
          </svg>
          <span>Realty</span>
        </Link>

        {/* 4. Health */}
        <Link
          href="/directory?category=healthcare"
          className={`flex flex-col items-center gap-1 py-2 text-[11px] font-medium transition-colors ${
            isHealthActive ? "text-teal-700 font-semibold" : "text-ink-soft hover:text-ink"
          }`}
        >
          <svg className="h-5 w-5 fill-current" viewBox="0 0 24 24">
            <path d="M19 10.5h-5.5V5a1.5 1.5 0 00-3 0v5.5H5a1.5 1.5 0 000 3h5.5V19a1.5 1.5 0 003 0v-5.5H19a1.5 1.5 0 000-3z"/>
          </svg>
          <span>Health</span>
        </Link>

        {/* 5. Local */}
        <Link
          href="/news"
          className={`flex flex-col items-center gap-1 py-2 text-[11px] font-medium transition-colors ${
            isLocalActive ? "text-teal-700 font-semibold" : "text-ink-soft hover:text-ink"
          }`}
        >
          <svg className="h-5 w-5 stroke-current fill-none stroke-[1.75]" viewBox="0 0 24 24">
            <circle cx="12" cy="12" r="8"/>
            <circle cx="12" cy="12" r="3" fill="currentColor"/>
          </svg>
          <span>Local</span>
        </Link>

        {/* 6. Login / Logout */}
        <button
          type="button"
          onClick={() => (user ? void signOut() : openAuth())}
          className="flex flex-col items-center gap-1 py-2 text-[11px] font-medium text-ink-soft transition-colors hover:text-ink"
        >
          <svg className="h-5 w-5 stroke-current fill-none stroke-[1.75]" viewBox="0 0 24 24">
            <circle cx="12" cy="12" r="9"/>
            <circle cx="12" cy="12" r="3"/>
          </svg>
          <span>{user ? "Logout" : "Login"}</span>
        </button>
      </div>
    </nav>
  );
}

export function MobileNav() {
  return <MobileNavContent />;
}
