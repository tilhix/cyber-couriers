import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import './App.css'
import Controls from './components/controls/Controls'
import Game from './components/game/Game'
import Info from './components/Info'

const queryClient = new QueryClient()

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Info />
      <Game />
      <Controls />
    </QueryClientProvider>
  )
}

export default App
