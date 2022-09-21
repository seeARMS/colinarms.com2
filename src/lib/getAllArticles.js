import glob from 'fast-glob'
import * as path from 'path'

import * as Parser from 'rss-parser'

let parser = new Parser()

export async function getColinArticles() {
  let feed = await parser.parseURL(
    'https://paragraph.xyz/api/blogs/rss/@colins-blog'
  )

  console.log(feed)

  return feed.items.sort((a, z) => new Date(z.isoDate) - new Date(a.isoDate))
}
