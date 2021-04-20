<template>
  <div class="device-param">

    <div class="order-wrap" v-if="orderDatas.length">
      <div style="margin-bottom: 5px">命令区</div>
      <div  style="display: flex;margin-left: 20px;">
        <Button v-for="(info,index) in orderDatas" @click="save(info,true)"
                style="margin-right: 5px;background: #009688;color: white">
          {{ info.paraName }}
        </Button>
      </div>
    </div>
    <div class="param-wrap" :style="{height:orderDatas.length?400+'px':430+'px'}">
      <common :infos="infos"></common>
      <div>
      </div>
    </div>
    <div :style="{height:orderDatas.length?240+'px':260+'px',overflow:'auto'}">
      <Table disabled-hover :columns="logColumns" :data="logs"></Table>
    </div>
  </div>
</template>

<script>

import {splitCharacter} from '@/libs/util'
import common from './common'
export default {
  components:{common},
  data() {
    return {
      paramSocket: null,
      logSocket: null,
      infos:[],
      orderDatas: [],
      paramType: ['0019002', '0019003'],
      logColumns: [
        {
          title: '日志时间',
          minWidth: 170,
          key: 'logTime',
        },
        {
          title: '访问类型名称',
          minWidth: 120,
          key: 'logAccessTypeName',
        },
        {
          title: '操作类型名称',
          minWidth: 120,
          key: 'logOperTypeName',
        },
        {
          title: '命令标识符',
          minWidth: 110,
          key: 'logCmdMark',
        },
        {
          title: '操作对象名称',
          minWidth: 165,
          key: 'logOperObjName',
        },
        {
          title: '操作内容',
          key: 'logOperContent',
          minWidth: 100,
          tooltip: true,
        },
        {
          title: '原始数据',
          minWidth: 140,
          key: 'orignData',
        },
      ],
      logs: [],
    }
  },
  mounted() {
    this.initWebSocket()
  },
  beforeRouteLeave(to, from, next) {
    this.paramSocket.close()
    this.logSocket.close()
    this.paramSocket = null
    this.logSocket = null
    next()
  },
  methods: {
    initWebSocket() { //初始化weosocket
      let wsurl =  document.documentURI.split("#")[0].replace("http://","ws://")+"track_socket/ws"
      // const wsurl = 'ws://' + this.$xy.SOCKET_URL + '/ws'
      /*-----------------设备参数--------------*/
      this.paramSocket = new WebSocket(wsurl)
      this.paramSocket.onopen = this.paramSendMsg
      this.paramSocket.onmessage = this.getParamMsg
      /*-----------------日志--------------*/
      this.logSocket = new WebSocket(wsurl)
      this.logSocket.onopen = this.logSendMsg
      this.logSocket.onmessage = this.getLogMsg
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
      let textArr = [], viewArr = [], selectArr = [], oderArr = []
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
              // viewArr.push(v)
            } else {
              if (v.paraSimpleDatatype == 0 || v.paraSimpleDatatype == 2) {
                v.paraValStep = Number(v.paraValStep)
                v.paraVal = (v.paraVal == null || v.paraVal == '') ? null : Number(v.paraVal)
              }
              // textArr.push(v)
            }
          } else {
            // selectArr.push(v)
          }
        }
        v.oldVal = JSON.parse(JSON.stringify(v.paraVal))
      })
      this.orderDatas = oderArr
      // this.textDatas = textArr
      // this.selectDatas = selectArr
      // this.viewDatas = viewArr
      console.log(msg)
      this.infos = msg
    },

    /*-----------------日志--------------*/
    logSendMsg() {
      let obj = JSON.stringify({'interfaceMark': "DevLogInfos", 'devNo': this.$route.name})
      this.logSocket.send(obj)
    },
    getLogMsg(frame) {
      let msg = JSON.parse(frame.data)
      this.logs = msg
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

.param-wrap {
  border: 1px solid #009688;
  //height: 450px;
  margin-bottom: 10px;
  overflow: auto;
  border-radius: 5px;
  padding: 10px
}
</style>
