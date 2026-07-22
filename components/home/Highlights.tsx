import Image from "next/image";
import Link from "next/link";
import { HIGHLIGHTS } from "@/lib/constants";

export function Highlights() {
  return (
    <section id="highlights" className="bg-[#0b3d3a] dark:bg-[#0f172a] border-y border-line px-6 py-12 text-white">
      <div className="mx-auto mb-6 max-w-6xl">
        <p className="text-xs font-semibold uppercase tracking-widest text-amber-500">
          Know your town
        </p>
        <div className="mt-2 flex flex-wrap items-end justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold">Highlights of Keesara</h2>
            <p className="mt-1.5 text-sm text-[#cfe3de] dark:text-slate-300">
              The landmarks, geography and growth that make Keesara worth covering.
            </p>
          </div>
          <Link href="/journal" className="text-sm font-semibold text-amber-400 hover:text-white">
            See full guide →
          </Link>
        </div>
      </div>
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {HIGHLIGHTS.map((item) => (
          <article key={item.title} className="overflow-hidden rounded-xl bg-[#0f4a44] dark:bg-[#1e293b] dark:border dark:border-slate-700/80">
            <div className="relative h-36">
              <Image
                src={item.image}
                alt={item.imageAlt}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 25vw"
                unoptimized
              />
            </div>
            <div className="p-4">
              <h3 className="text-[15px] font-semibold text-white">{item.title}</h3>
              <p className="mt-1.5 text-xs leading-relaxed text-[#bcd6d0] dark:text-slate-300">
                {item.description}
              </p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
