import { GameData } from '../util/types'
import GameTile from './GameTile'

type GameLayerProps = {
  gameData: GameData
}

const GameLayer = ({ gameData }: GameLayerProps) => {
  return (
    <div
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {gameData.map((row, index) => (
        <div key={index} style={{ display: 'flex' }}>
          {row.map((tile, index) => (
            <GameTile key={index} elem={tile} />
          ))}
        </div>
      ))}
    </div>
  )
}

export default GameLayer
