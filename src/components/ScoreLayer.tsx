import { useQuery } from '@tanstack/react-query'
import { useEffect } from 'react'
import apiClient from '../util/api'
import useStore from '../util/store'
import { ScoreBoardData } from '../util/types'

const fetchScore = async (): Promise<ScoreBoardData> => {
  const response = await apiClient.get(`/api/scoreboard`)
  return response.data
}

const ScoreLayer = () => {
  const setScoreVisible = useStore((state) => state.setScoreVisible)

  const score = useQuery({
    queryKey: ['score'],
    queryFn: fetchScore,
  })

  const handleClick = () => {
    setScoreVisible(false)
  }

  useEffect(() => {
    console.log(score.data)
  }, [score])

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
        background: 'darkgrey',
      }}
    >
      <p>Score Board</p>
      {score.data && (
        <ul style={{ textAlign: 'left' }}>
          <li>Moves: {score.data.moves}</li>
          <li>Drones used: {score.data.dronesUsed}</li>
          <li>Delivered packages: {score.data.deliveredPackages}</li>
          <li>Destroyed packages: {score.data.destoryedPackages}</li>
        </ul>
      )}
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
