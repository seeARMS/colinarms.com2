import { defineConfig, fontProviders } from 'astro/config'
import cloudflare from '@astrojs/cloudflare'
import sitemap from '@astrojs/sitemap'
import photoMeta from './scripts/photo-meta.mjs'
import postImages from './scripts/post-images.mjs'
import checkShareCards from './scripts/check-share-cards.mjs'
import { getColinArticles } from './src/lib/getAllArticles.js'

// When each dated page last changed, for the sitemap's lastmod: a post's last
// edit (src/data/posts.ts) or its publishing, and the archive's newest of
// those. Other pages have no date to trust, and no lastmod beats a wrong one.
let lastChanged
const lastmod = async (url) => {
  lastChanged ??= getColinArticles({ includeUnlisted: true }).then((posts) => {
    const dates = new Map(posts.map((post) => [post.link, post.updatedIso]))
    if (posts.length) dates.set('/writing', posts.map((post) => post.updatedIso).sort().at(-1))
    return dates
  })
  return (await lastChanged).get(new URL(url).pathname)
}

export default defineConfig({
  site: 'https://armstr.ng',
  output: 'server',
  // URLs have no trailing slash. Pages build to files (writing.html, not
  // writing/index.html), which Cloudflare serves at /writing directly, so no
  // link on the site goes through a redirect.
  trailingSlash: 'never',
  // A line break between two tags still reads as a space, as in plain HTML.
  // Astro 7's default ('jsx') drops it, which runs words together in copy
  // written across lines.
  compressHTML: true,
  // Each page fetches every page it links to once it loads, so a tap never
  // waits on the network. Chrome and Edge prerender them instead (rendered
  // ahead, images and all, so a tap just swaps the page in); Safari and
  // Firefox keep the fetched copy (see public/_headers).
  prefetch: {
    prefetchAll: true,
    defaultStrategy: 'load',
  },
  experimental: {
    clientPrerender: true,
  },
  build: {
    format: 'file',
    inlineStylesheets: 'always',
  },
  integrations: [
    checkShareCards(),
    sitemap({
      serialize: async (item) => {
        const date = await lastmod(item.url)
        return date ? { ...item, lastmod: date } : item
      },
    }),
  ],
  adapter: cloudflare({
    imageService: 'compile',
  }),
  devToolbar: { enabled: false },
  // Images in posts are hosted by Paragraph (and one by Highlight); allowing
  // them here lets the build resize them (see src/lib/post-images.ts).
  image: {
    remotePatterns: [
      { protocol: 'https', hostname: 'storage.googleapis.com', pathname: '/papyrus_images/**' },
      { protocol: 'https', hostname: 'highlight-creator-assets.highlight.xyz' },
    ],
  },
  vite: {
    plugins: [photoMeta(), postImages()],
  },
  // Newsreader for everything, with its optical sizes, so the big type gets
  // the finer display cut and small type the sturdier text cut. Geist Mono is
  // only for code in posts.
  fonts: [
    {
      provider: fontProviders.google(),
      name: 'Newsreader',
      cssVariable: '--font-serif',
      weights: ['200 800'],
      styles: ['normal', 'italic'],
      subsets: ['latin'],
      fallbacks: ['Georgia', 'serif'],
      options: { experimental: { variableAxis: { opsz: [['6', '72']] } } },
    },
    {
      provider: fontProviders.fontsource(),
      name: 'Geist Mono',
      cssVariable: '--font-mono',
      weights: ['100 900'],
      styles: ['normal'],
      subsets: ['latin'],
      fallbacks: ['ui-monospace', 'SFMono-Regular', 'Menlo', 'monospace'],
    },
  ],
})
