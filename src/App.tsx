import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import './App.css'
import Actions from './components/Actions'
import Game from './components/Game'

const queryClient = new QueryClient()

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Game />
      <Actions />
    </QueryClientProvider>
  )
}

export default App
