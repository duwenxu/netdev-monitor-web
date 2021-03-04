import axios from '@/libs/api.request'
import xy from '../../libs/url'
import qs from 'qs'

/*************************************系统机构API****************************************/

// 查询机构信息, 分页
export const queryDepartList = info => {
  return axios.request({
    url: xy.Setting.SPACE_URL + '/admin/sys-depart/list',
    method: 'post',
    data: qs.stringify(info)
  })
}

// 查询机构信息, 分页
export const queryAllDepartList = info => {
  return axios.request({
    url: xy.Setting.SPACE_URL + '/admin/sys-depart/allList',
    method: 'post',
    data: qs.stringify(info)
  })
}

// 插入机构信息
export const addDepart = info => {
  return axios.request({
    url: xy.Setting.SPACE_URL + '/admin/sys-depart',
    method: 'post',
    data: qs.stringify(info)
  })
}

// 根据机构id查询值,参数名为paramId
export const queryDepart = id => {
  return axios.request({
    url: xy.Setting.SPACE_URL + '/admin/sys-depart/' + id,
    method: 'get'
  })
}

// 修改机构信息
export const editDepart = info => {
  return axios.request({
    url: xy.Setting.SPACE_URL + '/admin/sys-depart',
    method: 'put',
    data: qs.stringify(info)
  })
}

// 删除机构信息
export const deleteDepart = id => {
  return axios.request({
    url: xy.Setting.SPACE_URL + '/admin/sys-depart/' + id,
    method: 'delete'
  })
}
