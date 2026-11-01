import { ExecArgs } from "@medusajs/framework/types"
import {
  createProductsWorkflow,
  createRegionsWorkflow,
  createSalesChannelsWorkflow,
  createApiKeysWorkflow,
  linkSalesChannelsToApiKeyWorkflow,
} from "@medusajs/medusa/core-flows"
import { Modules } from "@medusajs/framework/utils"

export default async function seedSethOrganic({ container }: ExecArgs) {
  const storeModuleService = container.resolve(Modules.STORE)
  const salesChannelModuleService = container.resolve(Modules.SALES_CHANNEL)

  console.log("🌾 Seeding Seth Organic Farm Store...")

  // 1. Update Store Name & Currencies (INR default)
  const [store] = await storeModuleService.listStores()
  let defaultSalesChannel = await salesChannelModuleService.listSalesChannels({
    name: "Seth Organic Storefront",
  })

  if (!defaultSalesChannel.length) {
    const { result } = await createSalesChannelsWorkflow(container).run({
      input: {
        salesChannelsData: [{ name: "Seth Organic Storefront" }],
      },
    })
    defaultSalesChannel = result
  }

  if (store) {
    await storeModuleService.updateStores(store.id, {
      name: "Seth Organic Farm",
      supported_currencies: [
        { currency_code: "inr", is_default: true },
        { currency_code: "usd" },
      ],
      default_sales_channel_id: defaultSalesChannel[0].id,
    })
  }

  // 2. Create India Region (INR)
  try {
    await createRegionsWorkflow(container).run({
      input: {
        regions: [
          {
            name: "India",
            currency_code: "inr",
            countries: ["in"],
            payment_providers: ["pp_system_default"],
          },
        ],
      },
    })
  } catch (e) {
    console.log("ℹ️ Region India already exists, skipping.")
  }

  // 3. Create Publishable API Key for Next.js Storefront
  const { result: apiKeys } = await createApiKeysWorkflow(container).run({
    input: {
      api_keys: [
        {
          title: "Seth Organic Web StorefrontKey",
          type: "publishable",
          created_by: "seed-script",
        },
      ],
    },
  })

  const publishableKey = apiKeys[0]
  await linkSalesChannelsToApiKeyWorkflow(container).run({
    input: {
      id: publishableKey.id,
      add: [defaultSalesChannel[0].id],
    },
  })

  console.log("PUBLISHABLE_KEY_OUTPUT=" + publishableKey.token)

  // 4. Create Farm Products (Ghee, Honey, Oil, Jaggery)
  try {
    await createProductsWorkflow(container).run({
      input: {
        products: [
          {
            title: "A2 Desi Gir Cow Bilona Ghee",
            handle: "a2-desi-gir-cow-ghee",
            description: "100% pure, traditional Vedic Bilona-churned A2 Ghee from grass-fed Gir cows at Seth Organic Farm.",
            status: "published",
            sales_channels: [{ id: defaultSalesChannel[0].id }],
            options: [{ title: "Jar Size", values: ["500ml", "1 Litre"] }],
            variants: [
              {
                title: "500ml Glass Jar",
                sku: "SETH-GHEE-500",
                options: { "Jar Size": "500ml" },
                prices: [{ amount: 1150, currency_code: "inr" }],
              },
              {
                title: "1 Litre Glass Jar",
                sku: "SETH-GHEE-1000",
                options: { "Jar Size": "1 Litre" },
                prices: [{ amount: 2200, currency_code: "inr" }],
              },
            ],
          },
          {
            title: "Raw Multiflora Forest Honey",
            handle: "raw-forest-honey",
            description: "Unpasteurized, NMR-tested pure wild forest honey harvested sustainably with zero added sugar.",
            status: "published",
            sales_channels: [{ id: defaultSalesChannel[0].id }],
            options: [{ title: "Weight", values: ["500g", "1kg"] }],
            variants: [
              {
                title: "500g Glass Bottle",
                sku: "SETH-HONEY-500",
                options: { Weight: "500g" },
                prices: [{ amount: 450, currency_code: "inr" }],
              },
              {
                title: "1kg Glass Bottle",
                sku: "SETH-HONEY-1000",
                options: { Weight: "1kg" },
                prices: [{ amount: 850, currency_code: "inr" }],
              },
            ],
          },
          {
            title: "Wood Cold-Pressed (Kachi Ghani) Mustard Oil",
            handle: "cold-pressed-mustard-oil",
            description: "Extracted on traditional wooden Lakdi Ghani at room temperature to preserve natural pungency and nutrients.",
            status: "published",
            sales_channels: [{ id: defaultSalesChannel[0].id }],
            options: [{ title: "Volume", values: ["1 Litre", "5 Litre"] }],
            variants: [
              {
                title: "1 Litre Bottle",
                sku: "SETH-OIL-1L",
                options: { Volume: "1 Litre" },
                prices: [{ amount: 320, currency_code: "inr" }],
              },
              {
                title: "5 Litre Can",
                sku: "SETH-OIL-5L",
                options: { Volume: "5 Litre" },
                prices: [{ amount: 1500, currency_code: "inr" }],
              },
            ],
          },
          {
            title: "Chemical-Free Organic Sugarcane Jaggery (Gud)",
            handle: "organic-sugarcane-jaggery",
            description: "Sun-dried, unbleached sugarcane jaggery blocks & powder made without sulphur or chemical clarifiers.",
            status: "published",
            sales_channels: [{ id: defaultSalesChannel[0].id }],
            options: [{ title: "Form", values: ["900g Block", "900g Powder"] }],
            variants: [
              {
                title: "900g Jaggery Block",
                sku: "SETH-JAG-BLK",
                options: { Form: "900g Block" },
                prices: [{ amount: 180, currency_code: "inr" }],
              },
              {
                title: "900g Jaggery Powder",
                sku: "SETH-JAG-PWD",
                options: { Form: "900g Powder" },
                prices: [{ amount: 210, currency_code: "inr" }],
              },
            ],
          },
        ],
      },
    })
  } catch (e) {
    console.log("ℹ️ Products already seeded.")
  }

  console.log("✅ Seth Organic Farm seed complete!")
}
