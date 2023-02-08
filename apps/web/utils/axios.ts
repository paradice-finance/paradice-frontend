import axios from 'axios'

export const axiosClient = axios.create({
  baseURL: `http://localhost:5500/api`,
  headers: { 'Content-Type': 'application/json' },
});