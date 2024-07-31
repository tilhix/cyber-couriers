import useStore from '../../util/store'
import ElementControls from './ElementControls'
import MoveControls from './MoveControls'
import PackageControls from './PackageControls'

const Controls = () => {
  const toggleScoreVisible = useStore((state) => state.toggleScoreVisible)

  const handleClick = () => {
    toggleScoreVisible()
  }

  return (
    <div
      style={{
        marginTop: '20px',
        display: 'flex',
        gap: '10px',
        flexWrap: 'wrap',
      }}
    >
      <button onClick={handleClick}>toggle scoreboard</button>
      <ElementControls />
      <MoveControls />
      <PackageControls />
    </div>
  )
}

export default Controls
