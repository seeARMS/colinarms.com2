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
| Design tokens and shared styles | `src/styles/global.css` |
| Social preview images | `scripts/generate-og.mjs`, run before each build |

New Paragraph posts appear after the next build.

## Develop

```sh
npm install
npm run dev       # http://localhost:4321
npm run build     # social preview images, then the site
npm run deploy    # build and deploy with Wrangler
```

## Configuration

`PARAGRAPH_API_KEY` lets `/api/subscribe` add subscribers. Set it as a Worker secret (`npx wrangler secret put PARAGRAPH_API_KEY`) and, for local development, in `.dev.vars`. Subscribe requests are limited to five per visitor per minute by the `SUBSCRIBE_LIMIT` rate limiter in `wrangler.jsonc`.
