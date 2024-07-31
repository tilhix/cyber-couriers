import { useMutation, useQueryClient } from '@tanstack/react-query'
import apiClient, { checkApiError } from '../../util/api'
import useStore from '../../util/store'

const pickPackage = async (variables: { id: string; packageId: string }) => {
  const { id, packageId } = variables
  const response = await apiClient.put(
    `/api/courier/${id}?packageId=${packageId}`
  )
  return response.data
}

const PackageControls = () => {
  const queryClient = useQueryClient()
  const currentDrone = useStore((state) => state.currentDrone)
  const currentPackage = useStore((state) => state.currentPackage)

  const pickPackageMutation = useMutation({
    mutationFn: pickPackage,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['drones'] })
      queryClient.invalidateQueries({ queryKey: ['packages'] })
    },
  })

  const handlePickUp = async () => {
    if (currentDrone && currentPackage) {
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

  return (
    <>
      <button onClick={handlePickUp}>pick up</button>
      {/* <button onClick={handleEject}>eject</button>
      <button onClick={handleDeliver}>eject</button> */}
    </>
  )
}

export default PackageControls
