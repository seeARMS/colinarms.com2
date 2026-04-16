import { defineConfig } from 'astro/config'
import cloudflare from '@astrojs/cloudflare'
import tailwindcss from '@tailwindcss/vite'
import sitemap from '@astrojs/sitemap'

export default defineConfig({
  site: 'https://armstr.ng',
  output: 'server',
  prefetch: {
    prefetchAll: true,
    defaultStrategy: 'load',
  },
  build: {
    inlineStylesheets: 'always',
  },
  integrations: [sitemap()],
  adapter: cloudflare({
    imageService: 'compile',
  }),
  vite: {
    plugins: [tailwindcss()],
  },
})
