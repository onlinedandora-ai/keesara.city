import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  HOUSE_AD,
  ORR_PRICE_COMPARISON,
  CONNECTIVITY_HIGHLIGHTS,
  DESIGN_STYLES,
} from "@/lib/constants";
import { ConsultationForm } from "./ConsultationForm";

export const metadata: Metadata = {
  title: "Keesara.city — KVR Landmark-2 @ Keesara (HMDA Approved · 25.5 Acres)",
  description:
    "Buy your plot and get it constructed as you like. Just 300m from ORR Exit 8. 320+ Open Plots. HMDA Approved 25.5 Acres. Call +91 90100 28800.",
  openGraph: {
    title: "Keesara.city — KVR Landmark-2 @ Keesara",
    description:
      "Buy your plot and get it constructed as you like. Just 300m from ORR Exit 8. 320+ Open Plots.",
    images: ["/images/mee-illu-mee-istam/villa-minimalist.jpg"],
  },
};

export default function MeeIlluMeeIstamPage() {
  return (
    <div className="min-h-screen bg-[#1e232d] text-slate-800 antialiased selection:bg-[#D96B43] selection:text-white pb-24">
      
      {/* ========================================================
          STICKY TOP CONTROL BAR
         ======================================================== */}
      <header className="sticky top-0 z-50 border-b border-white/10 bg-[#111622]/95 backdrop-blur-md px-4 sm:px-8 py-3 text-white shadow-xl">
        <div className="mx-auto flex max-w-5xl items-center justify-between gap-3">
          
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-amber-400 hover:text-amber-300 transition-colors"
            >
              <span>← Keesara.city</span>
            </Link>
            <span className="text-white/20 hidden sm:inline">|</span>
            <span className="hidden sm:inline-block text-xs font-semibold text-slate-300 uppercase tracking-widest font-serif">
              Official Brochure
            </span>
          </div>

          {/* Quick Page Jump Pills */}
          <nav className="hidden lg:flex items-center gap-1.5 text-[11px] font-bold">
            <a href="#page-1" className="rounded-md bg-white/10 px-2.5 py-1 text-slate-200 hover:bg-[#D96B43] hover:text-white transition-colors">
              01 Cover
            </a>
            <a href="#page-2" className="rounded-md bg-white/10 px-2.5 py-1 text-slate-200 hover:bg-[#D96B43] hover:text-white transition-colors">
              02 Location
            </a>
            <a href="#page-3" className="rounded-md bg-white/10 px-2.5 py-1 text-slate-200 hover:bg-[#D96B43] hover:text-white transition-colors">
              03 Exit 8 Advantage
            </a>
            <a href="#page-4" className="rounded-md bg-white/10 px-2.5 py-1 text-slate-200 hover:bg-[#D96B43] hover:text-white transition-colors">
              04 Designs
            </a>
            <a href="#page-5" className="rounded-md bg-white/10 px-2.5 py-1 text-slate-200 hover:bg-[#D96B43] hover:text-white transition-colors">
              05 Contact
            </a>
          </nav>

          <div className="flex items-center gap-2 sm:gap-3">
            <a
              href={HOUSE_AD.brochurePdf}
              download
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-lg border border-amber-500/40 bg-amber-500/15 px-3 py-1.5 text-xs font-bold text-amber-300 shadow-xs hover:bg-amber-500 hover:text-amber-950 transition-all"
            >
              <span>📥 Download PDF</span>
            </a>

            <a
              href={`tel:${HOUSE_AD.phoneRaw}`}
              className="inline-flex items-center gap-1.5 rounded-lg bg-[#D96B43] px-3.5 py-1.5 text-xs font-bold text-white shadow-md hover:bg-[#c25932] transition-colors"
            >
              <span>📞 {HOUSE_AD.phone}</span>
            </a>
          </div>

        </div>
      </header>

      {/* Main Multi-Page Brochure Container */}
      <main className="mx-auto max-w-4xl px-3 sm:px-6 pt-6 sm:pt-10 space-y-12 sm:space-y-16">

        {/* ========================================================
            PAGE 01 / 05 — COVER & HERO
           ======================================================== */}
        <section
          id="page-1"
          className="relative overflow-hidden rounded-3xl border border-white/15 bg-[#0D121F] text-white shadow-2xl flex flex-col justify-between"
        >
          {/* Top Bar on Page 1 */}
          <div className="flex items-center justify-between px-6 sm:px-10 pt-6 sm:pt-8">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-black/40 px-3.5 py-1 text-[11px] font-bold uppercase tracking-wider text-slate-200 backdrop-blur-md">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
              <span>HMDA APPROVED · 25.5 ACRES</span>
            </div>
            <span className="text-sm sm:text-base font-serif font-black tracking-[0.25em] text-[#D4AF37] uppercase">
              KEESARA.CITY
            </span>
          </div>

          {/* Hero Image Showcase */}
          <div className="relative mt-6 sm:mt-8 aspect-[16/10] sm:aspect-[16/9] w-full overflow-hidden border-y border-white/10 bg-slate-900">
            <Image
              src="/images/mee-illu-mee-istam/villa-minimalist.jpg"
              alt="Buy your plot and get it constructed as you like — Keesara.city"
              fill
              className="object-cover object-center"
              priority
              sizes="(max-width: 1024px) 100vw, 896px"
            />
          </div>

          {/* Page 1 Body Content */}
          <div className="px-6 sm:px-10 py-8 sm:py-10 space-y-6">
            <div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight font-sans leading-tight">
                Buy your plot and get it{" "}
                <span className="text-[#E07A5F]">constructed</span>
                <br />
                as you like.
              </h1>

              <div className="mt-4 flex flex-wrap items-center gap-4 sm:gap-6 text-sm sm:text-base text-slate-300 font-medium">
                <span className="inline-flex items-center gap-1.5 text-[#E07A5F]">
                  <span>📍</span>
                  <strong className="font-bold text-white">Just 300m from ORR Exit 8</strong>
                </span>
                <span className="text-white/30">•</span>
                <span className="font-semibold text-slate-200">320+ Open Plots</span>
              </div>
            </div>

            {/* Telugu Logo Display */}
            <div className="flex justify-center py-4">
              <div className="relative w-56 sm:w-64 h-24 sm:h-28 drop-shadow-2xl">
                <Image
                  src={HOUSE_AD.logoImage}
                  alt="మీ ఇల్లు మీ ఇష్టం Logo"
                  fill
                  className="object-contain"
                  priority
                />
              </div>
            </div>
          </div>

          {/* Page 1 Terracotta Footer Bar */}
          <div className="bg-[#C85A32] text-white px-6 sm:px-10 py-3.5 flex items-center justify-between font-bold text-xs sm:text-sm">
            <a href={`tel:${HOUSE_AD.phoneRaw}`} className="hover:underline flex items-center gap-2">
              <span>📞</span>
              <span>{HOUSE_AD.phone}</span>
            </a>
            <div className="flex items-center gap-3">
              <span className="font-normal text-white/80">keesara.city</span>
              <span className="rounded bg-black/20 px-2 py-0.5 text-[11px] font-mono font-bold tracking-wider">
                01 / 05
              </span>
            </div>
          </div>
        </section>

        {/* ========================================================
            PAGE 02 / 05 — EVERYTHING CLOSE. EVERYTHING CONNECTED.
           ======================================================== */}
        <section
          id="page-2"
          className="relative overflow-hidden rounded-3xl border border-line bg-[#fbfbf9] text-slate-900 shadow-2xl flex flex-col justify-between"
        >
          {/* Top Bar on Page 2 */}
          <div className="flex items-center justify-between px-6 sm:px-10 pt-6 sm:pt-8">
            <span className="text-xs sm:text-sm font-serif font-black tracking-[0.2em] text-slate-700 uppercase">
              KEESARA.CITY
            </span>
            <span className="rounded-md bg-slate-200/80 px-2.5 py-0.5 text-[11px] font-mono font-bold text-slate-700">
              02 / 05
            </span>
          </div>

          {/* Page 2 Title & HMDA Tag */}
          <div className="px-6 sm:px-10 pt-6 space-y-4">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
              Everything Close. Everything
              <br />
              Connected.
            </h2>

            <div className="inline-flex items-center gap-3.5 rounded-2xl border border-slate-200 bg-white p-3 shadow-xs">
              <div className="relative w-12 h-8 overflow-hidden rounded">
                <Image
                  src={HOUSE_AD.hmdaLogo}
                  alt="HMDA Certification"
                  fill
                  className="object-contain"
                />
              </div>
              <div>
                <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wide">
                  HUDA / HMDA Approved Layout
                </h4>
                <p className="text-[11px] text-slate-500 font-medium">
                  Fully sanctioned, gated community
                </p>
              </div>
            </div>
          </div>

          {/* Aerial Map View */}
          <div className="px-6 sm:px-10 py-6">
            <div className="relative aspect-[16/10] w-full overflow-hidden rounded-2xl border border-slate-300 shadow-md bg-slate-900">
              <Image
                src={HOUSE_AD.aerialMapImage}
                alt="ORR Exit 8 to KVR Landmark-2 Aerial Route Map (300 Meters)"
                fill
                className="object-cover object-center"
                sizes="(max-width: 1024px) 100vw, 896px"
              />
            </div>
          </div>

          {/* 6 Distances Grid (Matching PDF Page 2) */}
          <div className="px-6 sm:px-10 pb-8">
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {CONNECTIVITY_HIGHLIGHTS.map((item) => (
                <div
                  key={item.name}
                  className="rounded-xl border border-slate-200 bg-white p-4 shadow-xs"
                >
                  <span className="block text-[10px] font-bold uppercase tracking-wider text-slate-400">
                    {item.name}
                  </span>
                  <span className="mt-1 block text-2xl font-black text-slate-900">
                    {item.distance}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Page 2 Terracotta Footer Bar */}
          <div className="bg-[#C85A32] text-white px-6 sm:px-10 py-3.5 flex items-center justify-between font-bold text-xs sm:text-sm">
            <a href={`tel:${HOUSE_AD.phoneRaw}`} className="hover:underline flex items-center gap-2">
              <span>📞</span>
              <span>{HOUSE_AD.phone}</span>
            </a>
            <span className="text-xs font-normal text-white/90">
              Distances approximate, by road
            </span>
          </div>
        </section>

        {/* ========================================================
            PAGE 03 / 05 — THE EXIT 8 ADVANTAGE & PRICING
           ======================================================== */}
        <section
          id="page-3"
          className="relative overflow-hidden rounded-3xl border border-line bg-[#fbfbf9] text-slate-900 shadow-2xl flex flex-col justify-between"
        >
          {/* Top Bar on Page 3 */}
          <div className="flex items-center justify-between px-6 sm:px-10 pt-6 sm:pt-8">
            <span className="text-xs sm:text-sm font-serif font-black tracking-[0.2em] text-slate-700 uppercase">
              KEESARA.CITY
            </span>
            <span className="rounded-md bg-slate-200/80 px-2.5 py-0.5 text-[11px] font-mono font-bold text-slate-700">
              03 / 05
            </span>
          </div>

          {/* Title & Description */}
          <div className="px-6 sm:px-10 pt-6 space-y-3">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              The Exit 8 Advantage
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-2xl font-normal">
              Keesara City is a fully planned, HMDA-approved gated community — designed for families who want
              space to grow and a location that keeps them close to everything that matters.
            </p>
          </div>

          {/* 3 Dark Metric Boxes (Matching PDF Page 3) */}
          <div className="px-6 sm:px-10 pt-6">
            <div className="grid grid-cols-3 gap-3">
              <div className="rounded-xl bg-[#1a1e29] p-4 text-center text-white">
                <span className="block text-2xl sm:text-3xl font-black text-white">300m</span>
                <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-slate-400">
                  FROM ORR EXIT 8
                </span>
              </div>
              <div className="rounded-xl bg-[#1a1e29] p-4 text-center text-white">
                <span className="block text-2xl sm:text-3xl font-black text-[#E07A5F]">320+</span>
                <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-slate-400">
                  OPEN PLOTS
                </span>
              </div>
              <div className="rounded-xl bg-[#1a1e29] p-4 text-center text-white">
                <span className="block text-2xl sm:text-3xl font-black text-white">25.5</span>
                <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-slate-400">
                  ACRE COMMUNITY
                </span>
              </div>
            </div>
          </div>

          {/* Built for Everyday Ease Feature Box */}
          <div className="px-6 sm:px-10 pt-4">
            <div className="rounded-xl border border-slate-200 bg-white p-4 flex items-start gap-3 shadow-xs">
              <div className="rounded-lg bg-slate-100 p-2 text-base">🏛️</div>
              <div>
                <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wide">
                  Built for Everyday Ease
                </h4>
                <p className="text-xs text-slate-600 font-normal">
                  Wide internal roads (30&apos;–120&apos;), dedicated parks, and planned utilities.
                </p>
              </div>
            </div>
          </div>

          {/* Price Table (Matching PDF Page 3) */}
          <div className="px-6 sm:px-10 pt-6">
            <div className="overflow-hidden rounded-xl border border-slate-300 bg-white shadow-xs">
              <div className="bg-[#1a1e29] text-white px-5 py-2.5 flex items-center justify-between text-xs font-bold uppercase tracking-wider">
                <span>ORR CORRIDOR</span>
                <span>PRICE / SQ.YD</span>
              </div>
              <div className="divide-y divide-slate-200 text-xs sm:text-sm">
                <div className="flex items-center justify-between p-3.5 hover:bg-slate-50">
                  <span className="font-semibold text-slate-800">Exit 6 — Medchal</span>
                  <span className="font-bold text-slate-700">₹50,000 – ₹1,00,000</span>
                </div>
                <div className="flex items-center justify-between p-3.5 hover:bg-slate-50">
                  <span className="font-semibold text-slate-800">Exit 7 — Shamirpet</span>
                  <span className="font-bold text-slate-700">₹50,000 – ₹1,00,000</span>
                </div>
                <div className="flex items-center justify-between p-3.5 hover:bg-slate-50">
                  <span className="font-semibold text-slate-800">Exit 9 — Ghatkesar</span>
                  <span className="font-bold text-slate-700">₹50,000 – ₹70,000</span>
                </div>
                <div className="flex items-center justify-between p-3.5 bg-orange-50/80 border-l-4 border-l-[#C85A32]">
                  <span className="font-bold text-[#C85A32]">Exit 8 — Keesara City</span>
                  <span className="font-black text-[#C85A32] text-sm sm:text-base">₹30,000 – ₹35,000</span>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Villa Photo & Inventory Alert */}
          <div className="px-6 sm:px-10 py-6 space-y-4">
            <div className="relative aspect-[16/9] w-full overflow-hidden rounded-2xl border border-slate-300 shadow-md bg-slate-900">
              <Image
                src="/images/mee-illu-mee-istam/villa-contemporary.jpg"
                alt="Keesara City Modern Villa Architecture"
                fill
                className="object-cover object-center"
                sizes="(max-width: 1024px) 100vw, 896px"
              />
            </div>

            <p className="text-center text-sm font-bold text-[#C85A32]">
              Limited inventory remaining in this phase.
            </p>
          </div>

          {/* Page 3 Terracotta Footer Bar */}
          <div className="bg-[#C85A32] text-white px-6 sm:px-10 py-3.5 flex items-center justify-between font-bold text-xs sm:text-sm">
            <a href={`tel:${HOUSE_AD.phoneRaw}`} className="hover:underline flex items-center gap-2">
              <span>📞</span>
              <span>{HOUSE_AD.phone}</span>
            </a>
            <span className="text-xs font-normal text-white/90">
              HMDA Approved · 25.5 Acres
            </span>
          </div>
        </section>

        {/* ========================================================
            PAGE 04 / 05 — OWN A SLICE OF FREEDOM & 3 DESIGNS
           ======================================================== */}
        <section
          id="page-4"
          className="relative overflow-hidden rounded-3xl border border-line bg-[#fbfbf9] text-slate-900 shadow-2xl flex flex-col justify-between"
        >
          {/* Top Bar on Page 4 */}
          <div className="flex items-center justify-between px-6 sm:px-10 pt-6 sm:pt-8">
            <span className="text-xs sm:text-sm font-serif font-black tracking-[0.2em] text-slate-700 uppercase">
              KEESARA.CITY
            </span>
            <span className="rounded-md bg-slate-200/80 px-2.5 py-0.5 text-[11px] font-mono font-bold text-slate-700">
              04 / 05
            </span>
          </div>

          {/* Telugu Logo & Header */}
          <div className="px-6 sm:px-10 pt-4 text-center space-y-4">
            <div className="flex justify-center">
              <div className="relative w-44 sm:w-52 h-20 sm:h-24">
                <Image
                  src={HOUSE_AD.logoImage}
                  alt="మీ ఇల్లు మీ ఇష్టం"
                  fill
                  className="object-contain"
                />
              </div>
            </div>

            <div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
                Own a Slice of
                <br />
                Freedom
              </h2>
              <p className="mt-3 text-xs sm:text-sm text-slate-600 max-w-lg mx-auto leading-relaxed">
                As the builders and developers behind Keesara.city, our vision is simple — a thriving community of happy homeowners.
              </p>
            </div>

            <div className="inline-block rounded-md border border-slate-200 bg-white px-4 py-1.5 text-xs font-bold text-slate-700">
              POWERED BY <strong className="text-slate-900">Mee Illu – Mee Ishtam · Space Cult</strong>
            </div>

            <p className="text-base sm:text-lg font-bold italic text-[#C85A32] font-serif">
              &quot;Design and build it the way you want to — set your imagination free.&quot;
            </p>
          </div>

          {/* 3 House Designs Side by Side (Matching PDF Page 4) */}
          <div className="px-6 sm:px-10 py-6">
            <div className="grid gap-4 sm:grid-cols-3">
              {DESIGN_STYLES.map((style) => (
                <div key={style.id} className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xs">
                  <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-900">
                    <Image
                      src={style.image}
                      alt={style.title}
                      fill
                      className="object-cover object-center transition-transform duration-500 hover:scale-105"
                      sizes="(max-width: 768px) 100vw, 300px"
                    />
                  </div>
                  <div className="p-3.5 space-y-1">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#C85A32]">
                      {style.tag}
                    </span>
                    <h4 className="text-sm font-bold text-slate-900">
                      {style.title}
                    </h4>
                    <p className="text-[11px] text-slate-500 leading-relaxed line-clamp-2">
                      {style.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <p className="mt-6 text-center text-xs text-slate-600 font-medium">
              Traditional, contemporary, or minimalist — the design is yours to choose.
            </p>
          </div>

          {/* Page 4 Terracotta Footer Bar */}
          <div className="bg-[#C85A32] text-white px-6 sm:px-10 py-3.5 flex items-center justify-between font-bold text-xs sm:text-sm">
            <a href={`tel:${HOUSE_AD.phoneRaw}`} className="hover:underline flex items-center gap-2">
              <span>📞</span>
              <span>{HOUSE_AD.phone}</span>
            </a>
            <span className="text-xs font-normal text-white/90">
              HMDA Approved · 25.5 Acres
            </span>
          </div>
        </section>

        {/* ========================================================
            PAGE 05 / 05 — CONTACT FOR LAYOUT & AVAILABLE PLOTS
           ======================================================== */}
        <section
          id="page-5"
          className="relative overflow-hidden rounded-3xl border border-white/15 bg-[#0D121F] text-white shadow-2xl flex flex-col justify-between"
        >
          {/* Top Bar on Page 5 */}
          <div className="flex items-center justify-between px-6 sm:px-10 pt-6 sm:pt-8">
            <span className="text-sm sm:text-base font-serif font-black tracking-[0.25em] text-[#D4AF37] uppercase">
              KEESARA.CITY
            </span>
            <span className="rounded-md bg-white/10 px-2.5 py-0.5 text-[11px] font-mono font-bold text-slate-200">
              05 / 05
            </span>
          </div>

          {/* Center Logo & Title */}
          <div className="px-6 sm:px-10 pt-4 text-center space-y-4">
            <div className="flex justify-center">
              <div className="relative w-40 sm:w-48 h-16 sm:h-20">
                <Image
                  src={HOUSE_AD.logoImage}
                  alt="మీ ఇల్లు మీ ఇష్టం"
                  fill
                  className="object-contain"
                />
              </div>
            </div>

            <div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight font-sans">
                Contact for Layout
                <br />
                & Available Plots
              </h2>
              <p className="mt-2 text-xs sm:text-sm text-slate-300 max-w-md mx-auto">
                Walk the site, see the plots, hold your place at Hyderabad&apos;s fastest-growing urban extension.
              </p>
            </div>
          </div>

          {/* White Contact Info Card (Matching PDF Page 5) */}
          <div className="px-6 sm:px-10 py-6">
            <div className="rounded-2xl bg-white p-6 sm:p-8 text-slate-900 shadow-xl space-y-6">
              
              <div className="space-y-4 text-left">
                <div className="border-b border-slate-100 pb-3">
                  <span className="block text-[10px] font-bold uppercase tracking-wider text-slate-400">
                    WEBSITE
                  </span>
                  <a href="https://www.keesara.city" target="_blank" rel="noopener noreferrer" className="text-sm sm:text-base font-bold text-slate-900 hover:text-[#C85A32]">
                    www.keesara.city
                  </a>
                </div>

                <div className="border-b border-slate-100 pb-3">
                  <span className="block text-[10px] font-bold uppercase tracking-wider text-slate-400">
                    CALL
                  </span>
                  <a href={`tel:${HOUSE_AD.phoneRaw}`} className="text-sm sm:text-base font-bold text-slate-900 hover:text-[#C85A32]">
                    {HOUSE_AD.phone}
                  </a>
                </div>

                <div>
                  <span className="block text-[10px] font-bold uppercase tracking-wider text-slate-400">
                    EMAIL
                  </span>
                  <a href={`mailto:${HOUSE_AD.email}`} className="text-sm sm:text-base font-bold text-slate-900 hover:text-[#C85A32]">
                    {HOUSE_AD.email}
                  </a>
                </div>
              </div>

              <div className="flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-slate-50 py-2.5 text-xs font-bold text-slate-700">
                <span className="h-2 w-2 rounded-full bg-emerald-500"></span>
                <span>HUDA / HMDA Approved Layout</span>
              </div>

              {/* Action Buttons */}
              <div className="grid gap-3 sm:grid-cols-2">
                <a
                  href={`tel:${HOUSE_AD.phoneRaw}`}
                  className="flex items-center justify-center rounded-xl bg-[#C85A32] px-6 py-3.5 text-sm font-bold text-white shadow-md hover:bg-[#b54f2a] transition-colors"
                >
                  Call Now / Book a Visit
                </a>
                <a
                  href={`https://wa.me/${HOUSE_AD.whatsapp}?text=Hi%20Keesara%20City,%20I%20would%20like%20to%20book%20a%20site%20visit%20to%20KVR%20Landmark-2.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center rounded-xl bg-[#25D366] px-6 py-3.5 text-sm font-bold text-white shadow-md hover:bg-[#20ba5a] transition-colors"
                >
                  WhatsApp Booking
                </a>
              </div>

            </div>
          </div>

          {/* Interactive Consultation Form embedded */}
          <div className="px-6 sm:px-10 pb-8">
            <div className="mt-4">
              <ConsultationForm
                phone={HOUSE_AD.phone}
                phoneRaw={HOUSE_AD.phoneRaw}
                whatsapp={HOUSE_AD.whatsapp}
                email={HOUSE_AD.email}
                brochurePdf={HOUSE_AD.brochurePdf}
              />
            </div>
          </div>

          {/* Page 5 Terracotta Footer Bar */}
          <div className="bg-[#C85A32] text-white px-6 sm:px-10 py-3.5 flex items-center justify-between font-bold text-xs sm:text-sm">
            <a href={`tel:${HOUSE_AD.phoneRaw}`} className="hover:underline flex items-center gap-2">
              <span>📞</span>
              <span>{HOUSE_AD.phone}</span>
            </a>
            <div className="flex items-center gap-3">
              <span className="text-xs font-normal text-white/90">
                Digital Partner —{" "}
                <a href="https://www.dandora.online" target="_blank" rel="noopener noreferrer" className="underline font-bold">
                  www.dandora.online
                </a>
              </span>
              <span className="rounded bg-black/20 px-2 py-0.5 text-[11px] font-mono font-bold">
                05 / 05
              </span>
            </div>
          </div>
        </section>

      </main>
    </div>
  );
}
