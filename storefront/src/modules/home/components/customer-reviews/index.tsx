import React from "react"

const REVIEWS = [
  {
    name: "Dr. Sunita Deshmukh",
    city: "Mumbai, Maharashtra",
    role: "Ayurvedic Practitioner",
    rating: 5,
    title: "Purest A2 Ghee I have tested",
    quote:
      "As an Ayurvedic physician, I recommend Seth Organic Farm A2 Gir Cow Ghee to all my patients. The grainy texture (danedar) and distinct nutty aroma prove that it is prepared with traditional bilona curd churning. Outstanding quality!",
    product: "A2 Desi Gir Cow Ghee (1 Litre)",
  },
  {
    name: "Rajesh K. Singhania",
    city: "New Delhi",
    role: "Verified Farm Buyer",
    rating: 5,
    title: "Raw Honey that brings back childhood memories",
    quote:
      "Unlike supermarket honey which is just sugar syrup, this raw forest honey has real crystallization and an earthy floral aroma. You can taste the purity in every spoonful. My family loves it!",
    product: "100% Raw Wild Forest Honey",
  },
  {
    name: "Meera Subramanian",
    city: "Bengaluru, Karnataka",
    role: "Nutrition & Holistic Wellness Coach",
    rating: 5,
    title: "The Cold-Pressed Mustard Oil is sensational",
    quote:
      "The pungent kick and natural golden color of their wood-pressed mustard oil is unbeatable for traditional Indian cooking. Zero burning eyes, just authentic aroma and healthy monounsaturated fats.",
    product: "Wood-Pressed Mustard Oil",
  },
]

export default function CustomerReviews() {
  return (
    <section className="py-14 sm:py-20 bg-white border-t border-stone-200/80">
      <div className="content-container">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-14">
          <span className="text-[11px] font-bold uppercase tracking-widest text-[#7C5338] bg-amber-50 px-3 py-1 rounded-full border border-amber-200">
            COMMUNITY & REVIEWS
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-[#143625] mt-2.5">
            Loved by Conscious Families
          </h2>
          <p className="text-xs sm:text-sm text-stone-600 mt-1">
            Over 10,000+ homes across India trust Seth Organic Farm for their daily pure nutrition.
          </p>
        </div>

        {/* 3 Review Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {REVIEWS.map((rev) => (
            <div
              key={rev.name}
              className="bg-[#FAF7F2] rounded-2xl p-6 sm:p-7 border border-stone-200/80 flex flex-col justify-between shadow-2xs hover:shadow-md transition duration-300"
            >
              <div>
                {/* Rating stars & verified badge */}
                <div className="flex items-center justify-between mb-3">
                  <div className="text-amber-500 text-sm tracking-widest">
                    {"★".repeat(rev.rating)}
                  </div>
                  <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100/70 px-2 py-0.5 rounded-full flex items-center gap-1">
                    ✓ Verified Buyer
                  </span>
                </div>

                <h3 className="font-serif text-base font-bold text-stone-900 leading-snug">
                  &ldquo;{rev.title}&rdquo;
                </h3>

                <p className="text-xs sm:text-sm text-stone-600 mt-2.5 leading-relaxed italic">
                  &ldquo;{rev.quote}&rdquo;
                </p>
              </div>

              {/* Author footer */}
              <div className="mt-6 pt-4 border-t border-stone-200/60">
                <p className="text-xs font-bold text-[#143625]">{rev.name}</p>
                <p className="text-[11px] text-stone-500">{rev.city} • {rev.role}</p>
                <p className="text-[10px] text-[#7C5338] font-semibold mt-1">
                  Product: {rev.product}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
