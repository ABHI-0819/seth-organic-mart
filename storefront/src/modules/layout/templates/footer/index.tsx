import LocalizedClientLink from "@modules/common/components/localized-client-link"

export default async function Footer() {
  return (
    <footer className="bg-[#0A2015] text-stone-300 w-full border-t border-white/10 pb-16 md:pb-0">
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

        {/* Connect & Social Media */}
        <div>
          <h4 className="text-xs font-bold uppercase tracking-widest text-white mb-4">
            CONNECT WITH US
          </h4>
          <p className="text-xs text-stone-300 mb-3">
            Follow our farm journey, Vedic processes & seasonal harvest updates.
          </p>

          <div className="flex items-center gap-3 mb-4">
            {/* Instagram */}
            <a
              href="https://www.instagram.com/sethorganicfarm?cplk=czY0amUxZ2xydXRo"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Follow Seth Organic Farm on Instagram"
              className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#fd5949] via-[#d6249f] to-[#285AEB] flex items-center justify-center text-white shadow-xs hover:scale-110 hover:shadow-md transition-all"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
              </svg>
            </a>

            {/* Facebook */}
            <a
              href="https://www.facebook.com/people/Ram-Farm/pfbid02GLd1Y4S7wNVvBPAPXQk56gaEj1ZF6ubTNTzsifWzdju5L6aouAQEAihGjFL8TRpDl/?rdid=yQWQ9PIGx5fGLhmQ&share_url=https%3A%2F%2Fwww.facebook.com%2Fshare%2F1HyQmSaG6H%2F"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Visit Ram Farm on Facebook"
              className="w-9 h-9 rounded-xl bg-[#1877F2] flex items-center justify-center text-white shadow-xs hover:scale-110 hover:shadow-md transition-all"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
              </svg>
            </a>

            {/* WhatsApp Direct */}
            <a
              href="https://wa.me/918652542610?text=Hello%20Seth%20Organic%20Farm!%20I%20have%20an%20inquiry%20regarding%20your%20products."
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Direct WhatsApp inquiry"
              className="w-9 h-9 rounded-xl bg-[#25D366] flex items-center justify-center text-white shadow-xs hover:scale-110 hover:shadow-md transition-all"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.82 11.82 0 00-3.48-8.413z" />
              </svg>
            </a>
          </div>

          <div className="pt-1 text-xs text-stone-300 space-y-1.5">
            <p className="flex items-center gap-1.5 font-semibold text-emerald-400">
              <span>WhatsApp:</span>
              <a
                href="https://wa.me/918652542610"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline text-white font-mono"
              >
                +91 86525 42610
              </a>
            </p>
            <p className="text-stone-400 text-[11px]">
              Available 9 AM – 8 PM (Mon–Sat)
            </p>
          </div>
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
