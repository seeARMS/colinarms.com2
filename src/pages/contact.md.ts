// Contact as Markdown, for agents (see src/worker.ts). Its copy repeats
// contact.astro's; change both.
import type { APIRoute } from 'astro'
import { person, socials } from '@/data/profile'
import { abs, frontMatter, link, markdown } from '@/lib/markdown'

export const prerender = true

export const GET: APIRoute = () =>
  markdown(
    frontMatter({
      title: `Contact ${person.name}`,
      description:
        'Get in touch with Colin Armstrong, founder and CEO of Paragraph. Founders building something early are especially welcome. Email is the best way to reach him.',
      url: abs('/contact'),
    }),
    '# Contact',
    "I especially like hearing from founders building something early. Email is the best way to reach me: send a few lines on what you're building, who it's for, and where I could help.",
    `Email: ${link(person.email, `mailto:${person.email}`)}`,
    [
      '## Elsewhere',
      socials
        .filter((s) => s.listed !== false)
        .map((s) => `- ${s.name}: ${link(s.handle, s.href)}`)
        .join('\n'),
    ].join('\n\n'),
  )
