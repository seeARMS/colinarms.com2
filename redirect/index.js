// www.armstr.ng → https://armstr.ng, keeping the path and query string.
export default {
  fetch(request) {
    const url = new URL(request.url)
    url.protocol = 'https:'
    url.hostname = 'armstr.ng'
    return Response.redirect(url.href, 301)
  },
}
