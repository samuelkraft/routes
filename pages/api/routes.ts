import type { NextApiRequest, NextApiResponse } from 'next'

const gpxUtils = require('../../utils/gpxutils.js')

export default (_: NextApiRequest, res: NextApiResponse) => {
  const routes = gpxUtils.routes.sort((a, b) => new Date(b.added).valueOf() - new Date(a.added).valueOf())

  routes.forEach((route, i) => {
    routes[i].lat = route.geoJson.features[0].geometry.coordinates[0][1] // eslint-disable-line
    routes[i].lng = route.geoJson.features[0].geometry.coordinates[0][0] // eslint-disable-line
  })

  res.setHeader('Cache-Control', 's-maxage=3600, stale-while-revalidate')
  res.status(200).json({ routes })
}
