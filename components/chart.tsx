import * as d3 from 'd3'
import useMeasure from 'react-use-measure'
import { ReactNode, useState } from 'react'
import { motion } from 'framer-motion'
import { useMapContext } from './mapprovider'

type ChartInnerProps = {
  data: Array<{ distance: number; elevation: number; coordinates: number[] }>
  width: number
  height: number
}

const ChartInner = ({ data, width, height }: ChartInnerProps): JSX.Element => {
  const { setHoverCoordinate } = useMapContext()
  const [hoverX, setHoverX] = useState(null)
  const [hoverDistance, setHoverDistance] = useState(null)
  const [hoverElevation, setHoverElevation] = useState(null)

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

  const handleMouseMove = e => {
    const bounds = e.target.getBoundingClientRect()
    const x = e.clientX - bounds.left + margin.left

    // Get the xScale value from x position
    const distance = xScale.invert(x)
    // Get the elevation value by finding the closest matching dataPoint.
    // TODO: There is probably a d3 function somewhere to get the y value from the x but this works
    const { elevation, coordinates } = data.reduce((prev, curr) =>
      Math.abs(curr.distance - distance) < Math.abs(prev.distance - distance) ? curr : prev,
    )

    setHoverCoordinate(coordinates)
    setHoverX(x)
    setHoverDistance(Math.round(distance * 100) / 100)
    setHoverElevation(Math.floor(elevation))
  }

  const HoverText = ({ y, children }: { y: number; children: ReactNode }) => {
    const alignToRight = hoverX > width - margin.left - margin.right - 55
    return (
      <text
        x={alignToRight ? -4 : 4}
        y={y}
        textAnchor={alignToRight ? 'end' : 'start'}
        alignmentBaseline="hanging"
        fill="currentColor"
        className="text-xs font-semibold text-gray-500"
      >
        {children}
      </text>
    )
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

      <motion.g style={{ originY: '100%' }} initial={{ scaleY: 0 }} animate={{ scaleY: 1 }} transition={{ duration: 0.7, ease: 'easeOut' }}>
        {/* Line */}
        <path d={dLine} stroke="#75A134" fill="none" />

        {/* Area/fill */}
        <path d={dArea} fill="url(#gradient)" />
      </motion.g>

      {/* Gradient definition for area fill */}
      <defs>
        <linearGradient id="gradient" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="rgba(117,161,52, 0.3)" />
          <stop offset="60%" stopColor="rgba(117,161,52, 0.2)" />
          <stop offset="100%" stopColor="rgba(117,161,52, 0)" />
        </linearGradient>
      </defs>

      {/* Hover line */}
      {hoverX && (
        <g transform={`translate(${hoverX}, 0)`}>
          <line y1={margin.top} y2={height - margin.bottom} stroke="currentColor" className="text-gray-400" />
          <HoverText y={margin.top}>Dist: {hoverDistance} km</HoverText>
          <HoverText y={margin.top + 16}>Elev: {hoverElevation} m</HoverText>
        </g>
      )}

      {/* Hover element
       * width will be 0 on first render, if we remove margins we'll get a negative value which rect does not support
       */}
      {width > 0 && height > 0 && (
        <rect
          width={width - margin.left - margin.right}
          height={height - margin.top - margin.bottom}
          fill="transparent"
          x={margin.left}
          y={margin.top}
          onMouseMove={handleMouseMove}
          onMouseLeave={() => {
            setHoverX(null)
            setHoverDistance(null)
            setHoverCoordinate(null)
          }}
        />
      )}
    </svg>
  )
}

type ChartProps = {
  coordinates: Array<[number, number, number, number]> // lat, lng, elevation, distance
}

const Chart = ({ coordinates }: ChartProps) => {
  const [ref, bounds] = useMeasure()

  const data = coordinates.map(x => ({ distance: x[3], elevation: x[2], coordinates: [x[0], x[1]] }))
  return (
    <div className="relative w-full h-full" ref={ref}>
      {bounds.width > 0 && <ChartInner data={data} width={bounds.width} height={bounds.height} />}
    </div>
  )
}

export default Chart
