<template>
  <div>
    <Tabs :animated="false" @on-click="goto" v-model="navName">
      <TabPane v-for="(tab,index) in tabs" :key="index" :label="tab.nav" :name="tab.name">
        <component :is="tab.componentName"></component>
      </TabPane>
    </Tabs>
      <div class="fix-btn">
        <div style="margin-top:5px;" @click="changeInfo(1)">
          <Icon class="fix-icon" :type="showAlert?'md-arrow-dropright':'md-arrow-dropleft'"/>
          告<Br/>警
        </div>
      </div>
      <div class="fix-btn-warn">
        <Icon class="fix-icon-warn" :type="showLog?'md-arrow-dropright':'md-arrow-dropleft'"/>
        <div style="margin-top:5px;" @click="changeInfo(2)">日<Br/>志</div>
      </div>
      <div :style="{height:220+'px',overflow:'auto'}">
        <Table v-if="showLog" disabled-hover :columns="logColumns" :data="logs"></Table>
        <Table v-if="showAlert" disabled-hover :columns="alertColumns" :data="alertInfos"></Table>
      </div>
  </div>
</template>
<script>
import {queryPageInfo, queryCtrlInfo} from "@/api/monitor/DeviceParam"
import Operate from "./operate"
import ctrlParams from "./ctrlParams"

