"use client"

import React from "react"
import { useWishlist, WishlistItem } from "@modules/wishlist/wishlist-context"

interface WishlistButtonProps {
  item: WishlistItem
  className?: string
}

export default function WishlistButton({ item, className = "" }: WishlistButtonProps) {
  const { isInWishlist, toggleWishlist } = useWishlist()
  const active = isInWishlist(item.id)

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    toggleWishlist(item)
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-label={active ? "Remove from wishlist" : "Add to wishlist"}
      className={`w-8 h-8 sm:w-9 sm:h-9 rounded-full flex items-center justify-center transition-all duration-200 backdrop-blur-md shadow-xs active:scale-90 ${
        active
          ? "bg-red-50 text-red-500 border border-red-200"
          : "bg-white/85 hover:bg-white text-stone-500 hover:text-red-500 border border-stone-200/60"
      } ${className}`}
    >
      <svg
        className={`w-4 h-4 sm:w-4.5 sm:h-4.5 transition-transform duration-200 ${
          active ? "fill-red-500 stroke-red-500 scale-110" : "fill-none stroke-currentColor"
        }`}
        strokeWidth={1.8}
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
        />
      </svg>
    </button>
  )
}
