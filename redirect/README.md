# Legacy URL inventory

Reconciled on September 27, 2026 against Search Console's complete 13-row
404 report, this repository's route history, and the previous Wayback/search
inventory in `index.test.mjs`.

## Personal-site paths

`public/_redirects` covers the following paths, both with and without trailing
slashes, at the root and under the former `@colins-blog` and
`@blog.colinarms.com` prefixes:

- Homepage and biography (`/about`, `/about-me`) → `/`.
- Projects, photography, contact, and writing → their current pages.
- `/press` → `/projects#press`.
- Blog archive (`/posts`, `/subscribe`) → `/writing`.
- The six published articles, whether addressed by slug alone, `/posts/<slug>`,
  or `/writing/<slug>` → their canonical `/writing/<slug>` URL.
- The Next.js article's literal/encoded colon and the Hugo slug
  `huginn-slack-gcp-automation` → the corresponding current article.
- Old RSS/Atom/Hugo feed paths → `/feed.xml`.
- The archived Photoshop article → `/writing`, preserving the existing policy.

These are explicit aliases of known content, not evidence that every possible
combination was indexed. Exact rules precede trailing-slash cleanup so known
aliases reach their final destination in one redirect. Unknown paths still 404.

Search Console's ten broken personal-site page URLs are the `@colins-blog/`
homepage, projects, photography, contact, and all six writing pages. The
Next.js example contains the old colon. All ten are covered.

## Old domains

The separate Worker (`index.js`) already redirects `colinarms.com`,
`www.colinarms.com`, `cma.xyz`, `writing.cma.xyz`, `blog.colinarms.com`, and
`www.armstr.ng`. `index.test.mjs` records the known old domain addresses and
their destinations, including retired blog listings. This change retains
that Worker's behavior.

## Not article redirects

- `/api/subscribe` is a POST endpoint, not a page. A GET should not redirect
  to an article or pretend a subscription succeeded.
- `meet.armstr.ng/apps` and `/teams` belong to the scheduling app, not this site.
- Deleted starter-template articles, `/uses`, and `/thank-you` are not Colin's
  writing and have no equivalent published content to redirect to.

Run `npm test` for the historical-domain and personal-path regression checks.
Also verify actual Cloudflare responses after deploying; unit tests alone do
not exercise the static-asset redirect layer.
