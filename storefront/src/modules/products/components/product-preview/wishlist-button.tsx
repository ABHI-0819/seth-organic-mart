"use client"

import React, { useState } from "react"
import { useWishlist, WishlistItem } from "@modules/wishlist/wishlist-context"

interface WishlistButtonProps {
  item: WishlistItem
  className?: string
}

export default function WishlistButton({ item, className = "" }: WishlistButtonProps) {
  const { isInWishlist, toggleWishlist } = useWishlist()
  const active = isInWishlist(item.id)
  const [justClicked, setJustClicked] = useState(false)

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    toggleWishlist(item)
    setJustClicked(true)
    setTimeout(() => setJustClicked(false), 1200)
  }

  return (
    <div className="relative group/wishlist">
      <button
        type="button"
        onClick={handleClick}
        aria-label={active ? "Remove from wishlist" : "Add to wishlist"}
        className={`w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center transition-all duration-300 shadow-md active:scale-90 ${
          active
            ? "bg-red-50 text-red-600 border-2 border-red-500 ring-2 ring-red-200/50"
            : "bg-white/95 hover:bg-white text-rose-500 hover:text-red-600 border border-stone-300 hover:border-red-400"
        } ${className}`}
        title={active ? "Wishlisted" : "Add to Wishlist"}
      >
        <svg
          className={`w-5 h-5 transition-transform duration-300 ${
            active
              ? "fill-red-600 stroke-red-600 scale-110"
              : "fill-none stroke-rose-500 hover:stroke-red-600 stroke-[2] group-hover/wishlist:scale-110"
          }`}
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
          />
        </svg>
      </button>

      {/* Floating tooltip/hint on click or hover */}
      {justClicked && (
        <span className="absolute -bottom-7 right-0 bg-stone-900 text-white text-[10px] font-bold px-2 py-0.5 rounded shadow-lg whitespace-nowrap animate-fade-in pointer-events-none z-20">
          {active ? "Added to Wishlist! ❤️" : "Removed"}
        </span>
      )}
    </div>
  )
}
