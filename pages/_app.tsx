import { useEffect, useRef } from 'react'
import { useRouter } from 'next/router'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import SEO from 'components/seo'
import MapComponent from 'components/map'
import * as gtag from 'lib/gtag'
import '../styles/globals.css'

// Hooks
import { useIsSmall } from 'utils/hooks'

function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  const router = useRouter()
  const aside = useRef<HTMLElement>()

  const isSmall = useIsSmall()

  useEffect(() => {
    const handleRouteChange = (url: string) => {
      gtag.pageview(url)
    }
    router.events.on('routeChangeComplete', handleRouteChange)
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange)
    }
  }, [router.events])

  useEffect(() => {
    const sidebar = aside.current
    if (sidebar) {
      sidebar.scrollTop = 0
    }
  }, [router])

  return (
    <>
      <SEO />
      <Head>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <main className="flex bg-[#E6E4E0] h-screen w-screen sm:overflow-hidden">
        <aside
          ref={aside}
          className="w-full sm:w-[430px] bg-white min-h-screen overflow-y-scroll overflow-x-hidden sm:absolute top-0 bottom-0 px-5"
        >
          <Component {...pageProps} />
        </aside>
        {isSmall && (
          <div className="block text-xl text-forest ml-[430px] h-screen relative w-full">
            <MapComponent
              routes={pageProps.route ? [pageProps.route] : pageProps.routes}
              initialLat={pageProps.initialLat}
              initialLng={pageProps.initialLng}
            />
          </div>
        )}
      </main>
    </>
  )
}

export default MyApp
