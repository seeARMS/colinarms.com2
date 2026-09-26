// Syntax highlighting for the code blocks in posts, done when the site builds.
//
// The theme names only CSS variables (--code-*, set in global.css from the
// site's own palette), so code follows light and dark mode like everything
// else. Shiki's JavaScript regex engine keeps it free of WebAssembly, which
// matters because pages are prerendered inside workerd.
import { createCssVariablesTheme, createHighlighterCore, type HighlighterCore } from 'shiki/core'
import { createJavaScriptRegexEngine } from 'shiki/engine/javascript'

const theme = createCssVariablesTheme({ name: 'site', variablePrefix: '--code-' })

let highlighter: Promise<HighlighterCore> | undefined
const getHighlighter = () =>
  (highlighter ??= createHighlighterCore({
    themes: [theme],
    langs: [
      import('shiki/langs/shellscript.mjs'),
      import('shiki/langs/json.mjs'),
      import('shiki/langs/jsonc.mjs'),
      import('shiki/langs/jsx.mjs'),
      import('shiki/langs/viml.mjs'),
    ],
    engine: createJavaScriptRegexEngine({ forgiving: true }),
  }))

// Paragraph's HTML doesn't say what language a block is in, so guess from the
// code itself. Anything unrecognized (error messages, prose) stays plain.
function detect(code: string): string | undefined {
  const text = code.trim()
  const opening = text.split('\n').slice(0, 3).join('\n')

  if (/^\s*(let [gbswtlv]:|set no?\w+|[nvix]?noremap\b|autocmd\b|call plug#)/m.test(text)) return 'viml'
  if (
    /^#!.*\b(ba|z)?sh\b/.test(text) ||
    /^(\$ )?(npm|npx|yarn|pnpm|brew|sudo|apt(-get)?|git|docker|curl|wget|cd|export|chmod|mkdir|sysctl|gcloud|kubectl)\s/m.test(
      opening,
    )
  )
    return 'shellscript'

  const withoutComments = text.replace(/^\s*\/\/.*$/gm, '').trim()
  if (/^[[{]/.test(withoutComments)) {
    try {
      JSON.parse(withoutComments)
      return withoutComments === text ? 'json' : 'jsonc'
    } catch {
      if (/"[^"\n]+"\s*:/.test(withoutComments)) return 'jsonc'
    }
  }

  if (/\b(const|let|var|function|import|export|return|async|await|useState|useEffect)\b|=>/.test(text) && /[=(){}]/.test(text))
    return 'jsx'

  return undefined
}

const ENTITIES: Record<string, string> = { lt: '<', gt: '>', amp: '&', quot: '"', apos: "'", '#39': "'", '#x27': "'" }
const decode = (html: string) => html.replace(/&(lt|gt|amp|quot|apos|#39|#x27);/g, (_, name) => ENTITIES[name])

/** The post's HTML with every recognizable code block highlighted. */
export async function highlight(html: string): Promise<string> {
  const blocks = [...html.matchAll(/<pre[^>]*>\s*<code([^>]*)>([\s\S]*?)<\/code>\s*<\/pre>/g)]
  if (blocks.length === 0) return html

  const hl = await getHighlighter()
  let out = ''
  let last = 0
  for (const block of blocks) {
    const code = decode(block[2]).replace(/\n+$/, '')
    const lang = block[1].match(/language-([\w-]+)/)?.[1] ?? detect(code)
    out += html.slice(last, block.index)
    out += lang && hl.getLoadedLanguages().includes(lang) ? hl.codeToHtml(code, { lang, theme: 'site' }) : block[0]
    last = block.index! + block[0].length
  }
  return out + html.slice(last)
}
