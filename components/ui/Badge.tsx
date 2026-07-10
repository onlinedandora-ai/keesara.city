import { cn } from "@/lib/utils";

type BadgeProps = {
  variant: "verified" | "unverified" | "featured" | "sponsored";
  children: React.ReactNode;
  className?: string;
};

export function Badge({ variant, children, className }: BadgeProps) {
  const variants = {
    verified: "bg-teal-100 text-teal-700",
    unverified: "bg-[#f1efe8] text-ink-mute",
    featured: "bg-amber-500 text-[#3a2200]",
    sponsored: "bg-white text-amber-600",
  };

  return (
    <span
      className={cn(
        "inline-block rounded-full px-2 py-0.5 text-[10.5px] font-semibold",
        variants[variant],
        className,
      )}
    >
      {children}
    </span>
  );
}
