import axios from '@/libs/api.request'
import xy from '../../libs/url'
import qs from 'qs'

/**
 * 查询分页数据
 */
export const queryParaInfoPageList = info => {
    return axios.request({
        url: xy.Setting.SPACE_URL + '/monitor/paraInfo/list',
        method: 'post',
        data: qs.stringify(info)
    })
}

/**
 * 查询所有数据
 */
export const queryParaInfoAllList = info => {
    return axios.request({
        url: xy.Setting.SPACE_URL + '/monitor/paraInfo/allList',
        method: 'post',
        data: qs.stringify(info)
    })
}

/**
 * 根据ID查询数据
 */
export const queryParaInfoItem = id => {
    return axios.request({
        url: xy.Setting.SPACE_URL + '/monitor/paraInfo/' + id,
        method: 'get'
    })
}


/**
 * 添加数据
 */
export const addParaInfo = info => {
    return axios.request({
        url: xy.Setting.SPACE_URL + '/monitor/paraInfo',
        method: 'post',
        data: qs.stringify(info)
    })
}


/**
 * 更新数据
 */
export const editParaInfo = info => {
    return axios.request({
        url: xy.Setting.SPACE_URL + '/monitor/paraInfo',
        method: 'put',
        data: qs.stringify(info)
    })
}

/**
 * 删除数据
 */
export const deleteParaInfo = id => {
    return axios.request({
        url: xy.Setting.SPACE_URL + '/monitor/paraInfo/' + id,
        method: 'delete'
    })
}



