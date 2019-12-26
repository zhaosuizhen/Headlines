import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/login'),
    meta: {
      title: '饿了头条--登录'
    }
  },
  {
    path: '/home',
    name: 'Home',
    component: () => import('@/views/home'),
    meta: {
      title: '饿了头条--主页'
    },
    children: [
      {
        path: '',
        component: () => import('@/views/home/homePage/homePage'),
        meta: {
          title: '饿了头条--主页'
        }
      },
      {
        path: 'comment_list',
        component: () => import('@/views/home/comment/comment_list'),
        meta: {
          title: '饿了头条--评论列表'
        }
      },
      {
        path: 'material_mag',
        component: () => import('@/views/home/material/material_mag'),
        meta: {
          title: '饿了头条--素材管理'
        }
      },
      {
        path: 'mounted_list',
        component: () => import('@/views/home/content/content_list'),
        meta: {
          title: '饿了头条--内容管理'
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
