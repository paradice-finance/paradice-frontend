import axios from 'axios'

export const axiosClient = axios.create({
  baseURL:  process.env.PARADICE_BACKEND_URL || `http://localhost:5500/api`,
  headers: { 'Content-Type': 'application/json' },
});