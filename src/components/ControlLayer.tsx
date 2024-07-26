import { useMutation, useQueryClient } from '@tanstack/react-query'
import apiClient from '../util/api'
import useStore from '../util/store'
import { PackageData, RunnerDroneData } from '../util/types'

const addDrone = async (): Promise<RunnerDroneData> => {
  const response = await apiClient.post(`/api/drones`)
  return response.data
}

const addPackage = async (): Promise<PackageData> => {
  const response = await apiClient.post(`/api/package`)
  return response.data
}

const ControlLayer = () => {
  const queryClient = useQueryClient()

  const startGame = useStore((state) => state.startGame)
  const setScoreVisible = useStore((state) => state.setScoreVisible)
  const started = useStore((state) => state.started)

  const currentDroneId = useStore((state) => state.currentDroneId)
  const setCurrentDroneId = useStore((state) => state.setCurrentDroneId)
  const currentPackageId = useStore((state) => state.currentPackageId)
  const setCurrentPackageId = useStore((state) => state.setCurrentPackageId)

  const droneMutation = useMutation({
    mutationFn: addDrone,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['drones'] })
    },
  })

  const packageMutation = useMutation({
    mutationFn: addPackage,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['packages'] })
    },
  })

  const addNewDrone = async () => {
    if (!currentDroneId) {
      const drone = await droneMutation.mutateAsync()
      setCurrentDroneId(drone.key)
    }
  }

  const addNewPackage = async () => {
    if (!currentPackageId) {
      const newPackage = await packageMutation.mutateAsync()
      setCurrentPackageId(newPackage.key)
    }
  }

  const handlePlayClick = async () => {
    try {
      await addNewDrone()
      await addNewPackage()
    } catch (error) {
      console.error(error.response)
    } finally {
      startGame()
    }
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
