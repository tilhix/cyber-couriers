export type MapSize = {
  width: number
  height: number
}

export type MapData = MapSize & {
  dropZones: MapCoordinates[]
  safeZones: MapCoordinates[]
  skyScrapers: MapCoordinates[]
}

export type MapCoordinates = {
  key: string
  location: LocationType
}

export type LocationType = {
  xCoordinate: number
  yCoordinate: number
}

export type MapElement = {
  key: string | null
  type: MapElementType
}

export type MapElementType = 'dropZone' | 'safeZone' | 'skyScraper' | 'empty'

export type GameMap = MapElement[][] | []

export type GameData = GameElement[][] | []

export type GameElement = {
  droneType: DroneType | null
  droneData: DroneData | RunnerDroneData | null
  packageData: PackageData | null
  destination: string | null
}

export type DroneData = {
  key: string
  location: LocationType
  locationHistory: LocationType[]
  status: 0 | 1
}

export type RunnerDroneData = DroneData & {
  carriedPackage: PackageData | null
}

export type CurrentDrone = MapCoordinates & {
  carriedPackage: string | null
}

export type CurrentPackage = MapCoordinates

export type PackageData = {
  key: string
  location: LocationType
  packageStatus: 0 | 1 | 2 | 3
  packageType: 0 | 1
  destination: LocationType
}

export type DroneType = 'patrolDrone' | 'runnerDrone'

export type ScoreBoardData = {
  deliveredPackages: number
  destoryedPackages: number
  dronesUsed: number
  moves: number
}

export type DronesData = {
  patrolDrones: DroneData[]
  runnerDrones: RunnerDroneData[]
}

export type PackagesData = PackageData[]
