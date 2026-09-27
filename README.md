# armstr.ng

Colin Armstrong's personal site: [armstr.ng](https://armstr.ng).

Astro on Cloudflare Workers, in the same design language as [heade.rs](https://heade.rs): Geist and Geist Mono, a gray canvas with white hairline cards, and one blue accent for things that move. Pages are prerendered; `/api/subscribe` is the only thing that runs on request.

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

New Paragraph posts appear after the next build.

## Develop

```sh
npm install
npm run dev       # http://localhost:4321
npm run build     # social preview images, then the site
```

## Deploy

Everything deploys to the **Colin Personal** Cloudflare account. Its Wrangler login lives in a separate profile (`~/.config/wrangler-personal`), so the work login in the default profile is never used, and `account_id` in `wrangler.jsonc` pins the account as a second guard.

```sh
npm run cf -- login   # once: authorize the personal account
npm run deploy        # build and deploy the site
npm run deploy:www    # the Worker that redirects www.armstr.ng to armstr.ng
npm run cf -- tail    # any other wrangler command, same profile
```

## Search

Every page's structured data is one connected graph built in `src/lib/schema.ts`: the home page is a `ProfilePage` about Colin (with his profiles and press as `sameAs` and `subjectOf`), Paragraph is an `Organization` with Colin as founder (using paragraph.com's own `@id`), posts are `BlogPosting`s with breadcrumbs, and photos are credited to Colin. Post descriptions come from each post's subtitle and opening sentences (`postDescription` in `src/lib/format.ts`).

## Configuration

`PARAGRAPH_API_KEY` lets `/api/subscribe` add subscribers. Set it as a Worker secret (`npx wrangler secret put PARAGRAPH_API_KEY`) and, for local development, in `.dev.vars`. Subscribe requests are limited to five per visitor per minute by the `SUBSCRIBE_LIMIT` rate limiter in `wrangler.jsonc`.
