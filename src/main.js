import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUi from 'element-ui'
import VueWechatTitle from 'vue-wechat-title'
import axios from 'axios'

import 'element-ui/lib/theme-chalk/index.css'
import './styles/index.less'

Vue.use(ElementUi)
Vue.use(VueWechatTitle)

axios.defaults.baseURL = 'http://ttapi.research.itcast.cn/mp/v1_0'
Vue.prototype.$axios = axios

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
