// Social preview images (1200×630) for the home page, the writing index and
// every post, in the site's own design: Newsreader on near-white paper, with
// the display cut for titles. Runs before each build (`npm run build`).
import satori from 'satori'
import { Resvg } from '@resvg/resvg-js'
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'
import { siteSlug } from '../src/lib/slug.js'

const API_BASE = 'https://public.api.paragraph.com/api/v1'
const PUB_ID = '3eJHzLXKQHclhCdsO4Yr'
const ROOT = join(import.meta.dirname, '..')
const OUT_DIR = join(ROOT, 'public', 'og')

const INK = '#17181c'
const INK_2 = '#5c5f69'
const INK_3 = '#737782'
const LINE = '#e3e4e9'
const BG = '#fbfbfc'
const BLUE = '#2b3fd0'

// Older Safari UA → Google Fonts returns WOFF (satori needs ttf/woff).
const FONT_UA =
  'Mozilla/5.0 (Macintosh; U; Intel Mac OS X 10_6_8; de-at) AppleWebKit/534.59.10 (KHTML, like Gecko) Version/5.1.7 Safari/534.57.2'

// Newsreader at one optical size and weight: 72 is the display cut for
// titles, 20 the text cut for everything else.
async function loadFont(opsz, weight) {
  const css = await fetch(`https://fonts.googleapis.com/css2?family=Newsreader:opsz,wght@${opsz},${weight}`, {
    headers: { 'User-Agent': FONT_UA },
  }).then((r) => r.text())

  const url = css.match(/url\(([^)]+)\)/)?.[1]
  if (!url) throw new Error(`Font URL not found for Newsreader ${opsz}/${weight}`)
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
    { display: 'flex', fontSize: size, fontWeight: 500, letterSpacing: -size * 0.01, color: INK },
    'armstr',
    h('span', { color: INK_2, fontWeight: 400 }, '.ng'),
  )

// The page every image is set on: paper, wide margins, a hairline above the
// foot, and a short ultramarine stroke where the hairline begins.
const page = (...children) =>
  h(
    'div',
    {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      width: '100%',
      height: '100%',
      padding: '72px 88px 64px',
      backgroundColor: BG,
      fontFamily: 'Newsreader',
    },
    ...children,
  )

const foot = (left, right) =>
  h(
    'div',
    { display: 'flex', flexDirection: 'column' },
    h(
      'div',
      { display: 'flex', height: 2, backgroundColor: LINE },
      h('div', { display: 'flex', width: 120, height: 2, backgroundColor: BLUE }),
    ),
    h(
      'div',
      { display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: 28, fontSize: 28, color: INK_3 },
      left,
      right,
    ),
  )

function homeMarkup() {
  return page(
    h(
      'div',
      { display: 'flex', flexDirection: 'column' },
      h(
        'div',
        { display: 'flex', alignItems: 'center', gap: 40 },
        img(face, 150, { boxShadow: `0 0 0 1px ${LINE}` }),
        h(
          'div',
          { fontFamily: 'Newsreader Display', fontSize: 104, letterSpacing: -2.4, color: INK, lineHeight: 1 },
          'Colin Armstrong',
        ),
      ),
      h(
        'div',
        { marginTop: 48, fontSize: 38, lineHeight: 1.4, color: INK_2 },
        'Founder & CEO of Paragraph. Previously Google and Coinbase.',
      ),
    ),
    foot(wordmark(32), h('div', {}, 'Writing, projects and photography')),
  )
}

function pageMarkup({ title, subtitle, date }) {
  const long = title.length > 56
  return page(
    h(
      'div',
      { display: 'flex', alignItems: 'center', gap: 18 },
      img(face, 56, { boxShadow: `0 0 0 1px ${LINE}` }),
      wordmark(32),
    ),
    h(
      'div',
      { display: 'flex', flexDirection: 'column' },
      h(
        'div',
        {
          fontFamily: 'Newsreader Display',
          fontSize: long ? 64 : 80,
          letterSpacing: long ? -1.2 : -1.6,
          lineHeight: 1.08,
          color: INK,
        },
        title,
      ),
      ...(subtitle ? [h('div', { marginTop: 24, fontSize: 34, lineHeight: 1.4, color: INK_2 }, subtitle)] : []),
    ),
    foot(h('div', {}, 'Colin Armstrong'), h('div', {}, date || 'armstr.ng')),
  )
}

async function render(markup, fonts) {
  const svg = await satori(markup, {
    width: 1200,
    height: 630,
    fonts: [
      { name: 'Newsreader Display', data: fonts.display, weight: 400, style: 'normal' },
      { name: 'Newsreader', data: fonts.text, weight: 400, style: 'normal' },
      { name: 'Newsreader', data: fonts.medium, weight: 500, style: 'normal' },
    ],
  })
  return new Resvg(svg, { fitTo: { mode: 'width', value: 1200 } }).render().asPng()
}

async function main() {
  console.log('Generating OG images...')

  const [display, text, medium, posts] = await Promise.all([
    loadFont(72, 400),
    loadFont(20, 400),
    loadFont(20, 500),
    fetchPosts(),
  ])
  const fonts = { display, text, medium }

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
