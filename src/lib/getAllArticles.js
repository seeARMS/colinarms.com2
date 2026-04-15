const API_BASE = 'https://public.api.paragraph.com/api/v1'

export async function getColinArticles() {
  const pubRes = await fetch(
    `${API_BASE}/publications/domain/writing.cma.xyz`,
  )
  const pub = await pubRes.json()

  const postsRes = await fetch(
    `${API_BASE}/publications/${pub.id}/posts?limit=10`,
  )
  const { items } = await postsRes.json()

  return items.map((post) => ({
    title: post.title,
    link: `https://writing.cma.xyz/${post.slug}`,
    isoDate: new Date(Number(post.publishedAt)).toISOString(),
  }))
}
