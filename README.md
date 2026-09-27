# armstr.ng

Colin Armstrong's personal site: [armstr.ng](https://armstr.ng).

Astro on Cloudflare Workers. The design is set in [Newsreader](https://fonts.google.com/specimen/Newsreader), with its optical sizes, in one narrow column on near-white paper (a dark gray at night), with ultramarine for links and anything that moves. Newsreader is self-hosted through Astro's font config; Geist Mono is only for code in posts. Pages are prerendered; `/api/subscribe` is the only thing that runs on request.

## Where things live

| What | Where |
| --- | --- |
| Bio facts, projects, work history, podcasts & press, social links | `src/data/profile.ts` |
| Photo captions | `src/data/photos.ts` |
| Photos (camera settings come from their EXIF at build time) | `src/assets/photos/` |
| Posts | Pulled from the Paragraph API when the site builds (`src/lib/getAllArticles.js`) |
| Images in posts (resized to WebP, real dimensions, blurred preview) | `src/lib/post-images.ts`, with sizes and previews from `scripts/post-images.mjs` |
| Design tokens and shared styles | `src/styles/global.css` |
| Social preview images | `scripts/generate-og.mjs`, run before each build |
| Redirects from old addresses (www.armstr.ng, writing.cma.xyz, blog.colinarms.com, cma.xyz, colinarms.com) | `redirect/index.js`, a separate Worker; old paths on armstr.ng itself are in `public/_redirects` |
| Markdown versions of pages, and `/llms.txt`, for agents | `src/pages/*.md.ts` and `src/pages/llms.txt.ts`, served by `src/worker.ts` |
| When a post was last edited (its modified date) | `src/data/posts.ts` |

New Paragraph posts appear after the next build.

## Develop

```sh
npm install
npm run dev       # http://localhost:4321
npm run build     # social preview images, then the site
```

## Deploy

Pushing to `main` deploys the site. Cloudflare's Workers Builds is connected to this repo: it builds each push and reports back as a "Workers Builds: armstrng" check on the commit.

Everything deploys to the **Colin Personal** Cloudflare account. Its Wrangler login lives in a separate profile (`~/.config/wrangler-personal`), so the work login in the default profile is never used, and `account_id` in `wrangler.jsonc` pins the account as a second guard.

```sh
npm run cf -- login   # once: authorize the personal account
npm run deploy:www    # the Worker that redirects old addresses to armstr.ng
npm run cf -- tail    # any other wrangler command, same profile
npm test              # where each old address should land
```

Each old hostname is a Custom Domain of the redirect Worker. Cloudflare won't attach one while the hostname still has a DNS record of its own, so delete that record first. Keep zone redirect rules off these hostnames too: they run before Workers.

## Search

Every page's structured data is one connected graph built in `src/lib/schema.ts`: the home page is a `ProfilePage` about Colin (with his profiles and press as `sameAs` and `subjectOf`), Paragraph is an `Organization` with Colin as founder (using paragraph.com's own `@id`), posts are `BlogPosting`s with breadcrumbs, and photos are credited to Colin. Post descriptions come from each post's subtitle and opening sentences (`postDescription` in `src/lib/format.ts`).

A post's modified date, in its structured data and the sitemap's `lastmod`, is its publishing date unless `src/data/posts.ts` says its text changed later. Paragraph's own `updatedAt` also moves when a post's settings change, so it isn't used. Other pages have no `lastmod`.

## Agents

Every page has a Markdown version built beside it (`/writing` → `/writing.md`, and `/index.md` for the home page), with the page's content and none of its markup. `src/worker.ts` serves it at that address, and at the page's own address when a request's `Accept` header prefers `text/markdown`, as Claude Code and other coding agents do. Browsers never ask for it. Only the pages and their `.md` files go through the Worker (`assets.run_worker_first` in `wrangler.jsonc`); add a new page there too. `/llms.txt` is a plain summary of who Colin is, with links to each page's Markdown. The home page's Markdown repeats its bio, and each page's repeats its copy, so change both together.

`~/src/personal/AGENTS.md` has the research behind this, and the conventions heade.rs, Draftside and Council share.

## Configuration

`PARAGRAPH_API_KEY` lets `/api/subscribe` add subscribers. Set it as a Worker secret (`npx wrangler secret put PARAGRAPH_API_KEY`) and, for local development, in `.dev.vars`. Subscribe requests are limited to five per visitor per minute by the `SUBSCRIBE_LIMIT` rate limiter in `wrangler.jsonc`.
