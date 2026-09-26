// Paragraph slugs can carry characters that don't belong in a URL path (one
// post's has a colon, which dev and production encode differently). The site
// uses a cleaned-up slug instead: lowercase letters, digits and single hyphens.
// Old links to the original address are redirected in public/_redirects.
export function siteSlug(slug) {
  return slug
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}
