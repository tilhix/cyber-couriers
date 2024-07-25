import useStore from '../util/store'

const ControlLayer = () => {
  const startGame = useStore((state) => state.startGame)
  const setScoreVisible = useStore((state) => state.setScoreVisible)
  const started = useStore((state) => state.started)

  const handlePlayClick = () => {
    startGame()
  }

  const handleScoreClick = () => {
    setScoreVisible(true)
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
        background: 'grey',
      }}
    >
      <p>{started ? 'Try again?' : 'Start the game'}</p>
      <div style={{ display: 'flex', gap: '10px' }}>
        <button onClick={handlePlayClick}>
          {started ? 'continue' : 'start'}
        </button>
        {started && <button onClick={handleScoreClick}>score</button>}
      </div>
    </div>
  )
}

export default ControlLayer
