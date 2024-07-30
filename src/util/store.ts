import { create, StateCreator } from 'zustand'
import { devtools } from 'zustand/middleware'
import { MapCoordinates, MapSize } from './types'

interface VisibilitySlice {
  scoreVisible: boolean
  setScoreVisible: (value: boolean) => void
  toggleScoreVisible: () => void
}

interface GameSlice {
  width: number
  height: number
  setMapSize: (size: MapSize) => void
  currentDrone: MapCoordinates | null
  setCurrentDrone: (drone: MapCoordinates | null) => void
  currentPackageId: string | null
  setCurrentPackageId: (key: string | null) => void
}

const createVisibilitySlice: StateCreator<
  VisibilitySlice & GameSlice,
  [['zustand/devtools', never]],
  [],
  VisibilitySlice
> = (set) => ({
  scoreVisible: false,
  setScoreVisible: (value) => set(() => ({ scoreVisible: value })),
  toggleScoreVisible: () =>
    set((state) => ({ scoreVisible: !state.scoreVisible })),
})

const createGameSlice: StateCreator<
  VisibilitySlice & GameSlice,
  [['zustand/devtools', never]],
  [],
  GameSlice
> = (set) => ({
  width: 0,
  height: 0,
  setMapSize: (size) => set(() => ({ width: size.width, height: size.height })),
  currentDrone: null,
  setCurrentDrone: (drone) => set(() => ({ currentDrone: drone })),
  currentPackageId: null,
  setCurrentPackageId: (key) => set(() => ({ currentPackageId: key })),
})

const useBoundStore = create<VisibilitySlice & GameSlice>()(
  devtools(
    (...a) => ({
      ...createVisibilitySlice(...a),
      ...createGameSlice(...a),
    }),
    { name: 'bound-store' }
  )
)

export default useBoundStore
