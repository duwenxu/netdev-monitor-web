import {
  login,
  logout,
  getUserInfo,
  getMessage,
  getContentByMsgId,
  hasRead,
  removeReaded,
  restoreTrash,
  getUnreadCount
} from '@/api/user'
import { setToken, getToken,localSave } from '@/libs/util'

export default {
  state: {
    value: ['key0'],
    displayValue: ['value0'],
    options: [{value: 'key0', label: 'value0'}],
    userName: '',
    userId: '',
    avatorImgPath: '',
    token: getToken(),
    access: '',
    hasGetInfo: false,
    unreadCount: 0,
    messageUnreadList: [],
    messageReadedList: [],
    messageTrashList: [],
    messageContentStore: {},
    theme: '',
    mediaWidthType: 1,
  },
  mutations: {
    setMediaWidthType(state, value){
      state.mediaWidthType = value
    },
    setTheme (state, value) {
      state.theme = value
      localSave('themeColor', value)
    },
    setAvator (state, avatorPath) {
      state.avatorImgPath = avatorPath
    },
    setUserId (state, id) {
      state.userId = id
    },
    setUserName (state, name) {
      state.userName = name
    },
    setAccess (state, access) {
      state.access = access
    },
    setToken (state, token) {
      state.token = token
      setToken(token)
    },
    setHasGetInfo (state, status) {
      state.hasGetInfo = status
    },
    setMessageCount (state, count) {
      state.unreadCount = count
    },
    setMessageUnreadList (state, list) {
      state.messageUnreadList = list
    },
    setMessageReadedList (state, list) {
      state.messageReadedList = list
    },
    setMessageTrashList (state, list) {
      state.messageTrashList = list
    },
    updateMessageContentStore (state, { msg_id, content }) {
      state.messageContentStore[msg_id] = content
    },
    moveMsg (state, { from, to, msg_id }) {
      const index = state[from].findIndex(_ => _.msg_id === msg_id)
      const msgItem = state[from].splice(index, 1)[0]
      msgItem.loading = false
      state[to].unshift(msgItem)
    }
  },
  getters: {
    messageUnreadCount: state => state.messageUnreadList.length,
    messageReadedCount: state => state.messageReadedList.length,
    messageTrashCount: state => state.messageTrashList.length
  },
  actions: {
    // ??????
    handleLogin ({ commit }, { userName, password }) {
      userName = userName.trim()
      return new Promise((resolve, reject) => {
        login({
          userName,
          password
        }).then(res => {
          const data = res.result.userInfo;
          localStorage.setItem('userInfo',JSON.stringify(data))
          commit('setToken', res.result.token)
          commit('setUserName', data.userName)
          resolve(data)
        }).catch(err => {
          reject(err)
        })
      })
    },
    // ????????????
    handleLogOut ({ state, commit }) {
      return new Promise((resolve, reject) => {
        commit('setToken', '')
        commit('setAccess', [])
        commit('setHasGetInfo', false)
        commit('setHasGetRouter', false)
        sessionStorage.clear()
        localStorage.clear()
        resolve()
      })
    },
    // ????????????????????????
    getUserInfo ({ state, commit }) {

      if(localStorage.userInfo){
        let obj = JSON.parse(localStorage.userInfo)
        // commit('setAvator', obj.avator)
        commit('setUserName', obj.userName)
        commit('setUserId', obj.userId)
        commit('setAccess', obj.access || ['1'])
        commit('setHasGetInfo', true)
        // resolve(obj)
      }
      // return new Promise((resolve, reject) => {
      //   try {
      //     if(sessionStorage.userInfo){
      //       let obj = JSON.parse(sessionStorage.userInfo)
      //       commit('setAvator', obj.avator)
      //       commit('setUserName', obj.name)
      //       commit('setUserId', obj.user_id)
      //       commit('setAccess', obj.access)
      //       commit('setHasGetInfo', true)
      //       resolve(obj)
      //     }else{
      //       getUserInfo(state.token).then(res => {
      //         console.log('this is userList')
      //         const data = res.data.data
      //         sessionStorage.setItem('userInfo',JSON.stringify(data))
      //         commit('setAvator', data.avator)
      //         commit('setUserName', data.name)
      //         commit('setUserId', data.user_id)
      //         commit('setAccess', data.access)
      //         commit('setHasGetInfo', true)
      //         resolve(data)
      //       }).catch(err => {
      //         reject(err)
      //       })
      //     }
      //   } catch (error) {
      //     reject(error)
      //   }
      // })
    },
    // ???????????????????????????????????????????????????????????????????????????????????????
    getUnreadMessageCount ({ state, commit }) {
      getUnreadCount().then(res => {
        const { data } = res
        commit('setMessageCount', data)
      })
    },
    // ????????????????????????????????????????????????????????????????????????
    getMessageList ({ state, commit }) {
      return new Promise((resolve, reject) => {
        getMessage().then(res => {
          const { unread, readed, trash } = res.data
          commit('setMessageUnreadList', unread.sort((a, b) => new Date(b.create_time) - new Date(a.create_time)))
          commit('setMessageReadedList', readed.map(_ => {
            _.loading = false
            return _
          }).sort((a, b) => new Date(b.create_time) - new Date(a.create_time)))
          commit('setMessageTrashList', trash.map(_ => {
            _.loading = false
            return _
          }).sort((a, b) => new Date(b.create_time) - new Date(a.create_time)))
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },
    // ??????????????????????????????id????????????
    getContentByMsgId ({ state, commit }, { msg_id }) {
      return new Promise((resolve, reject) => {
        let contentItem = state.messageContentStore[msg_id]
        if (contentItem) {
          resolve(contentItem)
        } else {
          getContentByMsgId(msg_id).then(res => {
            const content = res.data
            commit('updateMessageContentStore', { msg_id, content })
            resolve(content)
          })
        }
      })
    },
    // ????????????????????????????????????
    hasRead ({ state, commit }, { msg_id }) {
      return new Promise((resolve, reject) => {
        hasRead(msg_id).then(() => {
          commit('moveMsg', {
            from: 'messageUnreadList',
            to: 'messageReadedList',
            msg_id
          })
          commit('setMessageCount', state.unreadCount - 1)
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },
    // ????????????????????????????????????
    removeReaded ({ commit }, { msg_id }) {
      return new Promise((resolve, reject) => {
        removeReaded(msg_id).then(() => {
          commit('moveMsg', {
            from: 'messageReadedList',
            to: 'messageTrashList',
            msg_id
          })
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },
    // ??????????????????????????????????????????
    restoreTrash ({ commit }, { msg_id }) {
      return new Promise((resolve, reject) => {
        restoreTrash(msg_id).then(() => {
          commit('moveMsg', {
            from: 'messageTrashList',
            to: 'messageReadedList',
            msg_id
          })
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    }
  }
}
