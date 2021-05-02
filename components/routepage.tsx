import { motion } from 'framer-motion'
import Link from 'next/link'
import { NextSeo } from 'next-seo'

// Components
import Button from 'components/button'
import { Stat } from 'components/route'
import Chart from 'components/chart'

// Types
import type { Route } from 'types'

// Utils
import { event } from 'lib/gtag'

const RoutePage = ({ route }: { route: Route }): JSX.Element | null => {
  if (!route) {
    return null
  }
  const { name } = route.geoJson.features[0].properties

  return (
    <motion.div
      className="w-full absolute top-0 min-h-screen bg-white -ml-5 -mr-5 px-5"
      initial={{ x: 430 }}
      animate={{ x: 0 }}
      transition={{ ease: 'easeOut', duration: 0.2 }}
    >
      <NextSeo
        title={`${name} | Trail running & hiking route`}
        description={route.description}
        openGraph={{
          url: `https://routes.samuekraft.com/?route=${route.slug}`,
          title: name,
          description: route.description,
          images: [
            {
              url: `https://routes.samuelkraft.com/og/${route.slug}.jpg`,
              width: 1012,
              height: 516,
            },
          ],
        }}
      />
      {route && (
        <>
          <nav className="py-3 border-b border-gray-200 flex justify-between px-5 items-center bg-blur sticky -top-5 -mx-5 z-10">
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
              href={`/gpx/${route.slug}.gpx`}
              onClick={() => event({ category: 'gpx', action: 'download', label: route.slug as string })}
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-[16px] inline-block mr-1 -mt-px">
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
            <h1 className="font-bold text-3xl py-3 -mx-5 px-5 -top-5 mb-0 text-forest-darkest text-center">{name}</h1>
            {route.location && (
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
                <span className="uppercase text-xs font-semibold tracking-wide">{route.location}</span>
              </div>
            )}
          </header>
          <div className="border p-2 border-gray-200 rounded mb-2">
            <Chart coordinates={route.geoJson.features[0].geometry.coordinates} />
          </div>
          <ul className="grid grid-rows-2 grid-cols-2 gap-2 mb-6">
            <li className="border p-2 border-gray-200 rounded flex justify-center">
              <Stat type="Distance" value={`${Math.round(route.distance * 10) / 10} km`} centered />
            </li>
            <li className="border p-2 border-gray-200 rounded flex justify-center">
              <Stat type="Elevation" value={`${Math.round(route.elevation)} m`} centered />
            </li>
            <li className="border p-2 border-gray-200 rounded flex justify-center">
              <Stat type="Stifa" value={Math.round(route.elevation / route.distance)} centered />
            </li>
            {route.rating && (
              <li className="border p-2 border-gray-200 rounded flex justify-center">
                <Stat
                  type="Rating"
                  value={
                    <>
                      {route.rating}
                      <span className="text-gray-400 text-xs">/5</span>
                    </>
                  }
                  centered
                />
              </li>
            )}
          </ul>

          {route.description && <p className="mb-3 leading-relaxed">{route.description}</p>}

          <p>
            See route on{' '}
            <a className="text-forest" href={route.geoJson.features[0].properties.links[0].href} target="_blank" rel="noopener noreferrer">
              Strava
            </a>
            .
          </p>
        </>
      )}
    </motion.div>
  )
}

export default RoutePage