const context = require.context("@/view/netdev/monitor/specialComponents", false, /\.vue$/)
const mStores = {
  Operate,
  ctrlParams
}
context.keys().forEach(key => {
  const name = key.split('.')[1].split('/')[1]
  const fMoudle = context(key).default
  mStores[name] = {
    ...fMoudle,
    namespaced: true
  }
})
export default {
  components: mStores,

  data() {
    return {
      devNo: null,
      showLog: false,
      showAlert: true,
      wsurl: 'ws://' + this.$xy.SOCKET_URL + '/ws',
      ctrl_socket: null,
      logSocket: null,
      warnSocket: null,
      test: '',
      metaTitle: '任务编辑',
      navName: '',
      navIndex: 0,
      tabs: [
        {index: 0, name: 'Operate', nav: '基本信息', componentName: 'Operate'}
      ],
      logColumns: [
        {
          title: '日志时间',
          width: 200,
          key: 'logTime',
        },
        {
          title: '访问类型名称',
          width: 120,
          key: 'logAccessTypeName',
        },
        {
          title: '操作类型名称',
          width: 120,
          key: 'logOperTypeName',
        },
        {
          title: '命令标识符',
          width: 120,
          key: 'logCmdMark',
        },
        {
          title: '操作对象名称',
          width: 200,
          key: 'logOperObjName',
        },
        {
          title: '操作内容',
          key: 'logOperContent',

          tooltip: true,
        },
        {
          title: '原始数据',

          key: 'orignData',
        },
      ],
      logs: [],
      alertColumns: [
        {
            title: '告警级别',
            width: 110,
            key: 'alertLevelName',
        },
        {
          title: '告警个数',
          key: 'alertNum',
            width: 110,
        },
        {
          title: '告警时间',
          key: 'alertTime',
            width: 200,
        },
        {
          title: '告警描述',
          key: 'alertDesc',
          tooltip: true,
        },
      ],
      alertInfos: [],
      orderDatas: [],
      viewLog:true

    }
  },
  created: function () {
    this.$xy.vector.$on('deviceNumber', this.getDevNo)
    this.$xy.vector.$on('closeModal', this.closeModal)
  },
  beforeDestroy: function () {
    this.$xy.vector.$off('deviceNumber', this.getDevNo)
    this.$xy.vector.$off('closeModal', this.closeModal)
  },
  mounted() {
    if (this.$route.name != 'home') {
      this.getTabsCtrl()
      this.logWs()
    }
  },
  beforeRouteLeave(to, from, next) {
    if (this.ctrl_socket) {
      this.ctrl_socket.close()
      this.ctrl_socket = null
    }
    this.warnSocket.close()
    this.warnSocket = null
    this.logSocket.close()
    this.logSocket = null
    next()
  },
  methods: {
    getDevNo(data) {
      this.viewLog = false
      this.devNo = data
      this.getTabsCtrl()
      this.logWs()
    },
    closeModal(){
      if (this.ctrl_socket) {
        this.ctrl_socket.close()
        this.ctrl_socket = null
      }
      this.warnSocket.close()
      this.warnSocket = null
      this.logSocket.close()
      this.logSocket = null
    },
    goto: function (name) {
      this.navName = name
    },
    //切换日志告警信息
    changeInfo(value) {
      //告警
      if (value == 1) {
        this.showLog = false
        this.showAlert = !this.showAlert
      } else {
        this.showAlert = false
        this.showLog = !this.showLog
      }
      let obj = {
        showLog: this.showLog,
        showAlert: this.showAlert
      }
      this.$xy.vector.$emit('changeSize', obj)
    },
    //可以编辑的tab内容--设备控制，若该接口有值则连接ws
    async getTabsCtrl() {
      let {result, success, message} = await queryCtrlInfo({devNo: this.devNo ? this.devNo : this.$route.name})
      if (success && result.length) {
        this.tabs.push({name: 'ctrlParams', nav: '设备控制', componentName: 'ctrlParams'})
        this.getTabsPage()
        this.getCtrlWs()
      }
    },
    //纯显示的tab
    async getTabsPage() {
      let {result, success, message} = await queryPageInfo({devNo: this.devNo ? this.devNo : this.$route.name})
      if (success && result.length) {
        let data = []
        result.forEach(item => {
          data.push({name: item.itfPagePath, nav: item.itfName, componentName: item.itfPagePath})
        })
        this.tabs = this.tabs.concat(data)
        this.$nextTick(() => {
          this.$xy.vector.$emit('pageInfo', result)
        })
      }
    },
    getCtrlWs() {
      // let wsurl =  document.documentURI.split("#")[0].replace("http://","ws://")+"track_socket/ws"
      let wsurl = 'ws://' + this.$xy.SOCKET_URL + '/ws'
      this.ctrl_socket = new WebSocket(wsurl)
      this.ctrl_socket.onopen = this.ctrlSend
      this.ctrl_socket.onmessage = this.getCtrlData
    },
    ctrlSend() {
      let obj = JSON.stringify({
        'interfaceMark': "DevCtrlItfInfos",
        'devNo': this.devNo ? this.devNo : this.$route.name
      })
      this.ctrl_socket.send(obj)
    },
    getCtrlData(frame) {
      this.$xy.vector.$emit('ctrlTag', frame)
    },
    /*-----------------日志/告警--------------*/
    logWs() {
      // let wsurl =  document.documentURI.split("#")[0].replace("http://","ws://")+"track_socket/ws"
      let wsurl = 'ws://' + this.$xy.SOCKET_URL + '/ws'
      this.logSocket = new WebSocket(wsurl)
      this.logSocket.onopen = this.logSendMsg
      this.logSocket.onmessage = this.getLogMsg
      /*-----------------告警--------------*/
      this.warnSocket = new WebSocket(wsurl)
      this.warnSocket.onopen = this.warnSend
      this.warnSocket.onmessage = this.getWarnLog

    },
    logSendMsg() {
      let obj = JSON.stringify({'interfaceMark': "DevLogInfos", 'devNo': this.devNo ? this.devNo : this.$route.name})
      this.logSocket.send(obj)
    },
    getLogMsg(frame) {
      let msg = JSON.parse(frame.data)
      this.logs = msg
    },
    warnSend() {
      let obj = JSON.stringify({'interfaceMark': "DevAlertInfos", 'devNo': this.devNo ? this.devNo : this.$route.name})
      this.warnSocket.send(obj)
    },
    getWarnLog(frame) {
      let msg = JSON.parse(frame.data)
      this.alertInfos = msg
    },
  }
}
</script>
<style scoped>
.fix-icon {
  position: absolute;
  top: 18px;
  right: 20px;
}

.fix-icon-warn {
  position: absolute;
  top: 18px;
  right: 20px;
}

.fix-btn {
  position: fixed;
  right: 2px;
  bottom: 240px;
  background: #466bff;
  height: 50px;
  color: white;
  width: 30px;
  z-index: 2;
  text-align: center;
  cursor: pointer
}

.fix-btn-warn {
  position: fixed;
  right: 2px;
  bottom: 180px;
  background: #009688;
  height: 50px;
  color: white;
  width: 30px;
  z-index: 2;
  text-align: center;
  cursor: pointer
}
</style>
