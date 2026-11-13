"use client"

import React, { useState } from "react"
import { useFestival } from "@modules/festival/festival-context"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { AdminPromotion } from "@lib/data/campaigns"

interface FestivalCampaignSectionProps {
  adminPromotion?: AdminPromotion | null
}

export default function FestivalCampaignSection({
  adminPromotion,
}: FestivalCampaignSectionProps) {
  const { activeFestival, timeLeft, isFestivalMode } = useFestival()
  const [copied, setCopied] = useState(false)

  // Only render if an active promotion exists from Medusa Admin or festival mode is enabled
  if (!adminPromotion && !isFestivalMode) return null

  const promoCode = adminPromotion?.code || activeFestival?.code || "FARM10"
  const discountPercent = adminPromotion?.application_method?.value
    ? Math.round(adminPromotion.application_method.value)
    : activeFestival?.discountPercent || 10

  const bannerTitle =
    adminPromotion?.campaign?.name ||
    activeFestival?.bannerTitle ||
    "Special Farm Offer"

  const bannerSubtitle =
    adminPromotion?.campaign?.description ||
    adminPromotion?.application_method?.description ||
    activeFestival?.bannerSubtitle ||
    `Enjoy flat ${discountPercent}% off on all pure organic products.`

  const handleCopyCode = () => {
    navigator.clipboard?.writeText(promoCode)
    setCopied(true)
    setTimeout(() => setCopied(false), 2200)
  }

  return (
    <section className="py-6 sm:py-10 content-container">
      <div className="relative rounded-2xl overflow-hidden bg-[#143625] text-white p-6 sm:p-10 shadow-md border border-white/10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Offer Details */}
          <div className="space-y-2 text-center md:text-left max-w-xl">
            <span className="inline-block text-[11px] font-bold tracking-widest uppercase bg-[#C89D66] text-[#143625] px-3 py-1 rounded-full">
              Exclusive Offer • {discountPercent}% OFF
            </span>

            <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-white pt-1">
              {bannerTitle}
            </h2>

            <p className="text-sm text-stone-200 leading-relaxed font-sans">
              {bannerSubtitle}
            </p>
          </div>

          {/* Action & Promo Code */}
          <div className="flex flex-wrap items-center justify-center gap-3 shrink-0">
            <button
              type="button"
              onClick={handleCopyCode}
              aria-label="Copy promo code"
              className="bg-white/10 hover:bg-white/20 text-white font-mono text-sm px-4 py-3 rounded-xl border border-white/20 transition active:scale-95 flex items-center gap-2"
            >
              <span className="text-stone-300 text-xs font-sans">Code:</span>
              <span className="font-bold tracking-wider text-amber-300">{promoCode}</span>
              <span className="text-[10px] bg-amber-400 text-[#143625] font-bold font-sans px-2 py-0.5 rounded ml-1">
                {copied ? "COPIED! ✓" : "COPY"}
              </span>
            </button>

            <LocalizedClientLink
              href="/store"
              className="bg-[#C89D66] hover:bg-[#b58c57] text-[#143625] font-bold text-sm px-6 py-3 rounded-xl transition shadow-xs active:scale-95 flex items-center gap-2"
            >
              <span>Shop Now</span>
              <span>→</span>
            </LocalizedClientLink>
          </div>
        </div>
      </div>
    </section>
  )
}
