import { useQuery } from '@tanstack/react-query'
import { useMemo } from 'react'
import apiClient from '../util/api'
import { InitialMap, MapData, MapElement } from '../util/types'
import MapTile from './MapTile'

const fetchMap = async (): Promise<MapData> => {
  const response = await apiClient.get(`/api/map`)
  return response.data
}

const Map = () => {
  const { isLoading, isError, error, data } = useQuery({
    queryKey: ['map'],
    queryFn: fetchMap,
  })

  const initialMap: InitialMap = useMemo(() => {
    if (data) {
      const defaultTile: MapElement = {
        key: null,
        type: 'empty',
      }
      const map: InitialMap = [...Array(data.height)].map(() =>
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
  }, [data])

  return (
    <>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          border: '1px solid',
        }}
      >
        {initialMap.map((row, index) => (
          <div key={index} style={{ display: 'flex' }}>
            {row.map((tile, index) => (
              <MapTile type={tile.type} key={index} />
            ))}
          </div>
        ))}
      </div>
      {isError && <p>{error.message}</p>}
      {isLoading && <p>loading</p>}
    </>
  )
}

export default Map
