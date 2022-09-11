type geoJson = {
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

type Type = 'run' | 'swimrun'

export type Route = {
  slug: string
  type: Type
  distance: number
  elevation: number
  geoJson: geoJson
  rating?: number
  description?: string
  location?: string
  color: string
  date: string
}

export type Routes = Array<Route>
