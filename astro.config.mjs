import { defineConfig, fontProviders } from 'astro/config'
import cloudflare from '@astrojs/cloudflare'
import sitemap from '@astrojs/sitemap'
import photoMeta from './scripts/photo-meta.mjs'
import postImages from './scripts/post-images.mjs'

export default defineConfig({
  site: 'https://armstr.ng',
  output: 'server',
  // URLs have no trailing slash. Pages build to files (writing.html, not
  // writing/index.html), which Cloudflare serves at /writing directly, so no
  // link on the site goes through a redirect.
  trailingSlash: 'never',
  prefetch: {
    prefetchAll: true,
    defaultStrategy: 'hover',
  },
  build: {
    format: 'file',
    inlineStylesheets: 'always',
  },
  integrations: [sitemap()],
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
