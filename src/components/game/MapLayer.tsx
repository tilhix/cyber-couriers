import { GameMap } from '../../util/types'
import MapTile from './MapTile'

type MapLayerProps = {
  gameMap: GameMap
}

const MapLayer = ({ gameMap }: MapLayerProps) => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {gameMap.map((row, index) => (
        <div key={index} style={{ display: 'flex' }}>
          {row.map((tile, index) => (
            <MapTile type={tile.type} key={index} />
          ))}
        </div>
      ))}
    </div>
  )
}

export default MapLayer
