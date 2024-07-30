import useStore from '../util/store'
import ElementControls from './ElementControls'
import MoveControls from './MoveControls'

const Controls = () => {
  const toggleScoreVisible = useStore((state) => state.toggleScoreVisible)

  const handleClick = () => {
    toggleScoreVisible()
  }

  return (
    <div style={{ marginTop: '20px', display: 'flex', gap: '10px' }}>
      <button onClick={handleClick}>toggle scoreboard</button>
      <ElementControls />
      <MoveControls />
    </div>
  )
}

export default Controls
