import {
  DroneData,
  DroneType,
  GameElement,
  PackageData,
  RunnerDroneData,
} from '../../util/types'

type GameTileProps = {
  elem: GameElement
}

const GameTile = ({ elem }: GameTileProps) => {
  const { droneData, droneType, packageData, destination } = elem
  const isPackage = packageData
  const isDrone = droneType && droneData

  return (
    <div
      style={{
        position: 'relative',
        width: '30px',
        height: '30px',
        padding: '3px',
        fontWeight: 'bold',
        fontSize: '14px',
        ...(destination && { border: '3px solid' }),
      }}
    >
      {isPackage && <Package data={packageData} />}
      {isDrone && <Drone type={droneType} data={droneData} />}
    </div>
  )
}

type DroneProps = {
  type: DroneType
  data: DroneData | RunnerDroneData
}

const Drone = ({ type, data }: DroneProps) => {
  const isRunner = type === 'runnerDrone'
  const background = isRunner ? '#ff0097' : '#a200ff'
  const carriedPackage = 'carriedPackage' in data ? data.carriedPackage : null

  return (
    <div
      style={{
        width: '24px',
        height: '24px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        background: background,
        borderRadius: '50%',
        ...(carriedPackage && { border: '3px solid', fontSize: '12px' }),
        ...(isRunner && { position: 'absolute', top: '3px', right: '3px' }),
      }}
    >
      <span>{isRunner ? 'R' : 'D'}</span>
      {carriedPackage && <span>{carriedPackage.packageType ? '+' : '-'}</span>}
    </div>
  )
}

type PackageProps = {
  data: PackageData
}

const Package = ({ data }: PackageProps) => {
  const background = '#f09609'
  const { packageType } = data

  return (
    <div
      style={{
        width: '24px',
        height: '24px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: '50%',
        background: background,
        border: '3px solid',
      }}
    >
      <span>{packageType ? '+' : '-'}</span>
    </div>
  )
}

export default GameTile
