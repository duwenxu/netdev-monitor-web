import axios from '@/libs/api.request'
import xy from '../../libs/url'

/**
 * 查询分页数据
 */
export const queryOperLogPageList = info => {
    return axios.request({
        url: xy.Setting.SPACE_URL + '/monitor/operLog/list',
        method: 'post',
        data: info
    })
}

/**
 * 查询所有数据
 */
export const queryOperLogAllList = info => {
    return axios.request({
        url: xy.Setting.SPACE_URL + '/monitor/operLog/allList',
        method: 'post',
        data: info
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
        data: info
    })
}


/**
 * 更新数据
 */
export const editOperLog = info => {
    return axios.request({
        url: xy.Setting.SPACE_URL + '/monitor/operLog',
        method: 'put',
        data: info
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


