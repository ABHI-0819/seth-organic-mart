import { Dialog, Transition } from "@headlessui/react"
import { Button, clx } from "@medusajs/ui"
import React, { Fragment, useMemo } from "react"

import useToggleState from "@lib/hooks/use-toggle-state"
import ChevronDown from "@modules/common/icons/chevron-down"
import X from "@modules/common/icons/x"

import { getProductPrice } from "@lib/util/get-product-price"
import OptionSelect from "./option-select"
import { HttpTypes } from "@medusajs/types"
import { isSimpleProduct } from "@lib/util/product"

type MobileActionsProps = {
  product: HttpTypes.StoreProduct
  variant?: HttpTypes.StoreProductVariant
  options: Record<string, string | undefined>
  updateOptions: (title: string, value: string) => void
  inStock?: boolean
  handleAddToCart: () => void
  handleBuyNow?: () => void
  isAdding?: boolean
  show: boolean
  optionsDisabled: boolean
}

const MobileActions: React.FC<MobileActionsProps> = ({
  product,
  variant,
  options,
  updateOptions,
  inStock,
  handleAddToCart,
  handleBuyNow,
  isAdding,
  show,
  optionsDisabled,
}) => {
  const { state, open, close } = useToggleState()

  const price = getProductPrice({
    product: product,
    variantId: variant?.id,
  })

  const selectedPrice = useMemo(() => {
    if (!price) {
      return null
    }
    const { variantPrice, cheapestPrice } = price

    return variantPrice || cheapestPrice || null
  }, [price])

  const isSimple = isSimpleProduct(product)
  const productImg = product.thumbnail || product.images?.[0]?.url

  return (
    <>
      <div
        className={clx("lg:hidden inset-x-0 bottom-0 fixed z-50", {
          "pointer-events-none": !show,
        })}
      >
        <Transition
          as={Fragment}
          show={show}
          enter="ease-in-out duration-300"
          enterFrom="opacity-0 translate-y-full"
          enterTo="opacity-100 translate-y-0"
          leave="ease-in duration-200"
          leaveFrom="opacity-100 translate-y-0"
          leaveTo="opacity-0 translate-y-full"
        >
          <div
            className="bg-white/95 backdrop-blur-md flex flex-col gap-y-2 p-3 sm:p-4 w-full border-t border-stone-200/90 shadow-[0_-6px_20px_rgba(0,0,0,0.1)] pb-[calc(env(safe-area-inset-bottom)+0.75rem)]"
            data-testid="mobile-actions"
          >
            {/* Product summary header */}
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-2.5 min-w-0">
                {productImg && (
                  <div className="w-10 h-10 rounded-lg overflow-hidden bg-stone-100 shrink-0 border border-stone-200">
                    <img
                      src={productImg}
                      alt={product.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                <div className="min-w-0">
                  <p
                    className="text-xs font-bold text-stone-900 truncate"
                    data-testid="mobile-title"
                  >
                    {product.title}
                  </p>
                  <p className="text-[10px] text-stone-500 truncate">
                    {variant?.title && variant.title !== "Default Variant"
                      ? variant.title
                      : "100% Pure Organic"}
                  </p>
                </div>
              </div>

              {/* Price display with strikethrough */}
              {selectedPrice && (
                <div className="flex items-baseline gap-1.5 shrink-0 text-right">
                  <span className="font-bold text-sm text-[#143625]">
                    {selectedPrice.calculated_price}
                  </span>
                  {selectedPrice.price_type === "sale" && (
                    <span className="line-through text-[11px] text-stone-400">
                      {selectedPrice.original_price}
                    </span>
                  )}
                </div>
              )}
            </div>

            {/* Action buttons */}
            <div className="grid grid-cols-2 w-full gap-2 pt-1">
              {!isSimple ? (
                <Button
                  onClick={open}
                  variant="secondary"
                  className="w-full h-11 text-xs font-semibold rounded-xl border border-stone-300 text-stone-800"
                  data-testid="mobile-actions-button"
                >
                  <div className="flex items-center justify-between w-full">
                    <span className="truncate">
                      {variant
                        ? Object.values(options).join(" / ")
                        : "Select Size"}
                    </span>
                    <ChevronDown className="shrink-0 ml-1" />
                  </div>
                </Button>
              ) : (
                <Button
                  onClick={handleAddToCart}
                  disabled={!inStock || isAdding}
                  variant="secondary"
                  className="w-full h-11 text-xs font-semibold rounded-xl border-2 border-[#143625] text-[#143625]"
                  isLoading={isAdding}
                >
                  {!inStock ? "Out of Stock" : "Add to Cart"}
                </Button>
              )}

              <Button
                onClick={handleBuyNow || handleAddToCart}
                disabled={!inStock || (!variant && !isSimple)}
                className="w-full h-11 text-xs font-semibold rounded-xl bg-[#143625] hover:bg-[#0c2418] text-white shadow-md"
                isLoading={isAdding}
                data-testid="mobile-cart-button"
              >
                {!variant && !isSimple
                  ? "Select Option"
                  : !inStock
                  ? "Out of Stock"
                  : "Buy Now ⚡"}
              </Button>
            </div>
          </div>
        </Transition>
      </div>

      {/* Options Dialog Sheet */}
      <Transition appear show={state} as={Fragment}>
        <Dialog as="div" className="relative z-[75]" onClose={close}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-stone-900/60 backdrop-blur-xs" />
          </Transition.Child>

          <div className="fixed bottom-0 inset-x-0">
            <div className="flex min-h-full h-full items-center justify-center text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-full"
                enterTo="opacity-100 translate-y-0"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0"
                leaveTo="opacity-0 translate-y-full"
              >
                <Dialog.Panel
                  className="w-full max-w-lg bg-[#FAF7F2] rounded-t-3xl shadow-2xl p-6 text-left flex flex-col gap-y-4 border-t border-stone-200"
                  data-testid="mobile-actions-modal"
                >
                  <div className="flex justify-between items-center pb-2 border-b border-stone-200">
                    <div>
                      <h3 className="font-serif text-base font-bold text-[#143625]">
                        Select Product Variant
                      </h3>
                      <p className="text-xs text-stone-500">
                        Choose your preferred weight or volume
                      </p>
                    </div>
                    <button
                      onClick={close}
                      className="w-8 h-8 rounded-full bg-white text-stone-500 flex justify-center items-center hover:bg-stone-100 transition shadow-xs"
                      data-testid="close-modal-button"
                    >
                      <X />
                    </button>
                  </div>

                  <div>
                    {(product.variants?.length ?? 0) > 1 && (
                      <div className="flex flex-col gap-y-4">
                        {(product.options || []).map((option) => (
                          <div key={option.id}>
                            <OptionSelect
                              option={option}
                              current={options[option.id]}
                              updateOption={updateOptions}
                              title={option.title ?? ""}
                              disabled={optionsDisabled}
                            />
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  <Button
                    onClick={close}
                    className="w-full h-11 bg-[#143625] text-white font-semibold text-xs rounded-xl mt-2"
                  >
                    Confirm Selection
                  </Button>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  )
}

export default MobileActions
