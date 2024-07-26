import { GameData } from '../util/types'

type GameLayerProps = {
  initialData: GameData
}

const GameLayer = ({ initialData }: GameLayerProps) => {
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
      {initialData.map((row, index) => (
        <div key={index} style={{ display: 'flex' }}>
          {row.map((tile, index) => (
            <div
              key={index}
              style={{
                padding: '5px',
                width: '30px',
                height: '30px',
                border: '1px solid red',
              }}
            >
              <span>{tile ? 'T' : ''}</span>
            </div>
          ))}
        </div>
      ))}
    </div>
  )
}

export default GameLayer
