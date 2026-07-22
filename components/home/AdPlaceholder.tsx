import Link from "next/link";
import Image from "next/image";
import { HOUSE_AD } from "@/lib/constants";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";

export function AdPlaceholder() {
  return (
    <section className="px-6 py-6">
      <div className="mx-auto max-w-6xl overflow-hidden rounded-2xl border border-amber-500/30 bg-card shadow-md transition-all hover:shadow-xl">
        <Link href={HOUSE_AD.href} className="group block">
          <div className="relative flex items-center justify-center w-full overflow-hidden bg-[#faf6ee]">
            <Image
              src={HOUSE_AD.bannerImage}
              alt="మీ ఇల్లు మీ ఇష్టం — Keesara Builders & Developers"
              width={1024}
              height={394}
              className="w-full h-auto object-contain transition-transform duration-700 group-hover:scale-[1.01]"
              priority
              sizes="(max-width: 1200px) 100vw, 1200px"
            />
            <div className="absolute right-4 top-4 z-10">
              <Badge variant="featured" className="shadow-md text-xs px-3 py-1">
                {HOUSE_AD.tag}
              </Badge>
            </div>
          </div>
          <div className="flex flex-wrap items-center justify-between gap-4 bg-gradient-to-r from-amber-950 via-teal-950 to-slate-900 px-6 py-4.5 text-white">
            <div className="space-y-1 max-w-2xl">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold uppercase tracking-widest text-amber-400">
                  Mee Illu, Mee Istam
                </span>
                <span className="text-xs text-amber-200/50">•</span>
                <span className="text-xs font-medium text-amber-200/90">Keesara Builders & Developers</span>
              </div>
              <h4 className="text-lg font-bold text-white group-hover:text-amber-300 transition-colors">
                {HOUSE_AD.title}
              </h4>
              <p className="text-xs sm:text-sm text-amber-100/80 leading-relaxed">
                {HOUSE_AD.description}
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="amber" size="md" className="gap-2 shadow-lg group-hover:bg-amber-400">
                <span>View Details & Custom Design</span>
                <span className="text-base transition-transform group-hover:translate-x-1">→</span>
              </Button>
            </div>
          </div>
        </Link>
      </div>
    </section>
  );
}

