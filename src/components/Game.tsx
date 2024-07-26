import { useQuery } from '@tanstack/react-query'
import { useEffect, useMemo } from 'react'
import apiClient from '../util/api'
import useStore from '../util/store'
import {
  DronesData,
  GameData,
  GameMap,
  MapData,
  MapElement,
  PackagesData,
} from '../util/types'
import ControlLayer from './ControlLayer'
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
  const controlsVisible = useStore((state) => state.controlsVisible)
  const scoreVisible = useStore((state) => state.scoreVisible)
  const started = useStore((state) => state.started)
  const setCurrentDroneId = useStore((state) => state.setCurrentDroneId)
  const setCurrentPackageId = useStore((state) => state.setCurrentPackageId)

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
    if (drones.data) {
      console.log('drones:', drones.data)
      const activeDrone = drones.data.runnerDrones.find(
        (drone) => drone.status === 0
      )
      if (activeDrone) setCurrentDroneId(activeDrone.key)
    }
  }, [drones, setCurrentDroneId])

  useEffect(() => {
    if (packages.data) {
      console.log('packages:', packages.data)
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
      const map: GameMap = [...Array(data.height)].map(() =>
        [...Array(data.width)].map(() => defaultTile)
      )
      data.dropZones.forEach((elem) => {
        const x = elem.location.xCoordinate
        const y = elem.location.yCoordinate
        map[y][x] = {
          key: elem.key,
          type: 'dropZone',
        }
      })
      data.safeZones.forEach((elem) => {
        const x = elem.location.xCoordinate
        const y = elem.location.yCoordinate
        map[y][x] = {
          key: elem.key,
          type: 'safeZone',
        }
      })
      data.skyScrapers.forEach((elem) => {
        const x = elem.location.xCoordinate
        const y = elem.location.yCoordinate
        map[y][x] = {
          key: elem.key,
          type: 'skyScraper',
        }
      })

      return map
    }
    return []
  }, [map])

  const initialGameData: GameData = useMemo(() => {
    const { data } = map
    if (data) {
      const map: GameData = [...Array(data.height)].map(() =>
        [...Array(data.width)].map(() => null)
      )
      return map
    }
    return []
  }, [map])

  return (
    <div style={{ border: '1px solid', position: 'relative' }}>
      <MapLayer gameMap={gameMap} />
      {started && <GameLayer initialData={initialGameData} />}
      {controlsVisible && <ControlLayer />}
      {scoreVisible && <ScoreLayer />}
      {map.isError && <p>{map.error.message}</p>}
      {map.isLoading && <p>loading</p>}
    </div>
  )
}

export default Game
