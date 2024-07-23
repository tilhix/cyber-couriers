import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import './App.css'
import Map from './components/Map'

const queryClient = new QueryClient()

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Map />
    </QueryClientProvider>
  )
}

export default App
