import { HttpTypes } from "@medusajs/types"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

type ProductInfoProps = {
  product: HttpTypes.StoreProduct
}

export default function ProductInfo({ product }: ProductInfoProps) {
  return (
    <div id="product-info" className="flex flex-col gap-y-3">
      {/* Breadcrumb Navigation */}
      <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs text-stone-500 flex-wrap">
        <LocalizedClientLink href="/" className="hover:text-[#143625]">
          Home
        </LocalizedClientLink>
        <span>/</span>
        <LocalizedClientLink href="/store" className="hover:text-[#143625]">
          Products
        </LocalizedClientLink>
        {product.collection && (
          <>
            <span>/</span>
            <LocalizedClientLink
              href={`/collections/${product.collection.handle}`}
              className="hover:text-[#143625] font-medium text-stone-700"
            >
              {product.collection.title}
            </LocalizedClientLink>
          </>
        )}
      </nav>

      {/* Category Pill & Verified Purity Tag */}
      <div className="flex items-center gap-2 flex-wrap pt-1">
        <span className="text-[11px] font-bold uppercase tracking-wider text-[#7C5338] bg-amber-50 px-2.5 py-0.5 rounded-full border border-amber-200/60">
          {product.collection?.title || "Seth Farm Staple"}
        </span>
        <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200/60 flex items-center gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse" />
          100% Pure & Vedic
        </span>
      </div>

      {/* Product Title */}
      <h1
        className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-[#143625] tracking-tight leading-tight mt-1"
        data-testid="product-title"
      >
        {product.title}
      </h1>

      {/* Customer Rating Bar */}
      <div className="flex items-center gap-2 text-xs text-stone-600">
        <div className="flex text-amber-500 text-sm">
          ★★★★★
        </div>
        <span className="font-bold text-stone-900">4.9 / 5.0</span>
        <span className="text-stone-400">•</span>
        <span className="text-stone-500 underline cursor-pointer">
          148 Verified Ratings
        </span>
      </div>

      {/* Product Description */}
      {product.description && (
        <div className="mt-2 text-sm text-stone-600 leading-relaxed space-y-2 border-t border-stone-100 pt-3">
          <p data-testid="product-description" className="whitespace-pre-line">
            {product.description}
          </p>
        </div>
      )}
    </div>
  )
}
