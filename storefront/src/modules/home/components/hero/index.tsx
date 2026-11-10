import React from "react"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

export default function Hero() {
  return (
    <section className="relative w-full min-h-[500px] sm:min-h-[580px] lg:h-[82vh] flex items-center justify-center text-center overflow-hidden bg-[#143625]">
      {/* Editorial High-Resolution Background Imagery */}
      <img
        src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=2000&q=85"
        alt="Seth Organic Ancestral Farm"
        className="absolute inset-0 w-full h-full object-cover object-center scale-105 transition-transform duration-1000"
      />

      {/* Luxury Forest Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-[#143625]/65 to-black/75 backdrop-blur-[0.5px]" />

      {/* Hero Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 py-12 sm:py-16 flex flex-col items-center">
        {/* Simple Heritage Tag */}
        <p className="text-xs sm:text-sm font-semibold tracking-widest uppercase text-amber-300 mb-3 sm:mb-4">
          100% Certified Organic • Direct From Farm
        </p>

        {/* Hero Title */}
        <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl text-white font-bold leading-[1.18] tracking-tight max-w-3xl">
          Pure Goodness From <br />
          <span className="italic font-normal text-[#F3E9D2]">
            Ancestral Soil to Family Home
          </span>
        </h1>

        {/* Hero Subtitle */}
        <p className="mt-4 sm:mt-5 text-sm sm:text-base lg:text-lg text-stone-200 max-w-2xl leading-relaxed font-sans font-normal">
          Experience authentic A2 Desi Cow Ghee, untouched wild forest honey, wood-pressed oils, and chemical-free sugarcane jaggery—handcrafted with traditional care.
        </p>

        {/* Action CTAs */}
        <div className="mt-8 sm:mt-10 flex flex-wrap items-center justify-center gap-3.5 sm:gap-4 w-full max-w-md">
          <LocalizedClientLink
            href="/store"
            className="w-full sm:w-auto bg-[#C89D66] hover:bg-[#b08550] text-[#143625] font-bold px-8 py-3.5 rounded-xl transition-all shadow-lg hover:shadow-xl text-xs sm:text-sm active:scale-95 flex items-center justify-center gap-2"
          >
            <span>Shop Bestsellers</span>
            <span className="text-base font-bold">→</span>
          </LocalizedClientLink>

          <LocalizedClientLink
            href="/collections/desi-ghee"
            className="w-full sm:w-auto border border-white/60 hover:bg-white/15 text-white font-semibold px-7 py-3.5 rounded-xl transition text-xs sm:text-sm backdrop-blur-xs active:scale-95"
          >
            Explore A2 Ghee
          </LocalizedClientLink>
        </div>

        {/* Clean Bottom Trust Indicators */}
        <div className="mt-8 sm:mt-12 flex flex-wrap items-center justify-center gap-4 sm:gap-8 text-stone-300 text-xs font-medium">
          <span className="flex items-center gap-1.5">
            <span className="text-emerald-400">✓</span> Free Shipping &gt; ₹999
          </span>
          <span className="flex items-center gap-1.5">
            <span className="text-emerald-400">✓</span> Zero Preservatives
          </span>
          <span className="flex items-center gap-1.5">
            <span className="text-emerald-400">✓</span> 4.9/5 Customer Trust
          </span>
        </div>
      </div>
    </section>
  )
}
