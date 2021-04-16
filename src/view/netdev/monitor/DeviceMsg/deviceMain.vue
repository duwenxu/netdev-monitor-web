<template>
  <div>
    <Tabs :animated="false"  @on-click="goto" v-model="navName">
      <TabPane v-for="(tab,index) in tabs"  :key="index" :label="tab.nav" :name="tab.name">
        <component  :is="tab.componentName"></component>
      </TabPane>
    </Tabs>

    <div :style="{height:220+'px',overflow:'auto'}">
      <Table disabled-hover :columns="logColumns" :data="logs"></Table>
    </div>
  </div>
</template>

<script>
import {queryPageInfo,queryCtrlInfo} from "@/api/monitor/DeviceParam"
import Operate from "./operate"
import ctrlParams from "./ctrlParams"
const context = require.context("@/view/netdev/monitor/specialComponents",false,/\.vue$/)
const mStores = {
  Operate,
  ctrlParams
}
context.keys().forEach(key=>{
  const name = key.split('.')[1].split('/')[1]
  const fMoudle = context(key).default
  mStores[name] = {
    ...fMoudle,
    namespaced:true
  }
})
export default {
  components: mStores,
  data() {
    return {
      wsurl:'ws://' + this.$xy.SOCKET_URL + '/ws',
      page_socket:null,
      logSocket:null,
      test:'',
      metaTitle:'任务编辑',
      navName: '',
      navIndex: 0,
      tabs: [
        {index:0,name: 'Operate', nav: '基本信息',componentName:'Operate'}
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
      orderDatas: [],
      logs: [],
    }
  },
  mounted() {
      this.getTabsCtrl()
      this.logWs()
  },
  methods: {
    goto: function (name) {
      this.navName = name
    },
    //可以编辑的tab内容--设备控制，若该接口有值则连接ws
    async getTabsCtrl(){
      let {result, success, message} = await queryCtrlInfo({devNo:this.$route.name})
      if(success && result.length){
        this.tabs.push({name: 'ctrlParams', nav: '设备控制',componentName:'ctrlParams'})
        this.getTabsPage()
        this.getCtrlWs()
      }
    },
    //纯显示的tab
    async getTabsPage(){
      let {result, success, message} = await queryPageInfo({devNo:this.$route.name})
       if(success && result.length){
         let data = []
         result.forEach(item=>{
           data.push({name: item.itfPagePath, nav: item.itfName,componentName:item.itfPagePath})
         })
         this.tabs = this.tabs.concat(data)
        this.$nextTick(()=>{
          this.$xy.vector.$emit('pageInfo',result)
        })
       }
    },
    getCtrlWs(){
      let wsurl = 'ws://' + this.$xy.SOCKET_URL + '/ws'
      this.ctrl_socker = new WebSocket(wsurl)
      this.ctrl_socker.onopen = this.ctrlSend
      this.ctrl_socker.onmessage = this.getCtrlData
    },
    ctrlSend(){
      let obj = JSON.stringify({'interfaceMark': "DevCtrlItfInfos", 'devNo': this.$route.name})
      this.ctrl_socker.send(obj)
    },
    getCtrlData(frame){
      this.$xy.vector.$emit('ctrlTag',frame)
    },
    /*-----------------日志/告警--------------*/
    logWs(){
      let wsurl = 'ws://' + this.$xy.SOCKET_URL + '/ws'
      this.logSocket = new WebSocket(wsurl)
      this.logSocket.onopen = this.logSendMsg
      this.logSocket.onmessage = this.getLogMsg
      /*-----------------告警--------------*/
      this.warnSocket = new WebSocket(wsurl)
      this.warnSocket.onopen = this.warnSend
      this.warnSocket.onmessage = this.getWarnLog

    },
    warnSend() {
      let obj = JSON.stringify({'interfaceMark': "DevAlertInfos", 'devNo': this.$route.name})
      this.logSocket.send(obj)
    },
    getWarnLog(frame) {
      let msg = JSON.parse(frame.data)

    }
  }
}
</script>
