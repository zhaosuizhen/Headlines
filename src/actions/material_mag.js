import axios from '@/interceptor/request'
import { API_GET_IMG_LIST } from '@/constant/API'

export let getImgList = (params) => {
  return axios({
    url: API_GET_IMG_LIST,
    params
  })
}

export let collectionImg = (id, data) => {
  return axios({
    method: 'put',
    url: API_GET_IMG_LIST + '/' + id,
    data
  })
}

export let deleteImg = (id) => {
  return axios({
    method: 'delete',
    url: API_GET_IMG_LIST + '/' + id
  })
}

export let uploadImg = (data) => {
  return axios({
    method: 'post',
    url: API_GET_IMG_LIST,
    data
  })
}
