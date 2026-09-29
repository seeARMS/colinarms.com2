// The Worker in front of Astro. Every page has a Markdown version built beside
// it for agents (/writing → /writing.md, and /index.md for the home page). It's
// served at that address, and at the page's own address when a request's
// Accept header prefers text/markdown, as Claude Code's and other coding
// agents' do. Only the pages and their .md files come through here (see
// assets.run_worker_first in wrangler.jsonc); everything else is served
// straight from the static files.
import { handle } from '@astrojs/cloudflare/handler'
import { prefersMarkdown } from './lib/negotiate'

type Handle = Parameters<typeof handle>

export default {
  async fetch(request: Request, env: Handle[1], ctx: Handle[2]) {
    const url = new URL(request.url)
    const reading = request.method === 'GET' || request.method === 'HEAD'
    const source = reading ? markdownFor(url.pathname, request.headers.get('accept')) : undefined
    if (source) {
      const file = await env.ASSETS.fetch(new URL(source.file, url))
      if (file.ok) {
        const headers = new Headers(file.headers)
        headers.set('content-type', 'text/markdown; charset=utf-8')
        headers.set('vary', 'Accept')
        headers.set('link', `<${new URL(source.page, url).href}>; rel="canonical"`)
        // At a page's own address, keep the Markdown out of every cache, so
        // none can hand it to a browser. The HTML there doesn't say Vary:
        // Accept, because Safari prefetches pages with fetch() (Accept: */*)
        // and wouldn't reuse the prefetched page for the click that follows.
        if (source.negotiated) headers.set('cache-control', 'no-store')
        return new Response(request.method === 'HEAD' ? null : file.body, { headers })
      }
    }
    return reading ? page(request, env, ctx) : handle(request, env, ctx)
  },
}

/**
 * The page's static file, fetched with the request as it came in (whose
 * redirect mode is "manual"), so public/_redirects and conditional requests
 * still work. Astro's handler refetches by URL, which would follow a redirect
 * and serve its target. Astro renders whatever isn't a file (the 404 page).
 */
async function page(request: Request, env: Handle[1], ctx: Handle[2]) {
  const file = await env.ASSETS.fetch(request)
  return file.status === 404 ? handle(request, env, ctx) : file
}

/** The Markdown file a request should get, if any, and the page it stands for. */
function markdownFor(path: string, accept: string | null) {
  if (path.endsWith('.md'))
    return { file: path, page: path === '/index.md' ? '/' : path.slice(0, -3), negotiated: false }
  if (!prefersMarkdown(accept)) return undefined
  if (path === '/') return { file: '/index.md', page: '/', negotiated: true }
  // Pages only. An address ending in a slash is redirected first (public/_redirects).
  if (path.endsWith('/') || path.includes('.')) return undefined
  return { file: `${path}.md`, page: path, negotiated: true }
}
