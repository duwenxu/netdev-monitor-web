import axios from '@/libs/api.request'
import xy from '../libs/url'
import qs from 'qs'

//查询参数信息, 分页
export const queryPageList = info => {
  return axios.request({
    url: xy.Setting.SPACE_URL + '/admin/sys-param/list',
    method: 'post',
    data:info
  })
}

//插入参数信息
export const addParam = info => {
  return axios.request({
    url: xy.Setting.normal_url + '/admin/sys-param/add',
    method: 'post',
    data:qs.stringify(info)
  })
}

// 根据参数id查询值,参数名为paramId
export const queryParam = info => {
  return axios.request({
    url: xy.Setting.normal_url + '/admin/sys-param/list',
    method: 'post',
    data:qs.stringify(info)
  })
}

//valueType
export const valueTypes = () => {
  return axios.request({
    url: xy.Setting.normal_url + '/values',
    method: 'get',
  })
}


//getEdit
export const getEditData = (id) => {
  return axios.request({
    url: xy.Setting.normal_url + '/values/select-id?id='+id,
    method: 'get',
  })
}



//validateScript
export const valScript = (info) => {
  return axios.request({
    url: xy.Setting.normal_url + '/message/runScript',
    method: 'post',
    data:qs.stringify(info)
  })
}


//validateScript
export const updateParamEdit = (info) => {
  return axios.request({
    url: xy.Setting.normal_url + '/values/update',
    method: 'post',
    data:qs.stringify(info)
  })
}


//通用函数列表
export const commonFunList = (info) => {
  return axios.request({
    url: xy.Setting.normal_url + '/commonScript/page-list',
    method: 'post',
    data:qs.stringify(info)
  })
}















