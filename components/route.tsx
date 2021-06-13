import { ReactNode } from 'react'
import Link from 'next/link'
import cn from 'clsx'
import type { Route as RouteProps } from 'types'

export const Stat = ({ type, value, centered }: { type: string; value: string | number | ReactNode; centered?: boolean }) => (
  <li className={cn(centered ? 'text-center' : 'mr-5')}>
    <span className="block text-xs text-gray-400 uppercase">{type}</span>
    <strong className="text-xl font-normal text-forest-darkest">{value}</strong>
  </li>
)

const Route = ({ route: { geoJson, distance, elevation, slug, color, swimrun } }: { route: RouteProps }): JSX.Element => {
  const { name } = geoJson.features[0].properties
  return (
    <Link href={{ query: { route: slug } }} key={name}>
      <a className="relative block p-4 mb-5 transition border border-gray-200 rounded hover:border-gray-300">
        <p className="font-semibold text-xl mb-1.5 text-forest-darkest">
          {swimrun ? (
            <svg
              className="inline-block w-[14px] h-auto mr-3"
              width="94"
              height="57"
              viewBox="0 0 94 57"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M10.2189 20.7904C18.9549 13.2884 25.8559 7.35737 44.5779 17.9364C53.5719 23.0174 60.8269 24.9354 66.8669 24.9344C77.4419 24.9344 84.2929 19.0514 90.2189 13.9594C92.3319 12.1454 92.6039 8.92437 90.8259 6.76537C89.0479 4.60637 85.8939 4.32737 83.7809 6.14437C75.0459 13.6494 68.1459 19.5784 49.4179 8.99737C24.6789 -4.97763 13.0919 4.97737 3.78088 12.9744C1.66888 14.7894 1.39588 18.0104 3.17388 20.1694C4.95088 22.3274 8.10487 22.6064 10.2189 20.7904ZM83.7809 36.6784C75.0459 44.1814 68.1459 50.1114 49.4179 39.5314C24.6789 25.5554 13.0919 35.5104 3.78088 43.5084C1.66888 45.3244 1.39588 48.5454 3.17388 50.7014C4.95088 52.8604 8.10588 53.1394 10.2189 51.3234C18.9549 43.8204 25.8559 37.8904 44.5779 48.4684C53.5719 53.5494 60.8269 55.4684 66.8669 55.4684C77.4419 55.4684 84.2929 49.5844 90.2189 44.4934C92.3319 42.6774 92.6039 39.4564 90.8259 37.2994C89.0489 35.1384 85.8949 34.8614 83.7809 36.6784Z"
                fill={color}
                stroke={color}
                strokeWidth="5"
              />
            </svg>
          ) : (
            <span style={{ backgroundColor: color, content: '' }} className="inline-block w-[14px] h-[14px] rounded-full mr-3" />
          )}
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
      </a>
    </Link>
  )
}

export default Route
