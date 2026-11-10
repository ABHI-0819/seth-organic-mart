"use client"

import { useState, useEffect } from "react"
import { createPortal } from "react-dom"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { StoreRegion } from "@medusajs/types"
import { useWishlist } from "@modules/wishlist/wishlist-context"
import { useFestival } from "@modules/festival/festival-context"

const QUICK_LINKS = [
  { name: "Home", href: "/" },
  { name: "Shop All Products", href: "/store" },
  { name: "Our Vedic Story", href: "/#story" },
  { name: "My Orders & Account", href: "/account" },
  { name: "Shopping Cart", href: "/cart" },
]

const SideMenu = ({ regions }: { regions: StoreRegion[] | null }) => {
  const [open, setOpen] = useState(false)
  const [mounted, setMounted] = useState(false)
  const { totalCount: wishlistCount, openWishlistDrawer } = useWishlist()
  const { activeFestival, isFestivalMode } = useFestival()

  useEffect(() => {
    setMounted(true)
  }, [])

  // Prevent background scrolling when drawer is open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }
    return () => {
      document.body.style.overflow = ""
    }
  }, [open])

  return (
    <>
      {/* Minimalist Hamburger Trigger Button */}
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Open Menu"
        data-testid="nav-menu-button"
        className="inline-flex items-center justify-center p-2 -ml-1 rounded-lg text-stone-800 hover:text-[#143625] hover:bg-stone-200/50 transition focus:outline-none"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25H12" />
        </svg>
      </button>

      {/* Portal Slide-Over Drawer */}
      {mounted &&
        open &&
        createPortal(
          <div className="fixed inset-0 z-[9999] flex">
            {/* Dark Blurred Backdrop */}
            <div
              className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
              onClick={() => setOpen(false)}
            />

            {/* Cream Drawer Panel */}
            <div className="relative z-10 w-[86vw] max-w-[340px] h-full bg-[#FAF7F2] shadow-2xl flex flex-col justify-between border-r border-stone-200">
              {/* Top Header: Logo + Close Button */}
              <div className="flex items-center justify-between px-5 py-3.5 border-b border-stone-200/80 bg-white">
                <LocalizedClientLink
                  href="/"
                  onClick={() => setOpen(false)}
                  className="flex items-center"
                >
                  <img
                    src="/logo.svg"
                    alt="Seth Organic Farm"
                    className="h-10 w-auto object-contain"
                  />
                </LocalizedClientLink>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  aria-label="Close Menu"
                  data-testid="close-menu-button"
                  className="w-8 h-8 rounded-full flex items-center justify-center text-stone-500 hover:text-stone-900 hover:bg-stone-100 transition"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Navigation Body */}
              <div className="flex-1 overflow-y-auto p-5 space-y-6">
                {/* Active Campaign / Offer Callout */}
                {isFestivalMode && (
                  <div
                    style={{ background: activeFestival.themeBg }}
                    className="p-3.5 rounded-xl text-white shadow-xs border border-white/20"
                  >
                    <div className="flex items-center gap-1.5 text-xs font-bold">
                      <span>{activeFestival.icon}</span>
                      <span>{activeFestival.greeting}</span>
                    </div>
                    <p className="text-[11px] text-stone-200 mt-1">
                      {activeFestival.bannerSubtitle}
                    </p>
                    <div className="mt-2 text-[10px] bg-white/20 px-2 py-0.5 rounded inline-block font-mono font-bold">
                      Code: {activeFestival.code}
                    </div>
                  </div>
                )}

                {/* Quick Shortcuts */}
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-wider text-stone-400 mb-2">
                    Navigation
                  </p>
                  <ul className="divide-y divide-stone-200/60">
                    {QUICK_LINKS.map((item) => (
                      <li key={item.name}>
                        <LocalizedClientLink
                          href={item.href}
                          onClick={() => setOpen(false)}
                          className="flex items-center justify-between py-3 text-sm font-semibold text-stone-800 hover:text-[#143625] transition"
                        >
                          <span>{item.name}</span>
                          <span className="text-stone-400 text-xs">→</span>
                        </LocalizedClientLink>
                      </li>
                    ))}
                    <li>
                      <button
                        type="button"
                        onClick={() => {
                          setOpen(false)
                          openWishlistDrawer()
                        }}
                        className="w-full flex items-center justify-between py-3 text-sm font-semibold text-stone-800 hover:text-red-500 transition"
                      >
                        <span className="flex items-center gap-2">
                          <span className="text-red-500 text-base">❤️</span>
                          <span>My Saved Wishlist</span>
                        </span>
                        {wishlistCount > 0 && (
                          <span className="bg-red-500 text-white text-[11px] font-bold px-2 py-0.5 rounded-full">
                            {wishlistCount}
                          </span>
                        )}
                      </button>
                    </li>
                  </ul>
                </div>

                {/* Trust callout */}
                <div className="p-4 rounded-xl bg-[#143625] text-white space-y-1">
                  <p className="font-serif text-xs font-bold">
                    🌿 100% Vedic Organic Guarantee
                  </p>
                  <p className="text-[11px] text-stone-300 leading-relaxed">
                    Zero chemical adulteration. Shipped safely across India in protective food-grade glass jars.
                  </p>
                </div>
              </div>

              {/* Drawer Footer */}
              <div className="p-4 border-t border-stone-200/80 bg-white flex items-center justify-between text-[11px] text-stone-500">
                <span>🇮🇳 Ships Pan-India</span>
                <span className="font-semibold text-stone-700">Call / WhatsApp Support</span>
              </div>
            </div>
          </div>,
          document.body
        )}
    </>
  )
}

export default SideMenu
