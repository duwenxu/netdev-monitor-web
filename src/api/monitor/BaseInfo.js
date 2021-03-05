import axios from '@/libs/api.request'
import xy from '../../libs/url'

/**
 * 查询分页数据
 */
export const queryBaseInfoPageList = info => {
    return axios.request({
        url: xy.Setting.SPACE_URL + '/monitor/baseInfo/list',
        method: 'post',
        data: info
    })
}

/**
 * 查询所有数据
 */
export const queryBaseInfoAllList = info => {
    return axios.request({
        url: xy.Setting.SPACE_URL + '/monitor/baseInfo/allList',
        method: 'post',
        data: info
    })
}

/**
 * 根据ID查询数据
 */
export const queryBaseInfoItem = id => {
    return axios.request({
        url: xy.Setting.SPACE_URL + '/monitor/baseInfo/' + id,
        method: 'get'
    })
}


/**
 * 添加数据
 */
export const addBaseInfo = info => {
    return axios.request({
        url: xy.Setting.SPACE_URL + '/monitor/baseInfo',
        method: 'post',
        data: info
    })
}


/**
 * 更新数据
 */
export const editBaseInfo = info => {
    return axios.request({
        url: xy.Setting.SPACE_URL + '/monitor/baseInfo',
        method: 'put',
        data: info
    })
}

/**
 * 删除数据
 */
export const deleteBaseInfo = id => {
    return axios.request({
        url: xy.Setting.SPACE_URL + '/monitor/baseInfo/' + id,
        method: 'delete'
    })
}



