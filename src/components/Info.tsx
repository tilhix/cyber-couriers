import useStore from '../util/store'

const Info = () => {
  const currentDrone = useStore((state) => state.currentDrone)
  const currentPackage = useStore((state) => state.currentPackage)

  return (
    <div>
      <h1>Cyber Couriers</h1>
      {currentDrone && <p>Drone: {currentDrone.key}</p>}
      {currentPackage && <p>Package: {currentPackage.key}</p>}
    </div>
  )
}

export default Info
