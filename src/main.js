// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import iView from 'view-design'
import url from './libs/url'
import i18n from '@/locale'
import config from '@/config'
import TreeTable from 'tree-table-vue'
import qs from 'qs'

import installPlugin from '@/plugin'
import './index.less'
import '@/assets/icons/iconfont.css'

import 'view-design/dist/styles/iview.css' // 使用 CSS
import bread from './libs/bread'
import axios  from 'axios'
import './assets/common.css'
import pbcss from './assets/css/common.css'
Vue.prototype.$axios=axios


// 实际打包时应该不引入mock
/* eslint-disable */
// if (process.env.NODE_ENV !== 'production') require('@/mock')

Vue.use(iView, {
  i18n: (key, value) => i18n.t(key, value)
})

Vue.use(url);
Vue.use(bread)
Vue.use(TreeTable)
/**
 * @description 注册admin内置插件
 */
installPlugin(Vue)
/**
 * @description 生产环境关掉提示
 */
Vue.config.productionTip = false
/**
 * @description 全局注册应用配置
 */
Vue.prototype.$config = config
/**
 * 注册指令
 */


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  i18n,
  store,
  render: h => h(App)
})

// 引入echarts
import echarts from 'echarts'
Vue.prototype.$echarts = echarts
