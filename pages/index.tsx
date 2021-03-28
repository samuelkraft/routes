import { GetStaticProps } from 'next'
import toGeoJson from '@mapbox/togeojson'
import fs from 'fs'
import { DOMParser } from 'xmldom'
import path from 'path'
import length from '@turf/length'
import { useRouter } from 'next/router'
import { motion } from 'framer-motion'

// Components
import Route from 'components/route'
import MapBox from 'components/mapbox'
import Button from 'components/button'
import RoutePage from 'components/routepage'

// Utils
import { routeFilePaths, ROUTES_PATH } from 'utils/gpxutils'

// Data
import { meta } from 'data/meta'

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
            <ol>{routes.map(Route)}</ol>
          </section>
          <footer className="text-center text-gray-500">
            A project by{' '}
            <a href="https://twitter.com/samuelkraft" target="_blank" rel="noopener noreferrer" className="text-forest">
              @samuelkraft
            </a>
          </footer>
        </motion.div>
        <RoutePage route={currentRoute} />
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
      color: metadata?.color || 'red',
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
