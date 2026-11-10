import React from "react"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

export default function PromotionalBanners() {
  return (
    <section className="py-10 sm:py-16 bg-[#FAF7F2]">
      <div className="content-container">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {/* Card 1: Vedic Bilona Ghee */}
          <div className="relative rounded-3xl overflow-hidden min-h-[360px] sm:min-h-[420px] flex flex-col justify-end p-6 sm:p-10 shadow-lg group">
            {/* Background Image */}
            <img
              src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1200&q=80"
              alt="Ancestral Vedic Ghee Farm"
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
            {/* Dark Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/45 to-transparent" />

            <div className="relative z-10 space-y-3">
              <span className="inline-block text-[10px] font-bold uppercase tracking-widest text-amber-300 bg-amber-950/70 border border-amber-400/40 px-3 py-1 rounded-full backdrop-blur-xs">
                ANCIENT BILONA PROCESS
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white leading-tight">
                A2 Gir Cow Vedic Ghee <br />
                <span className="italic text-amber-200 font-normal">Made from Curd, Never Cream</span>
              </h3>
              <p className="text-xs sm:text-sm text-stone-200 max-w-md line-clamp-2 leading-relaxed">
                Slowly simmered on firewood in handmade brass cauldrons. Retains gut-healing butyric acid, rich golden aroma, and pure spiritual purity.
              </p>
              <div className="pt-2 flex items-center gap-3">
                <LocalizedClientLink
                  href="/products/a2-desi-gir-cow-ghee"
                  className="bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs sm:text-sm px-6 py-3 rounded-xl shadow-md transition"
                >
                  Order Fresh Batch →
                </LocalizedClientLink>
                <span className="text-xs text-amber-200 font-semibold">~~₹3,000~~ ₹2,500</span>
              </div>
            </div>
          </div>

          {/* Card 2: Wild Raw Forest Honey */}
          <div className="relative rounded-3xl overflow-hidden min-h-[360px] sm:min-h-[420px] flex flex-col justify-end p-6 sm:p-10 shadow-lg group">
            {/* Background Image */}
            <img
              src="https://images.unsplash.com/photo-1473081556163-2a17de81fc97?auto=format&fit=crop&w=1200&q=80"
              alt="Raw Forest Honey Apiary"
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
            {/* Dark Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#143625]/90 via-[#143625]/50 to-transparent" />

            <div className="relative z-10 space-y-3">
              <span className="inline-block text-[10px] font-bold uppercase tracking-widest text-emerald-300 bg-emerald-950/70 border border-emerald-400/40 px-3 py-1 rounded-full backdrop-blur-xs">
                100% UNPASTEURIZED & RAW
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white leading-tight">
                Wild Forest Honey <br />
                <span className="italic text-emerald-200 font-normal">Straight From Wild Comb To Jar</span>
              </h3>
              <p className="text-xs sm:text-sm text-stone-200 max-w-md line-clamp-2 leading-relaxed">
                Zero heating, zero corn syrup, zero processing. Naturally crystallized honey packed with live pollen enzymes, flavonoids, and earthy forest flavor.
              </p>
              <div className="pt-2 flex items-center gap-3">
                <LocalizedClientLink
                  href="/products/raw-forest-honey"
                  className="bg-white hover:bg-stone-100 text-[#143625] font-bold text-xs sm:text-sm px-6 py-3 rounded-xl shadow-md transition"
                >
                  Taste The Wild →
                </LocalizedClientLink>
                <span className="text-xs text-stone-200 font-semibold">From ₹850</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
