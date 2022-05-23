import { useState, useRef, useEffect } from 'react'
import mapboxgl from 'mapbox-gl/dist/mapbox-gl-csp'
import MapboxWorker from 'worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker' // eslint-disable-line
import { useRouter } from 'next/router'
import extent from 'turf-extent'
import type { Route, Routes } from 'types'

mapboxgl.workerClass = MapboxWorker
mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN

type MapBoxProps = {
  routes: Routes
  initialLat?: number
  initialLng?: number
}

// Initial map
// TODO: Fit to bounds of all routes
const lng = 18.274050337530213
const lat = 59.31711298954641
const zoom = 11

const MapBox = ({ routes, initialLng = lng, initialLat = lat }: MapBoxProps): JSX.Element => {
  const [stateMap, setStateMap] = useState(null)
  const mapContainer = useRef()

  const router = useRouter()
  const queryRoute = router.query.slug

  useEffect(() => {
    const map = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/outdoors-v11',
      center: [initialLng, initialLat],
      zoom,
    })

    // Add zoom/rotate control to the map
    map.addControl(new mapboxgl.NavigationControl())

    // Add geolocate control to the map.
    map.addControl(
      new mapboxgl.GeolocateControl({
        positionOptions: {
          enableHighAccuracy: true,
        },
        trackUserLocation: true,
      }),
    )

    // Add fullscreen control to the map
    map.addControl(new mapboxgl.FullscreenControl())

    map.on('load', () => {
      routes.forEach((route: Route) => {
        const {
          slug,
          color,
          geoJson: { features },
        } = route
        const { coordinates: startCoordinates } = features[0].geometry
        const { coordinates: endCoordinates } = features[features.length - 1].geometry
        const isCollection = features.length > 1
        const bbox = extent(route.geoJson)

        const dash = isCollection && queryRoute ? { 'line-dasharray': ['get', 'dash'] } : {}

        map.addSource(slug, {
          type: 'geojson',
          data: route.geoJson,
        })
        // Our path/route
        map.addLayer({
          id: slug,
          type: 'line',
          source: slug,
          layout: {
            'line-join': 'round',
            'line-cap': 'round',
          },
          paint: {
            'line-color': color,
            'line-width': 4,
            ...dash,
          },
        })
        // Add a fill layer as source for hover, or we lose our click target when inside the path
        map.addLayer({
          id: `${slug}-fill`,
          type: 'fill',
          source: slug,
          paint: {
            'fill-color': 'transparent',
            'fill-outline-color': 'transparent',
          },
        })

        map.addLayer({
          id: `${slug}-start`,
          type: 'circle',
          source: {
            type: 'geojson',
            data: {
              type: 'Feature',
              properties: {
                description: 'Activity Start',
              },
              geometry: {
                type: 'Point',
                coordinates: startCoordinates[0],
              },
            },
          },
          paint: {
            'circle-color': '#87CF3E',
            'circle-radius': 5,
            'circle-opacity': 1,
          },
        })

        map.addLayer({
          id: `${slug}-end`,
          type: 'circle',
          source: {
            type: 'geojson',
            data: {
              type: 'Feature',
              properties: {
                description: 'Activitiy End',
              },
              geometry: {
                type: 'Point',
                coordinates: endCoordinates.pop(),
              },
            },
          },
          paint: {
            'circle-color': 'red',
            'circle-radius': 5,
            'circle-opacity': 1,
          },
        })

        map.on('click', `${slug}-fill`, () => {
          // Fit map to bounds/route
          map.fitBounds(bbox, {
            padding: 20,
          })

          router.push(`/${slug}`)
        })

        map.on('mouseenter', `${slug}-fill`, () => {
          // Change the cursor style as a UI indicator.
          map.getCanvas().style.cursor = 'pointer'
          // Increase width of route path
          map.setPaintProperty(slug, 'line-width', 6)
        })

        map.on('mouseleave', `${slug}-fill`, () => {
          map.getCanvas().style.cursor = ''
          map.setPaintProperty(slug, 'line-width', 4)
        })
      })

      setStateMap(map)
    })

    return () => map.remove()
  }, [])

  useEffect(() => {
    if (queryRoute && stateMap) {
      routes.forEach((route: Route) => {
        const {
          slug,
          geoJson: { features },
        } = route
        const isCollection = features.length > 1

        if (slug === queryRoute) {
          stateMap.setLayoutProperty(slug, 'visibility', 'visible')
          stateMap.setLayoutProperty(`${slug}-fill`, 'visibility', 'visible')
          stateMap.setLayoutProperty(`${slug}-end`, 'visibility', 'visible')
          stateMap.setLayoutProperty(`${slug}-start`, 'visibility', 'visible')
          if (isCollection) {
            stateMap.setPaintProperty(slug, 'line-dasharray', ['get', 'dash'])
          }

          const bbox = extent(route.geoJson)
          // Fit map to bounds/route
          stateMap.fitBounds(bbox, {
            padding: 20,
          })
        } else {
          stateMap.setLayoutProperty(slug, 'visibility', 'none')
          stateMap.setLayoutProperty(`${slug}-fill`, 'visibility', 'none')
          stateMap.setLayoutProperty(`${slug}-end`, 'visibility', 'none')
          stateMap.setLayoutProperty(`${slug}-start`, 'visibility', 'none')
          if (isCollection) {
            stateMap.setPaintProperty(slug, 'line-dasharray', null)
          }
        }
      })
    } else {
      routes.forEach((route: Route) => {
        const {
          slug,
          geoJson: { features },
        } = route
        const isCollection = features.length > 1
        if (stateMap) {
          stateMap.setLayoutProperty(slug, 'visibility', 'visible')
          stateMap.setLayoutProperty(`${slug}-fill`, 'visibility', 'visible')
          stateMap.setLayoutProperty(`${slug}-end`, 'visibility', 'none')
          stateMap.setLayoutProperty(`${slug}-start`, 'visibility', 'none')
          if (isCollection) {
            stateMap.setPaintProperty(slug, 'line-dasharray', null)
          }
          stateMap.flyTo({
            center: [lng, lat],
            essential: true,
            zoom,
          })
        }
      })
    }
  }, [queryRoute, stateMap])

  return <div className="absolute inset-0" ref={mapContainer} />
}

export default MapBox
