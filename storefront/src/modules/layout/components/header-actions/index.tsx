"use client"

import React, { useState } from "react"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { useWishlist } from "@modules/wishlist/wishlist-context"
import SearchModal from "@modules/search/search-modal"
import WishlistDrawer from "@modules/wishlist/wishlist-drawer"

export default function HeaderActions({ cartButton }: { cartButton: React.ReactNode }) {
  const { totalCount: wishlistCount, openWishlistDrawer } = useWishlist()
  const [isSearchOpen, setIsSearchOpen] = useState(false)

  return (
    <>
      <div className="flex items-center gap-2 sm:gap-4 shrink-0">
        {/* Search Trigger Button (Desktop & Mobile) */}
        <button
          type="button"
          onClick={() => setIsSearchOpen(true)}
          aria-label="Search products"
          className="p-2 rounded-full text-stone-700 hover:text-[#143625] hover:bg-stone-100 transition"
        >
          <svg className="w-5 h-5 sm:w-5.5 sm:h-5.5" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
          </svg>
        </button>

        {/* Wishlist Button */}
        <button
          type="button"
          onClick={openWishlistDrawer}
          aria-label="View Wishlist"
          className="relative p-2 rounded-full text-stone-700 hover:text-red-500 hover:bg-stone-100 transition"
        >
          <svg className="w-5 h-5 sm:w-5.5 sm:h-5.5" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
          </svg>
          {wishlistCount > 0 && (
            <span className="absolute top-0.5 right-0.5 bg-red-500 text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center shadow-2xs">
              {wishlistCount}
            </span>
          )}
        </button>

        {/* Account Link (Desktop only) */}
        <LocalizedClientLink
          className="hidden sm:inline-flex p-2 rounded-full text-stone-700 hover:text-[#143625] hover:bg-stone-100 transition"
          href="/account"
          aria-label="Account"
        >
          <svg className="w-5 h-5 sm:w-5.5 sm:h-5.5" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
          </svg>
        </LocalizedClientLink>

        {/* Cart Button */}
        <div className="flex items-center">
          {cartButton}
        </div>

        {/* Shop Now CTA Button (Desktop) */}
        <LocalizedClientLink
          href="/store"
          className="hidden lg:inline-flex bg-[#143625] hover:bg-[#0e271a] text-white text-xs font-semibold px-4 py-2.5 rounded-lg transition-colors shadow-xs whitespace-nowrap"
        >
          Shop Now →
        </LocalizedClientLink>
      </div>

      {/* Global Modals */}
      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
      <WishlistDrawer />
    </>
  )
}
