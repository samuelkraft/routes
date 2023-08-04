const fs = require('fs')
const path = require('path')
const toGeoJson = require('@mapbox/togeojson')
const turflength = require('@turf/length').default
const xmldom = require('xmldom')
const { lineString } = require('@turf/helpers')
const met = require('../data/meta')

const ROUTES_PATH = path.join(process.cwd(), 'public', 'gpx')

// routeFilePaths is the list of all gpx files inside the ROUTES_PATH directory
const routeFilePaths = fs
  .readdirSync(ROUTES_PATH)
  // Only include gpx files
  .filter(p => /\.gpx?$/.test(p))

const routes = routeFilePaths.map(filePath => {
  const source = new xmldom.DOMParser().parseFromString(fs.readFileSync(path.join(ROUTES_PATH, filePath), 'utf8'))
  const slug = filePath.replace('.gpx', '')
  const metadata = met.meta[slug]

  const geoJson = toGeoJson.gpx(source)

  // Calculate distance using geoJson
  const distance = turflength(geoJson)

  // Calculate total distance per coordinate & elevation gain
  const { coordinates } = geoJson.features[0].geometry
  let totalDistance = 0
  let elevation = 0
  coordinates.forEach((currentCoordinate, i) => {
    /* Get each coordinate pair */
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
    const newDistance = turflength(line)

    /* Add distance to total */
    totalDistance += newDistance

    /* First coordinate starts at 0km */
    if (i === 0) {
      currentCoordinate.push(0)
    }
    /* Add the new total distance to each coordinate */
    nextCoordinate.push(totalDistance)

    /* Calculate elevation gain */
    const elevationDifference = nextCoordinate[2] - currentCoordinate[2]
    if (elevationDifference > 0) elevation += elevationDifference
  })

  /* Add optional points of interest as features to the geojson */
  if (metadata?.points) {
    metadata.points.forEach((point, i) => {
      const { lat, lng, description } = point
      geoJson.features.push({
        type: 'Feature',
        properties: {
          id: `point-${i}`,
          description,
          icon: 'pin',
        },
        geometry: {
          type: 'Point',
          coordinates: [lng, lat],
        },
      })
    })
  }

  return {
    distance,
    elevation,
    geoJson,
    id: slug,
    slug,
    color: metadata?.color || 'red',
    description: metadata?.description || null,
    rating: metadata?.rating || null,
    location: metadata?.location || null,
    type: metadata?.type || 'run',
    added: metadata?.added,
    author: metadata?.author || null,
    coordinates,
  }
})

module.exports = { routes }
