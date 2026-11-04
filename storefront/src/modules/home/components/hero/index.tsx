import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { listProducts } from "@lib/data/products"
import { getProductPrice } from "@lib/util/get-product-price"

const Hero = async ({ countryCode = "in" }: { countryCode?: string }) => {
  // Fetch live published products and their uploaded images directly from Medusa Admin
  let products: any[] = []
  try {
    const { response } = await listProducts({
      countryCode,
      queryParams: {
        limit: 8,
        fields: "*variants.calculated_price,+variants.inventory_quantity,*images",
      },
    })
    products = response.products || []
  } catch (e) {
    products = []
  }

  // Use your real uploaded product image for the "Rooted in Tradition" showcase (with a reliable fallback)
  const storyImage =
    products?.[0]?.thumbnail ||
    products?.[0]?.images?.[0]?.url ||
    "https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=1000&q=85"

  return (
    <div className="w-full bg-[#FAF7F2] text-stone-800">
      {/* 1. HERO BANNER */}
      <section className="relative h-[85vh] min-h-[580px] w-full flex items-center justify-center text-center overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=2000&q=85"
          alt="Seth Organic Farm"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-[#143625]/55 to-black/65" />

        <div className="relative z-10 max-w-3xl mx-auto px-6 flex flex-col items-center">
          <h1 className="font-serif text-4xl sm:text-6xl text-white font-bold leading-tight tracking-tight">
            Pure Goodness From <br />
            <span className="italic font-normal text-[#F3E9D2]">Farm to Family</span>
          </h1>
          <p className="mt-5 text-base sm:text-lg text-stone-200 max-w-2xl leading-relaxed">
            Experience authentic ghee, raw honey, cold-pressed oils, and natural jaggery,
            crafted using time-honored Indian traditions straight from Seth's fertile organic farms.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <LocalizedClientLink
              href="/store"
              className="bg-[#7C5338] hover:bg-[#66422b] text-white font-medium px-8 py-3.5 rounded-md transition shadow-lg text-sm"
            >
              Shop Now
            </LocalizedClientLink>
            <a
              href="#essentials"
              className="border border-white/70 hover:bg-white/15 text-white font-medium px-8 py-3.5 rounded-md transition text-sm backdrop-blur-xs"
            >
              Explore Products
            </a>
          </div>
        </div>

        <a
          href="#story"
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 text-white/80 hover:text-white animate-bounce"
          aria-label="Scroll Down"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </a>
      </section>

      {/* 2. FIVE TRUST BADGES BAR */}
      <section className="border-b border-stone-200/80 bg-[#FAF7F2] py-8">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-2 sm:grid-cols-5 gap-6 text-center">
          {[
            { icon: "🌿", label: "100% NATURAL" },
            { icon: "🚫", label: "NO PRESERVATIVES" },
            { icon: "🚜", label: "FARM FRESH" },
            { icon: "🏺", label: "TRADITIONAL METHODS" },
            { icon: "🛡️", label: "QUALITY TESTED" },
          ].map((b) => (
            <div key={b.label} className="flex flex-col items-center gap-2">
              <span className="text-xl">{b.icon}</span>
              <span className="text-[11px] font-semibold tracking-widest text-stone-600 uppercase">
                {b.label}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* 3. ROOTED IN TRADITION (OUR STORY) */}
      <section id="story" className="py-20 sm:py-28 max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
          <div className="md:col-span-6 relative">
            <div className="rounded-2xl overflow-hidden shadow-xl aspect-square bg-[#FAF8F5] border border-stone-200/70">
              <img
                src={storyImage}
                alt="Seth Organic Farm Heritage"
                className="w-full h-full object-cover object-center"
              />
            </div>
            <div className="bg-white p-6 rounded-xl shadow-lg max-w-xs -mt-16 ml-auto mr-4 relative z-10 border border-stone-100">
              <p className="font-serif italic text-lg font-semibold text-[#143625]">
                Legacy of Purity
              </p>
              <p className="text-xs text-stone-600 mt-1 leading-relaxed">
                Preserving the ancient wisdom of Indian farming for the modern home.
              </p>
            </div>
          </div>

          <div className="md:col-span-6 space-y-5">
            <p className="text-xs font-semibold uppercase tracking-widest text-[#7C5338]">
              OUR STORY
            </p>
            <h2 className="font-serif text-4xl sm:text-5xl font-bold text-[#143625] leading-tight">
              Rooted in <br /> Tradition
            </h2>
            <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
              Our journey began in sunlit ancestral farms where purity, sustainability,
              and authenticity come first. We believe that true wellness starts from
              products that respect the soil they grow in.
            </p>
            <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
              By reviving time-tested methods like Vedic Bilona churning and wood-pressed oil
              extraction, we ensure that every drop of Seth Organic Farm produce retains its
              natural nutrients, rich aroma, and true heritage.
            </p>
            <div className="pt-2">
              <LocalizedClientLink
                href="/store"
                className="inline-block text-sm font-semibold text-[#143625] border-b-2 border-[#7C5338] pb-1 hover:text-[#7C5338] transition"
              >
                Read Our Heritage Story →
              </LocalizedClientLink>
            </div>
          </div>
        </div>
      </section>

      {/* 4. FARM-TO-TABLE ESSENTIALS (DYNAMIC FROM MEDUSA ADMIN) */}
      <section id="essentials" className="py-16 sm:py-24 bg-[#F5EFE6]/70">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-14">
            <p className="text-[11px] font-semibold uppercase tracking-widest text-[#7C5338]">
              WHOLESOME SELECTION
            </p>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#143625] mt-2">
              Farm-to-Table Essentials
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map((product) => {
              const productImg =
                product.thumbnail || product.images?.[0]?.url || ""
              const { cheapestPrice } = getProductPrice({ product })

              return (
                <div
                  key={product.id}
                  className="bg-white rounded-2xl overflow-hidden shadow-xs hover:shadow-md transition flex flex-col border border-stone-200/60 group"
                >
                  <LocalizedClientLink
                    href={`/products/${product.handle}`}
                    className="aspect-square w-full overflow-hidden bg-[#FAF8F5] block relative"
                  >
                    {productImg ? (
                      <img
                        src={productImg}
                        alt={product.title}
                        className="w-full h-full object-cover object-center group-hover:scale-105 transition duration-500"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-stone-400 text-xs">
                        No Image
                      </div>
                    )}
                  </LocalizedClientLink>

                  <div className="p-6 text-center flex-1 flex flex-col justify-between">
                    <div>
                      <LocalizedClientLink href={`/products/${product.handle}`}>
                        <h3 className="font-serif text-lg font-bold text-[#143625] group-hover:text-[#7C5338] transition-colors">
                          {product.title}
                        </h3>
                      </LocalizedClientLink>
                      {cheapestPrice && (
                        <p className="text-sm font-semibold text-[#7C5338] mt-1">
                          {cheapestPrice.calculated_price}
                        </p>
                      )}
                      {product.description && (
                        <p className="text-xs text-stone-500 mt-2 leading-relaxed line-clamp-2">
                          {product.description}
                        </p>
                      )}
                    </div>
                    <LocalizedClientLink
                      href={`/products/${product.handle}`}
                      className="mt-5 inline-block text-xs font-semibold text-[#7C5338] hover:text-[#143625] uppercase tracking-wider"
                    >
                      Explore Product ↗
                    </LocalizedClientLink>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* 5. WHY CHOOSE US (DARK FOREST GREEN SECTION) */}
      <section id="why-us" className="py-20 sm:py-24 bg-[#143625] text-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="font-serif text-3xl sm:text-4xl font-bold">
              Why Choose Us
            </h2>
            <div className="w-12 h-0.5 bg-[#C89D66] mx-auto mt-3" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12 text-center">
            {[
              {
                icon: "🚜",
                title: "Direct Farm Sourcing",
                desc: "Every product comes directly from our carefully managed network of partner farms.",
              },
              {
                icon: "🍃",
                title: "Chemical-Free Production",
                desc: "No pesticides, no preservatives, and no synthetic additives—ever.",
              },
              {
                icon: "🏺",
                title: "Traditional Methods",
                desc: "We honor ancient techniques that preserve nutritional integrity and flavor.",
              },
              {
                icon: "🌱",
                title: "Sustainable Farming",
                desc: "Protecting soil biodiversity and local ecosystems for your family's future.",
              },
              {
                icon: "🔬",
                title: "Purity Assured",
                desc: "Rigorous quality testing covers every step of our manufacturing journey.",
              },
              {
                icon: "📦",
                title: "Premium Packaging",
                desc: "Eco-friendly glass jars and protective packaging to preserve freshness intact.",
              },
            ].map((feature) => (
              <div key={feature.title} className="flex flex-col items-center px-4">
                <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-xl mb-4 text-[#C89D66]">
                  {feature.icon}
                </div>
                <h3 className="font-serif text-lg font-semibold text-white">
                  {feature.title}
                </h3>
                <p className="text-xs text-stone-300 mt-2 leading-relaxed max-w-xs">
                  {feature.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. THE JOURNEY OF PURITY (5-STEP TIMELINE) */}
      <section id="process" className="py-20 bg-[#FAF7F2]">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#143625] mb-14">
            The Journey of Purity
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-6 relative">
            {[
              { icon: "🌾", step: "Organic Farming" },
              { icon: "🪵", step: "Traditional Processing" },
              { icon: "📋", step: "Quality Inspection" },
              { icon: "🫙", step: "Sustainable Packaging" },
              { icon: "🚚", step: "Doorstep Delivery" },
            ].map((s) => (
              <div key={s.step} className="flex flex-col items-center">
                <div className="w-12 h-12 rounded-lg bg-[#7C5338] text-white flex items-center justify-center text-lg shadow-md mb-3">
                  {s.icon}
                </div>
                <span className="text-xs font-medium text-stone-700">{s.step}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. STATS BANNER */}
      <section className="py-14 bg-[#0F2C1D] text-white">
        <div className="max-w-5xl mx-auto px-6 grid grid-cols-2 sm:grid-cols-4 gap-8 text-center">
          {[
            { num: "10k+", label: "Happy Customers" },
            { num: "100+", label: "Partner Farms" },
            { num: "50k+", label: "Orders Delivered" },
            { num: "100%", label: "Natural Products" },
          ].map((stat) => (
            <div key={stat.label}>
              <p className="font-serif text-3xl sm:text-4xl font-bold text-[#E6C79C]">
                {stat.num}
              </p>
              <p className="text-xs text-stone-300 mt-1">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 8. WHAT OUR CUSTOMERS SAY */}
      <section className="py-20 bg-[#FAF7F2]">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-14">
            <p className="text-[11px] font-semibold uppercase tracking-widest text-[#7C5338]">
              OUR COMMUNITY
            </p>
            <h2 className="font-serif text-3xl font-bold text-[#143625] mt-1">
              What Our Customers Say
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                quote:
                  "The A2 Ghee from Seth Organic Farm is unlike anything I've bought in stores. It has the authentic aroma of my grandmother's village kitchen.",
                name: "Priya Sharma",
                role: "Nutrition Consultant",
              },
              {
                quote:
                  "Finally found raw honey that actually tastes like it's from the forest. Their commitment to traditional methods is evident in every jar.",
                name: "Arjun Kapoor",
                role: "Wellness Advocate",
              },
              {
                quote:
                  "I switched to their cold-pressed mustard oil for all my cooking now. The difference in taste and quality is remarkable. Highly recommend!",
                name: "Ananya Iyer",
                role: "Culinary Blogger",
              },
            ].map((t) => (
              <div
                key={t.name}
                className="bg-white p-7 rounded-xl border border-stone-200/70 shadow-xs flex flex-col justify-between"
              >
                <div>
                  <div className="text-amber-500 text-sm mb-3">★★★★★</div>
                  <p className="text-xs sm:text-sm text-stone-600 italic leading-relaxed">
                    “{t.quote}”
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-stone-100">
                  <p className="text-xs font-bold text-[#143625]">{t.name}</p>
                  <p className="text-[11px] text-stone-400">{t.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 9. WARM PEACH CALL-TO-ACTION BANNER */}
      <section className="py-20 bg-[#F4DFD0] text-center px-6">
        <div className="max-w-2xl mx-auto">
          <h2 className="font-serif text-3xl sm:text-5xl font-bold text-[#2B1B12] leading-tight">
            Bring Home the Taste of <br />
            <span className="italic font-normal">Authentic India</span>
          </h2>
          <p className="text-xs sm:text-sm text-stone-700 mt-4 max-w-lg mx-auto leading-relaxed">
            Choose purity. Choose tradition. Choose wellness. Experience the Seth Organic Farm
            difference today.
          </p>
          <div className="mt-8">
            <LocalizedClientLink
              href="/store"
              className="inline-block bg-[#143625] hover:bg-[#0c2418] text-white text-xs sm:text-sm font-medium px-8 py-3.5 rounded-md shadow-md transition"
            >
              Start Shopping
            </LocalizedClientLink>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Hero
