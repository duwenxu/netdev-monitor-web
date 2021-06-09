<template>
  <div class="device-param">
    <div class="order-wrap" v-if="orderDatas.length">
      <div style="margin-bottom: 5px">命令区</div>
      <div  style="display: flex;margin-left: 20px;">
        <div v-if="$route.meta.devType == '0020023'"  style="width: 30%">
          <i-switch true-color="#13ce66" false-color="#13ce66" size="large"  style="margin-top: 6px;margin-right: 10px" v-model="orderSwitch" @on-change="switchChange">
            <span slot="open">A</span>
            <span slot="close">B</span>
          </i-switch>
        </div>
        <Button v-for="(info,index) in orderDatas" @click="save(info)"
                style="margin-right: 5px;background: #009688;color: white">
          {{ info.paraName }}
        </Button>
      </div>
    </div>
    <div class="sub-wrap" v-if="combineList.length">
      <div v-for="info in combineList">
        <div style="color: #009688;font-size: 16px;margin-bottom: 10px">{{ info.paraName }}</div>
        <common :infos="info.subParaList"></common>
      </div>
    </div>
    <div v-if="!combineList.length || (infos.length && combineList.length)" class="param-wrap" :style="{height:orderDatas.length?orderHeight+'px':normalHeight+'px'}">
      <common :infos="infos"></common>
    </div>
  </div>
</template>

<script>

import {splitCharacter} from '@/libs/util'
import common from './common'
import {editParamValue} from "@/api/monitor/ParaInfo";
import {switchCheck} from "@/api/monitor/DeviceParam";

