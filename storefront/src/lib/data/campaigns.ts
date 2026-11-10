import { sdk } from "@lib/config"

export interface AdminPromotion {
  id: string
  code?: string
  type?: string
  is_automatic?: boolean
  application_method?: {
    value?: number
    type?: string
    currency_code?: string
    description?: string
  }
  campaign?: {
    id: string
    name: string
    description?: string
    starts_at?: string
    ends_at?: string
  }
}

export async function getActiveAdminPromotion(): Promise<AdminPromotion | null> {
  try {
    // Attempt to fetch active promotions from Medusa Store API
    const response = await sdk.client.fetch<{ promotions?: AdminPromotion[] }>(
      "/store/promotions",
      {
        query: {
          limit: 1,
        },
        next: { revalidate: 60 },
      }
    )
    if (response?.promotions && response.promotions.length > 0) {
      return response.promotions[0]
    }
  } catch (error) {
    // If not configured in admin yet or returns 404, fallback gracefully
  }
  return null
}
