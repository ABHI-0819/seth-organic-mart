import React from "react"

export default function PurityBadges() {
  const BADGES = [
    {
      icon: "🌿",
      title: "100% CERTIFIED ORGANIC",
      subtitle: "NPOP & Jaivik Bharat compliant",
    },
    {
      icon: "🚫",
      title: "ZERO CHEMICALS",
      subtitle: "No pesticides, adulterants or preservatives",
    },
    {
      icon: "🔬",
      title: "LAB TESTED PURITY",
      subtitle: "Every batch certified by NABL labs",
    },
    {
      icon: "🏺",
      title: "VEDIC BILONA CHURNED",
      subtitle: "Handcrafted using ancestral traditions",
    },
    {
      icon: "🫙",
      title: "FOOD-GRADE GLASS JARS",
      subtitle: "Zero toxic plastic leaching guaranteed",
    },
  ]

  return (
    <section className="border-y border-stone-200/80 bg-white py-8 sm:py-10">
      <div className="content-container">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6 text-center">
          {BADGES.map((b) => (
            <div key={b.title} className="flex flex-col items-center">
              <span className="text-2xl sm:text-3xl mb-2">{b.icon}</span>
              <span className="text-[11px] sm:text-xs font-bold tracking-wider text-stone-900 uppercase">
                {b.title}
              </span>
              <span className="text-[10px] text-stone-500 mt-0.5 max-w-[170px] leading-tight">
                {b.subtitle}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
