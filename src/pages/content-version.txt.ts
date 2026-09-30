// The posts this build was made from, for the Worker's cron to compare with
// Paragraph's (see getContentVersion in src/lib/getAllArticles.js).
import type { APIRoute } from 'astro'
import { getContentVersion } from '@/lib/getAllArticles'

export const prerender = true

export const GET: APIRoute = async () =>
  new Response(await getContentVersion(), {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  })
