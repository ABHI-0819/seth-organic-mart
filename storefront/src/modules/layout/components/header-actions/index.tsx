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
      <div className="flex items-center gap-2 sm:gap-3 shrink-0">
        {/* Search Trigger Button */}
        <button
          type="button"
          onClick={() => setIsSearchOpen(true)}
          aria-label="Search products"
          className="p-2 sm:px-3 sm:py-2 rounded-xl text-stone-700 hover:text-[#143625] hover:bg-stone-100 transition flex items-center gap-1.5"
          title="Search products"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
          </svg>
          <span className="hidden xl:inline text-xs font-medium text-stone-500">Search</span>
        </button>

        {/* Clear & Visible Wishlist Button */}
        <button
          type="button"
          onClick={openWishlistDrawer}
          aria-label="View Wishlist"
          className="relative p-2 sm:px-3 sm:py-1.5 rounded-xl border border-stone-200 hover:border-red-300 text-stone-800 hover:text-red-600 bg-white hover:bg-red-50/50 transition-all flex items-center gap-1.5 shadow-2xs group"
          title="Open Wishlist"
        >
          <svg
            className="w-5 h-5 text-rose-500 group-hover:scale-110 transition-transform stroke-[2]"
            fill={wishlistCount > 0 ? "currentColor" : "none"}
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
          </svg>
          <span className="hidden sm:inline text-xs font-bold text-stone-700 group-hover:text-red-600">
            Wishlist
          </span>
          {wishlistCount > 0 && (
            <span className="bg-red-500 text-white text-[10px] font-bold px-1.5 py-0.2 rounded-full min-w-[18px] text-center">
              {wishlistCount}
            </span>
          )}
        </button>

        {/* Account Link (Desktop only) */}
        <LocalizedClientLink
          className="hidden sm:inline-flex p-2 rounded-xl text-stone-700 hover:text-[#143625] hover:bg-stone-100 transition"
          href="/account"
          aria-label="Account"
          title="My Account"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
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
