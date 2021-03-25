export type Route = {
  distance: number
  elevation: number
  geoJson: {
    features: Array<{
      properties: {
        name: string
        links: Array<{ href: string }>
      }
      geometry: {
        coordinates: Array<any>
      }
    }>
  }
}

export type Routes = Array<Route>
