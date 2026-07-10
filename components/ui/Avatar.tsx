import { getInitials } from "@/lib/data";
import { cn } from "@/lib/utils";

type AvatarProps = {
  name: string;
  className?: string;
};

export function Avatar({ name, className }: AvatarProps) {
  return (
    <div
      className={cn(
        "flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-teal-100 text-sm font-semibold text-teal-700",
        className,
      )}
      aria-hidden
    >
      {getInitials(name)}
    </div>
  );
}
