import LocalizedClientLink from "@modules/common/components/localized-client-link"

export default async function Footer() {
  return (
    <footer className="bg-[#0F2C1D] text-stone-300 w-full border-t border-white/10">
      <div className="max-w-6xl mx-auto px-6 py-16 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">
        <div>
          <LocalizedClientLink
            href="/"
            className="font-serif text-2xl font-bold text-white block"
          >
            <img src="/logo.svg" alt="Seth Organic Farm" className="h-14 w-auto bg-white p-2 rounded-lg mb-2" />
          </LocalizedClientLink>
          <p className="text-xs text-stone-400 mt-3 leading-relaxed">
            Cultivating heritage, nourishing life. From our family to yours.
          </p>
        </div>

        <div>
          <h4 className="text-xs font-semibold uppercase tracking-widest text-white mb-4">
            SHOP
          </h4>
          <ul className="space-y-2.5 text-xs text-stone-300">
            <li>
              <LocalizedClientLink href="/products/a2-desi-gir-cow-ghee" className="hover:text-white">
                Desi Ghee
              </LocalizedClientLink>
            </li>
            <li>
              <LocalizedClientLink href="/products/raw-forest-honey" className="hover:text-white">
                Raw Honey
              </LocalizedClientLink>
            </li>
            <li>
              <LocalizedClientLink href="/products/organic-sugarcane-jaggery" className="hover:text-white">
                Organic Jaggery
              </LocalizedClientLink>
            </li>
            <li>
              <LocalizedClientLink href="/products/cold-pressed-mustard-oil" className="hover:text-white">
                Cold-Pressed Oils
              </LocalizedClientLink>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="text-xs font-semibold uppercase tracking-widest text-white mb-4">
            COMPANY
          </h4>
          <ul className="space-y-2.5 text-xs text-stone-300">
            <li><a href="#story" className="hover:text-white">About Us</a></li>
            <li><a href="#process" className="hover:text-white">Our Process</a></li>
            <li><a href="#why-us" className="hover:text-white">Sustainability</a></li>
            <li><LocalizedClientLink href="/store" className="hover:text-white">Wholesale</LocalizedClientLink></li>
          </ul>
        </div>

        <div>
          <h4 className="text-xs font-semibold uppercase tracking-widest text-white mb-4">
            SUPPORT
          </h4>
          <ul className="space-y-2.5 text-xs text-stone-300">
            <li><LocalizedClientLink href="/account" className="hover:text-white">Track Order</LocalizedClientLink></li>
            <li><LocalizedClientLink href="/store" className="hover:text-white">Privacy Policy</LocalizedClientLink></li>
            <li><LocalizedClientLink href="/store" className="hover:text-white">Terms of Service</LocalizedClientLink></li>
            <li><LocalizedClientLink href="/store" className="hover:text-white">Shipping & Returns</LocalizedClientLink></li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10 py-6 px-6 max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between text-[11px] text-stone-400">
        <p>© {new Date().getFullYear()} Seth Organic Farm. Cultivating Heritage, Sustaining Life.</p>
      </div>
    </footer>
  )
}
