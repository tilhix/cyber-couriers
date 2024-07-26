import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useEffect } from 'react'
import apiClient from '../util/api'
import useStore from '../util/store'

const deleteDrone = async (id: string) => {
  const response = await apiClient.delete(`/api/drones/${id}`)
  return response.data
}

const Actions = () => {
  const queryClient = useQueryClient()
  const toggleScoreVisible = useStore((state) => state.toggleScoreVisible)

  const currentDroneId = useStore((state) => state.currentDroneId)
  const setCurrentDroneId = useStore((state) => state.setCurrentDroneId)

  const droneMutation = useMutation({
    mutationFn: deleteDrone,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['drones'] })
    },
  })

  const handleClick = () => {
    toggleScoreVisible()
  }

  useEffect(() => {
    console.log('currentDroneId:', currentDroneId)
  }, [currentDroneId])

  const handleDestroy = async () => {
    if (currentDroneId) {
      console.log('drone to destroy', currentDroneId)
      await droneMutation.mutateAsync(currentDroneId)
      setCurrentDroneId(null)
    }
  }

  return (
    <div style={{ marginTop: '20px', display: 'flex', gap: '10px' }}>
      <button onClick={handleClick}>toggle scoreboard</button>
      <button onClick={handleDestroy}>destroy drone</button>
    </div>
  )
}

export default Actions
