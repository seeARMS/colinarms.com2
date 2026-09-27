// Social preview images (1200×630) for the home page, the writing index and
// every post. Each is a navy panel set in Geist (the way heade.rs sets its
// share cards) beside a picture: the illustrated portrait on the home card,
// the gold end of the homepage banner on the rest. Runs before each build
// (`npm run build`).
import satori from 'satori'
import { Resvg } from '@resvg/resvg-js'
import sharp from 'sharp'
import { mkdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'
import { siteSlug } from '../src/lib/slug.js'

const API_BASE = 'https://public.api.paragraph.com/api/v1'
const PUB_ID = '3eJHzLXKQHclhCdsO4Yr'
const ROOT = join(import.meta.dirname, '..')
const OUT_DIR = join(ROOT, 'public', 'og')

const W = 1200
const H = 630
// The picture takes the right of the card; the type sits on the navy left.
const PICTURE = 560
const PANEL = W - PICTURE
const PAD = 72

// The banner's own colours.
const NAVY = '#12213c'
const CREAM = '#f2e6d1'
const CREAM_2 = 'rgba(242, 230, 209, 0.74)'
const CREAM_3 = 'rgba(242, 230, 209, 0.56)'
const RULE = 'rgba(242, 230, 209, 0.16)'
const GOLD = '#daaa56'

// Geist Regular and SemiBold, the same files heade.rs uses (OFL, see scripts/fonts/OFL.txt).
const font = (name) => readFileSync(join(import.meta.dirname, 'fonts', `${name}.ttf`))
const FONTS = [
  { name: 'Geist', data: font('Geist-Regular'), weight: 400, style: 'normal' },
  { name: 'Geist', data: font('Geist-SemiBold'), weight: 600, style: 'normal' },
]

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

// --- Pictures ------------------------------------------------------------

/** Part of an image (in its own pixels), resized to width × height, as a data URI. */
async function picture(file, region, width, height) {
  const jpeg = await sharp(join(ROOT, 'src', 'assets', file))
    .extract(region)
    .resize(width, height, { fit: 'fill' })
    .jpeg({ quality: 90 })
    .toBuffer()
  return `data:image/jpeg;base64,${jpeg.toString('base64')}`
}

// The paper grain of the banner, drawn over the navy so the panel matches the
// picture beside it: fine light and dark tooth, and faint vertical streaks.
const GRAIN =
  '<filter id="grain" x="0" y="0" width="100%" height="100%" color-interpolation-filters="sRGB">' +
  '<feTurbulence type="fractalNoise" baseFrequency="0.95" numOctaves="2" seed="3" result="fine"/>' +
  '<feColorMatrix in="fine" type="matrix" values="0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  0.9 0 0 0 -0.42" result="light"/>' +
  '<feColorMatrix in="fine" type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 -0.9 0 0 0.4" result="dark"/>' +
  '<feTurbulence type="fractalNoise" baseFrequency="0.035 0.006" numOctaves="3" seed="9" result="streak"/>' +
  '<feColorMatrix in="streak" type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0.22 0 0 0 -0.1" result="shade"/>' +
  '<feMerge><feMergeNode in="shade"/><feMergeNode in="dark"/><feMergeNode in="light"/></feMerge>' +
  '</filter>'

/** Everything under the type: the grained navy panel and the picture beside it. */
function background(uri) {
  const svg =
    `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}"><defs>${GRAIN}</defs>` +
    `<rect width="${PANEL}" height="${H}" fill="${NAVY}"/>` +
    `<rect width="${PANEL}" height="${H}" filter="url(#grain)" opacity="0.34"/>` +
    `<image x="${PANEL}" width="${PICTURE}" height="${H}" preserveAspectRatio="none" href="${uri}"/>` +
    `</svg>`
  return `data:image/png;base64,${new Resvg(svg).render().asPng().toString('base64')}`
}

// --- Markup --------------------------------------------------------------

// A tiny JSX stand-in: one child is passed as itself, several as an array.
const h = (type, style, ...children) => {
  const kids = children.flat().filter((c) => c !== null)
  return { type, props: { style, children: kids.length === 1 ? kids[0] : kids } }
}
const img = (src, width, height, style = {}) => ({ type: 'img', props: { src, width, height, style } })

// Like heade.rs's name: SemiBold, tracked in a little. The suffix keeps the site's quieter tone.
const wordmark = (size) =>
  h(
    'div',
    { display: 'flex', fontSize: size, fontWeight: 600, letterSpacing: -size * 0.02, color: CREAM },
    'armstr',
    h('span', { color: CREAM_3 }, '.ng'),
  )

/** Titles get smaller as they get longer, so even a long one fits the panel in four lines. */
function titleStyle(title) {
  const n = title.length
  const size = n <= 28 ? 64 : n <= 44 ? 58 : n <= 60 ? 52 : n <= 84 ? 46 : 40
  return { fontSize: size, fontWeight: 600, letterSpacing: -size * 0.04, lineHeight: 1.08, color: CREAM }
}

// The site's foot, recoloured: a hairline with a short stroke of gold where it begins.
const foot = (left, right) =>
  h(
    'div',
    { display: 'flex', flexDirection: 'column' },
    h(
      'div',
      { display: 'flex', height: 1.5, backgroundColor: RULE },
      h('div', { display: 'flex', width: 96, height: 1.5, backgroundColor: GOLD }),
    ),
    h(
      'div',
      { display: 'flex', justifyContent: 'space-between', paddingTop: 24, fontSize: 23, color: CREAM_3 },
      left,
      right,
    ),
  )

/** The card: its background, with the type laid out in the navy panel. */
const card = (bg, top, bottom) =>
  h(
    'div',
    { display: 'flex', width: '100%', height: '100%', fontFamily: 'Geist' },
    img(bg, W, H, { position: 'absolute', left: 0, top: 0 }),
    h(
      'div',
      {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        width: PANEL,
        height: '100%',
        padding: `64px ${PAD}px 60px`,
      },
      h('div', { display: 'flex', flexDirection: 'column' }, ...top),
      bottom,
    ),
  )

function homeMarkup(bg) {
  return card(
    bg,
    [
      wordmark(32),
      h(
        'div',
        { marginTop: 62, fontSize: 100, fontWeight: 600, letterSpacing: -4.5, lineHeight: 1, color: CREAM },
        'Colin Armstrong',
      ),
      h(
        'div',
        { marginTop: 30, width: 480, fontSize: 30, lineHeight: 1.4, color: CREAM_2 },
        'Founder & CEO of Paragraph. Previously Google and Coinbase.',
      ),
    ],
    foot(h('div', {}, 'Writing, projects and photography'), null),
  )
}

function pageMarkup(bg, avatar, { title, subtitle, date }) {
  return card(
    bg,
    [
      h(
        'div',
        { display: 'flex', alignItems: 'center', gap: 14 },
        img(avatar, 46, 46, { borderRadius: 46, boxShadow: `0 0 0 1.5px rgba(242, 230, 209, 0.3)` }),
        wordmark(30),
      ),
      h('div', { marginTop: 50, ...titleStyle(title) }, title),
      subtitle ? h('div', { marginTop: 22, fontSize: 27, lineHeight: 1.4, color: CREAM_2 }, subtitle) : null,
    ],
    // Posts give their date; the writing index, which has none, gives its address.
    foot(h('div', {}, 'Colin Armstrong'), h('div', {}, date || 'armstr.ng/writing')),
  )
}

// Rendered as JPEG: the banner's texture and the grain make a PNG of each card
// over a megabyte.
async function render(markup) {
  const svg = await satori(markup, { width: W, height: H, fonts: FONTS })
  const png = new Resvg(svg, { fitTo: { mode: 'width', value: W } }).render().asPng()
  return sharp(png).jpeg({ quality: 86, mozjpeg: true, chromaSubsampling: '4:4:4' }).toBuffer()
}

async function main() {
  console.log('Generating OG images...')

  // The portrait loses a little of its left edge, so its gold line falls just
  // inside the seam. The banner's right end holds the cream circle, the gold
  // line and the gold sun.
  const [portrait, banner, avatar, posts] = await Promise.all([
    picture('colin.jpg', { left: 110, top: 0, width: 1115, height: 1254 }, PICTURE, H),
    picture('banner.webp', { left: 1407, top: 0, width: 593, height: 667 }, PICTURE, H),
    picture('colin.jpg', { left: 210, top: 90, width: 820, height: 820 }, 92, 92),
    fetchPosts(),
  ])
  const home = background(portrait)
  const page = background(banner)

  // Start clean, so a renamed post doesn't leave its old card behind.
  rmSync(OUT_DIR, { recursive: true, force: true })
  mkdirSync(OUT_DIR, { recursive: true })

  const pages = [
    { slug: 'home', markup: homeMarkup(home) },
    {
      slug: 'writing',
      markup: pageMarkup(page, avatar, {
        title: 'Writing',
        subtitle: 'Thoughts on startups, product, engineering, and more.',
      }),
    },
    ...posts.map((post) => ({ slug: post.slug, markup: pageMarkup(page, avatar, post) })),
  ]

  for (const { slug, markup } of pages) {
    writeFileSync(join(OUT_DIR, `${slug}.jpg`), await render(markup))
    console.log(`  ${slug}.jpg`)
  }

  console.log(`Generated ${pages.length} OG images`)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
