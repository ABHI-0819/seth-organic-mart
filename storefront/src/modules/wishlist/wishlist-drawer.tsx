"use client"

import React, { useEffect, useState } from "react"
import { createPortal } from "react-dom"
import { useWishlist } from "./wishlist-context"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

export default function WishlistDrawer() {
  const { items, isDrawerOpen, closeWishlistDrawer, removeItem } = useWishlist()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (isDrawerOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }
    return () => {
      document.body.style.overflow = ""
    }
  }, [isDrawerOpen])

  if (!mounted || !isDrawerOpen) return null

  return createPortal(
    <div className="fixed inset-0 z-[100] flex justify-end">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-xs transition-opacity"
        onClick={closeWishlistDrawer}
      />

      {/* Drawer Panel */}
      <div className="relative z-10 w-[88vw] max-w-[380px] h-full bg-[#FAF7F2] shadow-2xl flex flex-col justify-between border-l border-stone-200 animate-fade-in">
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-stone-200/80 bg-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xl">❤️</span>
            <h2 className="font-serif text-lg font-bold text-[#143625]">
              My Wishlist ({items.length})
            </h2>
          </div>
          <button
            type="button"
            onClick={closeWishlistDrawer}
            aria-label="Close Wishlist"
            className="w-8 h-8 rounded-full flex items-center justify-center text-stone-500 hover:text-stone-900 hover:bg-stone-100 transition"
          >
            ✕
          </button>
        </div>

        {/* Items List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-6 text-stone-500">
              <span className="text-4xl mb-3">🌿</span>
              <p className="font-serif text-base font-semibold text-stone-800">
                Your Wishlist is Empty
              </p>
              <p className="text-xs text-stone-500 mt-1 max-w-xs">
                Explore our pure Desi Ghee, Raw Honey, Cold-Pressed Oils, and Organic Jaggery to save your favorites!
              </p>
              <LocalizedClientLink
                href="/store"
                onClick={closeWishlistDrawer}
                className="mt-5 inline-block bg-[#143625] text-white text-xs font-semibold px-5 py-2.5 rounded-lg shadow-sm hover:bg-[#0c2418] transition"
              >
                Browse Products
              </LocalizedClientLink>
            </div>
          ) : (
            items.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-xl p-3 border border-stone-200/80 shadow-xs flex gap-3 items-center"
              >
                <div className="w-16 h-16 rounded-lg bg-[#FAF8F5] overflow-hidden shrink-0 border border-stone-100">
                  {item.thumbnail ? (
                    <img
                      src={item.thumbnail}
                      alt={item.title}
                      className="w-full h-full object-cover object-center"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-stone-400 text-xs">
                      🌿
                    </div>
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <LocalizedClientLink
                    href={`/products/${item.handle}`}
                    onClick={closeWishlistDrawer}
                    className="font-serif text-xs font-bold text-stone-900 hover:text-[#143625] line-clamp-1"
                  >
                    {item.title}
                  </LocalizedClientLink>
                  <div className="flex items-center gap-1.5 mt-1">
                    {item.originalPrice && (
                      <span className="text-[11px] text-stone-400 line-through">
                        {item.originalPrice}
                      </span>
                    )}
                    <span className="text-xs font-bold text-[#143625]">
                      {item.price || "₹2,500"}
                    </span>
                  </div>
                  <LocalizedClientLink
                    href={`/products/${item.handle}`}
                    onClick={closeWishlistDrawer}
                    className="mt-1.5 inline-block text-[11px] font-semibold text-[#7C5338] hover:text-[#143625]"
                  >
                    View Details →
                  </LocalizedClientLink>
                </div>

                <button
                  type="button"
                  onClick={() => removeItem(item.id)}
                  aria-label="Remove item"
                  className="text-stone-400 hover:text-red-500 p-1.5 transition shrink-0"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="p-4 border-t border-stone-200/80 bg-white space-y-2">
            <LocalizedClientLink
              href="/store"
              onClick={closeWishlistDrawer}
              className="block w-full text-center bg-[#143625] hover:bg-[#0c2418] text-white text-xs font-semibold py-3 rounded-lg shadow-sm transition"
            >
              Continue Shopping
            </LocalizedClientLink>
          </div>
        )}
      </div>
    </div>,
    document.body
  )
}
