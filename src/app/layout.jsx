import '@/styles/tailwind.css'

import { GoogleAnalytics } from '@next/third-parties/google'

import { Providers } from './providers'

const modeScript = `
  let darkModeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)')

  updateMode()
  darkModeMediaQuery.addEventListener('change', updateModeWithoutTransitions)

  function updateMode() {
    let isSystemDarkMode = darkModeMediaQuery.matches

    if (isSystemDarkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }

  function disableTransitionsTemporarily() {
    document.documentElement.classList.add('[&_*]:!transition-none')
    window.setTimeout(() => {
      document.documentElement.classList.remove('[&_*]:!transition-none')
    }, 0)
  }

  function updateModeWithoutTransitions() {
    disableTransitionsTemporarily()
    updateMode()
  }
`

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://armstr.ng'

export const metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'Colin Armstrong',
    template: '%s | Colin Armstrong',
  },
  description:
    'Colin Armstrong - Software engineer & founder building Paragraph',
  alternates: {
    types: {
      'application/rss+xml': `${siteUrl}/rss/feed.xml`,
      'application/feed+json': `${siteUrl}/rss/feed.json`,
    },
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="h-full antialiased" suppressHydrationWarning>
      <head>
        <script id="mode-script" dangerouslySetInnerHTML={{ __html: modeScript }} />
      </head>
      <body className="h-full bg-zinc-50 dark:bg-black">
        <Providers>
          <div className="min-h-screen bg-white dark:bg-zinc-900">
            {children}
          </div>
        </Providers>
        <GoogleAnalytics gaId="G-VLG18DVXN5" />
      </body>
    </html>
  )
}
