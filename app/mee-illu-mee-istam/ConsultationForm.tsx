"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";

export type ConsultationFormProps = {
  phone: string;
  phoneRaw: string;
  whatsapp: string;
  email?: string;
  brochurePdf?: string;
};

export function ConsultationForm({
  phone,
  phoneRaw,
  whatsapp,
  email = "keesaracity.info@gmail.com",
  brochurePdf = "/keesara-city-brochure.pdf",
}: ConsultationFormProps) {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    plotStatus: "visit-layout",
    houseType: "Independent Villa",
    notes: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) return;

    setSubmitted(true);

    let statusText = "Book a Site Visit to KVR Landmark-2 (Exit 8)";
    if (formData.plotStatus === "own-plot") statusText = "I have my own plot (Need custom construction)";
    if (formData.plotStatus === "hmda-plot") statusText = "Looking for HMDA Approved Plot + Custom House";

    const message = `Hi Keesara City / KVR Landmark-2 Team!
My name is ${formData.name} (${formData.phone}).
Interest: ${statusText}
Preferred Style: ${formData.houseType}
Notes: ${formData.notes || "Please share available plots layout and schedule a consultation/site visit."}`;

    const url = `https://wa.me/${whatsapp}?text=${encodeURIComponent(message)}`;
    setTimeout(() => {
      window.open(url, "_blank");
    }, 400);
  };

  return (
    <div className="overflow-hidden rounded-2xl sm:rounded-3xl border border-line bg-card shadow-lg">
      <div className="flex flex-col lg:flex-row">
        {/* Left Side Info (Flexbox) */}
        <div className="w-full lg:w-5/12 bg-gradient-to-br from-teal-950 via-slate-900 to-amber-950 p-5 sm:p-8 text-white flex flex-col justify-between gap-6">
          <div className="space-y-4 sm:space-y-6">
            <span className="inline-block rounded-full bg-amber-500/20 px-3 py-1 text-xs font-semibold text-amber-300 border border-amber-500/30">
              FREE CONSULTATION & SITE VISIT
            </span>
            <h3 className="text-xl sm:text-2xl font-bold text-white leading-tight">
              Walk the Site & Design Your Dream Home
            </h3>
            <p className="text-xs sm:text-sm text-amber-100/80 leading-relaxed">
              Walk the site, explore 320+ HMDA-approved plots just 300m from ORR Exit 8, or consult our architecture team for building on your own plot.
            </p>

            <div className="space-y-3.5 pt-4 border-t border-white/10 flex flex-col">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 sm:h-10 sm:w-10 shrink-0 items-center justify-center rounded-xl bg-amber-500/20 text-amber-300 text-base sm:text-lg border border-amber-500/30">
                  📞
                </div>
                <div className="min-w-0">
                  <span className="block text-[11px] text-amber-200/70 font-medium">Direct Phone Helpline</span>
                  <a href={`tel:${phoneRaw}`} className="text-sm sm:text-base font-bold text-white hover:text-amber-300 transition-colors">
                    {phone}
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 sm:h-10 sm:w-10 shrink-0 items-center justify-center rounded-xl bg-[#25D366]/20 text-[#25D366] text-base sm:text-lg border border-[#25D366]/30">
                  💬
                </div>
                <div className="min-w-0">
                  <span className="block text-[11px] text-amber-200/70 font-medium">WhatsApp Direct</span>
                  <a
                    href={`https://wa.me/${whatsapp}?text=Hi%20Keesara%20City,%20I%20am%20interested%20in%20KVR%20Landmark-2%20plots%20and%20Mee%20Illu%20Mee%20Istam%20construction.`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm sm:text-base font-bold text-[#25D366] hover:underline"
                  >
                    {phone} (Click to Chat)
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 sm:h-10 sm:w-10 shrink-0 items-center justify-center rounded-xl bg-teal-500/20 text-teal-300 text-base sm:text-lg border border-teal-500/30">
                  ✉️
                </div>
                <div className="min-w-0">
                  <span className="block text-[11px] text-amber-200/70 font-medium">Email Support</span>
                  <a href={`mailto:${email}`} className="text-xs sm:text-sm font-semibold text-white hover:text-amber-300 transition-colors break-all">
                    {email}
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-2">
            <span className="text-[11px] text-amber-200/60">
              KVR Landmark-2 • ORR Exit 8, Keesara
            </span>
            <a
              href={brochurePdf}
              download
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-bold text-amber-400 hover:text-amber-300 underline"
            >
              Download Brochure (PDF) ↓
            </a>
          </div>
        </div>

        {/* Right Side Form (Flexbox) */}
        <div className="w-full lg:w-7/12 p-5 sm:p-8 bg-card flex flex-col justify-center">
          {submitted ? (
            <div className="flex flex-col items-center justify-center text-center py-10 space-y-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-teal-100 text-2xl text-teal-700">
                ✓
              </div>
              <h4 className="text-xl sm:text-2xl font-bold text-teal-950">Thank You, {formData.name}!</h4>
              <p className="max-w-md text-xs sm:text-sm text-ink-soft">
                Your consultation request has been received. We are redirecting you to WhatsApp to connect directly with our engineering head.
              </p>
              <a
                href={`https://wa.me/${whatsapp}?text=Hi%20Keesara%20Builders,%20my%20name%20is%20${encodeURIComponent(formData.name)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-teal-700 hover:underline"
              >
                Click here if WhatsApp didn&apos;t open automatically →
              </a>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
              <h4 className="text-lg sm:text-xl font-bold text-teal-950">
                Book a Free Custom Design Session
              </h4>

              <div className="flex flex-col sm:flex-row gap-3.5 sm:gap-4">
                <div className="flex-1">
                  <label className="block text-xs font-semibold uppercase tracking-wider text-ink-soft mb-1.5">
                    Your Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Ramesh Kumar"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full rounded-xl border border-line bg-background px-3.5 py-2.5 text-sm text-ink outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500"
                  />
                </div>

                <div className="flex-1">
                  <label className="block text-xs font-semibold uppercase tracking-wider text-ink-soft mb-1.5">
                    Mobile Number *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="e.g. 9876543210"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full rounded-xl border border-line bg-background px-3.5 py-2.5 text-sm text-ink outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-ink-soft mb-1.5">
                  Your Requirement / Interest
                </label>
                <div className="flex flex-col sm:flex-row gap-2 sm:gap-2.5">
                  <label
                    className={`flex-1 flex cursor-pointer flex-col justify-center rounded-xl border p-2.5 sm:p-3 text-xs font-semibold transition-all ${
                      formData.plotStatus === "visit-layout"
                        ? "border-amber-500 bg-amber-500/10 text-amber-950 ring-1 ring-amber-500"
                        : "border-line bg-background text-ink-soft hover:border-ink-soft"
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="plotStatus"
                        value="visit-layout"
                        checked={formData.plotStatus === "visit-layout"}
                        onChange={(e) => setFormData({ ...formData, plotStatus: e.target.value })}
                        className="accent-amber-600"
                      />
                      <span className="font-bold">Book Site Visit</span>
                    </div>
                    <span className="mt-0.5 text-[11px] font-normal text-ink-soft">
                      Explore 320+ plots @ Exit 8
                    </span>
                  </label>

                  <label
                    className={`flex-1 flex cursor-pointer flex-col justify-center rounded-xl border p-2.5 sm:p-3 text-xs font-semibold transition-all ${
                      formData.plotStatus === "hmda-plot"
                        ? "border-amber-500 bg-amber-500/10 text-amber-950 ring-1 ring-amber-500"
                        : "border-line bg-background text-ink-soft hover:border-ink-soft"
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="plotStatus"
                        value="hmda-plot"
                        checked={formData.plotStatus === "hmda-plot"}
                        onChange={(e) => setFormData({ ...formData, plotStatus: e.target.value })}
                        className="accent-amber-600"
                      />
                      <span className="font-bold">Plot + Build</span>
                    </div>
                    <span className="mt-0.5 text-[11px] font-normal text-ink-soft">
                      HMDA plot & custom villa
                    </span>
                  </label>

                  <label
                    className={`flex-1 flex cursor-pointer flex-col justify-center rounded-xl border p-2.5 sm:p-3 text-xs font-semibold transition-all ${
                      formData.plotStatus === "own-plot"
                        ? "border-amber-500 bg-amber-500/10 text-amber-950 ring-1 ring-amber-500"
                        : "border-line bg-background text-ink-soft hover:border-ink-soft"
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="plotStatus"
                        value="own-plot"
                        checked={formData.plotStatus === "own-plot"}
                        onChange={(e) => setFormData({ ...formData, plotStatus: e.target.value })}
                        className="accent-amber-600"
                      />
                      <span className="font-bold">Have Own Plot</span>
                    </div>
                    <span className="mt-0.5 text-[11px] font-normal text-ink-soft">
                      Turnkey construction only
                    </span>
                  </label>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-ink-soft mb-1.5">
                  Preferred Construction Type
                </label>
                <select
                  value={formData.houseType}
                  onChange={(e) => setFormData({ ...formData, houseType: e.target.value })}
                  className="w-full rounded-xl border border-line bg-background px-3.5 py-2.5 text-sm text-ink outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 cursor-pointer"
                >
                  <option value="Independent Villa">Independent Villa</option>
                  <option value="Duplex House">Duplex House</option>
                  <option value="G+2 / Multi-Storey">G+2 / Multi-Storey Building</option>
                  <option value="Commercial / Mixed Use">Commercial / Mixed Use</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-ink-soft mb-1.5">
                  Design Preferences / Notes
                </label>
                <textarea
                  rows={2}
                  placeholder="Describe your plot size, location or dream house requirements..."
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  className="w-full rounded-xl border border-line bg-background px-3.5 py-2.5 text-sm text-ink outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500"
                />
              </div>

              <Button type="submit" variant="amber" size="lg" className="w-full flex items-center justify-center font-bold shadow-md">
                Submit & Connect via WhatsApp →
              </Button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
