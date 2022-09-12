import { createContext, ReactNode, useContext, useMemo, useState } from 'react'

type Coordinate = any
type MapContextValue = {
  hoverCoordinate: Coordinate
  setHoverCoordinate: (coordinate: Coordinate) => void // eslint-disable-line
}

export const MapContext = createContext<MapContextValue | null>(null)

type MapProviderProps = {
  children: ReactNode
}

export const MapProvider = ({ children }: MapProviderProps) => {
  const [hoverCoordinate, setHoverCoordinate] = useState<Coordinate>(null)

  const value = useMemo(
    () => ({
      hoverCoordinate,
      setHoverCoordinate,
    }),
    [hoverCoordinate],
  )

  return <MapContext.Provider value={value}>{children}</MapContext.Provider>
}

export const useMapContext = () => {
  const context = useContext(MapContext)
  if (!context) throw Error('Must be used within MapProvider')
  return context
}
