"use client"

import React from "react"
import { FestivalProvider } from "@modules/festival/festival-context"
import { WishlistProvider } from "@modules/wishlist/wishlist-context"

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <FestivalProvider>
      <WishlistProvider>
        {children}
      </WishlistProvider>
    </FestivalProvider>
  )
}
