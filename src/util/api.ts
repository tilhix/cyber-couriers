import axios, { AxiosError } from 'axios'

const apiURL = import.meta.env.VITE_API_URL || 'http://localhost:8000'

const apiClient = axios.create({
  baseURL: apiURL,
  headers: {
    'Content-type': 'application/json',
  },
})

export const checkApiError = (error: Error | AxiosError) => {
  if (axios.isAxiosError(error) && error.response) {
    return error.response.data
  }
  return error.message
}

export default apiClient
