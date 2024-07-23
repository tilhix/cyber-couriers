export type MapData = {
  width: number
  height: number
  dropZones: MapCoordinates[]
  safeZones: MapCoordinates[]
  skyScrapers: MapCoordinates[]
}

export type MapCoordinates = {
  key: string
  location: {
    xCoordinate: number
    yCoordinate: number
  }
}

export type MapElement = {
  key: string | null
  type: MapElementType
}

export type MapElementType = 'dropZone' | 'safeZone' | 'skyScraper' | 'empty'

export type InitialMap = MapElement[][] | []
