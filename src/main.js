import Vue from 'vue'
import App from './App.vue'
import router from './router'
import Components from './components'
import ElementUi from 'element-ui'
import VueWechatTitle from 'vue-wechat-title'
import axios from './interceptor/request'

import 'element-ui/lib/theme-chalk/index.css'
import './styles/index.less'

import './permission'

Vue.use(ElementUi)
Vue.use(VueWechatTitle)
Vue.use(Components)

Vue.prototype.$axios = axios

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
