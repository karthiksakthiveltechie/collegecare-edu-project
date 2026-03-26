import axios from 'axios'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api'

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 5000, // 5 second timeout
})

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Response interceptor to handle errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Only redirect on 401 if not already on login/signup page
    if (error.response?.status === 401) {
      localStorage.removeItem('token')
      const currentPath = window.location.pathname
      if (currentPath !== '/login' && currentPath !== '/signup') {
        window.location.href = '/login'
      }
    }
    // Don't throw network errors that might block rendering
    if (error.code === 'ECONNABORTED' || error.message === 'Network Error') {
      console.warn('API request failed:', error.message)
    }
    return Promise.reject(error)
  }
)
