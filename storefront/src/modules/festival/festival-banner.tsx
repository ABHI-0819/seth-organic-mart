"use client"

import React, { useState } from "react"
import { useFestival } from "./festival-context"
import { FestivalId } from "./festival-config"

export default function FestivalBanner() {
  const {
    activeFestival,
    timeLeft,
    setFestivalId,
    isFestivalMode,
    toggleFestivalMode,
    availableFestivals,
  } = useFestival()

  const [copied, setCopied] = useState(false)
  const [showSelector, setShowSelector] = useState(false)

  const handleCopyCode = () => {
    navigator.clipboard?.writeText(activeFestival.code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2200)
  }

  const pad = (n: number) => String(n).padStart(2, "0")

  return (
    <div
      style={{
        background: activeFestival.themeBg,
        color: activeFestival.textColor,
      }}
      className="relative z-40 transition-colors duration-500 text-xs py-2 px-3 sm:px-6 shadow-xs border-b border-white/10"
    >
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-2">
        {/* Left: Festival Greeting & Offer */}
        <div className="flex items-center gap-2 flex-wrap justify-center text-center md:text-left">
          <span className="text-base select-none">{activeFestival.icon}</span>
          <span className="font-bold tracking-wide uppercase text-[11px] px-2 py-0.5 rounded-full bg-white/15 text-white">
            {activeFestival.greeting}
          </span>
          <span className="font-medium text-stone-100 hidden sm:inline">
            {activeFestival.bannerSubtitle}
          </span>
        </div>

        {/* Center / Right: Countdown Timer & Coupon Code */}
        <div className="flex items-center gap-3 sm:gap-4 shrink-0 flex-wrap justify-center">
          {/* Live Countdown Timer */}
          <div className="flex items-center gap-1.5 bg-black/25 backdrop-blur-xs px-2.5 py-1 rounded-md text-[11px] font-mono border border-white/15">
            <span className="text-stone-300 font-sans text-[10px] uppercase font-semibold mr-0.5">
              Ends in:
            </span>
            <div className="flex items-center gap-1 font-bold text-white">
              <span>{pad(timeLeft.days)}d</span>:
              <span>{pad(timeLeft.hours)}h</span>:
              <span>{pad(timeLeft.minutes)}m</span>:
              <span className="text-amber-300">{pad(timeLeft.seconds)}s</span>
            </div>
          </div>

          {/* Coupon Code Pill */}
          <button
            type="button"
            onClick={handleCopyCode}
            aria-label="Copy festival promo code"
            className="group inline-flex items-center gap-1.5 bg-white text-stone-900 hover:bg-stone-100 font-semibold text-[11px] px-3 py-1 rounded-md shadow-xs transition active:scale-95"
          >
            <span className="text-[10px] text-stone-500 uppercase tracking-wider">Use:</span>
            <span className="font-mono font-bold tracking-wider text-[#143625]">
              {activeFestival.code}
            </span>
            <span className="text-[10px] font-medium text-amber-600 bg-amber-50 px-1.5 py-0.2 rounded border border-amber-200">
              {copied ? "COPIED! ✓" : "COPY"}
            </span>
          </button>

          {/* Festival Switcher Trigger */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setShowSelector(!showSelector)}
              className="text-[10px] text-white/90 hover:text-white bg-white/10 hover:bg-white/20 px-2 py-1 rounded border border-white/20 transition flex items-center gap-1"
              title="Switch Festival Campaign Theme"
            >
              <span>{activeFestival.name}</span>
              <span className="text-[9px]">▾</span>
            </button>

            {/* Dropdown Modal for testing festivals */}
            {showSelector && (
              <div
                className="absolute right-0 mt-2 w-56 bg-stone-900/95 backdrop-blur-md text-white rounded-xl shadow-2xl p-2 z-50 border border-white/20 text-xs"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="px-2 py-1.5 border-b border-white/10 flex items-center justify-between">
                  <span className="font-semibold text-stone-300 text-[11px] uppercase tracking-wider">
                    Festival Campaigns
                  </span>
                  <button
                    onClick={() => setShowSelector(false)}
                    className="text-stone-400 hover:text-white"
                  >
                    ✕
                  </button>
                </div>
                <div className="py-1 space-y-1 max-h-60 overflow-y-auto">
                  {availableFestivals.map((fest) => {
                    const isSelected = activeFestival.id === fest.id
                    return (
                      <button
                        key={fest.id}
                        type="button"
                        onClick={() => {
                          setFestivalId(fest.id as FestivalId)
                          setShowSelector(false)
                        }}
                        className={`w-full text-left px-2.5 py-1.5 rounded-lg flex items-center gap-2 transition ${
                          isSelected
                            ? "bg-white/20 text-white font-bold"
                            : "hover:bg-white/10 text-stone-300"
                        }`}
                      >
                        <span className="text-sm">{fest.icon}</span>
                        <div className="flex-1 truncate">
                          <p className="truncate text-[11px]">{fest.name}</p>
                          <p className="text-[9px] text-stone-400 truncate">
                            {fest.discountPercent}% OFF • {fest.code}
                          </p>
                        </div>
                        {isSelected && <span className="text-amber-400 text-xs">✓</span>}
                      </button>
                    )
                  })}
                </div>
                <div className="pt-1.5 mt-1 border-t border-white/10 px-2 flex justify-between items-center text-[10px] text-stone-400">
                  <span>Festival Mode</span>
                  <button
                    onClick={toggleFestivalMode}
                    className={`px-2 py-0.5 rounded text-[10px] font-semibold ${
                      isFestivalMode ? "bg-emerald-600 text-white" : "bg-stone-700 text-stone-300"
                    }`}
                  >
                    {isFestivalMode ? "ENABLED" : "DISABLED"}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
