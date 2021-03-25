import { GetStaticProps } from 'next'
import toGeoJson from '@mapbox/togeojson'
import fs from 'fs'
import { DOMParser } from 'xmldom'
import path from 'path'
import length from '@turf/length'

import Route from 'components/route'
import MapBox from 'components/mapbox'
import Button from 'components/button'

// Utils
import { routeFilePaths, ROUTES_PATH } from 'utils/mdxutils'

// Types
import { Routes } from 'types'

type RoutesProps = {
  routes: Routes
}

const Home = ({ routes }: RoutesProps) => (
  <main className="bg-[#E6E4E0] h-screen w-screen overflow-hidden">
    <aside className="w-[430px] max-w-1/2 bg-white min-h-screen overflow-y-auto absolute top-0 bottom-0 p-5">
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
    </aside>
    <div className="text-xl text-forest ml-[430px] h-screen relative">
      <MapBox routes={routes} />
    </div>
  </main>
)

export const getStaticProps: GetStaticProps = async () => {
  const routes = routeFilePaths.map(filePath => {
    const source = new DOMParser().parseFromString(fs.readFileSync(path.join(ROUTES_PATH, filePath), 'utf8'))
    const geoJson = toGeoJson.gpx(source)

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

    return { distance, elevation, geoJson }
  })

  return {
    props: {
      routes,
    },
  }
}

export default Home
