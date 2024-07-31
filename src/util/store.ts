import { create, StateCreator } from 'zustand'
import { devtools } from 'zustand/middleware'
import { CurrentDrone, CurrentPackage, MapSize } from './types'

interface VisibilitySlice {
  scoreVisible: boolean
  setScoreVisible: (value: boolean) => void
  toggleScoreVisible: () => void
}

interface GameSlice {
  width: number
  height: number
  setMapSize: (size: MapSize) => void
  currentDrone: CurrentDrone | null
  setCurrentDrone: (drone: CurrentDrone | null) => void
  currentPackage: CurrentPackage | null
  setCurrentPackage: (data: CurrentPackage | null) => void
  removeDroneAndPackage: () => void
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
  currentPackage: null,
  setCurrentPackage: (data) => set(() => ({ currentPackage: data })),
  removeDroneAndPackage: () =>
    set(() => ({ currentDrone: null, currentPackage: null })),
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
