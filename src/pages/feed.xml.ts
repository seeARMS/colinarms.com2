import rss from '@astrojs/rss'
import type { APIContext } from 'astro'
import { person } from '@/data/profile'
import { getColinArticlesWithContent } from '@/lib/getAllArticles'

export const prerender = true

// Each post in full, so a feed reader shows the whole post rather than one
// line. It's Paragraph's own HTML, whose links and images are already
// absolute; the page's resized images and code colours live on armstr.ng, so
// they stay off the feed.
export async function GET(context: APIContext) {
  const posts = (await getColinArticlesWithContent()).filter((post) => !post.unlisted)
  const feed = new URL('/feed.xml', context.site).href
  // When the newest post last changed, not when the site was built: a
  // rebuild alone isn't news.
  const updated = posts.map((post) => post.updatedIso).sort().at(-1)

  return rss({
    title: 'Colin Armstrong',
    description: 'Writing about startups, product, and engineering.',
    site: context.site!.href,
    trailingSlash: false,
    xmlns: { atom: 'http://www.w3.org/2005/Atom' },
    customData: [
      '<language>en-us</language>',
      `<atom:link href="${feed}" rel="self" type="application/rss+xml"/>`,
      updated && `<lastBuildDate>${new Date(updated).toUTCString()}</lastBuildDate>`,
    ]
      .filter(Boolean)
      .join(''),
    items: posts.map((post) => ({
      title: post.title,
      description: post.subtitle || undefined,
      content: post.html || undefined,
      pubDate: new Date(post.isoDate),
      link: `/writing/${post.slug}`,
      author: `${person.email} (${person.name})`,
    })),
  })
}
