import axios from '@/libs/api.request'
import xy from '../../libs/url'
import qs from 'qs'

/**
 * 查询分页数据
 */
export const queryInterfacePageList = info => {
    return axios.request({
        url: xy.Setting.SPACE_URL + '/monitor/interface/list',
        method: 'post',
        data: qs.stringify(info)
    })
}

/**
 * 查询所有数据
 */
export const queryInterfaceAllList = info => {
    return axios.request({
        url: xy.Setting.SPACE_URL + '/monitor/interface/allList',
        method: 'post',
        data: qs.stringify(info)
    })
}

/**
 * 根据ID查询数据
 */
export const queryInterfaceItem = id => {
    return axios.request({
        url: xy.Setting.SPACE_URL + '/monitor/interface/' + id,
        method: 'get'
    })
}


/**
 * 添加数据
 */
export const addInterface = info => {
    return axios.request({
        url: xy.Setting.SPACE_URL + '/monitor/interface',
        method: 'post',
        data: qs.stringify(info)
    })
}


/**
 * 更新数据
 */
export const editInterface = info => {
    return axios.request({
        url: xy.Setting.SPACE_URL + '/monitor/interface',
        method: 'put',
        data: qs.stringify(info)
    })
}

/**
 * 删除数据
 */
export const deleteInterface = id => {
    return axios.request({
        url: xy.Setting.SPACE_URL + '/monitor/interface/' + id,
        method: 'delete'
    })
}



