import useStore from '../util/store'

const ScoreLayer = () => {
  const setScoreVisible = useStore((state) => state.setScoreVisible)

  const handleClick = () => {
    setScoreVisible(false)
  }

  return (
    <div
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        display: 'flex',
        width: '100%',
        height: '100%',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        background: 'lightgrey',
      }}
    >
      <p>Score Board</p>
      <button
        style={{ position: 'absolute', top: 0, right: 0 }}
        onClick={handleClick}
      >
        close
      </button>
    </div>
  )
}

export default ScoreLayer
