// 先引入axios
import axios from '@/interceptor/request'
import { API_LOGIN } from '@/constant/API'
export let login = (loginForm) => {
  return axios({
    url: API_LOGIN,
    method: 'post',
    data: loginForm
  })
}
