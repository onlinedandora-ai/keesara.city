import Link from "next/link";
import { HOUSE_AD } from "@/lib/constants";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";

export function AdPlaceholder() {
  const isExternal = HOUSE_AD.href.startsWith("http");

  return (
    <section className="px-6 py-6">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 rounded-xl border border-dashed border-amber-600 bg-amber-100 px-6 py-5">
        <div>
          <Badge variant="sponsored">{HOUSE_AD.tag}</Badge>
          <h4 className="mt-1.5 text-base font-semibold text-ink">{HOUSE_AD.title}</h4>
          <p className="text-sm text-ink-soft">{HOUSE_AD.description}</p>
        </div>
        {isExternal ? (
          <a href={HOUSE_AD.href} target="_blank" rel="noopener noreferrer">
            <Button>Learn more</Button>
          </a>
        ) : (
          <Link href={HOUSE_AD.href}>
            <Button>View listing</Button>
          </Link>
        )}
      </div>
    </section>
  );
}
