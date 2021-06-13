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
  rating?: number
  description?: string
  location?: string
  color: string
  swimrun?: boolean
}

export type Routes = Array<Route>
