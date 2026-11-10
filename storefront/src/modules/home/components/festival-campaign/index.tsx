"use client"

import React, { useState } from "react"
import { useFestival } from "@modules/festival/festival-context"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

export default function FestivalCampaignSection() {
  const { activeFestival, timeLeft, isFestivalMode } = useFestival()
  const [copied, setCopied] = useState(false)

  if (!isFestivalMode) return null

  const handleCopyCode = () => {
    navigator.clipboard?.writeText(activeFestival.code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2200)
  }

  const pad = (n: number) => String(n).padStart(2, "0")

  return (
    <section className="py-8 sm:py-14 content-container">
      <div
        style={{
          background: activeFestival.themeBg,
          color: activeFestival.textColor,
        }}
        className="relative rounded-3xl overflow-hidden p-6 sm:p-12 shadow-xl border border-white/15"
      >
        {/* Festive Background Glow Accents */}
        <div className="absolute top-0 right-0 -mt-10 -mr-10 w-64 h-64 rounded-full bg-amber-400/20 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 -mb-10 -ml-10 w-64 h-64 rounded-full bg-orange-500/20 blur-3xl pointer-events-none" />

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Details */}
          <div className="lg:col-span-7 space-y-4 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-md px-3.5 py-1 rounded-full text-xs font-bold text-white border border-white/20">
              <span className="text-base">{activeFestival.icon}</span>
              <span>{activeFestival.greeting}</span>
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight tracking-tight text-white">
              {activeFestival.bannerTitle}
            </h2>

            <p className="text-sm sm:text-base text-stone-200 max-w-xl mx-auto lg:mx-0 leading-relaxed">
              {activeFestival.bannerSubtitle}. Hand-churned Vedic Bilona Ghee, pure raw forest honey, and unrefined sweeteners prepared specially for your auspicious celebrations.
            </p>

            {/* Perks / Offers Pills */}
            <div className="flex flex-wrap gap-2 pt-1 justify-center lg:justify-start">
              {activeFestival.perks.map((perk) => (
                <span
                  key={perk}
                  className="text-xs bg-black/25 backdrop-blur-xs text-amber-200 px-3 py-1 rounded-lg border border-white/10"
                >
                  ✓ {perk}
                </span>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-3 justify-center lg:justify-start">
              <LocalizedClientLink
                href="/store"
                className="bg-white text-stone-900 hover:bg-stone-100 font-bold text-xs sm:text-sm px-6 py-3.5 rounded-xl shadow-md transition active:scale-95 flex items-center gap-2"
              >
                <span>Shop Festive Collection</span>
                <span>→</span>
              </LocalizedClientLink>

              {/* Coupon Pill Button */}
              <button
                type="button"
                onClick={handleCopyCode}
                aria-label="Copy coupon code"
                className="bg-black/30 hover:bg-black/40 text-white font-semibold text-xs sm:text-sm px-5 py-3 rounded-xl border border-white/25 transition active:scale-95 flex items-center gap-2"
              >
                <span className="text-stone-300">Code:</span>
                <span className="font-mono font-bold tracking-wider text-amber-300">
                  {activeFestival.code}
                </span>
                <span className="text-[10px] bg-amber-400 text-stone-950 font-bold px-2 py-0.5 rounded ml-1">
                  {copied ? "COPIED! ✓" : "COPY CODE"}
                </span>
              </button>
            </div>
          </div>

          {/* Right Countdown Box */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center">
            <div className="w-full max-w-sm bg-black/35 backdrop-blur-md rounded-2xl p-6 border border-white/20 text-center shadow-lg">
              <span className="text-[11px] font-bold uppercase tracking-widest text-amber-300">
                ⚡ LIMITED TIME FESTIVE OFFER
              </span>
              <p className="text-xs text-stone-300 mt-1">
                Prices increase once celebration countdown concludes:
              </p>

              {/* 4 Block Countdown */}
              <div className="grid grid-cols-4 gap-2 sm:gap-3 my-5">
                {[
                  { label: "Days", val: pad(timeLeft.days) },
                  { label: "Hours", val: pad(timeLeft.hours) },
                  { label: "Minutes", val: pad(timeLeft.minutes) },
                  { label: "Seconds", val: pad(timeLeft.seconds) },
                ].map((item) => (
                  <div
                    key={item.label}
                    className="bg-white/10 rounded-xl p-2.5 sm:p-3 border border-white/10 flex flex-col items-center"
                  >
                    <span className="font-mono font-bold text-xl sm:text-2xl text-white">
                      {item.val}
                    </span>
                    <span className="text-[9px] uppercase tracking-wider text-stone-300 mt-0.5">
                      {item.label}
                    </span>
                  </div>
                ))}
              </div>

              <div className="bg-white/10 rounded-xl p-2.5 text-xs text-amber-200 border border-white/10 flex items-center justify-center gap-2">
                <span>🎁</span>
                <span>Get flat {activeFestival.discountPercent}% instant discount at checkout</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
