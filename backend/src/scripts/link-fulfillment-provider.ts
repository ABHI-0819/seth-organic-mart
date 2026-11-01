import { ExecArgs } from "@medusajs/framework/types"
import { Modules, ContainerRegistrationKeys } from "@medusajs/framework/utils"
import { createStockLocationsWorkflow } from "@medusajs/medusa/core-flows"

export default async function linkFulfillmentProvider({ container }: ExecArgs) {
  const stockLocationModule = container.resolve(Modules.STOCK_LOCATION)
  const remoteLink = container.resolve(ContainerRegistrationKeys.REMOTE_LINK)

  console.log("🔗 Linking Manual Fulfillment Provider to Stock Location...")

  let [location] = await stockLocationModule.listStockLocations()
  if (!location) {
    const { result } = await createStockLocationsWorkflow(container).run({
      input: { locations: [{ name: "Seth Organic Farm Warehouse" }] },
    })
    location = result[0]
  }

  try {
    await remoteLink.create({
      [Modules.STOCK_LOCATION]: { stock_location_id: location.id },
      [Modules.FULFILLMENT]: { fulfillment_provider_id: "manual_manual" },
    })
    console.log("✅ Successfully linked manual_manual fulfillment provider!")
  } catch (e: any) {
    console.log("ℹ️ Link status:", e.message)
  }
}
