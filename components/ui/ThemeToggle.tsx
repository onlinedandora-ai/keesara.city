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
  variant = "pill",
}: ThemeToggleProps) {
  const { theme, toggleTheme } = useApp();
  const isDark = theme === "dark";

  if (variant === "pill") {
    return (
      <div
        className={cn(
          "inline-flex items-center gap-1.5 rounded-full border border-line bg-paper p-1 text-xs font-medium",
          className
        )}
      >
        <button
          type="button"
          onClick={() => toggleTheme()}
          className={cn(
            "flex items-center gap-1.5 rounded-full px-2.5 py-1 transition-all",
            !isDark
              ? "bg-teal-700 text-white shadow-xs font-semibold"
              : "text-ink-soft hover:text-ink"
          )}
          aria-label="Switch to Light mode"
        >
          <span>☀️</span>
          {showLabel && <span>Light</span>}
        </button>
        <button
          type="button"
          onClick={() => toggleTheme()}
          className={cn(
            "flex items-center gap-1.5 rounded-full px-2.5 py-1 transition-all",
            isDark
              ? "bg-amber-500 text-slate-950 shadow-xs font-bold"
              : "text-ink-soft hover:text-ink"
          )}
          aria-label="Switch to Dark mode"
        >
          <span>🌙</span>
          {showLabel && <span>Dark</span>}
        </button>
      </div>
    );
  }

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className={cn(
        "inline-flex items-center gap-2 rounded-lg border border-line bg-card px-3 py-1.5 text-sm font-medium text-ink transition-colors hover:bg-paper hover:border-amber-500",
        className
      )}
      title={isDark ? "Switch to light mode" : "Switch to dark mode"}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
    >
      <span className="text-base">{isDark ? "🌙" : "☀️"}</span>
      {showLabel && <span>{isDark ? "Dark mode" : "Light mode"}</span>}
    </button>
  );
}
