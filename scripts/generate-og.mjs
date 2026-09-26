// Social preview images (1200×630) for the home page, the writing index and
// every post, in the site's own design: a white hairline card on the gray
// canvas, set in Geist. Runs before each build (`npm run build`).
import satori from 'satori'
import { Resvg } from '@resvg/resvg-js'
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'
import { siteSlug } from '../src/lib/slug.js'

const API_BASE = 'https://public.api.paragraph.com/api/v1'
const PUB_ID = '3eJHzLXKQHclhCdsO4Yr'
const ROOT = join(import.meta.dirname, '..')
const OUT_DIR = join(ROOT, 'public', 'og')

const INK = '#171717'
const INK_2 = '#666666'
const INK_3 = '#737373'
const LINE = '#ebebeb'
const BG = '#fafafa'

// Older Safari UA → Google Fonts returns TrueType (satori needs ttf/woff).
const FONT_UA =
  'Mozilla/5.0 (Macintosh; U; Intel Mac OS X 10_6_8; de-at) AppleWebKit/534.59.10 (KHTML, like Gecko) Version/5.1.7 Safari/534.57.2'

async function loadFont(family, weight) {
  const css = await fetch(
    `https://fonts.googleapis.com/css2?family=${encodeURIComponent(family)}:wght@${weight}`,
    { headers: { 'User-Agent': FONT_UA } },
  ).then((r) => r.text())

  const url = css.match(/url\(([^)]+)\)/)?.[1]
  if (!url) throw new Error(`Font URL not found for ${family} ${weight}`)
  return fetch(url).then((r) => r.arrayBuffer())
}

async function fetchPosts() {
  const res = await fetch(`${API_BASE}/publications/${PUB_ID}/posts?limit=50`)
  const { items } = await res.json()
  return items.map((post) => ({
    title: post.title,
    subtitle: post.subtitle || '',
    slug: siteSlug(post.slug),
    date: new Intl.DateTimeFormat('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
      timeZone: 'America/Los_Angeles',
    }).format(new Date(Number(post.publishedAt))),
  }))
}

const face = `data:image/jpeg;base64,${readFileSync(join(ROOT, 'src', 'assets', 'colin.jpg')).toString('base64')}`

// A tiny JSX stand-in: one child is passed as itself, several as an array.
const h = (type, style, ...children) => {
  const kids = children.flat()
  return { type, props: { style, children: kids.length === 1 ? kids[0] : kids } }
}
const img = (src, size, extra = {}) => ({
  type: 'img',
  props: { src, width: size, height: size, style: { borderRadius: size, ...extra } },
})

const wordmark = (size) =>
  h(
    'div',
    { display: 'flex', fontSize: size, fontWeight: 600, letterSpacing: -size * 0.03, color: INK },
    'armstr',
    h('span', { color: INK_3 }, '.ng'),
  )

// The white card every image sits in.
const card = (...children) =>
  h(
    'div',
    { display: 'flex', width: '100%', height: '100%', padding: 40, backgroundColor: BG, fontFamily: 'Geist' },
    h(
      'div',
      {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        width: '100%',
        height: '100%',
        padding: '56px 64px',
        backgroundColor: '#ffffff',
        border: `1px solid ${LINE}`,
        borderRadius: 20,
      },
      ...children,
    ),
  )

function homeMarkup() {
  return card(
    h(
      'div',
      { display: 'flex', alignItems: 'center', gap: 40 },
      img(face, 168, { boxShadow: `0 0 0 1px ${LINE}` }),
      h(
        'div',
        { display: 'flex', flexDirection: 'column' },
        h('div', { fontSize: 72, fontWeight: 600, letterSpacing: -3.2, color: INK, lineHeight: 1.05 }, 'Colin Armstrong'),
        h('div', { marginTop: 16, fontSize: 30, color: INK_2 }, 'Founder & CEO of Paragraph'),
        h('div', { marginTop: 6, fontSize: 30, color: INK_2 }, 'Previously Google and Coinbase'),
      ),
    ),
    h(
      'div',
      { display: 'flex', alignItems: 'center', justifyContent: 'space-between' },
      wordmark(30),
      h('div', { fontFamily: 'Geist Mono', fontSize: 22, color: INK_3 }, 'Writing · Projects · Photography'),
    ),
  )
}

function pageMarkup({ title, subtitle, date }) {
  const long = title.length > 56
  return card(
    h(
      'div',
      { display: 'flex', alignItems: 'center', gap: 16 },
      img(face, 52, { boxShadow: `0 0 0 1px ${LINE}` }),
      wordmark(30),
    ),
    h(
      'div',
      { display: 'flex', flexDirection: 'column' },
      h(
        'div',
        {
          fontSize: long ? 52 : 64,
          fontWeight: 600,
          letterSpacing: long ? -2 : -2.6,
          lineHeight: 1.1,
          color: INK,
        },
        title,
      ),
      ...(subtitle ? [h('div', { marginTop: 20, fontSize: 30, lineHeight: 1.35, color: INK_2 }, subtitle)] : []),
    ),
    h(
      'div',
      {
        display: 'flex',
        justifyContent: 'space-between',
        paddingTop: 24,
        borderTop: `1px solid ${LINE}`,
        fontSize: 22,
        color: INK_3,
      },
      h('div', {}, 'Colin Armstrong'),
      h('div', { fontFamily: 'Geist Mono' }, date || 'armstr.ng'),
    ),
  )
}

async function render(markup, fonts) {
  const svg = await satori(markup, {
    width: 1200,
    height: 630,
    fonts: [
      { name: 'Geist', data: fonts.regular, weight: 400, style: 'normal' },
      { name: 'Geist', data: fonts.semibold, weight: 600, style: 'normal' },
      { name: 'Geist Mono', data: fonts.mono, weight: 400, style: 'normal' },
    ],
  })
  return new Resvg(svg, { fitTo: { mode: 'width', value: 1200 } }).render().asPng()
}

async function main() {
  console.log('Generating OG images...')

  const [regular, semibold, mono, posts] = await Promise.all([
    loadFont('Geist', 400),
    loadFont('Geist', 600),
    loadFont('Geist Mono', 400),
    fetchPosts(),
  ])
  const fonts = { regular, semibold, mono }

  mkdirSync(OUT_DIR, { recursive: true })

  const pages = [
    { slug: 'home', markup: homeMarkup() },
    {
      slug: 'writing',
      markup: pageMarkup({ title: 'Writing', subtitle: 'Thoughts on startups, product, engineering, and more.' }),
    },
    ...posts.map((post) => ({ slug: post.slug, markup: pageMarkup(post) })),
  ]

  for (const page of pages) {
    writeFileSync(join(OUT_DIR, `${page.slug}.png`), await render(page.markup, fonts))
    console.log(`  ${page.slug}.png`)
  }

  console.log(`Generated ${pages.length} OG images`)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
