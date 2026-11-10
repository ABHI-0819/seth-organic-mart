"use client"

import React, { useState, useEffect, useRef } from "react"
import { createPortal } from "react-dom"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

interface SearchModalProps {
  isOpen: boolean
  onClose: () => void
}

const POPULAR_SEARCHES = [
  "A2 Desi Gir Cow Ghee",
  "Raw Forest Honey",
  "Cold-Pressed Mustard Oil",
  "Organic Sugarcane Jaggery",
  "Vedic Bilona Ghee",
  "Festive Gift Hampers",
]

const QUICK_PRODUCTS = [
  {
    title: "A2 Desi Gir Cow Vedic Bilona Ghee",
    handle: "a2-desi-gir-cow-ghee",
    price: "₹2,500",
    originalPrice: "₹3,000",
    discount: "17% OFF",
    tag: "Bestseller",
    img: "https://images.unsplash.com/photo-1589927986089-35812388d1f4?auto=format&fit=crop&w=400&q=80",
  },
  {
    title: "100% Raw Wild Forest Honey",
    handle: "raw-forest-honey",
    price: "₹850",
    originalPrice: "₹1,000",
    discount: "15% OFF",
    tag: "Immunity",
    img: "https://images.unsplash.com/photo-1587049352846-4a222e784d38?auto=format&fit=crop&w=400&q=80",
  },
  {
    title: "Cold-Pressed Kachi Ghani Mustard Oil",
    handle: "cold-pressed-mustard-oil",
    price: "₹450",
    originalPrice: "₹520",
    discount: "13% OFF",
    tag: "Wood Pressed",
    img: "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&w=400&q=80",
  },
  {
    title: "Natural Organic Sugarcane Jaggery",
    handle: "organic-sugarcane-jaggery",
    price: "₹320",
    originalPrice: "₹380",
    discount: "16% OFF",
    tag: "Chemical Free",
    img: "https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?auto=format&fit=crop&w=400&q=80",
  },
]

export default function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const [query, setQuery] = useState("")
  const [mounted, setMounted] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
      setTimeout(() => inputRef.current?.focus(), 100)
    } else {
      document.body.style.overflow = ""
      setQuery("")
    }
    return () => {
      document.body.style.overflow = ""
    }
  }, [isOpen])

  if (!mounted || !isOpen) return null

  const filtered = QUICK_PRODUCTS.filter((p) =>
    p.title.toLowerCase().includes(query.toLowerCase())
  )

  return createPortal(
    <div className="fixed inset-0 z-[110] flex flex-col justify-start items-center p-3 sm:p-6">
      {/* Dark backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Search Container */}
      <div className="relative z-10 w-full max-w-2xl bg-white rounded-2xl shadow-2xl overflow-hidden border border-stone-200 mt-6 sm:mt-12 animate-fade-in flex flex-col max-h-[85vh]">
        {/* Search Header Input */}
        <div className="p-4 sm:p-5 border-b border-stone-200 flex items-center gap-3">
          <svg className="w-5 h-5 text-[#143625] shrink-0" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
          </svg>
          <input
            ref={inputRef}
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search pure ghee, raw honey, oils, jaggery..."
            className="w-full text-sm sm:text-base text-stone-900 placeholder-stone-400 focus:outline-none bg-transparent"
          />
          {query && (
            <button
              onClick={() => setQuery("")}
              className="text-xs text-stone-400 hover:text-stone-700 px-1"
            >
              Clear
            </button>
          )}
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full flex items-center justify-center text-stone-400 hover:text-stone-800 hover:bg-stone-100 text-sm transition"
          >
            ✕
          </button>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
          {/* Quick Filter Tags */}
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-wider text-stone-400 mb-2.5">
              Popular Searches
            </p>
            <div className="flex flex-wrap gap-2">
              {POPULAR_SEARCHES.map((tag) => (
                <button
                  key={tag}
                  type="button"
                  onClick={() => setQuery(tag)}
                  className="text-xs bg-[#FAF7F2] hover:bg-[#F3E9D2] text-stone-700 hover:text-[#143625] px-3 py-1.5 rounded-full border border-stone-200/80 transition"
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>

          {/* Results List */}
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-wider text-stone-400 mb-3">
              {query ? `Search Results (${filtered.length})` : "Featured Farm Staples"}
            </p>

            {filtered.length === 0 ? (
              <div className="text-center py-8 text-stone-500">
                <p className="text-sm">No products found matching &ldquo;{query}&rdquo;</p>
                <p className="text-xs text-stone-400 mt-1">Try searching for Ghee, Honey, Oil, or Jaggery.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {filtered.map((product) => (
                  <LocalizedClientLink
                    key={product.handle}
                    href={`/products/${product.handle}`}
                    onClick={onClose}
                    className="p-2.5 rounded-xl border border-stone-200/80 hover:border-[#143625] hover:shadow-xs transition bg-[#FAF8F5]/50 flex items-center gap-3 group"
                  >
                    <div className="w-14 h-14 rounded-lg bg-white overflow-hidden shrink-0 border border-stone-100">
                      <img
                        src={product.img}
                        alt={product.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition"
                      />
                    </div>
                    <div className="min-w-0 flex-1">
                      <span className="text-[9px] font-bold uppercase tracking-wider text-[#7C5338] bg-amber-50 px-1.5 py-0.5 rounded">
                        {product.tag}
                      </span>
                      <h4 className="font-serif text-xs font-semibold text-stone-900 group-hover:text-[#143625] truncate mt-1">
                        {product.title}
                      </h4>
                      <div className="flex items-center gap-1.5 mt-0.5 text-xs">
                        <span className="font-bold text-[#143625]">{product.price}</span>
                        <span className="text-stone-400 line-through text-[11px]">
                          {product.originalPrice}
                        </span>
                        <span className="text-emerald-700 text-[10px] font-semibold">
                          {product.discount}
                        </span>
                      </div>
                    </div>
                  </LocalizedClientLink>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-3 bg-[#FAF7F2] border-t border-stone-200 flex items-center justify-between text-xs text-stone-500">
          <span>🌿 100% Vedic & Organic Products</span>
          <LocalizedClientLink
            href="/store"
            onClick={onClose}
            className="text-[#143625] font-semibold hover:underline"
          >
            Explore Full Store →
          </LocalizedClientLink>
        </div>
      </div>
    </div>,
    document.body
  )
}
