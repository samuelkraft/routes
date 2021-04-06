import { useEffect } from 'react'
import { useRouter } from 'next/router'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import * as gtag from 'lib/gtag'
import '../styles/globals.css'

function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  const router = useRouter()

  useEffect(() => {
    const handleRouteChange = (url: string) => {
      gtag.pageview(url)
    }
    router.events.on('routeChangeComplete', handleRouteChange)
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange)
    }
  }, [router.events])

  const title = 'Trail Routes: Curated running & hiking routes'
  const description = 'Explore curated trails in Sweden for hiking & running.'

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:creator" content="@samuelkraft" />

        <meta property="og:url" content="https://routes.samuelkraft.com" />
        <meta property="og:image" content="https://routes.samuelkraft.com/og.png" />
        <meta property="og:site_name" content="Trail Routes" />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Component {...pageProps} />
    </>
  )
}

export default MyApp
