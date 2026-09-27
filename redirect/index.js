// Every address the site and its writing used to live at, sent to the same
// page on armstr.ng with a permanent redirect, so old links and search
// rankings carry over. www.armstr.ng keeps its path and query string as is.
const SITE = 'https://armstr.ng'

// Hosts that only ever served the blog: Paragraph custom domains, and before
// that a Hugo blog on blog.colinarms.com. Anything unrecognized goes to
// /writing rather than the home page.
const BLOG_HOSTS = new Set(['writing.cma.xyz', 'blog.colinarms.com'])

// Posts that lived at the old addresses and are still published, by their
// slug on armstr.ng. (The Photoshop post is archived, so it falls through to
// /writing like any other retired page.)
const POSTS = new Set([
  'automatically-remove-unused-imports-and-variables-in-vim-using-ale-and-eslint',
  'data-spectrum',
  'identity-wallets-over-emails',
  'nextjs-server-side-and-client-side-mismatch',
  'personal-automation-with-huginn-using-slack-docker-and-gcp',
  'spending-time-deliberately',
])

// Older names for the same posts (the Hugo blog's slugs).
const ALIASES = {
  'huginn-slack-gcp-automation':
    'personal-automation-with-huginn-using-slack-docker-and-gcp',
}

// Top-level pages of the old sites.
const PAGES = {
  '': '/',
  about: '/',
  'about-me': '/',
  projects: '/projects',
  press: '/projects#press',
  photography: '/photography',
  contact: '/contact',
  writing: '/writing',
  posts: '/writing',
  subscribe: '/writing',
  'robots.txt': '/robots.txt',
  'sitemap.xml': '/sitemap-index.xml',
}

const FEEDS = new Set([
  'rss.xml',
  'atom.xml',
  'feed.xml',
  'index.xml',
  'feed',
  'rss',
])

// Same cleanup as src/lib/slug.js.
const siteSlug = (slug) =>
  slug
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')

export function destination(url) {
  if (url.hostname === 'www.armstr.ng') {
    return `${SITE}${url.pathname}${url.search}`
  }

  let path
  try {
    path = decodeURIComponent(url.pathname)
  } catch {
    path = url.pathname
  }
  // Paragraph once served the blog under its handle
  // (/@blog.colinarms.com/<slug>); drop that prefix.
  const parts = path
    .split('/')
    .filter(Boolean)
    .filter((part) => !part.startsWith('@'))
  const last = parts.at(-1) ?? ''

  if (url.searchParams.has('feed') || FEEDS.has(last)) return `${SITE}/feed.xml`
  const cleaned = siteSlug(last)
  const slug = Object.hasOwn(ALIASES, cleaned) ? ALIASES[cleaned] : cleaned
  if (POSTS.has(slug)) return `${SITE}/writing/${slug}`
  if (parts.length <= 1 && Object.hasOwn(PAGES, last)) {
    // A blog host's home page is the writing archive.
    const page =
      BLOG_HOSTS.has(url.hostname) && last === '' ? '/writing' : PAGES[last]
    return `${SITE}${page}`
  }
  return `${SITE}${BLOG_HOSTS.has(url.hostname) ? '/writing' : '/'}`
}

export default {
  fetch(request) {
    return Response.redirect(destination(new URL(request.url)), 301)
  },
}
