import axios from '@/interceptor/request'
import { API_GET_ARTICLES } from '@/constant/API'

export let publishBtn = (method, url, params, data) => {
  return axios({
    method,
    url,
    params,
    data
  })
}

export let getContentByID = (id) => {
  return axios({
    url: API_GET_ARTICLES + '/' + id
  })
}
