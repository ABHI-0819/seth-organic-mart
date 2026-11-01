"use client"

import { isManual, isRazorpay } from "@lib/constants"
import { placeOrder } from "@lib/data/cart"
import { HttpTypes } from "@medusajs/types"
import { Button } from "@medusajs/ui"
import React, { useState } from "react"
import ErrorMessage from "../error-message"

type PaymentButtonProps = {
  cart: HttpTypes.StoreCart
  "data-testid": string
}

const PaymentButton: React.FC<PaymentButtonProps> = ({
  cart,
  "data-testid": dataTestId,
}) => {
  const notReady =
    !cart ||
    !cart.shipping_address ||
    !cart.billing_address ||
    !cart.email ||
    (cart.shipping_methods?.length ?? 0) < 1

  const paymentSession = cart.payment_collection?.payment_sessions?.[0]

  switch (true) {
    case isRazorpay(paymentSession?.provider_id):
      return (
        <RazorpayPaymentButton
          notReady={notReady}
          cart={cart}
          data-testid={dataTestId}
        />
      )
    case isManual(paymentSession?.provider_id):
      return (
        <ManualTestPaymentButton
          notReady={notReady}
          data-testid={dataTestId}
        />
      )
    default:
      return <Button disabled>Select a payment method</Button>
  }
}

const loadRazorpayScript = (): Promise<boolean> => {
  return new Promise((resolve) => {
    if (typeof window !== "undefined" && (window as any).Razorpay) {
      resolve(true)
      return
    }
    const script = document.createElement("script")
    script.src = "https://checkout.razorpay.com/v1/checkout.js"
    script.onload = () => resolve(true)
    script.onerror = () => resolve(false)
    document.body.appendChild(script)
  })
}

const RazorpayPaymentButton = ({
  cart,
  notReady,
  "data-testid": dataTestId,
}: {
  cart: HttpTypes.StoreCart
  notReady: boolean
  "data-testid"?: string
}) => {
  const [submitting, setSubmitting] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  const paymentSession = cart.payment_collection?.payment_sessions?.find((s) =>
    s.provider_id.startsWith("pp_razorpay")
  )

  const handleRazorpayPayment = async () => {
    setSubmitting(true)
    setErrorMessage(null)

    const isLoaded = await loadRazorpayScript()
    if (!isLoaded) {
      setErrorMessage("Failed to load Razorpay SDK. Check your internet connection.")
      setSubmitting(false)
      return
    }

    const sessionData = (paymentSession?.data || {}) as Record<string, any>
    const keyId =
      sessionData.key_id ||
      process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID ||
      ""

    if (!keyId || keyId.includes("YOUR_KEY") || keyId.includes("placeholder")) {
      setErrorMessage(
        "Razorpay Key ID is not set yet. Add your rzp_test_... key in .env to open live Razorpay popup."
      )
      setSubmitting(false)
      return
    }

    const amountInPaise =
      sessionData.amount || Math.round(Number(cart.total || 0) * 100)

    const options: Record<string, any> = {
      key: keyId,
      amount: amountInPaise,
      currency: (cart.currency_code || "inr").toUpperCase(),
      name: "Seth Organic Farm",
      description: "Pure Farm-to-Table Order",
      order_id: sessionData.razorpay_order_id || undefined,
      prefill: {
        name: `${cart.shipping_address?.first_name || ""} ${
          cart.shipping_address?.last_name || ""
        }`.trim(),
        email: cart.email || "",
        contact: cart.shipping_address?.phone || "",
      },
      theme: {
        color: "#143625",
      },
      handler: async function () {
        try {
          await placeOrder()
        } catch (err: any) {
          setErrorMessage(err.message)
        } finally {
          setSubmitting(false)
        }
      },
      modal: {
        ondismiss: function () {
          setSubmitting(false)
        },
      },
    }

    const rzp = new (window as any).Razorpay(options)
    rzp.on("payment.failed", function (response: any) {
      setErrorMessage(
        response?.error?.description || "Payment failed in Razorpay. Please try again."
      )
      setSubmitting(false)
    })
    rzp.open()
  }

  return (
    <>
      <Button
        disabled={notReady}
        isLoading={submitting}
        onClick={handleRazorpayPayment}
        size="large"
        className="bg-[#143625] hover:bg-[#0e271a] text-white w-full"
        data-testid={dataTestId}
      >
        Make Payment (Razorpay)
      </Button>
      <ErrorMessage
        error={errorMessage}
        data-testid="razorpay-payment-error-message"
      />
    </>
  )
}

const ManualTestPaymentButton = ({
  notReady,
  "data-testid": dataTestId,
}: {
  notReady: boolean
  "data-testid"?: string
}) => {
  const [submitting, setSubmitting] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  const handlePayment = async () => {
    setSubmitting(true)
    await placeOrder()
      .catch((err) => {
        setErrorMessage(err.message)
      })
      .finally(() => {
        setSubmitting(false)
      })
  }

  return (
    <>
      <Button
        disabled={notReady}
        isLoading={submitting}
        onClick={handlePayment}
        size="large"
        className="bg-[#7C5338] hover:bg-[#66422b] text-white w-full"
        data-testid={dataTestId}
      >
        Place Order (Cash on Delivery)
      </Button>
      <ErrorMessage
        error={errorMessage}
        data-testid="manual-payment-error-message"
      />
    </>
  )
}

export default PaymentButton
