import axios from 'axios'

const apiURL = import.meta.env.VITE_API_URL || 'http://localhost:8080'

const apiClient = axios.create({
  baseURL: apiURL,
  headers: {
    'Content-type': 'application/json',
  },
})

export default apiClient;