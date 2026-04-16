const API_BASE = 'https://public.api.paragraph.com/api/v1'
const PUB_ID = '3eJHzLXKQHclhCdsO4Yr'

export async function getColinArticles() {
  const { items } = await fetchPosts()

  return items.map((post) => ({
    title: post.title,
    link: `/writing/${post.slug}`,
    isoDate: new Date(Number(post.publishedAt)).toISOString(),
  }))
}

export async function getColinArticlesWithContent() {
  const { items } = await fetchPosts({ includeContent: true })

  return items.map((post) => ({
    title: post.title,
    subtitle: post.subtitle,
    slug: post.slug,
    html: post.staticHtml,
    isoDate: new Date(Number(post.publishedAt)).toISOString(),
  }))
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
