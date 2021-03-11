import axios from '@/libs/api.request'
import xy from '../libs/url'
import nhttp from 'axios'
import qs from "qs";
export const login = ({ userName, password }) => {
  const data = {
    userName,
    password
  }
  //return nhttp.get('/login.json')
  // return axios.request({
  //   url: xy.Setting.test_url+'login',
  //   data,
  //   method: 'post'
  // })
  return axios.request({
    url: xy.Setting.SPACE_URL + '/sys/login',
    method: 'post',
    data: qs.stringify(data)
  })
}

export const getUserInfo = (token) => {
  return nhttp.get('/getUserInfo.json')
  // return axios.request({
  //   url:xy.Setting.test_url + 'get_info',
  //   params: {
  //     token
  //   },
  //   method: 'get'
  // })
}
export const get_user_menus = () => {
  return axios.request({
    url:xy.Setting.SPACE_URL + '/admin/sys-menu',
    method: 'get'
  })
}

export const get_user_device = () => {
  return axios.request({
    url:xy.Setting.SPACE_URL + '/monitor/baseInfo/baseMenu',
    method: 'get'
  })
}

export const logout = (token) => {
  return axios.request({
    url: 'logout',
    method: 'post'
  })
}

export const getUnreadCount = () => {
  return axios.request({
    url: 'message/count',
    method: 'get'
  })
}

export const getMessage = () => {
  return axios.request({
    url: 'message/init',
    method: 'get'
  })
}

export const getContentByMsgId = msg_id => {
  return axios.request({
    url: 'message/content',
    method: 'get',
    params: {
      msg_id
    }
  })
}

export const hasRead = msg_id => {
  return axios.request({
    url: 'message/has_read',
    method: 'post',
    data: {
      msg_id
    }
  })
}

export const removeReaded = msg_id => {
  return axios.request({
    url: 'message/remove_readed',
    method: 'post',
    data: {
      msg_id
    }
  })
}

export const restoreTrash = msg_id => {
  return axios.request({
    url: 'messag/restore',
    method: 'post',
    data: {
      msg_id
    }
  })
}
