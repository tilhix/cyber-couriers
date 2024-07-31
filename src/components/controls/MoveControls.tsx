import { useMutation, useQueryClient } from '@tanstack/react-query'
import apiClient, { checkApiError } from '../../util/api'
import useStore from '../../util/store'
import { LocationType } from '../../util/types'

const moveDrone = async (variables: { id: string; location: LocationType }) => {
  const { id, location } = variables
  const response = await apiClient.put(`/api/drones/${id}`, location)
  return response.data
}

const MoveControls = () => {
  const queryClient = useQueryClient()

  const currentDrone = useStore((state) => state.currentDrone)
  const width = useStore((state) => state.width)
  const height = useStore((state) => state.height)

  const moveMutation = useMutation({
    mutationFn: moveDrone,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['drones'] })
    },
  })

  const handleMove = async (direction: string) => {
    if (currentDrone) {
      try {
        const x = currentDrone.location.xCoordinate
        const y = currentDrone.location.yCoordinate
        let newXCoordinate
        let newYCoordinate

        switch (direction) {
          case 'left':
            newXCoordinate = x - 1 >= 0 ? x - 1 : null
            break
          case 'right':
            newXCoordinate = x + 1 < width ? x + 1 : null
            break
          case 'up':
            newYCoordinate = y - 1 >= 0 ? y - 1 : null
            break
          case 'down':
            newYCoordinate = y + 1 < height ? y + 1 : null
            break
          default:
            break
        }

        const newLocation = {
          ...currentDrone.location,
          ...(newXCoordinate != null && { xCoordinate: newXCoordinate }),
          ...(newYCoordinate != null && { yCoordinate: newYCoordinate }),
        }

        const variables = { id: currentDrone.key, location: newLocation }
        if (newXCoordinate != null || newYCoordinate != null) {
          await moveMutation.mutateAsync(variables)
        }
      } catch (error) {
        const errorInfo = checkApiError(error)
        console.log(errorInfo)
      }
    }
  }

  return (
    <>
      <button onClick={() => handleMove('left')}>left</button>
      <button onClick={() => handleMove('up')}>up</button>
      <button onClick={() => handleMove('right')}>right</button>
      <button onClick={() => handleMove('down')}>down</button>
    </>
  )
}

export default MoveControls
