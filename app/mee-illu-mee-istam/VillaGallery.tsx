"use client";

import { useState } from "react";
import Image from "next/image";
import { ALL_VILLA_DESIGNS } from "@/lib/constants";

export function VillaGallery({ whatsapp }: { whatsapp: string }) {
  const [selectedImage, setSelectedImage] = useState<(typeof ALL_VILLA_DESIGNS)[number] | null>(null);
  const [activeFilter, setActiveFilter] = useState<string>("All");

  const filters = ["All", "Traditional", "Minimalist", "Geometric Luxury", "Contemporary", "Modern"];

  const filteredDesigns = activeFilter === "All"
    ? ALL_VILLA_DESIGNS
    : ALL_VILLA_DESIGNS.filter((d) =>
        d.tag.toLowerCase().includes(activeFilter.toLowerCase()) ||
        d.title.toLowerCase().includes(activeFilter.toLowerCase())
      );

  return (
    <div className="mt-8 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-t border-slate-200 pt-6">
        <div>
          <h3 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
            Explore 12+ Custom Villa Elevations
          </h3>
          <p className="text-xs sm:text-sm text-slate-500 font-medium">
            Click any render to view high-resolution elevation & request customized floor plan
          </p>
        </div>


        {/* Filter Badges */}
        <div className="flex flex-wrap items-center gap-1.5">
          {filters.map((filter) => (
            <button
              key={filter}
              type="button"
              onClick={() => setActiveFilter(filter)}
              className={`rounded-lg px-3 py-1 text-xs font-bold transition-all cursor-pointer ${
                activeFilter === filter
                  ? "bg-[#C85A32] text-white shadow-xs"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              {filter}
            </button>
          ))}
        </div>
      </div>

      {/* Grid of 10 Villa Designs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredDesigns.map((villa) => (
          <div
            key={villa.id}
            onClick={() => setSelectedImage(villa)}
            className="group relative cursor-pointer overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xs transition-all duration-300 hover:shadow-xl hover:-translate-y-1 hover:border-amber-500/40"
          >
            <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-900">
              <Image
                src={villa.image}
                alt={villa.title}
                fill
                className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-3.5">
                <span className="inline-flex items-center gap-1.5 rounded-lg bg-white/95 px-2.5 py-1 text-xs font-bold text-slate-900 shadow-md backdrop-blur-xs">
                  <span>🔍 Click to Expand</span>
                </span>
              </div>
              <div className="absolute top-2.5 left-2.5">
                <span className="inline-block rounded-md bg-black/70 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-amber-300 backdrop-blur-xs">
                  {villa.tag}
                </span>
              </div>
            </div>

            <div className="p-3.5 space-y-1">
              <h4 className="text-sm font-bold text-slate-900 group-hover:text-[#C85A32] transition-colors line-clamp-1">
                {villa.title}
              </h4>
              <p className="text-[11px] text-slate-500 leading-relaxed line-clamp-2">
                {villa.description}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* High-Resolution Modal Preview */}
      {selectedImage && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-3 sm:p-6 backdrop-blur-md animate-fade-in"
          onClick={() => setSelectedImage(null)}
        >
          <div
            className="relative max-w-4xl w-full overflow-hidden rounded-2xl bg-white shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative aspect-[16/11] sm:aspect-[16/10] w-full bg-slate-950">
              <Image
                src={selectedImage.image}
                alt={selectedImage.title}
                fill
                className="object-contain"
                priority
                sizes="(max-width: 1024px) 100vw, 1024px"
              />
              <button
                type="button"
                onClick={() => setSelectedImage(null)}
                aria-label="Close modal"
                className="absolute top-3 right-3 flex h-9 w-9 items-center justify-center rounded-full bg-black/70 text-white hover:bg-black font-bold transition-all shadow-lg cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="p-5 sm:p-6 bg-white flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="space-y-1">
                <div className="inline-block rounded-md bg-amber-500/15 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-[#C85A32]">
                  {selectedImage.tag}
                </div>
                <h3 className="text-lg sm:text-xl font-black text-slate-900">
                  {selectedImage.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 max-w-xl">
                  {selectedImage.description}
                </p>
              </div>

              <div className="flex items-center gap-2.5 shrink-0">
                <a
                  href={`https://wa.me/${whatsapp}?text=${encodeURIComponent(
                    `Hi Keesara Builders! I am interested in building the '${selectedImage.title}' design (${selectedImage.tag}) at KVR Landmark-2 @ Keesara. Please share sample floor plans and cost estimation.`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-xl bg-[#25D366] px-4 py-2.5 text-xs sm:text-sm font-bold text-white shadow-md hover:bg-[#20ba5a] transition-all"
                >
                  <span>💬 Inquire on WhatsApp</span>
                </a>
                <button
                  type="button"
                  onClick={() => setSelectedImage(null)}
                  className="rounded-xl border border-slate-200 bg-slate-100 px-4 py-2.5 text-xs sm:text-sm font-bold text-slate-700 hover:bg-slate-200 transition-all cursor-pointer"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
