// When a post's text last changed, by its slug on this site (an ISO date like
// '2026-10-02'), for posts edited after they went out. It's the post's
// modified date for search engines, in its structured data and the sitemap;
// a post that isn't here was last changed when it was published.
//
// Paragraph's own `updatedAt` can't stand in for this: it also moves when a
// post's settings change. Every post's moved on September 27, 2026, when their
// canonical URLs were set, which would have called a 2021 post fresh.
export const edited: Record<string, string> = {}
