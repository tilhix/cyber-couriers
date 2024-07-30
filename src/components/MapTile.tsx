import { MapElementType } from '../util/types'

type MapTileProps = {
  type: MapElementType
}

const MapTile = ({ type }: MapTileProps) => {
  let background
  let value

  switch (type) {
    case 'dropZone':
      background = 'royalblue'
      value = 'Z'
      break
    case 'safeZone':
      background = 'seagreen'
      value = 'S'
      break
    case 'skyScraper':
      background = 'dimgrey'
      value = 'X'
      break
    default:
      background = 'transparent'
      value = ''
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
