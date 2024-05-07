// 路由守卫
import router from './index'
import store from '@/store'

// 白名单 用户未登录也能访问的页面
const whiteList = ['/login']
router.beforeEach((to, from, next) => {
  if (store.getters.token) {
    if (to.path === '/login') {
      next('/')
    } else {
      next()
    }
  } else {
    if (whiteList.includes(to.path)) {
      next()
    } else {
      next('/login')
    }
  }
})
