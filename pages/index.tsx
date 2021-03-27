import { GetStaticProps } from 'next'
import toGeoJson from '@mapbox/togeojson'
import fs from 'fs'
import { DOMParser } from 'xmldom'
import path from 'path'
import length from '@turf/length'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { motion } from 'framer-motion'

// Components
import Route, { Stat } from 'components/route'
import MapBox from 'components/mapbox'
import Button from 'components/button'

// Utils
import { routeFilePaths, ROUTES_PATH } from 'utils/gpxutils'

// Data
import { meta } from 'data/meta'

import { event } from 'lib/gtag'

// Types
import type { Routes } from 'types'

type RoutesProps = {
  routes: Routes
}

const Home = ({ routes }: RoutesProps) => {
  const router = useRouter()
  const queryRoute = router.query.route
  const currentRoute = routes.find(route => route.slug === queryRoute)
  return (
    <main className="bg-[#E6E4E0] h-screen w-screen overflow-hidden">
      <aside className="w-full sm:w-[430px] bg-white min-h-screen overflow-y-auto overflow-x-hidden sm:absolute top-0 bottom-0 p-5">
        <motion.div animate={queryRoute ? { x: '-30%', scale: 0.95 } : { x: 0, scale: 1 }} transition={{ ease: 'easeOut', duration: 0.3 }}>
          <nav className="flex justify-end">
            <Button onClick={() => window.open('mailto:samuelkraft@me.com?subject=🏃‍♀️ I want to add a route to Trail Runner!')}>
              Add Route
            </Button>
          </nav>
          <header className="text-center py-16">
            <img src="/logo.svg" alt="Trail Router logotype" className="mx-auto mb-3" />
            <p className="text-forest-darkest">
              Sweden has tons of trails for hiking &amp; running, but how do you decide where to go? Trail Routes is a curation of the best
              ones!
            </p>
          </header>
          <section>
            <h1 className="font-bold text-2xl py-3 sticky -mx-5 px-5 -top-5 bg-blur text-forest-darkest">All routes</h1>
            <ol>
              {routes
                .filter(route => {
                  if (queryRoute) {
                    return route.slug === queryRoute
                  }
                  return route
                })
                .map(Route)}
            </ol>
          </section>
        </motion.div>
        <motion.div
          className="w-full absolute top-0 min-h-screen bg-white -ml-5 -mr-5 px-5"
          initial={{ x: 430 }}
          animate={queryRoute ? { x: 0 } : { x: 430 }}
          transition={{ ease: 'easeOut', duration: 0.2 }}
        >
          {queryRoute && (
            <>
              <nav className="sticky py-3 border-b border-gray-200 flex justify-between px-5 items-center bg-blur sticky -top-5 -mx-5">
                <Link href="/">
                  <a>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      className="w-[20px] mr-1 -mt-0.5 inline-block"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                    <span className="font-semibold inline-block">Routes</span>
                  </a>
                </Link>
                <Button
                  href={`/gpx/${queryRoute}.gpx`}
                  onClick={() => event({ category: 'gpx', action: 'download', label: queryRoute as string })}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="w-[16px] inline-block mr-1 -mt-px"
                  >
                    <path
                      fillRule="evenodd"
                      d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Download gpx
                </Button>
              </nav>
              <header className="text-center py-14">
                <h1 className="font-bold text-3xl py-3 -mx-5 px-5 -top-5 mb-0 text-forest-darkest text-center">
                  {currentRoute.geoJson.features[0].properties.name}
                </h1>
                {currentRoute.location && (
                  <div className="flex text-gray-400 items-center justify-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      className="w-[14px] mr-1.5 -mt-1"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                      />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <span className="uppercase text-xs font-semibold tracking-wide">{currentRoute.location}</span>
                  </div>
                )}
              </header>
              <ul className="grid grid-rows-2 grid-cols-2 gap-2 mb-6">
                <li className="border p-2 border-gray-200 rounded flex justify-center">
                  <Stat type="Distance" value={`${Math.round(currentRoute.distance * 10) / 10} km`} centered />
                </li>
                <li className="border p-2 border-gray-200 rounded flex justify-center">
                  <Stat type="Elevation" value={`${Math.round(currentRoute.elevation)} m`} centered />
                </li>
                <li className="border p-2 border-gray-200 rounded flex justify-center">
                  <Stat type="Stifa" value={Math.round(currentRoute.elevation / currentRoute.distance)} centered />
                </li>
                {currentRoute.rating && (
                  <li className="border p-2 border-gray-200 rounded flex justify-center">
                    <Stat
                      type="Rating"
                      value={
                        <>
                          {currentRoute.rating}
                          <span className="text-gray-400 text-xs">/5</span>
                        </>
                      }
                      centered
                    />
                  </li>
                )}
              </ul>

              {currentRoute.description && <p className="mb-3">{currentRoute.description}</p>}

              <p>
                See route on{' '}
                <a
                  className="text-forest"
                  href={currentRoute.geoJson.features[0].properties.links[0].href}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Strava
                </a>
                .
              </p>
            </>
          )}
        </motion.div>
      </aside>
      <div className="hidden sm:block text-xl text-forest ml-[430px] h-screen relative">
        <MapBox routes={routes} />
      </div>
    </main>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const routes = routeFilePaths.map(filePath => {
    const source = new DOMParser().parseFromString(fs.readFileSync(path.join(ROUTES_PATH, filePath), 'utf8'))
    const geoJson = toGeoJson.gpx(source)
    const slug = filePath.replace('.gpx', '')

    // Calculate distance using geoJson
    const distance = length(geoJson)

    // Calculate elevation gain using gpx data
    const { coordinates } = geoJson.features[0].geometry
    let elevation = 0
    coordinates.forEach((coord, index) => {
      if (index === coordinates.length - 1) return // stop 1 point early since comparison requires 2 points
      const elevationDifference = coordinates[index + 1][2] - coordinates[index][2]
      if (elevationDifference > 0) elevation += elevationDifference
    })

    const metadata = meta[slug]

    return {
      distance,
      elevation,
      geoJson,
      slug,
      description: metadata?.description || null,
      rating: metadata?.rating || null,
      location: metadata?.location || null,
    }
  })

  return {
    props: {
      routes,
    },
  }
}

export default Home
