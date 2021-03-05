import axios from '@/libs/api.request'
import xy from '../../libs/url'

/**
 * 查询分页数据
 */
export const queryPrtclFormatPageList = info => {
    return axios.request({
        url: xy.Setting.SPACE_URL + '/monitor/prtclFormat/list',
        method: 'post',
        data: info
    })
}

/**
 * 查询所有数据
 */
export const queryPrtclFormatAllList = info => {
    return axios.request({
        url: xy.Setting.SPACE_URL + '/monitor/prtclFormat/allList',
        method: 'post',
        data: info
    })
}

/**
 * 根据ID查询数据
 */
export const queryPrtclFormatItem = id => {
    return axios.request({
        url: xy.Setting.SPACE_URL + '/monitor/prtclFormat/' + id,
        method: 'get'
    })
}


/**
 * 添加数据
 */
export const addPrtclFormat = info => {
    return axios.request({
        url: xy.Setting.SPACE_URL + '/monitor/prtclFormat',
        method: 'post',
        data: info
    })
}


/**
 * 更新数据
 */
export const editPrtclFormat = info => {
    return axios.request({
        url: xy.Setting.SPACE_URL + '/monitor/prtclFormat',
        method: 'put',
        data: info
    })
}

/**
 * 删除数据
 */
export const deletePrtclFormat = id => {
    return axios.request({
        url: xy.Setting.SPACE_URL + '/monitor/prtclFormat/' + id,
        method: 'delete'
    })
}



