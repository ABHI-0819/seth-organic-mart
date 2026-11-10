import LocalizedClientLink from "@modules/common/components/localized-client-link"

export default async function Footer() {
  return (
    <footer className="bg-[#0A2015] text-stone-300 w-full border-t border-white/10 pb-16 md:pb-0">
      {/* Newsletter / First Order Offer Strip */}
      <div className="border-b border-white/10 bg-[#07170F] py-10 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-widest text-amber-300 bg-white/10 px-3 py-0.5 rounded-full">
              JOIN OUR PURE LIVING CLUB
            </span>
            <h3 className="font-serif text-xl sm:text-2xl font-bold text-white mt-2">
              Get ₹200 OFF on Your First Vedic Order
            </h3>
            <p className="text-xs text-stone-400 mt-1 max-w-md">
              Receive seasonal farm harvest updates, Vedic health recipes, and subscriber-only festive promotions.
            </p>
          </div>

          <div className="w-full max-w-md flex flex-col sm:flex-row gap-2">
            <input
              type="email"
              placeholder="Enter your email address..."
              className="bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-xs sm:text-sm text-white placeholder-stone-400 focus:outline-none focus:border-amber-400 flex-1"
            />
            <button
              type="button"
              className="bg-[#C89D66] hover:bg-[#b08550] text-[#143625] font-bold text-xs sm:text-sm px-6 py-3 rounded-xl transition shadow-md shrink-0"
            >
              Subscribe
            </button>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12 sm:py-16 grid grid-cols-2 md:grid-cols-4 gap-8 lg:gap-10">
        {/* Brand Column */}
        <div className="col-span-2 md:col-span-1 space-y-3">
          <LocalizedClientLink href="/" className="inline-block">
            <img
              src="/logo.svg"
              alt="Seth Organic Farm"
              className="h-12 w-auto bg-white p-2 rounded-xl mb-1"
            />
          </LocalizedClientLink>
          <p className="text-xs text-stone-400 leading-relaxed">
            Cultivating Indian Vedic heritage, nourishing holistic family life. From our ancestral soil directly to your kitchen.
          </p>
          <div className="pt-2 text-xs text-amber-300 font-semibold flex items-center gap-1.5">
            <span>🌿 100% Certified Organic</span>
          </div>
        </div>

        {/* Shop Staples */}
        <div>
          <h4 className="text-xs font-bold uppercase tracking-widest text-white mb-4">
            PURE STAPLES
          </h4>
          <ul className="space-y-2.5 text-xs text-stone-300">
            <li>
              <LocalizedClientLink href="/collections/desi-ghee" className="hover:text-amber-300 transition-colors">
                A2 Gir Cow Desi Ghee
              </LocalizedClientLink>
            </li>
            <li>
              <LocalizedClientLink href="/collections/raw-honey" className="hover:text-amber-300 transition-colors">
                Raw Forest Honey
              </LocalizedClientLink>
            </li>
            <li>
              <LocalizedClientLink href="/collections/cold-pressed-oils" className="hover:text-amber-300 transition-colors">
                Cold-Pressed Mustard Oil
              </LocalizedClientLink>
            </li>
            <li>
              <LocalizedClientLink href="/collections/organic-jaggery" className="hover:text-amber-300 transition-colors">
                Organic Sugarcane Jaggery
              </LocalizedClientLink>
            </li>
            <li>
              <LocalizedClientLink href="/store" className="hover:text-amber-300 transition-colors">
                Festive Gift Hampers
              </LocalizedClientLink>
            </li>
          </ul>
        </div>

        {/* Vedic Story */}
        <div>
          <h4 className="text-xs font-bold uppercase tracking-widest text-white mb-4">
            OUR HERITAGE
          </h4>
          <ul className="space-y-2.5 text-xs text-stone-300">
            <li>
              <a href="#story" className="hover:text-amber-300 transition-colors">
                About Seth Farm
              </a>
            </li>
            <li>
              <a href="#process" className="hover:text-amber-300 transition-colors">
                Vedic Bilona Churning
              </a>
            </li>
            <li>
              <a href="#why-us" className="hover:text-amber-300 transition-colors">
                Ancestral Soil & Cows
              </a>
            </li>
            <li>
              <LocalizedClientLink href="/store" className="hover:text-amber-300 transition-colors">
                Lab Test Reports & Purity
              </LocalizedClientLink>
            </li>
          </ul>
        </div>

        {/* Customer Support */}
        <div>
          <h4 className="text-xs font-bold uppercase tracking-widest text-white mb-4">
            CUSTOMER CARE
          </h4>
          <ul className="space-y-2.5 text-xs text-stone-300">
            <li>
              <LocalizedClientLink href="/account" className="hover:text-amber-300 transition-colors">
                Track Your Order
              </LocalizedClientLink>
            </li>
            <li>
              <LocalizedClientLink href="/store" className="hover:text-amber-300 transition-colors">
                Shipping & Glass Jar Packaging
              </LocalizedClientLink>
            </li>
            <li>
              <LocalizedClientLink href="/store" className="hover:text-amber-300 transition-colors">
                Return & Refund Policy
              </LocalizedClientLink>
            </li>
            <li>
              <span className="text-stone-400">Support: WhatsApp & Phone</span>
            </li>
            <li className="pt-1">
              <span className="text-emerald-400 font-semibold">🇮🇳 Pan-India Express Delivery</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom Bar: Copyright & Payment Icons */}
      <div className="border-t border-white/10 py-6 px-4 sm:px-6 max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-stone-400">
        <p>© {new Date().getFullYear()} Seth Organic Farm. Cultivating Heritage, Sustaining Life.</p>
        <div className="flex items-center gap-2 text-stone-300 text-xs">
          <span>🔒 100% Secure Checkout: UPI • Cards • NetBanking • COD</span>
        </div>
      </div>
    </footer>
  )
}
