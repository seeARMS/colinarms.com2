import glob from 'fast-glob'
import * as path from 'path'

import * as Parser from 'rss-parser'

let parser = new Parser()

async function importArticle(articleFilename) {
  let { meta, default: component } = await import(
    `../pages/articles/${articleFilename}`
  )
  return {
    slug: articleFilename.replace(/(\/index)?\.mdx$/, ''),
    ...meta,
    component,
  }
}

export async function getAllArticles() {
  let articleFilenames = await glob(['*.mdx', '*/index.mdx'], {
    cwd: path.join(process.cwd(), 'src/pages/articles'),
  })

  let articles = await Promise.all(articleFilenames.map(importArticle))

  return articles.sort((a, z) => new Date(z.date) - new Date(a.date))
}

export async function getColinArticles() {
  let feed = await parser.parseURL(
    'https://paragraph.xyz/api/blogs/rss/@colins-blog'
  )

  console.log(feed)

  return feed.items.sort((a, z) => new Date(z.isoDate) - new Date(a.isoDate))
}
