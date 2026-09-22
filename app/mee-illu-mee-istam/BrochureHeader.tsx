"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { HOUSE_AD } from "@/lib/constants";

export function BrochureHeader() {
  const router = useRouter();
  const [activePage, setActivePage] = useState<string>("page-1");

  const handleBack = (e: React.MouseEvent) => {
    e.preventDefault();
    if (typeof window !== "undefined" && window.history.length > 1) {
      router.back();
    } else {
      router.push("/");
    }
  };

  const scrollToSection = (id: string, e: React.MouseEvent) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setActivePage(id);
    }
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActivePage(entry.target.id);
          }
        });
      },
      { threshold: 0.3 }
    );

    const pages = ["page-1", "page-2", "page-3", "page-4", "page-5"];
    pages.forEach((p) => {
      const el = document.getElementById(p);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[#111622]/95 backdrop-blur-md px-2 sm:px-6 py-2 text-white shadow-xl">
      <div className="mx-auto flex max-w-5xl items-center justify-between gap-1.5 sm:gap-4">
        
        {/* Responsive Back Button (Flexbox) */}
        <div className="flex shrink-0 items-center gap-1.5">
          <Link
            href="/"
            onClick={handleBack}
            className="inline-flex items-center gap-1 rounded-lg bg-white/10 hover:bg-white/20 active:bg-white/30 px-2 sm:px-3 py-1.5 text-xs sm:text-sm font-bold text-amber-300 hover:text-amber-200 transition-all cursor-pointer shadow-2xs"
            aria-label="Back to Keesara City"
          >
            <span className="text-sm sm:text-base leading-none">←</span>
            <span className="hidden sm:inline">Back</span>
            <span className="sm:hidden font-semibold text-[11px]">Back</span>
          </Link>
          <span className="text-white/20 hidden md:inline">|</span>
          <span className="hidden md:inline-block text-[11px] font-semibold text-slate-300 uppercase tracking-widest font-serif">
            Brochure
          </span>
        </div>

        {/* Quick Page Jump Pills (Flexbox with horizontal scroll) */}
        <nav className="flex items-center gap-1 sm:gap-1.5 overflow-x-auto no-scrollbar py-0.5 px-0.5" aria-label="Brochure Pages">
          {[
            { id: "page-1", num: "01", label: "01 Cover" },
            { id: "page-2", num: "02", label: "02 Location" },
            { id: "page-3", num: "03", label: "03 Exit 8" },
            { id: "page-4", num: "04", label: "04 Designs" },
            { id: "page-5", num: "05", label: "05 Contact" },
          ].map((item) => {
            const isActive = activePage === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={(e) => scrollToSection(item.id, e)}
                className={`shrink-0 flex items-center justify-center rounded-lg px-2 sm:px-2.5 py-1 sm:py-1 text-[10px] sm:text-[11px] font-bold transition-all shadow-2xs cursor-pointer ${
                  isActive
                    ? "bg-[#D96B43] text-white shadow-sm"
                    : "bg-white/10 text-slate-200 hover:bg-white/20 hover:text-white"
                }`}
              >
                <span className="sm:hidden">{item.num}</span>
                <span className="hidden sm:inline">{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Enhanced Call Action in Single Line (Flexbox) */}
        <div className="flex shrink-0 items-center">
          <a
            href={`tel:${HOUSE_AD.phoneRaw}`}
            className="inline-flex items-center gap-1 sm:gap-1.5 rounded-lg bg-gradient-to-r from-[#D96B43] to-[#C85A32] px-2 sm:px-3.5 py-1.5 text-[10px] sm:text-xs font-bold text-white shadow-md hover:from-[#c25932] hover:to-[#b04a25] transition-all hover:scale-[1.02] active:scale-[0.98]"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-300 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400"></span>
            </span>
            <span>📞</span>
            <span className="hidden sm:inline">{HOUSE_AD.phone}</span>
            <span className="sm:hidden">Call</span>
          </a>
        </div>

      </div>
    </header>
  );
}
