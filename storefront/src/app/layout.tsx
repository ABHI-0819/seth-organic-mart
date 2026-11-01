import { getBaseURL } from "@lib/util/env"
import { Metadata } from "next"
import { Suspense } from "react"
import "styles/globals.css"
import GlobalLoader from "@modules/common/components/global-loader"

export const metadata: Metadata = {
  metadataBase: new URL(getBaseURL()),
}

export default function RootLayout(props: { children: React.ReactNode }) {
  return (
    <html lang="en" data-mode="light">
      <body className="bg-[#FAF7F2] text-stone-800 antialiased">
        <Suspense fallback={null}>
          <GlobalLoader />
        </Suspense>
        <main className="relative">{props.children}</main>
      </body>
    </html>
  )
}
