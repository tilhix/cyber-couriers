import { useMutation, useQueryClient } from '@tanstack/react-query'
import apiClient, { checkApiError } from '../../util/api'
import useStore from '../../util/store'
import { RunnerDroneData } from '../../util/types'

const deleteDrone = async (id: string) => {
  const response = await apiClient.delete(`/api/drones/${id}`)
  return response.data
}

const addDrone = async (): Promise<RunnerDroneData> => {
  const response = await apiClient.post(`/api/drones`)
  return response.data
}

const ElementControls = () => {
  const queryClient = useQueryClient()
  const currentDrone = useStore((state) => state.currentDrone)
  const removeDroneAndPackage = useStore((state) => state.removeDroneAndPackage)

  const deleteMutation = useMutation({
    mutationFn: deleteDrone,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['drones'] })
      queryClient.invalidateQueries({ queryKey: ['packages'] })
    },
  })

  const addDroneMutation = useMutation({
    mutationFn: addDrone,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['drones'] })
    },
  })

  const handleDestroy = async () => {
    if (currentDrone) {
      try {
        await deleteMutation.mutateAsync(currentDrone.key)
        if (currentDrone.carriedPackage) {
          removeDroneAndPackage()
        }
      } catch (error) {
        const errorInfo = checkApiError(error)
        console.log(errorInfo)
      }
    }
  }

  const handleAdd = async () => {
    if (!currentDrone) {
      try {
        await addDroneMutation.mutateAsync()
      } catch (error) {
        const errorInfo = checkApiError(error)
        console.log(errorInfo)
      }
    }
  }

  return (
    <>
      {currentDrone && <button onClick={handleDestroy}>destroy drone</button>}
      {!currentDrone && <button onClick={handleAdd}>add drone</button>}
    </>
  )
}

export default ElementControls
