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
