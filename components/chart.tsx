import * as d3 from 'd3'
import useMeasure from 'react-use-measure'
import { lineString } from '@turf/helpers'
import length from '@turf/length'
import { useEffect } from 'react'

type ChartInnerProps = {
  data: Array<{ distance: number; elevation: number }>
  width: number
  height: number
}

const ChartInner = ({ data, width, height }: ChartInnerProps): JSX.Element => {
  const margin = {
    top: 20,
    right: 0,
    bottom: 15,
    left: 25,
  }

  const xScale = d3
    .scaleLinear()
    .domain(d3.extent(data.map(d => d.distance)))
    .range([margin.left, width - margin.right])

  const yScale = d3
    .scaleLinear()
    .domain(d3.extent(data.map(d => d.elevation)))
    .range([height - margin.bottom - 5, margin.top])

  const line = d3
    .line()
    .x(d => xScale(d.distance))
    .y(d => yScale(d.elevation))

  const dLine = line(data)

  const area = d3
    .area()
    .x(d => xScale(d.distance))
    .y0(height - margin.bottom)
    .y1(d => yScale(d.elevation))

  const dArea = area(data)

  const yTicks = yScale.ticks(5)
  const xTicks = xScale.ticks(6)

  const getXText = (distance: number, i: number) => {
    if (i === 0) {
      return 'km'
    }
    if (xTicks.length > 7 && i === xTicks.length - 1) {
      return ''
    }
    return Number.isInteger(distance) ? `${distance}.0` : distance
  }

  return (
    <svg viewBox={`0 0  ${width} ${height}`}>
      {/* Y ticks */}
      {yTicks.map((elevation, i) => (
        <g transform={`translate(0, ${yScale(elevation)})`} key={elevation}>
          <line x1={margin.left} x2={width - margin.right} stroke="currentColor" className="text-gray-300" strokeDasharray="2, 4" />
          <text x={margin.left - 5} textAnchor="end" alignmentBaseline="middle" fill="currentColor" className="text-xs text-gray-500">
            {i === 0 ? 'm' : elevation}
          </text>
        </g>
      ))}

      {/* X ticks */}
      {xTicks.map((distance, i) => (
        <g transform={`translate(${xScale(distance)}, 0)`} key={distance}>
          <line y1={height - margin.bottom} y2={height} stroke="currentColor" className="text-gray-200" />
          <text x={4} y={height} fill="currentColor" className="text-xs text-gray-500">
            {getXText(distance, i)}
          </text>
        </g>
      ))}

      {/* Left divider */}
      <line x1={margin.left} x2={margin.left} y1={margin.top} y2={height - margin.bottom} stroke="currentColor" className="text-gray-200" />

      {/* Bottom divider */}
      <line x1={0} x2={width} y1={height - margin.bottom} y2={height - margin.bottom} stroke="currentColor" className="text-gray-200" />
      {/* Line */}
      <path d={dLine} stroke="#75A134" fill="none" />
      {/* Area/fill */}
      <path d={dArea} fill="url(#gradient)" />
      {/* Gradient definition for area fill */}
      <defs>
        <linearGradient id="gradient" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="rgba(117,161,52, 0.3)" />
          <stop offset="60%" stopColor="rgba(117,161,52, 0.2)" />
          <stop offset="100%" stopColor="rgba(117,161,52, 0)" />
        </linearGradient>
      </defs>
    </svg>
  )
}

type ChartProps = {
  coordinates: Array<[number, number, number, number?]>
}

const Chart = ({ coordinates }: ChartProps) => {
  const [ref, bounds] = useMeasure()

  /* Measure the total distance for each coordinate
   * TODO: Move inside gpxutils
   */
  const coordinatesWithDistance = coordinates
  useEffect(() => {
    let totalDistance = 0
    coordinates.forEach((c, i) => {
      /* Get each coordinate pair */
      const currentCoordinate = c
      const nextCoordinate = coordinates[i + 1]

      if (!nextCoordinate) {
        // Last coordinate, nothing more to do
        return
      }

      /* Convert coordinate pair to a lineString and measure with @turf/length */
      const line = lineString([
        [currentCoordinate[0], currentCoordinate[1]],
        [nextCoordinate[0], nextCoordinate[1]],
      ])
      const distance = length(line)

      /* Add distance to total */
      totalDistance += distance

      /* First coordinate starts at 0km */
      if (i === 0) {
        c.push(0)
      }
      /* Add the new total distance to each coordinate */
      coordinatesWithDistance[i + 1].push(totalDistance)
    })
  }, [])

  const data = coordinates.map(x => ({ distance: x[3], elevation: x[2] }))
  return (
    <div className="relative w-full h-full" ref={ref}>
      {bounds.width > 0 && <ChartInner data={data} width={bounds.width} height={bounds.height} />}
    </div>
  )
}

export default Chart
