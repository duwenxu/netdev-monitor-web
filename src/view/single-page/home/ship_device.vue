<template>
  <div>
    <template v-for="equipment in equipments">
      <div class="device_title" :style="devicePosition(equipment)" @click="openParam(equipment)">
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
                        devNo: '16',
                        name: '400W高功放',
                        isInterrupt: '0',
                        workStatus: '0',
                        isAlarm: '0',
                        isUseStandby: false,
                        masterOrSlave: '0'
                    },
                    // {
                    //   devNo: '17',
                    //   name: '备份高功放',
                    //   isInterrupt: '0',
                    //   workStatus: '0',
                    //   isAlarm: '0',
                    //   isUseStandby: false,
                    //   masterOrSlave: '1'
                    // },
                    {
                        devNo: '36',
                        name: '上变频器',
                        isInterrupt: '0',
                        workStatus: '0',
                        isAlarm: '0',
                        isUseStandby: false,
                        masterOrSlave: '0'
                    },
                    {
                        devNo: '37',
                        name: '上变频器2',
                        isInterrupt: '0',
                        workStatus: '0',
                        isAlarm: '0',
                        isUseStandby: false,
                        masterOrSlave: '1'
                    },
                    {
                        devNo: '24',
                        name: '下变频器1',
                        isInterrupt: '0',
                        workStatus: '0',
                        isAlarm: '0',
                        isUseStandby: false,
                        masterOrSlave: ''
                    },
                    {
                        devNo: '40',
                        name: '下变频器2',
                        isInterrupt: '0',
                        workStatus: '0',
                        isAlarm: '0',
                        isUseStandby: false,
                        masterOrSlave: ''
                    },
                ],
                position: {
                    '11': {
                        mark:'A调制解调器1',
                        top: '141px',
                        left: '1340px',
                    },
                    '12': {
                        mark:'A调制解调器2',
                        top: '236px',
                        left: '1340px',
                    },
                    '13': {
                        mark:'B调制解调器1',
                        top: '340px',
                        left: '1340px',
                    },
                    '14': {
                        mark:'B调制解调器2',
                        top: '436px',
                        left: '1340px',
                    },
                    '16': {
                        mark:'400W高功放',
                        top: '232px',
                        left: '522px',
                    },
                    '36': {
                        mark:'上变频器1',
                        top: '170px',
                        left: '850px',
                    },
                    '37': {
                        mark:'上变频器2',
                        top: '245px',
                        left: '850px',
                    },
                    '24': {
                        mark:'下变频器1',
                        top: '450px',
                        left: '840px',
                    },
                    '40': {
                        mark:'下变频器2',
                        top: '526px',
                        left: '840px',
                    },
                },
                masterPosition: {
                    '11': {
                        mark:'A调制解调器1',
                        border: '5px solid green',
                        width: '152px',
                        height: '32px',
                        top: '143px',
                        left: '1220px',
                    },
                    '12': {
                        mark:'A调制解调器2',
                        border: '5px solid green',
                        width: '152px',
                        height: '32px',
                        top: '237px',
                        left: '1220px',
                    },
                    '13': {
                        mark:'B调制解调器1',
                        border: '5px solid green',
                        width: '152px',
                        height: '32px',
                        top: '342px',
                        left: '1220px',
                    },
                    '14': {
                        mark:'B调制解调器2',
                        border: '5px solid green',
                        width: '152px',
                        height: '32px',
                        top: '437px',
                        left: '1220px',
                    },
                    '16': {
                        mark:'400W高功放',
                        border: '5px solid green',
                        width: '125px',
                        height: '62px',
                        top: '220px',
                        left: '423px',
                    },
                    '36': {
                        mark:'上变频器1',
                        border: '5px solid green',
                        width: '125px',
                        height: '48px',
                        top: '164px',
                        left: '753px',
                    },
                    '37': {
                        mark:'上变频器2',
                        border: '5px solid green',
                        width: '125px',
                        height: '48px',
                        top: '238px',
                        left: '753px',
                    },
                    '24': {
                        mark:'下变频器1',
                        border: '5px solid green',
                        width: '120px',
                        height: '48px',
                        top: '445px',
                        left: '750px',
                    },
                    '40': {
                        mark:'下变频器2',
                        border: '5px solid green',
                        width: '120px',
                        height: '50px',
                        top: '521px',
                        left: '750px',
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
                                this.setWSDate(item, device)
                            })
                        } else {
                            this.$set(device,'noData',true)
                        }
                    })
                }
            },
            setWSDate(data, obj) {
                obj.masterOrSlave = data.masterOrSlave
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
                if(device.noData){//推送的数据中不存在当前设备状态
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
                if (equipment.devNo != 20) {
                    return {
                        zIndex:this.masterPosition[equipment.devNo].zIndex?this.masterPosition[equipment.devNo].zIndex:999,
                        top: this.masterPosition[equipment.devNo].top,
                        marginLeft: this.masterPosition[equipment.devNo].left,
                        width: this.masterPosition[equipment.devNo].width,
                        height: this.masterPosition[equipment.devNo].height,
                        // border: this.masterPosition[equipment.devNo].border,
                        border: equipment.masterOrSlave == '0' ? this.masterPosition[equipment.devNo].border : '5px solid rgba(0,0,0,0)',
                    }
                }
            },
            resize() {
                this.dom.resize()
            },
            init() {
                let nodes = [
                    {
                        x: '30',
                        y: '600',
                        nodeName: '1.5m天线   \n(含伺服)',
                        img: 'image://' + require('@/assets/images/home/antenna.png'),
                        size: [220, 220]
                    },
                    // {
                    //   x: '460',
                    //   y: '695',
                    //   nodeName: '备份高功放      ',
                    //   img: 'rect',
                    //   size: [120, 60],
                    //   color: 'rgba(184,181,181,0.7)',
                    //   border:'black',
                    // },
                    {
                        x: '400',
                        y: '640',
                        nodeName: '400W高功放      ',
                        img: 'rect',
                        size: [120, 60],
                        color: '#c4e889',
                        border:'black',
                    },


                    {
                        x: '460',
                        y: '500',
                        nodeName: '低噪声放大器',
                        img: 'rect',
                        size: [130, 60],
                        color: '#c4e889',
                        border:'black',
                    },
                    {
                        x: '400',
                        y: '445',
                        nodeName: '低噪声放大器',
                        img: 'rect',
                        size: [130, 60],
                        color: '#c4e889',
                        border:'black',
                    },
                    {
                        x: '560',
                        y: '370',
                        nodeName: '',
                        img: 'rect',
                        size: [40, 40],
                        color: 'rgba(0,0,0,0)',
                        border:'black',
                    },
                    {
                        x: '400',
                        y: '300',
                        nodeName: '合成网络',
                        img: 'rect',
                        size: [130, 60],
                        color: '#c4e889',
                        border:'black',
                    },
                    {
                        x: '400',
                        y: '170',
                        nodeName: '单脉冲跟踪接收机',
                        img: 'rect',
                        size: [150, 60],
                        color: '#c4e889',
                        border:'black',
                    },
                    {
                        x: '400',
                        y: '50',
                        nodeName: '天线控制单元',
                        img: 'rect',
                        size: [130, 60],
                        color: '#c4e889',
                        border:'black',
                    },

                    {
                        x: '60',
                        y: '330',
                        nodeName: '差支\n\n路低\n\n噪声',
                        img: 'rect',
                        size: [60, 100],
                        color: '#c4e889',
                        border:'black',
                    },
                    {
                        x: '800',
                        y: '640',
                        id:1,
                        nodeName: '',
                        img: 'image://' + require('@/assets/images/home/down_trans.png'),
                        size: [220, 130]
                    },
                    {
                        x: '807',
                        y: '692',
                        nodeName: '上变频器       ',
                        img: 'rect',
                        size: [117, 42],
                      color: 'rgba(0,150,136,0.2)',
                        border:'black',
                    },
                    {
                        x: '807',
                        y: '595',
                        nodeName: '上变频器       ',
                        img: 'rect',
                        size: [117, 42],
                        color: 'rgba(184,181,181,1)',
                        border:'black',
                    },
                    {
                        x: '800',
                        y: '300',
                        nodeName: '',
                        id:1,
                        img: 'image://' + require('@/assets/images/home/up_trans.png'),
                        size: [220, 130]
                    },
                    {
                        x: '800',
                        y: '350',
                        nodeName: '下变频器       ',
                        img: 'rect',
                        size: [117, 42],
                      color: 'rgba(0,150,136,0.2)',
                        border:'black',
                    },
                    {
                        x: '800',
                        y: '251',
                        nodeName: '下变频器       ',
                        img: 'rect',
                        size: [117, 42],
                        color: 'rgba(184,181,181,1)',
                        border:'black',
                    },
                    {
                        x: '1050',
                        y: '130',
                        nodeName: '串口服务器',
                        img: 'rect',
                        size: [120, 60],
                        color: '#c4e889',
                        border:'black',
                    },
                    {
                        x: '1050',
                        y: '10',
                        nodeName: '卫通网管',
                        img: 'rect',
                        size: [100, 40],
                        color: '#c4e889',
                        border:'black',
                    },
                    {
                        x: '1200',
                        y: '500',
                        nodeName: '中\n\n频\n\n分\n\n合\n\n路\n\n单\n\n元',
                        img: 'rect',
                        size: [60, 450],
                        color: '#c4e889',
                        border:'black',
                    },
                    {
                        x: '1400',
                        y: '660',
                        nodeName: '调制解调器(1:1)\n\n\n\n\n\n\n\n\n',
                        id: 1,
                        img: 'rect',
                        size: [160, 160],
                        category: 1,
                        color: 'rgba(227,221,152,0.8)'
                    },
                    {
                        x: '1400',
                        y: '700',
                        devNo: 11,
                        isMajor: true,
                        type: 1,//主机
                        nodeName: '650调制解调器        ',
                        img: 'rect',
                        size: [150, 30],
                        color: 'rgba(0,150,136,0.2)',
                        category: 2,
                        // border:'solid',
                        // borderColor:'green'
                    },
                    {
                        x: '1400',
                        y: '650',
                        nodeName: '1:1转换单元',
                        img: 'rect',
                        size: [150, 30],
                        color: 'white',
                        category: 2
                    },
                    {
                        x: '1400',
                        y: '600',
                        devNo: 12,
                        isMajor: true,
                        type: 0,//备机
                        nodeName: '650调制解调器       ',
                        img: 'rect',
                        size: [150, 30],
                        color: 'rgba(184,181,181,1)',
                        category: 2
                    },

                    {
                        x: '1400',
                        y: '450',
                        nodeName: '调制解调器(1:1)\n\n\n\n\n\n\n\n\n',
                        id: 1,
                        img: 'rect',
                        size: [160, 160],
                        color: 'rgba(227,221,152,0.8)'
                    },
                    {
                        x: '1400',
                        y: '490',
                        devNo: 13,
                        isMajor: true,
                        type: 1,//主机
                        nodeName: '650调制解调器       ',
                        img: 'rect',
                        size: [150, 30],
                        color: 'rgba(0,150,136,0.2)',
                        category: 2
                    },
                    {
                        x: '1400',
                        y: '440',
                        nodeName: '1:1转换单元',
                        img: 'rect',
                        size: [150, 30],
                        color: 'white',
                        category: 2
                    },
                    {
                        x: '1400',
                        y: '390',
                        devNo: 14,
                        type: 0,//备机
                        isMajor: true,
                        nodeName: '650调制解调器       ',
                        img: 'rect',
                        size: [150, 30],
                        color: 'rgba(184,181,181,1)',
                        category: 2
                    },
                ]
                var charts = {
                    nodes: [],
                    linesData: [
                        {
                            mark: '设备->低噪声放大器',
                            name: '',
                            coords: [[80, 480], [320, 480]],
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
                            mark: '合成网络->单脉冲',
                            name: '',
                            coords: [[400, 260], [400, 200]],
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
                            mark: '单脉冲->天线控制',
                            name: '',
                            coords: [[400, 130], [400, 80]],
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
                            mark: '上变频器->设备',
                            name: '',
                            coords: [[700, 640], [70, 640]],
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
                            mark: '中频->上变频器',
                            name: '',
                            coords: [[1160, 640], [925, 640]],
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
                            mark: '下变频器->中频',
                            name: '',
                            coords: [[925, 300], [1160, 300]],
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
                            mark: '调制解调器 上->中频',
                            name: '',
                            coords: [[1300, 660], [1240, 660]],
                            lineStyle: {
                                normal: {
                                    color: '#dc6414'
                                }
                            },
                            effect: {
                                color: '#dc6414'
                            }
                        },
                        {
                            mark: '中频-》调制解调器 上->',
                            name: '',
                            coords: [[1240, 640], [1300, 640]],
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
                            mark: '调制解调器 下->中频',
                            name: '',
                            coords: [[1300, 450], [1240, 450]],
                            lineStyle: {
                                normal: {
                                    color: '#dc6414'
                                }
                            },
                            effect: {
                                color: '#dc6414'
                            }
                        },
                        {
                            mark: '中频-》调制解调器 下->',
                            name: '',
                            coords: [[1240, 430], [1300, 430]],
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
                            mark: '调制解调器 下->竖线',
                            name: '',
                            coords: [[1500, 440], [1545, 440]],
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
                            mark: '竖线-》调制解调器 下->',
                            name: '',
                            coords: [[1545, 440], [1500, 440]],
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
                            mark: '串口-》卫通网管',
                            name: '',
                            coords: [[1050, 90], [1050, 30]],
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
                            mark: '卫通网管-》串口-》',
                            name: '',
                            coords: [[1050, 30], [1050, 90]],
                            lineStyle: {
                                normal: {
                                    color: '#020202'
                                }
                            },
                            effect: {
                                color: '#dc6414'
                            }
                        },
                    ],
                    polyLines: [
                        {
                            mark: '设备->差支路，合成网路',
                            name: '',
                            coords: [[60, 480], [60, 300], [325, 300]],
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
                            mark: '设备->天线控制',
                            name: '',
                            coords: [[0, 480], [0, 50], [325, 50]],
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
                            mark: '天线控制-》设备',
                            name: '',
                            coords: [[325, 50], [0, 50], [0, 480]],
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
                            mark: '低噪声-》下变频器',
                            name: '',
                            coords: [[480, 440], [560, 440], [560, 300],[690,300]],
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
                            mark: '方块-》合成网络',
                            name: '',
                            coords: [[550, 360], [550, 380], [400, 380],[400,338]],
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
                            mark: '调制解调器 上-》串口',
                            name: '',
                            coords: [[1500, 700], [1550, 700], [1550, 130],[1130,130]],
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
                            mark: '串口=>调制解调器 上',
                            name: '',
                            coords: [[1130, 130], [1550, 130], [1550, 700],[1500,700]],
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
                            mark: '串口=>上变频器',
                            name: '',
                            coords: [[1050, 170], [1050, 580], [880, 580]],
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
                            mark: '上变频器-》串口=>',
                            name: '',
                            coords: [[880, 580], [1050, 580], [1050, 170]],
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
                            mark: '串口-》下变频器-》=>',
                            name: '',
                            coords: [[970, 150], [800, 150], [800, 210]],
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
                            mark: '下变频器-》串口',
                            name: '',
                            coords: [[800, 210], [800, 150], [970, 150]],
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
                            mark: '串口-》跟踪接收机',
                            name: '',
                            coords: [[970, 130], [600, 130], [600, 170],[490,170]],
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
                            mark: '下变频器-》串口',
                            name: '',
                            coords: [[490, 170], [600, 170], [600, 130],[970,130]],
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
                            mark: '串口-》天线控制',
                            name: '',
                            coords: [[970, 110], [600, 110], [600, 50],[480,50]],
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
                            mark: '天线控制-》串口',
                            name: '',
                            coords: [[480, 50], [600, 50], [600, 110],[970,110]],
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

                    xAxis: {
                        min: 0,
                        max: 1600,
                        show: false,
                        type: 'value'
                    },
                    yAxis: {
                        min: 0,
                        max: 760,
                        show: false,
                        type: 'value'
                    },
                    series: [

                        {
                            type: "lines",
                            symbol: ['none', 'none'],
                            z: 1,
                            symbolSize: 10,
                            polyline: true,
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
                            data: charts.polyLines
                        },
                        {
                            type: "lines",
                            symbol: ['none', 'none'],
                            z: 2,
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
                            z: 3,
                            coordinateSystem: 'cartesian2d',
                            label: {
                                show: true,
                                fontSize: 14,
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
    height: 780px;
    width: 1620px;
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
    margin-top: -32px;
    z-index: 999;
    position: relative;

    span {
      display: inline-block;
      background: black;
      height: 16px;
      width: 16px;
      border-radius: 50%;
    }
  }
</style>
