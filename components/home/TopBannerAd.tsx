import Link from "next/link";
import Image from "next/image";
import { HOUSE_AD } from "@/lib/constants";

export function TopBannerAd() {
  return (
    <section className="w-full bg-paper pt-3 sm:pt-4 pb-1 sm:pb-2 px-3 sm:px-6">
      <div className="mx-auto max-w-4xl overflow-hidden rounded-xl sm:rounded-2xl border border-amber-500/30 bg-[#faf6ee] shadow-xs sm:shadow-sm transition-all duration-300 hover:shadow-md hover:border-amber-500/50">
        <Link href={HOUSE_AD.href} className="group relative flex flex-col items-center justify-center w-full">
          {/* Ad Type Badge */}
          <div className="absolute left-2 top-2 sm:left-3 sm:top-3 z-10">
            <span className="inline-flex items-center gap-1 sm:gap-1.5 rounded-md bg-white/95 px-2 sm:px-2.5 py-0.5 sm:py-1 text-[9px] sm:text-[11px] font-bold uppercase tracking-wider text-amber-800 shadow-xs border border-amber-200/80 backdrop-blur-xs">
              <span className="h-1.5 w-1.5 rounded-full bg-amber-500 animate-pulse" />
              Sponsored • HMDA Approved
            </span>
          </div>

          {/* Banner Container */}
          <div className="flex items-center justify-center w-full overflow-hidden">
            <Image
              src={HOUSE_AD.bannerImage}
              alt="మీ ఇల్లు మీ ఇష్టం — Keesara Builders & Developers"
              width={1024}
              height={576}
              className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-[1.01]"
              priority
              sizes="(max-width: 768px) 100vw, 896px"
            />
          </div>

          {/* Click Callout Strip */}
          <div className="flex w-full items-center justify-between gap-2 bg-gradient-to-r from-amber-900 via-stone-900 to-amber-950 px-3 sm:px-4 py-2 text-white text-xs sm:text-sm">
            <div className="flex min-w-0 items-center gap-2 truncate">
              <span className="shrink-0 font-bold text-amber-300">మీ ఇల్లు మీ ఇష్టం</span>
              <span className="text-white/40 hidden sm:inline">•</span>
              <span className="text-stone-300 text-xs hidden sm:inline truncate">
                300m from ORR Exit 8 | 320+ Open Plots | Custom Construction
              </span>
            </div>
            <span className="inline-flex shrink-0 items-center gap-1 font-bold text-amber-400 group-hover:text-amber-300 text-[11px] sm:text-xs group-hover:underline">
              View Layout & Brochure <span className="transition-transform duration-200 group-hover:translate-x-1">→</span>
            </span>
          </div>
        </Link>
      </div>
    </section>
  );
}

