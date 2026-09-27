// The real size of every image in the posts, plus a tiny blurred preview of
// it, read when the site builds. Pages are prerendered inside workerd, which
// can't run sharp, so this Vite plugin does the work in Node and hands the
// result to the page as `virtual:post-images`: a map from image URL (as it
// appears in the post's HTML) to its size and preview.
import sharp from 'sharp'
import { getColinArticlesWithContent } from '../src/lib/getAllArticles.js'

const ID = 'virtual:post-images'
const RESOLVED = `\0${ID}`

// A preview this small is a few hundred bytes; the page blurs it back up.
const PREVIEW = 16

const sources = (html) => [...html.matchAll(/<img\b[^>]*?\ssrc\s*=\s*["']([^"']+)["']/gi)].map((m) => m[1])

async function describe(src) {
  const res = await fetch(src.replaceAll('&amp;', '&'))
  if (!res.ok) throw new Error(`HTTP ${res.status}`)
  const data = Buffer.from(await res.arrayBuffer())
  const meta = await sharp(data).metadata()
  // Orientations 5–8 are rotated a quarter turn, so width and height swap.
  const turned = (meta.orientation ?? 1) >= 5
  const width = turned ? (meta.pageHeight ?? meta.height) : meta.width
  const height = turned ? meta.width : (meta.pageHeight ?? meta.height)
  const { data: tiny, info } = await sharp(data)
    .rotate()
    .resize(PREVIEW, PREVIEW, { fit: 'inside' })
    .webp({ quality: 60 })
    .toBuffer({ resolveWithObject: true })
  return {
    width,
    height,
    preview: { src: `data:image/webp;base64,${tiny.toString('base64')}`, width: info.width, height: info.height },
  }
}

async function read() {
  const posts = await getColinArticlesWithContent()
  const urls = [...new Set(posts.flatMap((post) => sources(post.html ?? '')))]
  const entries = await Promise.all(
    urls.map(async (src) => {
      try {
        return [src, await describe(src)]
      } catch (e) {
        // The page still shows the image, just without a size or preview.
        console.warn(`post-images: couldn't read ${src} (${e.message})`)
        return [src, null]
      }
    }),
  )
  return Object.fromEntries(entries.filter(([, info]) => info))
}

export default function postImages() {
  let cache
  return {
    name: 'post-images',
    resolveId(id) {
      if (id === ID) return RESOLVED
    },
    async load(id) {
      if (id !== RESOLVED) return
      cache ??= read()
      return `export default ${JSON.stringify(await cache)}`
    },
  }
}
