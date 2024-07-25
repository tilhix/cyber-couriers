import useStore from '../util/store'

const Actions = () => {
  const toggleScoreVisible = useStore((state) => state.toggleScoreVisible)

  const handleClick = () => {
    toggleScoreVisible()
  }

  return (
    <div style={{ marginTop: '20px' }}>
      <button onClick={handleClick}>toggle scoreboard</button>
    </div>
  )
}

export default Actions
