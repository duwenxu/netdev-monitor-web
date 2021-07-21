import axios from '@/libs/api.request'
import xy from '../../libs/url'
import qs from 'qs'

/**
 * 查询分页数据
 */
export const queryTruckInfoPageList = info => {
  return axios.request({
    url: xy.Setting.SPACE_URL + '/monitor/truckInfo/list',
    method: 'post',
    data: qs.stringify(info)
  })
}

/**
 * 查询所有数据
 */
export const queryTruckInfoAllList = info => {
  return axios.request({
    url: xy.Setting.SPACE_URL + '/monitor/truckInfo/allList',
    method: 'post',
    data: qs.stringify(info)
  })
}

/**
 * 根据ID查询数据
 */
export const queryTruckInfoItem = id => {
  return axios.request({
    url: xy.Setting.SPACE_URL + '/monitor/truckInfo/' + id,
    method: 'get'
  })
}


/**
 * 添加数据
 */
export const addTruckInfo = info => {
  return axios.request({
    url: xy.Setting.SPACE_URL + '/monitor/truckInfo',
    method: 'post',
    data: qs.stringify(info)
  })
}


/**
 * 更新数据
 */
export const editTruckInfo = info => {
  return axios.request({
    url: xy.Setting.SPACE_URL + '/monitor/truckInfo',
    method: 'put',
    data: qs.stringify(info)
  })
}

/**
 * 删除数据
 */
export const deleteTruckInfo = id => {
  return axios.request({
    url: xy.Setting.SPACE_URL + '/monitor/truckInfo/' + id,
    method: 'delete'
  })
}
/**
 * 查询绑定参数
 */
export const getLinkedDevs = id => {
  return axios.request({
    url: xy.Setting.SPACE_URL + '/monitor/truckInfo/linked/'+id,
    method: 'get'
  })
}

/**
 * 查询未绑定参数
 */
export const getUnlinkedDevs = id => {
  return axios.request({
    url: xy.Setting.SPACE_URL + '/monitor/truckInfo/unlinked/'+id,
    method: 'get'
  })
}



