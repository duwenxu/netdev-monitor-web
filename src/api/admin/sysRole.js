import axios from '@/libs/api.request'
import xy from '../../libs/url'
import qs from 'qs'

/*************************************系统角色API****************************************/

// 查询角色信息, 分页
export const queryRoleList = info => {
  return axios.request({
    url: xy.Setting.SPACE_URL + '/admin/sys-role/list',
    method: 'post',
    data: qs.stringify(info)
  })
}
// 查询所有角色信息, 不分页
export const queryAllRoles = info => {
  return axios.request({
    url: xy.Setting.SPACE_URL + '/admin/sys-role/allList',
    method: 'post',
    data: qs.stringify(info)
  })
}


// 插入角色信息
export const addRole = info => {
  return axios.request({
    url: xy.Setting.SPACE_URL + '/admin/sys-role',
    method: 'post',
    data: qs.stringify(info)
  })
}

// 根据角色id查询值,参数名为paramId
export const queryRole = id => {
  return axios.request({
    url: xy.Setting.SPACE_URL + '/admin/sys-role/' + id,
    method: 'get'
  })
}

// 修改角色信息
export const editRole = info => {
  return axios.request({
    url: xy.Setting.SPACE_URL + '/admin/sys-role',
    method: 'put',
    data: qs.stringify(info)
  })
}

// 删除角色信息
export const deleteRole = id => {
  return axios.request({
    url: xy.Setting.SPACE_URL + '/admin/sys-role/' + id,
    method: 'delete'
  })
}

// 查询角色菜单信息
export const queryMenuByRole = info => {
  return axios.request({
    url: xy.Setting.SPACE_URL + '/admin/sys-role/menu',
    method: 'post',
    data: qs.stringify(info)
  })
}

//更新角色菜单
export const updateRoleMenu = info => {
  return axios.request({
    url: xy.Setting.SPACE_URL + '/admin/sys-role/updMenu',
    method: 'post',
    data: info
  })
}
