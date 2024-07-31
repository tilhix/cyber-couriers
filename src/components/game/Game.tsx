import { useQuery } from '@tanstack/react-query'
import { useCallback, useEffect, useMemo } from 'react'
import apiClient from '../../util/api'
import useStore from '../../util/store'
import {
  DronesData,
  GameElement,
  MapData,
  MapElement,
  PackagesData,
} from '../../util/types'
import GameLayer from './GameLayer'
import MapLayer from './MapLayer'
import ScoreLayer from './ScoreLayer'

const fetchMap = async (): Promise<MapData> => {
  const response = await apiClient.get(`/api/map`)
  return response.data
}

const fetchDrones = async (): Promise<DronesData> => {
  const response = await apiClient.get(`/api/drones`)
  return response.data
}

const fetchPackages = async (): Promise<PackagesData> => {
  const response = await apiClient.get(`/api/package`)
  return response.data
}

const Game = () => {
  const scoreVisible = useStore((state) => state.scoreVisible)
  const setCurrentDrone = useStore((state) => state.setCurrentDrone)
  const setCurrentPackage = useStore((state) => state.setCurrentPackage)
  const width = useStore((state) => state.width)
  const height = useStore((state) => state.height)
  const setMapSize = useStore((state) => state.setMapSize)

  const map = useQuery({
    queryKey: ['map'],
    queryFn: fetchMap,
  })

  const drones = useQuery({
    queryKey: ['drones'],
    queryFn: fetchDrones,
  })

  const packages = useQuery({
    queryKey: ['packages'],
    queryFn: fetchPackages,
  })

  useEffect(() => {
    if (map.data) {
      const size = {
        width: map.data.width,
        height: map.data.height,
      }
      setMapSize(size)
    }
  }, [map, setMapSize])

  useEffect(() => {
    if (drones.data) {
      const activeDrone = drones.data.runnerDrones.find(
        (drone) => drone.status === 0
      )
      if (activeDrone) {
        const carriedPackage = activeDrone.carriedPackage
          ? activeDrone.carriedPackage.key
          : null
        const droneData = {
          key: activeDrone.key,
          location: activeDrone.location,
          carriedPackage,
        }
        setCurrentDrone(droneData)
      }
    }
  }, [drones, setCurrentDrone])

  useEffect(() => {
    if (packages.data) {
      const activePackage = packages.data.find(
        (item) => item.packageStatus === (0 || 2)
      )
      if (activePackage) {
        const packageData = {
          key: activePackage.key,
          location: activePackage.location,
        }
        setCurrentPackage(packageData)
      }
    }
  }, [packages, setCurrentPackage])

  const getInitialMap = useCallback(
    <T extends GameElement | MapElement>(element: T): T[][] => {
      const newMap = [...Array(height)].map(() =>
        [...Array(width)].map(() => element)
      )
      return newMap
    },
    [width, height]
  )

  const gameMap = useMemo(() => {
    const defaultElement: MapElement = {
      key: null,
      type: 'empty',
    }

    const newMap = getInitialMap(defaultElement)
    if (newMap.length > 0) {
      if (map.data) {
        map.data.dropZones.forEach((elem) => {
          const x = elem.location.xCoordinate
          const y = elem.location.yCoordinate
          newMap[y][x] = {
            key: elem.key,
            type: 'dropZone',
          }
        })
        map.data.safeZones.forEach((elem) => {
          const x = elem.location.xCoordinate
          const y = elem.location.yCoordinate
          newMap[y][x] = {
            key: elem.key,
            type: 'safeZone',
          }
        })
        map.data.skyScrapers.forEach((elem) => {
          const x = elem.location.xCoordinate
          const y = elem.location.yCoordinate
          newMap[y][x] = {
            key: elem.key,
            type: 'skyScraper',
          }
        })
      }
      return newMap
    }
    return []
  }, [getInitialMap, map])

  const gameData = useMemo(() => {
    const defaultElement: GameElement = {
      droneType: null,
      droneData: null,
      packageData: null,
      destination: null,
    }

    const gameData = getInitialMap(defaultElement)

    if (gameData.length > 0) {
      if (drones.data) {
        drones.data.runnerDrones.forEach((elem) => {
          if (elem.status === 0) {
            const x = elem.location.xCoordinate
            const y = elem.location.yCoordinate
            gameData[y][x] = {
              ...gameData[y][x],
              droneType: 'runnerDrone',
              droneData: elem,
            }

            if (elem.carriedPackage) {
              const destinationX = elem.carriedPackage.destination.xCoordinate
              const destinationY = elem.carriedPackage.destination.yCoordinate

              gameData[destinationY][destinationX] = {
                ...gameData[destinationY][destinationX],
                destination: elem.carriedPackage.key,
              }
            }
          }
        })
        drones.data.patrolDrones.forEach((elem) => {
          if (elem.status === 0) {
            const x = elem.location.xCoordinate
            const y = elem.location.yCoordinate
            gameData[y][x] = {
              ...gameData[y][x],
              droneType: 'patrolDrone',
              droneData: elem,
            }
          }
        })
      }

      if (packages.data) {
        packages.data.forEach((elem) => {
          if (elem.packageStatus === 0) {
            const x = elem.location.xCoordinate
            const y = elem.location.yCoordinate
            gameData[y][x] = {
              ...gameData[y][x],
              packageData: elem,
            }

            const destinationX = elem.destination.xCoordinate
            const destinationY = elem.destination.yCoordinate

            gameData[destinationY][destinationX] = {
              ...gameData[destinationY][destinationX],
              destination: elem.key,
            }
          }
        })
      }
    }
    return gameData
  }, [getInitialMap, drones, packages])

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <div style={{ border: '1px solid', position: 'relative' }}>
        <MapLayer gameMap={gameMap} />
        <GameLayer gameData={gameData} />
        {scoreVisible && <ScoreLayer />}
      </div>
    </div>
  )
}

export default Game
