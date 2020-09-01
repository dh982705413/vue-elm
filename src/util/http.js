import axios from 'axios'

const http = axios.create({
  baseURL: process.env.VUE_APP_BASE_API
})

http.interceptors.request.use(
  config => config,
  error => {
    return Promise.reject(error)
  }
)

http.interceptors.response.use(
  res => res.data,
  error => {
    return Promise.reject(error)
  }
)

export default http
