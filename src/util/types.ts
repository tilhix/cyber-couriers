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
  droneType: DroneType | null
  droneData: DroneData | RunnerDroneData | null
  packageType: PackageType | null
  packageData: PackageData | null
}

export type DroneData = {
  key: string
  location: Location
  locationHistory: Location[]
  status: 0 | 1
}

export type RunnerDroneData = DroneData & {
  carriedPackage: PackageData | null
}

export type PackageData = {
  key: string
  location: Location
  packageStatus: 0 | 1 | 2 | 3
  packageType: 0 | 1
  destination: Location
}

export type DroneType = 'patrolDrone' | 'runnerDrone'
export type PackageType = 'package' | 'packageSensitive'

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
