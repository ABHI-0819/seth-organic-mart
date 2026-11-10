import { Suspense } from "react"
import { listRegions } from "@lib/data/regions"
import { StoreRegion } from "@medusajs/types"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import CartButton from "@modules/layout/components/cart-button"
import SideMenu from "@modules/layout/components/side-menu"
import FestivalBanner from "@modules/festival/festival-banner"
import HeaderActions from "@modules/layout/components/header-actions"

export default async function Nav() {
  const regions = await listRegions().then((regions: StoreRegion[]) => regions)

  return (
    <div className="sticky top-0 inset-x-0 z-50">
      {/* 1. Dynamic Festival Campaign Ribbon with Countdown */}
      <FestivalBanner />

      {/* 2. Main Navigation Bar */}
      <div className="bg-white/95 backdrop-blur-md border-b border-stone-200/80 shadow-2xs">
        <header className="relative h-16 sm:h-20 mx-auto max-w-7xl px-3 sm:px-6 flex items-center justify-between gap-3">
          {/* Left: Hamburger (Mobile) + Seth Organic Farm Logo */}
          <div className="flex items-center gap-2 sm:gap-3 min-w-0">
            <div className="block md:hidden">
              <SideMenu regions={regions} />
            </div>
            <LocalizedClientLink
              href="/"
              className="flex items-center shrink-0 py-1"
            >
              <img
                src="/logo.svg"
                alt="Seth Organic Farm"
                className="h-10 sm:h-14 w-auto object-contain"
              />
            </LocalizedClientLink>
          </div>

          {/* Center Navigation Links (Desktop) */}
          <nav className="hidden md:flex items-center gap-7 lg:gap-9 text-sm font-medium text-stone-700">
            <LocalizedClientLink
              href="/store"
              className="text-[#143625] font-semibold hover:text-[#7C5338] transition-colors"
            >
              All Products
            </LocalizedClientLink>
            <LocalizedClientLink
              href="/collections/desi-ghee"
              className="hover:text-[#143625] transition-colors"
            >
              A2 Desi Ghee
            </LocalizedClientLink>
            <LocalizedClientLink
              href="/collections/raw-honey"
              className="hover:text-[#143625] transition-colors"
            >
              Raw Honey
            </LocalizedClientLink>
            <LocalizedClientLink
              href="/collections/cold-pressed-oils"
              className="hover:text-[#143625] transition-colors"
            >
              Cold-Pressed Oils
            </LocalizedClientLink>
            <LocalizedClientLink
              href="/collections/organic-jaggery"
              className="hover:text-[#143625] transition-colors"
            >
              Organic Jaggery
            </LocalizedClientLink>
            <LocalizedClientLink
              href="/#story"
              className="hover:text-[#143625] transition-colors"
            >
              Our Roots
            </LocalizedClientLink>
          </nav>

          {/* Right Actions: Search, Wishlist, Account, Cart, CTA */}
          <HeaderActions
            cartButton={
              <Suspense
                fallback={
                  <LocalizedClientLink
                    className="relative inline-flex items-center p-1.5 text-stone-800 hover:text-[#143625] transition"
                    href="/cart"
                    aria-label="Cart"
                  >
                    <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                    </svg>
                    <span className="absolute -top-1 -right-1 bg-[#143625] text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center shadow-2xs">
                      0
                    </span>
                  </LocalizedClientLink>
                }
              >
                <CartButton />
              </Suspense>
            }
          />
        </header>
      </div>
    </div>
  )
}
