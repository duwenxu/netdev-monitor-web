import axios from '@/libs/api.request'
import xy from '../../libs/url'
import qs from 'qs'

/**
 * 设备页面查询接口参数(固定tab)
 */
export const queryPageInfo = info => {
  return axios.request({
    url: xy.Setting.SPACE_URL + '/monitor/interface/getPageItfInfo',
    method: 'post',
    data: qs.stringify(info)
  })
}

/**
 * 组装控制接口参数
 */
export const queryCtrlInfo = info => {
  return axios.request({
    url: xy.Setting.SPACE_URL + '/monitor/interface/getCtrlItfInfo',
    method: 'post',
    data: qs.stringify(info)
  })
}

/**
 * 保存子接口数据
 */
export const saveCtrlInfo = info => {
  return axios.request({
    url: xy.Setting.SPACE_URL + '/monitor/interface/interfaceCtrl',
    method: 'put',
    data: info
  })
}

/**
 * 開關切換
 */
export const switchCheck = info => {
  return axios.request({
    url: xy.Setting.SPACE_URL + '/monitor/baseInfo/comtechChange',
    method: 'post',
    data: qs.stringify(info)
  })
}
