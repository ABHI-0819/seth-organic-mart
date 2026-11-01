import { AbstractPaymentProvider, PaymentSessionStatus } from "@medusajs/framework/utils"
import {
  CreatePaymentProviderSession,
  PaymentProviderError,
  PaymentProviderSessionResponse,
  UpdatePaymentProviderSession,
  WebhookActionResult,
} from "@medusajs/framework/types"

type Options = {
  key_id: string
  key_secret: string
}

export default class RazorpayProviderService extends AbstractPaymentProvider<Options> {
  static identifier = "razorpay"
  protected options_: Options

  constructor(container: Record<string, unknown>, options: Options) {
    super(container, options)
    this.options_ = options
  }

  async initiatePayment(
    context: CreatePaymentProviderSession
  ): Promise<PaymentProviderError | PaymentProviderSessionResponse> {
    const { amount, currency_code, context: customerContext } = context
    const amountInPaise = Math.round(Number(amount) * 100)
    const keyId = this.options_.key_id || ""
    const keySecret = this.options_.key_secret || ""

    // If real Razorpay keys are configured, create a live Razorpay Order via REST API
    if (
      keyId &&
      keySecret &&
      !keyId.includes("YOUR_KEY") &&
      !keyId.includes("placeholder")
    ) {
      try {
        const auth = Buffer.from(`${keyId}:${keySecret}`).toString("base64")
        const res = await fetch("https://api.razorpay.com/v1/orders", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Basic ${auth}`,
          },
          body: JSON.stringify({
            amount: amountInPaise,
            currency: (currency_code || "INR").toUpperCase(),
            receipt: customerContext.session_id || `seth_${Date.now()}`,
          }),
        })
        if (res.ok) {
          const rzpOrder = await res.json()
          return {
            data: {
              razorpay_order_id: rzpOrder.id,
              amount: amountInPaise,
              currency: (currency_code || "INR").toUpperCase(),
              key_id: keyId,
            },
          }
        }
      } catch (e: any) {
        console.warn("Razorpay API warning:", e.message)
      }
    }

    return {
      data: {
        amount: amountInPaise,
        currency: (currency_code || "INR").toUpperCase(),
        key_id: keyId,
      },
    }
  }

  async authorizePayment(
    paymentSessionData: Record<string, unknown>
  ): Promise<PaymentProviderError | { status: PaymentSessionStatus; data: Record<string, unknown> }> {
    return {
      status: PaymentSessionStatus.AUTHORIZED,
      data: paymentSessionData,
    }
  }

  async capturePayment(paymentData: Record<string, unknown>) {
    return { ...paymentData, status: "captured" }
  }

  async cancelPayment(paymentData: Record<string, unknown>) {
    return { ...paymentData, status: "canceled" }
  }

  async deletePayment(paymentSessionData: Record<string, unknown>) {
    return paymentSessionData
  }

  async getPaymentStatus(paymentSessionData: Record<string, unknown>) {
    return PaymentSessionStatus.AUTHORIZED
  }

  async refundPayment(paymentData: Record<string, unknown>, refundAmount: number) {
    return { ...paymentData, refunded_amount: refundAmount }
  }

  async retrievePayment(paymentSessionData: Record<string, unknown>) {
    return paymentSessionData
  }

  async updatePayment(context: UpdatePaymentProviderSession) {
    return { data: context.data }
  }

  async getWebhookActionAndData(): Promise<WebhookActionResult> {
    return { action: "not_supported" }
  }
}
