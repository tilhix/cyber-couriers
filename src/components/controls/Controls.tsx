import useStore from '../../util/store'
import ElementControls from './ElementControls'
import MoveControls from './MoveControls'
import PackageControls from './PackageControls'

const Controls = () => {
  const toggleScoreVisible = useStore((state) => state.toggleScoreVisible)
  const currentDrone = useStore((state) => state.currentDrone)

  const handleClick = () => {
    toggleScoreVisible()
  }

  return (
    <>
      <div
        style={{
          marginTop: '20px',
          display: 'flex',
          gap: '10px',
          flexWrap: 'wrap',
        }}
      >
        <button onClick={handleClick}>scoreboard</button>
        <ElementControls />
        <PackageControls />
      </div>
      {currentDrone && (
        <div
          style={{
            marginTop: '10px',
            display: 'flex',
            gap: '10px',
            flexWrap: 'wrap',
          }}
        >
          <MoveControls />
        </div>
      )}
    </>
  )
}

export default Controls
