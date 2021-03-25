import type { Route as RouteProps } from 'types'

const Stat = ({ type, value }: { type: string; value: string | number }) => (
  <li className="mr-5">
    <span className="block text-xs uppercase text-gray-400">{type}</span>
    <strong className="font-normal text-xl">{value}</strong>
  </li>
)

const Route = ({ name, distance, elevation }: RouteProps): JSX.Element => (
  <article className="border border-gray-200 rounded mb-5 p-4 flex justify-between items-center">
    <div>
      <p className="font-semibold text-xl mb-1.5">{name}</p>
      <ol className="flex">
        <Stat type="Distance" value={`${distance} km`} />
        <Stat type="Elevation" value={`${elevation} m`} />
        <Stat type="Stifa" value={Math.round(elevation / distance)} />
      </ol>
    </div>
    <div>
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="text-gray-400">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
      </svg>
    </div>
  </article>
)

export default Route
