import { useQuery } from '@tanstack/react-query'
import apiClient from '../util/api'
import { ScoreBoardData } from '../util/types'

const fetchScore = async (): Promise<ScoreBoardData> => {
  const response = await apiClient.get(`/api/scoreboard`)
  return response.data
}

const ScoreLayer = () => {
  const score = useQuery({
    queryKey: ['score'],
    queryFn: fetchScore,
  })

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
      <p>Score Board</p>
      {score.data && (
        <ul style={{ textAlign: 'left' }}>
          <li>Moves: {score.data.moves}</li>
          <li>Drones used: {score.data.dronesUsed}</li>
          <li>Delivered packages: {score.data.deliveredPackages}</li>
          <li>Destroyed packages: {score.data.destoryedPackages}</li>
        </ul>
      )}
    </div>
  )
}

export default ScoreLayer
