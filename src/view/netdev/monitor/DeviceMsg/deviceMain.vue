<template>
  <div>
    <Tabs :animated="false" @on-click="goto" v-model="tabName">
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
    <div class="fix-btn-warn" @click="changeInfo(2)">
      <Icon class="fix-icon-warn" :type="showLog?'md-arrow-dropright':'md-arrow-dropleft'"/>
      <div style="margin-top:5px;">日<Br/>志</div>
    </div>
    <log-table v-if="showLog" :columns="logColumns" :list="logs"></log-table>
    <warn-table v-if="showAlert" :columns="alertColumns" :list="alertInfos"></warn-table>
  </div>
</template>
<script>
import {queryPageInfo, queryCtrlInfo} from "@/api/monitor/DeviceParam"
import Operate from "./operate"
import ctrlParams from "./ctrlParams"
import shipOperate from "../specialComponents/shipOperate"
import logTable from "./logTable"
import warnTable from "./warnTable"

const context = require.context("@/view/netdev/monitor/specialComponents", false, /\.vue$/)
//directory: 要查找的文件路径/useSubdirectories: 是否查找子目录/regExp: 要匹配文件的正则
const customComponents = {
  Operate,
  ctrlParams,
  logTable,
  warnTable,
  shipOperate
}
context.keys().forEach(key => {
  const name = key.split('.')[1].split('/')[1]
  const fMoudle = context(key).default
  customComponents[name] = {
    ...fMoudle
  }
})
export default {
  components: customComponents,
  data() {
    return {
      devNo: null,
      showLog: true,
      showAlert: false,
      ctrlSocket: null,
      logSocket: null,
      warnSocket: null,
      tabName: '',
      tabs: [
        {name: 'Operate', nav: '基本信息', componentName: 'Operate'}
      ],
      logColumns: [
        {
          title: '日志时间',
          width: 20,
          key: 'logTime',
        },
        {
          title: '访问类型',
          width: 10,
          key: 'logAccessTypeName',
        },
        {
          title: '操作类型',
          width: 10,
          key: 'logOperTypeName',
        },
        {
          title: '命令标识符',
          width: 10,
          key: 'logCmdMark',
        },
        {
          title: '操作对象',
          width: 15,
          // width: 100,
          key: 'logOperObjName',
          tooltip: true,
        },
        {
          title: '内容',
          key: 'logOperContent',
          width: 22,
          tooltip: true,
        },
        {
          title: '原始数据',
          width: 13,
          key: 'orignData',
          tooltip: true,
        },
      ],
      logs: [],
      alertColumns: [
        {
          title: '告警级别',
          width: 15,
          key: 'alertLevelName',
        },
        {
          title: '告警个数',
          key: 'alertNum',
          width: 15,
        },
        {
          title: '告警时间',
          key: 'alertTime',
          width: 20,
        },
        {
          title: '告警描述',
          key: 'alertDesc',
          width: 50,
        },
      ],
      alertInfos: [],
      orderDatas: []
    }
  },
  beforeRouteLeave(to, from, next) {
    this.closeModal()
    next()
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
      this.getTabsPage()
      this.logWs()
    }
  },
  methods: {
    getDevNo(data) {
      this.devNo = data.devNo
      this.getTabsCtrl()
      this.getTabsPage()
      this.logWs()
    },
    closeModal() {
      this.tabs = []
      this.logs = []
      this.alertInfos = []
      this.orderDatas = []
      this.warnSocket.close()
      this.warnSocket = null
      this.logSocket.close()
      this.logSocket = null
      if (this.ctrlSocket) {
        this.ctrlSocket.close()
        this.ctrlSocket = null
      }
    },
    goto: function (name) {
      this.tabName = name
    },
    //切换日志告警信息
    changeInfo(value) {
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
      this.$xy.vector.$emit('changesize', obj)
    },
    //可以编辑的tab内容--设备控制，若该接口有值则连接ws
    async getTabsCtrl() {
      let {result, success} = await queryCtrlInfo({devNo: this.devNo ? this.devNo : this.$route.name})
      if (success && result.length) {
        this.tabs.push({name: 'ctrlParams', nav: '设备控制', componentName: 'ctrlParams'})
        this.getCtrlWs()
      }
    },
    //纯显示的tab
    async getTabsPage() {
      let {result, success} = await queryPageInfo({devNo: this.devNo ? this.devNo : this.$route.name})
      if (success && result.length) {
        let data = result.map(val => {
          if (val.itfPagePath) {
            return {
              name: val.itfPagePath,
              nav: val.itfName,
              componentName: val.itfPagePath
            }
          }
        })
        this.tabs = this.tabs.concat(data)
        result.devNo = this.devNo ? this.devNo : this.$route.name
        this.$nextTick(() => {
          this.$xy.vector.$emit('pageInfo', result)
        })
      }
    },
    getCtrlWs() {
      let wsurl = this.$xy.isLocal ? 'ws://' + this.$xy.SOCKET_URL : document.documentURI.split("#")[0].replace("http://", "ws://") + this.$xy.SOCKET_URL
      this.ctrlSocket = new WebSocket(wsurl)
      this.ctrlSocket.onopen = this.ctrlSend
      this.ctrlSocket.onmessage = this.getCtrlData
    },
    ctrlSend() {
      let obj = JSON.stringify({
        'interfaceMark': "DevCtrlItfInfos",
        'devNo': this.devNo ? this.devNo : this.$route.name
      })
      this.ctrlSocket.send(obj)
    },
    getCtrlData(frame) {
      this.$xy.vector.$emit('ctrlTag', frame)
    },
    /*-----------------日志/告警--------------*/
    logWs() {
      let wsurl = this.$xy.isLocal ? 'ws://' + this.$xy.SOCKET_URL : document.documentURI.split("#")[0].replace("http://", "ws://") + this.$xy.SOCKET_URL
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
      this.logs = []
      this.logs = msg
    },
    warnSend() {
      let obj = JSON.stringify({'interfaceMark': "DevAlertInfos", 'devNo': this.devNo ? this.devNo : this.$route.name})
      this.warnSocket.send(obj)
    },
    getWarnLog(frame) {
      let msg = JSON.parse(frame.data)
      if (msg.length) {
        this.showAlert = true
        this.showLog = false
        this.alertInfos = []
        this.alertInfos = msg
      }
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