export default {
  components: {common},
  props: {
    paramSize: {
      type: Number
    }
  },
  data() {
    return {
        orderSwitch:true,
      orderHeight: 360,
      normalHeight: 450,
      devNo: null,
      paramSocket: null,
      logSocket: null,
      infos: [],
      orderDatas: [],
      combineList: [],
      paramType: ['0019002'],
      timer: null,
      saveVal: false,
      timeIndex: 0,
      selectObj: {}
    }
  },
  created: function () {
    this.$xy.vector.$on('changeSize', this.sizeInfo)
    this.$xy.vector.$on('deviceNumber', this.getDevNo)
    this.$xy.vector.$on('closeModal', this.closeModal)
    this.$xy.vector.$on('selectStatus', this.selectStatus)

  },
  beforeDestroy: function () {
    this.$xy.vector.$off('changeSize', this.sizeInfo)
    this.$xy.vector.$off('deviceNumber', this.getDevNo)
    this.$xy.vector.$off('closeModal', this.closeModal)
    this.$xy.vector.$off('selectStatus', this.selectStatus)

  },
  destroyed() {
    clearInterval(this.timer)

  },
  mounted() {
      // console.log(this.$route)
    if (this.$route.name != 'home') {
      this.initWebSocket()
    }
  },
  beforeRouteLeave(to, from, next) {
    this.paramSocket.close()
    this.paramSocket = null
    next()
  },
  methods: {
    //1.5m天线切换开关
    async  switchChange(data){
        let {result, success, message} = await switchCheck({channel:data?'A':'B'})
        if(success){

        }
      },
    selectStatus(data) {
      this.selectObj = {
        paraId: data.paraId,
        status: data.status,
        oldVal: data.oldVal,
        name: data.name,
        splitArr: data.splitArr,
        close: data.close
      }
    },
    // initTime() {
    //   this.timer = setInterval(this.scrollAnimate, 2000);
    // },
    // scrollAnimate() {
    //   setTimeout(() => {
    //     let data = [{
    //       "accessRight": "0022005",
    //       "devNo": "20",
    //       "devType": "0020001",
    //       "devTypeCode": null,
    //       "ndpaIsTopology": true,
    //       "ndpaOutterStatus": "0003002",
    //       "paraByteLen": "",
    //       "paraCmdMark": "cmdsb",
    //       "paraCmplexLevel": "0019001",
    //       "paraCode": "",
    //       "paraDatatype": "0023004",
    //       "paraId": 114,
    //       "paraName": "待机",
    //       "paraNo": "1",
    //       "paraSimpleDatatype": "1",
    //       "paraSpellFmt": "",
    //       "paraStrLen": "0",
    //       "paraUnit": "",
    //       "paraVal": "",
    //       "paraValMax": "",
    //       "paraValMin": "",
    //       "paraValStep": "",
    //       "paraViewFmt": "",
    //       "parahowMode": "0024001",
    //       "spinnerInfoList": null,
    //       "subParaLinkCode": null,
    //       "subParaLinkType": null,
    //       "subParaLinkVal": null,
    //       "subParaList": []
    //     }, {
    //       "accessRight": "0022004",
    //       "devNo": "20",
    //       "devType": "0020001",
    //       "devTypeCode": null,
    //       "ndpaIsTopology": true,
    //       "ndpaOutterStatus": "0003001",
    //       "paraByteLen": "4",
    //       "paraCmdMark": "",
    //       "paraCmplexLevel": "0019001",
    //       "paraCode": "",
    //       "paraDatatype": "0023008",
    //       "paraId": 123,
    //       "paraName": "极化引导角度",
    //       "paraNo": "10",
    //       "paraSimpleDatatype": "2",
    //       "paraSpellFmt": "",
    //       "paraStrLen": "6",
    //       "paraUnit": "",
    //       "paraVal": "0",
    //       "paraValMax": "90",
    //       "paraValMin": "-90",
    //       "paraValStep": "",
    //       "paraViewFmt": "",
    //       "parahowMode": "0024001",
    //       "spinnerInfoList": null,
    //       "subParaLinkCode": null,
    //       "subParaLinkType": null,
    //       "subParaLinkVal": null,
    //       "subParaList": []
    //     }, {
    //       "accessRight": "0022004",
    //       "devNo": "20",
    //       "devType": "0020001",
    //       "devTypeCode": null,
    //       "ndpaIsTopology": true,
    //       "ndpaOutterStatus": "0003001",
    //       "paraByteLen": "4",
    //       "paraCmdMark": "",
    //       "paraCmplexLevel": "0019001",
    //       "paraCode": "",
    //       "paraDatatype": "0023008",
    //       "paraId": 124,
    //       "paraName": "方位命令角度",
    //       "paraNo": "11",
    //       "paraSimpleDatatype": "2",
    //       "paraSpellFmt": "",
    //       "paraStrLen": "6",
    //       "paraUnit": "",
    //       "paraVal": "0",
    //       "paraValMax": "360.0",
    //       "paraValMin": "0.0",
    //       "paraValStep": "",
    //       "paraViewFmt": "",
    //       "parahowMode": "0024001",
    //       "spinnerInfoList": null,
    //       "subParaLinkCode": null,
    //       "subParaLinkType": null,
    //       "subParaLinkVal": null,
    //       "subParaList": []
    //     }, {
    //       "accessRight": "0022004",
    //       "devNo": "20",
    //       "devType": "0020001",
    //       "devTypeCode": null,
    //       "ndpaIsTopology": true,
    //       "ndpaOutterStatus": "0003001",
    //       "paraByteLen": "4",
    //       "paraCmdMark": "",
    //       "paraCmplexLevel": "0019001",
    //       "paraCode": "",
    //       "paraDatatype": "0023008",
    //       "paraId": 125,
    //       "paraName": "俯仰命令角度",
    //       "paraNo": "12",
    //       "paraSimpleDatatype": "2",
    //       "paraSpellFmt": "",
    //       "paraStrLen": "6",
    //       "paraUnit": "",
    //       "paraVal": "0",
    //       "paraValMax": "85",
    //       "paraValMin": "10",
    //       "paraValStep": "",
    //       "paraViewFmt": "",
    //       "parahowMode": "0024001",
    //       "spinnerInfoList": null,
    //       "subParaLinkCode": null,
    //       "subParaLinkType": null,
    //       "subParaLinkVal": null,
    //       "subParaList": []
    //     }, {
    //       "accessRight": "0022004",
    //       "devNo": "20",
    //       "devType": "0020001",
    //       "devTypeCode": null,
    //       "ndpaIsTopology": true,
    //       "ndpaOutterStatus": "0003001",
    //       "paraByteLen": "4",
    //       "paraCmdMark": "",
    //       "paraCmplexLevel": "0019001",
    //       "paraCode": "",
    //       "paraDatatype": "0023008",
    //       "paraId": 126,
    //       "paraName": "极化命令角度",
    //       "paraNo": "13",
    //       "paraSimpleDatatype": "2",
    //       "paraSpellFmt": "",
    //       "paraStrLen": "6",
    //       "paraUnit": "",
    //       "paraVal": "0",
    //       "paraValMax": "90",
    //       "paraValMin": "-90",
    //       "paraValStep": "",
    //       "paraViewFmt": "",
    //       "parahowMode": "0024001",
    //       "spinnerInfoList": null,
    //       "subParaLinkCode": null,
    //       "subParaLinkType": null,
    //       "subParaLinkVal": null,
    //       "subParaList": []
    //     }, {
    //       "accessRight": "0022004",
    //       "devNo": "20",
    //       "devType": "0020001",
    //       "devTypeCode": null,
    //       "ndpaIsTopology": true,
    //       "ndpaOutterStatus": "0003001",
    //       "paraByteLen": "1",
    //       "paraCmdMark": "",
    //       "paraCmplexLevel": "0019001",
    //       "paraCode": "",
    //       "paraDatatype": "0023001",
    //       "paraId": 127,
    //       "paraName": "俯仰上限",
    //       "paraNo": "14",
    //       "paraSimpleDatatype": "0",
    //       "paraSpellFmt": "",
    //       "paraStrLen": "2",
    //       "paraUnit": "",
    //       "paraVal": "0",
    //       "paraValMax": "",
    //       "paraValMin": "",
    //       "paraValStep": "",
    //       "paraViewFmt": "",
    //       "parahowMode": "0024002",
    //       "spinnerInfoList": [{"code": "0", "name": "未限位"}, {"code": "1", "name": "限位"}],
    //       "subParaLinkCode": null,
    //       "subParaLinkType": null,
    //       "subParaLinkVal": null,
    //       "subParaList": []
    //     }, {
    //       "accessRight": "0022004",
    //       "devNo": "20",
    //       "devType": "0020001",
    //       "devTypeCode": null,
    //       "ndpaIsTopology": true,
    //       "ndpaOutterStatus": "0003001",
    //       "paraByteLen": "1",
    //       "paraCmdMark": "",
    //       "paraCmplexLevel": "0019001",
    //       "paraCode": "",
    //       "paraDatatype": "0023001",
    //       "paraId": 128,
    //       "paraName": "俯仰下限",
    //       "paraNo": "15",
    //       "paraSimpleDatatype": "0",
    //       "paraSpellFmt": "",
    //       "paraStrLen": "2",
    //       "paraUnit": "",
    //       "paraVal": "0",
    //       "paraValMax": "",
    //       "paraValMin": "",
    //       "paraValStep": "",
    //       "paraViewFmt": "",
    //       "parahowMode": "0024002",
    //       "spinnerInfoList": [{"code": "0", "name": "未限位"}, {"code": "1", "name": "限位"}],
    //       "subParaLinkCode": null,
    //       "subParaLinkType": null,
    //       "subParaLinkVal": null,
    //       "subParaList": []
    //     }, {
    //       "accessRight": "0022004",
    //       "devNo": "20",
    //       "devType": "0020001",
    //       "devTypeCode": null,
    //       "ndpaIsTopology": true,
    //       "ndpaOutterStatus": "0003001",
    //       "paraByteLen": "1",
    //       "paraCmdMark": "",
    //       "paraCmplexLevel": "0019001",
    //       "paraCode": "",
    //       "paraDatatype": "0023001",
    //       "paraId": 129,
    //       "paraName": "接收机锁定状态",
    //       "paraNo": "16",
    //       "paraSimpleDatatype": "0",
    //       "paraSpellFmt": "",
    //       "paraStrLen": "2",
    //       "paraUnit": "",
    //       "paraVal": "0",
    //       "paraValMax": "",
    //       "paraValMin": "",
    //       "paraValStep": "",
    //       "paraViewFmt": "",
    //       "parahowMode": "0024002",
    //       "spinnerInfoList": [{"code": "0", "name": "失锁"}, {"code": "1", "name": "锁定"}],
    //       "subParaLinkCode": null,
    //       "subParaLinkType": null,
    //       "subParaLinkVal": null,
    //       "subParaList": []
    //     }, {
    //       "accessRight": "0022004",
    //       "devNo": "20",
    //       "devType": "0020001",
    //       "devTypeCode": null,
    //       "ndpaIsTopology": true,
    //       "ndpaOutterStatus": "0003001",
    //       "paraByteLen": "4",
    //       "paraCmdMark": "",
    //       "paraCmplexLevel": "0019001",
    //       "paraCode": "",
    //       "paraDatatype": "0023008",
    //       "paraId": 130,
    //       "paraName": "AGC值",
    //       "paraNo": "17",
    //       "paraSimpleDatatype": "2",
    //       "paraSpellFmt": "",
    //       "paraStrLen": "4",
    //       "paraUnit": "",
    //       "paraVal": "0",
    //       "paraValMax": "",
    //       "paraValMin": "",
    //       "paraValStep": "",
    //       "paraViewFmt": "",
    //       "parahowMode": "0024001",
    //       "spinnerInfoList": null,
    //       "subParaLinkCode": null,
    //       "subParaLinkType": null,
    //       "subParaLinkVal": null,
    //       "subParaList": []
    //     }, {
    //       "accessRight": "0022004",
    //       "devNo": "20",
    //       "devType": "0020001",
    //       "devTypeCode": null,
    //       "ndpaIsTopology": true,
    //       "ndpaOutterStatus": "0003001",
    //       "paraByteLen": "4",
    //       "paraCmdMark": "",
    //       "paraCmplexLevel": "0019001",
    //       "paraCode": "",
    //       "paraDatatype": "0023008",
    //       "paraId": 131,
    //       "paraName": "经度",
    //       "paraNo": "18",
    //       "paraSimpleDatatype": "2",
    //       "paraSpellFmt": "",
    //       "paraStrLen": "5",
    //       "paraUnit": "",
    //       "paraVal": "0",
    //       "paraValMax": "",
    //       "paraValMin": "",
    //       "paraValStep": "",
    //       "paraViewFmt": "",
    //       "parahowMode": "0024001",
    //       "spinnerInfoList": null,
    //       "subParaLinkCode": null,
    //       "subParaLinkType": null,
    //       "subParaLinkVal": null,
    //       "subParaList": []
    //     }, {
    //       "accessRight": "0022004",
    //       "devNo": "20",
    //       "devType": "0020001",
    //       "devTypeCode": null,
    //       "ndpaIsTopology": true,
    //       "ndpaOutterStatus": "0003001",
    //       "paraByteLen": "4",
    //       "paraCmdMark": "",
    //       "paraCmplexLevel": "0019001",
    //       "paraCode": "",
    //       "paraDatatype": "0023008",
    //       "paraId": 132,
    //       "paraName": "维度",
    //       "paraNo": "19",
    //       "paraSimpleDatatype": "2",
    //       "paraSpellFmt": "",
    //       "paraStrLen": "4",
    //       "paraUnit": "",
    //       "paraVal": "0",
    //       "paraValMax": "",
    //       "paraValMin": "",
    //       "paraValStep": "",
    //       "paraViewFmt": "",
    //       "parahowMode": "0024001",
    //       "spinnerInfoList": null,
    //       "subParaLinkCode": null,
    //       "subParaLinkType": null,
    //       "subParaLinkVal": null,
    //       "subParaList": []
    //     }, {
    //       "accessRight": "0022005",
    //       "devNo": "20",
    //       "devType": "0020001",
    //       "devTypeCode": null,
    //       "ndpaIsTopology": true,
    //       "ndpaOutterStatus": "0003002",
    //       "paraByteLen": "",
    //       "paraCmdMark": "cmdst",
    //       "paraCmplexLevel": "0019001",
    //       "paraCode": "",
    //       "paraDatatype": "0023004",
    //       "paraId": 115,
    //       "paraName": "收藏",
    //       "paraNo": "2",
    //       "paraSimpleDatatype": "1",
    //       "paraSpellFmt": "",
    //       "paraStrLen": "0",
    //       "paraUnit": "",
    //       "paraVal": "",
    //       "paraValMax": "",
    //       "paraValMin": "",
    //       "paraValStep": "",
    //       "paraViewFmt": "",
    //       "parahowMode": "0024001",
    //       "spinnerInfoList": null,
    //       "subParaLinkCode": null,
    //       "subParaLinkType": null,
    //       "subParaLinkVal": null,
    //       "subParaList": []
    //     }, {
    //       "accessRight": "0022004",
    //       "devNo": "20",
    //       "devType": "0020001",
    //       "devTypeCode": null,
    //       "ndpaIsTopology": true,
    //       "ndpaOutterStatus": "0003001",
    //       "paraByteLen": "4",
    //       "paraCmdMark": "",
    //       "paraCmplexLevel": "0019001",
    //       "paraCode": "",
    //       "paraDatatype": "0023008",
    //       "paraId": 133,
    //       "paraName": "航向",
    //       "paraNo": "20",
    //       "paraSimpleDatatype": "2",
    //       "paraSpellFmt": "",
    //       "paraStrLen": "5",
    //       "paraUnit": "",
    //       "paraVal": "0",
    //       "paraValMax": "",
    //       "paraValMin": "",
    //       "paraValStep": "",
    //       "paraViewFmt": "",
    //       "parahowMode": "0024001",
    //       "spinnerInfoList": null,
    //       "subParaLinkCode": null,
    //       "subParaLinkType": null,
    //       "subParaLinkVal": null,
    //       "subParaList": []
    //     }, {
    //       "accessRight": "0022001",
    //       "devNo": "20",
    //       "devType": "0020001",
    //       "devTypeCode": null,
    //       "ndpaIsTopology": true,
    //       "ndpaOutterStatus": "0003001",
    //       "paraByteLen": "",
    //       "paraCmdMark": "cmdse",
    //       "paraCmplexLevel": "0019002",
    //       "paraCode": "",
    //       "paraDatatype": "0023004",
    //       "paraId": 116,
    //       "paraName": "位置模式",
    //       "paraNo": "3",
    //       "paraSimpleDatatype": "1",
    //       "paraSpellFmt": "{X}[A]{Y}[B]{Z}[C] ",
    //       "paraStrLen": "24",
    //       "paraUnit": "",
    //       "paraVal": "X123.23Y234.34Z345.45 ",
    //       "paraValMax": "",
    //       "paraValMin": "",
    //       "paraValStep": "",
    //       "paraViewFmt": "X[A]-Y[B]-Z[C] ",
    //       "parahowMode": "0024001",
    //       "spinnerInfoList": null,
    //       "subParaLinkCode": null,
    //       "subParaLinkType": null,
    //       "subParaLinkVal": null,
    //       "subParaList": []
    //     }, {
    //       "accessRight": "0022001",
    //       "devNo": "20",
    //       "devType": "0020001",
    //       "devTypeCode": null,
    //       "ndpaIsTopology": true,
    //       "ndpaOutterStatus": "0003001",
    //       "paraByteLen": "",
    //       "paraCmdMark": "cmdso",
    //       "paraCmplexLevel": "0019001",
    //       "paraCode": "",
    //       "paraDatatype": "0023004",
    //       "paraId": 117,
    //       "paraName": "一键对星",
    //       "paraNo": "4",
    //       "paraSimpleDatatype": "1",
    //       "paraSpellFmt": "",
    //       "paraStrLen": "6",
    //       "paraUnit": "",
    //       "paraVal": this.timeIndex++,
    //       "paraValMax": "",
    //       "paraValMin": "",
    //       "paraValStep": "",
    //       "paraViewFmt": "",
    //       "parahowMode": "0024001",
    //       "spinnerInfoList": null,
    //       "subParaLinkCode": null,
    //       "subParaLinkType": null,
    //       "subParaLinkVal": null,
    //       "subParaList": []
    //     }, {
    //       "accessRight": "0022005",
    //       "devNo": "20",
    //       "devType": "0020001",
    //       "devTypeCode": null,
    //       "ndpaIsTopology": true,
    //       "ndpaOutterStatus": "0003001",
    //       "paraByteLen": "",
    //       "paraCmdMark": "cmdsgz",
    //       "paraCmplexLevel": "0019001",
    //       "paraCode": "",
    //       "paraDatatype": "0023004",
    //       "paraId": 118,
    //       "paraName": "跟踪",
    //       "paraNo": "5",
    //       "paraSimpleDatatype": "1",
    //       "paraSpellFmt": "",
    //       "paraStrLen": "0",
    //       "paraUnit": "",
    //       "paraVal": "",
    //       "paraValMax": "",
    //       "paraValMin": "",
    //       "paraValStep": "",
    //       "paraViewFmt": "",
    //       "parahowMode": "0024001",
    //       "spinnerInfoList": null,
    //       "subParaLinkCode": null,
    //       "subParaLinkType": null,
    //       "subParaLinkVal": null,
    //       "subParaList": []
    //     }, {
    //       "accessRight": "0022001",
    //       "devNo": "20",
    //       "devType": "0020001",
    //       "devTypeCode": null,
    //       "ndpaIsTopology": true,
    //       "ndpaOutterStatus": "0003001",
    //       "paraByteLen": "",
    //       "paraCmdMark": "cmdsj",
    //       "paraCmplexLevel": "0019003",
    //       "paraCode": "",
    //       "paraDatatype": "0023004",
    //       "paraId": 119,
    //       "paraName": "接收机本振及频率设置",
    //       "paraNo": "6",
    //       "paraSimpleDatatype": "1",
    //       "paraSpellFmt": "{Z}[P1]{F}[P2]",
    //       "paraStrLen": "0",
    //       "paraUnit": "",
    //       "paraVal": "ZAF" + this.timeIndex++,
    //       "paraValMax": "",
    //       "paraValMin": "",
    //       "paraValStep": "",
    //       "paraViewFmt": "本振:[P1]频率:[P2]MHz",
    //       "parahowMode": "0024001",
    //       "spinnerInfoList": null,
    //       "subParaLinkCode": "",
    //       "subParaLinkType": "",
    //       "subParaLinkVal": "",
    //       "subParaList": [{
    //         "accessRight": "0022004",
    //         "devNo": "20",
    //         "devType": "0020001",
    //         "devTypeCode": null,
    //         "ndpaIsTopology": true,
    //         "ndpaOutterStatus": "0003002",
    //         "paraByteLen": "",
    //         "paraCmdMark": "",
    //         "paraCmplexLevel": "0019004",
    //         "paraCode": "P1",
    //         "paraDatatype": "0023004",
    //         "paraId": 134,
    //         "paraName": "本振",
    //         "paraNo": "21",
    //         "paraSimpleDatatype": "1",
    //         "paraSpellFmt": "",
    //         "paraStrLen": "2",
    //         "paraUnit": "",
    //         "paraVal": "0",
    //         "paraValMax": "",
    //         "paraValMin": "",
    //         "paraValStep": "",
    //         "paraViewFmt": "",
    //         "parahowMode": "0024002",
    //         "spinnerInfoList": [{"code": "A", "name": "A"}, {"code": "B", "name": "B"}, {
    //           "code": "C",
    //           "name": "C"
    //         }, {"code": "D", "name": "D"}],
    //         "subParaLinkCode": "",
    //         "subParaLinkType": "0018001",
    //         "subParaLinkVal": "",
    //         "subParaList": []
    //       }, {
    //         "accessRight": "0022004",
    //         "devNo": "20",
    //         "devType": "0020001",
    //         "devTypeCode": null,
    //         "ndpaIsTopology": true,
    //         "ndpaOutterStatus": "0003002",
    //         "paraByteLen": "",
    //         "paraCmdMark": "",
    //         "paraCmplexLevel": "0019004",
    //         "paraCode": "P2",
    //         "paraDatatype": "0023008",
    //         "paraId": 135,
    //         "paraName": "本振A",
    //         "paraNo": "22",
    //         "paraSimpleDatatype": "2",
    //         "paraSpellFmt": "",
    //         "paraStrLen": "8",
    //         "paraUnit": "MHz",
    //         "paraVal": "11250",
    //         "paraValMax": "12920",
    //         "paraValMin": "12250",
    //         "paraValStep": "0.05",
    //         "paraViewFmt": "",
    //         "parahowMode": "0024001",
    //         "spinnerInfoList": null,
    //         "subParaLinkCode": "P1",
    //         "subParaLinkType": "0018002",
    //         "subParaLinkVal": "A",
    //         "subParaList": []
    //       }, {
    //         "accessRight": "0022004",
    //         "devNo": "20",
    //         "devType": "0020001",
    //         "devTypeCode": null,
    //         "ndpaIsTopology": true,
    //         "ndpaOutterStatus": "0003002",
    //         "paraByteLen": "4",
    //         "paraCmdMark": "",
    //         "paraCmplexLevel": "0019004",
    //         "paraCode": "P2",
    //         "paraDatatype": "0023008",
    //         "paraId": 137,
    //         "paraName": "本振B",
    //         "paraNo": "23",
    //         "paraSimpleDatatype": "2",
    //         "paraSpellFmt": "",
    //         "paraStrLen": "8",
    //         "paraUnit": "MHz",
    //         "paraVal": "11300",
    //         "paraValMax": "12970",
    //         "paraValMin": "12250",
    //         "paraValStep": "0.05",
    //         "paraViewFmt": "",
    //         "parahowMode": "0024001",
    //         "spinnerInfoList": null,
    //         "subParaLinkCode": "P1",
    //         "subParaLinkType": "0018002",
    //         "subParaLinkVal": "B",
    //         "subParaList": []
    //       }, {
    //         "accessRight": "0022004",
    //         "devNo": "20",
    //         "devType": "0020001",
    //         "devTypeCode": null,
    //         "ndpaIsTopology": true,
    //         "ndpaOutterStatus": "0003002",
    //         "paraByteLen": "4",
    //         "paraCmdMark": "",
    //         "paraCmplexLevel": "0019004",
    //         "paraCode": "P2",
    //         "paraDatatype": "0023008",
    //         "paraId": 138,
    //         "paraName": "本振A",
    //         "paraNo": "24",
    //         "paraSimpleDatatype": "2",
    //         "paraSpellFmt": "",
    //         "paraStrLen": "8",
    //         "paraUnit": "MHz",
    //         "paraVal": "5150",
    //         "paraValMax": "4200",
    //         "paraValMin": "3600",
    //         "paraValStep": "",
    //         "paraViewFmt": "",
    //         "parahowMode": "0024001",
    //         "spinnerInfoList": null,
    //         "subParaLinkCode": "P1",
    //         "subParaLinkType": "0018002",
    //         "subParaLinkVal": "C",
    //         "subParaList": []
    //       }, {
    //         "accessRight": "0022004",
    //         "devNo": "20",
    //         "devType": "0020001",
    //         "devTypeCode": null,
    //         "ndpaIsTopology": true,
    //         "ndpaOutterStatus": "0003002",
    //         "paraByteLen": "4",
    //         "paraCmdMark": "",
    //         "paraCmplexLevel": "0019004",
    //         "paraCode": "P2",
    //         "paraDatatype": "0023008",
    //         "paraId": 139,
    //         "paraName": "本振A",
    //         "paraNo": "25",
    //         "paraSimpleDatatype": "2",
    //         "paraSpellFmt": "",
    //         "paraStrLen": "8",
    //         "paraUnit": "MHz",
    //         "paraVal": "18650",
    //         "paraValMax": "21200",
    //         "paraValMin": "19600",
    //         "paraValStep": "",
    //         "paraViewFmt": "",
    //         "parahowMode": "0024001",
    //         "spinnerInfoList": null,
    //         "subParaLinkCode": "P1",
    //         "subParaLinkType": "0018002",
    //         "subParaLinkVal": "D",
    //         "subParaList": []
    //       }]
    //     }, {
    //       "accessRight": "0022004",
    //       "devNo": "20",
    //       "devType": "0020001",
    //       "devTypeCode": null,
    //       "ndpaIsTopology": true,
    //       "ndpaOutterStatus": "0003001",
    //       "paraByteLen": "1",
    //       "paraCmdMark": "",
    //       "paraCmplexLevel": "0019001",
    //       "paraCode": "",
    //       "paraDatatype": "0023001",
    //       "paraId": 120,
    //       "paraName": "工作方式",
    //       "paraNo": "7",
    //       "paraSimpleDatatype": "0",
    //       "paraSpellFmt": "",
    //       "paraStrLen": "2",
    //       "paraUnit": "",
    //       "paraVal": "0",
    //       "paraValMax": "",
    //       "paraValMin": "",
    //       "paraValStep": "",
    //       "paraViewFmt": "",
    //       "parahowMode": "0024002",
    //       "spinnerInfoList": [{"code": "0", "name": "收藏"}, {"code": "1", "name": "待机"}, {
    //         "code": "2",
    //         "name": "指向"
    //       }, {"code": "8", "name": "跟踪"}],
    //       "subParaLinkCode": null,
    //       "subParaLinkType": null,
    //       "subParaLinkVal": null,
    //       "subParaList": []
    //     }, {
    //       "accessRight": "0022004",
    //       "devNo": "20",
    //       "devType": "0020001",
    //       "devTypeCode": null,
    //       "ndpaIsTopology": true,
    //       "ndpaOutterStatus": "0003001",
    //       "paraByteLen": "4",
    //       "paraCmdMark": "",
    //       "paraCmplexLevel": "0019001",
    //       "paraCode": "",
    //       "paraDatatype": "0023008",
    //       "paraId": 121,
    //       "paraName": "方位引导角度",
    //       "paraNo": "8",
    //       "paraSimpleDatatype": "2",
    //       "paraSpellFmt": "",
    //       "paraStrLen": "6",
    //       "paraUnit": "",
    //       "paraVal": "0",
    //       "paraValMax": "360.0",
    //       "paraValMin": "0.0",
    //       "paraValStep": "",
    //       "paraViewFmt": "",
    //       "parahowMode": "0024001",
    //       "spinnerInfoList": null,
    //       "subParaLinkCode": null,
    //       "subParaLinkType": null,
    //       "subParaLinkVal": null,
    //       "subParaList": []
    //     }, {
    //       "accessRight": "0022004",
    //       "devNo": "20",
    //       "devType": "0020001",
    //       "devTypeCode": null,
    //       "ndpaIsTopology": true,
    //       "ndpaOutterStatus": "0003001",
    //       "paraByteLen": "4",
    //       "paraCmdMark": "",
    //       "paraCmplexLevel": "0019001",
    //       "paraCode": "",
    //       "paraDatatype": "0023008",
    //       "paraId": 122,
    //       "paraName": "俯仰引导角度",
    //       "paraNo": "9",
    //       "paraSimpleDatatype": "2",
    //       "paraSpellFmt": "",
    //       "paraStrLen": "6",
    //       "paraUnit": "",
    //       "paraVal": "0",
    //       "paraValMax": "85",
    //       "paraValMin": "10",
    //       "paraValStep": "",
    //       "paraViewFmt": "",
    //       "parahowMode": "0024001",
    //       "spinnerInfoList": null,
    //       "subParaLinkCode": null,
    //       "subParaLinkType": null,
    //       "subParaLinkVal": null,
    //       "subParaList": []
    //     }]
    //     this.getParamMsg(data)
    //   }, 1000)
    // },
    closeModal() {
      this.paramSocket.close()
      this.paramSocket = null
    },
    getDevNo(data) {
      this.devNo = data
      this.initWebSocket()
    },
    sizeInfo(data) {
      if (data.showAlert || data.showLog) {
        this.orderHeight = 360
        this.normalHeight = 450
      } else {
        this.orderHeight = 580
        this.normalHeight = 680
      }
    },
    initWebSocket() { //初始化weosocket
      this.infos = []
      this.orderDatas =  []
      this.combineList =  []
      let wsurl =  document.documentURI.split("#")[0].replace("http://","ws://")+"track_socket/ws"
        // const wsurl = 'ws://' + this.$xy.SOCKET_URL + '/ws'
      /*-----------------设备参数--------------*/
      this.paramSocket = new WebSocket(wsurl)
      this.paramSocket.onopen = this.paramSendMsg
      this.paramSocket.onmessage = this.getParamMsg
    },
    /*-----------------设备参数--------------*/
    paramSendMsg() {
      let obj = JSON.stringify({'interfaceMark': "DevParaInfos", 'devNo': this.devNo ? this.devNo : this.$route.name})
      this.paramSocket.send(obj)
    },
    getParamMsg(frame) {
      let msg = JSON.parse(frame.data)
      this.editData(msg)
    },
    editData(msg) {
      let oderArr = [], parentArr = []
      msg.forEach(v => {
        v.selected = false
        v.inputVal = JSON.parse(JSON.stringify(v.paraVal))
        v.oldVal = JSON.parse(JSON.stringify(v.paraVal))
        v.errorMsg = ''
        if (v.accessRight == '0022005') {
          oderArr.push(v)
        } else {
          if (v.parahowMode == '0024001') {//文本数字框
            if (v.paraCmplexLevel == '0019003') {//组合参数
              let subType = v.subParaList[0].subParaLinkType
              if (subType == '0018003') {//若子为0018003则父框子
                v.showInText = true
                v.subParaList.forEach(item => {
                  item.oldVal = JSON.parse(JSON.stringify(item.paraVal))
                  this.commonFunc(item)//转换数字格式，为了验证
                })
                parentArr.push(v)
              } else {//否则按复杂参数拼装来处理
                this.commonFmt(v)
              }
            } else {//0019001 002//复杂参数 基本参数
              if (this.paramType.indexOf(v.paraCmplexLevel) > -1) {//复杂参数处理，按拼装来处理
                this.commonFmt(v)
              } else {
                this.commonFunc(v)//转换数字格式，为了验证
              }
            }
          }
        }
        if (!this.selectObj.close) {
          if (v.paraId == this.selectObj.paraId) {
            if (!v.splitArr) {
              v.selected = this.selectObj.status
              v.inputVal = this.selectObj.oldVal
            } else {
              v.selected = this.selectObj.status
              this.selectObj.splitArr.forEach(n => {
                if (n.name == this.selectObj.name) {
                  this.$set(n, 'inputVal', this.selectObj.oldVal)
                }
              })
              v.splitArr = this.selectObj.splitArr
            }
          }
        }


      })
      this.orderDatas = oderArr || []
      this.combineList = parentArr || []
      this.infos = msg.filter(value=>!value.showInText)
    },
    commonFunc(v) {
      if (v.paraSimpleDatatype == 0 || v.paraSimpleDatatype == 2) {
        v.paraValStep = Number(v.paraValStep)
        v.paraVal = (v.paraVal === null || v.paraVal === '') ? null : Number(v.paraVal)
      }
    },
    commonFmt(v) {
      if(v.paraViewFmt){
      v.copyFmt = JSON.parse(JSON.stringify(v.paraViewFmt))
      v.splitArr = []
      let resultChar = splitCharacter(v.paraSpellFmt, v.paraVal)
      let stageChar = JSON.parse(JSON.stringify(splitCharacter(v.paraSpellFmt, v.paraVal)))
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
          inputVal: stageChar[index],
          oldVal: JSON.parse(JSON.stringify(resultChar[index])),
          errorMsg: '',
          paraValMax1: null,
          paraValMin1: null,
          paraValMax2: null,
          paraValMin2: null,
          paraValStep: null,
          paraSimpleDatatype: v.paraSimpleDatatype,
          paraStrLen: v.paraStrLen,
        })
        saveOffset = offset
        if (v.subParaList.length) {
          if (v.subParaList[index].spinnerInfoList) {
            let valIndex = v.subParaList[index].spinnerInfoList.findIndex((value) => value.code == v.subParaList[index].paraVal);
            return match = valIndex > -1 ? v.subParaList[index].spinnerInfoList[valIndex].name : resultChar[index]
          } else {
            return match = resultChar[index]
          }
        } else {
          return match = resultChar[index]
        }
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
      }
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

<style lang="less">
 .device-param {
   .ivu-switch-large.ivu-switch-checked:after{
     left:60px
   }
   .ivu-switch-checked{
     .ivu-switch-inner {
       left:20px !important;
     }
   }
   .ivu-switch-large {
     width: 100px;
     .ivu-switch-inner {
       left:60px
     }
   }
   .ivu-switch{
     height: 40px;
     line-height: 40px;
   }
   .ivu-switch-inner {
     font-size: 28px;
   }
   .ivu-switch:after {
     content: '';
     width: 32px;
     height: 32px;
     border-radius: 18px;
     background-color: #fff;
     position: absolute;
     left: 1px;
     top: 3px;

   }
 }

.order-wrap {
  border: 1px solid #009688;
  height: 100px;
  border-radius: 5px;
  padding: 10px;
  overflow: auto;
  margin-bottom: 5px;
}

.sub-wrap {
  border: 1px solid #009688;
  height: 280px;
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
