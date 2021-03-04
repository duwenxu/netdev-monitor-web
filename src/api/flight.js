import axios from '@/libs/api.request'
import xy from '@/libs/url'
import qs from 'qs'


export const getTaskList = () => {
  return axios.request({
    url: xy.Setting.SPACE_URL + '/task/taskList',
    method: 'get'
  })
}

export const getDragList = id => {
  return axios.request({
    url: xy.Setting.SPACE_URL + '/task/selectSpacecraftByTaskId/' + id,
    method: 'get'
  })
}

export const getSpaceId = info => {
  return axios.request({
    url: xy.Setting.SPACE_URL + '/taskFlight/device/selectList',
    method: 'post',
    data: qs.stringify(info)
  })
}

export const getLately = (id, tId) => {
  return axios.request({
    url: xy.Setting.SPACE_URL + '/taskFlight/lately/' + id + '/' + tId,
    method: 'get',
  })
}
export const firstGetTime = (id, tId) => {
  return axios.request({
    url: xy.Setting.ORDER_URL + '/flight/getTime/' + id + '/' + tId,
    method: 'get',
  })
}

export const dataAuto = (id) => {
  return axios.request({
    url: xy.Setting.ORDER_URL + '/flight/get/autoFlight/' + id,
    method: 'get',
  })
}

export const stopData = (id) => {
  return axios.request({
    url: xy.Setting.ORDER_URL + '/flight/change/pauseFlight/' + id,
    method: 'get',
  })
}
export const startData = (id) => {
  return axios.request({
    url: xy.Setting.ORDER_URL + '/flight/change/autoFlight/' + id,
    method: 'get',
  })
}

export const taskFlightData = (id) => {
  return axios.request({
    url: xy.Setting.SPACE_URL + '/taskFlight/' + id,
    method: 'get',
  })
}

export const orgData = () => {
  return axios.request({
    url: xy.Setting.SPACE_URL+ '/organization/select/all',
    method: 'get',
  })
}
export const devSpinner = (value,id) => {
  return axios.request({
    url: xy.Setting.SPACE_URL+ '/spacecraft/device/getSpinner/' + value + '/' + id,
    method: 'get',
  })
}

export const saveOrder = (info) => {
  return axios.request({
    url: xy.Setting.ORDER_URL + '/flight',
    method: 'post',
    data:qs.stringify(info)
  })
}

export const uploadOrder = (info) => {
  return axios.request({
    url: xy.Setting.FILE_URL + '/file/upload',
    method: 'post',
    data:info
  })
}

export const fileOrder = (code,name) => {
  return axios.request({
    url: xy.Setting.ORDER_URL + '/flight/file/' + code + '/' + name,
    method: 'get',
  })
}

export const submitSave = (info) => {
  return axios.request({
    url: xy.Setting.ORDER_URL + '/flight/control',
    method: 'post',
    data:qs.stringify(info)
  })
}

export const logData = (id,code) => {
  return axios.request({
    url: xy.Setting.wsOrder + '/flight/judge/startJudge/'+id +'/'+code,
    method: 'get',
  })
}











