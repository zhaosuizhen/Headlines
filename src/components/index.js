import navList from './home/navList'
import Header from './home/header'
import Bread from './bread/bread-crumb'

export default {
  install (Vue) {
    Vue.component('navList', navList)
    Vue.component('Header', Header)
    Vue.component('Bread', Bread)
  }
}
