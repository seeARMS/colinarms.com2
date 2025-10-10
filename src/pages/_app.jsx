import { GoogleAnalytics } from "nextjs-google-analytics";

import '@/styles/tailwind.css'
import 'focus-visible'

export default function App({ Component, pageProps }) {
  return (
    <>
      <GoogleAnalytics trackPageViews gaMeasurementId="G-VLG18DVXN5" />
      <div className="min-h-screen bg-white dark:bg-zinc-900">
        <Component {...pageProps} />
      </div>
    </>
  )
}
