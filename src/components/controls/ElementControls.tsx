import { useMutation, useQueryClient } from '@tanstack/react-query'
import apiClient, { checkApiError } from '../../util/api'
import useStore from '../../util/store'
import { PackageData, RunnerDroneData } from '../../util/types'

const deleteDrone = async (id: string) => {
  const response = await apiClient.delete(`/api/drones/${id}`)
  return response.data
}

const addDrone = async (): Promise<RunnerDroneData> => {
  const response = await apiClient.post(`/api/drones`)
  return response.data
}

const addPackage = async (): Promise<PackageData> => {
  const response = await apiClient.post(`/api/package`)
  return response.data
}

const ElementControls = () => {
  const queryClient = useQueryClient()
  const currentDrone = useStore((state) => state.currentDrone)
  const setCurrentDrone = useStore((state) => state.setCurrentDrone)
  const currentPackage = useStore((state) => state.currentPackage)
  const setCurrentPackage = useStore((state) => state.setCurrentPackage)

  const deleteMutation = useMutation({
    mutationFn: deleteDrone,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['drones'] })
    },
  })

  const addDroneMutation = useMutation({
    mutationFn: addDrone,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['drones'] })
    },
  })

  const addPackageMutation = useMutation({
    mutationFn: addPackage,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['packages'] })
    },
  })

  const handleDestroy = async () => {
    if (currentDrone) {
      try {
        await deleteMutation.mutateAsync(currentDrone.key)
        setCurrentDrone(null)
      } catch (error) {
        const errorInfo = checkApiError(error)
        console.log(errorInfo)
      }
    }
  }

  const addNewDrone = async () => {
    if (!currentDrone) {
      const drone = await addDroneMutation.mutateAsync()
      const droneData = {
        key: drone.key,
        location: drone.location,
        carriedPackage: null,
      }
      setCurrentDrone(droneData)
    }
  }

  const addNewPackage = async () => {
    if (!currentPackage) {
      const newPackage = await addPackageMutation.mutateAsync()
      const packageData = {
        key: newPackage.key,
        location: newPackage.location,
      }
      setCurrentPackage(packageData)
    }
  }

  const handleAdd = async () => {
    try {
      await addNewDrone()
      await addNewPackage()
    } catch (error) {
      const errorInfo = checkApiError(error)
      console.log(errorInfo)
    }
  }

  return (
    <>
      {currentDrone && <button onClick={handleDestroy}>destroy</button>}
      {(!currentDrone || !currentPackage) && (
        <button onClick={handleAdd}>add</button>
      )}
    </>
  )
}

export default ElementControls
