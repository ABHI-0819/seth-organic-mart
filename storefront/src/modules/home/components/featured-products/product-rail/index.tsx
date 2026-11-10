import { listProducts } from "@lib/data/products"
import { HttpTypes } from "@medusajs/types"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import ProductPreview from "@modules/products/components/product-preview"

export default async function ProductRail({
  collection,
  region,
}: {
  collection: HttpTypes.StoreCollection
  region: HttpTypes.StoreRegion
}) {
  const {
    response: { products: pricedProducts },
  } = await listProducts({
    regionId: region.id,
    queryParams: {
      collection_id: collection.id,
      fields: "*variants.calculated_price,+variants.inventory_quantity,*images",
    },
  })

  if (!pricedProducts || pricedProducts.length === 0) {
    return null
  }

  return (
    <div className="content-container py-8 sm:py-16">
      <div className="flex items-center justify-between mb-6 sm:mb-8 pb-3 border-b border-stone-200">
        <div>
          <span className="text-[10px] font-bold uppercase tracking-wider text-[#7C5338]">
            Collection Showcase
          </span>
          <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#143625]">
            {collection.title}
          </h2>
        </div>
        <LocalizedClientLink
          href={`/collections/${collection.handle}`}
          className="text-xs sm:text-sm font-semibold text-[#143625] hover:text-[#7C5338] transition flex items-center gap-1"
        >
          <span>View All</span>
          <span>→</span>
        </LocalizedClientLink>
      </div>

      <ul className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-6">
        {pricedProducts.map((product) => (
          <li key={product.id}>
            <ProductPreview product={product} region={region} isFeatured />
          </li>
        ))}
      </ul>
    </div>
  )
}
