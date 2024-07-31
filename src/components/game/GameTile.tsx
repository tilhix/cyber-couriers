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
  const hasPackage = !!packageData
  const hasDrone = !!(droneType && droneData)

  return (
    <div
      style={{
        position: 'relative',
        width: '30px',
        height: '30px',
        padding: '3px',
        fontWeight: 'bold',
        fontSize: '14px',
        ...(destination && { border: '3px solid #f09609' }),
      }}
    >
      {hasPackage && <Package data={packageData} withDrone={hasDrone} />}
      {hasDrone && (
        <Drone type={droneType} data={droneData} withPackage={hasPackage} />
      )}
    </div>
  )
}

type DroneProps = {
  type: DroneType
  data: DroneData | RunnerDroneData
  withPackage: boolean
}

const Drone = ({ type, data, withPackage }: DroneProps) => {
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
        position: 'absolute',
        bottom: '3px',
        right: '3px',
        zIndex: 2,
        ...(carriedPackage && {
          border: '3px solid #f09609',
          fontSize: '12px',
        }),
        ...(withPackage && { bottom: '1px', right: '1px' }),
      }}
    >
      <span>{isRunner ? 'R' : 'D'}</span>
      {carriedPackage && <span>{carriedPackage.packageType ? '*' : '+'}</span>}
    </div>
  )
}

type PackageProps = {
  data: PackageData
  withDrone: boolean
}

const Package = ({ data, withDrone }: PackageProps) => {
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
        position: 'absolute',
        zIndex: 1,
        ...(withDrone && { top: '1px', left: '1px' }),
        ...(!withDrone && { top: '3px', left: '3px', border: '3px solid' }),
      }}
    >
      <span>{packageType ? '*' : '+'}</span>
    </div>
  )
}

export default GameTile
