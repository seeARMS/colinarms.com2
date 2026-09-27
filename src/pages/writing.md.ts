// The writing archive as Markdown, for agents (see src/worker.ts). Its copy
// repeats writing/index.astro's; change both.
import type { APIRoute } from 'astro'
import { person } from '@/data/profile'
import { mediumDate, year } from '@/lib/format'
import { getColinArticles } from '@/lib/getAllArticles'
import { abs, frontMatter, link, markdown } from '@/lib/markdown'

export const prerender = true

export const GET: APIRoute = async () => {
  const articles = await getColinArticles()
  const years = [...new Set(articles.map((post) => year(post.isoDate)))]

  return markdown(
    frontMatter({
      title: `Writing on startups, product & engineering – ${person.name}`,
      description:
        'Essays by Colin Armstrong, founder of Paragraph, on startups, product, engineering, and the open web. Subscribe to get new posts by email.',
      url: abs('/writing'),
    }),
    '# Writing',
    `Thoughts on startups, product, engineering, and whatever else is on my mind. If you'd like to follow along, subscribe by email at ${abs('/writing')} or follow the ${link('RSS feed', abs('/feed.xml'))}.`,
    articles.length > 0 &&
      [
        '## Archive',
        `${articles.length} posts since ${years.at(-1)}, also on ${link('Paragraph', person.blog)}.`,
        ...years.map((y) =>
          [
            `### ${y}`,
            articles
              .filter((post) => year(post.isoDate) === y)
              .map(
                (post) =>
                  `- ${link(post.title, abs(post.link))}, ${mediumDate(post.isoDate)}${post.subtitle ? `: ${post.subtitle}` : ''}`,
              )
              .join('\n'),
          ].join('\n\n'),
        ),
      ].join('\n\n'),
  )
}
