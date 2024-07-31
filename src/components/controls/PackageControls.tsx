import { useMutation, useQueryClient } from '@tanstack/react-query'
import apiClient, { checkApiError } from '../../util/api'
import useStore from '../../util/store'
import { PackageData } from '../../util/types'

const pickPackage = async (variables: { id: string; packageId: string }) => {
  const { id, packageId } = variables
  const response = await apiClient.put(
    `/api/courier/${id}?packageId=${packageId}`
  )
  return response.data
}

const ejectPackage = async (id: string) => {
  const response = await apiClient.delete(`/api/courier/${id}`)
  return response.data
}

const deliverPackage = async (id: string) => {
  const response = await apiClient.post(`/api/courier/${id}`)
  return response.data
}

const addPackage = async (): Promise<PackageData> => {
  const response = await apiClient.post(`/api/package`)
  return response.data
}

const PackageControls = () => {
  const queryClient = useQueryClient()
  const currentDrone = useStore((state) => state.currentDrone)
  const currentPackage = useStore((state) => state.currentPackage)
  const setCurrentPackage = useStore((state) => state.setCurrentPackage)

  const pickPackageMutation = useMutation({
    mutationFn: pickPackage,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['drones'] })
      queryClient.invalidateQueries({ queryKey: ['packages'] })
    },
  })

  const ejectPackageMutation = useMutation({
    mutationFn: ejectPackage,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['drones'] })
      queryClient.invalidateQueries({ queryKey: ['packages'] })
    },
  })

  const deliverPackageMutation = useMutation({
    mutationFn: deliverPackage,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['drones'] })
      queryClient.invalidateQueries({ queryKey: ['packages'] })
    },
  })

  const addPackageMutation = useMutation({
    mutationFn: addPackage,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['packages'] })
    },
  })

  const verifyPickup = () => {
    if (!currentDrone || currentDrone.carriedPackage || !currentPackage)
      return false
    const first = currentDrone.location
    const second = currentPackage.location
    return (
      first.xCoordinate === second.xCoordinate &&
      first.yCoordinate === second.yCoordinate
    )
  }

  const canPickup = verifyPickup()
  const handlePickUp = async () => {
    if (currentDrone && currentPackage && canPickup) {
      try {
        const variables = {
          id: currentDrone.key,
          packageId: currentPackage.key,
        }
        await pickPackageMutation.mutateAsync(variables)
      } catch (error) {
        const errorInfo = checkApiError(error)
        console.log(errorInfo)
      }
    }
  }

  const canEject = currentDrone && currentDrone.carriedPackage
  const handleEject = async () => {
    if (canEject) {
      try {
        await ejectPackageMutation.mutateAsync(currentDrone.key)
      } catch (error) {
        const errorInfo = checkApiError(error)
        console.log(errorInfo)
      }
    }
  }

  const verifyDeliver = () => {
    if (!currentDrone || !currentDrone.carriedPackage || !currentPackage)
      return false
    const first = currentDrone.location
    const second = currentPackage.destination
    return (
      first.xCoordinate === second.xCoordinate &&
      first.yCoordinate === second.yCoordinate
    )
  }

  const canDeliver = verifyDeliver()
  const handleDeliver = async () => {
    if (currentDrone && canDeliver) {
      try {
        await deliverPackageMutation.mutateAsync(currentDrone.key)
        setCurrentPackage(null)
      } catch (error) {
        const errorInfo = checkApiError(error)
        console.log(errorInfo)
      }
    }
  }

  const handleAdd = async () => {
    if (!currentPackage) {
      try {
        await addPackageMutation.mutateAsync()
      } catch (error) {
        const errorInfo = checkApiError(error)
        console.log(errorInfo)
      }
    }
  }

  return (
    <>
      {!currentPackage && <button onClick={handleAdd}>add package</button>}
      {canPickup && <button onClick={handlePickUp}>pick up</button>}
      {canEject && <button onClick={handleEject}>eject</button>}
      {canDeliver && <button onClick={handleDeliver}>deliver</button>}
    </>
  )
}

export default PackageControls
