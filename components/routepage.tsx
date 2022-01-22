import { ReactNode } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { NextSeo } from 'next-seo'
import colors from 'tailwindcss/colors' // eslint-disable-line

// Components
import Button from 'components/button'
import { Stat } from 'components/route'
import Chart from 'components/chart'

// Types
import type { Route } from 'types'

// Utils
import { event } from 'lib/gtag'

const RoutePage = ({ route, children }: { route: Route; children: ReactNode }): JSX.Element | null => {
  if (!route) {
    return null
  }
  const { name } = route.geoJson.features[0].properties
  const seoTitle = `${name} | ${route.swimrun ? 'Swimrun route' : 'Trail running & hiking route'}`
  const link = route.geoJson.features[0].properties?.links?.[0]?.href
  const statBoxClassName = 'justify-center p-2 border border-gray-200 rounded'

  return (
    <motion.div
      className="absolute top-0 w-full min-h-screen px-5 -ml-5 -mr-5 bg-white"
      initial={{ x: 430 }}
      animate={{ x: 0 }}
      transition={{ ease: 'easeOut', duration: 0.2 }}
    >
      <NextSeo
        title={seoTitle}
        description={route.description}
        openGraph={{
          url: `https://routes.samuekraft.com/?route=${route.slug}`,
          title: seoTitle,
          description: route.description,
          images: [
            {
              url: `https://routes.samuelkraft.com/og/${route.slug}.png`,
              width: 1012,
              height: 516,
            },
          ],
        }}
      />
      {route && (
        <>
          <nav className="sticky z-10 flex items-center justify-between px-5 py-3 -mx-5 border-b border-gray-200 bg-blur -top-5">
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
                <span className="inline-block font-semibold">Routes</span>
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
            <h1 className="px-5 py-3 mb-0 -mx-5 text-3xl font-bold text-center -top-5 text-forest-darkest">{name}</h1>
            {(route.location || route.swimrun) && (
              <div className="flex items-center justify-center">
                {route.location && (
                  <div className="flex items-center justify-center text-gray-400">
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
                    <span className="text-xs font-semibold tracking-wide uppercase">{route.location}</span>
                  </div>
                )}
                {route.location && route.swimrun && <span className="block mx-3 text-gray-400" />}
                {route.swimrun && (
                  <div className="flex items-center justify-center text-gray-400">
                    <svg
                      className="inline-block w-[14px] h-auto mr-1.5 -mt-0.5"
                      width="94"
                      height="57"
                      viewBox="0 0 94 57"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M10.2189 20.7904C18.9549 13.2884 25.8559 7.35737 44.5779 17.9364C53.5719 23.0174 60.8269 24.9354 66.8669 24.9344C77.4419 24.9344 84.2929 19.0514 90.2189 13.9594C92.3319 12.1454 92.6039 8.92437 90.8259 6.76537C89.0479 4.60637 85.8939 4.32737 83.7809 6.14437C75.0459 13.6494 68.1459 19.5784 49.4179 8.99737C24.6789 -4.97763 13.0919 4.97737 3.78088 12.9744C1.66888 14.7894 1.39588 18.0104 3.17388 20.1694C4.95088 22.3274 8.10487 22.6064 10.2189 20.7904ZM83.7809 36.6784C75.0459 44.1814 68.1459 50.1114 49.4179 39.5314C24.6789 25.5554 13.0919 35.5104 3.78088 43.5084C1.66888 45.3244 1.39588 48.5454 3.17388 50.7014C4.95088 52.8604 8.10588 53.1394 10.2189 51.3234C18.9549 43.8204 25.8559 37.8904 44.5779 48.4684C53.5719 53.5494 60.8269 55.4684 66.8669 55.4684C77.4419 55.4684 84.2929 49.5844 90.2189 44.4934C92.3319 42.6774 92.6039 39.4564 90.8259 37.2994C89.0489 35.1384 85.8949 34.8614 83.7809 36.6784Z"
                        fill={colors.blue[500]}
                        stroke={colors.blue[500]}
                        strokeWidth="5"
                      />
                    </svg>
                    <span className="text-xs font-semibold tracking-wide text-blue-500 uppercase">Swimrun</span>
                  </div>
                )}
              </div>
            )}
          </header>
          {children}
          <div className="p-2 mb-2 border border-gray-200 rounded">
            <Chart coordinates={route.gpxGeoJson.features[0].geometry.coordinates} />
          </div>
          <ul className="grid grid-cols-2 grid-rows-2 gap-2 mb-6">
            <Stat type="Distance" value={`${Math.round(route.distance * 10) / 10} km`} centered className={statBoxClassName} />
            <Stat type="Elevation" value={`${Math.round(route.elevation)} m`} centered className={statBoxClassName} />
            <Stat type="Stifa" value={Math.round(route.elevation / route.distance)} centered className={statBoxClassName} />
            {route.rating && (
              <Stat
                type="Rating"
                value={
                  <>
                    {route.rating}
                    <span className="text-xs text-gray-400">/5</span>
                  </>
                }
                centered
                className={statBoxClassName}
              />
            )}
          </ul>

          {route.description && <p className="mb-3 leading-relaxed whitespace-pre-wrap">{route.description}</p>}

          {link && (
            <p className="mb-5">
              See route on{' '}
              <a
                className="text-forest"
                href={route.geoJson.features[0].properties.links[0].href}
                target="_blank"
                rel="noopener noreferrer"
              >
                Strava
              </a>
              .
            </p>
          )}
        </>
      )}
    </motion.div>
  )
}

export default RoutePage
