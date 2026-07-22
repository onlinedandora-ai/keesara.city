import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { HOUSE_AD } from "@/lib/constants";
import { Badge } from "@/components/ui/Badge";
import { ConsultationForm } from "./ConsultationForm";

export const metadata: Metadata = {
  title: "Mee Illu, Mee Istam — Keesara Builders & Developers",
  description:
    "We believe your home should be built according to your taste. Custom architecture & quality construction in Hyderabad & Keesara. Call +91 91 77000 848.",
  openGraph: {
    title: "మీ ఇల్లు మీ ఇష్టం — Keesara Builders & Developers",
    description:
      "Custom home design & construction on HMDA-approved plots or your own plot in Hyderabad & Keesara.",
    images: [HOUSE_AD.heroImage],
  },
};

export default function MeeIlluMeeIstamPage() {
  return (
    <div className="min-h-screen bg-slate-50/50 pb-16">
      {/* Header Breadcrumb */}
      <div className="border-b border-line bg-card px-6 py-4">
        <div className="mx-auto flex max-w-6xl items-center justify-between">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm font-semibold text-teal-700 hover:text-teal-800 transition-colors"
          >
            <span>← Back to Keesara.city</span>
          </Link>
          <div className="flex items-center gap-2">
            <Badge variant="featured">Featured Builder</Badge>
            <span className="text-xs font-semibold text-ink-mute">Keesara, Telangana</span>
          </div>
        </div>
      </div>

      {/* Main Container */}
      <div className="mx-auto max-w-6xl px-6 pt-8">
        
        {/* Banner Hero Display */}
        <div className="overflow-hidden rounded-3xl border border-amber-500/20 bg-gradient-to-br from-amber-900 via-amber-950 to-slate-900 text-white shadow-xl">
          <div className="grid lg:grid-cols-12 items-center gap-8 p-6 md:p-10">
            
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2.5 rounded-full border border-amber-500/30 bg-amber-500/10 px-4 py-1.5 text-xs font-semibold text-amber-300 backdrop-blur-sm">
                <span>KEESARA BUILDERS & DEVELOPERS</span>
                <span className="h-1 w-1 rounded-full bg-amber-400"></span>
                <span>నాణ్యత | నమ్మకం | భవిష్యత్తు</span>
              </div>

              <div>
                <h1 className="text-4xl font-extrabold tracking-tight text-white md:text-5xl lg:text-6xl font-serif">
                  మీ ఇల్లు <span className="text-amber-400 underline decoration-amber-500/40 underline-offset-8">మీ ఇష్టం</span>
                </h1>
                <p className="mt-3 text-lg font-medium text-amber-200/90 italic md:text-xl">
                  "ఆ కలను నిజం చేసే నమ్మకమైన భాగస్వామి"
                </p>
              </div>

              {/* Main Message Box Requested by User */}
              <div className="rounded-2xl border border-amber-400/20 bg-white/5 p-6 backdrop-blur-md">
                <p className="text-base leading-relaxed text-amber-50 md:text-lg font-sans">
                  We believe your home should be built according to your taste, not someone else's design. Whether you buy one of our HMDA-approved plots in Hyderabad or already have your own plot, <strong className="text-amber-300 font-semibold">Mee Illu, Mee Istam</strong> gives you full freedom. As an architecture and construction company, we don't force fixed plans on you. Instead, our team works directly with you to design your house just the way you want it, build it with top quality, and hand over the keys to your dream home.
                </p>
              </div>

              {/* Direct Call & WhatsApp Actions */}
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <a
                  href={`tel:${HOUSE_AD.phoneRaw}`}
                  className="inline-flex items-center gap-3 rounded-xl bg-amber-500 px-6 py-3.5 text-base font-bold text-amber-950 shadow-lg hover:bg-amber-400 transition-all hover:scale-[1.02] active:scale-[0.98]"
                >
                  <svg className="h-5 w-5 fill-current" viewBox="0 0 24 24">
                    <path d="M6.62 10.79a15.053 15.053 0 006.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
                  </svg>
                  <span>Call {HOUSE_AD.phone}</span>
                </a>

                <a
                  href={`https://wa.me/${HOUSE_AD.whatsapp}?text=Hi%20Keesara%20Builders,%20I%20am%20interested%20in%20Mee%20Illu,%20Mee%20Istam%20custom%20home%20design.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 rounded-xl bg-[#25D366] px-6 py-3.5 text-base font-bold text-white shadow-lg hover:bg-[#20ba5a] transition-all hover:scale-[1.02] active:scale-[0.98]"
                >
                  <svg className="h-5 w-5 fill-current" viewBox="0 0 24 24">
                    <path d="M12.012 2c-5.506 0-9.989 4.478-9.99 9.984 0 1.76.459 3.474 1.333 4.988l-1.417 5.176 5.298-1.389c1.458.796 3.104 1.215 4.773 1.216h.004c5.505 0 9.988-4.478 9.989-9.985 0-2.668-1.038-5.177-2.924-7.063C17.19 3.039 14.68 2 12.012 2zm0 17.514h-.003c-1.492 0-2.955-.401-4.23-1.159l-.304-.18-3.145.824.839-3.064-.198-.315a8.318 8.318 0 01-1.274-4.444c.001-4.587 3.733-8.318 8.317-8.318 2.222 0 4.31.866 5.88 2.438 1.57 1.571 2.434 3.659 2.433 5.881-.001 4.588-3.732 8.317-8.315 8.317zm4.561-6.225c-.25-.125-1.478-.729-1.707-.812-.229-.083-.396-.125-.563.125-.167.25-.646.812-.792.979-.146.167-.292.188-.542.063-.25-.125-1.055-.389-2.01-1.24-.743-.663-1.245-1.482-1.391-1.732-.146-.25-.016-.385.109-.509.113-.112.25-.292.375-.438.125-.146.167-.25.25-.417.083-.167.042-.313-.021-.438-.063-.125-.563-1.354-.771-1.854-.203-.487-.41-.421-.563-.429-.146-.007-.313-.008-.479-.008s-.438.063-.667.313c-.229.25-.875.854-.875 2.083s.896 2.417 1.021 2.583c.125.167 1.763 2.693 4.27 3.776.596.257 1.062.411 1.425.526.599.19 1.144.163 1.575.099.48-.071 1.478-.604 1.687-1.188.208-.583.208-1.083.146-1.188-.063-.105-.229-.167-.479-.292z" />
                  </svg>
                  <span>Chat on WhatsApp</span>
                </a>
              </div>

            </div>

            {/* Right Hero Image Card */}
            <div className="lg:col-span-5">
              <div className="relative overflow-hidden rounded-2xl border-2 border-amber-500/40 bg-white p-2 shadow-2xl">
                <div className="relative aspect-[960/640] w-full overflow-hidden rounded-xl bg-[#faf6ee]">
                  <Image
                    src={HOUSE_AD.heroImage}
                    alt="Mee Illu, Mee Istam — Family Dream Home Design"
                    fill
                    className="object-contain object-center"
                    priority
                    sizes="(max-width: 768px) 100vw, 600px"
                  />
                </div>
                <div className="mt-3 px-2 text-center">
                  <p className="text-xs font-semibold uppercase tracking-wider text-amber-900">
                    Custom Built Homes in Hyderabad & Keesara
                  </p>
                  <p className="text-[11px] text-slate-600 font-medium">
                    Work directly with our engineering team • Turnkey Handover
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Banner Telugu Graphic Section */}
        <div className="mt-10 overflow-hidden rounded-2xl border border-line bg-card p-4 shadow-sm">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-3 px-2">
            <div>
              <h2 className="text-xl font-bold text-teal-950">
                Official Campaign Banner
              </h2>
              <p className="text-xs text-ink-soft">
                Keesara Builders & Developers — Official Media Announcement
              </p>
            </div>
            <a
              href={`tel:${HOUSE_AD.phoneRaw}`}
              className="text-xs font-bold text-amber-600 hover:text-amber-700 bg-amber-50 border border-amber-200 px-3 py-1.5 rounded-lg"
            >
              📞 Direct Helpline: {HOUSE_AD.phone}
            </a>
          </div>
          <div className="relative aspect-[1024/394] w-full overflow-hidden rounded-xl border border-amber-200 bg-[#faf6ee] shadow-inner">
            <Image
              src={HOUSE_AD.bannerImage}
              alt="Mee Illu Mee Istam Full Campaign Banner"
              fill
              className="object-contain object-center"
              sizes="(max-width: 1200px) 100vw, 1200px"
            />
          </div>
        </div>

        {/* Key Features Grid */}
        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-2xl border border-line bg-card p-6 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-amber-100 text-2xl text-amber-700">
              🏗️
            </div>
            <h3 className="mt-4 text-lg font-bold text-teal-950">నాణ్యమైన నిర్మాణం</h3>
            <p className="mt-1.5 text-sm text-ink-soft leading-relaxed">
              Top-tier building materials, tested concrete structures, and expert site supervision from foundation to finishing.
            </p>
          </div>

          <div className="rounded-2xl border border-line bg-card p-6 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-teal-100 text-2xl text-teal-700">
              🤝
            </div>
            <h3 className="mt-4 text-lg font-bold text-teal-950">నమ్మకమైన సేవ</h3>
            <p className="mt-1.5 text-sm text-ink-soft leading-relaxed">
              100% transparent pricing, stage-wise updates, and direct communication with architectural team.
            </p>
          </div>

          <div className="rounded-2xl border border-line bg-card p-6 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-amber-100 text-2xl text-amber-700">
              ⏱️
            </div>
            <h3 className="mt-4 text-lg font-bold text-teal-950">సమయానికి పూర్తి</h3>
            <p className="mt-1.5 text-sm text-ink-soft leading-relaxed">
              Strict timeline commitments with penalty-backed milestone schedules and key handover on time.
            </p>
          </div>

          <div className="rounded-2xl border border-line bg-card p-6 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-teal-100 text-2xl text-teal-700">
              🏡
            </div>
            <h3 className="mt-4 text-lg font-bold text-teal-950">మెరుగైన జీవన ప్రమాణం</h3>
            <p className="mt-1.5 text-sm text-ink-soft leading-relaxed">
              HMDA-approved layout plots in Hyderabad or custom architectural planning on your existing plot.
            </p>
          </div>
        </div>

        {/* Consultation Form & Contact Card */}
        <div className="mt-12">
          <ConsultationForm phone={HOUSE_AD.phone} whatsapp={HOUSE_AD.whatsapp} />
        </div>

      </div>
    </div>
  );
}
