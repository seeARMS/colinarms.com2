import { decode } from './format'

// Ids the post page already uses around the post, and "top", which the table
// of contents links to (a browser scrolls to the top for #top when nothing
// else has that id).
const TAKEN = ['top', 'content', 'subscribe', 'subscribe-title', 'keep-reading', 'site-footer']

/** "Unused Imports & Variables" → "unused-imports-variables" */
export const headingSlug = (text: string) =>
  text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')

/**
 * Gives each heading in a post's HTML an id made from its text, so a link to
 * a section works before any script runs, and search engines see the same
 * anchors every time. They're the ids the table of contents used to give the
 * headings in the browser (src/components/PageToc.astro), so links people
 * already shared still land in the right place.
 */
export function headingIds(html: string): string {
  const used = new Set([...TAKEN, ...[...html.matchAll(/\sid="([^"]*)"/g)].map((m) => m[1])])
  return html.replace(/<(h[1-6])(\s[^>]*)?>([\s\S]*?)<\/\1>/gi, (match, tag: string, attrs = '', inner: string) => {
    if (/\sid=/i.test(attrs)) return match
    const text = decode(inner.replace(/<[^>]+>/g, '')).trim()
    if (!text) return match
    let id = headingSlug(text) || 'section'
    while (used.has(id)) id += '-'
    used.add(id)
    return `<${tag} id="${id}"${attrs}>${inner}</${tag}>`
  })
}
