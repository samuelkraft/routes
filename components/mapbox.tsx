import { useRef, useEffect } from 'react'
import mapboxgl from 'mapbox-gl/dist/mapbox-gl-csp'
import MapboxWorker from 'worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker' // eslint-disable-line

// Utils
import { stringToColour } from 'utils'

import type { Route, Routes } from 'types'

mapboxgl.workerClass = MapboxWorker
mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN

type MapBoxProps = {
  routes: Routes
  showStartAndEndCircles?: boolean
}

// Initial map
// TODO: Fit to bounds of all routes
const lng = 18.182809464168194
const lat = 59.295889753922474
const zoom = 12

const MapBox = ({ routes, showStartAndEndCircles }: MapBoxProps): JSX.Element => {
  const mapContainer = useRef()

  useEffect(() => {
    const map = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/outdoors-v11',
      center: [lng, lat],
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

    // Create a popup, but don't add it to the map yet.
    const popup = new mapboxgl.Popup({
      closeButton: false,
      closeOnClick: false,
    })

    // Add fullscreen control to the map
    map.addControl(new mapboxgl.FullscreenControl())

    map.on('load', () => {
      routes.forEach((route: Route) => {
        const { name, links } = route.geoJson.features[0].properties
        const { coordinates } = route.geoJson.features[0].geometry
        map.addSource(name, {
          type: 'geojson',
          data: route.geoJson,
        })
        // Our path/route
        map.addLayer({
          id: name,
          type: 'line',
          source: name,
          layout: {
            'line-join': 'round',
            'line-cap': 'round',
          },
          paint: {
            'line-color': stringToColour(name), // randomize a color based on the name
            'line-width': 4,
          },
        })
        // Add a fill layer as source for hover, or we lose our click target when inside the path
        map.addLayer({
          id: `${name}-fill`,
          type: 'fill',
          source: name,
          paint: {
            'fill-color': 'transparent',
            'fill-outline-color': 'transparent',
          },
        })

        if (showStartAndEndCircles) {
          map.addLayer({
            id: `${name}-start`,
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
                  coordinates: coordinates[0],
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
            id: `${name}-end`,
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
                  coordinates: coordinates.pop(),
                },
              },
            },
            paint: {
              'circle-color': 'red',
              'circle-radius': 5,
              'circle-opacity': 1,
            },
          })
        }

        map.on('click', `${name}-fill`, e => {
          const coords = route.geoJson.features[0].geometry.coordinates
          const bounds = coords.reduce((b, coord) => {
            return b.extend(coord)
          }, new mapboxgl.LngLatBounds(coords[0], coords[0]))

          // Fit map to bounds/route
          map.fitBounds(bounds, {
            padding: 20,
          })

          // Open tooltop

          // Ensure that if the map is zoomed out such that multiple
          // copies of the feature are visible, the popup appears
          // over the copy being pointed to.
          while (Math.abs(e.lngLat.lng - coords[0]) > 180) {
            coords[0] += e.lngLat.lng > coords[0] ? 360 : -360
          }

          const { href } = links[0]
          const description = `<a href="${href}" target="_blank" style="outline: none; text-decoration: underline; position: relative; top: 3px;">${name}</p>`

          new mapboxgl.Popup({ closeButton: false }).setLngLat(coords[0]).setHTML(description).addTo(map)
        })

        map.on('mouseenter', `${name}-fill`, () => {
          // Change the cursor style as a UI indicator.
          map.getCanvas().style.cursor = 'pointer'
          // Increase width of route path
          map.setPaintProperty(name, 'line-width', 6)
        })

        map.on('mouseleave', `${name}-fill`, () => {
          map.getCanvas().style.cursor = ''
          map.setPaintProperty(name, 'line-width', 4)
          popup.remove()
        })
      })
    })

    return () => map.remove()
  }, [])

  return <div className="absolute inset-0" ref={mapContainer} />
}

export default MapBox
