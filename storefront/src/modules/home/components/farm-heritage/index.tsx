import React from "react"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

export default function FarmHeritage() {
  return (
    <section id="story" className="py-14 sm:py-24 bg-[#143625] text-white overflow-hidden">
      <div className="content-container">
        {/* Top Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <span className="text-[11px] font-bold uppercase tracking-widest text-amber-300 bg-white/10 px-3.5 py-1 rounded-full border border-white/15">
            OUR SACRED HERITAGE
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold mt-3 leading-tight">
            Rooted in Vedic Tradition, <br />
            <span className="italic font-normal text-amber-200">Crafted for Family Wellness</span>
          </h2>
          <p className="text-xs sm:text-sm text-stone-300 mt-3 leading-relaxed">
            We reject industrial shortcuts. Every jar of Seth Organic Farm produce is crafted following the ancient guidelines of Charaka Samhita—nourishing body, mind, and prana.
          </p>
        </div>

        {/* 4 Pillars Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              icon: "🏺",
              title: "Vedic Bilona Method",
              subtitle: "Clay Pots & Wood Churning",
              desc: "Fresh A2 milk is boiled in clay pots, cultured into curd overnight, and hand-churned bidirectionally with a wooden bilona to produce makkhan.",
            },
            {
              icon: "🪵",
              title: "Wood-Pressed Cold Oils",
              subtitle: "True Kachi Ghani (<40°C)",
              desc: "Seeds are crushed in traditional wood mortars (Vagai) at ambient temperature. Zero heat, zero hexane, and zero chemical refining.",
            },
            {
              icon: "🐝",
              title: "Raw Forest Honey",
              subtitle: "Unprocessed & Unheated",
              desc: "Ethically harvested from deep forest apiaries. Naturally strained using organic muslin cloth to preserve pollen, propolis, and live enzymes.",
            },
            {
              icon: "🫙",
              title: "Plastic-Free Glass Jars",
              subtitle: "Safe & Non-Reactive",
              desc: "Zero microplastics. Our premium food-grade amber & flint glass jars keep aromas sealed and natural vitamins protected from oxidation.",
            },
          ].map((pillar) => (
            <div
              key={pillar.title}
              className="bg-white/10 rounded-2xl p-6 border border-white/15 backdrop-blur-xs flex flex-col justify-between hover:bg-white/15 hover:border-amber-300/50 transition-all duration-300 shadow-xs"
            >
              <div>
                <div className="w-12 h-12 rounded-xl bg-amber-400/20 text-2xl flex items-center justify-center mb-4 border border-amber-300/30">
                  {pillar.icon}
                </div>
                <h3 className="font-serif text-lg font-bold text-white">
                  {pillar.title}
                </h3>
                <p className="text-[11px] font-semibold text-amber-300 mt-0.5">
                  {pillar.subtitle}
                </p>
                <p className="text-xs text-stone-300 mt-2.5 leading-relaxed">
                  {pillar.desc}
                </p>
              </div>

              <div className="mt-5 pt-3 border-t border-white/10 text-[11px] text-emerald-300 font-semibold flex items-center gap-1">
                <span>✓ 100% Traceable</span>
              </div>
            </div>
          ))}
        </div>

        {/* Stats Strip */}
        <div className="mt-12 sm:mt-16 pt-8 border-t border-white/15 grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">
          <div>
            <p className="font-serif text-3xl sm:text-4xl font-bold text-amber-300">10,000+</p>
            <p className="text-xs text-stone-300 mt-1">Families Nourished</p>
          </div>
          <div>
            <p className="font-serif text-3xl sm:text-4xl font-bold text-amber-300">100%</p>
            <p className="text-xs text-stone-300 mt-1">Certified Organic Soil</p>
          </div>
          <div>
            <p className="font-serif text-3xl sm:text-4xl font-bold text-amber-300">4.9 ★</p>
            <p className="text-xs text-stone-300 mt-1">Customer Trust Score</p>
          </div>
          <div>
            <p className="font-serif text-3xl sm:text-4xl font-bold text-amber-300">0</p>
            <p className="text-xs text-stone-300 mt-1">Preservatives or Additives</p>
          </div>
        </div>
      </div>
    </section>
  )
}
