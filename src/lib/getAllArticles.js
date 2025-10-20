import * as Parser from 'rss-parser'

let parser = new Parser()

export async function getColinArticles() {
  let feed = await parser.parseURL(
    'https://api.paragraph.com/blogs/rss/@writing.cma.xyz'
  )

  console.log(feed)

  return feed.items.sort((a, z) => new Date(z.isoDate) - new Date(a.isoDate))
}
