import satori from 'satori'
import { Resvg } from '@resvg/resvg-js'
import { writeFileSync, mkdirSync } from 'node:fs'
import { join } from 'node:path'

const API_BASE = 'https://public.api.paragraph.com/api/v1'
const PUB_ID = '3eJHzLXKQHclhCdsO4Yr'
const OUT_DIR = join(import.meta.dirname, '..', 'public', 'og')

// Older Safari UA → Google Fonts returns TrueType (satori needs ttf/woff)
const FONT_UA =
  'Mozilla/5.0 (Macintosh; U; Intel Mac OS X 10_6_8; de-at) AppleWebKit/534.59.10 (KHTML, like Gecko) Version/5.1.7 Safari/534.57.2'

async function loadFont(weight) {
  const css = await fetch(
    `https://fonts.googleapis.com/css2?family=Inter:wght@${weight}`,
    { headers: { 'User-Agent': FONT_UA } },
  ).then((r) => r.text())

  const url = css.match(/url\(([^)]+)\)/)?.[1]
  if (!url) throw new Error(`Font URL not found for weight ${weight}`)
  return fetch(url).then((r) => r.arrayBuffer())
}

async function fetchPosts() {
  const res = await fetch(
    `${API_BASE}/publications/${PUB_ID}/posts?limit=50`,
  )
  const { items } = await res.json()
  return items.map((post) => ({
    title: post.title,
    subtitle: post.subtitle || '',
    slug: post.slug,
  }))
}

function buildMarkup(title, subtitle) {
  return {
    type: 'div',
    props: {
      style: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end',
        width: '100%',
        height: '100%',
        backgroundColor: '#18181b',
        padding: '60px 80px',
      },
      children: [
        {
          type: 'div',
          props: {
            style: { display: 'flex', flexDirection: 'column' },
            children: [
              {
                type: 'div',
                props: {
                  style: {
                    fontSize: title.length > 50 ? 48 : 64,
                    fontWeight: 700,
                    color: '#fafafa',
                    lineHeight: 1.2,
                  },
                  children: title,
                },
              },
              ...(subtitle
                ? [
                    {
                      type: 'div',
                      props: {
                        style: {
                          fontSize: 28,
                          color: '#a1a1aa',
                          lineHeight: 1.4,
                          marginTop: '16px',
                        },
                        children: subtitle,
                      },
                    },
                  ]
                : []),
              {
                type: 'div',
                props: {
                  style: {
                    fontSize: 24,
                    color: '#52525b',
                    marginTop: '32px',
                  },
                  children: 'armstr.ng',
                },
              },
            ],
          },
        },
      ],
    },
  }
}

async function generateImage(title, subtitle, fonts) {
  const svg = await satori(buildMarkup(title, subtitle), {
    width: 1200,
    height: 630,
    fonts: [
      { name: 'Inter', data: fonts.regular, weight: 400, style: 'normal' },
      { name: 'Inter', data: fonts.bold, weight: 700, style: 'normal' },
    ],
  })

  const resvg = new Resvg(svg, { fitTo: { mode: 'width', value: 1200 } })
  return resvg.render().asPng()
}

async function main() {
  console.log('Generating OG images...')

  const [regular, bold, posts] = await Promise.all([
    loadFont(400),
    loadFont(700),
    fetchPosts(),
  ])
  const fonts = { regular, bold }

  mkdirSync(OUT_DIR, { recursive: true })

  const pages = [
    {
      slug: 'home',
      title: 'Colin Armstrong',
      subtitle: 'Software engineer & founder building Paragraph.',
    },
    {
      slug: 'writing',
      title: 'Writing',
      subtitle: 'Articles about startups, product, and engineering.',
    },
    ...posts,
  ]

  for (const page of pages) {
    const png = await generateImage(page.title, page.subtitle, fonts)
    const path = join(OUT_DIR, `${page.slug}.png`)
    writeFileSync(path, png)
    console.log(`  ${page.slug}.png`)
  }

  console.log(`Generated ${pages.length} OG images`)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
