import { useQuery } from '@tanstack/react-query'
import { useMemo } from 'react'
import apiClient from '../util/api'
import useStore from '../util/store'
import { GameData, GameMap, MapData, MapElement } from '../util/types'
import ControlLayer from './ControlLayer'
import GameLayer from './GameLayer'
import MapLayer from './MapLayer'
import ScoreLayer from './ScoreLayer'

const fetchMap = async (): Promise<MapData> => {
  const response = await apiClient.get(`/api/map`)
  return response.data
}

const Game = () => {
  const controlsVisible = useStore((state) => state.controlsVisible)
  const scoreVisible = useStore((state) => state.scoreVisible)
  const started = useStore((state) => state.started)

  const map = useQuery({
    queryKey: ['map'],
    queryFn: fetchMap,
  })

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
