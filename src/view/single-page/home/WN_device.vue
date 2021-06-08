<template>
  <div>
    <template v-for="equipment in equipments">
      <div class="device_status" :style="devicePosition(equipment)">
        <span :style="judgeDeviceStatus(equipment)" :class="equipment.isAlarm == 1?'point-flicker':''"></span>
      </div>
      <div class="device_title" :style="masterStatus(equipment)" @click="openParam(equipment)"></div>
    </template>
    <div ref="dom" class="charts"></div>
    <div class="legend">
      <div class="legend_status" v-for="(item, index) in legendType" :key="index">
        <span :class="[item.shape]"
              :style="{background: item.color, borderColor: item.borderColor}"></span>{{ item.description }}
      </div>
    </div>
    <Modal :closable="false" :styles="{marginTop:'-90px'}" v-model="paramModal" @on-ok="confirm" @on-cancel="confirm"
           width="1000" :mask-closable="false">
      <div slot="header"><span>参数信息</span>
        <Button style="float: right" size="small" @click="confirm">关闭</Button>
      </div>
      <DeviceMain></DeviceMain>
    </Modal>
  </div>
</template>
<script>
    import * as echarts from 'echarts'
    import {on, off} from '@/libs/tools'
    import {mapState} from "vuex";
    import mixin from "../../../components/common/websocket";
    import DeviceMain from "@/view/netdev/monitor/DeviceMsg/deviceMain";
    // echarts.registerTheme('tdTheme');
    export default {
        components: {DeviceMain},
        mixins: [mixin],
        data() {
            return {
                shineData: [],
                devNo: null,
                dom: null,
                paramModal: false,
                equipments: [
                    {
                        devNo: '2',
                        name: 'Ku 1:1热备份开关切换控制器',
                        isInterrupt: '0',
                        workStatus: '0',
                        isAlarm: '0',
                        isUseStandby: false,
                        masterOrSlave: '0'
                    },
                    {
                        devNo: '2-2',
                        name: 'Ku 1:1热备份开关切换控制器',
                        isInterrupt: '0',
                        workStatus: '0',
                        isAlarm: '0',
                        isUseStandby: false,
                        masterOrSlave: '1'
                    },
                    {
                        devNo: '11',
                        name: 'A调制解调器1',
                        isInterrupt: '0',
                        workStatus: '0',
                        isAlarm: '0',
                        isUseStandby: false,
                        masterOrSlave: '0'
                    },
                    {
                        devNo: '12',
                        name: 'A调制解调器2',
                        isInterrupt: '0',
                        workStatus: '0',
                        isAlarm: '0',
                        isUseStandby: false,
                        masterOrSlave: '1'
                    },
                    {
                        devNo: '13',
                        name: 'B调制解调器1',
                        isInterrupt: '0',
                        workStatus: '0',
                        isAlarm: '0',
                        isUseStandby: false,
                        masterOrSlave: '0'
                    },
                    {
                        devNo: '14',
                        name: 'B调制解调器2',
                        isInterrupt: '0',
                        workStatus: '0',
                        isAlarm: '0',
                        isUseStandby: false,
                        masterOrSlave: '1'
                    },
                    {
                        devNo: '30',
                        name: '1:1转换单元(上调制)',
                        isInterrupt: '0',
                        workStatus: '0',
                        isAlarm: '0',
                        isUseStandby: false,
                        masterOrSlave: ''
                    },
                    {
                        devNo: '31',
                        name: '1:1转换单元(下调制)',
                        isInterrupt: '0',
                        workStatus: '0',
                        isAlarm: '0',
                        isUseStandby: false,
                        masterOrSlave: ''
                    },
                    {
                        devNo: '20',
                        name: '2.4m天线ACU',
                        isInterrupt: '0',
                        workStatus: '0',
                        isAlarm: 0,
                        isUseStandby: false,

                    },
                    {
                        devNo: '40',
                        name: '下变频器1',
                        isInterrupt: '0',
                        workStatus: '0',
                        isAlarm: '0',
                        isUseStandby: false,
                        masterOrSlave: ''
                    },
                    {
                        devNo: '41',
                        name: '下变频器2',
                        isInterrupt: '0',
                        workStatus: '0',
                        isAlarm: '0',
                        isUseStandby: false,
                        masterOrSlave: ''
                    },
                ],
                position: {
                    '2': {
                        top: '243px',
                        left: '244px',
                    },
                    '2-2': {
                        top: '284px',
                        left: '244px',
                    },
                    '11': {
                        top: '95px',
                        left: '485px',
                    },
                    '12': {
                        top: '154px',
                        left: '485px',
                    },
                    '13': {
                        top: '217px',
                        left: '485px',
                    },
                    '14': {
                        top: '275px',
                        left: '485px',
                    },
                    '30': {
                        top: '124px',
                        left: '485px',
                    },
                    '31': {
                        top: '246px',
                        left: '485px',
                    },
                    '20': {
                        top: '450px',
                        left: '445px',
                    },
                    '40': {
                        top: '340px',
                        left: '248px',
                    },
                    '41': {
                        top: '380px',
                        left: '248px',
                    },
                },
                masterPosition: {
                    '2': {
                        border: '3px solid green',
                        width: '62px',
                        height: '24px',
                        top: '244px',
                        left: '200px',
                    },
                    '2-2': {
                        border: '3px solid green',
                        width: '62px',
                        height: '24px',
                        top: '284px',
                        left: '200px',
                    },
                    '11': {
                        border: '3px solid green',
                        width: '94px',
                        height: '22px',
                        top: '96px',
                        left: '405px',
                    },
                    '12': {
                        border: '3px solid green',
                        width: '94px',
                        height: '22px',
                        top: '155px',
                        left: '405px',
                    },
                    '13': {
                        border: '3px solid green',
                        width: '94px',
                        height: '22px',
                        top: '218px',
                        left: '405px',
                    },
                    '14': {
                        border: '3px solid green',
                        width: '94px',
                        height: '22px',
                        top: '276px',
                        left: '405px',
                    },
                    '30': {
                        border: '3px solid green',
                        width: '94px',
                        height: '22px',
                        top: '125px',
                        left: '405px',
                    },
                    '31': {
                        border: '3px solid green',
                        width: '94px',
                        height: '22px',
                        top: '247px',
                        left: '405px',
                    },
                    '40': {
                        border: '3px solid green',
                        width: '62px',
                        height: '24px',
                        top: '340px',
                        left: '200px',
                    },
                    '41': {
                        border: '3px solid green',
                        width: '62px',
                        height: '24px',
                        top: '380px',
                        left: '200px',
                    },
                },
                legendType: [
                    {shape: 'square', color: 'rgba(0,0,0,0)', borderColor: '#009688', description: '运行'},
                    {shape: 'square', color: 'rgba(0,150,136,0.2)', description: '主机'},
                    {shape: 'square', color: '#ccc', description: '备机'},
                    {shape: 'circle', color: '#009688', description: '正常'},
                    {shape: 'circle', color: '#ff1400', description: '故障'},
                    {shape: 'circle', color: '#ffbe08', description: '告警'}
                ],
                number: '0',
            }
        },
        beforeDestroy() {
            off(window, 'resize', this.resize)
        },
        mounted() {
            // this.initTime()
            this.dom = echarts.init(this.$refs.dom);
            this.init()
        },
        computed: {
            ...mapState({
                mediaWidthType: state => state.user.mediaWidthType
            }),
        },
        methods: {
            confirm() {
                this.paramModal = false
                this.$xy.vector.$emit("closeModal")
            },

            // initTime() {
            //   this.timer = setInterval(this.scrollAnimate, 2000);
            // },
            // scrollAnimate() {
            //   setTimeout(() => {
            //     if(this.number == '0'){
            //       this.number = '1'
            //     }else{
            //       this.number = '0'
            //     }
            // let data = [
            //   {
            //     "devDeployType":"0031001",
            //     "devNo":"22",
            //     "devTypeCode":"12",
            //     "isAlarm":"0",
            //     "isInterrupt":"0",
            //     "isUseStandby":"0",
            //     "masterOrSlave":"0",
            //     "stationId":null,
            //     "workStatus":"0"
            //   },
            //   {
            //     "devDeployType":"0031002",
            //     "devNo":"44",
            //     "devTypeCode":"5",
            //     "isAlarm":"0",
            //     "isInterrupt":"0",
            //     "isUseStandby":"1",
            //     "masterOrSlave":"0",
            //     "stationId":null,
            //     "workStatus":"0"
            //   },
            //   {
            //     "devDeployType":"0031001",
            //     "devNo":"23",
            //     "devTypeCode":"16",
            //     "isAlarm":"0",
            //     "isInterrupt":"0",
            //     "isUseStandby":"0",
            //     "masterOrSlave":"0",
            //     "stationId":null,
            //     "workStatus":"0"
            //   },
            //   {
            //     "devDeployType":"0031003",
            //     "devNo":"45",
            //     "devTypeCode":"5",
            //     "isAlarm":"0",
            //     "isInterrupt":"0",
            //     "isUseStandby":"1",
            //     "masterOrSlave":"0",
            //     "stationId":null,
            //     "workStatus":"0"
            //   },
            //   {
            //     "devDeployType":"0031001",
            //     "devNo":"24",
            //     "devTypeCode":"17",
            //     "isAlarm":"0",
            //     "isInterrupt":"0",
            //     "isUseStandby":"0",
            //     "masterOrSlave":"0",
            //     "stationId":null,
            //     "workStatus":"0"
            //   },
            //   {
            //     "devDeployType":"0031001",
            //     "devNo":"46",
            //     "devTypeCode":"6",
            //     "isAlarm":"0",
            //     "isInterrupt":"0",
            //     "isUseStandby":"1",
            //     "masterOrSlave":"0",
            //     "stationId":null,
            //     "workStatus":"0"
            //   },
            //   {
            //     "devDeployType":"0031001",
            //     "devNo":"25",
            //     "devTypeCode":"18",
            //     "isAlarm":"0",
            //     "isInterrupt":"0",
            //     "isUseStandby":"0",
            //     "masterOrSlave":"0",
            //     "stationId":null,
            //     "workStatus":"0"
            //   },
            //   {
            //     "devDeployType":"0031004",
            //     "devNo":"47",
            //     "devTypeCode":"4",
            //     "isAlarm":"0",
            //     "isInterrupt":"0",
            //     "isUseStandby":"0",
            //     "masterOrSlave":"0",
            //     "stationId":null,
            //     "workStatus":"0"
            //   },
            //   {
            //     "devDeployType":"0031001",
            //     "devNo":"26",
            //     "devTypeCode":"15",
            //     "isAlarm":"0",
            //     "isInterrupt":"0",
            //     "isUseStandby":"0",
            //     "masterOrSlave":"0",
            //     "stationId":null,
            //     "workStatus":"0"
            //   },
            //   {
            //     "devDeployType":"0031002",
            //     "devNo":"48",
            //     "devTypeCode":"5",
            //     "isAlarm":"0",
            //     "isInterrupt":"0",
            //     "isUseStandby":"1",
            //     "masterOrSlave":"0",
            //     "stationId":null,
            //     "workStatus":"0"
            //   },
            //   {
            //     "devDeployType":"0031001",
            //     "devNo":"27",
            //     "devTypeCode":"12",
            //     "isAlarm":"0",
            //     "isInterrupt":"0",
            //     "isUseStandby":"0",
            //     "masterOrSlave":"0",
            //     "stationId":null,
            //     "workStatus":"0"
            //   },
            //   {
            //     "devDeployType":"0031003",
            //     "devNo":"49",
            //     "devTypeCode":"5",
            //     "isAlarm":"0",
            //     "isInterrupt":"0",
            //     "isUseStandby":"1",
            //     "masterOrSlave":"0",
            //     "stationId":null,
            //     "workStatus":"0"
            //   },
            //   {
            //     "devDeployType":"0031001",
            //     "devNo":"28",
            //     "devTypeCode":"12",
            //     "isAlarm":"0",
            //     "isInterrupt":"0",
            //     "isUseStandby":"0",
            //     "masterOrSlave":"0",
            //     "stationId":null,
            //     "workStatus":"0"
            //   },
            //   {
            //     "devDeployType":"0031004",
            //     "devNo":"29",
            //     "devTypeCode":"19",
            //     "isAlarm":"0",
            //     "isInterrupt":"0",
            //     "isUseStandby":"0",
            //     "masterOrSlave":"0",
            //     "stationId":null,
            //     "workStatus":"0"
            //   },
            //   {
            //     "devDeployType":"0031001",
            //     "devNo":"50",
            //     "devTypeCode":"6",
            //     "isAlarm":"0",
            //     "isInterrupt":"0",
            //     "isUseStandby":"1",
            //     "masterOrSlave":"0",
            //     "stationId":null,
            //     "workStatus":"0"
            //   },
            //   {
            //     "devDeployType":"0031001",
            //     "devNo":"30",
            //     "devTypeCode":"9",
            //     "isAlarm":"0",
            //     "isInterrupt":"1",
            //     "isUseStandby":"1",
            //     "masterOrSlave":"0",
            //     "stationId":null,
            //     "workStatus":"0"
            //   },
            //   {
            //     "devDeployType":"0031001",
            //     "devNo":"31",
            //     "devTypeCode":"9",
            //     "isAlarm":"0",
            //     "isInterrupt":"1",
            //     "isUseStandby":"1",
            //     "masterOrSlave":"0",
            //     "stationId":null,
            //     "workStatus":"0"
            //   },
            //   {
            //     "devDeployType":"0031002",
            //     "devNo":"11",
            //     "devTypeCode":"8",
            //     "isAlarm":"0",
            //     "isInterrupt":"0",
            //     "isUseStandby":"1",
            //     "masterOrSlave":this.number,
            //     "stationId":null,
            //     "workStatus":"0"
            //   },
            //
            //   {
            //     "devDeployType":"0031002",
            //     "devNo":"12",
            //     "devTypeCode":"8",
            //     "isAlarm":"0",
            //     "isInterrupt":"0",
            //     "isUseStandby":"1",
            //     "masterOrSlave":"0",
            //     "stationId":null,
            //     "workStatus":"0"
            //   },
            //   {
            //     "devDeployType":"0031003",
            //     "devNo":"13",
            //     "devTypeCode":"8",
            //     "isAlarm":"0",
            //     "isInterrupt":"0",
            //     "isUseStandby":"1",
            //     "masterOrSlave":this.number,
            //     "stationId":null,
            //     "workStatus":"0"
            //   },
            //   {
            //     "devDeployType":"0031004",
            //     "devNo":"35",
            //     "devTypeCode":"4",
            //     "isAlarm":"0",
            //     "isInterrupt":"0",
            //     "isUseStandby":"0",
            //     "masterOrSlave":"0",
            //     "stationId":null,
            //     "workStatus":"0"
            //   },
            //   {
            //     "devDeployType":"0031003",
            //     "devNo":"14",
            //     "devTypeCode":"8",
            //     "isAlarm":"0",
            //     "isInterrupt":"0",
            //     "isUseStandby":"1",
            //     "masterOrSlave":"0",
            //     "stationId":null,
            //     "workStatus":"0"
            //   },
            //   {
            //     "devDeployType":"0031002",
            //     "devNo":"36",
            //     "devTypeCode":"5",
            //     "isAlarm":"0",
            //     "isInterrupt":"0",
            //     "isUseStandby":"1",
            //     "masterOrSlave":"0",
            //     "stationId":null,
            //     "workStatus":"0"
            //   },
            //   {
            //     "devDeployType":"0031004",
            //     "devNo":"15",
            //     "devTypeCode":"",
            //     "isAlarm":"0",
            //     "isInterrupt":"0",
            //     "isUseStandby":"0",
            //     "masterOrSlave":"0",
            //     "stationId":null,
            //     "workStatus":"0"
            //   },
            //   {
            //     "devDeployType":"0031003",
            //     "devNo":"37",
            //     "devTypeCode":"5",
            //     "isAlarm":"0",
            //     "isInterrupt":"0",
            //     "isUseStandby":"1",
            //     "masterOrSlave":"0",
            //     "stationId":null,
            //     "workStatus":"0"
            //   },
            //   {
            //     "devDeployType":"0031002",
            //     "devNo":"16",
            //     "devTypeCode":"21",
            //     "isAlarm":"0",
            //     "isInterrupt":"0",
            //     "isUseStandby":"1",
            //     "masterOrSlave":"0",
            //     "stationId":null,
            //     "workStatus":"0"
            //   },
            //   {
            //     "devDeployType":"0031001",
            //     "devNo":"38",
            //     "devTypeCode":"6",
            //     "isAlarm":"0",
            //     "isInterrupt":"0",
            //     "isUseStandby":"1",
            //     "masterOrSlave":"0",
            //     "stationId":null,
            //     "workStatus":"0"
            //   },
            //   {
            //     "devDeployType":"0031003",
            //     "devNo":"17",
            //     "devTypeCode":"21",
            //     "isAlarm":"0",
            //     "isInterrupt":"0",
            //     "isUseStandby":"1",
            //     "masterOrSlave":"0",
            //     "stationId":null,
            //     "workStatus":"0"
            //   },
            //   {
            //     "devDeployType":"0031004",
            //     "devNo":"39",
            //     "devTypeCode":"4",
            //     "isAlarm":"0",
            //     "isInterrupt":"0",
            //     "isUseStandby":"0",
            //     "masterOrSlave":"0",
            //     "stationId":null,
            //     "workStatus":"0"
            //   },
            //   {
            //     "devDeployType":"0031001",
            //     "devNo":"18",
            //     "devTypeCode":"11",
            //     "isAlarm":"0",
            //     "isInterrupt":"0",
            //     "isUseStandby":"0",
            //     "masterOrSlave":"0",
            //     "stationId":null,
            //     "workStatus":"0"
            //   },
            //   {
            //     "devDeployType":"0031001",
            //     "devNo":"19",
            //     "devTypeCode":"",
            //     "isAlarm":"0",
            //     "isInterrupt":"0",
            //     "isUseStandby":"0",
            //     "masterOrSlave":"0",
            //     "stationId":null,
            //     "workStatus":"0"
            //   },
            //   {
            //     "devDeployType":"0031002",
            //     "devNo":"2",
            //     "devTypeCode":"3",
            //     "isAlarm":"0",
            //     "isInterrupt":"0",
            //     "isUseStandby":"0",
            //     "masterOrSlave":this.number,
            //     "stationId":null,
            //     "workStatus":"0"
            //   },
            //   {
            //     "devDeployType":"0031003",
            //     "devNo":"3",
            //     "devTypeCode":"3",
            //     "isAlarm":"0",
            //     "isInterrupt":"0",
            //     "isUseStandby":"0",
            //     "masterOrSlave":"1",
            //     "stationId":null,
            //     "workStatus":"0"
            //   },
            //   {
            //     "devDeployType":"0031003",
            //     "devNo":"4",
            //     "devTypeCode":"3",
            //     "isAlarm":"0",
            //     "isInterrupt":"0",
            //     "isUseStandby":"0",
            //     "masterOrSlave":"1",
            //     "stationId":null,
            //     "workStatus":"0"
            //   },
            //   {
            //     "devDeployType":"0031004",
            //     "devNo":"8",
            //     "devTypeCode":"7",
            //     "isAlarm":"0",
            //     "isInterrupt":"0",
            //     "isUseStandby":"0",
            //     "masterOrSlave":"0",
            //     "stationId":null,
            //     "workStatus":"0"
            //   },
            //   {
            //     "devDeployType":"0031004",
            //     "devNo":"9",
            //     "devTypeCode":"7",
            //     "isAlarm":"0",
            //     "isInterrupt":"0",
            //     "isUseStandby":"0",
            //     "masterOrSlave":"0",
            //     "stationId":null,
            //     "workStatus":"0"
            //   },
            //   {
            //     "devDeployType":"0031002",
            //     "devNo":"40",
            //     "devTypeCode":"5",
            //     "isAlarm":"0",
            //     "isInterrupt":"0",
            //     "isUseStandby":"1",
            //     "masterOrSlave":"0",
            //     "stationId":null,
            //     "workStatus":"0"
            //   },
            //   {
            //     "devDeployType":"0031003",
            //     "devNo":"41",
            //     "devTypeCode":"5",
            //     "isAlarm":"0",
            //     "isInterrupt":"0",
            //     "isUseStandby":"1",
            //     "masterOrSlave":"0",
            //     "stationId":null,
            //     "workStatus":"0"
            //   },
            //   {
            //     "devDeployType":"0031001",
            //     "devNo":"20",
            //     "devTypeCode":"1",
            //     "isAlarm":this.number,
            //     "isInterrupt":"0",
            //     "isUseStandby":"0",
            //     "masterOrSlave":"0",
            //     "stationId":null,
            //     "workStatus":"0"
            //   },
            //   {
            //     "devDeployType":"0031001",
            //     "devNo":"42",
            //     "devTypeCode":"6",
            //     "isAlarm":"0",
            //     "isInterrupt":"0",
            //     "isUseStandby":"1",
            //     "masterOrSlave":"0",
            //     "stationId":null,
            //     "workStatus":"0"
            //   },
            //   {
            //     "devDeployType":"0031001",
            //     "devNo":"21",
            //     "devTypeCode":"",
            //     "isAlarm":"0",
            //     "isInterrupt":"0",
            //     "isUseStandby":"0",
            //     "masterOrSlave":"0",
            //     "stationId":null,
            //     "workStatus":"0"
            //   },
            //   {
            //     "devDeployType":"0031004",
            //     "devNo":"43",
            //     "devTypeCode":"4",
            //     "isAlarm":"0",
            //     "isInterrupt":"0",
            //     "isUseStandby":"0",
            //     "masterOrSlave":"0",
            //     "stationId":null,
            //     "workStatus":"0"
            //   }
            // ]
            //     this.getWSData(data)
            //   }, 1000)
            // },

            getWSData(WSdata) {
                if (WSdata.length) {
                    this.equipments.forEach(device => {
                        let dIndex = WSdata.findIndex(value => value.devNo == device.devNo)
                        if (dIndex > -1) {
                            WSdata.forEach(item => {
                                if (item.devNo == 2 && device.devNo == '2-2') {
                                    this.setWSDate(item, device, 1)
                                }
                                if (item.devNo == device.devNo) {
                                    this.setWSDate(item, device, 0)
                                }
                            })
                        } else {
                            if(device.devNo != '2-2'){
                                this.$set(device,'noData',true)
                            }
                        }
                    })
                }
            },
            setWSDate(data, obj, type) {
                if (type == 1) {
                    if (data.masterOrSlave == '1') {
                        obj.masterOrSlave = '0'
                    } else {
                        obj.masterOrSlave = '1'
                    }
                } else {

                    if (data.devNo != 20) {
                        obj.masterOrSlave = data.masterOrSlave || ''
                    }
                }
                obj.devDeployType = data.devDeployType
                obj.isInterrupt = data.isInterrupt
                obj.workStatus = data.workStatus
                obj.isUseStandby = data.isUseStandby
                obj.isAlarm = data.isAlarm
            },
            judgeDeviceStatus(device) {
                let info = {}
                if (device.isInterrupt === '0') {//是否中断 否0
                    if (device.workStatus === '0') {//如果工作状态正常 0
                        if (device.isAlarm === '1') {//告警为1  则告警
                            info = {background: '#eeb24b'}
                        } else {//告警为0  则状态为正常

                            info = {background: '#009688'}
                        }
                    } else {//不正常 则直接故障
                        info = {background: '#ff1400'}
                    }
                } else {//中断 是 1
                    info = {background: '#ff1400'}
                }
                if ((device.devNo == '2' && device.masterOrSlave == '1') || (device.devNo == '2-2' && (device.masterOrSlave == '1' || !device.masterOrSlave))) {
                    info = {background: 'black'}
                }
                if(device.noData){
                    info = {background: 'black'}
                }
                return info
            },
            devicePosition(equipment) {
                return {
                    top: this.position[equipment.devNo].top,
                    marginLeft: this.position[equipment.devNo].left
                }
            },
            masterStatus(equipment) {
                if(equipment.devNo != 20){
                    return {
                        top: this.masterPosition[equipment.devNo].top,
                        marginLeft: this.masterPosition[equipment.devNo].left,
                        width: this.masterPosition[equipment.devNo].width,
                        height: this.masterPosition[equipment.devNo].height,
                        // border: this.masterPosition[equipment.devNo].border,
                        border: equipment.masterOrSlave == '0' && (equipment.devNo != '30' && equipment.devNo != '31') ? this.masterPosition[equipment.devNo].border : '5px solid rgba(0,0,0,0)',
                    }
                }
            },
            resize() {
                this.dom.resize()
            },
            init() {
                let nodes = [
                    {
                        x: '25',
                        y: '300',
                        nodeName: '',
                        img: 'image://' + require('@/assets/images/home/wn_track.png'),
                        size: [80, 80]
                    },
//---------------舱外
                    {
                        mark: '舱外',
                        x: '115',
                        y: '305',
                        nodeName: '舱外\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n',
                        img: 'rect',
                        color: 'white',
                        border: 'dotted',
                        id: 1,
                        size: [90, 375],
                    },

                    {
                        x: '95',
                        y: '400',
                        nodeName: 'ka\n发射\n\n\n\n\n\n\nKa\n接收',
                        img: 'rect',
                        size: [30, 170],
                        color: '#c4e889'
                    },
                    {
                        x: '95',
                        y: '210',
                        nodeName: 'ku\n发射\n\n\n\n\n\n\nKu\n接收',
                        img: 'rect',
                        size: [30, 170],
                        color: '#c4e889'
                    },
                    {
                        x: '145',
                        y: '160',
                        nodeName: 'LNA  ',
                        img: 'triangle',
                        symbolRotate: -90,
                        size: [25, 30],
                        color: '#c4e889'
                    },
//---------------维修舱
                    {
                        mark: '维修舱',
                        x: '220',
                        y: '305',
                        nodeName: '维修舱\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n',
                        img: 'rect',
                        color: 'white',
                        border: 'dotted',
                        id: 1,
                        size: [120, 375],
                    },

                    {
                        x: '225',
                        y: '260',
                        nodeName: '',
                        id: 1,
                        img: 'image://' + require('@/assets/images/home/down_trans_no.png'),
                        size: [100, 70]
                    },

                    {
                        x: '225',
                        y: '282',
                        devNo: 2,
                        type: 1,//主机
                        isMajor: true,
                        nodeName: 'Ku buc       ',
                        img: 'rect',
                        size: [62, 20],
                        color: 'rgba(0,150,136,0.2)'
                    },
                    {
                        x: '225',
                        y: '238',
                        devNo: 2,
                        type: 0,//备机
                        isMajor: true,
                        nodeName: 'Ku buc      ',
                        img: 'rect',
                        size: [62, 20],
                        color: 'rgba(184,181,181,0.7)'
                    },
                    {
                        x: '225',
                        y: '160',
                        nodeName: '',
                        id: 1,
                        img: 'image://' + require('@/assets/images/home/up_trans_no.png'),
                        size: [100, 70]
                    },
                    {
                        x: '225',
                        y: '180',
                        devNo: 40,
                        isMajor: true,
                        type: 1,//主机
                        nodeName: '下变频器     ',
                        img: 'rect',
                        size: [62, 20],
                        color: 'rgba(0,150,136,0.2)'
                    },
                    {
                        x: '225',
                        y: '138',
                        devNo: 41,
                        isMajor: true,
                        type: 0,//备机
                        nodeName: '下变频器      ',
                        img: 'rect',
                        size: [62, 20],
                        color: 'rgba(184,181,181,0.7)'
                    },

//---------------工作舱
                    {
                        mark: '工作舱',
                        x: '555',
                        y: '250',
                        nodeName: '工作舱\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n',
                        img: 'rect',
                        color: 'white',
                        border: 'dotted',
                        id: 1,
                        size: [540, 485],
                    },
                    {
                        x: '330',
                        y: '300',
                        nodeName: '中\n\n频\n\n单\n\n元',
                        img: 'rect',
                        size: [30, 350],
                        color: 'rgba(227,221,152,0.8)'
                    },

                    {
                        x: '450',
                        y: '405',
                        nodeName: '调制解调器(1:1)\n\n\n\n\n\n\n\n',
                        id: 1,
                        img: 'rect',
                        size: [100, 110],
                        category: 1,
                        color: 'rgba(227,221,152,0.8)'
                    },
                    {
                        x: '450',
                        y: '430',
                        devNo: 11,
                        isMajor: true,
                        type: 1,//主机
                        nodeName: '650调制解调器    ',
                        img: 'rect',
                        size: [90, 20],
                        color: 'rgba(0,150,136,0.2)',
                        category: 2,
                        // border:'solid',
                        // borderColor:'green'
                    },
                    {
                        x: '450',
                        y: '400',
                        nodeName: '1:1转换单元',
                        img: 'rect',
                        size: [90, 20],
                        color: 'white',
                        category: 2
                    },
                    {
                        x: '450',
                        y: '370',
                        devNo: 12,
                        isMajor: true,
                        type: 0,//备机
                        nodeName: '650调制解调器    ',
                        img: 'rect',
                        size: [90, 20],
                        color: 'rgba(184,181,181,0.7)',
                        category: 2
                    },

                    {
                        x: '450',
                        y: '280',
                        nodeName: '调制解调器(1:1)\n\n\n\n\n\n\n\n',
                        id: 1,
                        img: 'rect',
                        size: [100, 110],
                        color: 'rgba(227,221,152,0.8)'
                    },
                    {
                        x: '450',
                        y: '305',
                        devNo: 13,
                        isMajor: true,
                        type: 1,//主机
                        nodeName: '650调制解调器    ',
                        img: 'rect',
                        size: [90, 20],
                        color: 'rgba(0,150,136,0.2)',
                        category: 2
                    },

                    {
                        x: '450',
                        y: '275',
                        nodeName: '1:1转换单元',
                        img: 'rect',
                        size: [90, 20],
                        color: 'white',
                        category: 2
                    },
                    {
                        x: '450',
                        y: '245',
                        devNo: 14,
                        type: 0,//备机
                        isMajor: true,
                        nodeName: '650调制解调器    ',
                        img: 'rect',
                        size: [90, 20],
                        color: 'rgba(184,181,181,0.7)',
                        category: 2
                    },

                    {
                        x: '450',
                        y: '190',
                        nodeName: '串口服务器',
                        img: 'rect',
                        size: [100, 30],
                        color: 'rgba(227,221,152,0.8)',
                        category: 2
                    },
                    {
                        x: '450',
                        y: '140',
                        nodeName: 'L频段跟踪接收机',
                        img: 'rect',
                        size: [100, 30],
                        color: 'rgba(227,221,152,0.8)',
                        category: 2
                    },
                    {
                        x: '450',
                        y: '50',
                        devNo: 20,
                        isMajor: true,
                        nodeName: '\n\n天线控制\n单元\n(ACU)',
                        img: 'rect',
                        size: [60, 60],
                        color: 'rgba(227,221,152,0.8)',
                        category: 2
                    },
                    {
                        x: '340',
                        y: '50',
                        nodeName: '天线驱动\n单元\n(ADU)',
                        img: 'rect',
                        size: [60, 60],
                        color: 'rgba(227,221,152,0.8)',
                        category: 2
                    },

                    {
                        x: '580',
                        y: '400',
                        nodeName: '路\n由\n器',
                        img: 'rect',
                        size: [30, 60],
                        color: 'rgba(227,221,152,0.8)',
                        category: 2
                    },
                    {
                        x: '580',
                        y: '320',
                        nodeName: '保\n密\n机',
                        img: 'rect',
                        size: [30, 60],
                        color: 'rgba(227,221,152,0.8)',
                        category: 2
                    },
                    {
                        x: '580',
                        y: '240',
                        nodeName: '防\n火\n墙',
                        img: 'rect',
                        size: [30, 60],
                        color: 'rgba(227,221,152,0.8)',
                        category: 2
                    },
                    {
                        x: '580',
                        y: '140',
                        nodeName: '接入交换机',
                        img: 'rect',
                        size: [60, 30],
                        color: 'rgba(227,221,152,0.8)',
                        category: 2
                    },


                    {
                        x: '650',
                        y: '430',
                        nodeName: '路\n由\n器',
                        img: 'rect',
                        size: [30, 60],
                        color: 'rgba(227,221,152,0.8)',
                        category: 2
                    },
                    {
                        x: '650',
                        y: '330',
                        nodeName: '保\n密\n机',
                        img: 'rect',
                        size: [30, 60],
                        color: 'rgba(227,221,152,0.8)',
                        category: 2
                    },
                    {
                        x: '650',
                        y: '240',
                        nodeName: '防\n火\n墙',
                        img: 'rect',
                        size: [30, 60],
                        color: 'rgba(227,221,152,0.8)',
                        category: 2
                    },
                    {
                        x: '670',
                        y: '140',
                        nodeName: '接入交换机',
                        img: 'rect',
                        size: [60, 30],
                        color: 'rgba(227,221,152,0.8)',
                        category: 2
                    },

                    {
                        x: '750',
                        y: '430',
                        nodeName: 'SDD设备',
                        img: 'rect',
                        size: [60, 30],
                        color: 'rgba(227,221,152,0.8)',
                        category: 2
                    },
                    {
                        x: '740',
                        y: '200',
                        nodeName: '',
                        img: 'rect',
                        size: [8, 300],
                        color: 'rgb(78,147,177)',
                        category: 2
                    },
                    {
                        x: '800',
                        y: '300',
                        nodeName: '指\n挥\n调\n度\n系\n统',
                        img: 'rect',
                        size: [30, 80],
                        color: 'rgba(227,221,152,0.8)',
                        category: 2
                    },
                    {
                        x: '800',
                        y: '200',
                        nodeName: '时\n间\n统\n一\n系\n统',
                        img: 'rect',
                        size: [30, 80],
                        color: 'rgba(227,221,152,0.8)',
                        category: 2
                    },
                    {
                        x: '800',
                        y: '100',
                        nodeName: '电\n话\n交\n换\n系\n统',
                        img: 'rect',
                        size: [30, 80],
                        color: 'rgba(227,221,152,0.8)',
                        category: 2
                    },
                    {
                        x: '650',
                        y: '50',
                        nodeName: '卫通站监控系统',
                        img: 'rect',
                        size: [80, 30],
                        color: 'rgb(175,153,198)',
                        category: 2
                    },

                    {
                        x: '45',
                        y: '80',
                        nodeName: '配电及控保单元',
                        img: 'rect',
                        size: [100, 30],
                        color: 'rgb(124,203,238)',
                        category: 2
                    },
                    {
                        x: '145',
                        y: '80',
                        nodeName: 'UPS',
                        img: 'rect',
                        size: [60, 30],
                        color: 'rgb(124,203,238)',
                        category: 2
                    },
                    {
                        x: '145',
                        y: '20',
                        nodeName: '市电',
                        img: 'rect',
                        size: [60, 30],
                        color: 'rgb(124,203,238)',
                        category: 2
                    },
                    {
                        x: '220',
                        y: '80',
                        nodeName: '油机',
                        img: 'rect',
                        size: [60, 30],
                        color: 'rgb(124,203,238)',
                        category: 2
                    },
                ]
                var charts = {
                    nodes: [],
                    linesData: [
                        {
                            mark: 'Ku->设备',
                            name: '',
                            coords: [[80, 285], [35, 285]],
                            lineStyle: {
                                normal: {
                                    color: '#020202'
                                }
                            },
                            effect: {
                                color: '#dc6414'
                            }
                        },

                        {
                            mark: 'ku->lna',
                            name: '',
                            coords: [[110, 160], [130, 160]],
                            lineStyle: {
                                normal: {
                                    color: '#020202'
                                }
                            },
                            effect: {
                                color: '#143fdc'
                            }
                        },
                        {
                            mark: 'lna->下变频器',
                            name: '',
                            coords: [[160, 160], [176, 160]],
                            lineStyle: {
                                normal: {
                                    color: '#020202'
                                }
                            },
                            effect: {
                                color: '#143fdc'
                            }
                        },

                        {
                            mark: 'ku buc->ku',
                            name: '',
                            coords: [[176, 260], [110, 260]],
                            lineStyle: {
                                normal: {
                                    color: '#020202'
                                }
                            },
                            effect: {
                                color: '#dc6414'
                            }
                        },
                        {
                            mark: '中频单元->ku buc',
                            name: '',
                            coords: [[315, 260], [274, 260]],
                            lineStyle: {
                                normal: {
                                    color: '#020202'
                                }
                            },
                            effect: {
                                color: '#dc6414'
                            }
                        },
                        {
                            mark: '下变频器->中频单元',
                            name: '',
                            coords: [[274, 160], [315, 160]],
                            lineStyle: {
                                normal: {
                                    color: '#020202'
                                }
                            },
                            effect: {
                                color: '#143fdc'
                            }
                        },

                        {
                            mark: '竖线->指挥调度',
                            name: '',
                            coords: [[745, 300], [780, 300]],
                            lineStyle: {
                                normal: {
                                    color: '#020202'
                                }
                            },
                            effect: {
                                color: 'rgba(0,0,0,0)'
                            }
                        },
                        {
                            mark: '竖线->时间统一',
                            name: '',
                            coords: [[745, 200], [780, 200]],
                            lineStyle: {
                                normal: {
                                    color: '#020202'
                                }
                            },
                            effect: {
                                color: 'rgba(0,0,0,0)'
                            }
                        },
                        {
                            mark: '竖线->电话交换',
                            name: '',
                            coords: [[745, 100], [780, 100]],
                            lineStyle: {
                                normal: {
                                    color: '#020202'
                                }
                            },
                            effect: {
                                color: 'rgba(0,0,0,0)'
                            }
                        },
                        {
                            mark: '竖线->卫通站监控系统',
                            name: '',
                            coords: [[735, 50], [690, 50]],
                            lineStyle: {
                                normal: {
                                    color: '#020202'
                                }
                            },
                            effect: {
                                color: 'rgba(0,0,0,0)'
                            }
                        },

                        {
                            mark: '光纤',
                            name: '光纤',
                            coords: [[780, 430], [820, 430]],
                            lineStyle: {
                                normal: {
                                    color: '#020202'
                                }
                            },
                            effect: {
                                color: '#143fdc'
                            }
                        },
                        {
                            mark: '光纤',
                            name: '',
                            coords: [[820, 430], [780, 430]],
                            lineStyle: {
                                normal: {
                                    color: '#020202'
                                }
                            },
                            effect: {
                                color: '#dc6414'
                            }
                        },

                        {
                            mark: '路由器->sdd',
                            name: 'IP',
                            coords: [[665, 430], [720, 430]],
                            lineStyle: {
                                normal: {
                                    color: '#020202'
                                }
                            },
                            effect: {
                                color: '#143fdc'
                            }
                        },
                        {
                            mark: 'sdd->路由器',
                            name: '',
                            coords: [[720, 430], [665, 430]],
                            lineStyle: {
                                normal: {
                                    color: '#020202'
                                }
                            },
                            effect: {
                                color: '#dc6414'
                            }
                        },
                        {
                            mark: '路由器-> 保密机',
                            name: '',
                            coords: [[650, 400], [650, 360]],
                            lineStyle: {
                                normal: {
                                    color: '#020202'
                                }
                            },
                            effect: {
                                color: '#dc6414'
                            }
                        },
                        {
                            mark: '保密机-》路由器',
                            name: '',
                            coords: [[650, 360], [650, 400]],
                            lineStyle: {
                                normal: {
                                    color: '#020202'
                                }
                            },
                            effect: {
                                color: '#143fdc'
                            }
                        },

                        {
                            mark: '保密机-》防火墙',
                            name: '',
                            coords: [[650, 300], [650, 270]],
                            lineStyle: {
                                normal: {
                                    color: '#020202'
                                }
                            },
                            effect: {
                                color: '#dc6414'
                            }
                        },
                        {
                            mark: '防火墙-> 保密机',
                            name: '',
                            coords: [[650, 270], [650, 300]],
                            lineStyle: {
                                normal: {
                                    color: '#020202'
                                }
                            },
                            effect: {
                                color: '#143fdc'
                            }
                        },
                        {
                            mark: '接入交换机 右->竖线',
                            name: '',
                            coords: [[700, 140], [735, 140]],
                            lineStyle: {
                                normal: {
                                    color: '#020202'
                                }
                            },
                            effect: {
                                color: 'rgba(0,0,0,0)'
                            }
                        },

                        {
                            mark: '路由器 左-> 保密机',
                            name: '',
                            coords: [[580, 370], [580, 350]],
                            lineStyle: {
                                normal: {
                                    color: '#020202'
                                }
                            },
                            effect: {
                                color: '#143fdc'
                            }
                        },
                        {
                            mark: '保密机 左-》路由器',
                            name: '',
                            coords: [[580, 350], [580, 370]],
                            lineStyle: {
                                normal: {
                                    color: '#020202'
                                }
                            },
                            effect: {
                                color: '#dc6414'
                            }
                        },


                        {
                            mark: '保密机 左-》防火墙',
                            name: '',
                            coords: [[580, 290], [580, 270]],
                            lineStyle: {
                                normal: {
                                    color: '#020202'
                                }
                            },
                            effect: {
                                color: '#143fdc'
                            }
                        },
                        {
                            mark: '防火墙 左-> 保密机',
                            name: '',
                            coords: [[580, 270], [580, 290]],
                            lineStyle: {
                                normal: {
                                    color: '#020202'
                                }
                            },
                            effect: {
                                color: '#dc6414'
                            }
                        },


                        {
                            mark: '接入交换机 左-》防火墙 右',
                            name: '',
                            coords: [[590, 155], [650, 210]],
                            lineStyle: {
                                normal: {
                                    color: '#020202'
                                }
                            },
                            effect: {
                                color: '#143fdc'
                            }
                        },
                        {
                            mark: '防火墙 右-> 接入交换机 左',
                            name: '',
                            coords: [[650, 210], [590, 155]],
                            lineStyle: {
                                normal: {
                                    color: '#020202'
                                }
                            },
                            effect: {
                                color: '#dc6414'
                            }
                        },


                        {
                            mark: '接入交换机 右-》防火墙  左',
                            name: '',
                            coords: [[650, 155], [590, 210]],
                            lineStyle: {
                                normal: {
                                    color: '#020202'
                                }
                            },
                            effect: {
                                color: '#dc6414'
                            }
                        },
                        {
                            mark: '防火墙  左-> 接入交换机 右',
                            name: '',
                            coords: [[590, 210], [650, 155]],
                            lineStyle: {
                                normal: {
                                    color: '#020202'
                                }
                            },
                            effect: {
                                color: '#143fdc'
                            }
                        },
                        //----------------------工作仓-------------
                        {
                            mark: '中频单元->调制解调器 上',
                            name: '中频入',
                            coords: [[350, 410], [400, 410]],
                            lineStyle: {
                                normal: {
                                    color: '#020202'
                                }
                            },
                            effect: {
                                color: '#143fdc'
                            }
                        },
                        {
                            mark: '调制解调器 上->中频单元',
                            name: '中频出',
                            coords: [[400, 390], [350, 390]],
                            lineStyle: {
                                normal: {
                                    color: '#020202'
                                }
                            },
                            effect: {
                                color: '#dc6414'
                            }
                        },
                        {
                            mark: '中频单元->调制解调器 下',
                            name: '中频入',
                            coords: [[350, 280], [400, 280]],
                            lineStyle: {
                                normal: {
                                    color: '#020202'
                                }
                            },
                            effect: {
                                color: '#143fdc'
                            }
                        },
                        {
                            mark: '调制解调器 下->中频单元',
                            name: '中频出',
                            coords: [[400, 265], [350, 265]],
                            lineStyle: {
                                normal: {
                                    color: '#020202'
                                }
                            },
                            effect: {
                                color: '#dc6414'
                            }
                        },
                        {
                            mark: '中频单元->L频段跟踪接收机',
                            name: '中频出',
                            coords: [[350,140], [400, 140]],
                            lineStyle: {
                                normal: {
                                    color: '#020202'
                                }
                            },
                            effect: {
                                color: '#143fdc'
                            }
                        },
                        {
                            mark: 'L频段跟踪接收机-》天线控制单元ACU',
                            name: '',
                            coords: [[450, 120], [450, 80]],
                            lineStyle: {
                                normal: {
                                    color: '#020202'
                                }
                            },
                            effect: {
                                color: '#143fdc'
                            }
                        },
                        {
                            mark: '天线驱动-》天线控制',
                            name: '',
                            coords: [[370, 50], [420, 50]],
                            lineStyle: {
                                normal: {
                                    color: '#020202'
                                }
                            },
                            effect: {
                                color: '#dc6414'
                            }
                        },
                        {
                            mark: '天线控制->天线驱动',
                            name: '',
                            coords: [[420, 50], [370, 50]],
                            lineStyle: {
                                normal: {
                                    color: '#020202'
                                }
                            },
                            effect: {
                                color: '#143fdc'
                            }
                        },


                        {
                            mark: '调制解调器 上->路由器 左',
                            name: 'IP',
                            coords: [[500, 430], [565, 430]],
                            lineStyle: {
                                normal: {
                                    color: '#020202'
                                }
                            },
                            effect: {
                                color: '#143fdc'
                            }
                        },
                        {
                            mark: '路由器 左-》调制解调器 上->',
                            name: 'IP',
                            coords: [[565, 430], [500, 430]],
                            lineStyle: {
                                normal: {
                                    color: '#020202'
                                }
                            },
                            effect: {
                                color: '#dc6414'
                            }
                        },
                        //为了显示折线的字
                        {
                            mark: '调制解调器 上-》串口',
                            name: '远程信号',
                            coords: [[520, 380], [520, 330]],
                            lineStyle: {
                                normal: {
                                    color: '#020202'
                                }
                            },
                            effect: {
                                color: 'rgba(0,0,0,0)'
                            }
                        },
                        {
                            mark: '路由器 左-》调制 下',
                            name: 'IP',
                            coords: [[545, 280], [530, 280]],
                            lineStyle: {
                                normal: {
                                    color: '#020202'
                                }
                            },
                            effect: {
                                color: 'rgba(0,0,0,0)'
                            }
                        },
                        {
                            mark: '串口-》调制 下',
                            name: '远程信号',
                            coords: [[530, 250], [530, 210]],
                            lineStyle: {
                                normal: {
                                    color: '#020202'
                                }
                            },
                            effect: {
                                color: 'rgba(0,0,0,0)'
                            }
                        },
                        //----------------------供电-------------
                        {
                            mark: '配电及控宝单元',
                            name: '',
                            coords: [[3, 100], [3, 130]],
                            lineStyle: {
                                normal: {
                                    color: '#020202'
                                }
                            },
                            effect: {
                                color: '#143fdc'
                            }
                        },
                        {
                            mark: '配电及控宝单元',
                            name: '',
                            coords: [[20, 100], [20, 130]],
                            lineStyle: {
                                normal: {
                                    color: '#020202'
                                }
                            },
                            effect: {
                                color: '#143fdc'
                            }
                        },
                        {
                            mark: '配电及控宝单元',
                            name: '',
                            coords: [[40, 100], [40, 130]],
                            lineStyle: {
                                normal: {
                                    color: '#020202'
                                }
                            },
                            effect: {
                                color: '#143fdc'
                            }
                        },

                        {
                            mark: 'UPS-》配电及控宝单元',
                            name: '',
                            coords: [[115, 80], [95, 80]],
                            lineStyle: {
                                normal: {
                                    color: '#020202'
                                }
                            },
                            effect: {
                                color: '#143fdc'
                            }
                        },
                        {
                            mark: '油机-》UPS',
                            name: '',
                            coords: [[185, 80], [175, 80]],
                            lineStyle: {
                                normal: {
                                    color: '#020202'
                                }
                            },
                            effect: {
                                color: '#143fdc'
                            }
                        },
                        {
                            mark: '市电->UPS',
                            name: '',
                            coords: [[145, 40], [145, 65]],
                            lineStyle: {
                                normal: {
                                    color: '#020202'
                                }
                            },
                            effect: {
                                color: '#143fdc'
                            }
                        },

                    ],
                    polyLines: [
                        {
                            mark: '设备->ka',
                            name: '',
                            coords: [[30, 315], [30, 350],[80,350]],
                            lineStyle: {
                                normal: {
                                    color: '#020202'
                                }
                            },
                            effect: {
                                color: '#143fdc'
                            }
                        },
                        {
                            mark: '设备->Ku',
                            name: '',
                            coords: [[30, 280], [30, 160], [80, 160]],
                            lineStyle: {
                                normal: {
                                    color: '#020202'
                                }
                            },
                            effect: {
                                color: '#143fdc'
                            }
                        },
                        {
                            mark: '防火墙-> 接入交换机 右',
                            name: '',
                            coords: [[660, 210], [670, 210], [670, 155], [660, 155]],
                            lineStyle: {
                                normal: {
                                    color: '#020202'
                                }
                            },
                            effect: {
                                color: '#dc6414'
                            }
                        },
                        {
                            mark: '接入交换机 右 ->防火墙',
                            name: '',
                            coords: [[660, 155], [670, 155], [670, 210], [660, 210]],
                            lineStyle: {
                                normal: {
                                    color: '#020202'
                                }
                            },
                            effect: {
                                color: '#143fdc'
                            }
                        },
                        {
                            mark: '接入交换机 左 ->防火墙',
                            name: '',
                            coords: [[570, 210], [580, 210], [580, 155], [570, 155]],
                            lineStyle: {
                                normal: {
                                    color: '#020202'
                                }
                            },
                            effect: {
                                color: '#dc6414'
                            }
                        },
                        {
                            mark: '防火墙-=》接入交换机 左 ',
                            name: '',
                            coords: [[570, 155], [580, 155], [580, 210], [570, 210]],
                            lineStyle: {
                                normal: {
                                    color: '#020202'
                                }
                            },
                            effect: {
                                color: '#143fdc'
                            }
                        },
                        {
                            mark: '接入交换机 左->竖线',
                            name: '',
                            coords: [[580, 125], [580, 105], [735, 105]],
                            lineStyle: {
                                normal: {
                                    color: '#020202'
                                }
                            },
                            effect: {
                                color: 'rgba(0,0,0,0)'
                            }
                        },
                        {
                            mark: '串口服务器->竖线',
                            name: '',
                            coords: [[500, 178], [530, 178], [530, 95], [735, 95]],
                            lineStyle: {
                                normal: {
                                    color: '#020202'
                                }
                            },
                            effect: {
                                color: '#143fdc'
                            }
                        },
                        {
                            mark: '竖线->串口服务器',
                            name: '',
                            coords: [[735, 95], [530, 95], [530, 178], [500, 178]],
                            lineStyle: {
                                normal: {
                                    color: '#020202'
                                }
                            },
                            effect: {
                                color: '#dc6414'
                            }
                        },


                        {
                            mark: '串口服务器->调制解调器 上',
                            name: '',
                            coords: [[500, 200], [520, 200], [520, 420], [500, 420]],
                            lineStyle: {
                                normal: {
                                    color: '#020202'
                                }
                            },
                            effect: {
                                color: '#143fdc'
                            }
                        },
                        {
                            mark: '调制解调器 上->串口服务器',
                            name: '',
                            coords: [[500, 420], [520, 420], [520, 200], [500, 200]],
                            lineStyle: {
                                normal: {
                                    color: '#020202'
                                }
                            },
                            effect: {
                                color: '#143fdc'
                            }
                        },


                        {
                            mark: '串口服务器->调制解调器 下',
                            name: '',
                            coords: [[500, 190], [530, 190], [530, 270], [500, 270]],
                            lineStyle: {
                                normal: {
                                    color: '#020202'
                                }
                            },
                            effect: {
                                color: '#143fdc'
                            }
                        },
                        {
                            mark: '调制解调器 下->串口服务器',
                            name: '',
                            coords: [[500, 270], [530, 270], [530, 190], [500, 190]],
                            lineStyle: {
                                normal: {
                                    color: '#020202'
                                }
                            },
                            effect: {
                                color: '#143fdc'
                            }
                        },
                        {
                            mark: '调制解调器 下->路由器 左',
                            name: '',
                            coords: [[500, 280], [545, 280], [545, 405], [565, 405]],
                            lineStyle: {
                                normal: {
                                    color: '#020202'
                                }
                            },
                            effect: {
                                color: '#143fdc'
                            }
                        },
                        {
                            mark: ' 路由器 左->调制解调器 下',
                            name: '',
                            coords: [[565, 405], [545, 405], [545, 280], [500, 280]],
                            lineStyle: {
                                normal: {
                                    color: '#020202'
                                }
                            },
                            effect: {
                                color: '#dc6414'
                            }
                        },


                    ]
                }
                this.dom.off('click')
                for (var j = 0; j < nodes.length; j++) {
                    var x = parseInt(nodes[j].x)
                    var y = parseInt(nodes[j].y)
                    var node = {
                        isMajor: nodes[j].isMajor,
                        devNo: nodes[j].devNo,
                        showTag: nodes[j].id,
                        nodeName: nodes[j].nodeName,
                        value: [x, y],
                        symbolSize: nodes[j].size ? nodes[j].size : 1,
                        alarm: nodes[j].alarm,
                        symbol: nodes[j].img,
                        type: nodes[j].type,
                        fixed: true,
                        category: nodes[j].category,
                        symbolRotate: nodes[j].symbolRotate ? nodes[j].symbolRotate : '',
                        itemStyle: {
                            normal: {
                                color: nodes[j].color ? nodes[j].color : '#12b5d0',
                            }
                        },
                        emphasis: {}
                    }
                    if (nodes[j].border) {
                        node.itemStyle.normal.borderType = nodes[j].border
                        node.itemStyle.normal.borderDashOffset = nodes[j].offset
                        node.itemStyle.normal.borderColor = nodes[j].borderColor ? nodes[j].borderColor : 'grey'
                        node.itemStyle.normal.borderWidth = '2'
                    }

                    charts.nodes.push(node)
                }
                var option = {
                    animation: false,
                    grid: {left: '10',bottom:'15',top:'5',right:'5'},
                    xAxis: {
                        min: 0,
                        max: 830,
                        show: false,
                        type: 'value'
                    },
                    yAxis: {
                        min: 0,
                        max: 510,
                        show: false,
                        type: 'value'
                    },
                    series: [

                        {
                            type: "lines",
                            symbol: ['none', 'none'],
                            z: 2,
                            symbolSize: 10,
                            polyline: true,
                            coordinateSystem: "cartesian2d",
                            label: {
                                show: true,
                                position: 'middle',
                            },
                            lineStyle: {
                                color: 'green',
                                width: 1,
                                opacity: 1,
                                curveness: 0
                            },
                            effect: {
                                show: true,
                                trailLength: 0.1,
                                symbol: 'arrow',
                                color: '#87e2ef',
                                symbolSize: 6
                            },
                            data: charts.polyLines
                        },
                        {
                            type: "lines",
                            symbol: ['none', 'none'],
                            z: 3,
                            symbolSize: 10,
                            coordinateSystem: "cartesian2d",
                            label: {
                                show: true,
                                position: 'middle',
                            },
                            lineStyle: {
                                color: 'green',
                                width: 1.5,
                                opacity: 1,
                                curveness: 0
                            },
                            effect: {
                                show: true,
                                trailLength: 0.1,
                                symbol: 'arrow',
                                color: '#87e2ef',
                                symbolSize: 6
                            },
                            data: charts.linesData
                        },
                        {
                            type: 'graph',
                            z: 1,
                            coordinateSystem: 'cartesian2d',
                            label: {
                                show: true,
                                fontSize: 11,
                                color: 'black',
                                position: 'inside',
                                formatter: function (item) {
                                    return item.data.nodeName
                                }
                            },
                            data: charts.nodes,
                        },
                    ]
                }
                var that = this
                this.dom.on('mouseover', function (e) {
                    if (e.data.showTag == 1) {
                        that.dom.dispatchAction({
                            type: 'downplay',
                            seriesIndex: e.seriesIndex
                        })
                    }
                });
                this.dom.on('click', function (info) {
                    if (info.data.devNo) {
                        that.$xy.vector.$emit("deviceNumber", info.data.devNo)
                        that.paramModal = true
                    }
                });
                this.dom.setOption(option);
                on(window, 'resize', this.resize)
            },
            openParam(info) {
                if (info.devNo) {
                    this.$xy.vector.$emit("deviceNumber", info.devNo == '2-2' ? '2' : info.devNo)
                    this.paramModal = true
                }
            }
        }
    }
