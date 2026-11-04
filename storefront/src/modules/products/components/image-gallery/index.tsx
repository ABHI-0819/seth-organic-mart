"use client"

import { HttpTypes } from "@medusajs/types"
import { Container, clx } from "@medusajs/ui"
import Image from "next/image"
import React, { useState, useRef, useCallback } from "react"

type ImageGalleryProps = {
  images: HttpTypes.StoreProductImage[]
}

const ImageGallery = ({ images }: ImageGalleryProps) => {
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [isZoomed, setIsZoomed] = useState(false)
  const [isLightboxOpen, setIsLightboxOpen] = useState(false)
  const [zoomOrigin, setZoomOrigin] = useState({ x: 50, y: 50 })

  // Touch swipe & pinch-to-zoom state
  const touchStartX = useRef<number | null>(null)
  const touchEndX = useRef<number | null>(null)
  const [pinchScale, setPinchScale] = useState(1)
  const initialPinchDistance = useRef<number | null>(null)

  const validImages = images?.filter((img) => Boolean(img?.url)) || []

  const handlePrev = useCallback(() => {
    setSelectedIndex((prev) => (prev === 0 ? validImages.length - 1 : prev - 1))
    setPinchScale(1)
  }, [validImages.length])

  const handleNext = useCallback(() => {
    setSelectedIndex((prev) => (prev === validImages.length - 1 ? 0 : prev + 1))
    setPinchScale(1)
  }, [validImages.length])

  // Desktop hover pan-zoom handler
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isZoomed) return
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect()
    const x = ((e.clientX - left) / width) * 100
    const y = ((e.clientY - top) / height) * 100
    setZoomOrigin({ x, y })
  }

  // Mobile swipe & 2-finger pinch-to-zoom handlers
  const getDistance = (touches: React.TouchList) => {
    const dx = touches[0].clientX - touches[1].clientX
    const dy = touches[0].clientY - touches[1].clientY
    return Math.hypot(dx, dy)
  }

  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    if (e.touches.length === 2) {
      initialPinchDistance.current = getDistance(e.touches)
    } else if (e.touches.length === 1) {
      touchStartX.current = e.touches[0].clientX
    }
  }

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (e.touches.length === 2 && initialPinchDistance.current) {
      const currentDistance = getDistance(e.touches)
      const scale = Math.min(Math.max(currentDistance / initialPinchDistance.current, 1), 3)
      setPinchScale(scale)
    } else if (e.touches.length === 1) {
      touchEndX.current = e.touches[0].clientX
    }
  }

  const handleTouchEnd = () => {
    initialPinchDistance.current = null
    if (pinchScale > 1.1) {
      setTimeout(() => setPinchScale(1), 250)
      return
    }

    if (touchStartX.current !== null && touchEndX.current !== null) {
      const diff = touchStartX.current - touchEndX.current
      if (Math.abs(diff) > 45 && validImages.length > 1) {
        if (diff > 0) {
          handleNext()
        } else {
          handlePrev()
        }
      }
    }
    touchStartX.current = null
    touchEndX.current = null
  }

  if (validImages.length === 0) {
    return (
      <div className="w-full px-[20px] box-border">
        <div className="w-full aspect-square bg-[#FAF7F2] rounded-2xl flex items-center justify-center text-stone-400 text-sm border border-stone-200/70">
          No product image available
        </div>
      </div>
    )
  }

  const currentImage = validImages[selectedIndex] || validImages[0]

  return (
    <div className="w-full px-[20px] box-border select-none mx-auto max-w-2xl md:max-w-none">
      <div className="flex flex-col-reverse md:flex-row items-center md:items-start justify-center gap-3.5 md:gap-4 w-full">
        {/* THUMBNAIL STRIP: VERTICAL LEFT ON DESKTOP, HORIZONTAL BELOW ON MOBILE */}
        {validImages.length > 1 && (
          <div
            className="flex md:flex-col items-center md:items-start justify-start gap-2.5 sm:gap-3 w-full md:w-[76px] lg:w-[84px] overflow-x-auto md:overflow-y-auto md:max-h-[520px] py-1 px-0.5 scrollbar-none shrink-0"
            role="tablist"
            aria-label="Product image thumbnails"
          >
            {validImages.map((image, index) => {
              const isSelected = index === selectedIndex
              return (
                <button
                  key={image.id || index}
                  type="button"
                  role="tab"
                  aria-selected={isSelected}
                  aria-label={`View product image ${index + 1}`}
                  onClick={() => {
                    setSelectedIndex(index)
                    setPinchScale(1)
                  }}
                  className={clx(
                    "relative aspect-square w-16 sm:w-[72px] md:w-full rounded-xl overflow-hidden bg-[#FAF7F2] shrink-0 transition-all duration-200 focus:outline-none",
                    isSelected
                      ? "ring-2 ring-[#143625] ring-offset-2 opacity-100 shadow-xs"
                      : "border border-stone-200/80 opacity-60 hover:opacity-95 hover:border-stone-400"
                  )}
                >
                  <Image
                    src={image.url}
                    alt={`Thumbnail ${index + 1}`}
                    fill
                    sizes="84px"
                    className="object-cover object-center"
                  />
                </button>
              )
            })}
          </div>
        )}

        {/* MAIN PRODUCT IMAGE STAGE */}
        <div className="relative flex-1 w-full min-w-0">
          <Container
            className="relative aspect-square w-full overflow-hidden rounded-2xl bg-[#FAF7F2] border border-stone-200/70 shadow-xs p-0 group cursor-zoom-in"
            onMouseEnter={() => setIsZoomed(true)}
            onMouseLeave={() => setIsZoomed(false)}
            onMouseMove={handleMouseMove}
            onClick={() => setIsLightboxOpen(true)}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            style={{ touchAction: "pan-y pinch-zoom" }}
          >
            <div
              className="w-full h-full relative transition-transform duration-200 ease-out"
              style={{
                transform: isZoomed
                  ? "scale(1.85)"
                  : `scale(${pinchScale})`,
                transformOrigin: isZoomed
                  ? `${zoomOrigin.x}% ${zoomOrigin.y}%`
                  : "center center",
              }}
            >
              <Image
                key={currentImage.id || selectedIndex}
                src={currentImage.url}
                alt={`Product image ${selectedIndex + 1}`}
                fill
                priority
                quality={92}
                sizes="(max-width: 768px) calc(100vw - 40px), (max-width: 1200px) 50vw, 600px"
                className="object-contain object-center transition-opacity duration-300"
                draggable={false}
              />
            </div>

            {/* TOP-RIGHT BADGE: IMAGE COUNTER & ZOOM HINT */}
            <div className="absolute top-3 right-3 z-10 flex items-center gap-2 pointer-events-none">
              {validImages.length > 1 && (
                <span className="bg-black/60 backdrop-blur-xs text-white text-[11px] font-medium px-2.5 py-1 rounded-full tracking-wide">
                  {selectedIndex + 1} / {validImages.length}
                </span>
              )}
              <span className="bg-white/90 backdrop-blur-xs text-stone-700 text-[11px] font-medium px-2.5 py-1 rounded-full shadow-xs hidden lg:inline-flex items-center gap-1">
                🔍 Hover or click to zoom
              </span>
            </div>

            {/* LEFT / RIGHT NAVIGATION ARROWS */}
            {validImages.length > 1 && (
              <>
                <button
                  type="button"
                  aria-label="Previous image"
                  onClick={(e) => {
                    e.stopPropagation()
                    handlePrev()
                  }}
                  className="absolute left-3 top-1/2 -translate-y-1/2 z-10 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white/90 hover:bg-white text-[#143625] shadow-md flex items-center justify-center transition-all opacity-90 md:opacity-0 md:group-hover:opacity-100 focus:opacity-100"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2.2} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <button
                  type="button"
                  aria-label="Next image"
                  onClick={(e) => {
                    e.stopPropagation()
                    handleNext()
                  }}
                  className="absolute right-3 top-1/2 -translate-y-1/2 z-10 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white/90 hover:bg-white text-[#143625] shadow-md flex items-center justify-center transition-all opacity-90 md:opacity-0 md:group-hover:opacity-100 focus:opacity-100"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2.2} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </>
            )}
          </Container>

          {/* MOBILE HINT */}
          <p className="text-[11px] text-stone-400 text-center mt-2 md:hidden">
            Swipe to browse • Pinch or tap image to zoom
          </p>
        </div>
      </div>

      {/* FULL-SCREEN PINCH-TO-ZOOM LIGHTBOX MODAL */}
      {isLightboxOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-xs flex flex-col items-center justify-center p-5"
          onClick={() => setIsLightboxOpen(false)}
        >
          <button
            type="button"
            aria-label="Close full screen zoom"
            onClick={() => setIsLightboxOpen(false)}
            className="absolute top-5 right-5 z-50 w-11 h-11 rounded-full bg-white/15 hover:bg-white/25 text-white flex items-center justify-center text-xl transition"
          >
            ✕
          </button>

          <div
            className="relative w-full max-w-3xl aspect-square overflow-auto flex items-center justify-center"
            onClick={(e) => e.stopPropagation()}
            style={{ touchAction: "pinch-zoom" }}
          >
            <Image
              src={currentImage.url}
              alt={`Zoomed product image ${selectedIndex + 1}`}
              fill
              quality={100}
              sizes="100vw"
              className="object-contain"
            />
          </div>

          {validImages.length > 1 && (
            <div
              className="flex gap-2.5 mt-4 overflow-x-auto max-w-full px-4 py-2"
              onClick={(e) => e.stopPropagation()}
            >
              {validImages.map((img, idx) => (
                <button
                  key={img.id || idx}
                  type="button"
                  onClick={() => setSelectedIndex(idx)}
                  className={clx(
                    "relative w-14 h-14 rounded-lg overflow-hidden shrink-0 transition-all",
                    idx === selectedIndex
                      ? "ring-2 ring-[#E6C79C] scale-105 opacity-100"
                      : "opacity-50 hover:opacity-80"
                  )}
                >
                  <Image
                    src={img.url}
                    alt={`Modal thumbnail ${idx + 1}`}
                    fill
                    sizes="60px"
                    className="object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default ImageGallery
