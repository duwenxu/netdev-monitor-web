import Vue from 'vue'
import Router from 'vue-router'
import routes from './routers'
import store from '@/store'
import iView from 'view-design'
import {setToken, getToken, canTurnTo, setTitle} from '@/libs/util'
import config from '@/config'

const {homeName} = config

Vue.use(Router)
const createRouter = () => new Router({
  routes,
  // mode: 'history'
})
const router = createRouter()
const LOGIN_PAGE_NAME = 'login'
const LARGE_HOME='/index/large'

const turnTo = (to, access, next) => {
  if (canTurnTo(to.name, access, store.state.app.routers.concat(routes))) next()
  else next({name: 'error_401'})
}

router.beforeEach((to, from, next) => {
 next()
  // const token = getToken()
  // if (!token && to.name !== LOGIN_PAGE_NAME && to.name!== LARGE_HOME) {
  //   console.log('login--------------------')
  //   // 未登录且要跳转的页面不是登录页与大屏展示页
  //   next({
  //     name: LOGIN_PAGE_NAME //跳转到登录页
  //   })
  // } else if (!token && to.name === LOGIN_PAGE_NAME) {
  //   console.log('未登陆且要跳转的页面是登录页--------------------')
  //   // 未登陆且要跳转的页面是登录页
  //   next()// 跳转
  // } else if (token && to.name === LOGIN_PAGE_NAME) {
  //   console.log('已登录且要跳转的页面是登录页--------------------')
  //   // 已登录且要跳转的页面是登录页
  //   next({
  //     name: homeName // 跳转到homeName页
  //   })
  // } else {
  //   //已登录并且跳转的页面不是登录页
  //   //token存储在cookie里，一天过期，所以关闭浏览器后，token还在。从新打开浏览器，默认会自动进入home页,菜单和用户信息存储在session中，关闭浏览器自动失效，
  //   //oldNameMap 缓存在内存中，当再次登录的时候，如果没有刷新页面，会去比对之前添加的oldNameMap, 但是登录的时候要是刷新页面就不会有问题,否则路由name重复
  //   if (store.state.user.hasGetInfo && store.state.app.hasGetRouter) {
  //     console.log('--------------------')
  //     turnTo(to, store.state.user.access, next)
  //   } else {
  //     store.dispatch('getUserInfo').then(user => {
  //       console.log('-11111-------')
  //       // 加载用户菜单
  //       store.dispatch('getRouters').then(routers => {
  //         console.log('-222222-------')
  //         // commonRoutes需要追加到路由解析最后的404，把原先的routers.js中的404删掉即可
  //         router.matcher = createRouter().matcher//解决路由重复
  //         routers.push(
  //           {
  //             path: '*',
  //             name: 'error_404',
  //             meta: {
  //               hideInMenu: true
  //             },
  //             component: () => import('@/view/error-page/404.vue')
  //           }
  //         )
  //         router.addRoutes(routers)
  //
  //         // router.addRoutes(routers.concat([
  //         //   {
  //         //     path: '*',
  //         //     name: 'error_404',
  //         //     meta: {
  //         //       hideInMenu: true
  //         //     },
  //         //     component: () => import('@/view/error-page/404.vue')
  //         //   }
  //         // ]))
  //         next({...to})
  //       })
  //     }).catch(() => {
  //       setToken('')
  //       next({
  //         name: LOGIN_PAGE_NAME
  //       })
  //     })
  //   }
  // }
})

const originalPush = Router.prototype.push
Router.prototype.push = function push(location, onResolve, onReject) {
  if (onResolve || onReject) return originalPush.call(this, location, onResolve, onReject)
  return originalPush.call(this, location).catch(err => err)
}

// router.afterEach(to => {
//   setTitle(to, router.app)
//   iView.LoadingBar.finish()
//   window.scrollTo(0, 0)
// })

export default router

