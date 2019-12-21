import navList from './home/navList'
import Header from './home/header'

export default {
  install (Vue) {
    Vue.component('navList', navList)
    Vue.component('Header', Header)
  }
}
