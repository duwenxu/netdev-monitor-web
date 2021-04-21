<template>
  <div class="device-param">
    <div class="order-wrap" v-if="orderDatas.length">
      <div style="margin-bottom: 5px">命令区</div>
      <div  style="display: flex;margin-left: 20px;">
        <Button v-for="(info,index) in orderDatas" @click="save(info)"
                style="margin-right: 5px;background: #009688;color: white">
          {{ info.paraName }}
        </Button>
      </div>
    </div>
    <div class="param-wrap" :style="{height:orderDatas.length?orderHeight+'px':normalHeight+'px'}">
      <common :infos="infos"></common>
    </div>

  </div>
</template>

<script>

import {splitCharacter} from '@/libs/util'
import common from './common'
import {editParamValue} from "@/api/monitor/ParaInfo";
export default {
  components:{common},
  props:{
    paramSize:{
      type:Number
    }
  },
  data() {
    return {
      orderHeight:360,
      normalHeight:450,

      paramSocket: null,
      logSocket: null,
      infos:[],
      orderDatas:[],

      paramType: ['0019002', '0019003'],

    }
  },
  created: function () {
    this.$xy.vector.$on('changeSize', this.sizeInfo)
  },
  beforeDestroy: function () {
    this.$xy.vector.$off('changeSize', this.sizeInfo)

  },
  mounted() {
    this.initWebSocket()
  },
  beforeRouteLeave(to, from, next) {
    this.paramSocket.close()
    this.paramSocket = null
    next()
  },
  methods: {
    sizeInfo(data){
      if(data.showAlert || data.showLog){
        this.orderHeight = 360
        this.normalHeight = 450
      }else{
        this.orderHeight = 580
        this.normalHeight = 680
      }
    },
    initWebSocket() { //初始化weosocket
      // let wsurl =  document.documentURI.split("#")[0].replace("http://","ws://")+"track_socket/ws"
      const wsurl = 'ws://' + this.$xy.SOCKET_URL + '/ws'
      /*-----------------设备参数--------------*/
      this.paramSocket = new WebSocket(wsurl)
      this.paramSocket.onopen = this.paramSendMsg
      this.paramSocket.onmessage = this.getParamMsg
    },
    /*-----------------设备参数--------------*/
    paramSendMsg() {
      let obj = JSON.stringify({'interfaceMark': "DevParaInfos", 'devNo': this.$route.name})
      this.paramSocket.send(obj)
    },
    getParamMsg(frame) {
      let msg = JSON.parse(frame.data)
      this.editData(msg)
    },
    editData(msg) {
      let oderArr = [],parentArr = []
      msg.forEach(v => {
        v.selected = false
        v.errorMsg = ''
        if (v.accessRight == '0022005') {
          oderArr.push(v)
        } else {
          if (v.parahowMode == '0024001') {//数字类型Number转换
            if (this.paramType.indexOf(v.paraCmplexLevel) > -1 || v.paraSpellFmt) {//如果存在复杂参数，组合参数，切割
              v.copyFmt = JSON.parse(JSON.stringify(v.paraViewFmt))
              v.splitArr = []
              let resultChar = splitCharacter(v.paraSpellFmt, v.paraVal)
              let index = -1
              let saveOffset = 0
              v.transViewFmt = v.paraViewFmt.replace(/\[(.+?)\]/g, function (match, param, offset, string) {
                let len = param.length
                let pos = index == -1 ? 0 : saveOffset + len + 2
                index++
                v.splitArr.push({
                  param: v.copyFmt.substring(pos, offset),
                  paraVal: resultChar[index],
                  name: param,
                  oldVal: JSON.parse(JSON.stringify(resultChar[index])),
                  errorMsg: '',
                  paraValMax: null,
                  paraValMin: null,
                  paraValStep: null,
                  paraSimpleDatatype: v.paraSimpleDatatype,
                  paraStrLen: v.paraStrLen,
                })
                saveOffset = offset
                return match = resultChar[index]
              })
              if (v.subParaList.length) {
                v.subParaList.forEach(n => {
                  v.splitArr.forEach(x => {
                    if (n.paraCode == x.name) {
                      if (n.spinnerInfoList) {
                        x.subList = n.spinnerInfoList || []
                      }
                    }
                  })
                })
              }
            } else {
              if (v.paraSimpleDatatype == 0 || v.paraSimpleDatatype == 2) {
                v.paraValStep = Number(v.paraValStep)
                v.paraVal = (v.paraVal == null || v.paraVal == '') ? null : Number(v.paraVal)
              }
            }
          }
        }
        v.oldVal = JSON.parse(JSON.stringify(v.paraVal))
      })
      this.orderDatas = oderArr
      this.infos = msg
    },
    commonFunc(v){

    },
    async save(info) {
      let obj = {
        devNo: info.devNo,
        paraCmdMark: info.paraCmdMark,
        paraNo: info.paraNo,
        paraId: info.paraId,
        paraVal: info.paraVal,
      }
        let {result, success, message} = await editParamValue(obj)
        if (success) {
          this.$Notice.success({
            title: '成功',
            desc: message,
            duration: 1
          })
        } else {
          this.$Notice.error({
            title: '失败',
            desc: message,
            duration: 3
          })
        }
    }
  }
}
</script>

<style  lang="less">
.order-wrap {
  border: 1px solid #009688;
  height: 100px;
  border-radius: 5px;
  padding: 10px;
  overflow: auto;
  margin-bottom: 5px;
}
.sub-wrap{
  border: 1px solid #009688;
  height: 200px;
  border-radius: 5px;
  padding: 10px;
  overflow: auto;
  margin-bottom: 5px;
}
.param-wrap {
  border: 1px solid #009688;
  height: 450px;
  margin-bottom: 10px;
  overflow: auto;
  border-radius: 5px;
  padding: 10px
}
</style>
