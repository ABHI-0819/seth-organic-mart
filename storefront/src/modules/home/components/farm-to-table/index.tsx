import { listProducts } from "@lib/data/products"
import { getRegion } from "@lib/data/regions"
import ProductPreview from "@modules/products/components/product-preview"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

export default async function FarmToTableEssentials({
  countryCode,
}: {
  countryCode: string
}) {
  const region = await getRegion(countryCode)

  if (!region) {
    return null
  }

  const {
    response: { products },
  } = await listProducts({
    countryCode,
    queryParams: {
      limit: 8,
      fields: "*variants.calculated_price,+variants.inventory_quantity",
    },
  })

  if (!products || products.length === 0) {
    return null
  }

  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="content-container">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <span className="text-xs font-semibold uppercase tracking-widest text-amber-700 bg-amber-50 px-3 py-1 rounded-full border border-amber-200/60">
              100% Pure & Lab Tested
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mt-3 tracking-tight">
              Farm-to-Table Essentials
            </h2>
            <p className="text-neutral-600 mt-2 max-w-xl text-base">
              Freshly harvested and traditionally crafted at Seth Organic Farm—delivered straight from our fields to your kitchen.
            </p>
          </div>
          <LocalizedClientLink
            href="/store"
            className="inline-flex items-center gap-2 text-sm font-semibold text-neutral-900 hover:text-amber-700 transition-colors group"
          >
            View All Products
            <span className="transition-transform group-hover:translate-x-1">→</span>
          </LocalizedClientLink>
        </div>

        {/* Dynamic Product Grid from Medusa Admin */}
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-10">
          {products.map((product) => (
            <li key={product.id}>
              <ProductPreview product={product} region={region} isFeatured />
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
