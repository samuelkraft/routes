import { useState, useRef, useEffect } from 'react'
import mapboxgl from 'mapbox-gl/dist/mapbox-gl-csp'
import MapboxWorker from 'worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker' // eslint-disable-line
import { useRouter } from 'next/router'
import { useTheme } from 'next-themes'
import type { Route, Routes } from 'types'
import { useMapContext } from 'components/mapprovider'
import { paint, getHoverGeoJson, setAllLayersVisibility, flyToGeoJson } from './utils'

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

function getStyleForTheme(theme: string) {
  return theme === 'dark' ? 'mapbox://styles/mapbox/dark-v11' : 'mapbox://styles/mapbox/outdoors-v11'
}

function MapBox({ routes, initialLng = lng, initialLat = lat }: MapBoxProps): JSX.Element {
  const { hoverCoordinate } = useMapContext()
  const [stateMap, setStateMap] = useState(null)
  const mapContainer = useRef()

  const router = useRouter()
  const queryRoute = router.query.slug

  const { resolvedTheme } = useTheme()

  useEffect(() => {
    const map = new mapboxgl.Map({
      container: mapContainer.current,
      style: getStyleForTheme(resolvedTheme),
      center: [initialLng, initialLat],
      zoom,
    })

    // Add zoom/rotate control to the map
    map.addControl(new mapboxgl.NavigationControl())

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

        map.addSource(slug, {
          type: 'geojson',
          data: route.geoJson,
        })
        // The path/route
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
        // Start point
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
          paint: paint.start,
        })
        // End point
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
          paint: paint.end,
        })

        map.on('click', `${slug}-fill`, () => {
          // Navigate and fly to route on click
          flyToGeoJson(map, route.geoJson)
          if (!queryRoute) {
            router.push(`/${slug}`)
          }
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

        map.loadImage('/pin.png', (error, image) => {
          if (error) throw error

          // Add the image to the map style.
          map.addImage('pin', image)
        })

        // Add a layer showing points/markers
        map.addLayer({
          id: `${slug}-points`,
          type: 'symbol',
          source: slug,
          layout: {
            'icon-image': ['get', 'icon'],
            'icon-size': 0.1,
            'icon-allow-overlap': true,
          },
        })

        // When a click event occurs on a feature in the places layer, open a popup at the
        // location of the feature, with description HTML from its properties.
        map.on('click', `${slug}-points`, e => {
          // Copy coordinates array.
          const coordinates = e.features[0].geometry.coordinates.slice()
          const { description } = e.features[0].properties

          // Ensure that if the map is zoomed out such that multiple
          // copies of the feature are visible, the popup appears
          // over the copy being pointed to.
          while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
            coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360
          }

          new mapboxgl.Popup().setLngLat(coordinates).setHTML(description).addTo(map)
        })

        // Change the cursor to a pointer when the mouse is over the points layer.
        map.on('mouseenter', `${slug}-points`, () => {
          map.getCanvas().style.cursor = 'pointer'
        })

        // Change it back to a pointer when it leaves.
        map.on('mouseleave', `${slug}-points`, () => {
          map.getCanvas().style.cursor = ''
        })
      })
      // Save map in state so it can be accessed later
      setStateMap(map)
    })

    return () => map.remove()
  }, [])

  // Add geolocate control in separate hook, or it errors on ssr
  useEffect(() => {
    if (stateMap) {
      stateMap.addControl(
        new mapboxgl.GeolocateControl({
          positionOptions: {
            enableHighAccuracy: false,
          },
          trackUserLocation: true,
          showUserHeading: true,
        }),
      )
    }
  }, [stateMap])

  // Handle showing/hiding layers & flying when route changes
  useEffect(() => {
    // Hide everything but the current route when on route page
    if (queryRoute && stateMap) {
      routes.forEach((route: Route) => {
        const { slug } = route
        if (slug === queryRoute) {
          setAllLayersVisibility(stateMap, slug, 'visible')
          flyToGeoJson(stateMap, route.geoJson)
        } else {
          setAllLayersVisibility(stateMap, slug, 'none')
        }
      })
    } else {
      // Reset initial map state when on /
      routes.forEach((route: Route) => {
        const { slug } = route
        if (stateMap) {
          setAllLayersVisibility(stateMap, slug, 'visible', 'none')
          stateMap.flyTo({
            center: [initialLng, initialLat],
            essential: true,
            zoom,
          })
        }
      })
    }
  }, [queryRoute, stateMap])

  // Handle "current" circle showing/hiding when hovering graph
  useEffect(() => {
    if (stateMap) {
      if (queryRoute && hoverCoordinate) {
        const { slug } = routes.find(route => route.slug === queryRoute)
        const geoJson = getHoverGeoJson(hoverCoordinate)
        const hoverId = `${slug}-current`
        // Add or update circle
        if (stateMap.getSource(hoverId)) {
          stateMap.getSource(hoverId).setData(geoJson)
        } else {
          stateMap.addLayer({
            id: hoverId,
            type: 'circle',
            source: {
              type: 'geojson',
              data: geoJson,
            },
            paint: paint.current,
          })
        }
      } else {
        // If not hovering then remove the layers
        routes.forEach((route: Route) => {
          const { slug } = route
          const hoverId = `${slug}-current`
          if (stateMap && stateMap.getSource(hoverId) && stateMap.getLayer(hoverId)) {
            stateMap.removeLayer(hoverId)
            stateMap.removeSource(hoverId)
          }
        })
      }
    }
  }, [stateMap, queryRoute, hoverCoordinate])

  return <div className="absolute inset-0" ref={mapContainer} />
}

export default MapBox
