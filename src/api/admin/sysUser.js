import axios from '@/libs/api.request'
import xy from '../../libs/url'
import qs from 'qs'

/*************************************系统用户API****************************************/
// 查询用户信息, 分页
export const queryUserList = info => {
  return axios.request({
    url: xy.Setting.SPACE_URL + '/admin/sys-user/list',
    method: 'post',
    data: qs.stringify(info)
  })
}

// 插入用户信息
export const addUser = info => {
  return axios.request({
    url: xy.Setting.SPACE_URL + '/admin/sys-user',
    method: 'post',
    data: info
  })
}

// 根据用户id查询值,参数名为paramId
export const queryUser = id => {
  return axios.request({
    url: xy.Setting.SPACE_URL + '/admin/sys-user/' + id,
    method: 'get'
  })
}

// 修改用户信息
export const editUser = info => {
  return axios.request({
    url: xy.Setting.SPACE_URL + '/admin/sys-user',
    method: 'put',
    data: info
  })
}

// 删除用户信息
export const deleteUser = id => {
  return axios.request({
    url: xy.Setting.SPACE_URL + '/admin/sys-user/' + id,
    method: 'delete'
  })
}
