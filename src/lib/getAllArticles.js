import * as Parser from 'rss-parser'

let parser = new Parser()

export async function getColinArticles() {
  try {
    const feed = await parser.parseURL(
      'https://api.paragraph.com/blogs/rss/@writing.cma.xyz'
    )

    return feed.items.sort((a, z) => new Date(z.isoDate) - new Date(a.isoDate))
  } catch (error) {
    console.error('Failed to fetch RSS feed', error)
    return []
  }
}
