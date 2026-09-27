// Each post as Markdown, for agents (see src/worker.ts): Paragraph's own
// Markdown of the post, under the same heading and byline as the page.
import type { APIRoute, GetStaticPaths } from 'astro'
import { person } from '@/data/profile'
import { longDate, postDescription, readingTime } from '@/lib/format'
import { getColinArticlesWithContent } from '@/lib/getAllArticles'
import { abs, frontMatter, link, markdown } from '@/lib/markdown'

export const prerender = true

export const getStaticPaths = (async () => {
  const posts = await getColinArticlesWithContent()
  return posts.map((post) => ({ params: { slug: post.slug }, props: post }))
}) satisfies GetStaticPaths

export const GET: APIRoute = ({ params, props }) => {
  const { title, subtitle, html, markdown: body, isoDate, updatedIso, paragraphSlug } = props
  const minutes = html ? readingTime(html) : 0

  return markdown(
    frontMatter({
      title,
      description: postDescription(title, subtitle, html ?? ''),
      url: abs(`/writing/${params.slug}`),
      author: person.name,
      published: isoDate,
      modified: updatedIso === isoDate ? undefined : updatedIso,
    }),
    `# ${title}`,
    subtitle,
    [person.name, longDate(isoDate), minutes > 0 && `${minutes} minute read`].filter(Boolean).join(' · '),
    body?.trim() || `This post lives on Paragraph. ${link('Read it there', `${person.blog}/${paragraphSlug}`)}.`,
  )
}
