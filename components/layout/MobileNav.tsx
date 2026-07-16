"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useApp } from "@/components/providers/AppProvider";

const tabs = [
  { href: "/", label: "Home", icon: "⌂" },
  { href: "/directory", label: "Directory", icon: "☰" },
  { href: "post", label: "Post", icon: "✎" },
  { href: "auth", label: "Login", icon: "◎" },
] as const;

export function MobileNav() {
  const pathname = usePathname();
  const { user, openAuth, openPostNews, signOut } = useApp();

  return (
    <nav
      className="fixed inset-x-0 bottom-0 z-30 border-t border-line bg-card/95 backdrop-blur-sm md:hidden"
      aria-label="Mobile navigation"
    >
      <div className="mx-auto grid max-w-lg grid-cols-4">
        {tabs.map((tab) => {
          const isActive =
            tab.href !== "post" &&
            tab.href !== "auth" &&
            (tab.href === "/" ? pathname === "/" : pathname.startsWith(tab.href));

          if (tab.href === "post") {
            return (
              <button
                key={tab.label}
                type="button"
                onClick={openPostNews}
                className="flex flex-col items-center gap-0.5 py-2.5 text-xs font-medium text-ink-soft"
              >
                <span className="text-base">{tab.icon}</span>
                {tab.label}
              </button>
            );
          }

          if (tab.href === "auth") {
            return (
              <button
                key={tab.label}
                type="button"
                onClick={() => (user ? void signOut() : openAuth())}
                className="flex flex-col items-center gap-0.5 py-2.5 text-xs font-medium text-ink-soft"
              >
                <span className="text-base">{user ? "✓" : tab.icon}</span>
                {user ? "Logout" : tab.label}
              </button>
            );
          }

          return (
            <Link
              key={tab.href}
              href={tab.href}
              className={`flex flex-col items-center gap-0.5 py-2.5 text-xs font-medium ${
                isActive ? "text-teal-700" : "text-ink-soft"
              }`}
            >
              <span className="text-base">{tab.icon}</span>
              {tab.label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
