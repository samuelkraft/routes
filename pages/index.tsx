import { useRef, useEffect } from 'react'
import { GetServerSideProps } from 'next'
import { motion } from 'framer-motion'

// Components
import Route from 'components/route'
import MapBox from 'components/mapbox'
import Button from 'components/button'
import RoutePage from 'components/routepage'
// Types
import type { Routes } from 'types'

// Data
const gpxUtils = require('../utils/gpxutils.js')

type RoutesProps = {
  routes: Routes
  queryRoute?: string
}

const Home = ({ routes, queryRoute }: RoutesProps) => {
  const aside = useRef<HTMLElement>()
  const currentRoute = routes.find(route => route.slug === queryRoute)

  useEffect(() => {
    const sidebar = aside.current
    if (sidebar) {
      sidebar.scrollTop = 0
    }
  }, [queryRoute])

  return (
    <main className="bg-[#E6E4E0] h-screen w-screen sm:overflow-hidden">
      <aside
        className="w-full sm:w-[430px] bg-white min-h-screen overflow-y-scroll overflow-x-hidden sm:absolute top-0 bottom-0 p-5"
        ref={aside}
      >
        <motion.div
          animate={
            queryRoute
              ? {
                  x: '-30%',
                  scale: 0.95,
                  transitionEnd: {
                    display: 'none',
                  },
                }
              : { x: 0, scale: 1, display: 'block' }
          }
          transition={{ ease: 'easeOut', duration: 0.2 }}
        >
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
            <h1 className="font-bold text-2xl py-3 sticky -mx-5 px-5 -top-5 bg-blur text-forest-darkest z-10">All routes</h1>
            <ol>
              {routes.map(route => (
                <Route key={route.slug} route={route} />
              ))}
            </ol>
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

export const getServerSideProps: GetServerSideProps = async context => {
  return {
    props: {
      routes: gpxUtils.routes.sort((a, b) => b.rating - a.rating),
      queryRoute: context.query.route || null,
    },
  }
}

export default Home
