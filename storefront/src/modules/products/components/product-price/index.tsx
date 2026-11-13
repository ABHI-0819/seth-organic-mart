import { getProductPrice } from "@lib/util/get-product-price"
import { HttpTypes } from "@medusajs/types"

export default function ProductPrice({
  product,
  variant,
}: {
  product: HttpTypes.StoreProduct
  variant?: HttpTypes.StoreProductVariant
}) {
  const { cheapestPrice, variantPrice } = getProductPrice({
    product,
    variantId: variant?.id,
  })

  const selectedPrice = variant ? variantPrice : cheapestPrice

  if (!selectedPrice) {
    return <div className="block w-36 h-10 bg-stone-100 rounded-lg animate-pulse" />
  }

  const calcNum = selectedPrice.calculated_price_number || 0
  const origNum = selectedPrice.original_price_number || 0

  let showStrikethrough = false
  let originalFormatted = ""
  let discountBadge = ""
  let savingsAmount = ""

  if (origNum > calcNum && calcNum > 0) {
    showStrikethrough = true
    originalFormatted = selectedPrice.original_price
    const pct = Math.round(((origNum - calcNum) / origNum) * 100)
    discountBadge = `${pct}% OFF`
    savingsAmount = `₹${(origNum - calcNum).toLocaleString("en-IN")}`
  }

  return (
    <div className="flex flex-col gap-1.5 py-1">
      {/* Price row */}
      <div className="flex items-baseline flex-wrap gap-2.5 sm:gap-3">
        {/* Prominent Current / Discounted Price */}
        <span className="font-serif text-2xl sm:text-3xl font-bold text-[#143625] tracking-tight">
          {!variant && <span className="text-sm font-sans font-normal text-stone-500 mr-1">From</span>}
          <span
            data-testid="product-price"
            data-value={selectedPrice.calculated_price_number}
          >
            {selectedPrice.calculated_price}
          </span>
        </span>

        {/* Strikethrough Actual Price */}
        {showStrikethrough && originalFormatted && (
          <span
            className="line-through text-sm sm:text-base text-stone-400 font-normal"
            data-testid="original-product-price"
            data-value={selectedPrice.original_price_number}
          >
            {originalFormatted}
          </span>
        )}

        {/* Discount Percentage Pill */}
        {discountBadge && (
          <span className="text-xs sm:text-sm font-bold text-emerald-800 bg-emerald-100/80 px-2.5 py-0.5 rounded-full border border-emerald-300">
            {discountBadge}
          </span>
        )}
      </div>

      {/* Savings & Tax Callout */}
      <div className="flex items-center gap-2 text-xs text-stone-500">
        {savingsAmount && (
          <span className="text-emerald-700 font-semibold">
            You save {savingsAmount}!
          </span>
        )}
        <span>•</span>
        <span>Inclusive of all taxes</span>
      </div>
    </div>
  )
}
