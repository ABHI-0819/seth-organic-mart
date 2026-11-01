import Medusa from "@medusajs/js-sdk"

// Use internal Docker network URL on the server, and public IP in the browser
const MEDUSA_BACKEND_URL =
  typeof window === "undefined"
    ? process.env.INTERNAL_MEDUSA_BACKEND_URL || "http://seth_medusa_server:9000"
    : process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL || "http://82.29.165.210:5000"

export const sdk = new Medusa({
  baseUrl: MEDUSA_BACKEND_URL,
  debug: process.env.NODE_ENV === "development",
  publishableKey: process.env.NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY,
})
