"use client"

import React, { createContext, useContext, useState, useEffect } from "react"

export interface WishlistItem {
  id: string
  title: string
  handle: string
  thumbnail?: string | null
  price?: string | null
  originalPrice?: string | null
}

interface WishlistContextType {
  items: WishlistItem[]
  isInWishlist: (id: string) => boolean
  toggleWishlist: (item: WishlistItem) => void
  removeItem: (id: string) => void
  totalCount: number
  isDrawerOpen: boolean
  openWishlistDrawer: () => void
  closeWishlistDrawer: () => void
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined)

const WISHLIST_STORAGE_KEY = "seth_organic_wishlist_v1"

export const WishlistProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [items, setItems] = useState<WishlistItem[]>([])
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    try {
      const stored = localStorage.getItem(WISHLIST_STORAGE_KEY)
      if (stored) {
        setItems(JSON.parse(stored))
      }
    } catch (e) {
      console.error("Failed to load wishlist from storage", e)
    }
  }, [])

  const saveItems = (updated: WishlistItem[]) => {
    setItems(updated)
    try {
      localStorage.setItem(WISHLIST_STORAGE_KEY, JSON.stringify(updated))
    } catch (e) {
      console.error("Failed to save wishlist", e)
    }
  }

  const isInWishlist = (id: string) => {
    return items.some((item) => item.id === id)
  }

  const toggleWishlist = (item: WishlistItem) => {
    if (isInWishlist(item.id)) {
      saveItems(items.filter((i) => i.id !== item.id))
    } else {
      saveItems([...items, item])
    }
  }

  const removeItem = (id: string) => {
    saveItems(items.filter((i) => i.id !== id))
  }

  return (
    <WishlistContext.Provider
      value={{
        items: mounted ? items : [],
        isInWishlist,
        toggleWishlist,
        removeItem,
        totalCount: mounted ? items.length : 0,
        isDrawerOpen,
        openWishlistDrawer: () => setIsDrawerOpen(true),
        closeWishlistDrawer: () => setIsDrawerOpen(false),
      }}
    >
      {children}
    </WishlistContext.Provider>
  )
}

export const useWishlist = () => {
  const context = useContext(WishlistContext)
  if (!context) {
    throw new Error("useWishlist must be used within a WishlistProvider")
  }
  return context
}
