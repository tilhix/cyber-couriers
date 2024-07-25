import { MapElementType } from '../util/types'

type MapTileProps = {
  type: MapElementType
}

const MapTile = ({ type }: MapTileProps) => {
  let background
  let value

  switch (type) {
    case 'dropZone':
      background = 'blue'
      value = 'D'
      break
    case 'safeZone':
      background = 'green'
      value = 'S'
      break
    case 'skyScraper':
      background = 'grey'
      value = 'X'
      break
    default:
      background = 'transparent'
      value = '.'
      break
  }

  return (
    <div
      style={{
        padding: '5px',
        width: '30px',
        height: '30px',
        backgroundColor: background,
      }}
    >
      <span>{value}</span>
    </div>
  )
}

export default MapTile
