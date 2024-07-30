import { useQuery } from '@tanstack/react-query'
import { useEffect, useMemo } from 'react'
import apiClient from '../util/api'
import useStore from '../util/store'
import {
  DronesData,
  GameData,
  GameElement,
  GameMap,
  MapData,
  MapElement,
  PackagesData,
} from '../util/types'
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
  const setCurrentPackageId = useStore((state) => state.setCurrentPackageId)
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
        const droneData = {
          key: activeDrone.key,
          location: activeDrone.location,
        }
        setCurrentDrone(droneData)
      }
    }
  }, [drones, setCurrentDrone])

  useEffect(() => {
    if (packages.data) {
      const activePackage = packages.data.find(
        (item) => item.packageStatus === 0
      )
      if (activePackage) setCurrentPackageId(activePackage.key)
    }
  }, [packages, setCurrentPackageId])

  const gameMap: GameMap = useMemo(() => {
    const { data } = map
    if (data) {
      const defaultTile: MapElement = {
        key: null,
        type: 'empty',
      }
      const newMap: GameMap = [...Array(data.height)].map(() =>
        [...Array(data.width)].map(() => defaultTile)
      )
      data.dropZones.forEach((elem) => {
        const x = elem.location.xCoordinate
        const y = elem.location.yCoordinate
        newMap[y][x] = {
          key: elem.key,
          type: 'dropZone',
        }
      })
      data.safeZones.forEach((elem) => {
        const x = elem.location.xCoordinate
        const y = elem.location.yCoordinate
        newMap[y][x] = {
          key: elem.key,
          type: 'safeZone',
        }
      })
      data.skyScrapers.forEach((elem) => {
        const x = elem.location.xCoordinate
        const y = elem.location.yCoordinate
        newMap[y][x] = {
          key: elem.key,
          type: 'skyScraper',
        }
      })

      return newMap
    }
    return []
  }, [map])

  const initialGameData: GameData = useMemo(() => {
    const defaultElement: GameElement = {
      droneType: null,
      droneData: null,
      packageType: null,
      packageData: null,
      destination: false,
    }
    const newMap: GameData = [...Array(height)].map(() =>
      [...Array(width)].map(() => defaultElement)
    )
    return newMap
  }, [width, height])

  const gameData: GameData = useMemo(() => {
    const gameData = initialGameData
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
              packageType: elem.packageType ? 'packageSensitive' : 'package',
              packageData: elem,
            }

            const destinationX = elem.destination.xCoordinate
            const destinationY = elem.destination.yCoordinate

            gameData[destinationY][destinationX] = {
              ...gameData[destinationY][destinationX],
              destination: true,
            }
          }
        })
      }
    }
    return gameData
  }, [initialGameData, drones, packages])

  return (
    <div style={{ border: '1px solid', position: 'relative' }}>
      <MapLayer gameMap={gameMap} />
      <GameLayer gameData={gameData} />
      {scoreVisible && <ScoreLayer />}
    </div>
  )
}

export default Game
