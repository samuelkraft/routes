export type Route = {
  slug: string
  distance: number
  elevation: number
  geoJson: {
    type: string
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
