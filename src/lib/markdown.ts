// The pages' Markdown versions (src/pages/*.md.ts) are for agents, which read
// them instead of the HTML: the same content, without the markup. These are
// the pieces they're built from.
import { SITE } from '@/lib/schema'

/** A full URL on this site: a link in Markdown has to stand on its own. */
export const abs = (path: string) => new URL(path, SITE).href

/** Markdown's own characters in link text, escaped. */
const escape = (text: string) => text.replace(/[\\`*_[\]]/g, '\\$&')

export const link = (text: string, href: string) => `[${escape(text)}](${href})`

/** YAML front matter. A JSON string is valid YAML, so values are quoted that way. */
export function frontMatter(fields: Record<string, string | undefined>) {
  const lines = Object.entries(fields)
    .filter(([, value]) => value !== undefined)
    .map(([key, value]) => `${key}: ${JSON.stringify(value)}`)
  return ['---', ...lines, '---'].join('\n')
}

/**
 * An endpoint's response: the blocks, a blank line apart. It's built to a
 * static .md file; in production the Worker adds the charset and canonical
 * headers when it serves one.
 */
export function markdown(...blocks: (string | false | undefined)[]) {
  return new Response(`${blocks.filter(Boolean).join('\n\n')}\n`, {
    headers: { 'Content-Type': 'text/markdown; charset=utf-8' },
  })
}
