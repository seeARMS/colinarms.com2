import type { APIRoute } from 'astro'

export const POST: APIRoute = async ({ request }) => {
  const { email } = await request.json()

  if (!email) {
    return new Response(JSON.stringify({ error: 'Email is required' }), {
      status: 400,
    })
  }

  const apiKey = import.meta.env.PARAGRAPH_API_KEY
  const res = await fetch(
    'https://public.api.paragraph.com/api/v1/subscribers',
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email }),
    },
  )

  if (!res.ok) {
    const body = await res.json().catch(() => ({}))
    return new Response(
      JSON.stringify({ error: body.msg || 'Failed to subscribe' }),
      { status: res.status },
    )
  }

  return new Response(JSON.stringify({ success: true }), { status: 200 })
}
