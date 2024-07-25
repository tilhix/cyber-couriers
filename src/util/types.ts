export type MapData = {
  width: number
  height: number
  dropZones: MapCoordinates[]
  safeZones: MapCoordinates[]
  skyScrapers: MapCoordinates[]
}

export type MapCoordinates = {
  key: string
  location: Location
}

export type Location = {
  xCoordinate: number
  yCoordinate: number
}

export type MapElement = {
  key: string | null
  type: MapElementType
}

export type MapElementType = 'dropZone' | 'safeZone' | 'skyScraper' | 'empty'

export type GameMap = MapElement[][] | []

export type GameData = (GameElement | null)[][] | []

export type GameElement = {
  key: string
  type: GameElementType
  data: DroneData | RunnerDroneData | PackageData
}

export type DroneData = {
  location: Location
  locationHistory: Location[]
  status: 0 | 1
}

export type RunnerDroneData = DroneData & {
  carriedPackage: PackageData
}

export type PackageData = {
  key: string
  location: Location
  packageStatus: 0 | 1 | 2 | 3
  packageType: 0 | 1
  destination: Location
}

export type GameElementType =
  | 'patrolDrone'
  | 'runnerDrone'
  | 'package'
  | 'packageSensitive'
