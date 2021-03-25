import type { Route as RouteProps } from 'types'

const Stat = ({ type, value }: { type: string; value: string | number }) => (
  <li className="mr-5">
    <span className="block text-xs uppercase text-gray-400">{type}</span>
    <strong className="font-normal text-xl text-forest-darkest">{value}</strong>
  </li>
)

const Route = ({ geoJson, distance, elevation }: RouteProps): JSX.Element => {
  const { name, links } = geoJson.features[0].properties
  return (
    <a href={links[0].href} target="_blank" rel="noreferrer noopener" key={name}>
      <article className="border border-gray-200 rounded mb-5 p-4 relative hover:border-gray-300 transition">
        <p className="font-semibold text-xl mb-1.5 text-forest-darkest">{name}</p>
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
  )
}

export default Route
