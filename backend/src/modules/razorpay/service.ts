import { AbstractPaymentProvider, PaymentSessionStatus } from "@medusajs/framework/utils"
import {
  CapturePaymentInput,
  CapturePaymentOutput,
  AuthorizePaymentInput,
  AuthorizePaymentOutput,
  CancelPaymentInput,
  CancelPaymentOutput,
  InitiatePaymentInput,
  InitiatePaymentOutput,
  DeletePaymentInput,
  DeletePaymentOutput,
  GetPaymentStatusInput,
  GetPaymentStatusOutput,
  RefundPaymentInput,
  RefundPaymentOutput,
  RetrievePaymentInput,
  RetrievePaymentOutput,
  UpdatePaymentInput,
  UpdatePaymentOutput,
  WebhookActionResult,
  ProviderWebhookPayload,
} from "@medusajs/framework/types"

type Options = {
  key_id: string
  key_secret: string
  webhook_secret?: string
}

class RazorpayProviderService extends AbstractPaymentProvider<Options> {
  static identifier = "razorpay"
  protected options_: Options

  constructor(container: Record<string, unknown>, options: Options) {
    super(container, options)
    this.options_ = options
  }

  async initiatePayment(input: InitiatePaymentInput): Promise<InitiatePaymentOutput> {
    const { amount, currency_code, context } = input
    const amountInPaise = Math.round(Number(amount) * 100)

    if (!this.options_.key_id || !this.options_.key_secret) {
      return {
        id: `rzp_mock_${Date.now()}`,
        data: { amount: amountInPaise, currency: currency_code.toUpperCase() },
      }
    }

    const auth = Buffer.from(`${this.options_.key_id}:${this.options_.key_secret}`).toString("base64")
    const response = await fetch("https://api.razorpay.com/v1/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Basic ${auth}`,
      },
      body: JSON.stringify({
        amount: amountInPaise,
        currency: currency_code.toUpperCase(),
        receipt: (context?.idempotency_key as string) || `rcpt_${Date.now()}`,
      }),
    })

    const order: any = await response.json()

    return {
      id: order.id || `rzp_order_${Date.now()}`,
      data: {
        ...order,
        razorpay_order_id: order.id,
        key_id: this.options_.key_id,
      },
    }
  }

  async authorizePayment(input: AuthorizePaymentInput): Promise<AuthorizePaymentOutput> {
    return {
      status: PaymentSessionStatus.AUTHORIZED,
      data: input.data || {},
    }
  }

  async capturePayment(input: CapturePaymentInput): Promise<CapturePaymentOutput> {
    return {
      data: {
        ...(input.data || {}),
        status: "captured",
      },
    }
  }

  async cancelPayment(input: CancelPaymentInput): Promise<CancelPaymentOutput> {
    return {
      data: {
        ...(input.data || {}),
        status: "canceled",
      },
    }
  }

  async deletePayment(input: DeletePaymentInput): Promise<DeletePaymentOutput> {
    return {
      data: input.data || {},
    }
  }

  async getPaymentStatus(input: GetPaymentStatusInput): Promise<GetPaymentStatusOutput> {
    return {
      status: PaymentSessionStatus.AUTHORIZED,
    }
  }

  async refundPayment(input: RefundPaymentInput): Promise<RefundPaymentOutput> {
    return {
      data: {
        ...(input.data || {}),
        refunded_amount: input.amount,
      },
    }
  }

  async retrievePayment(input: RetrievePaymentInput): Promise<RetrievePaymentOutput> {
    return {
      data: input.data || {},
    }
  }

  async updatePayment(input: UpdatePaymentInput): Promise<UpdatePaymentOutput> {
    return {
      data: input.data || {},
    }
  }

  async getWebhookActionAndData(payload: ProviderWebhookPayload["payload"]): Promise<WebhookActionResult> {
    return {
      action: "not_supported",
    }
  }
}

export default RazorpayProviderService
