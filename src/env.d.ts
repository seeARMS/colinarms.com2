declare module 'virtual:photo-meta' {
  type PhotoMeta = {
    camera?: string
    lens?: string
    lensFull?: string
    focal?: string
    aperture?: string
    shutter?: string
    iso?: string
    date?: string
  }
  const meta: Record<string, PhotoMeta>
  export default meta
}

declare module 'virtual:post-images' {
  type PostImage = {
    width: number
    height: number
    /** A ~16px WebP of the image, as a data URL, for the blurred preview. */
    preview: { src: string; width: number; height: number }
  }
  const images: Record<string, PostImage>
  export default images
}
