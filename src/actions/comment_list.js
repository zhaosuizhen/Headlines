import axios from '@/interceptor/request'
import { API_GET_COMMENT, API_CHANGE_COMMENT_STATUS } from '@/constant/API'

export let getComment = (params) => {
  return axios({
    url: API_GET_COMMENT,
    params
  })
}

export let changeCommentStatus = (params, data) => {
  return axios({
    url: API_CHANGE_COMMENT_STATUS,
    method: 'put',
    params,
    data
  })
}
