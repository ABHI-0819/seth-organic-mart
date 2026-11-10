import React from "react"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

const CATEGORIES = [
  {
    title: "A2 Desi Ghee",
    subtitle: "Vedic Bilona Churned",
    href: "/collections/desi-ghee",
    img: "https://images.unsplash.com/photo-1589927986089-35812388d1f4?auto=format&fit=crop&w=400&q=80",
    badge: "Most Popular",
  },
  {
    title: "Raw Forest Honey",
    subtitle: "100% Unpasteurized",
    href: "/collections/raw-honey",
    img: "https://images.unsplash.com/photo-1587049352846-4a222e784d38?auto=format&fit=crop&w=400&q=80",
    badge: "Wild Flora",
  },
  {
    title: "Cold-Pressed Oils",
    subtitle: "Wood Kachi Ghani",
    href: "/collections/cold-pressed-oils",
    img: "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&w=400&q=80",
    badge: "Traditional",
  },
  {
    title: "Organic Jaggery",
    subtitle: "Pure Sugarcane",
    href: "/collections/organic-jaggery",
    img: "https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?auto=format&fit=crop&w=400&q=80",
    badge: "No Chemicals",
  },
  {
    title: "Festive Gift Hampers",
    subtitle: "Curated Purity Boxes",
    href: "/store",
    img: "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=400&q=80",
    badge: "Limited Offer",
  },
]

export default function CategoryShowcase() {
  return (
    <section className="py-10 sm:py-16 bg-[#FAF7F2] border-b border-stone-200/80">
      <div className="content-container">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 sm:mb-12 gap-3">
          <div>
            <span className="text-[11px] font-semibold uppercase tracking-widest text-[#7C5338] bg-amber-50 px-3 py-1 rounded-full border border-amber-200/60">
              Curated Farm Collections
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-[#143625] mt-2.5">
              Explore by Purity
            </h2>
            <p className="text-xs sm:text-sm text-stone-600 mt-1 max-w-lg">
              Time-honored Indian staples crafted through ancient Vedic wisdom, delivered directly from our ancestral farm.
            </p>
          </div>
          <LocalizedClientLink
            href="/store"
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-[#143625] hover:text-[#7C5338] transition group shrink-0"
          >
            <span>View All Categories</span>
            <span className="group-hover:translate-x-1 transition-transform">→</span>
          </LocalizedClientLink>
        </div>

        {/* Mobile Horizontal Carousel / Desktop 5-Column Grid */}
        <div className="flex sm:grid sm:grid-cols-3 lg:grid-cols-5 gap-3.5 sm:gap-5 overflow-x-auto no-scrollbar pb-3 sm:pb-0 -mx-4 px-4 sm:mx-0 sm:px-0">
          {CATEGORIES.map((cat) => (
            <LocalizedClientLink
              key={cat.title}
              href={cat.href}
              className="group relative flex flex-col items-center bg-white rounded-2xl p-4 sm:p-5 border border-stone-200/80 shadow-2xs hover:shadow-md hover:border-[#143625] transition-all duration-300 w-[160px] sm:w-auto shrink-0 text-center"
            >
              {/* Badge */}
              <span className="text-[9px] font-bold uppercase tracking-wider text-amber-800 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200/60 mb-3">
                {cat.badge}
              </span>

              {/* Image Circle */}
              <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-full overflow-hidden bg-[#FAF8F5] mb-3.5 border-2 border-stone-100 group-hover:scale-105 group-hover:border-[#143625] transition-all duration-300 shadow-xs">
                <img
                  src={cat.img}
                  alt={cat.title}
                  className="w-full h-full object-cover object-center"
                  loading="lazy"
                />
              </div>

              {/* Title & Subtitle */}
              <h3 className="font-serif text-sm sm:text-base font-bold text-stone-900 group-hover:text-[#143625] transition-colors line-clamp-1">
                {cat.title}
              </h3>
              <p className="text-[11px] text-stone-500 mt-0.5 line-clamp-1">
                {cat.subtitle}
              </p>

              {/* Action Hint */}
              <span className="mt-3 text-[10px] font-bold text-[#7C5338] group-hover:text-[#143625] flex items-center gap-1 uppercase tracking-wider">
                Explore →
              </span>
            </LocalizedClientLink>
          ))}
        </div>
      </div>
    </section>
  )
}
