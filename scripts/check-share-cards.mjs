// Fails the build when a page's share image (og:image) is missing or narrower
// than 1200px. Google Discover only shows a large image that wide, and X and
// LinkedIn crop smaller ones. The cards come from scripts/generate-og.mjs, which
// runs just before the build; a post published in between would have no card,
// and the next cron rebuild (src/worker.ts) makes it.
import sharp from 'sharp'
import { readdir, readFile } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'
import { join } from 'node:path'

const MIN_WIDTH = 1200

export default function checkShareCards() {
  return {
    name: 'check-share-cards',
    hooks: {
      'astro:build:done': async ({ dir, logger }) => {
        const root = fileURLToPath(dir)
        const pages = (await readdir(root, { recursive: true })).filter((file) => file.endsWith('.html'))
        const problems = []
        let checked = 0
        for (const page of pages) {
          const html = await readFile(join(root, page), 'utf8')
          const image = html.match(/<meta property="og:image" content="([^"]+)"/)?.[1]
          if (!image) continue
          checked++
          const file = join(root, decodeURIComponent(new URL(image).pathname))
          const width = await sharp(file)
            .metadata()
            .then((meta) => meta.width)
            .catch(() => undefined)
          if (!width) problems.push(`${page}: ${image} doesn't exist`)
          else if (width < MIN_WIDTH) problems.push(`${page}: ${image} is ${width}px wide`)
        }
        if (problems.length) {
          throw new Error(`Share images must be at least ${MIN_WIDTH}px wide:\n  ${problems.join('\n  ')}`)
        }
        logger.info(`${checked} pages checked: every share image is at least ${MIN_WIDTH}px wide`)
      },
    },
  }
}
