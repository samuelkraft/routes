import { useRef, useState, useEffect } from 'react'
import mapboxgl from 'mapbox-gl/dist/mapbox-gl-csp'
import MapboxWorker from 'worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker'

mapboxgl.workerClass = MapboxWorker
mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN

const MapBox = ({ coordinates }): JSX.Element => {
  const mapContainer = useRef()
  const start = coordinates[0]
  const [lng, setLng] = useState(start[0])
  const [lat, setLat] = useState(start[1])
  const [zoom, setZoom] = useState(13)

  useEffect(() => {
    const map = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/outdoors-v11',
      center: [lng, lat],
      zoom,
    })

    map.addControl(new mapboxgl.NavigationControl())

    map.on('load', () => {
      map.addSource('route', {
        type: 'geojson',
        data: {
          type: 'Feature',
          properties: {},
          geometry: {
            type: 'LineString',
            coordinates,
          },
        },
      })
      map.addLayer({
        id: 'route',
        type: 'line',
        source: 'route',
        layout: {
          'line-join': 'round',
          'line-cap': 'round',
        },
        paint: {
          'line-color': '#E97676',
          'line-width': 4,
        },
      })

      map.addLayer({
        id: 'start',
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
              coordinates: start,
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
        id: 'end',
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
    })

    return () => map.remove()
  }, [])

  return <div className="absolute inset-0" ref={mapContainer} />
}

export default MapBox
