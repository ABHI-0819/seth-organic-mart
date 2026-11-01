"use client"

import { useState, useEffect } from "react"
import { createPortal } from "react-dom"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { StoreRegion } from "@medusajs/types"

const NAV_ITEMS = [
  { name: "Home", href: "/", subtitle: "Welcome to our farm" },
  { name: "Shop All Products", href: "/store", subtitle: "Ghee, Honey, Oils & Jaggery" },
  { name: "Our Story", href: "/#story", subtitle: "Rooted in Vedic tradition" },
  { name: "Our Process", href: "/#process", subtitle: "From organic soil to jar" },
  { name: "My Account", href: "/account", subtitle: "Orders & profile" },
  { name: "Shopping Cart", href: "/cart", subtitle: "View your basket" },
]

const SideMenu = ({ regions }: { regions: StoreRegion[] | null }) => {
  const [open, setOpen] = useState(false)
  const [mounted, setMounted] = useState(false)

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

      {/* Portal Slide-Over Drawer so it renders cleanly above the entire page */}
      {mounted &&
        open &&
        createPortal(
          <div className="fixed inset-0 z-[9999] flex">
            {/* Dark Blurred Backdrop */}
            <div
              className="fixed inset-0 bg-black/50 backdrop-blur-xs transition-opacity"
              onClick={() => setOpen(false)}
            />

            {/* Minimalist Cream Drawer Panel */}
            <div className="relative z-10 w-[84vw] max-w-[340px] h-full bg-[#FAF7F2] shadow-2xl flex flex-col justify-between border-r border-stone-200">
              {/* Top Header: Logo + Close Button */}
              <div className="flex items-center justify-between px-6 py-4 border-b border-stone-200/80 bg-white">
                <LocalizedClientLink
                  href="/"
                  onClick={() => setOpen(false)}
                  className="flex items-center"
                >
                  <img
                    src="/logo.svg"
                    alt="Seth Organic Farm"
                    className="h-11 w-auto object-contain"
                  />
                </LocalizedClientLink>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  aria-label="Close Menu"
                  data-testid="close-menu-button"
                  className="w-9 h-9 rounded-full flex items-center justify-center text-stone-500 hover:text-stone-900 hover:bg-stone-100 transition"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Navigation Links */}
              <div className="flex-1 overflow-y-auto px-6 py-6">
                <p className="text-[10px] font-semibold uppercase tracking-widest text-[#7C5338] mb-3">
                  Navigation
                </p>
                <ul className="divide-y divide-stone-200/70">
                  {NAV_ITEMS.map((item) => (
                    <li key={item.name}>
                      <LocalizedClientLink
                        href={item.href}
                        onClick={() => setOpen(false)}
                        className="group flex items-center justify-between py-3.5 text-left transition"
                      >
                        <div>
                          <p className="font-serif text-base font-semibold text-stone-900 group-hover:text-[#143625]">
                            {item.name}
                          </p>
                          <p className="text-xs text-stone-500 mt-0.5">
                            {item.subtitle}
                          </p>
                        </div>
                        <span className="text-stone-400 group-hover:text-[#143625] group-hover:translate-x-0.5 transition-transform">
                          →
                        </span>
                      </LocalizedClientLink>
                    </li>
                  ))}
                </ul>

                {/* Quick CTA inside Drawer */}
                <div className="mt-6 p-4 rounded-xl bg-[#143625] text-white">
                  <p className="font-serif text-sm font-semibold">
                    100% Pure Farm-to-Table
                  </p>
                  <p className="text-xs text-stone-300 mt-1 leading-relaxed">
                    A2 Gir Cow Ghee, Wild Forest Honey, Kachi Ghani Oil & Organic Jaggery.
                  </p>
                  <LocalizedClientLink
                    href="/store"
                    onClick={() => setOpen(false)}
                    className="mt-3 inline-block w-full text-center bg-[#7C5338] hover:bg-[#66422b] text-white text-xs font-medium py-2.5 rounded-md transition"
                  >
                    Explore Store
                  </LocalizedClientLink>
                </div>
              </div>

              {/* Drawer Footer */}
              <div className="px-6 py-4 border-t border-stone-200/80 bg-white flex items-center justify-between text-xs text-stone-500">
                <span className="flex items-center gap-1.5 font-medium text-stone-700">
                  🇮🇳 Shipping across India (INR)
                </span>
                <span>© {new Date().getFullYear()}</span>
              </div>
            </div>
          </div>,
          document.body
        )}
    </>
  )
}

export default SideMenu
