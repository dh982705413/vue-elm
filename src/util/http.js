import axios from 'axios'
import { Indicator } from 'mint-ui'

const http = axios.create({
  baseURL: process.env.VUE_APP_BASE_API
})

http.interceptors.request.use(
  config => {
    Indicator.open('加载中..')
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

http.interceptors.response.use(
  res => {
    Indicator.close()
    return res.data
  },
  error => {
    Indicator.close()
    return Promise.reject(error)
  }
)

export default http
