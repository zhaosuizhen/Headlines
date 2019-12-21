import Vue from 'vue'
import VueRouter from 'vue-router'

import Login from '../views/login'
import Home from '../views/home'
import HomePage from '../views/home/homePage/homePage'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta: {
      title: '饿了头条--登录'
    }
  },
  {
    path: '/home',
    name: 'Home',
    component: Home,
    meta: {
      title: '饿了头条--主页'
    },
    children: [
      {
        path: '',
        component: HomePage,
        meta: {
          title: '饿了头条--主页'
        }
      }
    ]
  }
  // {
  //   path: '/about',
  //   name: 'about',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  // }
]

const router = new VueRouter({
  routes
})

export default router
