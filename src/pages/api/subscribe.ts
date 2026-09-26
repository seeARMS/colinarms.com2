import type { APIRoute } from 'astro'
import { env } from 'cloudflare:workers'

type Bindings = {
  PARAGRAPH_API_KEY?: string
  /** Optional Workers rate limiter, declared in wrangler.jsonc. */
  SUBSCRIBE_LIMIT?: { limit(options: { key: string }): Promise<{ success: boolean }> }
}

const bindings = env as unknown as Bindings
const EMAIL = /^[^\s@]+@[^\s@.]+(\.[^\s@.]+)+$/

const json = (body: object, status = 200) =>
  new Response(JSON.stringify(body), { status, headers: { 'Content-Type': 'application/json' } })

export const POST: APIRoute = async ({ request }) => {
  // Only this site's own pages post here.
  const origin = request.headers.get('Origin')
  if (origin && origin !== new URL(request.url).origin) {
    return json({ error: 'Subscribe from armstr.ng.' }, 403)
  }

  const body = await request.json().catch(() => null)
  const email = typeof body?.email === 'string' ? body.email.trim() : ''

  // The hidden field people never see: anything in it is a bot. Tell it
  // nothing useful.
  if (typeof body?.website === 'string' && body.website !== '') {
    return json({ success: true })
  }

  if (!EMAIL.test(email) || email.length > 254) {
    return json({ error: 'Enter an email address, like you@example.com.' }, 400)
  }

  const ip = request.headers.get('CF-Connecting-IP') ?? 'unknown'
  if (bindings.SUBSCRIBE_LIMIT) {
    const { success } = await bindings.SUBSCRIBE_LIMIT.limit({ key: ip })
    if (!success) {
      return json({ error: 'Too many attempts. Try again in a minute.' }, 429)
    }
  }

  // A Worker secret at runtime; a build-time variable still works as a fallback.
  const apiKey = bindings.PARAGRAPH_API_KEY ?? import.meta.env.PARAGRAPH_API_KEY
  if (!apiKey) {
    console.error('subscribe: PARAGRAPH_API_KEY is not set')
    return json({ error: "Subscribing isn't available right now. Email colin@armstr.ng instead." }, 503)
  }

  const res = await fetch('https://public.api.paragraph.com/api/v1/subscribers', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email }),
  })

  if (!res.ok) {
    const detail = await res.json().catch(() => ({}))
    return json({ error: detail.msg || "Couldn't subscribe right now. Try again in a moment." }, res.status)
  }

  return json({ success: true })
}
