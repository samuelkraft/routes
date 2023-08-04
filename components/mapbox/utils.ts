import extent from 'turf-extent'

export const paint = {
  current: {
    'circle-color': 'white',
    'circle-radius': 3,
    'circle-opacity': 1,
    'circle-stroke-color': 'blue',
    'circle-stroke-width': 3,
    'circle-stroke-opacity': 1,
  },
  start: {
    'circle-color': 'white',
    'circle-radius': 3,
    'circle-opacity': 1,
    'circle-stroke-color': '#87CF3E',
    'circle-stroke-width': 3,
    'circle-stroke-opacity': 1,
  },
  end: {
    'circle-color': 'white',
    'circle-radius': 3,
    'circle-opacity': 1,
    'circle-stroke-color': 'red',
    'circle-stroke-width': 3,
    'circle-stroke-opacity': 1,
  },
}

export const flyToGeoJson = (map, geoJson) => {
  const bbox = extent(geoJson)
  map.fitBounds(bbox, {
    padding: 20,
  })
}

export const setAllLayersVisibility = (map, slug: string, essentialsVisibility: string, extrasVisiblity?: string) => {
  if (map) {
    map.setLayoutProperty(slug, 'visibility', essentialsVisibility)
    map.setLayoutProperty(`${slug}-fill`, 'visibility', essentialsVisibility)
    map.setLayoutProperty(`${slug}-end`, 'visibility', extrasVisiblity || essentialsVisibility)
    map.setLayoutProperty(`${slug}-start`, 'visibility', extrasVisiblity || essentialsVisibility)
    map.setLayoutProperty(`${slug}-points`, 'visibility', extrasVisiblity || essentialsVisibility)
  }
}

export const getHoverGeoJson = coordinates => ({
  type: 'Feature',
  properties: {
    description: 'Current coordinate from graph',
  },
  geometry: {
    type: 'Point',
    coordinates,
  },
})
