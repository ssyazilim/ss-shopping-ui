import type { IImage } from "@ssyazilim/ss-shopping-schemas"

export const NO_IMAGE = "https://minio.ssyazilim.com/images/default/products/no-image.png"

export const checkImage = (data: IImage) => {
  const staticImages = data?.staticImages || []
  const dynamicImages = data?.dynamicImages || []

  if (dynamicImages?.length > 0) return dynamicImages?.[0] || ""
  else if (staticImages?.length > 0) return staticImages?.[0]?.image || ""
  else return NO_IMAGE
}
