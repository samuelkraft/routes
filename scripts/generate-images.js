/* eslint-disable */
const fs = require('fs')
const fetch = require('node-fetch')
const https = require('https')
const gp = require('geojson-precision')
const simplify = require('simplify-geojson')
const polyline = require('@mapbox/polyline')

const { routes } = require('../utils/gpxutils.js')

var download = function (url, dest, cb) {
  const file = fs.createWriteStream(dest)
  https.get(url, function (response) {
    response.pipe(file)
    file.on('finish', function () {
      file.close(cb)
    })
  })
}

async function generate() {
  await Promise.all(
    routes.map(async route => {
      const geoJson = simplify(gp(route.geoJson, 4), 0.0001)
      const poly0 = polyline.fromGeoJSON(geoJson.features[0].geometry)
      console.log('poly0', poly0, geoJson)
      const poly = poly0.replaceAll('?', '%3F')
      const image = `https://api.mapbox.com/styles/v1/mapbox/outdoors-v11/static/path-5+${route.color.replace(
        '#',
        '',
      )}-1(${poly})/auto/1012x516?access_token=${process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN}`
      download(image, `./public/og/${route.slug}.jpg`)
    }),
  )
}

generate()
