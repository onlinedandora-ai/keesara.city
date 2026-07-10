import { cn } from "@/lib/utils";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "ghost" | "amber";
  href?: string;
};

export function Button({
  className,
  variant = "primary",
  children,
  ...props
}: ButtonProps) {
  const base =
    "inline-flex items-center justify-center rounded-lg px-4 py-2 text-sm font-semibold transition-colors disabled:opacity-50";
  const variants = {
    primary: "bg-teal-700 text-white border border-teal-700 hover:bg-teal-600",
    ghost: "bg-transparent text-teal-900 border border-line hover:bg-teal-100/50",
    amber: "bg-amber-500 text-[#3a2200] border border-amber-500 hover:bg-amber-600",
  };

  return (
    <button className={cn(base, variants[variant], className)} {...props}>
      {children}
    </button>
  );
}
