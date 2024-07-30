import {
  DroneData,
  DroneType,
  GameElement,
  PackageData,
  PackageType,
  RunnerDroneData,
} from '../util/types'

type GameTileProps = {
  elem: GameElement
}

const GameTile = ({ elem }: GameTileProps) => {
  const { droneData, droneType, packageData, packageType, destination } = elem
  const isPackage = packageType && packageData
  const isDrone = droneType && droneData

  return (
    <div
      style={{
        width: '30px',
        height: '30px',
        padding: '3px',
        border: destination ? '3px solid' : 'none',
      }}
    >
      {isPackage && <Package type={packageType} data={packageData} />}
      {isDrone && <Drone type={droneType} data={droneData} />}
    </div>
  )
}

type DroneProps = {
  type: DroneType
  data: DroneData | RunnerDroneData
}

const Drone = ({ type, data }: DroneProps) => {
  const background = type === 'runnerDrone' ? 'darkorange' : 'crimson'
  const carriedPackage = 'carriedPackage' in data ? data.carriedPackage : null

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        background: background,
        borderRadius: '50%',
      }}
    >
      <span>{type === 'runnerDrone' ? 'D' : 'P'}</span>
      {carriedPackage && <span>+P</span>}
    </div>
  )
}

type PackageProps = {
  type: PackageType
  data: PackageData
}

const Package = ({ type, data }: PackageProps) => {
  const background = type === 'packageSensitive' ? 'purple' : 'orchid'
  const { packageStatus } = data

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        background: background,
        borderRadius: '50%',
        border: '3px solid',
      }}
    >
      <span>{packageStatus}</span>
    </div>
  )
}

export default GameTile
