import { ReactNode } from 'react'
import Link from 'next/link'
import cn from 'clsx'
import type { Route as RouteProps } from 'types'

export const Stat = ({ type, value, centered }: { type: string; value: string | number | ReactNode; centered?: boolean }) => (
  <li className={cn(centered ? 'text-center' : 'mr-5')}>
    <span className="block text-xs uppercase text-gray-400">{type}</span>
    <strong className="font-normal text-xl text-forest-darkest">{value}</strong>
  </li>
)

const Route = ({ route: { geoJson, distance, elevation, slug, color } }: { route: RouteProps }): JSX.Element => {
  const { name } = geoJson.features[0].properties
  return (
    <Link href={{ query: { route: slug } }} key={name}>
      <a>
        <article className="border border-gray-200 rounded mb-5 p-4 relative hover:border-gray-300 transition">
          <p className="font-semibold text-xl mb-1.5 text-forest-darkest">
            <span style={{ backgroundColor: color, content: '' }} className="inline-block w-[14px] h-[14px] rounded-full mr-3" />
            {name}
          </p>
          <ol className="flex">
            <Stat type="Distance" value={`${Math.round(distance * 10) / 10} km`} />
            <Stat type="Elevation" value={`${Math.round(elevation)} m`} />
            <Stat type="Stifa" value={Math.round(elevation / distance)} />
          </ol>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="text-gray-400 absolute right-4 top-1/2 transform -translate-y-1/2 w-[20px]"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </article>
      </a>
    </Link>
  )
}

export default Route
