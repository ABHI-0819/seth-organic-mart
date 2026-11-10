"use client"

import { updateLineItem } from "@lib/data/cart"
import { HttpTypes } from "@medusajs/types"
import DeleteButton from "@modules/common/components/delete-button"
import LineItemOptions from "@modules/common/components/line-item-options"
import LineItemPrice from "@modules/common/components/line-item-price"
import LineItemUnitPrice from "@modules/common/components/line-item-unit-price"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import Spinner from "@modules/common/icons/spinner"
import Thumbnail from "@modules/products/components/thumbnail"
import { useState } from "react"
import { normalizeImageUrl } from "@lib/util/image-url"

type ItemProps = {
  item: HttpTypes.StoreCartLineItem
  type?: "full" | "preview"
  currencyCode: string
}

const Item = ({ item, type = "full", currencyCode }: ItemProps) => {
  const [updating, setUpdating] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const changeQuantity = async (quantity: number) => {
    if (quantity < 1) return
    setError(null)
    setUpdating(true)

    await updateLineItem({
      lineId: item.id,
      quantity,
    })
      .catch((err) => {
        setError(err.message)
      })
      .finally(() => {
        setUpdating(false)
      })
  }

  // Robust image fallback chain
  const productImg = normalizeImageUrl(
    item.thumbnail ||
      item.variant?.product?.thumbnail ||
      item.variant?.product?.images?.[0]?.url
  )

  return (
    <div
      className="p-3.5 sm:p-5 bg-[#FAF8F5]/60 hover:bg-[#FAF8F5] rounded-2xl border border-stone-200/80 transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3.5 sm:gap-5"
      data-testid="product-row"
    >
      {/* Left: Product Thumbnail & Title Info */}
      <div className="flex items-center gap-3 sm:gap-4 w-full sm:w-auto min-w-0 flex-1">
        <LocalizedClientLink
          href={`/products/${item.product_handle}`}
          className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl overflow-hidden bg-white shrink-0 border border-stone-200/90 shadow-2xs block"
        >
          <Thumbnail
            thumbnail={productImg}
            images={item.variant?.product?.images}
            size="square"
            className="!rounded-none"
          />
        </LocalizedClientLink>

        <div className="min-w-0 flex-1">
          <LocalizedClientLink
            href={`/products/${item.product_handle}`}
            className="font-serif text-sm sm:text-base font-bold text-stone-900 hover:text-[#143625] transition-colors line-clamp-2 leading-snug"
            data-testid="product-title"
          >
            {item.product_title}
          </LocalizedClientLink>

          <div className="mt-1 flex items-center gap-2 flex-wrap text-xs text-stone-500">
            <LineItemOptions variant={item.variant} data-testid="product-variant" />
            <span className="hidden sm:inline">•</span>
            <span className="hidden sm:inline text-stone-400">
              <LineItemUnitPrice
                item={item}
                style="tight"
                currencyCode={currencyCode}
              />
            </span>
          </div>

          {error && (
            <p className="text-[11px] text-red-500 mt-1">{error}</p>
          )}
        </div>
      </div>

      {/* Right / Mobile Bottom: Quantity Stepper & Price Row */}
      <div className="flex items-center justify-between sm:justify-end gap-4 w-full sm:w-auto pt-2.5 sm:pt-0 border-t border-stone-200/60 sm:border-0 shrink-0">
        {/* Quantity Stepper */}
        {type === "full" ? (
          <div className="flex items-center gap-2">
            <div className="flex items-center border border-stone-300 rounded-lg bg-white overflow-hidden shadow-2xs">
              <button
                type="button"
                onClick={() => changeQuantity(item.quantity - 1)}
                disabled={item.quantity <= 1 || updating}
                className="w-8 h-8 flex items-center justify-center text-stone-700 hover:bg-stone-100 disabled:opacity-30 transition font-bold"
                aria-label="Decrease quantity"
              >
                −
              </button>
              <span className="w-8 text-center text-xs font-bold text-stone-800">
                {updating ? <Spinner className="w-3.5 h-3.5 mx-auto" /> : item.quantity}
              </span>
              <button
                type="button"
                onClick={() => changeQuantity(item.quantity + 1)}
                disabled={updating}
                className="w-8 h-8 flex items-center justify-center text-stone-700 hover:bg-stone-100 disabled:opacity-30 transition font-bold"
                aria-label="Increase quantity"
              >
                +
              </button>
            </div>

            <DeleteButton id={item.id} data-testid="product-delete-button" />
          </div>
        ) : (
          <span className="text-xs text-stone-500 font-medium">
            Qty: {item.quantity}
          </span>
        )}

        {/* Total Price */}
        <div className="text-right">
          <span className="font-serif text-base sm:text-lg font-bold text-[#143625]">
            <LineItemPrice
              item={item}
              style="tight"
              currencyCode={currencyCode}
            />
          </span>
        </div>
      </div>
    </div>
  )
}

export default Item
