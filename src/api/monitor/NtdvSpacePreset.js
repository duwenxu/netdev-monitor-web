import axios from '@/libs/api.request'
import xy from '../../libs/url'
import qs from 'qs'

/**
 * 查询分页数据
 */
export const querySpacePresetPageList = info => {
    return axios.request({
        url: xy.Setting.SPACE_URL + '/SpacePreset/ntdv-space-preset/list',
        method: 'post',
        data: qs.stringify(info)
    })
}

/**
 * 根据ID查询数据
 */
export const querySpacePresetById = id => {
  return axios.request({
    url: xy.Setting.SPACE_URL + '/SpacePreset/ntdv-space-preset/' + id,
    method: 'get'
  })
}

/**
 * 添加数据
 */
export const addSpacePreset = info => {
    return axios.request({
        url: xy.Setting.SPACE_URL + '/SpacePreset/ntdv-space-preset',
        method: 'post',
        data: qs.stringify(info)
    })
}


/**
 * 更新数据
 */
export const editSpacePreset = info => {
    return axios.request({
        url: xy.Setting.SPACE_URL + '/SpacePreset/ntdv-space-preset',
        method: 'put',
        data: qs.stringify(info)
    })
}

/**
 * 删除数据
 */
export const deleteSpacePreset = id => {
    return axios.request({
        url: xy.Setting.SPACE_URL + '/SpacePreset/ntdv-space-preset/' + id,
        method: 'delete'
    })
}



