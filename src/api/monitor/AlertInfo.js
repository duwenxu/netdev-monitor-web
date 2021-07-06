import axios from '@/libs/api.request'
import xy from '../../libs/url'
import qs from "qs";

export const queryAlertInfoList = info => {
    return axios.request({
        url: xy.Setting.SPACE_URL + '/monitor/alertInfo/list',
        method: 'post',
        data: qs.stringify(info)
    })
}

/**
 * 按照检索条件分页查询
 */
export const queryAlertInfoPageByTime = info => {
  return axios.request({
    url: xy.Setting.SPACE_URL + '/monitor/alertInfo/queryAlterInfo',
    method: 'post',
    data: qs.stringify(info)
  })
}

/**
 * 查询所有数据
 */
export const queryAlertInfoAllList = info => {
    return axios.request({
        url: xy.Setting.SPACE_URL + '/monitor/alertInfo/allList',
        method: 'post',
        data: qs.stringify(info)
    })
}

/**
 * 根据ID查询数据
 */
export const queryAlertInfoItem = id => {
    return axios.request({
        url: xy.Setting.SPACE_URL + '/monitor/alertInfo/' + id,
        method: 'get'
    })
}


/**
 * 添加数据
 */
export const addAlertInfo = info => {
    return axios.request({
        url: xy.Setting.SPACE_URL + '/monitor/alertInfo',
        method: 'post',
        data: qs.stringify(info)
    })
}


/**
 * 更新数据
 */
export const editAlertInfo = info => {
    return axios.request({
        url: xy.Setting.SPACE_URL + '/monitor/alertInfo',
        method: 'put',
        data: qs.stringify(info)
    })
}

/**
 * 删除数据
 */
export const deleteAlertInfo = id => {
    return axios.request({
        url: xy.Setting.SPACE_URL + '/monitor/alertInfo/' + id,
        method: 'delete'
    })
}



