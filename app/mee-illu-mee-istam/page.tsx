import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  HOUSE_AD,
  ORR_PRICE_COMPARISON,
  CONNECTIVITY_HIGHLIGHTS,
  DESIGN_STYLES,
} from "@/lib/constants";
import { Badge } from "@/components/ui/Badge";
import { ConsultationForm } from "./ConsultationForm";

export const metadata: Metadata = {
  title: "KVR Landmark-2 @ Keesara — Mee Illu, Mee Istam (HMDA Approved 25.5 Acres)",
  description:
    "320+ HMDA-approved open plots just 300m from ORR Exit 8, Keesara. Custom architectural design & premium turnkey house construction. Call +91 90100 28800.",
  openGraph: {
    title: "మీ ఇల్లు మీ ఇష్టం — KVR Landmark-2 @ Keesara",
    description:
      "HMDA-approved 25.5 Acres community with 320+ open plots just 300m from ORR Exit 8. Build your plot and get it constructed as you like.",
    images: [HOUSE_AD.heroImage],
  },
};

export default function MeeIlluMeeIstamPage() {
  return (
    <div className="min-h-screen bg-slate-50/50 pb-20 selection:bg-amber-500 selection:text-white">
      {/* Top Header Navigation */}
      <header className="sticky top-0 z-30 border-b border-line bg-card/95 backdrop-blur-md px-4 sm:px-6 py-3.5">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-3">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-teal-800 hover:text-teal-900 transition-colors"
          >
            <span>← Back to Keesara.city</span>
          </Link>

          <div className="flex items-center gap-2 sm:gap-3">
            <div className="hidden sm:flex items-center gap-1.5 rounded-full border border-emerald-600/30 bg-emerald-50 px-3 py-1 text-[11px] font-bold text-emerald-800">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-600 animate-pulse"></span>
              <span>HMDA APPROVED · 25.5 ACRES</span>
            </div>

            <a
              href={HOUSE_AD.brochurePdf}
              download
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-lg border border-amber-300 bg-amber-50 px-3 py-1.5 text-xs font-bold text-amber-900 shadow-xs hover:bg-amber-100 transition-colors"
            >
              <span>📥 Brochure (PDF)</span>
            </a>

            <a
              href={`tel:${HOUSE_AD.phoneRaw}`}
              className="inline-flex items-center gap-1.5 rounded-lg bg-teal-800 px-3.5 py-1.5 text-xs font-bold text-white shadow-xs hover:bg-teal-900 transition-colors"
            >
              <span>📞 {HOUSE_AD.phone}</span>
            </a>
          </div>
        </div>
      </header>

      {/* Main Content Container */}
      <main className="mx-auto max-w-6xl px-4 sm:px-6 pt-6 sm:pt-8 space-y-12 sm:space-y-16">
        
        {/* ========================================================
            HERO SECTION (Page 1 of Brochure)
           ======================================================== */}
        <section className="overflow-hidden rounded-3xl border border-amber-500/30 bg-gradient-to-br from-slate-950 via-amber-950 to-slate-900 text-white shadow-2xl">
          <div className="grid lg:grid-cols-12 items-center gap-8 p-6 sm:p-10 lg:p-12">
            
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6">
              
              {/* Badges Bar */}
              <div className="flex flex-wrap items-center gap-2.5">
                <span className="inline-flex items-center gap-2 rounded-full border border-amber-400/40 bg-amber-500/15 px-3.5 py-1 text-[11px] font-bold uppercase tracking-wider text-amber-300 backdrop-blur-sm">
                  <span className="h-1.5 w-1.5 rounded-full bg-amber-400 animate-ping"></span>
                  KVR LANDMARK-2 @ KEESARA
                </span>
                <span className="inline-flex items-center rounded-full border border-white/20 bg-white/10 px-3 py-1 text-[11px] font-semibold text-slate-200">
                  HMDA Approved · 25.5 Acres
                </span>
              </div>

              {/* Title & Logo Showcase */}
              <div className="space-y-3">
                <div className="relative inline-block w-48 sm:w-56 h-16 sm:h-20 mb-1">
                  <Image
                    src={HOUSE_AD.logoImage}
                    alt="మీ ఇల్లు మీ ఇష్టం Logo"
                    fill
                    className="object-contain object-left drop-shadow-md"
                    priority
                  />
                </div>
                <h1 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl lg:text-5xl font-serif leading-tight">
                  Buy your plot and get it constructed{" "}
                  <span className="text-amber-400 underline decoration-amber-500/50 underline-offset-8">
                    as you like.
                  </span>
                </h1>
                <p className="text-base sm:text-lg font-medium text-amber-200/90 italic">
                  &quot;{HOUSE_AD.subTaglineTelugu}&quot;
                </p>
              </div>

              {/* Core Value Proposition Box */}
              <div className="rounded-2xl border border-amber-400/20 bg-white/5 p-5 sm:p-6 backdrop-blur-md">
                <p className="text-sm sm:text-base leading-relaxed text-amber-50/95 font-sans">
                  We believe your home should be built according to your taste, not someone else&apos;s design. Whether you buy one of our HMDA-approved plots at <strong className="text-amber-300 font-semibold">KVR Landmark-2</strong> or already have your own plot in Hyderabad/Keesara, <strong className="text-amber-300 font-semibold">Mee Illu, Mee Istam</strong> gives you full freedom. As an architecture & construction collaboration powered by <strong className="text-amber-200">Space Cult</strong>, we work directly with you from custom architectural drawings to key handover.
                </p>
              </div>

              {/* Quick Metrics Bar */}
              <div className="grid grid-cols-3 gap-3 py-1">
                <div className="rounded-xl border border-white/10 bg-white/5 p-3 text-center">
                  <span className="block text-xl sm:text-2xl font-black text-amber-400">300m</span>
                  <span className="text-[11px] sm:text-xs text-slate-300 font-medium">From ORR Exit 8</span>
                </div>
                <div className="rounded-xl border border-white/10 bg-white/5 p-3 text-center">
                  <span className="block text-xl sm:text-2xl font-black text-amber-400">320+</span>
                  <span className="text-[11px] sm:text-xs text-slate-300 font-medium">Open Plots</span>
                </div>
                <div className="rounded-xl border border-white/10 bg-white/5 p-3 text-center">
                  <span className="block text-xl sm:text-2xl font-black text-amber-400">25.5</span>
                  <span className="text-[11px] sm:text-xs text-slate-300 font-medium">Acres Community</span>
                </div>
              </div>

              {/* Direct CTA Action Buttons */}
              <div className="flex flex-wrap items-center gap-3.5 pt-2">
                <a
                  href={`tel:${HOUSE_AD.phoneRaw}`}
                  className="inline-flex items-center gap-2.5 rounded-xl bg-amber-500 px-5 sm:px-6 py-3.5 text-sm sm:text-base font-bold text-amber-950 shadow-lg hover:bg-amber-400 transition-all hover:scale-[1.02] active:scale-[0.98]"
                >
                  <svg className="h-5 w-5 fill-current" viewBox="0 0 24 24">
                    <path d="M6.62 10.79a15.053 15.053 0 006.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
                  </svg>
                  <span>Call {HOUSE_AD.phone}</span>
                </a>

                <a
                  href={`https://wa.me/${HOUSE_AD.whatsapp}?text=Hi%20Keesara%20City,%20I%20am%20interested%20in%20KVR%20Landmark-2%20plots%20and%20Mee%20Illu%20Mee%20Istam%20custom%20home%20design.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2.5 rounded-xl bg-[#25D366] px-5 sm:px-6 py-3.5 text-sm sm:text-base font-bold text-white shadow-lg hover:bg-[#20ba5a] transition-all hover:scale-[1.02] active:scale-[0.98]"
                >
                  <svg className="h-5 w-5 fill-current" viewBox="0 0 24 24">
                    <path d="M12.012 2c-5.506 0-9.989 4.478-9.99 9.984 0 1.76.459 3.474 1.333 4.988l-1.417 5.176 5.298-1.389c1.458.796 3.104 1.215 4.773 1.216h.004c5.505 0 9.988-4.478 9.989-9.985 0-2.668-1.038-5.177-2.924-7.063C17.19 3.039 14.68 2 12.012 2zm0 17.514h-.003c-1.492 0-2.955-.401-4.23-1.159l-.304-.18-3.145.824.839-3.064-.198-.315a8.318 8.318 0 01-1.274-4.444c.001-4.587 3.733-8.318 8.317-8.318 2.222 0 4.31.866 5.88 2.438 1.57 1.571 2.434 3.659 2.433 5.881-.001 4.588-3.732 8.317-8.315 8.317zm4.561-6.225c-.25-.125-1.478-.729-1.707-.812-.229-.083-.396-.125-.563.125-.167.25-.646.812-.792.979-.146.167-.292.188-.542.063-.25-.125-1.055-.389-2.01-1.24-.743-.663-1.245-1.482-1.391-1.732-.146-.25-.016-.385.109-.509.113-.112.25-.292.375-.438.125-.146.167-.25.25-.417.083-.167.042-.313-.021-.438-.063-.125-.563-1.354-.771-1.854-.203-.487-.41-.421-.563-.429-.146-.007-.313-.008-.479-.008s-.438.063-.667.313c-.229.25-.875.854-.875 2.083s.896 2.417 1.021 2.583c.125.167 1.763 2.693 4.27 3.776.596.257 1.062.411 1.425.526.599.19 1.144.163 1.575.099.48-.071 1.478-.604 1.687-1.188.208-.583.208-1.083.146-1.188-.063-.105-.229-.167-.479-.292z" />
                  </svg>
                  <span>WhatsApp Chat</span>
                </a>
              </div>

            </div>

            {/* Right Hero Image Card */}
            <div className="lg:col-span-5">
              <div className="relative overflow-hidden rounded-2xl border-2 border-amber-500/40 bg-white p-2.5 shadow-2xl">
                <div className="relative aspect-[960/640] w-full overflow-hidden rounded-xl bg-[#faf6ee]">
                  <Image
                    src={HOUSE_AD.heroImage}
                    alt="Mee Illu, Mee Istam — Custom Villa Architecture in Keesara"
                    fill
                    className="object-contain object-center"
                    priority
                    sizes="(max-width: 768px) 100vw, 550px"
                  />
                </div>
                <div className="mt-3 px-2 text-center">
                  <div className="flex items-center justify-center gap-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-amber-900">
                      KVR Landmark-2 @ Keesara
                    </span>
                    <span className="h-1 w-1 rounded-full bg-amber-600"></span>
                    <span className="text-xs font-semibold text-emerald-700">HMDA Approved</span>
                  </div>
                  <p className="text-[11px] text-slate-600 font-medium mt-0.5">
                    320+ Open Plots • 300m from ORR Exit 8 • Turnkey Custom Construction
                  </p>
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* ========================================================
            LOCATION & CONNECTIVITY SECTION (Page 2 of Brochure)
           ======================================================== */}
        <section className="space-y-6">
          <div className="text-center max-w-3xl mx-auto space-y-2">
            <div className="inline-flex items-center gap-2 rounded-full border border-teal-600/30 bg-teal-50 px-4 py-1 text-xs font-bold text-teal-800">
              <span>LOCATION & CONNECTIVITY</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-teal-950 font-serif">
              Everything Close. Everything Connected.
            </h2>
            <p className="text-sm sm:text-base text-ink-soft">
              <strong className="text-teal-900 font-semibold">HUDA / HMDA Approved Layout</strong> — Fully sanctioned, gated community located just 300 meters from ORR Exit 8 on ECIL - Keesara Road.
            </p>
          </div>

          {/* Aerial Map Display Card */}
          <div className="overflow-hidden rounded-3xl border border-line bg-card shadow-lg">
            <div className="relative aspect-[16/9] w-full overflow-hidden bg-slate-900">
              <Image
                src={HOUSE_AD.aerialMapImage}
                alt="ORR Exit 8 to KVR Landmark-2 Keesara 3D Aerial Route Map (300 Meters)"
                fill
                className="object-cover object-center"
                sizes="(max-width: 1200px) 100vw, 1200px"
              />
              <div className="absolute left-4 top-4 z-10 rounded-xl bg-slate-950/80 backdrop-blur-md px-3.5 py-2 border border-white/20 text-white">
                <span className="block text-[10px] uppercase font-bold text-amber-400 tracking-wider">
                  Direct Route Access
                </span>
                <span className="text-xs sm:text-sm font-bold">
                  Just 300m from ORR Exit 8 Toll Plaza
                </span>
              </div>
              <div className="absolute right-4 bottom-4 z-10 hidden sm:block rounded-xl bg-slate-950/85 backdrop-blur-md px-4 py-2 border border-white/20 text-right text-white">
                <span className="block text-xs font-bold text-emerald-400">
                  LIVE | INVEST | BELONG
                </span>
                <span className="text-[11px] text-slate-300">
                  AT KEESARA (KVR LANDMARK-2)
                </span>
              </div>
            </div>

            {/* Connectivity Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 divide-y sm:divide-y-0 sm:divide-x divide-line bg-slate-50/70 p-4">
              {CONNECTIVITY_HIGHLIGHTS.map((item) => (
                <div key={item.name} className="p-3 text-center space-y-1">
                  <span className="inline-block rounded-full bg-teal-100/80 px-2 py-0.5 text-[10px] font-bold text-teal-800 uppercase tracking-wider">
                    {item.label}
                  </span>
                  <p className="text-xs font-bold text-ink truncate" title={item.name}>
                    {item.name}
                  </p>
                  <p className="text-base font-black text-teal-900">{item.distance}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ========================================================
            THE EXIT 8 ADVANTAGE & PRICING (Page 3 of Brochure)
           ======================================================== */}
        <section className="rounded-3xl border border-amber-500/30 bg-gradient-to-br from-amber-50/50 via-white to-orange-50/40 p-6 sm:p-10 shadow-sm space-y-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div className="space-y-2 max-w-2xl">
              <div className="inline-flex items-center gap-1.5 rounded-full bg-amber-500/15 border border-amber-500/30 px-3.5 py-1 text-xs font-bold text-amber-800">
                <span>INVESTMENT & VALUE APPRECIATION</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-teal-950 font-serif">
                The Exit 8 Advantage
              </h2>
              <p className="text-sm sm:text-base text-ink-soft leading-relaxed">
                Keesara City is a fully planned, HMDA-approved gated community — designed for families who want space to grow and a location that keeps them close to everything that matters.
              </p>
            </div>
            <div className="inline-flex items-center gap-2 rounded-xl bg-amber-500/10 border border-amber-500/30 px-4 py-2 text-xs font-bold text-amber-900">
              <span>⚠️ Limited inventory remaining in this phase</span>
            </div>
          </div>

          {/* Infrastructure Highlights */}
          <div className="grid sm:grid-cols-3 gap-4">
            <div className="rounded-2xl border border-line bg-card p-5 shadow-xs">
              <span className="text-2xl">🛣️</span>
              <h4 className="mt-2 text-base font-bold text-teal-950">Wide Internal Roads</h4>
              <p className="mt-1 text-xs text-ink-soft">30&apos; to 120&apos; blacktop internal layout roads with avenue plantation.</p>
            </div>
            <div className="rounded-2xl border border-line bg-card p-5 shadow-xs">
              <span className="text-2xl">🌳</span>
              <h4 className="mt-2 text-base font-bold text-teal-950">Dedicated Parks & Utilities</h4>
              <p className="mt-1 text-xs text-ink-soft">Planned green zones, children play areas, and underground electrical / water lines.</p>
            </div>
            <div className="rounded-2xl border border-line bg-card p-5 shadow-xs">
              <span className="text-2xl">🛡️</span>
              <h4 className="mt-2 text-base font-bold text-teal-950">Fully Sanctioned Layout</h4>
              <p className="mt-1 text-xs text-ink-soft">100% clear title, HUDA / HMDA approved gated layout ready for immediate construction.</p>
            </div>
          </div>

          {/* Price Comparison Table */}
          <div className="overflow-hidden rounded-2xl border border-line bg-card shadow-sm">
            <div className="bg-slate-900 px-6 py-3.5 text-white flex items-center justify-between">
              <div>
                <h4 className="text-sm font-bold uppercase tracking-wider text-amber-300">
                  PRICE / SQ.YD — ACROSS ORR EXITS
                </h4>
                <p className="text-xs text-slate-300">Comparing land rates along Hyderabad Outer Ring Road</p>
              </div>
              <span className="text-xs font-semibold text-slate-400 hidden sm:inline">Outer Ring Road Corridor</span>
            </div>

            <div className="divide-y divide-line">
              {ORR_PRICE_COMPARISON.map((row) => (
                <div
                  key={row.exit}
                  className={`flex items-center justify-between p-4 sm:px-6 transition-colors ${
                    row.isBestValue
                      ? "bg-amber-500/10 border-l-4 border-l-amber-500 font-bold"
                      : "hover:bg-slate-50"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className={`text-xs px-2.5 py-1 rounded-md font-bold ${
                      row.isBestValue
                        ? "bg-amber-500 text-amber-950"
                        : "bg-slate-100 text-slate-700"
                    }`}>
                      {row.exit}
                    </span>
                    <div>
                      <span className="text-sm text-ink">{row.corridor}</span>
                      {row.isBestValue && (
                        <span className="ml-2 inline-block rounded-full bg-emerald-100 px-2 py-0.5 text-[10px] font-bold text-emerald-800">
                          ⭐ High ROI & Maximum Value
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="text-right">
                    <span className={`text-sm sm:text-base ${
                      row.isBestValue ? "text-amber-900 font-black text-lg" : "text-ink-soft font-semibold"
                    }`}>
                      {row.priceRange}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ========================================================
            OWN A SLICE OF FREEDOM & ARCHITECTURAL STYLES (Page 4 of Brochure)
           ======================================================== */}
        <section className="space-y-8">
          <div className="text-center max-w-3xl mx-auto space-y-2">
            <div className="inline-flex items-center gap-2 rounded-full border border-amber-600/30 bg-amber-50 px-4 py-1 text-xs font-bold text-amber-800">
              <span>POWERED BY MEE ILLU – MEE ISHTAM · SPACE CULT</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-teal-950 font-serif">
              Own a Slice of Freedom
            </h2>
            <p className="text-base sm:text-lg font-medium text-amber-900 italic">
              &quot;Design and build it the way you want to — set your imagination free.&quot;
            </p>
            <p className="text-xs sm:text-sm text-ink-soft max-w-xl mx-auto">
              Traditional, contemporary, or minimalist — the architectural design is yours to choose.
            </p>
          </div>

          {/* 3 Architectural Styles Grid */}
          <div className="grid gap-6 md:grid-cols-3">
            {DESIGN_STYLES.map((style) => (
              <div
                key={style.title}
                className="group flex flex-col justify-between rounded-3xl border border-line bg-card p-6 shadow-sm hover:shadow-xl transition-all hover:border-amber-400"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-wider text-amber-700 bg-amber-50 border border-amber-200 px-2.5 py-1 rounded-lg">
                      {style.tag}
                    </span>
                    <span className="text-xs text-ink-mute">Mee Illu Choice</span>
                  </div>
                  <h3 className="text-xl font-bold text-teal-950 group-hover:text-amber-800 transition-colors">
                    {style.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-ink-soft leading-relaxed">
                    {style.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-line flex items-center justify-between">
                  <span className="text-xs font-semibold text-teal-800">Custom Engineering</span>
                  <span className="text-xs font-bold text-amber-600 group-hover:translate-x-1 transition-transform">
                    Tailored to Plot →
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ========================================================
            CAMPAIGN BANNER DISPLAY
           ======================================================== */}
        <section className="overflow-hidden rounded-2xl border border-line bg-card p-4 shadow-sm">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-3 px-2">
            <div>
              <h3 className="text-lg font-bold text-teal-950">
                Official Media Announcement
              </h3>
              <p className="text-xs text-ink-soft">
                Keesara Builders & Developers • KVR Landmark-2 Campaign
              </p>
            </div>
            <a
              href={`tel:${HOUSE_AD.phoneRaw}`}
              className="text-xs font-bold text-amber-700 hover:text-amber-800 bg-amber-50 border border-amber-200 px-3 py-1.5 rounded-lg"
            >
              📞 Direct Helpline: {HOUSE_AD.phone}
            </a>
          </div>
          <div className="flex items-center justify-center w-full overflow-hidden rounded-xl border border-amber-200 bg-[#faf6ee] shadow-inner">
            <Image
              src={HOUSE_AD.bannerImage}
              alt="Mee Illu Mee Istam Full Campaign Banner"
              width={1024}
              height={394}
              className="w-full h-auto object-contain"
              sizes="(max-width: 1200px) 100vw, 1200px"
            />
          </div>
        </section>

        {/* ========================================================
            CONSULTATION FORM & CONTACT (Page 5 of Brochure)
           ======================================================== */}
        <section id="consultation-form" className="space-y-4">
          <div className="text-center max-w-2xl mx-auto space-y-1 mb-6">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-700">
              SITE VISIT & CONSULTATION
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-teal-950 font-serif">
              Contact for Layout & Available Plots
            </h2>
            <p className="text-xs sm:text-sm text-ink-soft">
              Walk the site, see the plots, hold your place at Hyderabad&apos;s fastest-growing urban extension.
            </p>
          </div>

          <ConsultationForm
            phone={HOUSE_AD.phone}
            phoneRaw={HOUSE_AD.phoneRaw}
            whatsapp={HOUSE_AD.whatsapp}
            email={HOUSE_AD.email}
            brochurePdf={HOUSE_AD.brochurePdf}
          />
        </section>

        {/* ========================================================
            CREDENTIALS FOOTER
           ======================================================== */}
        <footer className="rounded-2xl border border-line bg-card p-6 text-center space-y-3">
          <div className="flex flex-wrap items-center justify-center gap-6 text-xs text-ink-soft">
            <span className="font-semibold text-teal-950">Keesara City • KVR Landmark-2</span>
            <span>•</span>
            <span>HUDA / HMDA Approved Layout</span>
            <span>•</span>
            <span>Helpline: {HOUSE_AD.phone}</span>
            <span>•</span>
            <span>Email: {HOUSE_AD.email}</span>
          </div>
          <div className="text-[11px] text-ink-mute">
            Digital Partner —{" "}
            <a
              href="https://www.dandora.online"
              target="_blank"
              rel="noopener noreferrer"
              className="font-bold text-teal-800 hover:underline"
            >
              www.dandora.online
            </a>
          </div>
        </footer>

      </main>
    </div>
  );
}
