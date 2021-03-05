import axios from 'axios'
import store from '@/store'
// import { Spin } from 'view-design'
const addErrorLog = errorInfo => {
  const { statusText, status, request: { responseURL } } = errorInfo
  let info = {
    type: 'ajax',
    code: status,
    mes: statusText,
    url: responseURL
  }
  if (!responseURL.includes('save_error_logger')) store.dispatch('addErrorLog', info)
}

class HttpRequest {
  constructor (baseUrl = baseURL) {
    this.baseUrl = baseUrl
    this.queue = {}
  }
  getInsideConfig () {
    const config = {
      baseURL: this.baseUrl,
      headers: {
        //
      }
    }
    return config
  }
  destroy (url) {
    delete this.queue[url]
    if (!Object.keys(this.queue).length) {
      // Spin.hide()
    }
  }
  interceptors (instance, url) {
    // 请求拦截
    console.log(url)
    instance.interceptors.response.use((res) => {
      return res.data
    }, (error) => {
      if (error && error.response) {
        switch (error.response.status) {
          case 400:
            error.msg = '请求错误'
            break
          case 401:
            error.msg = '未授权，请登录'
            break
          case 403:
            error.msg = '拒绝访问'
            break
          case 404:
            error.msg = '请求地址出错'
            break
          case 405:
            error.msg = '请求方式错误'
            break
          case 408:
            error.msg = '请求超时'
            break
          case 500:
            error.msg = '服务器开小差了~'
            // router.replace({
            //   path: '/error',
            //   query: {
            //     url: router.currentRoute.fullPath
            //   }
            // })
            break
          case 501:
            error.msg = '服务未实现'
            break
          case 502:
            error.msg = '网关错误'
            break
          case 503:
            error.msg = '服务不可用'
            break
          case 504:
            error.msg = '网关超时'
            break
          case 505:
            error.msg = 'HTTP版本不受支持'
            break
          default:
        }
      }
      return error
    })
    // instance.interceptors.request.use(config => {
    //   // 添加全局的loading...
    //   if (!Object.keys(this.queue).length) {
    //     // Spin.show() // 不建议开启，因为界面不友好
    //   }
    //   this.queue[url] = true
    //   return config
    // }, error => {
    //   return Promise.reject(error)
    // })
    // // 响应拦截
    // instance.interceptors.response.use(res => {
    //   this.destroy(url)
    //   const { data, status } = res
    //   return { data, status }
    // }, error => {
    //   this.destroy(url)
    //   let errorInfo = error.response
    //   if (!errorInfo) {
    //     const { request: { statusText, status }, config } = JSON.parse(JSON.stringify(error))
    //     errorInfo = {
    //       statusText,
    //       status,
    //       request: { responseURL: config.url }
    //     }
    //   }
    //   addErrorLog(errorInfo)
    //   return Promise.reject(error)
    // })
  }
  request (options) {
    const instance = axios.create()
    options = Object.assign(this.getInsideConfig(), options)
    this.interceptors(instance, options.url)
    return instance(options)
  }
}
export default HttpRequest
