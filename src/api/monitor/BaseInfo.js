import axios from '@/libs/api.request'
import xy from '../../libs/url'
import qs from 'qs'

/**
 * 查询分页数据
 */
export const queryBaseInfoPageList = info => {
    return axios.request({
        url: xy.Setting.SPACE_URL + '/monitor/baseInfo/list',
        method: 'post',
        data: qs.stringify(info)
    })
}

/**
 * 查询所有数据
 */
export const queryBaseInfoAllList = info => {
    return axios.request({
        url: xy.Setting.SPACE_URL + '/monitor/baseInfo/allList',
        method: 'post',
        data: qs.stringify(info)
    })
}

/**
 * 切换主备
 */
export const changeMaster = info =>{
  return axios.request({
        url: xy.Setting.SPACE_URL + '/monitor/baseInfo/changeMaster',
        method: 'post',
        data: qs.stringify(info)
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
        data: qs.stringify(info)
    })
}


/**
 * 更新数据
 */
export const editBaseInfo = info => {
    return axios.request({
        url: xy.Setting.SPACE_URL + '/monitor/baseInfo',
        method: 'put',
        data: qs.stringify(info)
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

/**
 * 下载所有设备的模型定义文件
 */
export const downDevFile = (info) => {
  return axios.request({
    url: xy.Setting.SPACE_URL + '/monitor//baseInfo/downDevFile',
    method: 'post',
    data: qs.stringify(info),
    responseType: 'blob'
  })
}


