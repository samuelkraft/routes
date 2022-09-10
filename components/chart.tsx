import * as d3 from 'd3'
import useMeasure from 'react-use-measure'

type ChartInnerProps = {
  data: Array<{ distance: number; elevation: number }>
  width: number
  height: number
}

const ChartInner = ({ data, width, height }: ChartInnerProps): JSX.Element => {
  const margin = {
    top: 20,
    right: 0,
    bottom: 20,
    left: 25,
  }

  const xScale = d3
    .scaleLinear()
    .domain(d3.extent(data.map(d => d.distance)))
    .range([margin.left, width - margin.right])

  const yScale = d3
    .scaleLinear()
    .domain(d3.extent(data.map(d => d.elevation)))
    .range([height - margin.bottom, margin.top])

  const line = d3
    .line()
    .x(d => xScale(d.distance))
    .y(d => yScale(d.elevation))

  const dLine = line(data)

  const area = d3
    .area()
    .x(d => xScale(d.distance))
    .y0(height)
    .y1(d => yScale(d.elevation))

  const dArea = area(data)

  return (
    <svg viewBox={`0 0  ${width} ${height}`}>
      {/* Y ticks */}
      {yScale.ticks(5).map(max => (
        <g transform={`translate(0, ${yScale(max)})`} key={max}>
          <line x1={margin.left} x2={width - margin.right} stroke="currentColor" strokeDasharray="1,3" className="text-gray-400" />
          <text alignmentBaseline="middle" fill="currentColor" className="text-xs text-gray-500">
            {max}
          </text>
        </g>
      ))}
      {/* Left divider */}
      <line x1={margin.left} x2={margin.left} y1={margin.top} y2={height - margin.bottom} stroke="currentColor" className="text-gray-200" />
      {/* Line */}
      <path d={dLine} stroke="#75A134" fill="none" />
      {/* Area/fill */}
      <path d={dArea} fill="rgba(117,161,52, 0.3)" />
    </svg>
  )
}

type ChartProps = {
  coordinates: Array<{ lat: number; lon: number; elevation: number }>
}

const Chart = ({ coordinates }: ChartProps) => {
  const [ref, bounds] = useMeasure()
  const data = coordinates.map((x, i) => ({ distance: i, elevation: parseInt(x[2], 10) }))
  return (
    <div className="relative w-full h-full" ref={ref}>
      {bounds.width > 0 && <ChartInner data={data} width={bounds.width} height={bounds.height} />}
    </div>
  )
}

export default Chart
