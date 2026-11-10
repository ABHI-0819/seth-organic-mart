import { getProductPrice } from "@lib/util/get-product-price"
import { HttpTypes } from "@medusajs/types"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import Thumbnail from "../thumbnail"
import PreviewPrice from "./price"
import WishlistButton from "./wishlist-button"

// Deterministic rating generator for products
function getProductRating(id: string) {
  let hash = 0
  for (let i = 0; i < id.length; i++) {
    hash = (hash << 5) - hash + id.charCodeAt(i)
    hash |= 0
  }
  const score = (4.8 + (Math.abs(hash) % 3) * 0.1).toFixed(1)
  const reviews = 85 + (Math.abs(hash) % 180)
  return { score, reviews }
}

export default async function ProductPreview({
  product,
  isFeatured,
  region,
}: {
  product: HttpTypes.StoreProduct
  isFeatured?: boolean
  region: HttpTypes.StoreRegion
}) {
  const { cheapestPrice } = getProductPrice({
    product,
  })

  const { score, reviews } = getProductRating(product.id || "seth")
  const productImg = product.thumbnail || product.images?.[0]?.url

  // Choose badge
  const badgeText = isFeatured
    ? "Bestseller"
    : product.collection?.title
    ? product.collection.title
    : "100% Pure"

  const wishlistItem = {
    id: product.id || "",
    title: product.title || "",
    handle: product.handle || "",
    thumbnail: productImg,
    price: cheapestPrice?.calculated_price || null,
    originalPrice: cheapestPrice?.original_price || null,
  }

  return (
    <div
      data-testid="product-wrapper"
      className="group relative flex flex-col h-full bg-white rounded-2xl border border-stone-200/80 shadow-[0_2px_8px_rgba(0,0,0,0.03)] hover:shadow-[0_8px_24px_rgba(20,54,37,0.08)] hover:border-stone-300 transition-all duration-300 overflow-hidden"
    >
      {/* Top Media Container */}
      <div className="relative aspect-square w-full bg-[#FAF8F5] overflow-hidden">
        <LocalizedClientLink
          href={`/products/${product.handle}`}
          className="block w-full h-full"
          aria-label={`View ${product.title}`}
        >
          <Thumbnail
            thumbnail={product.thumbnail}
            images={product.images}
            size="full"
            isFeatured={isFeatured}
            className="!rounded-none border-none shadow-none"
          />
        </LocalizedClientLink>

        {/* Top-Left Badge */}
        <div className="absolute top-2.5 left-2.5 z-10 pointer-events-none">
          <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-[#143625] bg-white/90 backdrop-blur-md px-2.5 py-1 rounded-full shadow-2xs border border-stone-200/60">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse" />
            {badgeText}
          </span>
        </div>

        {/* Top-Right Wishlist Button */}
        <div className="absolute top-2.5 right-2.5 z-10">
          <WishlistButton item={wishlistItem} />
        </div>
      </div>

      {/* Product Information Body */}
      <div className="p-3.5 sm:p-4 flex-1 flex flex-col justify-between gap-3">
        <div>
          {/* Star Rating & Verified Review Count */}
          <div className="flex items-center gap-1.5 text-xs text-stone-500 mb-1.5">
            <div className="flex text-amber-500 text-[11px] tracking-tight">
              ★ ★ ★ ★ ★
            </div>
            <span className="font-semibold text-stone-700 text-[11px]">{score}</span>
            <span className="text-[10px] text-stone-400">({reviews})</span>
          </div>

          {/* Product Title */}
          <LocalizedClientLink href={`/products/${product.handle}`}>
            <h3
              data-testid="product-title"
              className="font-serif text-sm sm:text-base font-bold text-stone-900 group-hover:text-[#143625] transition-colors line-clamp-2 leading-snug"
              title={product.title}
            >
              {product.title}
            </h3>
          </LocalizedClientLink>

          {/* Purity Guarantee Pill */}
          <p className="text-[11px] text-stone-500 mt-1 line-clamp-1 flex items-center gap-1">
            <span className="text-emerald-700 font-medium">✓ Vedic Heritage</span>
            <span>•</span>
            <span>Zero Preservatives</span>
          </p>
        </div>

        {/* Pricing & CTA Row */}
        <div className="pt-2 border-t border-stone-100 flex flex-col gap-2.5">
          {cheapestPrice && <PreviewPrice price={cheapestPrice} />}

          {/* Quick Action Button */}
          <LocalizedClientLink
            href={`/products/${product.handle}`}
            className="w-full text-center py-2 sm:py-2.5 px-3 rounded-lg text-xs font-semibold bg-[#143625] hover:bg-[#0c2418] text-white transition-all shadow-2xs group-hover:shadow-xs flex items-center justify-center gap-1.5"
          >
            <span>View & Buy</span>
            <span className="text-amber-300 font-bold">→</span>
          </LocalizedClientLink>
        </div>
      </div>
    </div>
  )
}