</script>
<style>
  .charts {
    height: 518px;
    width: 830px;
    /*border: 1px solid red;*/
  }
</style>
<style lang="less" scoped>
  /* 设置动画前颜色 */
  .point-flicker:after {
    background-color: #ffbe08;
  }

  /* 设置动画后颜色 */
  .point-flicker:before {
    background-color: rgba(255, 190, 8, 0.2);
  }

  /* 设置动画 */
  .point-flicker:before,
  .point-flicker:after {
    content: '';
    width: 25px;
    height: 25px;
    position: absolute;
    margin-left: -5px;
    margin-top: -5px;
    border-radius: 50%;
    animation: warn 1.5s ease-out 0s infinite;
  }

  /* @keyframes 规则用于创建动画。在 @keyframes 中规定某项 CSS 样式，就能创建由当前样式逐渐改为新样式的动画效果。 */
  @keyframes warn {
    0% {
      transform: scale(0.5);
      opacity: 1;
    }

    30% {
      opacity: 1;
    }

    100% {
      transform: scale(1.4);
      opacity: 0;
    }
  }


  .legend {
    margin-left: 20px;
    display: flex;
    flex-direction: row;

    .legend_status {
      margin-top: -10px;
      //display: flex;
      //flex-direction: row;
      margin-right: 10px;
      align-items: center;

      &:first-child {
        margin-right: 10px;

        span {
          border: 2px solid;
        }
      }

      span {
        display: inline-block;
        background: #ccc;
        height: 16px;
        width: 16px;
        margin-right: 5px;
      }

      .circle {
        border-radius: 50%;
      }
    }

  }

  .device_title {
    cursor: pointer;
    margin-top: -22px;
    z-index: 999;
    position: relative;

    span {
      display: inline-block;
      background: black;
      height: 10px;
      width: 10px;
      border-radius: 50%;
    }
  }
  .device_status {
    margin-top: -21px;
    z-index: 100;
    position: relative;

    span {
      display: inline-block;
      background: black;
      height: 10px;
      width: 10px;
      border-radius: 50%;
    }
  }
</style>
