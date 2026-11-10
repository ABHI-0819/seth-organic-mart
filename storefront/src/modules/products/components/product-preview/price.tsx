import React from "react"
import { VariantPrice } from "types/global"

interface PreviewPriceProps {
  price?: VariantPrice | null
  festivalDiscount?: number
}

export default function PreviewPrice({
  price,
  festivalDiscount = 15,
}: PreviewPriceProps) {
  if (!price) {
    return (
      <div className="flex items-center gap-2">
        <span className="text-sm font-bold text-[#143625]">₹2,500</span>
        <span className="text-xs text-stone-400 line-through">₹3,000</span>
        <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded">
          17% OFF
        </span>
      </div>
    )
  }

  const calcNum = price.calculated_price_number || 0
  const origNum = price.original_price_number || 0

  let showStrikethrough = false
  let originalFormatted = ""
  let discountBadge = ""

  if (origNum > calcNum && calcNum > 0) {
    // Official Medusa price list discount
    showStrikethrough = true
    originalFormatted = price.original_price
    const pct = Math.round(((origNum - calcNum) / origNum) * 100)
    discountBadge = `${pct}% OFF`
  } else if (calcNum > 0) {
    // Festival / promotional retail discount: compute MRP accurately
    showStrikethrough = true
    const discountFactor = (100 - festivalDiscount) / 100
    const impliedOriginal = Math.round(calcNum / discountFactor / 50) * 50 // round to nearest 50
    const actualDiff = Math.round(((impliedOriginal - calcNum) / impliedOriginal) * 100)
    originalFormatted = `₹${impliedOriginal.toLocaleString("en-IN")}`
    discountBadge = `${actualDiff}% OFF`
  }

  return (
    <div className="flex items-baseline flex-wrap gap-1.5 sm:gap-2">
      {/* Prominent Discounted Price */}
      <span
        className="font-bold text-sm sm:text-base text-[#143625] tracking-tight"
        data-testid="price"
      >
        {price.calculated_price}
      </span>

      {/* Actual Price with Strikethrough: ~~₹3,000~~ */}
      {showStrikethrough && originalFormatted && (
        <span
          className="line-through text-[11px] sm:text-xs text-stone-400 font-normal"
          data-testid="original-price"
        >
          {originalFormatted}
        </span>
      )}

      {/* Discount Percentage Badge: 17% OFF */}
      {discountBadge && (
        <span className="text-[10px] sm:text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200/60 shrink-0">
          {discountBadge}
        </span>
      )}
    </div>
  )
}
