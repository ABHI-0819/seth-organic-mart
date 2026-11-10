import { getBaseURL } from "@lib/util/env"
import { Metadata } from "next"
import { Suspense } from "react"
import "styles/globals.css"
import GlobalLoader from "@modules/common/components/global-loader"
import Providers from "@modules/common/components/providers"

export const metadata: Metadata = {
  metadataBase: new URL(getBaseURL()),
  title: "Seth Organic Farm | Pure Desi Ghee, Raw Forest Honey, Cold-Pressed Oils & Jaggery",
  description:
    "Experience Vedic tradition with 100% certified organic A2 Gir Cow Bilona Ghee, Raw Honey, Cold-Pressed Mustard Oil & Chemical-Free Sugarcane Jaggery direct from ancestral farms.",
}

export default function RootLayout(props: { children: React.ReactNode }) {
  return (
    <html lang="en" data-mode="light">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,500;0,600;0,700;1,400;1,600&family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-[#FAF7F2] text-stone-800 antialiased font-sans selection:bg-[#143625] selection:text-white pb-14 md:pb-0">
        <Suspense fallback={null}>
          <GlobalLoader />
        </Suspense>
        <Providers>
          <main className="relative min-h-screen">{props.children}</main>
        </Providers>
      </body>
    </html>
  )
}
