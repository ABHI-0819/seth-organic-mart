import { HttpTypes } from "@medusajs/types"
import EmptyCartMessage from "@modules/cart/components/empty-cart-message"
import SignInPrompt from "@modules/cart/components/sign-in-prompt"
import ItemsTemplate from "./items"
import Summary from "./summary"

const CartTemplate = ({
  cart,
  customer,
}: {
  cart: HttpTypes.StoreCart | null
  customer: HttpTypes.StoreCustomer | null
}) => {
  return (
    <div className="py-6 sm:py-12 bg-[#FAF7F2] min-h-[calc(100vh-100px)]">
      <div className="content-container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" data-testid="cart-container">
        {cart?.items?.length ? (
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_416px] gap-8 bg-white p-5 sm:p-8 rounded-2xl shadow-xs border border-stone-200/80">
            <div className="flex flex-col gap-y-6">
              <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#143625]">
                Shopping Cart
              </h1>
              <ItemsTemplate cart={cart} />
            </div>
            <div className="flex flex-col gap-y-6 lg:border-l lg:border-stone-200/80 lg:pl-8">
              <Summary cart={cart} />
            </div>
          </div>
        ) : (
          <div className="bg-white p-8 rounded-2xl shadow-xs border border-stone-200/80 text-center max-w-lg mx-auto">
            <EmptyCartMessage />
            {!customer && <SignInPrompt />}
          </div>
        )}
      </div>
    </div>
  )
}

export default CartTemplate
