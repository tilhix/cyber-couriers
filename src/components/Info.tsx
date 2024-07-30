import useStore from '../util/store'

const Info = () => {
  const currentDrone = useStore((state) => state.currentDrone)
  const currentPackageId = useStore((state) => state.currentPackageId)

  return (
    <div>
      {currentDrone && (
        <>
          <p>Drone ID: {currentDrone?.key}</p>
          <p>
            X: {currentDrone.location.xCoordinate}, Y:{' '}
            {currentDrone.location.yCoordinate}
          </p>
        </>
      )}

      <p>Current package: {currentPackageId}</p>
    </div>
  )
}

export default Info
