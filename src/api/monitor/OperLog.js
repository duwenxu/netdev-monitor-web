import axios from '@/libs/api.request'
import xy from '../../libs/url'
import qs from 'qs'

export const queryOperLogList = info => {
    return axios.request({
        url: xy.Setting.SPACE_URL + '/monitor/operLog/list',
        method: 'post',
        data: qs.stringify(info)
    })
}

/**
 * 按照检索条件分页查询
 */
export const queryOperLogPageByTime = info => {
  return axios.request({
    url: xy.Setting.SPACE_URL + '/monitor/operLog/queryOperLog',
    method: 'post',
    data: qs.stringify(info)
  })
}

/**
 * 查询所有数据
 */
export const queryOperLogAllList = info => {
    return axios.request({
        url: xy.Setting.SPACE_URL + '/monitor/operLog/allList',
        method: 'post',
        data: qs.stringify(info)
    })
}

/**
 * 根据ID查询数据
 */
export const queryOperLogItem = id => {
    return axios.request({
        url: xy.Setting.SPACE_URL + '/monitor/operLog/' + id,
        method: 'get'
    })
}


/**
 * 添加数据
 */
export const addOperLog = info => {
    return axios.request({
        url: xy.Setting.SPACE_URL + '/monitor/operLog',
        method: 'post',
        data: qs.stringify(info)
    })
}


/**
 * 更新数据
 */
export const editOperLog = info => {
    return axios.request({
        url: xy.Setting.SPACE_URL + '/monitor/operLog',
        method: 'put',
        data: qs.stringify(info)
    })
}

/**
 * 删除数据
 */
export const deleteOperLog = id => {
    return axios.request({
        url: xy.Setting.SPACE_URL + '/monitor/operLog/' + id,
        method: 'delete'
    })
}



