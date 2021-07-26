<template>
  <!-- 二类车-->
  <div style="padding-top:20px">
    <template v-for="equipment in equipments">
      <div class="device_status" :style="equipment.pos">
        <span :style="judgeDeviceStatus(equipment)"
              :class="(equipment.isAlarm == '1' && equipment.isInterrupt == '0' && equipment.workStatus == '0')?'point-flicker':''">
        </span>
      </div>
      <div class="device_title" :style="masterStatus(equipment)" @click="openParam(equipment)">
      </div>
    </template>
    <div ref="dom" class="charts"></div>
    <div class="legend">
      <div class="legend_status" v-for="(item, index) in legendType" :key="index">
        <span :class="[item.shape]"
              :style="{background: item.color, borderColor: item.borderColor}"></span>{{ item.description }}
      </div>
    </div>
    <Modal :closable="false" :styles="{marginTop:'-90px'}" v-model="paramModal" @on-ok="confirm" @on-cancel="confirm"
           width="850" :mask-closable="false">
      <DeviceMain v-if="paramModalShow"></DeviceMain>
    </Modal>
  </div>
</template>

<script>
import * as echarts from 'echarts'
import {on, off} from '@/libs/tools'
// import mixin from "../../../components/common/websocket";
import DeviceMain from "@/view/netdev/monitor/DeviceMsg/deviceMain";
// echarts.registerTheme('tdTheme');
export default {
  components: {DeviceMain},
  // mixins: [mixin],
  data() {
    return {
      // dom: null,
      paramModalShow: false,
      paramModal: false,
      equipments: [
        {
          devNo: '85',
          name: 'LNA电源监控',
          isInterrupt: '0',
          workStatus: '0',
          isAlarm: 0,
          isUseStandby: false,
          pos: {
            top: '158px',
            marginLeft: '205px',
            width: '12px',
            height: '12px',
          }
        },
        {
          devNo: '85',
          name: 'LNA电源监控',
          isInterrupt: '0',
          workStatus: '0',
          isAlarm: 0,
          isUseStandby: false,
          pos: {
            top: '360px',
            marginLeft: '205px',
            width: '12px',
            height: '12px',
          }
        },
        {
          devNo: '20',
          name: '2.4m天线ACU',
          isInterrupt: '0',
          workStatus: '0',
          isAlarm: 0,
          isUseStandby: false,
          pos: {
            top: '426px',
            marginLeft: '466px',
            width: '12px',
            height: '12px',
          }
        },
        {
          devNo: '22',
          name: '频谱监测',
          isInterrupt: '0',
          workStatus: '0',
          isAlarm: 0,
          isUseStandby: false,
          pos: {
            top: '352px',
            marginLeft: '700px',
            width: '12px',
            height: '12px',
          }

        },
        {
          devNo: '27',
          name: 'L频段4X4上行开关矩阵',
          isInterrupt: '0',
          workStatus: '0',
          isAlarm: '0',
          isUseStandby: false,
          masterOrSlave: '',
          pos: {
            top: '170px',
            marginLeft: '535px',
            width: '12px',
            height: '12px',
          }
        },
        {
          devNo: '28',
          name: 'L频段4X4下行开关矩阵',
          isInterrupt: '0',
          workStatus: '0',
          isAlarm: '0',
          isUseStandby: false,
          masterOrSlave: '',
          pos: {
            top: '270px',
            marginLeft: '535px',
            width: '12px',
            height: '12px',
          }
        },
        {
          devNo: '29',
          name: 'Ka频段100W发射机',
          isInterrupt: '0',
          workStatus: '0',
          isAlarm: '0',
          isUseStandby: false,
          masterOrSlave: '',
          pos: {
            top: '81px',
            marginLeft: '216px',
            width: '12px',
            height: '12px',
          }
        },
        {
          devNo: '30',
          name: '1:1转换单元(00)',
          isInterrupt: '0',
          workStatus: '0',
          isAlarm: '0',
          isUseStandby: false,
          masterOrSlave: '',
          pos: {
            top: '158px',
            marginLeft: '694px',
            width: '12px',
            height: '12px',
          }
        },
        {
          devNo: '31',
          name: '1:1转换单元(01)',
          isInterrupt: '0',
          workStatus: '0',
          isAlarm: '0',
          isUseStandby: false,
          masterOrSlave: '',
          pos: {
            top: '291px',
            marginLeft: '694px',
            width: '12px',
            height: '12px',
          }
        },
        {
          devNo: '33',
          name: 'Comtech1',
          isInterrupt: '0',
          workStatus: '0',
          isAlarm: '0',
          isUseStandby: false,
          masterOrSlave: '',
          isMaster: true,
          pos: {
            top: '295px',
            marginLeft: '192px',
            width: '12px',
            height: '12px',
          }
        },
        {
          devNo: '33-1',
          name: 'Comtech2',
          isInterrupt: '0',
          workStatus: '0',
          isAlarm: '0',
          isUseStandby: false,
          isMaster: false,
          masterOrSlave: '',
          pos: {
            top: '348px',
            marginLeft: '192px',
            width: '12px',
            height: '12px',
          }
        },
        {
          devNo: '49',
          name: 'kac下变频器1',
          isInterrupt: '0',
          workStatus: '0',
          isAlarm: '0',
          isUseStandby: false,
          masterOrSlave: '',
          isMaster: true,
          pos: {
            top: '180px',
            marginLeft: '327px',
            width: '12px',
            height: '12px',
          }
        },
        {
          devNo: '49-1',
          name: 'kac下变频器2',
          isInterrupt: '0',
          workStatus: '0',
          isAlarm: '0',
          isUseStandby: false,
          masterOrSlave: '',
          isMaster: false,
          pos: {
            top: '230px',
            marginLeft: '327px',
            width: '12px',
            height: '12px',
          }
        },
        {
          devNo: '51',
          name: 'lku上变频器1',
          isInterrupt: '0',
          workStatus: '0',
          isAlarm: '0',
          isUseStandby: false,
          masterOrSlave: '',
          isMaster: true,
          pos: {
            top: '262px',
            marginLeft: '327px',
            width: '12px',
            height: '12px',
          }
        },
        {
          devNo: '52',
          name: 'lku上变频器2',
          isInterrupt: '0',
          workStatus: '0',
          isAlarm: '0',
          isUseStandby: false,
          masterOrSlave: '',
          isMaster: false,
          pos: {
            top: '315px',
            marginLeft: '327px',
            width: '12px',
            height: '12px',
          }
        },
        {
          devNo: '55',
          name: 'kul下变频器1',
          isInterrupt: '0',
          workStatus: '0',
          isAlarm: '0',
          isUseStandby: false,
          masterOrSlave: '',
          isMaster: true,
          pos: {
            top: '348px',
            marginLeft: '327px',
            width: '12px',
            height: '12px',
          }
        },
        {
          devNo: '56',
          name: 'kul下变频器2',
          isInterrupt: '0',
          workStatus: '0',
          isAlarm: '0',
          isUseStandby: false,
          masterOrSlave: '',
          isMaster: false,
          pos: {
            top: '402px',
            marginLeft: '327px',
            width: '12px',
            height: '12px',
          }
        },
        {
          devNo: '59',
          name: 'lc上变频器1',
          isInterrupt: '0',
          workStatus: '0',
          isAlarm: '0',
          isUseStandby: false,
          masterOrSlave: '',
          isMaster: true,
          pos: {
            top: '27px',
            marginLeft: '444px',
            width: '12px',
            height: '12px',
          }
        },
        {
          devNo: '60',
          name: 'lc上变频器2',
          isInterrupt: '0',
          workStatus: '0',
          isAlarm: '0',
          isUseStandby: false,
          masterOrSlave: '',
          isMaster: false,
          pos: {
            top: '79px',
            marginLeft: '444px',
            width: '12px',
            height: '12px',
          }
        },
        {
          devNo: '63',
          name: 'cl下变频器1',
          isInterrupt: '0',
          workStatus: '0',
          isAlarm: '0',
          isUseStandby: false,
          masterOrSlave: '',
          isMaster: true,
          pos: {
            top: '130px',
            marginLeft: '444px',
            width: '12px',
            height: '12px',
          }
        },
        {
          devNo: '64',
          name: 'cl下变频器2',
          isInterrupt: '0',
          workStatus: '0',
          isAlarm: '0',
          isUseStandby: false,
          masterOrSlave: '',
          isMaster: false,
          pos: {
            top: '182px',
            marginLeft: '444px',
            width: '12px',
            height: '12px',
          }
        },

        {
          devNo: '71',
          name: '2300调制解调器A',
          isInterrupt: '0',
          workStatus: '0',
          isAlarm: '0',
          isUseStandby: false,
          masterOrSlave: '',
          isMaster: true,
          pos: {
            top: '70px',
            marginLeft: '694px',
            width: '12px',
            height: '12px',
          }
        },
        {
          devNo: '72',
          name: '2300调制解调器B',
          isInterrupt: '0',
          workStatus: '0',
          isAlarm: '0',
          isUseStandby: false,
          masterOrSlave: '',
          isMaster: false,
          pos: {
            top: '132px',
            marginLeft: '694px',
            width: '12px',
            height: '12px',
          }
        },
        {
          devNo: '74',
          name: '2300调制解调器A',
          isInterrupt: '0',
          workStatus: '0',
          isAlarm: '0',
          isUseStandby: false,
          masterOrSlave: '',
          isMaster: true,
          pos: {
            top: '205px',
            marginLeft: '694px',
            width: '12px',
            height: '12px',
          }
        },
        {
          devNo: '75',
          name: '2300调制解调器B',
          isInterrupt: '0',
          workStatus: '0',
          isAlarm: '0',
          isUseStandby: false,
          masterOrSlave: '',
          isMaster: false,
          pos: {
            top: '267px',
            marginLeft: '694px',
            width: '12px',
            height: '12px',
          }
        },
      ],
      masterPosition: {
        // '20': {
        //   mark: '2.4米天线ACU',
        //   border: '3px solid green',
        //   width: '122px',
        //   height: '32px',
        //   top: '125px',
        //   left: '405px',
        // },
        // '22': {
        //   mark: '频谱监测',
        //   border: '3px solid green',
        //   width: '53px',
        //   height: '32px',
        //   top: '380px',
        //   left: '200px',
        // },
        // '27': {
        //   mark: '4*4 1',
        //   border: '3px solid green',
        //   width: '53px',
        //   height: '32px',
        //   top: '380px',
        //   left: '200px',
        // },
        // '28': {
        //   mark: '4*4 2',
        //   border: '3px solid green',
        //   width: '53px',
        //   height: '32px',
        //   top: '380px',
        //   left: '200px',
        // },
        // '29': {
        //   mark: 'ka100w发射机',
        //   border: '3px solid green',
        //   width: '53px',
        //   height: '32px',
        //   top: '380px',
        //   left: '200px',
        // },
        // '30': {
        //   mark: '1:1 转换开关(00)',
        //   border: '2px solid purple',
        //   width: '102px',
        //   height: '22px',
        //   top: '285px',
        //   left: '445px',
        // },
        // '31': {
        //   mark: '1:1 转换开关(01)',
        //   border: '3px solid green',
        //   width: '102px',
        //   height: '22px',
        //   top: '250px',
        //   left: '425px',
        // },
        '33': {
          mark: 'Comtech功率放大器 ku400w',
          border: '3px solid green',
          width: '55px',
          height: '32px',
          top: '290px',
          left: '169px',
        },
        '33-1': {
          mark: 'Comtech功率放大器 ku400w',
          border: '3px solid green',
          width: '55px',
          height: '32px',
          top: '342px',
          left: '169px',
        },
        '49': {
          mark: 'Ka/C下变频器',
          border: '3px solid green',
          width: '53px',
          height: '32px',
          top: '180px',
          left: '288px',
        },
        '49-1': {
          mark: 'Ka/C下变频器',
          border: '3px solid green',
          width: '53px',
          height: '32px',
          top: '232px',
          left: '288px',
        },
        '51': {
          mark: 'lku上变频器1',
          border: '3px solid green',
          width: '53px',
          height: '32px',
          top: '265px',
          left: '288px',
        },
        '52': {
          mark: 'lku上变频器2',
          border: '3px solid green',
          width: '53px',
          height: '32px',
          top: '318px',
          left: '288px',
        },
        '55': {
          mark: 'kul下变频器1',
          border: '3px solid green',
          width: '53px',
          height: '32px',
          top: '352px',
          left: '288px',
        },
        '56': {
          mark: 'kul下变频器2',
          border: '3px solid green',
          width: '53px',
          height: '32px',
          top: '405px',
          left: '288px',
        },

        '59': {
          mark: 'lc上变频器1',
          border: '3px solid green',
          width: '53px',
          height: '32px',
          top: '27px',
          left: '405px',
        },
        '60': {
          mark: 'lc上变频器2',
          border: '3px solid green',
          width: '53px',
          height: '32px',
          top: '80px',
          left: '405px',
        },
        '63': {
          mark: 'cl下1',
          border: '3px solid green',
          width: '53px',
          height: '32px',
          top: '131px',
          left: '405px',
        },
        '64': {
          mark: 'cl下2',
          border: '3px solid green',
          width: '53px',
          height: '32px',
          top: '185px',
          left: '405px',
        },

        '71': {
          mark: '调制A上',
          border: '3px solid green',
          width: '102px',
          height: '22px',
          top: '77px',
          left: '607px',
        },
        '72': {
          mark: '调制B上',
          border: '3px solid green',
          width: '102px',
          height: '22px',
          top: '139px',
          left: '607px',
        },
        '74': {
          mark: '调制A下',
          border: '3px solid green',
          width: '102px',
          height: '22px',
          top: '211px',
          left: '607px',
        },
        '75': {
          mark: '调制B下',
          border: '3px solid green',
          width: '102px',
          height: '22px',
          top: '274px',
          left: '607px',
        },
      },
      legendType: [
        {shape: 'square', color: 'rgba(0,0,0,0)', borderColor: '#009688', description: '运行'},
        {shape: 'square', color: '#b1f83c', description: '主机'},
        {shape: 'square', color: 'rgba(184,181,181)', description: '备机'},
        {shape: 'circle', color: '#009688', description: '正常'},
        {shape: 'circle', color: '#ff1400', description: '故障'},
        {shape: 'circle', color: '#ffbe08', description: '告警'}
      ],
    }
  },
  beforeDestroy() {
    let dom = echarts.getInstanceByDom(this.$refs.dom)
    if (dom) {
      dom.clear()
      echarts.dispose(dom)
    }
  },
  mounted() {
    this.initTime()
    this.init()
  },
  methods: {


    initTime() {
      this.timer = setInterval(this.scrollAnimate, 2000);
    },
    scrollAnimate() {
      setTimeout(() => {
        let data = [{
          "devDeployType": "0031001",
          "devNo": "49",
          "devTypeCode": "27",
          "isAlarm": "0",
          "isInterrupt": "1",
          "isUseStandby": "0",
          "masterOrSlave": "0",
          "stationId": null,
          "workStatus": "0"
        }, {
          "devDeployType": "0031004",
          "devNo": "50",
          "devTypeCode": "",
          "isAlarm": "0",
          "isInterrupt": "1",
          "isUseStandby": "0",
          "masterOrSlave": "0",
          "stationId": null,
          "workStatus": "0"
        }, {
          "devDeployType": "0031002",
          "devNo": "51",
          "devTypeCode": "4",
          "isAlarm": "0",
          "isInterrupt": "1",
          "isUseStandby": "1",
          "masterOrSlave": "0",
          "stationId": null,
          "workStatus": "0"
        }, {
          "devDeployType": "0031003",
          "devNo": "52",
          "devTypeCode": "4",
          "isAlarm": "0",
          "isInterrupt": "1",
          "isUseStandby": "1",
          "masterOrSlave": "0",
          "stationId": null,
          "workStatus": "0"
        }, {
          "devDeployType": "0031001",
          "devNo": "53",
          "devTypeCode": "5",
          "isAlarm": "0",
          "isInterrupt": "1",
          "isUseStandby": "1",
          "masterOrSlave": "0",
          "stationId": null,
          "workStatus": "0"
        }, {
          "devDeployType": "0031004",
          "devNo": "10",
          "devTypeCode": "",
          "isAlarm": "0",
          "isInterrupt": "1",
          "isUseStandby": "0",
          "masterOrSlave": "0",
          "stationId": null,
          "workStatus": "0"
        }, {
          "devDeployType": "0031004",
          "devNo": "54",
          "devTypeCode": "",
          "isAlarm": "0",
          "isInterrupt": "1",
          "isUseStandby": "0",
          "masterOrSlave": "0",
          "stationId": null,
          "workStatus": "0"
        }, {
          "devDeployType": "0031002",
          "devNo": "11",
          "devTypeCode": "7",
          "isAlarm": "0",
          "isInterrupt": "1",
          "isUseStandby": "1",
          "masterOrSlave": "0",
          "stationId": null,
          "workStatus": "0"
        }, {
          "devDeployType": "0031002",
          "devNo": "55",
          "devTypeCode": "4",
          "isAlarm": "0",
          "isInterrupt": "1",
          "isUseStandby": "1",
          "masterOrSlave": "0",
          "stationId": null,
          "workStatus": "0"
        }, {
          "devDeployType": "0031002",
          "devNo": "12",
          "devTypeCode": "7",
          "isAlarm": "0",
          "isInterrupt": "1",
          "isUseStandby": "1",
          "masterOrSlave": "0",
          "stationId": null,
          "workStatus": "0"
        }, {
          "devDeployType": "0031003",
          "devNo": "56",
          "devTypeCode": "4",
          "isAlarm": "0",
          "isInterrupt": "1",
          "isUseStandby": "1",
          "masterOrSlave": "0",
          "stationId": null,
          "workStatus": "0"
        }, {
          "devDeployType": "0031002",
          "devNo": "13",
          "devTypeCode": "7",
          "isAlarm": "0",
          "isInterrupt": "1",
          "isUseStandby": "1",
          "masterOrSlave": "0",
          "stationId": null,
          "workStatus": "0"
        }, {
          "devDeployType": "0031001",
          "devNo": "57",
          "devTypeCode": "5",
          "isAlarm": "0",
          "isInterrupt": "1",
          "isUseStandby": "1",
          "masterOrSlave": "0",
          "stationId": null,
          "workStatus": "0"
        }, {
          "devDeployType": "0031003",
          "devNo": "14",
          "devTypeCode": "7",
          "isAlarm": "0",
          "isInterrupt": "1",
          "isUseStandby": "1",
          "masterOrSlave": "0",
          "stationId": null,
          "workStatus": "0"
        }, {
          "devDeployType": "0031004",
          "devNo": "58",
          "devTypeCode": "",
          "isAlarm": "0",
          "isInterrupt": "1",
          "isUseStandby": "0",
          "masterOrSlave": "0",
          "stationId": null,
          "workStatus": "0"
        }, {
          "devDeployType": "0031004",
          "devNo": "15",
          "devTypeCode": "",
          "isAlarm": "0",
          "isInterrupt": "1",
          "isUseStandby": "0",
          "masterOrSlave": "0",
          "stationId": null,
          "workStatus": "0"
        }, {
          "devDeployType": "0031002",
          "devNo": "59",
          "devTypeCode": "4",
          "isAlarm": "0",
          "isInterrupt": "1",
          "isUseStandby": "1",
          "masterOrSlave": "0",
          "stationId": null,
          "workStatus": "0"
        }, {
          "devDeployType": "0031002",
          "devNo": "16",
          "devTypeCode": "9",
          "isAlarm": "0",
          "isInterrupt": "1",
          "isUseStandby": "1",
          "masterOrSlave": "0",
          "stationId": null,
          "workStatus": "0"
        }, {
          "devDeployType": "0031003",
          "devNo": "17",
          "devTypeCode": "9",
          "isAlarm": "0",
          "isInterrupt": "1",
          "isUseStandby": "1",
          "masterOrSlave": "0",
          "stationId": null,
          "workStatus": "0"
        }, {
          "devDeployType": "0031001",
          "devNo": "18",
          "devTypeCode": "10",
          "isAlarm": "0",
          "isInterrupt": "1",
          "isUseStandby": "0",
          "masterOrSlave": "0",
          "stationId": null,
          "workStatus": "0"
        }, {
          "devDeployType": "0031004",
          "devNo": "2",
          "devTypeCode": "",
          "isAlarm": "0",
          "isInterrupt": "1",
          "isUseStandby": "0",
          "masterOrSlave": "0",
          "stationId": null,
          "workStatus": "0"
        }, {
          "devDeployType": "0031003",
          "devNo": "3",
          "devTypeCode": "2",
          "isAlarm": "0",
          "isInterrupt": "1",
          "isUseStandby": "1",
          "masterOrSlave": "1",
          "stationId": null,
          "workStatus": "0"
        }, {
          "devDeployType": "0031003",
          "devNo": "4",
          "devTypeCode": "2",
          "isAlarm": "0",
          "isInterrupt": "1",
          "isUseStandby": "1",
          "masterOrSlave": "1",
          "stationId": null,
          "workStatus": "0"
        }, {
          "devDeployType": "0031004",
          "devNo": "9",
          "devTypeCode": "",
          "isAlarm": "0",
          "isInterrupt": "1",
          "isUseStandby": "0",
          "masterOrSlave": "0",
          "stationId": null,
          "workStatus": "0"
        }, {
          "devDeployType": "0031003",
          "devNo": "60",
          "devTypeCode": "4",
          "isAlarm": "0",
          "isInterrupt": "1",
          "isUseStandby": "1",
          "masterOrSlave": "0",
          "stationId": null,
          "workStatus": "0"
        }, {
          "devDeployType": "0031001",
          "devNo": "61",
          "devTypeCode": "5",
          "isAlarm": "0",
          "isInterrupt": "1",
          "isUseStandby": "1",
          "masterOrSlave": "0",
          "stationId": null,
          "workStatus": "0"
        }, {
          "devDeployType": "0031004",
          "devNo": "62",
          "devTypeCode": "",
          "isAlarm": "0",
          "isInterrupt": "1",
          "isUseStandby": "0",
          "masterOrSlave": "0",
          "stationId": null,
          "workStatus": "0"
        }, {
          "devDeployType": "0031002",
          "devNo": "63",
          "devTypeCode": "4",
          "isAlarm": "0",
          "isInterrupt": "1",
          "isUseStandby": "1",
          "masterOrSlave": "0",
          "stationId": null,
          "workStatus": "0"
        }, {
          "devDeployType": "0031001",
          "devNo": "20",
          "devTypeCode": "1",
          "isAlarm": "0",
          "isInterrupt": "1",
          "isUseStandby": "0",
          "masterOrSlave": "0",
          "stationId": null,
          "workStatus": "0"
        }, {
          "devDeployType": "0031003",
          "devNo": "64",
          "devTypeCode": "4",
          "isAlarm": "0",
          "isInterrupt": "1",
          "isUseStandby": "1",
          "masterOrSlave": "0",
          "stationId": null,
          "workStatus": "0"
        }, {
          "devDeployType": "0031001",
          "devNo": "21",
          "devTypeCode": "12",
          "isAlarm": "0",
          "isInterrupt": "1",
          "isUseStandby": "0",
          "masterOrSlave": "0",
          "stationId": null,
          "workStatus": "0"
        }, {
          "devDeployType": "0031001",
          "devNo": "65",
          "devTypeCode": "5",
          "isAlarm": "0",
          "isInterrupt": "1",
          "isUseStandby": "1",
          "masterOrSlave": "0",
          "stationId": null,
          "workStatus": "0"
        }, {
          "devDeployType": "0031001",
          "devNo": "22",
          "devTypeCode": "13",
          "isAlarm": "0",
          "isInterrupt": "0",
          "isUseStandby": "0",
          "masterOrSlave": "0",
          "stationId": null,
          "workStatus": "0"
        }, {
          "devDeployType": "0031001",
          "devNo": "23",
          "devTypeCode": "15",
          "isAlarm": "0",
          "isInterrupt": "1",
          "isUseStandby": "0",
          "masterOrSlave": "0",
          "stationId": null,
          "workStatus": "0"
        }, {
          "devDeployType": "0031001",
          "devNo": "24",
          "devTypeCode": "16",
          "isAlarm": "0",
          "isInterrupt": "1",
          "isUseStandby": "0",
          "masterOrSlave": "0",
          "stationId": null,
          "workStatus": "0"
        }, {
          "devDeployType": "0031001",
          "devNo": "25",
          "devTypeCode": "17",
          "isAlarm": "0",
          "isInterrupt": "1",
          "isUseStandby": "0",
          "masterOrSlave": "0",
          "stationId": null,
          "workStatus": "0"
        }, {
          "devDeployType": "0031001",
          "devNo": "26",
          "devTypeCode": "14",
          "isAlarm": "0",
          "isInterrupt": "1",
          "isUseStandby": "0",
          "masterOrSlave": "0",
          "stationId": null,
          "workStatus": "0"
        }, {
          "devDeployType": "0031001",
          "devNo": "27",
          "devTypeCode": "30",
          "isAlarm": "0",
          "isInterrupt": "1",
          "isUseStandby": "0",
          "masterOrSlave": "0",
          "stationId": null,
          "workStatus": "0"
        }, {
          "devDeployType": "0031001",
          "devNo": "28",
          "devTypeCode": "31",
          "isAlarm": "0",
          "isInterrupt": "1",
          "isUseStandby": "0",
          "masterOrSlave": "0",
          "stationId": null,
          "workStatus": "0"
        }, {
          "devDeployType": "0031001",
          "devNo": "29",
          "devTypeCode": "28",
          "isAlarm": "0",
          "isInterrupt": "1",
          "isUseStandby": "0",
          "masterOrSlave": "0",
          "stationId": null,
          "workStatus": "0"
        }, {
          "devDeployType": "0031004",
          "devNo": "70",
          "devTypeCode": "",
          "isAlarm": "0",
          "isInterrupt": "1",
          "isUseStandby": "0",
          "masterOrSlave": "0",
          "stationId": null,
          "workStatus": "0"
        }, {
          "devDeployType": "0031002",
          "devNo": "71",
          "devTypeCode": "11",
          "isAlarm": "0",
          "isInterrupt": "1",
          "isUseStandby": "1",
          "masterOrSlave": "0",
          "stationId": null,
          "workStatus": "0"
        }, {
          "devDeployType": "0031002",
          "devNo": "72",
          "devTypeCode": "11",
          "isAlarm": "0",
          "isInterrupt": "1",
          "isUseStandby": "1",
          "masterOrSlave": "0",
          "stationId": null,
          "workStatus": "0"
        }, {
          "devDeployType": "0031004",
          "devNo": "73",
          "devTypeCode": "",
          "isAlarm": "0",
          "isInterrupt": "1",
          "isUseStandby": "0",
          "masterOrSlave": "0",
          "stationId": null,
          "workStatus": "0"
        }, {
          "devDeployType": "0031001",
          "devNo": "30",
          "devTypeCode": "8",
          "isAlarm": "0",
          "isInterrupt": "0",
          "isUseStandby": "0",
          "masterOrSlave": "0",
          "stationId": null,
          "workStatus": "0"
        }, {
          "devDeployType": "0031002",
          "devNo": "74",
          "devTypeCode": "11",
          "isAlarm": "0",
          "isInterrupt": "1",
          "isUseStandby": "1",
          "masterOrSlave": "0",
          "stationId": null,
          "workStatus": "0"
        }, {
          "devDeployType": "0031001",
          "devNo": "31",
          "devTypeCode": "8",
          "isAlarm": "0",
          "isInterrupt": "0",
          "isUseStandby": "0",
          "masterOrSlave": "0",
          "stationId": null,
          "workStatus": "0"
        }, {
          "devDeployType": "0031002",
          "devNo": "75",
          "devTypeCode": "11",
          "isAlarm": "0",
          "isInterrupt": "1",
          "isUseStandby": "1",
          "masterOrSlave": "0",
          "stationId": null,
          "workStatus": "0"
        }, {
          "devDeployType": "0031001",
          "devNo": "32",
          "devTypeCode": "20",
          "isAlarm": "0",
          "isInterrupt": "1",
          "isUseStandby": "0",
          "masterOrSlave": "0",
          "stationId": null,
          "workStatus": "0"
        }, {
          "devDeployType": "0031001",
          "devNo": "33",
          "devTypeCode": "21",
          "isAlarm": "0",
          "isInterrupt": "1",
          "isUseStandby": "0",
          "masterOrSlave": "0",
          "stationId": null,
          "workStatus": "0"
        }, {
          "devDeployType": "0031001",
          "devNo": "34",
          "devTypeCode": "22",
          "isAlarm": "0",
          "isInterrupt": "1",
          "isUseStandby": "0",
          "masterOrSlave": "0",
          "stationId": null,
          "workStatus": "0"
        }, {
          "devDeployType": "0031001",
          "devNo": "35",
          "devTypeCode": "23",
          "isAlarm": "0",
          "isInterrupt": "1",
          "isUseStandby": "0",
          "masterOrSlave": "0",
          "stationId": null,
          "workStatus": "0"
        }, {
          "devDeployType": "0031001",
          "devNo": "36",
          "devTypeCode": "24",
          "isAlarm": "0",
          "isInterrupt": "1",
          "isUseStandby": "0",
          "masterOrSlave": "0",
          "stationId": null,
          "workStatus": "0"
        }, {
          "devDeployType": "0031001",
          "devNo": "37",
          "devTypeCode": "25",
          "isAlarm": "0",
          "isInterrupt": "1",
          "isUseStandby": "0",
          "masterOrSlave": "0",
          "stationId": null,
          "workStatus": "0"
        }, {
          "devDeployType": "0031001",
          "devNo": "38",
          "devTypeCode": "26",
          "isAlarm": "0",
          "isInterrupt": "1",
          "isUseStandby": "0",
          "masterOrSlave": "0",
          "stationId": null,
          "workStatus": "0"
        }, {
          "devDeployType": "0031002",
          "devNo": "85",
          "devTypeCode": "29",
          "isAlarm": "0",
          "isInterrupt": "1",
          "isUseStandby": "0",
          "masterOrSlave": "0",
          "stationId": null,
          "workStatus": "0"
        }, {
          "devDeployType": "0031002",
          "devNo": "86",
          "devTypeCode": "32",
          "isAlarm": "0",
          "isInterrupt": "1",
          "isUseStandby": "0",
          "masterOrSlave": "0",
          "stationId": null,
          "workStatus": "0"
        }]
        this.getWSData(data)
      }, 1000)
    },


    getWSData(WSdata) {
      if (WSdata.length) {
        //33，49
        let arr = ['30', '31', '20', '71', '74', '63', '66', '55', '59', '51', '27', '28', '22', '49', '33','85','29']
        //71，72/74，75/63，64/55,56/51,52/33,33-1/49，49-1
        this.equipments.forEach(device => {
          WSdata.forEach(item => {
            if (item.devNo == '71' && device.devNo == '72') {
              this.setWSDate(item, device)
            }
            if (item.devNo == '74' && device.devNo == '75') {
              this.setWSDate(item, device)
            }
            if (item.devNo == '63' && device.devNo == '64') {
              this.setWSDate(item, device)
            }
            if (item.devNo == '51' && device.devNo == '52') {
              this.setWSDate(item, device)
            }
            if (item.devNo == '55' && device.devNo == '56') {
              this.setWSDate(item, device)
            }
            if (item.devNo == '59' && device.devNo == '60') {
              this.setWSDate(item, device)
            }
            if (item.devNo == '33' && device.devNo == '33-1') {
              this.setWSDate(item, device)
            }
            if (item.devNo == '49' && device.devNo == '49-1') {
              this.setWSDate(item, device)
            }
            if (arr.indexOf(item.devNo) > -1 && item.devNo == device.devNo) {
              this.setWSDate(item, device)
            }
          })
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
      if ((device.devNo == '49-1' || device.devNo == '33-1') && device.masterOrSlave == '0' && device.isAlarm == '1') {
        device.isAlarm = 0
      }
      if ((device.devNo == '49' || device.devNo == '33') && device.masterOrSlave == '1' && device.isAlarm == '1') {
        device.isAlarm = 0
      }
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

        if (device.devNo == '49' || device.devNo == '33') {
          if (device.masterOrSlave == '1') {
            info = {background: '#009688'}
          }
        } else if (device.devNo == '49-1' || device.devNo == '33-1') {
          if (device.masterOrSlave == '0') {
            info = {background: '#009688'}
          }
        }
      } else {//中断 是 1

        info = {background: '#ff1400'}
        if (device.devNo == '49' || device.devNo == '33') {
          if (device.masterOrSlave == '1') {
            info = {background: '#009688'}
          }
        } else if (device.devNo == '49-1' || device.devNo == '33-1') {
          if (device.masterOrSlave == '0') {
            info = {background: '#009688'}
          }
        }
      }
      return info
    },
    masterStatus(equipment) {
      let arr = [20, 22, 27, 28, 29, 30, 31, 85]
      if (arr.indexOf(Number(equipment.devNo)) == -1) {
        return {
          top: this.masterPosition[equipment.devNo].top,
          marginLeft: this.masterPosition[equipment.devNo].left,
          width: this.masterPosition[equipment.devNo].width,
          height: this.masterPosition[equipment.devNo].height,
          // border: this.masterPosition[equipment.devNo].border,
          border: ((equipment.isMaster && equipment.masterOrSlave == '0') || (!equipment.isMaster && equipment.masterOrSlave == '1')) ? this.masterPosition[equipment.devNo].border : '3px solid rgba(0,0,0,0)',
        }
      }
    },
    confirm() {
      this.$xy.vector.$emit("closeModal")
      this.paramModalShow = false
      this.paramModal = false

    },
    init() {
      let dom = echarts.init(this.$refs.dom);
      var nodes = [
        {
          x: '30',
          y: '280',
          nodeName: '',
          img: 'image://' + require('@/assets/images/home/wn_track.png'),
          size: [100, 60]
        },
        {
          x: '110',
          y: '400',
          nodeName: 'ka\n发射\n\n\n\n\n\n\n\n\nKa\n接收',
          img: 'rect',
          size: [30, 180],
          color: 'rgb(228,225,192)'
        },
        {
          x: '110',
          y: '200',
          nodeName: '\n\nku\n发射\n\n\n\n\n\n\nKu\n接收',
          img: 'rect',
          size: [30, 180],
          color: 'rgb(228,225,192)'
        },
        {
          devNo: '29',
          x: '190',
          y: '460',
          nodeName: 'ka发射机  ',
          img: 'rect',
          size: [65, 30],
          color: '#e9cdf6'
        },


        //-------------------down_lc上变频---------
        {
          x: '430',//310  120
          y: '490',//270  220
          nodeName: 'L-C    \n  上变频    ',
          img: 'rect',
          size: [50, 30],
          color: '#b1f83c'
        },
        {
          x: '410',
          y: '460',
          nodeName: '',
          img: 'rect',
          size: [10, 5],
          color: '#c4e889'
        },
        {
          x: '450',
          y: '460',
          nodeName: '',
          img: 'rect',
          size: [10, 5],
          color: '#c4e889'
        },
        {
          devNo: '61',
          x: '390',
          y: '460',
          nodeName: '',
          img: 'circle',
          size: [10, 10],
          color: 'rgba(0,0,0,0)',
          border: 'black'
        },
        {
          devNo: '61',
          x: '470',
          y: '460',
          nodeName: '',
          img: 'circle',
          size: [10, 10],
          color: 'rgba(0,0,0,0)',
          border: 'black'
        },
        {
          x: '430',
          y: '430',
          nodeName: 'L-C    \n  上变频    ',
          img: 'rect',
          size: [50, 30],
          color: 'rgba(184,181,181)'
        },


        //-------------------up_cl下---------
        {
          x: '430',
          y: '370',
          nodeName: 'C-L    \n  下变频    ',
          img: 'rect',
          size: [50, 30],
          color: '#b1f83c'
        },
        {
          x: '410',
          y: '340',
          nodeName: '',
          img: 'rect',
          size: [10, 5],
          color: '#c4e889'
        },
        {
          x: '450',
          y: '340',
          nodeName: '',
          img: 'rect',
          size: [10, 5],
          color: '#c4e889'
        },
        {
          devNo: '65',
          x: '390',
          y: '340',
          nodeName: '',
          img: 'circle',
          size: [10, 10],
          color: 'rgba(0,0,0,0)',
          border: 'black'
        },
        {
          devNo: '65',
          x: '470',
          y: '340',
          nodeName: '',
          img: 'circle',
          size: [10, 10],
          color: 'rgba(0,0,0,0)',
          border: 'black'
        },
        {
          x: '430',
          y: '310',
          nodeName: 'C-L    \n  下变频    ',
          img: 'rect',
          size: [50, 30],
          color: 'rgba(184,181,181)'
        },
        {
          devNo: '85',
          x: '190',
          y: '340',
          nodeName: 'KaLNA   ',
          img: 'triangle',
          symbolRotate: -90,
          size: [50, 60],
          color: '#e9cdf6'
        },

        //-------------------up_noKa-c下---------
        {
          x: '310',
          y: '370',
          nodeName: 'Ka-c   \n  下变频    ',
          img: 'rect',
          size: [50, 30],
          color: '#b1f83c'
        },
        {
          x: '290',
          y: '340',
          nodeName: '',
          img: 'rect',
          size: [10, 5],
          color: '#c4e889'
        },
        {
          x: '330',
          y: '340',
          nodeName: '',
          img: 'rect',
          size: [10, 5],
          color: '#c4e889'
        },
        {
          x: '270',
          y: '340',
          nodeName: '',
          img: 'circle',
          size: [10, 10],
          color: 'rgba(0,0,0,0)',
          border: 'black'
        },
        {
          x: '350',
          y: '340',
          nodeName: '',
          img: 'circle',
          size: [10, 10],
          color: 'rgba(0,0,0,0)',
          border: 'black'
        },
        {
          x: '310',
          y: '310',
          nodeName: 'Ka-c   \n  下变频    ',
          img: 'rect',
          size: [50, 30],
          color: 'rgba(184,181,181)'
        },

        //-------------------down_noKu IWTA---------
        {
          x: '190',
          y: '270',
          nodeName: 'Comtech\n',
          img: 'rect',
          size: [50, 30],
          color: '#b1f83c'
        },
        {
          x: '170',
          y: '240',
          nodeName: '',
          img: 'rect',
          size: [10, 5],
          color: '#c4e889'
        },
        {
          x: '210',
          y: '240',
          nodeName: '',
          img: 'rect',
          size: [10, 5],
          color: '#c4e889'
        },
        {
          x: '150',
          y: '240',
          nodeName: '',
          img: 'circle',
          size: [10, 10],
          color: 'rgba(0,0,0,0)',
          border: 'black'
        },
        {
          x: '230',
          y: '240',
          nodeName: '',
          img: 'circle',
          size: [10, 10],
          color: 'rgba(0,0,0,0)',
          border: 'black'
        },
        {
          x: '190',
          y: '210',
          nodeName: 'Comtech\n',
          img: 'rect',
          size: [50, 30],
          color: 'rgba(184,181,181)'
        },
        //-------------------down l-KU上---------
        {
          x: '310',
          y: '270',
          nodeName: 'L-Ku   \n  上变频    ',
          img: 'rect',
          size: [50, 30],
          color: '#b1f83c'
        },
        {
          x: '290',
          y: '240',
          nodeName: '',
          img: 'rect',
          size: [10, 5],
          color: '#c4e889'
        },
        {
          x: '330',
          y: '240',
          nodeName: '',
          img: 'rect',
          size: [10, 5],
          color: '#c4e889'
        },
        {
          devNo: '53',
          x: '270',
          y: '240',
          nodeName: '',
          img: 'circle',
          size: [10, 10],
          color: 'rgba(0,0,0,0)',
          border: 'black'
        },
        {
          devNo: '53',
          x: '350',
          y: '240',
          nodeName: '',
          img: 'circle',
          size: [10, 10],
          color: 'rgba(0,0,0,0)',
          border: 'black'
        },
        {
          x: '310',
          y: '210',
          nodeName: 'L-Ku   \n  上变频    ',
          img: 'rect',
          size: [50, 30],
          color: 'rgba(184,181,181)'
        },

        //-------------------down ku-l下---------
        {
          x: '310',
          y: '170',
          nodeName: 'Ku-L  \n  下变频    ',
          img: 'rect',
          size: [50, 30],
          color: '#b1f83c'
        },
        {
          x: '290',
          y: '140',
          nodeName: '',
          img: 'rect',
          size: [10, 5],
          color: '#c4e889'
        },
        {
          x: '330',
          y: '140',
          nodeName: '',
          img: 'rect',
          size: [10, 5],
          color: '#c4e889'
        },
        {
          devNo: '57',
          x: '270',
          y: '140',
          nodeName: '',
          img: 'circle',
          size: [10, 10],
          color: 'rgba(0,0,0,0)',
          border: 'black'
        },
        {
          devNo: '57',
          x: '350',
          y: '140',
          nodeName: '',
          img: 'circle',
          size: [10, 10],
          color: 'rgba(0,0,0,0)',
          border: 'black'
        },
        {
          x: '310',
          y: '110',
          nodeName: 'Ku-L  \n  下变频    ',
          img: 'rect',
          size: [50, 30],
          color: 'rgba(184,181,181)'
        },

        {
          devNo: '85',
          x: '190',
          y: '140',
          nodeName: 'KuLNA   ',
          img: 'triangle',
          symbolRotate: -90,
          size: [50, 65],
          color: '#e9cdf6'
        },
        {
          x: '380',
          y: '50',
          nodeName: '天线\n驱动\n单元\n(ADU)',
          img: 'rect',
          size: [50, 60],
          color: 'rgb(202,196,185)'
        },
        {
          devNo: '20',
          x: '470',
          y: '50',
          nodeName: '\n天线\n控制\n单元\n(ACU)',
          img: 'rect',
          size: [50, 80],
          color: 'rgb(202,196,185)'
        },
        {
          devNo: '27',
          x: '540',
          y: '400',
          nodeName: 'L波段\n中频\n矩阵\n(上行)',
          img: 'rect',
          size: [40, 170],
          color: '#e9cdf6'
        },
        {
          devNo: '28',
          x: '540',
          y: '220',
          nodeName: 'L波段\n中频\n矩阵\n(下行)',
          img: 'rect',
          size: [40, 170],
          color: '#e9cdf6'
        },
        {
          x: '660',
          y: '400',
          nodeName: '调制解调器(1:1)\n\n\n\n\n\n\n',
          id: 1,
          img: 'rect',
          size: [110, 120],
          category: 1,
          color: 'rgb(214,188,169)'
        },

        {
          x: '660',
          y: '420',
          nodeName: '2300调制解调器  ',
          img: 'rect',
          size: [100, 20],
          color: '#b1f83c',
          category: 2
        },
        {
          devNo: '30',
          x: '660',
          y: '390',
          nodeName: '1:1转换单元  ',
          img: 'rect',
          size: [100, 20],
          color: 'white',
          category: 2
        },

        {
          x: '660',
          y: '360',
          nodeName: '2300调制解调器  ',
          img: 'rect',
          size: [100, 20],
          color: 'rgba(184,181,181)',
          category: 2
        },
        {
          x: '660',
          y: '270',
          nodeName: '调制解调器(1:1)\n\n\n\n\n\n\n',
          id: 1,
          img: 'rect',
          size: [110, 120],
          color: 'rgb(214,188,169)'
        },

        {
          x: '660',
          y: '290',
          nodeName: '2300调制解调器  ',
          img: 'rect',
          size: [100, 20],
          color: '#b1f83c',
          category: 2
        },
        {
          devNo: '31',
          x: '660',
          y: '260',
          nodeName: '1:1转换单元  ',
          img: 'rect',
          size: [100, 20],
          color: 'white',
          category: 2
        },
        {
          x: '660',
          y: '230',
          nodeName: '2300调制解调器  ',
          img: 'rect',
          size: [100, 20],
          color: 'rgba(184,181,181)',
          category: 2
        },


        {
          devNo: '22',
          x: '660',
          y: '160',
          nodeName: '频谱监测接收设备   ',
          img: 'rect',
          size: [120, 30],
          color: 'rgb(206,215,209)'
        },

        {
          x: '800',
          y: '350',
          nodeName: '网络\n\n承载\n\n及\n\n业务\n\n分系统',
          img: 'rect',
          size: [40, 220],
          color: 'rgb(175,158,174)'

        },

        //网管交换机


        {
          x: '780',
          y: '155',
          nodeName: '网管交换机',
          img: 'rect',
          id: 1,
          size: [80, 40],
          color: 'rgb(202,196,185)',
        },
        {
          x: '1700',
          y: '520',
          nodeName: '',
          img: 'image://' + require('@/assets/images/home/trans_device.png'),
          size: [90, 70]
        },


        {
          x: '780',
          y: '50',
          nodeName: '',
          img: 'rect',
          size: [80, 50],
          color: 'white',
          border: 'dotted',
          id: 1,
        },
        {
          x: '780',
          y: '50',
          nodeName: '二级网管站',
          img: 'rect',
          size: [70, 40],
          color: 'rgb(202,196,185)'
        },

        {
          x: '670',
          y: '50',
          nodeName: '网管计算机',
          img: 'rect',
          size: [70, 40],
          color: 'rgb(202,196,185)'
        },
        {
          x: '570',
          y: '50',
          nodeName: '串口服务器',
          img: 'rect',
          size: [70, 40],
          color: 'rgb(202,196,185)'
        },

        {
          x: '330',
          y: '680',
          nodeName: '维修仓',
          size: 0
        },
      ]
      var charts = {
        nodes: [],
        //功放线条
        polyLines: [
          {
            mark: 'ku lwa',
            name: '',
            coords: [[232, 239], [232, 270], [148, 270], [148, 239]],
            lineStyle: {
              normal: {
                color: '#020202'
              }
            },
          },
          {
            mark: 'ku lwa',
            name: '',
            coords: [[210, 240], [230, 240], [230, 210], [151, 210], [151, 240], [170, 240]],
            lineStyle: {
              normal: {
                color: '#020202'
              }
            },
          },

          {
            mark: 'L-ku上变频',
            name: '',
            coords: [[352, 239], [352, 270], [268, 270], [268, 239]],
            lineStyle: {
              normal: {
                color: '#020202'
              }
            },
          },
          {
            mark: 'L-ku上变频',
            name: '',
            coords: [[330, 240], [350, 240], [350, 210], [271, 210], [271, 240], [290, 240]],
            lineStyle: {
              normal: {
                color: '#020202'
              }
            },
          },
          {
            mark: 'L-ku上变频箭头',
            name: '',
            coords: [[310, 250], [310, 230]],
            lineStyle: {
              normal: {
                color: '#020202'
              }
            },
          },

          {
            mark: 'Ku-l下变频',
            name: '',
            coords: [[330, 140], [350, 140], [350, 110], [271, 110], [271, 140], [290, 140]],
            lineStyle: {
              normal: {
                color: '#020202'
              }
            },
          },
          {
            mark: 'Ku-l下变频',
            name: '',
            coords: [[352, 139], [352, 170], [268, 170], [268, 139]],
            lineStyle: {
              normal: {
                color: '#020202'
              }
            },
          },


          {
            mark: 'Ka-c下变频',
            name: '',
            coords: [[352, 339], [352, 370], [268, 370], [268, 339]],
            lineStyle: {
              normal: {
                color: '#020202'
              }
            },
          },
          {
            mark: 'Ka-c下变频',
            name: '',
            coords: [[330, 340], [350, 340], [350, 310], [271, 310], [271, 340], [290, 340]],
            lineStyle: {
              normal: {
                color: '#020202'
              }
            },
          },


          {
            mark: 'L-C上变频',//x-120  y-220
            name: '',
            coords: [[472, 459], [472, 490], [388, 490], [388, 459]],
            lineStyle: {
              normal: {
                color: '#020202'
              }
            },
          },
          {
            mark: 'L-C上变频',
            name: '',
            coords: [[450, 460], [470, 460], [470, 430], [391, 430], [391, 460], [410, 460]],
            lineStyle: {
              normal: {
                color: '#020202'
              }
            },
          },
          {
            mark: 'L-C上变频',
            name: '',
            coords: [[430, 470], [430, 450]],
            lineStyle: {
              normal: {
                color: '#020202'
              }
            },
          },


          {
            mark: 'C-L下变频',//y-120
            name: '',
            coords: [[472, 339], [472, 370], [388, 370], [388, 339]],
            lineStyle: {
              normal: {
                color: '#020202'
              }
            },
          },
          {
            mark: 'C-L下变频',
            name: '',
            coords: [[450, 340], [470, 340], [470, 310], [391, 310], [391, 340], [410, 340]],
            lineStyle: {
              normal: {
                color: '#020202'
              }
            },
          },
          {
            mark: 'C-L下变频',
            name: '',
            coords: [[430, 350], [430, 330]],
            lineStyle: {
              normal: {
                color: '#020202'
              }
            },
          },
        ],
        //折线
        linesData: [
          {
            mark: '设备->天线驱动单元ADU',
            name: '',
            coords: [[350, 50], [40, 50], [40, 270]],
            lineStyle: {
              normal: {
                color: '#020202'
              }
            },
          },

          {
            mark: '天线驱动单元ADU->天线控制单元acu',
            name: '',
            coords: [[410, 50], [440, 50]],
            lineStyle: {
              normal: {
                color: '#020202'
              }
            }
          },
          {
            mark: '天线控制单元acu->天线驱动单元ADU',
            name: '',
            coords: [[440, 50], [410, 50]],
            lineStyle: {
              normal: {
                color: '#020202'
              }
            }
          },
          //一段式#143fdc
          {
            mark: 'L波段-》天线控制单元ACU',
            name: '',
            coords: [[540, 130], [540, 110], [470, 110], [470, 90]],
            lineStyle: {
              normal: {
                color: '#020202'
              }
            }
          },
          //----------------------------上行------------
          {
            mark: 'KU发射接收->设备',
            coords: [[95, 280], [65, 280]],
            lineStyle: {
              normal: {
                color: '#dc6414 '
              }
            },
            effect: {
              color: '#dc6414 '
            }
          },
          //一段式连线
          {
            mark: 'KA发射接收->设备',
            coords: [[95, 460], [40, 460], [40, 290]],
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
            mark: 'ku iwta到ku发射接收',
            name: '',
            coords: [[150, 240], [125, 240]],
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
            mark: 'lc上变频-》ka发射机',
            name: '',
            coords: [[380, 460], [210, 460]],
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
            mark: 'l ku上变频->ku iwta',
            name: '',
            coords: [[270, 240], [220, 240]],
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
            mark: 'L波段中频矩阵 上行->L-c上变频',
            name: '',
            coords: [[520, 460], [450, 460]],
            lineStyle: {
              normal: {
                color: '#dc6414'
              }
            },
            effect: {
              color: '#dc6414'
            }
          },
          //一段式
          {
            mark: 'L波段中频矩阵 上行->L-ku 上变频',
            name: '',
            coords: [[520, 400], [490, 400], [490, 240], [350, 240]],
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
            mark: '上方 调制解调器 -》L波段中频上行 ',
            name: '',
            coords: [[605, 400], [560, 400]],
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
            mark: '下方 调制解调器 -》L波段中频上行 ',
            name: '',
            coords: [[605, 320], [560, 320]],
            lineStyle: {
              normal: {
                color: '#dc6414'
              }
            },
            effect: {
              color: '#dc6414'
            }
          },

          //----------------------------下行----------------------
          {
            mark: '设备->KA发射接收',
            name: '',
            coords: [[50, 290], [50, 340], [95, 340]],
            lineStyle: {
              normal: {
                color: '#143fdc '
              }
            },
            effect: {
              color: '#143fdc '
            }
          },
          //一段式连线
          {
            mark: '设备->KU发射接收',
            coords: [[50, 270], [50, 140], [95, 140]],
            lineStyle: {
              normal: {
                color: '#143fdc '
              }
            },
            effect: {
              color: '#143fdc '
            }
          },


          {
            mark: 'ku-》ku lna',
            name: '',
            coords: [[125, 140], [160, 140]],
            lineStyle: {
              normal: {
                color: '#143fdc '
              }
            },
            effect: {
              color: '#143fdc '
            }
          },
          {
            mark: 'ka lna ->ka-c下变频',
            name: '',
            coords: [[220, 340], [280, 340]],
            lineStyle: {
              normal: {
                color: '#143fdc '
              }
            },
            effect: {
              color: '#143fdc '
            }
          },
          {
            mark: 'ku lna -> ku-l下变频',
            name: '',
            coords: [[220, 140], [280, 140]],
            lineStyle: {
              normal: {
                color: '#143fdc '
              }
            },
            effect: {
              color: '#143fdc '
            }
          },
          {
            mark: ' ku-l下变频 -》L波段中频矩阵下行',
            name: '',
            coords: [[350, 140], [520, 140]],
            lineStyle: {
              normal: {
                color: '#143fdc '
              }
            },
            effect: {
              color: '#143fdc '
            }
          },
          {
            mark: 'ka c下变频->cl下变频',
            name: '',
            coords: [[350, 340], [400, 340]],
            lineStyle: {
              normal: {
                color: '#143fdc '
              }
            },
            effect: {
              color: '#143fdc '
            }
          },

          {
            mark: 'c-l-》l波段中频下行',
            name: '',
            coords: [[450, 340], [520, 340]],
            lineStyle: {
              normal: {
                color: '#143fdc '
              }
            },
            effect: {
              color: '#143fdc '
            }
          },
          {
            mark: 'L波段中频下行-》下方 调制解调器 ',
            name: '',
            coords: [[560, 230], [605, 230]],
            lineStyle: {
              normal: {
                color: '#143fdc'
              }
            },
            effect: {
              color: '#143fdc'
            }
          },
          //一段式
          {
            mark: 'L波段中频下行-》上方 调制解调器',
            name: '',
            coords: [[560, 240], [570, 240], [570, 350], [605, 350]],
            lineStyle: {
              normal: {
                color: '#143fdc '
              }
            },
            effect: {
              color: '#143fdc '
            }
          },
          {
            mark: 'L波段中频下行-》调制解调器 上方',
            coords: [[1290, 700], [1290, 950]],
            lineStyle: {
              normal: {
                color: '#143fdc '
              }
            },
            effect: {
              color: '#143fdc '
            }
          },

          {
            mark: 'L波段中频下行-》频谱监测接收',
            name: '',
            coords: [[560, 160], [600, 160]],
            lineStyle: {
              normal: {
                color: '#143fdc '
              }
            },
            effect: {
              color: '#143fdc '
            }
          },
          //双向
          {
            mark: '网络承载分系统-》调制解调器',
            name: '',
            coords: [[715, 380], [780, 380]],
            lineStyle: {
              normal: {
                color: '#143fdc'
              }
            },
            effect: {
              color: '#143fdc'
            }
          },
          {
            mark: '网络承载分系统-》调制解调器',
            name: '',
            coords: [[780, 400], [715, 400]],
            lineStyle: {
              normal: {
                color: '#dc6414'
              }
            },
            effect: {
              color: '#dc6414'
            }
          },
          //双向
          {
            mark: '网络承载分系统-》调制解调器',
            name: '',
            coords: [[715, 260], [780, 260]],
            lineStyle: {
              normal: {
                color: '#143fdc'
              }
            },
            effect: {
              color: '#143fdc'
            }
          },
          {
            mark: '网络承载分系统-》调制解调器',
            name: '',
            coords: [[780, 280], [715, 280]],
            lineStyle: {
              normal: {
                color: '#dc6414'
              }
            },
            effect: {
              color: '#dc6414'
            }
          },
          //2级网管站-》网管计算机
          {
            mark: '2级网管站-》网管计算机',
            name: '',
            coords: [[740, 50], [700, 50]],
            lineStyle: {
              normal: {
                color: 'rgb(57 181 74)'
              }
            },
            effect: {
              color: 'rgb(57 181 74)'
            }
          },
          {
            mark: '网管计算机-》2级网管站',
            name: '',
            coords: [[700, 50], [740, 50]],
            lineStyle: {
              normal: {
                color: 'rgb(57 181 74)'
              }
            },
            effect: {
              color: 'rgb(57 181 74)'
            }
          },

          {
            mark: '串口-》调制上',
            name: '',
            coords: [[580, 70], [580, 390], [605, 390]],
            lineStyle: {
              normal: {
                color: 'rgb(57 181 74)'
              }
            },
            effect: {
              color: 'rgb(57 181 74)'
            }
          },
          {
            mark: '串口-》调制下',
            name: '',
            coords: [[590, 70], [590, 260], [605, 260]],
            lineStyle: {
              normal: {
                color: 'rgb(57 181 74)'
              }
            },
            effect: {
              color: 'rgb(57 181 74)'
            }
          },
          {
            mark: '网管计算机-》串口服务',
            name: '',
            coords: [[605, 50], [635, 50]],
            lineStyle: {
              normal: {
                color: 'rgb(57 181 74)'
              }
            },
            effect: {
              color: 'rgb(57 181 74)'
            }
          },
          {
            mark: '串口服务->网管计算机',
            name: '',
            coords: [[635, 50], [605, 50]],
            lineStyle: {
              normal: {
                color: 'rgb(57 181 74)'
              }
            },
            effect: {
              color: 'rgb(57 181 74)'
            }
          },
          {
            mark: '串口服务->网管交换机',
            name: '',
            coords: [[600, 70], [600, 110], [760, 110], [760, 135]],
            lineStyle: {
              normal: {
                color: 'rgb(57 181 74)'
              }
            },
            effect: {
              color: 'rgb(57 181 74)'
            }
          },
          {
            mark: '网管计算机->网管交换机',
            name: '',
            coords: [[670, 70], [670, 90], [780, 90], [780, 135]],
            lineStyle: {
              normal: {
                color: 'rgb(57 181 74)'
              }
            },
            effect: {
              color: 'rgb(57 181 74)'
            }
          },
        ],
        //直线
        lines: [
          {
            mark: 'Ka发射机到ka发射接收',
            name: 'LHCP',
            coords: [[155, 460], [125, 460]],
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
            mark: 'ka发射接收到Ka lwa',
            name: 'RHCP',
            coords: [[125, 340], [160, 340]],
            lineStyle: {
              normal: {
                color: '#143fdc '
              }
            },
            effect: {
              color: '#143fdc '
            }
          },
        ],
        //交换机
        transLines: [
          {
            mark: 'ka交换机',
            name: '交换机',
            coords: [[210, 500], [225, 500]],
          },
          {
            mark: 'ka交换机',
            name: '',
            coords: [[190, 495], [190, 480]],
          },

          {
            mark: 'comtech交换机',
            name: '交换机',
            coords: [[220, 310], [235, 310]],
          },
          {
            mark: 'comtech交换机',
            name: '',
            coords: [[200, 305], [200, 290]],
          },

          {
            mark: 'kac交换机',
            name: '交换机',
            coords: [[330, 410], [345, 410]],
          },
          {
            mark: 'kac交换机',
            name: '',
            coords: [[310, 405], [310, 390]],
          },

          {
            mark: 'cl交换机',
            name: '交换机',
            coords: [[440, 270], [455, 270]],
          },
          {
            mark: 'cl交换机',
            name: '',
            coords: [[420, 275], [420, 290]],
          },
        ],
        ereftlLines: [
          {
            mark: 'lc交换机',
            name: '交换机',
            coords: [[355, 495], [405, 495]],
          },
          {
            mark: 'lku交换机',
            name: '交换机',
            coords: [[335, 195], [385, 195]],
          },
          {
            mark: 'kul交换机',
            name: '交换机',
            coords: [[335, 95], [385, 95]],
          },
          {
            mark: '4*4上',
            name: '交换机',
            coords: [[560, 470], [610, 470]],
          },
          {
            mark: '4*4下',
            name: '交换机',
            coords: [[470, 200], [520, 200]],
          },
          {
            mark: '2300上',
            name: '交换机',
            coords: [[715, 450], [765, 450]],
          },
          {
            mark: '2300下',
            name: '交换机',
            coords: [[715, 310], [765, 310]],
          },
          {
            mark: '天线控制单元',
            name: '交换机',
            coords: [[495, 80], [545, 80]],
          },

        ],
      }
      for (var j = 0; j < nodes.length; j++) {
        var x = parseInt(nodes[j].x)
        var y = parseInt(nodes[j].y)
        var node = {
          devNo: nodes[j].devNo,
          showTag: nodes[j].id,
          nodeName: nodes[j].nodeName,
          value: [x, y],
          symbolSize: nodes[j].size ? nodes[j].size : 1,
          alarm: nodes[j].alarm,
          symbol: nodes[j].img,
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
          node.itemStyle.normal.borderColor = nodes[j].border ? nodes[j].border : 'grey'
          node.itemStyle.normal.borderWidth = '2'
        }

        charts.nodes.push(node)
      }
      var option = {
        grid: {left: '10', bottom: '15', top: '5', right: '5'},
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
            type: 'graph',
            z: 6,
            coordinateSystem: 'cartesian2d',
            label: {
              normal: {
                show: true,
                position: 'inside',
                //offset: [0,-60],//居上 20
                textStyle: {
                  fontSize: 12,
                  color: 'black',

                }
              }
            },
            itemStyle: {
              normal: {
                label: {
                  show: true,
                  formatter: function (item) {
                    return item.data.nodeName
                  }
                }
              }
            },
            data: charts.nodes,
          },
          {
            type: "lines",
            symbol: ['circle', 'arrow'],
            z: 5,
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
            //箭头
            markPoint: {
              itemStyle: {
                color: 'black'
              },
              data: [
                {
                  mark: 'comtech右上',
                  symbolRotate: '90',
                  symbolSize: 5,
                  symbol: 'arrow',
                  name: '',
                  x: 225,
                  y: 240
                },
                {
                  mark: 'comtech左上',
                  symbolRotate: '180',
                  symbolSize: 5,
                  symbol: 'arrow',
                  name: '',
                  x: 155,
                  y: 260
                },
                {
                  mark: 'comtech左下',
                  symbolSize: 5,
                  symbol: 'arrow',
                  name: '',
                  x: 158,
                  y: 275
                },

                {
                  mark: 'lku右上',
                  symbolRotate: '90',
                  symbolSize: 5,
                  symbol: 'arrow',
                  name: '',
                  x: 340,
                  y: 240
                },
                {
                  mark: 'lku左上',
                  symbolRotate: '180',
                  symbolSize: 5,
                  symbol: 'arrow',
                  name: '',
                  x: 273,
                  y: 260
                },
                {
                  mark: 'lku左下',
                  symbolSize: 5,
                  symbol: 'arrow',
                  name: '',
                  x: 276,
                  y: 275
                },

                {
                  mark: 'lku箭头下',
                  symbolRotate: '180',
                  symbolSize: 5,
                  symbol: 'arrow',
                  name: '',
                  x: 314,
                  y: 282
                },
                {
                  mark: 'lku箭头上',
                  symbolSize: 5,
                  symbol: 'arrow',
                  name: '',
                  x: 315,
                  y: 255
                },


                {
                  mark: 'kac下右下',
                  symbolRotate: '180',
                  symbolSize: 5,
                  symbol: 'arrow',
                  name: '',
                  x: 356,
                  y: 164
                },
                {
                  mark: 'kac下左上',
                  symbolRotate: '270',
                  symbolSize: 5,
                  symbol: 'arrow',
                  name: '',
                  x: 288,
                  y: 142
                },
                {
                  mark: 'kac下左下',
                  symbolSize: 5,
                  symbolRotate: '270',
                  symbol: 'arrow',
                  name: '',
                  x: 288,
                  y: 200
                },


                {
                  mark: 'kul下右下',
                  symbolRotate: '180',
                  symbolSize: 5,
                  symbol: 'arrow',
                  name: '',
                  x: 356,
                  y: 360
                },
                {
                  mark: 'kul下左上',
                  symbolRotate: '270',
                  symbolSize: 5,
                  symbol: 'arrow',
                  name: '',
                  x: 288,
                  y: 337
                },
                {
                  mark: 'kul下左下',
                  symbolSize: 5,
                  symbolRotate: '270',
                  symbol: 'arrow',
                  name: '',
                  x: 288,
                  y: 396
                },


                {
                  mark: 'lc右上',
                  symbolRotate: '90',
                  symbolSize: 5,
                  symbol: 'arrow',
                  name: '',
                  x: 460,
                  y: 25
                },
                {
                  mark: 'lc左上',
                  symbolRotate: '180',
                  symbolSize: 5,
                  symbol: 'arrow',
                  name: '',
                  x: 391,
                  y: 42
                },
                {
                  mark: 'lc左下',
                  symbolSize: 5,
                  symbol: 'arrow',
                  name: '',
                  x: 394,
                  y: 60
                },

                {
                  mark: 'lc箭头下',
                  symbolRotate: '180',
                  symbolSize: 5,
                  symbol: 'arrow',
                  name: '',
                  x: 432,
                  y: 65
                },
                {
                  mark: 'lc箭头上',
                  symbolSize: 5,
                  symbol: 'arrow',
                  name: '',
                  x: 432,
                  y: 40
                },


                {
                  mark: 'cl下右下',
                  symbolRotate: '180',
                  symbolSize: 5,
                  symbol: 'arrow',
                  name: '',
                  x: 474,
                  y: 164
                },
                {
                  mark: 'cl下左上',
                  symbolRotate: '270',
                  symbolSize: 5,
                  symbol: 'arrow',
                  name: '',
                  x: 406,
                  y: 142
                },
                {
                  mark: 'cl下左下',
                  symbolSize: 5,
                  symbolRotate: '270',
                  symbol: 'arrow',
                  name: '',
                  x: 408,
                  y: 200
                },
                {
                  mark: 'cl箭头下',
                  symbolRotate: '180',
                  symbolSize: 5,
                  symbol: 'arrow',
                  name: '',
                  x: 432,
                  y: 185
                },
                {
                  mark: 'cl箭头上',
                  symbolSize: 5,
                  symbol: 'arrow',
                  name: '',
                  x: 432,
                  y: 160
                },
              ]
            },
            data: charts.polyLines
          },
          {
            type: 'lines',
            symbol: ['none', 'none'],
            z: 4,
            symbolSize: 10,
            coordinateSystem: 'cartesian2d',
            label: {
              show: true,
              position: 'middle',
            },
            lineStyle: {
              normal: {
                color: 'green',
                width: 1,
                opacity: 1,
                curveness: 0
              }
            },
            effect: {
              show: true,
              trailLength: 0.1,
              symbol: 'arrow',
              color: '#87e2ef',
              symbolSize: 4
            },
            data: charts.lines
          },
          {
            type: 'lines',
            symbol: ['none', 'none'],
            polyline: true,
            z: 3,
            symbolSize: 10,
            coordinateSystem: 'cartesian2d',
            label: {
              show: true,
              position: 'middle',
            },
            lineStyle: {
              normal: {
                color: 'green',
                width: 1,
                opacity: 1,
                curveness: 0
              }
            },
            effect: {
              show: true,
              trailLength: 0.1,
              symbol: 'arrow',
              color: '#87e2ef',
              symbolSize: 4
            },
            data: charts.linesData
          },
          {
            type: 'lines',
            symbol: ['none', 'arrow'],
            z: 2,
            symbolSize: 6,
            coordinateSystem: 'cartesian2d',
            label: {
              show: true,
              position: 'start',
            },
            lineStyle: {
              color: 'green',
              width: 2,
              opacity: 1,
              curveness: 0
            },
            data: charts.transLines
          },
          {
            type: 'lines',
            symbol: ['arrow', 'arrow'],
            z: 1,
            symbolSize: 6,
            coordinateSystem: 'cartesian2d',
            label: {
              show: true,
              position: 'middle',
            },
            lineStyle: {
              color: 'green',
              width: 2,
              opacity: 1,
              curveness: 0
            },
            data: charts.ereftlLines
          },
        ]
      }
      dom.off('click')
      dom.off('mouseover')
      let that = this
      dom.on('mouseover', function (e) {
        if (e.data.showTag == 1) {
          dom.dispatchAction({
            type: 'downplay',
            seriesIndex: e.seriesIndex
          })
        }
      });
      dom.on('click', function (info) {
        if (info.data.devNo) {
          that.paramModal = true
          that.paramModalShow = false
          that.$nextTick(() => {
            that.paramModalShow = true
            that.$nextTick(() => {
              that.$xy.vector.$emit("deviceNumber", {devNo: info.data.devNo,value:false})
            })
          })
        }
      });
      dom.setOption(option);
    },
    openParam(info) {
      if (info.devNo) {
        let no = info.devNo == '33-1' ? '33' : (info.devNo == '49-1' ? '49' : info.devNo)
        let obj = {
          devNo: no
        }
        if (info.devNo == '33') {
          obj.value = true
        } else {
          obj.value = false
        }
        this.paramModal = true
        this.paramModalShow = false
        this.$nextTick(() => {
          this.paramModalShow = true
          this.$nextTick(() => {
            this.$xy.vector.$emit("deviceNumber", obj)
          })
        })
      }
    }
  }
}
</script>
<style>
.charts {
  height: 518px;
  width: 830px;
  margin-top: -15px;
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
    margin-top: -15px;
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
  margin-top: -19px;
  z-index: 999;
  position: relative;

  span {
    display: inline-block;
    background: #009688;
    height: 14px;
    width: 14px;
    border-radius: 50%;
  }
}

.device_status {
  margin-top: -19px;
  z-index: 100;
  position: relative;

  span {
    display: inline-block;
    background: #009688;
    height: 12px;
    width: 12px;
    border-radius: 50%;
  }
}
</style>
