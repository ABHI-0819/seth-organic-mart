import { Container, clx } from "@medusajs/ui"
import Image from "next/image"
import React, { useState } from "react"
import PlaceholderImage from "@modules/common/icons/placeholder-image"
import { normalizeImageUrl } from "@lib/util/image-url"

type ThumbnailProps = {
  thumbnail?: string | null
  images?: any[] | null
  size?: "small" | "medium" | "large" | "full" | "square"
  isFeatured?: boolean
  className?: string
  "data-testid"?: string
}

const Thumbnail: React.FC<ThumbnailProps> = ({
  thumbnail,
  images,
  size = "small",
  isFeatured,
  className,
  "data-testid": dataTestid,
}) => {
  const rawImage = thumbnail || images?.[0]?.url
  const initialImage = normalizeImageUrl(rawImage)

  return (
    <Container
      className={clx(
        "relative w-full aspect-square overflow-hidden p-0 bg-white shadow-elevation-card-rest rounded-2xl group-hover:shadow-elevation-card-hover transition-all ease-in-out duration-300",
        className,
        {
          "w-[180px]": size === "small",
          "w-[290px]": size === "medium",
          "w-[440px]": size === "large",
          "w-full": size === "full" || size === "square",
        }
      )}
      data-testid={dataTestid}
    >
      <ImageOrPlaceholder image={initialImage} size={size} />
    </Container>
  )
}

const ImageOrPlaceholder = ({
  image,
  size,
}: Pick<ThumbnailProps, "size"> & { image?: string }) => {
  const [hasError, setHasError] = useState(false)

  if (!image || hasError) {
    return (
      <div className="w-full h-full absolute inset-0 flex flex-col items-center justify-center bg-stone-100 text-stone-400">
        <span className="text-xl sm:text-2xl mb-1">🌿</span>
        <span className="text-[10px] uppercase font-semibold tracking-wider text-stone-400">Pure Organic</span>
      </div>
    )
  }

  return (
    <Image
      src={image}
      alt="Product Thumbnail"
      className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-500 ease-out group-hover:scale-105"
      draggable={false}
      quality={90}
      sizes="(max-width: 576px) 280px, (max-width: 768px) 360px, (max-width: 992px) 480px, 800px"
      fill
      unoptimized={image.includes("82.29.165.210") || image.includes("seth_medusa_server")}
      onError={() => setHasError(true)}
    />
  )
}

export default Thumbnail
