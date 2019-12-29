import axios from '@/interceptor/request'
import { API_UPLOAD_USER_PHOTO, API_USER_INFO } from '@/constant/API'

export let uploadImg = (data) => {
  return axios({
    url: API_UPLOAD_USER_PHOTO,
    method: 'patch',
    data
  })
}

export let saveUserInfo = (data) => {
  return axios({
    method: 'patch',
    url: API_USER_INFO,
    data
  })
}

export let getUserInfo = () => {
  return axios({
    url: API_USER_INFO
  })
}
