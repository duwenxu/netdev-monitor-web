<template>
  <div>
    <Tabs :animated="false"  @on-click="goto" v-model="navName">
      <TabPane v-for="(tab,index) in tabs"  :key="index" :label="tab.nav" :name="tab.name">
        <component  :is="tab.componentName"></component>
      </TabPane>
    </Tabs>
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
      ctrl_socker:null,
      test:'',
      metaTitle:'任务编辑',
      navName: '',
      navIndex: 0,
      tabs: [
        {index:0,name: 'Operate', nav: '基本信息',componentName:'Operate'},
        // {index:1,name: 'ctrlParams', nav: '设备控制',componentName:'ctrlParams'},
        // {index:2,name: 'aaa', nav: '测试',componentName:'aaa'},
      ],
    }
  },
  mounted() {
      // this.getTabsPage()
      // this.getTabsCtrl()
      // this.getWs()
  },
  methods: {
    goto: function (name) {
      this.navName = name
      this.$xy.vector.$emit('ceshi',5)
    },
    getWs() { //初始化weosocket
      // const wsurl = 'ws://' + this.$xy.SOCKET_URL + '/ws'
      /*-----------------设备参数--------------*/
      this.page_socket = new WebSocket(this.wsurl)
      this.page_socket.onopen = this.pageSend
      this.page_socket.onmessage = this.getPageData
    },
    pageSend() {
      let obj = JSON.stringify({'interfaceMark': "DevPageInfos", 'devNo': this.$route.name,"cmdMark":"01"})
      this.page_socket.send(obj)
    },
    getPageData(){

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

    //纯显示的tab
    async getTabsPage(){
      let {result, success, message} = await queryPageInfo({devNo:this.$route.name})
      // this.$xy.vector.$emit('aaa',22222)

    },
    //可以编辑的tab内容--设备控制，若该接口有值则连接ws
    async getTabsCtrl(){
      let {result, success, message} = await queryCtrlInfo({devNo:this.$route.name})
      if(success && result.length){
        // this.getCtrlWs()
        console.log(8888)

        this.tabs.push({index:1,name: 'ctrlParams', nav: '设备控制',componentName:'ctrlParams'})
        this.getCtrlWs()
      }
    }
  }
}
</script>
<style scoped>
</style>
<style>

</style>
