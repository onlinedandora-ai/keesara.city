"use client";

import { useApp } from "@/components/providers/AppProvider";
import { cn } from "@/lib/utils";

type ThemeToggleProps = {
  className?: string;
  showLabel?: boolean;
  variant?: "button" | "pill" | "iconOnly";
};

export function ThemeToggle({
  className,
  showLabel = false,
}: ThemeToggleProps) {
  const { theme, toggleTheme } = useApp();
  const isDark = theme === "dark";

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className={cn(
        "inline-flex h-9 w-9 items-center justify-center rounded-full border border-line bg-paper text-sm text-ink transition-colors hover:bg-card hover:border-amber-500",
        className
      )}
      title={isDark ? "Switch to light mode" : "Switch to dark mode"}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
    >
      <span className="text-base select-none">{isDark ? "☀️" : "🌙"}</span>
      {showLabel && <span className="ml-1.5 text-xs font-medium">{isDark ? "Light" : "Dark"}</span>}
    </button>
  );
}
