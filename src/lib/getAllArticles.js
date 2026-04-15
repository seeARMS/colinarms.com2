export async function getColinArticles() {
  const res = await fetch(
    'https://api.paragraph.com/blogs/rss/@writing.cma.xyz',
  )
  const xml = await res.text()

  const items = []
  const itemRegex = /<item>([\s\S]*?)<\/item>/g
  let match

  while ((match = itemRegex.exec(xml)) !== null) {
    const itemXml = match[1]
    const title = itemXml.match(/<title><!\[CDATA\[(.*?)\]\]><\/title>/)?.[1]
      ?? itemXml.match(/<title>(.*?)<\/title>/)?.[1]
      ?? ''
    const link = itemXml.match(/<link>(.*?)<\/link>/)?.[1] ?? ''
    const pubDate = itemXml.match(/<pubDate>(.*?)<\/pubDate>/)?.[1] ?? ''
    const isoDate = pubDate ? new Date(pubDate).toISOString() : ''

    items.push({ title, link, isoDate })
  }

  return items.sort((a, z) => new Date(z.isoDate) - new Date(a.isoDate))
}
