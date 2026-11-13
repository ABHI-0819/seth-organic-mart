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
      <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 py-14 sm:py-20 flex flex-col items-center">
        {/* Main Headline */}
        <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl text-white font-bold tracking-tight uppercase leading-tight">
          PURE GOODNESS FROM FARM TO HOME
        </h1>

        {/* Clean Subtitle */}
        <p className="mt-4 sm:mt-5 text-base sm:text-lg lg:text-xl text-stone-200 font-sans max-w-2xl leading-relaxed">
          Authentic A2 Ghee, Wild Honey & Wood-Pressed Oils
        </p>

        {/* Single Prominent CTA */}
        <div className="mt-8 sm:mt-10">
          <LocalizedClientLink
            href="/store"
            className="inline-flex items-center justify-center gap-2.5 bg-[#C89D66] hover:bg-[#b58c57] text-[#143625] font-bold text-sm sm:text-base px-9 py-4 rounded-xl shadow-lg hover:shadow-xl transition-all active:scale-95 group"
          >
            <span>Shop Now</span>
            <span className="text-lg transition-transform group-hover:translate-x-1">→</span>
          </LocalizedClientLink>
        </div>
      </div>
    </section>
  )
}
