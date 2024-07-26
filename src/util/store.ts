import { create, StateCreator } from 'zustand'
import { devtools } from 'zustand/middleware'

interface VisibilitySlice {
  controlsVisible: boolean
  setControlsVisible: (value: boolean) => void
  scoreVisible: boolean
  setScoreVisible: (value: boolean) => void
  toggleScoreVisible: () => void
}

interface GameSlice {
  started: boolean
  setStarted: () => void
  currentDroneId: string | null
  setCurrentDroneId: (key: string | null) => void
  currentPackageId: string | null
  setCurrentPackageId: (key: string | null) => void
}

interface SharedSlice {
  startGame: () => void
}

const createVisibilitySlice: StateCreator<
  VisibilitySlice & GameSlice,
  [['zustand/devtools', never]],
  [],
  VisibilitySlice
> = (set) => ({
  controlsVisible: true,
  setControlsVisible: (value) => set(() => ({ controlsVisible: value })),
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
  started: false,
  setStarted: () => set(() => ({ started: true })),
  currentDroneId: null,
  setCurrentDroneId: (key) => set(() => ({ currentDroneId: key })),
  currentPackageId: null,
  setCurrentPackageId: (key) => set(() => ({ currentPackageId: key })),
})

const createSharedSlice: StateCreator<
  VisibilitySlice & GameSlice,
  [['zustand/devtools', never]],
  [],
  SharedSlice
> = (set, get) => ({
  startGame: () => {
    get().setControlsVisible(false)
    get().setStarted()
  },
})

const useBoundStore = create<VisibilitySlice & GameSlice & SharedSlice>()(
  devtools(
    (...a) => ({
      ...createVisibilitySlice(...a),
      ...createGameSlice(...a),
      ...createSharedSlice(...a),
    }),
    { name: 'bound-store' }
  )
)

export default useBoundStore
