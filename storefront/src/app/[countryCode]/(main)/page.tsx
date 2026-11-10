import { Metadata } from "next"

import Hero from "@modules/home/components/hero"
import PurityBadges from "@modules/home/components/purity-badges"
import FestivalCampaignSection from "@modules/home/components/festival-campaign"
import TrendingProductsSection from "@modules/home/components/trending-section"
import PromotionalBanners from "@modules/home/components/promotional-banners"
import FarmHeritage from "@modules/home/components/farm-heritage"
import CustomerReviews from "@modules/home/components/customer-reviews"
import FeaturedProducts from "@modules/home/components/featured-products"
import { listCollections } from "@lib/data/collections"
import { getRegion } from "@lib/data/regions"
import { listProducts } from "@lib/data/products"
import { getActiveAdminPromotion } from "@lib/data/campaigns"
import { HttpTypes } from "@medusajs/types"

export const metadata: Metadata = {
  title: "Seth Organic Farm | Pure A2 Desi Ghee, Raw Honey, Cold-Pressed Oils & Jaggery",
  description:
    "Experience authentic Indian Vedic traditions with 100% pure organic A2 Gir Cow Bilona Ghee, Raw Forest Honey, Wood-Pressed Mustard Oil & Natural Sugarcane Jaggery.",
}

export default async function Home(props: {
  params: Promise<{ countryCode: string }>
}) {
  const params = await props.params
  const { countryCode } = params

  const region = await getRegion(countryCode)

  const { collections } = await listCollections({
    fields: "id, handle, title",
  })

  if (!region) {
    return null
  }

  // 1. Fetch live admin promotion / campaign from Medusa backend
  const adminPromotion = await getActiveAdminPromotion()

  // 2. Fetch live products from Medusa backend
  let products: HttpTypes.StoreProduct[] = []
  try {
    const { response } = await listProducts({
      countryCode,
      queryParams: {
        limit: 12,
        fields: "*variants.calculated_price,+variants.inventory_quantity,*images",
      },
    })
    products = response.products || []
  } catch (e) {
    products = []
  }

  return (
    <div className="w-full bg-[#FAF7F2] text-stone-800">
      {/* 1. Hero Banner with Visual Impact & CTAs */}
      <Hero />

      {/* 2. Purity Trust Badges Strip (Organic, Lab Tested, Vedic) */}
      <PurityBadges />

      {/* 3. Dynamic Campaign Banner (Managed from Medusa Admin / Festival Campaign) */}
      <FestivalCampaignSection adminPromotion={adminPromotion} />

      {/* 4. Trending & Bestsellers Grid with Accurate Discount Pricing */}
      <TrendingProductsSection products={products} region={region} />

      {/* 5. Promotional Editorial Split Banners (Vedic Ghee & Raw Honey) */}
      <PromotionalBanners />

      {/* 6. Vedic Heritage & Ancestral Processing */}
      <FarmHeritage />

      {/* 7. Customer Love & Verified Reviews */}
      <CustomerReviews />

      {/* 8. Collections Rail if available */}
      {collections && collections.length > 0 && (
        <div className="py-12 bg-white">
          <ul className="flex flex-col gap-x-6">
            <FeaturedProducts collections={collections} region={region} />
          </ul>
        </div>
      )}
    </div>
  )
}
