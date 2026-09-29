import axios from 'axios'
import { useAuthStore } from '@/stores/auth'

const http = axios.create({ baseURL: import.meta.env.VITE_API_URL })

http.interceptors.request.use((config) => {
  const auth = useAuthStore()
  if (auth.token) {
    config.headers.Authorization = `Bearer ${auth.token}`
    console.log('JWT en request:', config.method?.toUpperCase(), config.url, auth.token)
  }
  return config
})

http.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      useAuthStore().logout()
      window.location.href = '/login'
    }
    return Promise.reject(error)
  },
)

export default http