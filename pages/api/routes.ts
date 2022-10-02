import type { NextApiRequest, NextApiResponse } from 'next'

const simplify = require('simplify-geojson')
const polyline = require('@mapbox/polyline')
const gp = require('geojson-precision')

const gpxUtils = require('../../utils/gpxutils.js')

export default (_: NextApiRequest, res: NextApiResponse) => {
  const routes = gpxUtils.routes.sort((a, b) => new Date(b.added).valueOf() - new Date(a.added).valueOf())

  routes.forEach((route, i) => {
    routes[i].lat = route.geoJson.features[0].geometry.coordinates[0][1] // eslint-disable-line
    routes[i].lng = route.geoJson.features[0].geometry.coordinates[0][0] // eslint-disable-line
    routes[i].name = route.geoJson.features[0].properties.name

    // Simplify geoJson and encode to polyline
    const simplifiedGeoJson = simplify(gp(route.geoJson, 4), 0.0001)
    routes[i].polyline = polyline.fromGeoJSON(simplifiedGeoJson.features[0].geometry)

    const elevations = simplifiedGeoJson.features[0].geometry.coordinates.map(coordinate => ({
      value: coordinate[2],
      distance: coordinate[3],
    }))

    routes[i].elevations = elevations

    // Remove unused geoJson
    delete routes[i].geoJson
  })

  res.setHeader('Cache-Control', 's-maxage=3600, stale-while-revalidate')
  res.status(200).json({ routes })
}
