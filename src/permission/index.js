import router from '../router'

router.beforeEach((to, from, next) => {
  if (/^\/home/.test(to.path)) {
    if (window.localStorage.getItem('user_token')) {
      next()
    } else {
      next('/login')
    }
  } else {
    next()
  }
})
