import { ExecArgs } from "@medusajs/framework/types"
import {
  createStockLocationsWorkflow,
  linkSalesChannelsToStockLocationWorkflow,
} from "@medusajs/medusa/core-flows"
import { Modules } from "@medusajs/framework/utils"

export default async function fixStockLocation({ container }: ExecArgs) {
  const salesChannelService = container.resolve(Modules.SALES_CHANNEL)
  const stockLocationService = container.resolve(Modules.STOCK_LOCATION)

  const channels = await salesChannelService.listSalesChannels()
  let locations = await stockLocationService.listStockLocations({})

  if (!locations.length) {
    const { result } = await createStockLocationsWorkflow(container).run({
      input: {
        locations: [{ name: "Seth Organic Farm Warehouse" }],
      },
    })
    locations = result
  }

  if (channels.length && locations.length) {
    await linkSalesChannelsToStockLocationWorkflow(container).run({
      input: {
        id: locations[0].id,
        add: channels.map((c) => c.id),
      },
    })
    console.log("✅ Linked Stock Location to Sales Channels!")
  }
}
