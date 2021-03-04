import axios from '@/libs/api.request'
import xy from '../../libs/url'
import qs from "qs";

//获取当前用户菜单信息
export const getUserMenu = () => {
  return axios.request({
    url: xy.Setting.SPACE_URL + '/admin/sys-menu',
    method: 'get'
  })
}


//根据父菜单节点获取子菜单
export const queryMenuInfo = info => {
  return axios.request({
    url: xy.Setting.SPACE_URL + '/admin/sys-menu/tree',
    method: 'post',
    data: qs.stringify(info)
  })
}


// 插入角色信息
export const addMenu = info => {
  return axios.request({
    url: xy.Setting.SPACE_URL + '/admin/sys-menu',
    method: 'post',
    data: qs.stringify(info)
  })
}

// 修改角色信息
export const editMenu = info => {
  return axios.request({
    url: xy.Setting.SPACE_URL + '/admin/sys-menu',
    method: 'put',
    data: qs.stringify(info)
  })
}

// 删除角色信息
export const deleteMenu = info => {
  return axios.request({
    url: xy.Setting.SPACE_URL + '/admin/sys-menu/del',
    method: 'post',
    data: qs.stringify(info)
  })
}
