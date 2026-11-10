"use client"

import React, { createContext, useContext, useState, useEffect } from "react"
import { FestivalCampaign, FestivalId, FESTIVAL_CAMPAIGNS } from "./festival-config"

interface TimeLeft {
  days: number
  hours: number
  minutes: number
  seconds: number
}

interface FestivalContextType {
  activeFestival: FestivalCampaign
  setFestivalId: (id: FestivalId) => void
  timeLeft: TimeLeft
  isFestivalMode: boolean
  toggleFestivalMode: () => void
  availableFestivals: FestivalCampaign[]
}

const FestivalContext = createContext<FestivalContextType | undefined>(undefined)

const STORAGE_KEY = "seth_active_festival"
const TOGGLE_KEY = "seth_festival_mode_enabled"

export const FestivalProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [festivalId, setFestivalIdState] = useState<FestivalId>("diwali")
  const [isFestivalMode, setIsFestivalMode] = useState<boolean>(true)
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 1,
    hours: 14,
    minutes: 32,
    seconds: 45,
  })

  // Read initial festival from URL params or localStorage
  useEffect(() => {
    try {
      const urlParams = new URLSearchParams(window.location.search)
      const urlFest = urlParams.get("festival") as FestivalId | null
      if (urlFest && FESTIVAL_CAMPAIGNS[urlFest]) {
        setFestivalIdState(urlFest)
        localStorage.setItem(STORAGE_KEY, urlFest)
        return
      }

      const storedFest = localStorage.getItem(STORAGE_KEY) as FestivalId | null
      if (storedFest && FESTIVAL_CAMPAIGNS[storedFest]) {
        setFestivalIdState(storedFest)
      }

      const storedMode = localStorage.getItem(TOGGLE_KEY)
      if (storedMode !== null) {
        setIsFestivalMode(storedMode === "true")
      }
    } catch (e) {
      // Ignore in SSR
    }
  }, [])

  const setFestivalId = (id: FestivalId) => {
    setFestivalIdState(id)
    try {
      localStorage.setItem(STORAGE_KEY, id)
    } catch (e) {}
  }

  const toggleFestivalMode = () => {
    setIsFestivalMode((prev) => {
      const next = !prev
      try {
        localStorage.setItem(TOGGLE_KEY, String(next))
      } catch (e) {}
      return next
    })
  }

  // Ticking countdown timer
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 }
        }
        if (prev.minutes > 0) {
          return { ...prev, minutes: 59, seconds: 59 }
        }
        if (prev.hours > 0) {
          return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 }
        }
        if (prev.days > 0) {
          return { ...prev, days: prev.days - 1, hours: 23, minutes: 59, seconds: 59 }
        }
        return { days: 2, hours: 18, minutes: 40, seconds: 0 } // Reset gracefully
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  const activeFestival = isFestivalMode
    ? FESTIVAL_CAMPAIGNS[festivalId] || FESTIVAL_CAMPAIGNS.diwali
    : FESTIVAL_CAMPAIGNS.default

  const availableFestivals = Object.values(FESTIVAL_CAMPAIGNS)

  return (
    <FestivalContext.Provider
      value={{
        activeFestival,
        setFestivalId,
        timeLeft,
        isFestivalMode,
        toggleFestivalMode,
        availableFestivals,
      }}
    >
      {children}
    </FestivalContext.Provider>
  )
}

export const useFestival = () => {
  const context = useContext(FestivalContext)
  if (!context) {
    throw new Error("useFestival must be used within a FestivalProvider")
  }
  return context
}
