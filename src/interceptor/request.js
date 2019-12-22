import axios from 'axios'
import router from '../router'
import { Message } from 'element-ui'

axios.interceptors.request.use(config => {
  let token = window.localStorage.getItem('user_token')
  config.headers.Authorization = `Bearer ${token}`
  return config
}, error => {
  return Promise.reject(error)
})

axios.interceptors.response.use(response => {
  return response.data ? response.data : response
}, error => {
  let status = error.response.status
  let message = ''
  switch (status) {
    case 400:
      message = '请求参数错误'
      break
    case 401:
      window.localStorage.removeItem('user_token')
      router.push('/login')
      break
    case 403:
      message = '没有权限'
      break
  }
  Message({
    type: 'warning',
    message
  })
  return Promise.reject(error)
})

export default axios
