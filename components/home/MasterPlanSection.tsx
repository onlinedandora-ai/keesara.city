"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { HOUSE_AD } from "@/lib/constants";

export function MasterPlanSection() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [activeTab, setActiveTab] = useState<"all" | "parks" | "roads" | "amenities">("all");
  const modalContentRef = useRef<HTMLDivElement>(null);

  // Close modal on Escape key press
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setIsModalOpen(false);
      }
    }
    if (isModalOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "auto";
      setZoomLevel(1);
    }
    return () => {
      document.body.style.overflow = "auto";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isModalOpen]);

  const handleZoomIn = () => setZoomLevel((prev) => Math.min(prev + 0.35, 3));
  const handleZoomOut = () => setZoomLevel((prev) => Math.max(prev - 0.35, 0.8));
  const handleResetZoom = () => setZoomLevel(1);

  return (
    <section id="master-plan" className="w-full bg-[#fbf9f4] dark:bg-[#0c1322] py-12 sm:py-16 border-y border-amber-500/20 px-3 sm:px-6">
      <div className="mx-auto max-w-6xl space-y-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-amber-500/20 pb-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 rounded-full bg-amber-500/15 dark:bg-amber-400/10 px-3 py-1 text-xs font-bold uppercase tracking-wider text-amber-900 dark:text-amber-300 border border-amber-500/30">
              <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
              HMDA Approved 25.5 Acres • KVR Landmark-2
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              320+ Luxury Gated Community Open Plots
            </h2>
            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 max-w-2xl">
              Official Master Layout Plan with 40&apos; & 30&apos; wide roads, 13,550+ Sq.Mtrs of green parks, and 2,779 Sq.Mtrs of social infrastructure — just 300m from ORR Exit 8.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5 shrink-0">
            <button
              onClick={() => setIsModalOpen(true)}
              className="inline-flex items-center gap-1.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs sm:text-sm px-4 py-2.5 shadow-sm transition-all hover:shadow-md cursor-pointer"
            >
              <span>🔍</span>
              <span>Inspect Full Map (HD)</span>
            </button>
            <Link
              href={HOUSE_AD.brochurePdf}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-xl bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 font-bold text-xs sm:text-sm px-4 py-2.5 border border-slate-300 dark:border-slate-700 hover:border-amber-500 transition-all shadow-xs"
            >
              <span>📄</span>
              <span>Download PDF</span>
            </Link>
          </div>
        </div>

        {/* Master Plan Main Showcase Card */}
        <div className="flex flex-col overflow-hidden rounded-2xl sm:rounded-3xl border border-amber-500/30 bg-white dark:bg-slate-900 shadow-xl transition-all">
          
          {/* Top Quick Status Ribbon (Flexbox) */}
          <div className="flex flex-wrap items-center justify-between gap-3 bg-gradient-to-r from-amber-950 via-stone-900 to-amber-950 px-4 sm:px-6 py-3 text-white text-xs sm:text-sm border-b border-amber-500/20">
            <div className="flex items-center gap-2 font-bold">
              <span className="text-amber-400">Master Layout Map</span>
              <span className="text-white/40">•</span>
              <span className="text-stone-300 font-normal hidden sm:inline">
                Direct frontage on ECIL to Keesara Main Road
              </span>
            </div>
            <div className="flex items-center gap-3 text-xs">
              <span className="text-emerald-400 font-semibold flex items-center gap-1">
                <span>✓</span> 100% Vastu Compliant
              </span>
              <span className="text-amber-300 font-semibold hidden md:inline">
                📍 Near Office of Collector Medchal
              </span>
            </div>
          </div>

          {/* Map Image Container with Interactive Click-to-Enlarge (Clean Flexbox, Exact 1024/700 Aspect Ratio) */}
          <div
            onClick={() => setIsModalOpen(true)}
            className="group relative flex w-full aspect-[1024/700] cursor-zoom-in items-center justify-center overflow-hidden bg-[#88b66e] dark:bg-slate-950 select-none"
            title="Click to view layout in full screen HD mode"
          >
            <Image
              src={HOUSE_AD.masterLayoutImage}
              alt="320+ Luxury Gated Community Open Plots Master Layout Plan — KVR Landmark-2 @ Keesara"
              fill
              className="object-cover sm:object-contain object-center transition-transform duration-500 group-hover:scale-[1.01]"
              priority
              sizes="(max-width: 1200px) 100vw, 1200px"
            />

            {/* Top-Right Click-to-Zoom Indicator */}
            <div className="absolute right-3 top-3 z-10 flex items-center gap-1.5 rounded-full bg-black/75 px-3 py-1.5 text-xs font-bold text-white backdrop-blur-md border border-white/20 shadow-lg transition-transform group-hover:scale-105">
              <span className="text-amber-400">🔍</span>
              <span>Click for HD Full Screen</span>
            </div>

            {/* Bottom Overlay Callout (Flexbox Layout) */}
            <div className="absolute inset-x-0 bottom-0 flex flex-wrap items-end justify-between gap-2 bg-gradient-to-t from-black/85 via-black/50 to-transparent p-4 sm:p-5 text-white">
              <div className="flex flex-col gap-0.5">
                <span className="text-xs font-bold uppercase tracking-wider text-amber-300">
                  KVR Landmark-2 • HMDA Approved
                </span>
                <p className="text-xs sm:text-sm text-slate-200 font-medium">
                  320+ Gated Community Plots • Grand Entrance Arch • Wide 40&apos; & 30&apos; Blacktop Roads
                </p>
              </div>
              <span className="inline-flex items-center gap-1 text-xs font-bold text-amber-400 group-hover:text-amber-300 underline underline-offset-2 transition-colors">
                Open Interactive Map →
              </span>
            </div>
          </div>

          {/* Master Plan Key Specifications Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-slate-200 dark:divide-slate-800 border-t border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-900/90 text-slate-900 dark:text-slate-100">
            
            <div className="p-4 sm:p-5 space-y-1">
              <span className="block text-[11px] font-bold uppercase tracking-wider text-amber-700 dark:text-amber-400">
                Total Layout Area
              </span>
              <span className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
                25.5 Acres
              </span>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">
                320+ Gated Community Open Plots
              </p>
            </div>

            <div className="p-4 sm:p-5 space-y-1">
              <span className="block text-[11px] font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400">
                Parks & Open Greens
              </span>
              <span className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
                13,550+ <span className="text-sm font-normal text-slate-500">Sq.M</span>
              </span>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">
                3 Dedicated Parks (2654, 3328, 7567 Sq.M)
              </p>
            </div>

            <div className="p-4 sm:p-5 space-y-1">
              <span className="block text-[11px] font-bold uppercase tracking-wider text-blue-700 dark:text-blue-400">
                Internal Road Network
              </span>
              <span className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
                40&apos; & 30&apos; <span className="text-sm font-normal text-slate-500">Wide</span>
              </span>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">
                Plus 120&apos; (36m) MDP Road Effected Area
              </p>
            </div>

            <div className="p-4 sm:p-5 space-y-1">
              <span className="block text-[11px] font-bold uppercase tracking-wider text-purple-700 dark:text-purple-400">
                Social Infrastructure
              </span>
              <span className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
                2,779.33 <span className="text-sm font-normal text-slate-500">Sq.M</span>
              </span>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">
                Transformer Yard, OHT & Utilities
              </p>
            </div>

          </div>

          {/* Interactive Feature Highlights Bar */}
          <div className="p-5 sm:p-6 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 space-y-4">
            <h3 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white">
              Why Invest in KVR Landmark-2 Keesara Plots?
            </h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 text-xs sm:text-sm">
              
              <div className="flex items-start gap-2.5 rounded-xl border border-slate-200 dark:border-slate-800 p-3 bg-white dark:bg-slate-800/60">
                <span className="text-base">📍</span>
                <div>
                  <strong className="block text-slate-900 dark:text-slate-100 font-bold">
                    Direct Highway Connectivity
                  </strong>
                  <span className="text-slate-600 dark:text-slate-300 text-xs">
                    Grand arch entrance on ECIL-Keesara Road, just 300m from ORR Exit 8.
                  </span>
                </div>
              </div>

              <div className="flex items-start gap-2.5 rounded-xl border border-slate-200 dark:border-slate-800 p-3 bg-white dark:bg-slate-800/60">
                <span className="text-base">🏡</span>
                <div>
                  <strong className="block text-slate-900 dark:text-slate-100 font-bold">
                    Custom Villa Construction
                  </strong>
                  <span className="text-slate-600 dark:text-slate-300 text-xs">
                    &quot;Mee Illu Mee Istam&quot; — choose from 10+ custom architect elevations or build your own.
                  </span>
                </div>
              </div>

              <div className="flex items-start gap-2.5 rounded-xl border border-slate-200 dark:border-slate-800 p-3 bg-white dark:bg-slate-800/60">
                <span className="text-base">🏛️</span>
                <div>
                  <strong className="block text-slate-900 dark:text-slate-100 font-bold">
                    100% HMDA Clear Title
                  </strong>
                  <span className="text-slate-600 dark:text-slate-300 text-xs">
                    Sanctioned layout with immediate bank loan assistance and hassle-free registration.
                  </span>
                </div>
              </div>

            </div>

            {/* Bottom Call To Action Bar */}
            <div className="flex flex-wrap items-center justify-between gap-4 pt-3 border-t border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-3">
                <Link
                  href="/mee-illu-mee-istam"
                  className="inline-flex items-center gap-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs sm:text-sm px-5 py-2.5 shadow-md transition-transform hover:scale-[1.02]"
                >
                  <span>Explore 10+ Villa Elevations & Pricing</span>
                  <span>→</span>
                </Link>
                <a
                  href={`https://wa.me/${HOUSE_AD.whatsapp}?text=Hi%20Keesara%20City,%20I%20am%20interested%20in%20the%20Master%20Layout%20Plan%20and%20plot%20availability%20at%20KVR%20Landmark-2.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs sm:text-sm px-4 py-2.5 shadow-md transition-transform hover:scale-[1.02]"
                >
                  <span>WhatsApp Plot Inquiry</span>
                </a>
              </div>

              <a
                href={`tel:${HOUSE_AD.phoneRaw}`}
                className="text-xs sm:text-sm font-bold text-slate-700 dark:text-slate-200 hover:text-amber-600 dark:hover:text-amber-400 flex items-center gap-1.5"
              >
                <span>📞 Call Sales Desk:</span>
                <span className="underline">{HOUSE_AD.phone}</span>
              </a>
            </div>

          </div>

        </div>

      </div>

      {/* ========================================================
          FULL-SCREEN HD LIGHTBOX / ZOOM MODAL
         ======================================================== */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex flex-col bg-black/95 text-white backdrop-blur-md">
          
          {/* Modal Top Control Bar */}
          <div className="flex items-center justify-between border-b border-white/10 bg-slate-950/80 px-4 sm:px-6 py-3">
            <div className="flex items-center gap-3">
              <span className="font-bold text-amber-400 text-sm sm:text-base">
                KVR Landmark-2 @ Keesara — Master Layout Plan (320+ Plots)
              </span>
              <span className="hidden sm:inline-block rounded bg-white/10 px-2 py-0.5 text-xs text-slate-300">
                HMDA Approved • 25.5 Acres
              </span>
            </div>

            {/* Zoom Controls & Close */}
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="flex items-center rounded-lg border border-white/20 bg-black/40 p-1">
                <button
                  onClick={handleZoomOut}
                  className="rounded px-2.5 py-1 text-sm font-bold hover:bg-white/20 cursor-pointer"
                  title="Zoom Out"
                >
                  −
                </button>
                <span className="px-2 font-mono text-xs text-slate-300">
                  {Math.round(zoomLevel * 100)}%
                </span>
                <button
                  onClick={handleZoomIn}
                  className="rounded px-2.5 py-1 text-sm font-bold hover:bg-white/20 cursor-pointer"
                  title="Zoom In"
                >
                  +
                </button>
                <button
                  onClick={handleResetZoom}
                  className="ml-1 rounded px-2 py-1 text-xs text-amber-400 hover:bg-white/20 cursor-pointer"
                  title="Reset Zoom"
                >
                  Reset
                </button>
              </div>

              <Link
                href={HOUSE_AD.brochurePdf}
                target="_blank"
                rel="noopener noreferrer"
                className="hidden md:inline-flex items-center gap-1 rounded-lg bg-amber-500 px-3 py-1.5 text-xs font-bold text-slate-950 hover:bg-amber-400"
              >
                Download PDF
              </Link>

              <button
                onClick={() => setIsModalOpen(false)}
                className="rounded-lg bg-white/10 hover:bg-white/20 px-3 py-1.5 text-sm font-bold text-white transition-colors cursor-pointer"
                title="Close (Esc)"
              >
                ✕ Close
              </button>
            </div>
          </div>

          {/* Modal Body - Scrollable / Zoomable High-Res Image */}
          <div
            ref={modalContentRef}
            className="relative flex-1 overflow-auto p-4 sm:p-8 flex items-center justify-center cursor-grab active:cursor-grabbing"
          >
            <div
              className="relative transition-transform duration-200 origin-center"
              style={{
                transform: `scale(${zoomLevel})`,
                maxWidth: "95vw",
                maxHeight: "85vh",
                width: "1400px",
                height: "900px",
              }}
            >
              <Image
                src={HOUSE_AD.masterLayoutImage}
                alt="320+ Open Plots Full HD Master Layout Plan"
                fill
                className="object-contain"
                unoptimized
              />
            </div>
          </div>

          {/* Modal Bottom Footer Strip */}
          <div className="flex flex-wrap items-center justify-between gap-3 border-t border-white/10 bg-slate-950/80 px-4 sm:px-6 py-2.5 text-xs text-slate-300">
            <div className="flex items-center gap-4">
              <span>🛣️ 40&apos; & 30&apos; Internal Roads</span>
              <span>🌿 13,550+ Sq.M Parks</span>
              <span>🏛️ 2,779 Sq.M Social Infrastructure</span>
            </div>
            <div className="flex items-center gap-3">
              <span>Need help choosing a plot?</span>
              <a
                href={`tel:${HOUSE_AD.phoneRaw}`}
                className="font-bold text-amber-400 hover:underline"
              >
                Call {HOUSE_AD.phone}
              </a>
            </div>
          </div>

        </div>
      )}

    </section>
  );
}
