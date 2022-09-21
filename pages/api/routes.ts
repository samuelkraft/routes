import type { NextApiRequest, NextApiResponse } from 'next'

const gpxUtils = require('../../utils/gpxutils.js')

export default (_: NextApiRequest, res: NextApiResponse) => {
  const routes = gpxUtils.routes.sort((a, b) => new Date(b.added).valueOf() - new Date(a.added).valueOf())

  routes.forEach((route, i) => {
    routes[i].lat = route.geoJson.features[0].geometry.coordinates[0][1] // eslint-disable-line
    routes[i].lng = route.geoJson.features[0].geometry.coordinates[0][0] // eslint-disable-line
    routes[i].name = route.geoJson.features[0].properties.name
    const coords = routes[i].geoJson.features[0].geometry.coordinates
    // eslint-disable-next-line
    coords.forEach((_, index) => {
      coords[i] = [coords[index][0], coords[index][1]]
    })
  })

  res.setHeader('Cache-Control', 's-maxage=3600, stale-while-revalidate')
  res.status(200).json({ routes })
}
