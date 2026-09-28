import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import test from 'node:test'

const rules = readFileSync(new URL('../public/_redirects', import.meta.url), 'utf8')
  .split('\n')
  .filter((line) => line.startsWith('/') && !line.startsWith('/*'))
  .map((line) => line.split(/\s+/))
const redirects = new Map(rules.map(([from, to]) => [from, to]))

const posts = [
  'automatically-remove-unused-imports-and-variables-in-vim-using-ale-and-eslint',
  'data-spectrum',
  'identity-wallets-over-emails',
  'nextjs-server-side-and-client-side-mismatch',
  'personal-automation-with-huginn-using-slack-docker-and-gcp',
  'spending-time-deliberately',
]

test('all ten personal-page 404s reported by Search Console have exact destinations', () => {
  const examples = [
    ['/@colins-blog/', '/'],
    ...['projects', 'photography', 'contact'].map((page) => [`/@colins-blog/${page}/`, `/${page}`]),
    ...posts.map((slug) => [
      `/@colins-blog/writing/${slug.replace('nextjs-', 'nextjs:-')}/`,
      `/writing/${slug}`,
    ]),
  ]
  assert.equal(examples.length, 10)
  for (const [from, to] of examples) assert.equal(redirects.get(from), to, from)
})

test('old biography, press, Hugo, feed and encoded-colon links retain their meaning', () => {
  const examples = [
    ['/about', '/'],
    ['/press/', '/projects#press'],
    ['/posts/huginn-slack-gcp-automation/', '/writing/personal-automation-with-huginn-using-slack-docker-and-gcp'],
    ['/@blog.colinarms.com/nextjs%3A-server-side-and-client-side-mismatch', '/writing/nextjs-server-side-and-client-side-mismatch'],
    ['/@colins-blog/atom.xml', '/feed.xml'],
    ['/writing/photoshop-hijacks-your-cursor', '/writing'],
  ]
  for (const [from, to] of examples) assert.equal(redirects.get(from), to, from)
})

test('every exact rule is permanent, unique, and points directly to a published destination', () => {
  const pages = new Set(['/', '/projects', '/projects#press', '/photography', '/contact', '/writing', '/feed.xml', ...posts.map((slug) => `/writing/${slug}`)])
  assert.equal(redirects.size, rules.length, 'duplicate source paths')
  for (const [from, to, status] of rules) {
    assert.equal(status, '301', from)
    assert.ok(pages.has(to), `${from} points to an unknown destination: ${to}`)
    assert.ok(!redirects.has(to), `${from} creates a redirect chain through ${to}`)
  }
  assert.ok(!redirects.has('/api/subscribe'))
  assert.ok(!redirects.has('/uses'))
})
