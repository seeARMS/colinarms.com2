import rss from '@astrojs/rss'
import type { APIContext } from 'astro'
import { getColinArticles } from '@/lib/getAllArticles'

export const prerender = true

export async function GET(context: APIContext) {
  const articles = await getColinArticles()

  return rss({
    title: 'Colin Armstrong',
    description: 'Writing about startups, product, and engineering.',
    site: context.site!.href,
    trailingSlash: false,
    items: articles.map((post) => ({
      title: post.title,
      description: post.subtitle || undefined,
      pubDate: new Date(post.isoDate),
      link: post.link,
    })),
  })
}
