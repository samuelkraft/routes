const fs = require('fs')
const path = require('path')
const toGeoJson = require('@mapbox/togeojson')
const turflength = require('@turf/length').default
const xmldom = require('xmldom')
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

  // Calculate elevation gain using gpx data
  const { coordinates } = geoJson.features[0].geometry
  let elevation = 0
  coordinates.forEach((coord, index) => {
    if (index === coordinates.length - 1) return // stop 1 point early since comparison requires 2 points
    const elevationDifference = coordinates[index + 1][2] - coordinates[index][2]
    if (elevationDifference > 0) elevation += elevationDifference
  })

  return {
    distance,
    elevation,
    geoJson: metadata?.geoJson || geoJson,
    gpxGeoJson: geoJson, // TODO send original gpx geojson to generate-images until it handles the multi-feature geojson
    slug,
    color: metadata?.color || 'red',
    description: metadata?.description || null,
    rating: metadata?.rating || null,
    location: metadata?.location || null,
    swimrun: metadata?.swimrun || false,
    added: metadata?.added,
  }
})

module.exports = { routes }
