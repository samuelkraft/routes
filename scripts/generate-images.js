const fs = require('fs')
const path = require('path')
const gp = require('geojson-precision')
const simplify = require('simplify-geojson')
const polyline = require('@mapbox/polyline')
const { createCanvas, loadImage } = require('canvas')
const { routes } = require('../utils/gpxutils')

const width = 1012
const height = 516

async function generate() {
  await Promise.all(
    routes.map(async route => {
      // simplify the geojson and strip extra points from coordinates to fit mapbox's api
      const geoJson = simplify(gp(route.gpxGeoJson, 4), 0.0001)
      // Encode our geoJson to a polyline - replace any "?" with encoded value or mapbox will break
      const poly = polyline.fromGeoJSON(geoJson.features[0].geometry).replace(/\?/g, '%3F')
      // Mapbox wants a hash-less hex value
      const color = route.color.replace('#', '')
      const padding = '80, 80, 120'
      const mapboxImage = `https://api.mapbox.com/styles/v1/mapbox/outdoors-v11/static/path-5+${color}-1(${poly})/auto/${width}x${height}?padding=${padding}&access_token=${process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN}`

      const canvas = createCanvas(width, height)
      const context = canvas.getContext('2d')

      // Load the mapbox image onto a canvas
      const map = await loadImage(mapboxImage)
      context.drawImage(map, 0, 0)

      // Add gradient in the bottom so overlayed text is visible
      const gradient = context.createLinearGradient(0, height * 0.7, 0, height)
      gradient.addColorStop(0, 'rgba(0,0,0,0)')
      gradient.addColorStop(1, 'rgba(0,0,0,0.5)')
      context.fillStyle = gradient
      context.fillRect(0, height * 0.7, width, height)

      // Add image in top corner
      const logo = await loadImage('./public/logo.png')
      context.drawImage(logo, 40, 40)

      const titleY = 470
      const labelY = titleY - 45
      const distanceX = 40
      const elevationX = width * 0.25 + distanceX
      const stifaX = width * 0.5 + distanceX
      const ratingX = width * 0.75 + distanceX

      // Add titles
      context.fillStyle = '#fff'
      context.font = 'bold 30pt Proxima Nova'
      context.fillText(`${Math.round(route.distance * 10) / 10} km`, distanceX, titleY)
      context.fillText(`${Math.round(route.elevation)} m`, elevationX, titleY)
      context.fillText(`${Math.round(route.elevation / route.distance)}`, stifaX, titleY)
      context.fillText(`${route.rating}/5`, ratingX, titleY)

      // Add labels
      context.font = 'bold 16pt Proxima Nova'
      context.fillText(`DISTANCE`, distanceX, labelY)
      context.fillText(`ELEVATION`, elevationX, labelY)
      context.fillText(`STIFA`, stifaX, labelY)
      context.fillText(`RATING`, ratingX, labelY)

      const buffer = canvas.toBuffer('image/png')
      fs.writeFileSync(path.join(process.cwd(), `public/og/${route.slug}.png`), buffer)
    }),
  )
}

generate()
