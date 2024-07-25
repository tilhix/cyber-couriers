import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import './App.css'
import Game from './components/Game'

const queryClient = new QueryClient()

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Game />
    </QueryClientProvider>
  )
}

export default App
