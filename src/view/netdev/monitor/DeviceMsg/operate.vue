<template>
  <div class="device-param">
    <div class="order-wrap" v-if="orderDatas.length">
      <span style="margin-top: 8px;margin-right: 20px">命令区</span>
      <div v-if="$route.meta.devType == '0020023' || isShow" style="width: 20%">
        <i-switch true-color="#13ce66" false-color="#13ce66" size="large" style="margin-right: 10px"
                  v-model="orderSwitch" @on-change="switchChange">
          <span slot="open">A</span>
          <span slot="close">B</span>
        </i-switch>
      </div>
      <Button v-for="(info,index) in orderDatas" :key="index" @click="save(info)"
              style="margin-right: 5px;background: #009688;color: white">
        {{ info.paraName }}
      </Button>
    </div>
    <!-- 基本参数-->
    <div v-if="!closeCombineList.length || (closeInfos.length && closeCombineList.length)" class="param-wrap"
         :style="{height:normalHeight + 'px'}">
      <common :infos="closeInfos"></common>
      <Divider dashed v-if="openInfos.length">
          <span @click="openParam = !openParam" style="cursor: pointer">
             <Icon :type="openParam ? 'ios-arrow-dropup':'ios-arrow-dropdown'"/>
          {{ openParam ? "收起" : "查看参数" }}
          </span>
      </Divider>
      <common v-if="openParam" :infos="openInfos"></common>
    </div>
    <!-- 父框子-->
    <div class="sub-wrap" v-if="closeCombineList.length" :style="{height:normalHeight + 'px'}">
      <div v-for="info in closeCombineList">
        <div v-if="info.ndpaIsImportant == 1" class="text">{{ info.paraName }}</div>
        <common :infos="info.subParaList"></common>
      </div>
      <Divider v-if="openCombineList.length" dashed>
          <span @click="openSub = !openSub" style="cursor: pointer">
             <Icon :type="openSub ? 'ios-arrow-dropup':'ios-arrow-dropdown'"/>
          {{ openSub ? "收起" : "查看参数" }}
          </span>
      </Divider>
      <div v-if="openSub" v-for="info in openCombineList">
        <div v-if="info.ndpaIsImportant==0" class="text">{{ info.paraName }}</div>
        <common :infos="info.subParaList"></common>
      </div>
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
  data() {
    return {
      paramType: ['0019002'],
      openInfos: [],//展开
      closeInfos: [],//未展开
      openCombineList: [],//展开
      closeCombineList: [],//未展开
      orderDatas: [],//命令
      openParam: false,//common divider展开
      openSub: false,//sub divider展开
      isShow: false,//是否显示comtechAB
      isReceive: true,//是否接收ws msg
      orderSwitch: true,
      devNo: null,
      paramSocket: null,
      showAlert: false,
      showLog: false,
      normalHeight: 310,
      timer: null,//模拟数据
      timeIndex: 0,//模拟数据
    }
  },
  created: function () {
    this.$xy.vector.$on('changesize', this.sizeInfo)
    this.$xy.vector.$on('deviceNumber', this.getDevNo)
    this.$xy.vector.$on('closeModal', this.closeModal)
    this.$xy.vector.$on('receiveMsg', this.receiveMsg)
  },
  beforeDestroy: function () {
    this.$xy.vector.$off('changesize', this.sizeInfo)
    this.$xy.vector.$off('deviceNumber', this.getDevNo)
    this.$xy.vector.$off('closeModal', this.closeModal)
    this.$xy.vector.$off('receiveMsg', this.receiveMsg)
  },
  mounted() {
    if (this.$route.name != 'home') {
      this.initWebSocket()
    }
    this.setPanelHeight(true, true)
  },
  beforeRouteLeave(to, from, next) {
    this.openInfos = []
    this.closeInfos = []
    this.orderDatas = []
    this.openCombineList = []
    this.closeCombineList = []
    this.paramSocket.close()
    this.paramSocket = null
    next()
  },
  methods: {
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
    //       "ndpaIsImportant": true,
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
    //       "ndpaIsImportant": true,
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
    //       "ndpaIsImportant": true,
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
    //       "ndpaIsImportant": true,
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
    //       "ndpaIsImportant": true,
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
    //       "ndpaIsImportant": true,
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
    //       "ndpaIsImportant": true,
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
    //       "ndpaIsImportant": true,
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
    //       "ndpaIsImportant": true,
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
    //       "ndpaIsImportant": true,
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
    //       "ndpaIsImportant": true,
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
    //       "ndpaIsImportant": true,
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
    //       "ndpaIsImportant": true,
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
    //       "ndpaIsImportant": true,
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
    //       "ndpaIsImportant": true,
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
    //       "ndpaIsImportant": true,
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
    //       "ndpaIsImportant": true,
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
    //         "ndpaIsImportant": true,
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
    //         "ndpaIsImportant": true,
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
    //         "ndpaIsImportant": true,
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
    //         "ndpaIsImportant": true,
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
    //         "ndpaIsImportant": true,
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
    //       "ndpaIsImportant": true,
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
    //       "ndpaIsImportant": true,
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
    //       "ndpaIsImportant": true,
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
    setPanelHeight(bool1, bool2) {
      this.normalHeight = 310
      let infoLen = this.closeInfos.length
      let combineLen = this.closeCombineList.length
      if (bool1 || bool2) {
        if (infoLen && combineLen) this.normalHeight = 150
      } else {
        this.normalHeight = 460
        if (infoLen && combineLen) this.normalHeight = 230
      }
    },
    //1.5m天线切换开关
    async switchChange(data) {
      let {result, success, message} = await switchCheck({channel: data ? 'A' : 'B'})
      if (success) {
        this.$Notice.success({
          title: '成功',
          desc: '切换成功！',
          duration: 1
        })
      }
    },
    receiveMsg(data) {
      this.isReceive = data.receiveMsg
    },//是否接收数据
    closeModal() {
      this.paramSocket.close()
      this.paramSocket = null
    },
    getDevNo(data) {
      this.devNo = data.devNo
      this.isShow = data.value
      this.$nextTick(() => {
        this.orderSwitch = data.show
      })
      this.initWebSocket()
    },
    sizeInfo(data) {
      this.setPanelHeight(data.showAlert, data.showLog)
    },
    initWebSocket() { //初始化weosocket
      let wsurl = this.$xy.isLocal ? 'ws://' + this.$xy.SOCKET_URL : document.documentURI.split("#")[0].replace("http://", "ws://") + this.$xy.SOCKET_URL
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
      if (this.isReceive) {
        let msg = JSON.parse(frame.data)
        this.editData(msg)
      }
    },
    editData(msg) {
      let oderArr = [], parentArr = []
      let data = msg.filter(v => v.ndpaIsImportant != 2)
      data.forEach(v => {
        v.selected = false
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
      })
      this.orderDatas = oderArr
      this.openCombineList = parentArr.filter(value => value.ndpaIsImportant == 0)
      this.closeCombineList = parentArr.filter(value => value.ndpaIsImportant == 1)
      this.openInfos = data.filter(value => !value.showInText && value.accessRight != '0022005' && value.ndpaIsImportant == 0)
      this.closeInfos = data.filter(value => !value.showInText && value.accessRight != '0022005' && value.ndpaIsImportant == 1)
    },
    commonFunc(v) {
      if (v.paraSimpleDatatype == 0 || v.paraSimpleDatatype == 2) {
        v.paraValStep = Number(v.paraValStep)
        v.paraVal = (v.paraVal === null || v.paraVal === '') ? null : Number(v.paraVal)
        v.oldVal = (v.paraVal === null || v.paraVal === '') ? null : Number(JSON.parse(JSON.stringify(v.paraVal)))
      }
    },
    commonFmt(v) {
      if (v.paraViewFmt) {
        v.splitArr = []
        v.copyFmt = JSON.parse(JSON.stringify(v.paraViewFmt))//X[A]-Y[B]-Z[C]
        let resultChar = splitCharacter(v.paraSpellFmt, v.paraVal) //{X}[A]{Y}[B]{Z}[C]=>[123,234,345]
        let index = -1
        let saveOffset = 0
        //X123Y234Z345
        v.transViewFmt = v.paraViewFmt.replace(/\[(.+?)\]/g, function (match, param, offset) {
          let len = param.length
          let pos = index == -1 ? 0 : saveOffset + len + 2
          let isNumber = v.paraSimpleDatatype == 0 || v.paraSimpleDatatype == 2
          saveOffset = offset
          index++
          v.splitArr.push({
            param: v.copyFmt.substring(pos, offset),
            paraSimpleDatatype: v.paraSimpleDatatype,
            oldVal: isNumber ? Number(JSON.parse(JSON.stringify(resultChar[index]))) : JSON.parse(JSON.stringify(resultChar[index])),
            paraVal: isNumber ? Number(resultChar[index]) : resultChar[index],
            name: param,
            errorMsg: '',
            paraValMax1: null,
            paraValMin1: null,
            paraValMax2: null,
            paraValMin2: null,
            paraValStep: null,
            paraStrLen: v.paraStrLen,
            subList: [],
          })
          if (v.subParaList.length) {
            if (v.subParaList[index].spinnerInfoList) {
              let valIndex = v.subParaList[index].spinnerInfoList.findIndex((value) => value.code == v.subParaList[index].paraVal)
              return match = valIndex > -1 ? v.subParaList[index].spinnerInfoList[valIndex].name : resultChar[index]
            }
          }
          return match = resultChar[index]
        })
        if (v.subParaList.length) {
          v.subParaList.forEach(n => {
            v.splitArr.forEach(x => {
              if (n.paraCode == x.name) {
                if (n.spinnerInfoList) {
                  x.subList = n.spinnerInfoList
                }
              }
            })
          })
        }
      }
    },
    save(info) {
      this.$Modal.confirm({
        title: '确认执行当前命令吗?',
        content: '确认后将无法取消！',
        onOk: () => {
          this.saveOrder(info)
        },
        onCancel: () => {
          this.$Notice.warning({
            title: '取消',
            desc: '已取消！',
            duration: 3
          })
        }
      })
    },
    async saveOrder(info) {
      let obj = {
        devNo: info.devNo,
        paraCmdMark: info.paraCmdMark,
        paraNo: info.paraNo,
        paraId: info.paraId,
        paraVal: info.paraVal,
      }
      let {success} = await editParamValue(obj)
      if (success) {
        this.$Notice.success({
          title: '成功',
          desc: '修改成功！',
          duration: 1
        })
      }
    }
  }
}
</script>
<style lang="less">
.device-param {
  .ivu-switch-large.ivu-switch-checked:after {
    left: 60px
  }

  .ivu-switch-checked {
    .ivu-switch-inner {
      left: 20px !important;
    }
  }

  .ivu-switch-large {
    width: 100px;

    .ivu-switch-inner {
      left: 60px
    }
  }

  .ivu-switch {
    height: 30px;
    line-height: 30px;
  }

  .ivu-switch-inner {
    font-size: 24px;
  }

  .ivu-switch:after {
    content: '';
    width: 24px;
    height: 24px;
    border-radius: 18px;
    background-color: #fff;
    position: absolute;
    left: 1px;
    top: 3px;

  }

  .text {
    color: #009688;
    font-size: 14px;
    margin-bottom: 10px
  }
}

.order-wrap {
  display: flex;
  border: 1px solid #009688;
  height: 55px;
  border-radius: 5px;
  padding: 10px;
  overflow: auto;
  margin-bottom: 5px;
}

.sub-wrap {
  border: 1px solid #009688;
  height: 240px;
  border-radius: 5px;
  padding: 10px;
  overflow: auto;
  margin-bottom: 5px;
}

.param-wrap {
  border: 1px solid #009688;
  height: 250px;
  margin-bottom: 10px;
  overflow: auto;
  border-radius: 5px;
  padding: 10px
}
</style>
