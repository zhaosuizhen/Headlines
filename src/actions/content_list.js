import axios from '@/interceptor/request'
import { API_GET_ARTICLES, API_GET_CHANNELS } from '@/constant/API'

export let getArticles = (params) => {
  return axios({
    url: API_GET_ARTICLES,
    params
  })
}

export let getChannels = () => {
  return axios({
    url: API_GET_CHANNELS
  })
}

export let delArticles = (id) => {
  return axios({
    method: 'delete',
    url: API_GET_ARTICLES + '/' + id.toString()
  })
}
