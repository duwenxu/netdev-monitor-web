import axios from '@/libs/api.request'
import xy from '../../libs/url'
import qs from 'qs'

/*************************************系统参数API****************************************/
// 查询参数信息, 分页
export const queryParamList = info => {
  return axios.request({
    url: xy.Setting.SPACE_URL + '/admin/sys-param/list',
    method: 'post',
    data: qs.stringify(info)
  })
}

// 插入参数信息
export const addParam = info => {
  return axios.request({
    url: xy.Setting.SPACE_URL + '/admin/sys-param',
    method: 'post',
    data: qs.stringify(info)
  })
}

// 根据参数id查询值,参数名为paramId
export const queryParam = id => {
  return axios.request({
    url: xy.Setting.SPACE_URL + '/admin/sys-param/' + id,
    method: 'get'
  })
}

// 修改参数信息
export const editParam = info => {
  return axios.request({
    url: xy.Setting.SPACE_URL + '/admin/sys-param',
    method: 'put',
    data: qs.stringify(info)
  })
}

//删除参数信息
export const deleteParam = id => {
  return axios.request({
    url: xy.Setting.SPACE_URL + '/admin/sys-param/' + id,
    method: 'delete'
  })
}

//输入父类参数，可以查询资料的所有参数
export const queryParamByParentId = id => {
  return axios.request({
    url: xy.Setting.SPACE_URL + '/admin/sys-param/queryParamByParentId/' + id,
    method: 'get'
  })
}


