import axios from '@/libs/api.request'
import xy from '../../libs/url'
import qs from "qs";

/**
 * 计算地面站对准卫星的角度
 */
export const ctrlAngle = (info) => {
  return axios.request({
    url: xy.Setting.SPACE_URL + '/monitor/acuCtrl/ctrlAngle',
    method: 'post',
    data: qs.stringify(info)
  })
}

/**
 * 获取当前位置的经纬度
 */
export const getLocalDeg = () => {
  return axios.request({
    url: xy.Setting.SPACE_URL + '/monitor/acuCtrl/getLocalDeg',
    method: 'post',
  })
}

/**
 * 手动执行
 */
export const operCtrl = info => {
    return axios.request({
        url: xy.Setting.SPACE_URL + '/monitor/acuCtrl/operCtrl',
        method: 'post',
        data: qs.stringify(info)
    })
}

/**
 * 自动执行
 */
export const autoCtrl = info => {
  return axios.request({
    url: xy.Setting.SPACE_URL + '/monitor/acuCtrl/autoCtrl',
    method: 'post',
    data: qs.stringify(info)
  })
}




