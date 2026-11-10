"use client"

import React, { useState } from "react"
import { HttpTypes } from "@medusajs/types"
import ProductPreview from "@modules/products/components/product-preview"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

interface TrendingProductsSectionProps {
  products: HttpTypes.StoreProduct[]
  region: HttpTypes.StoreRegion
}

const TABS = [
  { id: "all", label: "All Pure Staples" },
  { id: "bestsellers", label: "Bestsellers 🔥" },
  { id: "trending", label: "Trending Now ⚡" },
  { id: "new", label: "New Harvest 🌾" },
  { id: "festive", label: "Festive Deals 🎁" },
]

export default function TrendingProductsSection({
  products,
  region,
}: TrendingProductsSectionProps) {
  const [activeTab, setActiveTab] = useState("all")

  // Filter or arrange products based on active tab
  const getFilteredProducts = () => {
    if (!products || products.length === 0) return []
    if (activeTab === "bestsellers") {
      return [...products].slice(0, 4)
    }
    if (activeTab === "trending") {
      return [...products].reverse().slice(0, 4)
    }
    if (activeTab === "new") {
      return [...products].slice(1, 5)
    }
    return products.slice(0, 8)
  }

  const displayProducts = getFilteredProducts()

  return (
    <section className="py-12 sm:py-20 bg-white">
      <div className="content-container">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 sm:mb-12 gap-4">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-widest text-emerald-800 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
              Direct From Ancestral Soil
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-[#143625] mt-2.5 tracking-tight">
              Trending & Best-Selling Staples
            </h2>
            <p className="text-xs sm:text-sm text-stone-600 mt-1 max-w-xl">
              100% natural, lab-tested, and chemical-free. Experience the pure taste and authentic nutrition our ancestors cherished.
            </p>
          </div>

          <LocalizedClientLink
            href="/store"
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-[#143625] hover:text-[#7C5338] transition group shrink-0"
          >
            <span>Explore Entire Catalog</span>
            <span className="group-hover:translate-x-1 transition-transform">→</span>
          </LocalizedClientLink>
        </div>

        {/* Filter Tabs (Horizontal Scrollable on Mobile) */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-3 mb-6 sm:mb-8 border-b border-stone-100">
          {TABS.map((tab) => {
            const isActive = activeTab === tab.id
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all duration-200 shrink-0 ${
                  isActive
                    ? "bg-[#143625] text-white shadow-xs"
                    : "bg-[#FAF7F2] text-stone-600 hover:text-stone-900 hover:bg-[#F3E9D2]"
                }`}
              >
                {tab.label}
              </button>
            )
          })}
        </div>

        {/* Product Cards Grid: 2 columns on mobile (360px-430px), 3 on tablet, 4 on desktop */}
        {displayProducts.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-6">
            {displayProducts.map((product) => (
              <ProductPreview
                key={product.id}
                product={product}
                region={region}
                isFeatured={true}
              />
            ))}
          </div>
        ) : (
          <div className="py-12 text-center text-stone-500">
            <p className="text-sm">No products found in this category.</p>
          </div>
        )}
      </div>
    </section>
  )
}
