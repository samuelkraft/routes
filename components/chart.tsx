import { FlexibleXYPlot, AreaSeries, YAxis, HorizontalGridLines, LineSeries } from 'react-vis'

const Chart = ({ coordinates }: { coordinates: Array<{ lat: number; lon: number; elevation: number }> }): JSX.Element => {
  const data = coordinates.map((x, i) => ({ x: i, y: parseInt(x[2], 10) }))
  return (
    <div style={{ height: 120, overflow: 'hidden' }}>
      <FlexibleXYPlot height={150}>
        <HorizontalGridLines />
        <AreaSeries curve="curveNatural" data={data} color="#DDE8CD" />
        <LineSeries data={data} color="#75A134" strokeWidth={1} />
        <YAxis />
      </FlexibleXYPlot>
    </div>
  )
}

export default Chart
