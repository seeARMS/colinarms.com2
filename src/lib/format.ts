// Dates are written the same way everywhere, in the site's own time zone, so
// a post published late in the evening doesn't slip to the next day.
const TZ = 'America/Los_Angeles'

const long = new Intl.DateTimeFormat('en-US', { month: 'long', day: 'numeric', year: 'numeric', timeZone: TZ })
const medium = new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric', year: 'numeric', timeZone: TZ })
const short = new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric', timeZone: TZ })
const yearOnly = new Intl.DateTimeFormat('en-US', { year: 'numeric', timeZone: TZ })

/** October 15, 2024 */
export const longDate = (iso: string) => long.format(new Date(iso))
/** Oct 15, 2024 */
export const mediumDate = (iso: string) => medium.format(new Date(iso))
/** Oct 15 */
export const shortDate = (iso: string) => short.format(new Date(iso))
/** 2024 */
export const year = (iso: string) => yearOnly.format(new Date(iso))

/** Minutes to read, at an unhurried 230 words a minute. */
export function readingTime(html: string): number {
  const words = html.replace(/<[^>]+>/g, ' ').split(/\s+/).filter(Boolean).length
  return Math.max(1, Math.round(words / 230))
}
