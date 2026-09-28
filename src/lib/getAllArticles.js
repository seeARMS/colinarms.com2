import { siteSlug } from './slug.js'
import { edited } from '../data/posts.ts'

const API_BASE = 'https://public.api.paragraph.com/api/v1'
const PUB_ID = '3eJHzLXKQHclhCdsO4Yr'

export async function getColinArticles() {
  const { items } = await fetchPosts()

  return items.map((post) => {
    const slug = siteSlug(post.slug)
    const isoDate = new Date(Number(post.publishedAt)).toISOString()
    return {
      title: post.title,
      subtitle: post.subtitle,
      link: `/writing/${slug}`,
      isoDate,
      /** When its text last changed (src/data/posts.ts), else when it was published. */
      updatedIso: edited[slug] ?? isoDate,
    }
  })
}

export async function getColinArticlesWithContent() {
  const { items } = await fetchPosts({ includeContent: true })

  return items.map((post) => {
    const slug = siteSlug(post.slug)
    const isoDate = new Date(Number(post.publishedAt)).toISOString()
    return {
      title: post.title,
      subtitle: post.subtitle,
      slug,
      html: post.staticHtml,
      /** Paragraph's own Markdown of the post, for its Markdown version. */
      markdown: post.markdown,
      /** When its text last changed (src/data/posts.ts), else when it was published. */
      updatedIso: edited[slug] ?? isoDate,
      isoDate,
    }
  })
}

async function fetchPosts({ includeContent } = {}) {
  const params = new URLSearchParams({ limit: '50' })
  if (includeContent) params.set('includeContent', 'true')

  try {
    const res = await fetch(`${API_BASE}/publications/${PUB_ID}/posts?${params}`)
    return res.json()
  } catch (e) {
    console.error('Failed to fetch posts:', e)
    return { items: [] }
  }
}
