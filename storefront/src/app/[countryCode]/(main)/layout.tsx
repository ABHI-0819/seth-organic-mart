import { Metadata } from "next"

import { listCartOptions, retrieveCart } from "@lib/data/cart"
import { retrieveCustomer } from "@lib/data/customer"
import { getBaseURL } from "@lib/util/env"
import { StoreCartShippingOption } from "@medusajs/types"
import CartMismatchBanner from "@modules/layout/components/cart-mismatch-banner"
import Footer from "@modules/layout/templates/footer"
import Nav from "@modules/layout/templates/nav"
import MobileBottomNav from "@modules/layout/components/bottom-nav"
import FreeShippingPriceNudge from "@modules/shipping/components/free-shipping-price-nudge"
import FloatingWhatsApp from "@modules/common/components/floating-whatsapp"

export const metadata: Metadata = {
  metadataBase: new URL(getBaseURL()),
}

export default async function PageLayout(props: { children: React.ReactNode }) {
  const [customer, cart] = await Promise.all([
    retrieveCustomer().catch(() => null),
    retrieveCart().catch(() => null),
  ])

  let shippingOptions: StoreCartShippingOption[] = []
  if (cart && cart.items && cart.items.length > 0) {
    try {
      const { shipping_options } = await listCartOptions()
      shippingOptions = shipping_options
    } catch {
      shippingOptions = []
    }
  }

  const cartCount = cart?.items?.reduce((total, item) => total + item.quantity, 0) || 0

  return (
    <>
      <Nav />
      {customer && cart && (
        <CartMismatchBanner customer={customer} cart={cart} />
      )}

      {cart && (
        <FreeShippingPriceNudge
          variant="popup"
          cart={cart}
          shippingOptions={shippingOptions}
        />
      )}

      {props.children}

      <Footer />

      {/* Floating Direct WhatsApp Support Action */}
      <FloatingWhatsApp />

      {/* Persistent Mobile Bottom Navigation Bar (Home, Shop, Search, Wishlist, Cart) */}
      <MobileBottomNav cartCount={cartCount} />
    </>
  )
}
