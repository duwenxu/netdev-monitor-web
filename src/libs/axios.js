import axios from 'axios'
import store from '@/store'
import {getToken} from '@/libs/util'
// import { Spin } from 'view-design'
import { Notice } from 'view-design'
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
    instance.interceptors.request.use((config) => {
      const token = getToken();
      if (token) {
        config.headers["X-Access-Token"] = token;
      }
      return config;
    });


    /*响应结果处理*/
    instance.interceptors.response.use((res) => {
      if(res.config.responseType == 'blob'){
        //特别注意：开放设备模型文件下载
        return res;
      }else{
        return res.data
      }
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
          Notice.error({
            title:'失败',
            desc:error.response.data.message,
            duration:3
          })
            // error.msg = '服务器开小差了~'
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
  }
  request (options) {
    const instance = axios.create()
    options = Object.assign(this.getInsideConfig(), options)
    this.interceptors(instance, options.url)
    return instance(options)
  }
}
export default HttpRequest
