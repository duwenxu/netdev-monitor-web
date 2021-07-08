import Main from '@/components/main'
import parentView from '@/components/parent-view'

/**
 * xy-admin中meta除了原生参数外可配置的参数:
 * meta: {
 *  title: { String|Number|Function }
 *         显示在侧边栏、面包屑和标签栏的文字
 *         使用'{{ 多语言字段 }}'形式结合多语言使用，例子看多语言的路由配置;
 *         可以传入一个回调函数，参数是当前路由对象，例子看动态路由和带参路由
 *  hideInBread: (false) 设为true后此级路由将不会出现在面包屑中
 *  hideInMenu: (false) 设为true后在左侧菜单不会显示该页面选项
 *  notCache: (false) 设为true后页面在切换标签后不会缓存，如果需要缓存，无需设置这个字段，而且需要设置页面组件name属性和路由配置的name一致
 *  access: (null) 可访问该页面的权限数组，当前路由设置的权限会影响子路由
 *  icon: (-) 该页面在左侧菜单、面包屑和标签导航处显示的图标，如果是自定义图标，需要在图标名称前加下划线'_'
 *  beforeCloseName: (-) 设置该字段，则在关闭当前tab页时会去'@/router/before-close.js'里寻找该字段名对应的方法，作为关闭前的钩子函数
 * }
 */

export default [
  {
    name: 'login',
    path: '/',
    meta: {
      title: 'Login - 登录',
      hideInMenu: true
    },
    component: () => import('@/view/system/login/login.vue')
  },
  {
    //全局刷新
    path: '/back',
    name: 'back',
    component: () => import('@/view/single-page/white.vue')
  },
  /*{
    name: '/index/large',
    path: '/ghome',
    meta: {
      title: '大屏',
      hideInMenu: false
    },
    component: () => import('@/view/single-page/home/largehome.vue')
  },
  {
    name: '/index/ghigh',
    path: '/ghigh',
    meta: {
      title: '大屏新版TC',
      hideInMenu: false
    },
    component: () => import('@/view/single-page/home/ghigh.vue')
  },
  {
    name: '/index/xaghigh',
    path: '/xaghigh',
    meta: {
      title: '大屏新版XA',
      hideInMenu: false
    },
    component: () => import('@/view/single-page/home/xaghigh.vue')
  },*/
  {
    path: '/home',
    name: '_home',
    redirect: '/home',
    component: Main,
    meta: {
      hideInMenu: true,
      notCache: true
    },
    children: [
      {
        path: '/home',
        name: 'home',
        meta: {
          hideInMenu: true,
          title: '首页',
          // notCache: true,
          icon: 'md-home'
        },
        //一类船载拓扑图
        // component: () => import('@/view/single-page/home/ship_device.vue')
        //一类车载（*）
        component: () => import('@/view/single-page/home/WN_device.vue')
        //二类型车__1（*）
        // component: () => import('@/view/single-page/home/second_device.vue')
        //三类车载
        component: () => import('@/view/single-page/home/third_device.vue')
        // 四类车载（*）
        // component: () => import('@/view/single-page/home/forth_device.vue')
        //地面站
        // component: () => import('@/view/single-page/home/highland_device.vue')

        //最早版本
        // component: () => import('@/view/netdev/deviceStatus/status1.vue')
      }
    ]
  },
  {
    path: '/message',
    name: 'message',
    component: Main,
    meta: {
      hideInBread: true,
      hideInMenu: true
    },
    children: [
      {
        path: 'message/page',
        name: 'messageInfo',
        meta: {
          icon: 'md-notifications',
          title: '消息中心'
        },
        component: () => import('@/view/single-page/message/index.vue')
      }
    ]
  },
  {
    path: '/401',
    name: 'error_401',
    meta: {
      hideInMenu: true
    },
    component: () => import('@/view/error-page/401.vue')
  },
  {
    path: '/500',
    name: 'error_500',
    meta: {
      hideInMenu: true
    },
    component: () => import('@/view/error-page/500.vue')
  }
]
