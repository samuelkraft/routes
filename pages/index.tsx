import { useState } from 'react'
import { GetStaticProps } from 'next'
import Link from 'next/link'

// Components
import Route from 'components/route'
import Button from 'components/button'
import Select from 'components/select'

// Types
import type { Routes } from 'types'

// Data
const gpxUtils = require('../utils/gpxutils.js')

type RoutesProps = {
  routes: Routes
}

const Home = ({ routes }: RoutesProps) => {
  const [sorting, setSorting] = useState('added')
  const randomRoute = routes[Math.floor(Math.random() * routes.length)]

  const sortRoutes = (a, b) => {
    switch (sorting) {
      case 'alphabetically':
        return a.geoJson.features[0].properties.name.localeCompare(b.geoJson.features[0].properties.name, 'sv')
      case 'rating':
        return b.rating - a.rating
      case 'distance':
        return b.distance - a.distance
      case 'elevation':
        return b.elevation - a.elevation
      default:
        return new Date(b.added).valueOf() - new Date(a.added).valueOf()
    }
  }

  return (
    <div className="pt-3">
      <nav className="flex justify-end">
        <Button onClick={() => window.open('mailto:samuelkraft@me.com?subject=🏃‍♀️ I want to add a route to Trail Runner!')}>
          Add Route
        </Button>
      </nav>
      <header className="py-16 text-center">
        <img src="/logo.svg" alt="Trail Router logotype" className="mx-auto mb-3" />
        <p className="text-forest-darkest">A curated selection of trails for hiking &amp; running</p>
      </header>
      <section>
        <div className="sticky top-0 z-10 flex justify-between px-5 py-4 -mx-5 bg-blur">
          <h1 className="text-2xl font-bold text-forest-darkest">All routes</h1>
          <div className="flex">
            <Link href={`/${randomRoute.slug}`}>
              <a
                title="Randomize route"
                className="flex items-center px-2 mr-2 transition-all bg-white border border-gray-200 rounded hover:border-gray-300"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="w-[18px] h-auto"
                >
                  <polyline points="16 3 21 3 21 8" />
                  <line x1="4" y1="20" x2="21" y2="3" />
                  <polyline points="21 16 21 21 16 21" />
                  <line x1="15" y1="15" x2="21" y2="21" />
                  <line x1="4" y1="4" x2="9" y2="9" />
                </svg>
              </a>
            </Link>
            <Select value={sorting} onChange={e => setSorting(e.target.value)}>
              <option value="added">Recently added</option>
              <option value="rating">Rating</option>
              <option value="distance">Distance</option>
              <option value="elevation">Elevation gain</option>
              <option value="alphabetically">Alphabetically</option>
            </Select>
          </div>
        </div>
        <ol className="pt-1">
          {routes.sort(sortRoutes).map(route => (
            <Route key={route.slug} route={route} />
          ))}
        </ol>
      </section>
      <footer className="pb-6 text-center text-gray-500">
        A project by{' '}
        <a href="https://twitter.com/samuelkraft" target="_blank" rel="noopener noreferrer" className="text-forest">
          @samuelkraft
        </a>
      </footer>
    </div>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  return {
    props: {
      routes: gpxUtils.routes.sort((a, b) => new Date(b.added).valueOf() - new Date(a.added).valueOf()),
    },
  }
}

export default Home
