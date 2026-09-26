// A page's public path. Pages build to files, so at build time Astro reports
// /writing.html (and /index.html for the home page); visitors see /writing.
export function pagePath(url: URL): string {
  const path = url.pathname.replace(/\.html$/, '').replace(/\/index$/, '/')
  return path.length > 1 ? path.replace(/\/$/, '') : '/'
}
