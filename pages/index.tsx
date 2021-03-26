import { GetStaticProps } from 'next'
import toGeoJson from '@mapbox/togeojson'
import fs from 'fs'
import { DOMParser } from 'xmldom'
import path from 'path'
import length from '@turf/length'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { motion } from 'framer-motion'

import Route, { Stat } from 'components/route'
import MapBox from 'components/mapbox'
import Button from 'components/button'
// Utils
import { routeFilePaths, ROUTES_PATH } from 'utils/gpxutils'

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
                  <a className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-[20px] mr-1">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                    <span className="-mb-px font-semibold">Back</span>
                  </a>
                </Link>
                <Button
                  href={`/gpx/${queryRoute}.gpx`}
                  onClick={() => event({ category: 'gpx', action: 'download', label: queryRoute as string })}
                >
                  Download gpx
                </Button>
              </nav>
              <header className="text-center py-14">
                <h1 className="font-bold text-3xl py-3 -mx-5 px-5 -top-5 mb-0 text-forest-darkest text-center">
                  {currentRoute.geoJson.features[0].properties.name}
                </h1>
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
                  <span className="uppercase text-xs font-semibold tracking-wide">Stockholm</span>
                </div>
              </header>
              <ul className="grid grid-rows-2 grid-cols-2 gap-2 mb-4">
                <li className="border p-2 border-gray-200 rounded flex justify-center">
                  <Stat type="Distance" value={`${Math.round(currentRoute.distance * 10) / 10} km`} centered />
                </li>
                <li className="border p-2 border-gray-200 rounded flex justify-center">
                  <Stat type="Elevation" value={`${Math.round(currentRoute.elevation)} m`} centered />
                </li>
                <li className="border p-2 border-gray-200 rounded flex justify-center">
                  <Stat type="Stifa" value={Math.round(currentRoute.elevation / currentRoute.distance)} centered />
                </li>
              </ul>
              <p>
                Read more on{' '}
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

    return { distance, elevation, geoJson, slug }
  })

  return {
    props: {
      routes,
    },
  }
}

export default Home
