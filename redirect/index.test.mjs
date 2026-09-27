// Old addresses, taken from the Wayback Machine and search results, and where
// each should land. Run with `npm test`.
import assert from 'node:assert/strict'
import test from 'node:test'
import worker, { destination } from './index.js'

const cases = [
  // www keeps everything
  ['https://www.armstr.ng/writing?x=1', 'https://armstr.ng/writing?x=1'],
  ['https://www.armstr.ng/', 'https://armstr.ng/'],

  // writing.cma.xyz: Paragraph custom domain, 2023–2026
  ['https://writing.cma.xyz/', 'https://armstr.ng/writing'],
  ['https://writing.cma.xyz/?page=2', 'https://armstr.ng/writing'],
  [
    'https://writing.cma.xyz/data-spectrum',
    'https://armstr.ng/writing/data-spectrum',
  ],
  [
    'https://writing.cma.xyz/data-spectrum?referrer=0xabc',
    'https://armstr.ng/writing/data-spectrum',
  ],
  [
    'https://writing.cma.xyz/identity-wallets-over-emails',
    'https://armstr.ng/writing/identity-wallets-over-emails',
  ],
  [
    'https://writing.cma.xyz/nextjs:-server-side-and-client-side-mismatch',
    'https://armstr.ng/writing/nextjs-server-side-and-client-side-mismatch',
  ],
  [
    'https://writing.cma.xyz/nextjs%3A-server-side-and-client-side-mismatch',
    'https://armstr.ng/writing/nextjs-server-side-and-client-side-mismatch',
  ],
  [
    'https://writing.cma.xyz/posts/personal-automation-with-huginn-using-slack-docker-and-gcp',
    'https://armstr.ng/writing/personal-automation-with-huginn-using-slack-docker-and-gcp',
  ],
  [
    'https://writing.cma.xyz/photoshop-hijacks-your-cursor',
    'https://armstr.ng/writing',
  ],
  ['https://writing.cma.xyz/testing-this-out', 'https://armstr.ng/writing'],
  ['https://writing.cma.xyz/category/vim', 'https://armstr.ng/writing'],
  ['https://writing.cma.xyz/p/2', 'https://armstr.ng/writing'],
  [
    'https://writing.cma.xyz/0x04f33157bfbc472adad0e49c27daeee0cf6a2d1b',
    'https://armstr.ng/writing',
  ],
  [
    'https://writing.cma.xyz/nft/Q84ZW27O9QN4mRrX93rY',
    'https://armstr.ng/writing',
  ],
  ['https://writing.cma.xyz/subscribe', 'https://armstr.ng/writing'],
  ['https://writing.cma.xyz/rss.xml', 'https://armstr.ng/feed.xml'],
  ['https://writing.cma.xyz/atom.xml', 'https://armstr.ng/feed.xml'],
  ['https://writing.cma.xyz/robots.txt', 'https://armstr.ng/robots.txt'],

  // blog.colinarms.com: WordPress, then Hugo, then Paragraph
  ['https://blog.colinarms.com/', 'https://armstr.ng/writing'],
  ['https://blog.colinarms.com/?feed=rss2', 'https://armstr.ng/feed.xml'],
  [
    'https://blog.colinarms.com/spending-time-deliberately',
    'https://armstr.ng/writing/spending-time-deliberately',
  ],
  [
    'https://blog.colinarms.com/@blog.colinarms.com/nextjs:-server-side-and-client-side-mismatch',
    'https://armstr.ng/writing/nextjs-server-side-and-client-side-mismatch',
  ],
  [
    'https://blog.colinarms.com/posts/huginn-slack-gcp-automation/',
    'https://armstr.ng/writing/personal-automation-with-huginn-using-slack-docker-and-gcp',
  ],
  ['https://blog.colinarms.com/posts/', 'https://armstr.ng/writing'],
  ['https://blog.colinarms.com/tags/automation/', 'https://armstr.ng/writing'],
  ['https://blog.colinarms.com/about-me', 'https://armstr.ng/'],
  [
    'https://blog.colinarms.com/@blog.colinarms.com/about-me',
    'https://armstr.ng/',
  ],

  // cma.xyz and colinarms.com: old personal sites
  ['https://cma.xyz/', 'https://armstr.ng/'],
  ['https://cma.xyz/about', 'https://armstr.ng/'],
  ['https://cma.xyz/projects', 'https://armstr.ng/projects'],
  ['https://cma.xyz/photography', 'https://armstr.ng/photography'],
  ['https://cma.xyz/press', 'https://armstr.ng/projects#press'],
  ['https://cma.xyz/writing', 'https://armstr.ng/writing'],
  ['https://cma.xyz/whatever/else', 'https://armstr.ng/'],
  ['https://cma.xyz/constructor', 'https://armstr.ng/'],
  ['https://colinarms.com/', 'https://armstr.ng/'],
  ['https://colinarms.com/projects', 'https://armstr.ng/projects'],
  ['https://colinarms.com/press', 'https://armstr.ng/projects#press'],
  ['https://www.colinarms.com/portfolio/bitindy.html', 'https://armstr.ng/'],
  ['https://colinarms.com/sitemap.xml', 'https://armstr.ng/sitemap-index.xml'],
]

for (const [from, to] of cases) {
  test(from, () => assert.equal(destination(new URL(from)), to))
}

test('answers with a permanent redirect', () => {
  const response = worker.fetch(new Request('https://cma.xyz/projects'))
  assert.equal(response.status, 301)
  assert.equal(response.headers.get('location'), 'https://armstr.ng/projects')
})
