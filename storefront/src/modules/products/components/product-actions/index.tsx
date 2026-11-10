"use client"

import { addToCart } from "@lib/data/cart"
import { useIntersection } from "@lib/hooks/use-in-view"
import { HttpTypes } from "@medusajs/types"
import { Button } from "@medusajs/ui"
import Divider from "@modules/common/components/divider"
import OptionSelect from "@modules/products/components/product-actions/option-select"
import { isEqual } from "lodash"
import { useParams, usePathname, useSearchParams, useRouter } from "next/navigation"
import { useEffect, useMemo, useRef, useState } from "react"
import ProductPrice from "../product-price"
import MobileActions from "./mobile-actions"

type ProductActionsProps = {
  product: HttpTypes.StoreProduct
  region: HttpTypes.StoreRegion
  disabled?: boolean
}

const optionsAsKeymap = (
  variantOptions: HttpTypes.StoreProductVariant["options"]
) => {
  return variantOptions?.reduce((acc: Record<string, string>, varopt: any) => {
    acc[varopt.option_id] = varopt.value
    return acc
  }, {})
}

export default function ProductActions({
  product,
  disabled,
}: ProductActionsProps) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const [options, setOptions] = useState<Record<string, string | undefined>>({})
  const [quantity, setQuantity] = useState(1)
  const [isAdding, setIsAdding] = useState(false)
  const [isBuyingNow, setIsBuyingNow] = useState(false)
  const countryCode = useParams().countryCode as string

  // If there is only 1 variant, preselect the options
  useEffect(() => {
    if (product.variants?.length === 1) {
      const variantOptions = optionsAsKeymap(product.variants[0].options)
      setOptions(variantOptions ?? {})
    }
  }, [product.variants])

  const selectedVariant = useMemo(() => {
    if (!product.variants || product.variants.length === 0) {
      return
    }

    return product.variants.find((v) => {
      const variantOptions = optionsAsKeymap(v.options)
      return isEqual(variantOptions, options)
    })
  }, [product.variants, options])

  // update the options when a variant is selected
  const setOptionValue = (optionId: string, value: string) => {
    setOptions((prev) => ({
      ...prev,
      [optionId]: value,
    }))
  }

  // check if the selected options produce a valid variant
  const isValidVariant = useMemo(() => {
    return product.variants?.some((v) => {
      const variantOptions = optionsAsKeymap(v.options)
      return isEqual(variantOptions, options)
    })
  }, [product.variants, options])

  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString())
    const value = isValidVariant ? selectedVariant?.id : null

    if (params.get("v_id") === value) {
      return
    }

    if (value) {
      params.set("v_id", value)
    } else {
      params.delete("v_id")
    }

    router.replace(pathname + "?" + params.toString())
  }, [selectedVariant, isValidVariant])

  // check if the selected variant is in stock
  const inStock = useMemo(() => {
    if (selectedVariant && !selectedVariant.manage_inventory) {
      return true
    }

    if (selectedVariant?.allow_backorder) {
      return true
    }

    if (
      selectedVariant?.manage_inventory &&
      (selectedVariant?.inventory_quantity || 0) > 0
    ) {
      return true
    }

    return false
  }, [selectedVariant])

  const actionsRef = useRef<HTMLDivElement>(null)
  const inView = useIntersection(actionsRef, "0px")

  // add the selected variant to the cart
  const handleAddToCart = async () => {
    if (!selectedVariant?.id) return null

    setIsAdding(true)

    await addToCart({
      variantId: selectedVariant.id,
      quantity: quantity,
      countryCode,
    })

    setIsAdding(false)
  }

  // Buy Now: adds to cart and directly redirects to checkout
  const handleBuyNow = async () => {
    if (!selectedVariant?.id) return null

    setIsBuyingNow(true)

    await addToCart({
      variantId: selectedVariant.id,
      quantity: quantity,
      countryCode,
    })

    setIsBuyingNow(false)
    router.push(`/${countryCode}/cart`)
  }

  return (
    <>
      <div className="flex flex-col gap-y-4" ref={actionsRef}>
        <div>
          {(product.variants?.length ?? 0) > 1 && (
            <div className="flex flex-col gap-y-4">
              {(product.options || []).map((option) => {
                return (
                  <div key={option.id}>
                    <OptionSelect
                      option={option}
                      current={options[option.id]}
                      updateOption={setOptionValue}
                      title={option.title ?? ""}
                      data-testid="product-options"
                      disabled={!!disabled || isAdding || isBuyingNow}
                    />
                  </div>
                )
              })}
              <Divider />
            </div>
          )}
        </div>

        <ProductPrice product={product} variant={selectedVariant} />

        {/* Quantity Selector */}
        <div className="flex items-center gap-3 pt-1">
          <span className="text-xs font-semibold uppercase tracking-wider text-stone-600">
            Quantity:
          </span>
          <div className="flex items-center border border-stone-300 rounded-lg bg-white overflow-hidden shadow-2xs">
            <button
              type="button"
              onClick={() => setQuantity((q) => Math.max(1, q - 1))}
              disabled={quantity <= 1 || isAdding || isBuyingNow}
              className="w-9 h-9 flex items-center justify-center text-stone-700 hover:bg-stone-100 disabled:opacity-40 transition font-bold"
            >
              −
            </button>
            <span className="w-10 text-center text-sm font-semibold text-stone-800">
              {quantity}
            </span>
            <button
              type="button"
              onClick={() => setQuantity((q) => q + 1)}
              disabled={isAdding || isBuyingNow}
              className="w-9 h-9 flex items-center justify-center text-stone-700 hover:bg-stone-100 disabled:opacity-40 transition font-bold"
            >
              +
            </button>
          </div>
        </div>

        {/* Action Buttons: Add to Cart & Buy Now */}
        <div className="flex flex-col sm:flex-row gap-2.5 pt-2">
          <Button
            onClick={handleAddToCart}
            disabled={
              !inStock ||
              !selectedVariant ||
              !!disabled ||
              isAdding ||
              isBuyingNow ||
              !isValidVariant
            }
            variant="secondary"
            className="w-full h-12 text-sm font-semibold border-2 border-[#143625] text-[#143625] hover:bg-[#143625]/5 rounded-xl shadow-xs"
            isLoading={isAdding}
            data-testid="add-product-button"
          >
            {!selectedVariant && !options
              ? "Select Option"
              : !inStock || !isValidVariant
              ? "Out of Stock"
              : "Add to Cart"}
          </Button>

          <Button
            onClick={handleBuyNow}
            disabled={
              !inStock ||
              !selectedVariant ||
              !!disabled ||
              isAdding ||
              isBuyingNow ||
              !isValidVariant
            }
            variant="primary"
            className="w-full h-12 text-sm font-semibold bg-[#143625] hover:bg-[#0c2418] text-white rounded-xl shadow-md"
            isLoading={isBuyingNow}
          >
            Buy Now ⚡
          </Button>
        </div>

        {/* Purity & Shipping Assurance Badges */}
        <div className="mt-4 pt-4 border-t border-stone-200/80 grid grid-cols-2 gap-3 text-left">
          <div className="flex items-start gap-2">
            <span className="text-base">🚚</span>
            <div>
              <p className="text-[11px] font-bold text-stone-900">Free Shipping</p>
              <p className="text-[10px] text-stone-500">On all orders above ₹999</p>
            </div>
          </div>
          <div className="flex items-start gap-2">
            <span className="text-base">🏺</span>
            <div>
              <p className="text-[11px] font-bold text-stone-900">Vedic Method</p>
              <p className="text-[10px] text-stone-500">Clay pot wood-churned</p>
            </div>
          </div>
          <div className="flex items-start gap-2">
            <span className="text-base">🌿</span>
            <div>
              <p className="text-[11px] font-bold text-stone-900">100% Organic</p>
              <p className="text-[10px] text-stone-500">Zero additives or chemicals</p>
            </div>
          </div>
          <div className="flex items-start gap-2">
            <span className="text-base">🫙</span>
            <div>
              <p className="text-[11px] font-bold text-stone-900">Glass Jar Packed</p>
              <p className="text-[10px] text-stone-500">Food-grade pure preservation</p>
            </div>
          </div>
        </div>

        {/* Sticky Mobile Actions */}
        <MobileActions
          product={product}
          variant={selectedVariant}
          options={options}
          updateOptions={setOptionValue}
          inStock={inStock}
          handleAddToCart={handleAddToCart}
          handleBuyNow={handleBuyNow}
          isAdding={isAdding || isBuyingNow}
          show={!inView}
          optionsDisabled={!!disabled || isAdding || isBuyingNow}
        />
      </div>
    </>
  )
}
