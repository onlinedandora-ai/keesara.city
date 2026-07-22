"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";

type ConsultationFormProps = {
  phone: string;
  whatsapp: string;
};

export function ConsultationForm({ phone, whatsapp }: ConsultationFormProps) {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    plotStatus: "own-plot",
    houseType: "duplex",
    notes: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) return;

    setSubmitted(true);

    const message = `Hi Keesara Builders! My name is ${formData.name} (${formData.phone}).
Plot Status: ${formData.plotStatus === "own-plot" ? "I have my own plot" : "Looking for HMDA approved plot"}
House Type: ${formData.houseType}
Notes: ${formData.notes || "Interested in Mee Illu, Mee Istam consultation"}`;

    const url = `https://wa.me/${whatsapp}?text=${encodeURIComponent(message)}`;
    setTimeout(() => {
      window.open(url, "_blank");
    }, 400);
  };

  return (
    <div className="overflow-hidden rounded-3xl border border-line bg-card shadow-lg">
      <div className="grid lg:grid-cols-12">
        {/* Left Side Info */}
        <div className="lg:col-span-5 bg-gradient-to-br from-teal-950 via-slate-900 to-amber-950 p-8 text-white flex flex-col justify-between">
          <div className="space-y-6">
            <span className="inline-block rounded-full bg-amber-500/20 px-3 py-1 text-xs font-semibold text-amber-300 border border-amber-500/30">
              FREE CONSULTATION
            </span>
            <h3 className="text-2xl font-bold text-white leading-tight">
              Design Your House Just the Way You Want It
            </h3>
            <p className="text-sm text-amber-100/80 leading-relaxed">
              Our engineering & architecture team works directly with you. Fill in your details or connect with us directly via Phone or WhatsApp.
            </p>

            <div className="space-y-4 pt-4 border-t border-white/10">
              <div className="flex items-center gap-3.5">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-500/20 text-amber-300 text-lg border border-amber-500/30">
                  📞
                </div>
                <div>
                  <span className="block text-xs text-amber-200/70 font-medium">Direct Phone Helpline</span>
                  <a href={`tel:+919177000848`} className="text-base font-bold text-white hover:text-amber-300 transition-colors">
                    {phone}
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-3.5">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#25D366]/20 text-[#25D366] text-lg border border-[#25D366]/30">
                  💬
                </div>
                <div>
                  <span className="block text-xs text-amber-200/70 font-medium">WhatsApp Communication</span>
                  <a
                    href={`https://wa.me/${whatsapp}?text=Hi%20Keesara%20Builders,%20I%20am%20interested%20in%20Mee%20Illu,%20Mee%20Istam`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-base font-bold text-[#25D366] hover:underline"
                  >
                    +91 91 77000 848 (Click to Chat)
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 text-xs text-amber-200/50">
            Keesara Builders & Developers • Hyderabad & Keesara Growth Corridor
          </div>
        </div>

        {/* Right Side Form */}
        <div className="lg:col-span-7 p-8 bg-card">
          {submitted ? (
            <div className="flex flex-col items-center justify-center text-center py-12 space-y-4">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-teal-100 text-3xl text-teal-700">
                ✓
              </div>
              <h4 className="text-2xl font-bold text-teal-950">Thank You, {formData.name}!</h4>
              <p className="max-w-md text-sm text-ink-soft">
                Your consultation request has been received. We are redirecting you to WhatsApp to connect directly with our engineering head.
              </p>
              <a
                href={`https://wa.me/${whatsapp}?text=Hi%20Keesara%20Builders,%20my%20name%20is%20${encodeURIComponent(formData.name)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 inline-flex items-center gap-2 text-sm font-bold text-teal-700 hover:underline"
              >
                Click here if WhatsApp didn't open automatically →
              </a>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <h4 className="text-xl font-bold text-teal-950">
                Book a Free Custom Design Session
              </h4>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
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

                <div>
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
                  Plot Status
                </label>
                <div className="grid gap-3 sm:grid-cols-2">
                  <label
                    className={`flex cursor-pointer items-center gap-2.5 rounded-xl border p-3 text-xs font-semibold transition-all ${
                      formData.plotStatus === "own-plot"
                        ? "border-amber-500 bg-amber-500/10 text-amber-900"
                        : "border-line bg-background text-ink-soft"
                    }`}
                  >
                    <input
                      type="radio"
                      name="plotStatus"
                      value="own-plot"
                      checked={formData.plotStatus === "own-plot"}
                      onChange={(e) => setFormData({ ...formData, plotStatus: e.target.value })}
                      className="accent-amber-600"
                    />
                    <span>I already have my own plot</span>
                  </label>

                  <label
                    className={`flex cursor-pointer items-center gap-2.5 rounded-xl border p-3 text-xs font-semibold transition-all ${
                      formData.plotStatus === "hmda-plot"
                        ? "border-amber-500 bg-amber-500/10 text-amber-900"
                        : "border-line bg-background text-ink-soft"
                    }`}
                  >
                    <input
                      type="radio"
                      name="plotStatus"
                      value="hmda-plot"
                      checked={formData.plotStatus === "hmda-plot"}
                      onChange={(e) => setFormData({ ...formData, plotStatus: e.target.value })}
                      className="accent-amber-600"
                    />
                    <span>I need HMDA plot + construction</span>
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
                  className="w-full rounded-xl border border-line bg-background px-3.5 py-2.5 text-sm text-ink outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500"
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

              <Button type="submit" variant="amber" size="lg" className="w-full font-bold shadow-md">
                Submit & Connect via WhatsApp →
              </Button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
