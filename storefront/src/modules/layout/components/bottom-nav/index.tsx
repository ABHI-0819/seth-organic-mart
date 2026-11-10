"use client"

import React, { useState } from "react"
import { usePathname } from "next/navigation"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { useWishlist } from "@modules/wishlist/wishlist-context"
import SearchModal from "@modules/search/search-modal"

export default function MobileBottomNav({ cartCount = 0 }: { cartCount?: number }) {
  const pathname = usePathname()
  const { totalCount: wishlistCount, openWishlistDrawer } = useWishlist()
  const [isSearchOpen, setIsSearchOpen] = useState(false)

  const isHome = pathname === "/" || pathname === "/in" || pathname === "/us"
  const isStore = pathname.includes("/store") || pathname.includes("/categories")
  const isCart = pathname.includes("/cart")

  return (
    <>
      <nav
        aria-label="Mobile Bottom Navigation"
        className="md:hidden fixed bottom-0 inset-x-0 z-40 bg-white/95 backdrop-blur-md border-t border-stone-200/90 shadow-[0_-4px_16px_rgba(0,0,0,0.06)] pb-[env(safe-area-inset-bottom)]"
      >
        <div className="grid grid-cols-5 h-14 max-w-lg mx-auto items-center px-1">
          {/* Home */}
          <LocalizedClientLink
            href="/"
            className={`flex flex-col items-center justify-center py-1 transition ${
              isHome ? "text-[#143625] font-semibold" : "text-stone-500 hover:text-stone-900"
            }`}
          >
            <svg className="w-5 h-5 mb-0.5" fill={isHome ? "currentColor" : "none"} stroke="currentColor" strokeWidth={isHome ? 1.5 : 1.8} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
            </svg>
            <span className="text-[10px] tracking-tight">Home</span>
          </LocalizedClientLink>

          {/* Store / Explore */}
          <LocalizedClientLink
            href="/store"
            className={`flex flex-col items-center justify-center py-1 transition ${
              isStore ? "text-[#143625] font-semibold" : "text-stone-500 hover:text-stone-900"
            }`}
          >
            <svg className="w-5 h-5 mb-0.5" fill={isStore ? "currentColor" : "none"} stroke="currentColor" strokeWidth={isStore ? 1.5 : 1.8} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 21v-7.5a.75.75 0 01.75-.75h3a.75.75 0 01.75.75V21m-4.5 0H2.25A2.25 2.25 0 010 18.75V10.5M13.5 21h7.5A2.25 2.25 0 0023.25 18.75V10.5m-18.75 0V6.75A2.25 2.25 0 016.75 4.5h10.5a2.25 2.25 0 012.25 2.25v3.75m-15 0h15" />
            </svg>
            <span className="text-[10px] tracking-tight">Shop</span>
          </LocalizedClientLink>

          {/* Search Trigger */}
          <button
            type="button"
            onClick={() => setIsSearchOpen(true)}
            className="flex flex-col items-center justify-center py-1 text-stone-500 hover:text-[#143625] transition"
          >
            <svg className="w-5 h-5 mb-0.5" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
            </svg>
            <span className="text-[10px] tracking-tight">Search</span>
          </button>

          {/* Wishlist Trigger */}
          <button
            type="button"
            onClick={openWishlistDrawer}
            className="relative flex flex-col items-center justify-center py-1 text-stone-500 hover:text-[#143625] transition"
          >
            <div className="relative">
              <svg className="w-5 h-5 mb-0.5" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
              </svg>
              {wishlistCount > 0 && (
                <span className="absolute -top-1 -right-2 bg-red-500 text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  {wishlistCount}
                </span>
              )}
            </div>
            <span className="text-[10px] tracking-tight">Wishlist</span>
          </button>

          {/* Cart */}
          <LocalizedClientLink
            href="/cart"
            className={`relative flex flex-col items-center justify-center py-1 transition ${
              isCart ? "text-[#143625] font-semibold" : "text-stone-500 hover:text-stone-900"
            }`}
          >
            <div className="relative">
              <svg className="w-5 h-5 mb-0.5" fill={isCart ? "currentColor" : "none"} stroke="currentColor" strokeWidth={isCart ? 1.5 : 1.8} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
              </svg>
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-2 bg-[#143625] text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center shadow-2xs">
                  {cartCount}
                </span>
              )}
            </div>
            <span className="text-[10px] tracking-tight">Cart</span>
          </LocalizedClientLink>
        </div>
      </nav>

      {/* Global Search Modal */}
      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </>
  )
}
