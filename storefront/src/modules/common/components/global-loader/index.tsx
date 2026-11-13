"use client"

import React, { useEffect, useState, startTransition } from "react"
import { usePathname, useSearchParams } from "next/navigation"

export const SethBrandSpinner = ({ label = "Loading..." }: { label?: string }) => {
  return (
    <div className="fixed inset-0 z-[99999] pointer-events-none flex flex-col justify-between">
      {/* Sleek Minimalist Top Progress Bar */}
      <div className="w-full h-1 bg-transparent overflow-hidden">
        <div className="h-full bg-gradient-to-r from-[#143625] via-[#C89D66] to-[#143625] animate-[shimmer_1.5s_infinite]" style={{ width: "100%", backgroundSize: "200% 100%" }} />
      </div>

      {/* Subtle Bottom-Right Minimalist Spinner Badge */}
      <div className="self-end m-6 bg-white/90 backdrop-blur-md border border-stone-200 shadow-lg rounded-full px-4 py-2 flex items-center gap-2.5 pointer-events-auto transition-all animate-fade-in">
        <div className="w-4 h-4 rounded-full border-2 border-[#143625]/20 border-t-[#143625] animate-spin" />
        <span className="text-xs font-serif font-medium text-[#143625] tracking-wide">
          {label}
        </span>
      </div>
    </div>
  )
}

export default function GlobalLoader() {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const [loading, setLoading] = useState(false)
  const [label, setLabel] = useState("Loading...")

  // Automatically dismiss loader the exact microsecond the new page route renders
  useEffect(() => {
    setLoading(false)
  }, [pathname, searchParams])

  useEffect(() => {
    if (typeof window === "undefined") return

    let activeRequests = 0
    let safetyTimer: NodeJS.Timeout | null = null

    const showLoader = (text = "Loading...") => {
      activeRequests += 1
      if (activeRequests === 1) {
        setLabel(text)
        setLoading(true)
      }
      // Safety timeout: Never let loader get stuck for more than 3 seconds
      if (safetyTimer) clearTimeout(safetyTimer)
      safetyTimer = setTimeout(() => {
        activeRequests = 0
        setLoading(false)
      }, 3000)
    }

    const hideLoader = () => {
      activeRequests = Math.max(0, activeRequests - 1)
      if (activeRequests === 0) {
        if (safetyTimer) clearTimeout(safetyTimer)
        // Tiny delay to ensure smooth transition
        setTimeout(() => setLoading(false), 150)
      }
    }

    // Loader is controlled cleanly for explicit user actions
    // Link Clicks for Page Navigation
    const handleAnchorClick = (e: MouseEvent) => {
      const target = (e.target as HTMLElement)?.closest("a")
      if (!target) return
      const href = target.getAttribute("href")
      if (
        !href ||
        href.startsWith("#") ||
        href.startsWith("http") ||
        target.target === "_blank" ||
        e.metaKey ||
        e.ctrlKey
      ) {
        return
      }

      const currentPath = window.location.pathname + window.location.search
      if (href !== currentPath) {
        startTransition(() => {
          showLoader("Navigating...")
        })
      }
    }

    // Intercept Form Submissions
    const handleFormSubmit = () => {
      startTransition(() => {
        showLoader("Saving...")
      })
    }

    document.addEventListener("click", handleAnchorClick, true)
    document.addEventListener("submit", handleFormSubmit, true)

    return () => {
      document.removeEventListener("click", handleAnchorClick, true)
      document.removeEventListener("submit", handleFormSubmit, true)
      if (safetyTimer) clearTimeout(safetyTimer)
    }
  }, [])

  if (!loading) return null

  return <SethBrandSpinner label={label} />
}
