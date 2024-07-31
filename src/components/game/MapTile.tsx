import { MapElementType } from '../../util/types'

type MapTileProps = {
  type: MapElementType
}

const MapTile = ({ type }: MapTileProps) => {
  let background
  let value

  switch (type) {
    case 'dropZone':
      background = '#1ba1e2'
      break
    case 'safeZone':
      background = '#00aba9'
      break
    case 'skyScraper':
      background = 'dimgrey'
      value = 'x'
      break
    default:
      background = 'transparent'
      break
  }

  return (
    <div
      style={{
        padding: '5px',
        width: '30px',
        height: '30px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: background,
        border: '1px solid grey',
      }}
    >
      <span>{value}</span>
    </div>
  )
}

export default MapTile
