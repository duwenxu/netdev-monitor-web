import axios from '@/libs/api.request'
import url from '@/libs/url'
import qs from "qs";
import xy from '../libs/url'



export const loginData = info => {
  return axios.request({
    url: xy.Setting.SPACE_URL + '/sys/login',
    method: 'post',
    data: qs.stringify(info)
  })
}






export const getTableData = () => {
  return axios.request({
    url: 'get_table_data',
    method: 'get'
  })
}

export const getDragList = () => {
  return axios.request({
    url: 'get_drag_list',
    method: 'get'
  })
}

export const errorReq = () => {
  return axios.request({
    url: 'error_url',
    method: 'post'
  })
}

export const saveErrorLogger = info => {
  return axios.request({
    url: 'save_error_logger',
    data: info,
    method: 'post'
  })
}
