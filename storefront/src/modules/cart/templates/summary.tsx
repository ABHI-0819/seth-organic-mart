"use client"

import { Button, Heading } from "@medusajs/ui"
import CartTotals from "@modules/common/components/cart-totals"
import Divider from "@modules/common/components/divider"
import DiscountCode from "@modules/checkout/components/discount-code"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { HttpTypes } from "@medusajs/types"

type SummaryProps = {
  cart: HttpTypes.StoreCart & {
    promotions: HttpTypes.StorePromotion[]
  }
}

function getCheckoutStep(cart: HttpTypes.StoreCart) {
  if (!cart?.shipping_address?.address_1 || !cart.email) {
    return "address"
  } else if (cart?.shipping_methods?.length === 0) {
    return "delivery"
  } else {
    return "payment"
  }
}

const Summary = ({ cart }: SummaryProps) => {
  const step = getCheckoutStep(cart)

  return (
    <div className="flex flex-col gap-y-4">
      <Heading level="h2" className="font-serif text-xl sm:text-2xl font-bold text-[#143625]">
        Order Summary
      </Heading>

      <DiscountCode cart={cart} />

      <Divider />

      <CartTotals totals={cart} />

      <LocalizedClientLink
        href={"/checkout?step=" + step}
        data-testid="checkout-button"
        className="block mt-2"
      >
        <Button className="w-full h-12 bg-[#143625] hover:bg-[#0c2418] text-white font-bold text-sm rounded-xl shadow-md transition-all active:scale-[0.99] flex items-center justify-center gap-2">
          <span>Proceed to Checkout</span>
          <span>→</span>
        </Button>
      </LocalizedClientLink>

      <div className="pt-2 text-center text-xs text-stone-500 space-y-1">
        <p className="flex items-center justify-center gap-1.5 font-medium text-stone-700">
          <span>🔒</span>
          <span>100% Safe & Secure Encrypted Checkout</span>
        </p>
        <p className="text-[11px] text-stone-400">
          Supports UPI, RuPay, Cards, Net Banking & Cash on Delivery
        </p>
      </div>
    </div>
  )
}

export default Summary
