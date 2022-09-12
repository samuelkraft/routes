import { Fragment, useEffect, useRef } from 'react'
import Map, { NavigationControl, FullscreenControl, GeolocateControl, Source, Layer, MapRef } from 'react-map-gl'
import { Route } from 'types'
import extent from 'turf-extent'

type MapComponentProps = {
  routes: Route[]
  initialLat?: number
  initialLng?: number
}

// Initial map
// TODO: Fit to bounds of all routes
const lng = 18.274050337530213
const lat = 59.31711298954641
const zoom = 11

const MapComponent = ({ routes, initialLat = lat, initialLng = lng }: MapComponentProps) => {
  const mapRef = useRef<MapRef>()
  const isRouteDetailPage = routes.length === 1

  useEffect(() => {
    if (isRouteDetailPage) {
      const bbox = extent(routes[0].geoJson)
      mapRef.current?.fitBounds(bbox, {
        padding: 20,
      })
    } else {
      mapRef.current?.flyTo({ center: [lng, lat], duration: 2000 })
    }
  }, [isRouteDetailPage])

  return (
    <div className="absolute inset-0">
      <Map
        initialViewState={{
          longitude: initialLng,
          latitude: initialLat,
          zoom,
        }}
        mapStyle="mapbox://styles/mapbox/outdoors-v11"
        ref={mapRef}
        reuseMaps
        mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN}
      >
        <NavigationControl />
        <FullscreenControl />
        <GeolocateControl />
        {routes.map(route => {
          return (
            <Fragment key={route.slug}>
              <Source key={route.slug} id={route.slug} type="geojson" data={route.geoJson}>
                {/* Line */}
                <Layer
                  key={route.slug}
                  type="line"
                  paint={{
                    'line-color': route.color,
                    'line-width': 4,
                  }}
                />
              </Source>
            </Fragment>
          )
        })}
      </Map>
    </div>
  )
}

export default MapComponent
