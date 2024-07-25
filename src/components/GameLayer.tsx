import { useQuery } from '@tanstack/react-query'
import { useEffect } from 'react'
import apiClient from '../util/api'
import { GameData } from '../util/types'

const fetchDrones = async () => {
  const response = await apiClient.get(`/api/drones`)
  return response.data
}

const fetchPackages = async () => {
  const response = await apiClient.get(`/api/package`)
  return response.data
}

type GameLayerProps = {
  initialData: GameData
}

const GameLayer = ({ initialData }: GameLayerProps) => {
  const drones = useQuery({
    queryKey: ['drones'],
    queryFn: fetchDrones,
  })
  const packages = useQuery({
    queryKey: ['packages'],
    queryFn: fetchPackages,
  })
  useEffect(() => console.log(drones.data, packages.data), [drones, packages])

  return (
    <div
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {initialData.map((row, index) => (
        <div key={index} style={{ display: 'flex' }}>
          {row.map((tile, index) => (
            <div
              key={index}
              style={{
                padding: '5px',
                width: '30px',
                height: '30px',
                border: '1px solid red',
              }}
            >
              <span>{tile ? 'T' : ''}</span>
            </div>
          ))}
        </div>
      ))}
    </div>
  )
}

export default GameLayer
