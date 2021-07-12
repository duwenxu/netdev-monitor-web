<template>
  <div>
    <template v-for="equipment in equipments">
      <div class="device_status" :style="equipment.pos">
        <span :style="judgeDeviceStatus(equipment)"
              :class="(equipment.isAlarm == '1' && equipment.isInterrupt == '0' && equipment.workStatus == '0')?'point-flicker':''">
        </span>
      </div>
    </template>
    <div ref="dom" class="charts"></div>
    <div class="legend">
      <div class="legend_status" v-for="(item, index) in legendType" :key="index">
        <span :class="[item.shape]"
              :style="{background: item.color, borderColor: item.borderColor}"></span>{{ item.description }}
      </div>
    </div>
    <div ref="test">
      <Modal :closable="false" :styles="{marginTop:'-90px'}" v-model="paramModal" @on-ok="confirm" @on-cancel="confirm"
             width="80%" :mask-closable="false">
<!--        <div slot="header"><span>参数信息</span>-->
<!--          <Button style="float: right" size="small" @click="confirm">关闭</Button>-->
<!--        </div>-->
        <DeviceMain v-show="paramModal"></DeviceMain>
      </Modal>
    </div>
  </div>

</template>
<script>
import * as echarts from 'echarts'
import mixin from "../../../components/common/websocket";
import DeviceMain from "@/view/netdev/monitor/DeviceMsg/deviceMain";

// let dom = null
export default {
  components: {DeviceMain},
  mixins: [mixin],
  data() {
    return {
      devNo: null,
      // dom: null,
      addSubOrgModalVif: false,
      paramModal: false,
      equipments: [
        {
          devNo: '121',
          name: 'C中频切换矩阵',
          isInterrupt: '0',
          workStatus: '0',
          isAlarm: '0',
          isUseStandby: false,
          masterOrSlave: '0',
          pos: {
            top: '80px',
            marginLeft: '570px',
            width: '16px',
            height: '16px',
          }
        },
        {
          devNo: '135',
          name: '无线宽带中心站',
          isInterrupt: '0',
          workStatus: '0',
          isAlarm: '0',
          isUseStandby: false,
          masterOrSlave: '1',
          pos: {
            top: '441px',
            marginLeft: '620px',
            width: '16px',
            height: '16px',
          }
        },
        {
          devNo: '137',
          name: '时间统一设备',
          isInterrupt: '0',
          workStatus: '0',
          isAlarm: '0',
          isUseStandby: false,
          masterOrSlave: '0',
          pos: {
            top: '341px',
            marginLeft: '1545px',
            width: '16px',
            height: '16px',
          }
        },
        {
          devNo: '151',
          name: 'SDH',
          isInterrupt: '0',
          workStatus: '0',
          isAlarm: '0',
          isUseStandby: false,
          masterOrSlave: '1',
          pos: {
            top: '340px',
            marginLeft: '847px',
            width: '16px',
            height: '16px',
          }
        },
        {
          devNo: '154',
          name: '路由器',
          isInterrupt: '0',
          workStatus: '0',
          isAlarm: '0',
          isUseStandby: false,
          masterOrSlave: '0',
          pos: {
            top: '250px',
            marginLeft: '1128px',
            width: '16px',
            height: '16px',
          }
        },
        {
          devNo: '19',
          name: '频谱监测',
          isInterrupt: '0',
          workStatus: '0',
          isAlarm: '0',
          isUseStandby: false,
          masterOrSlave: '0',
          pos: {
            top: '283px',
            marginLeft: '605px',
            width: '16px',
            height: '16px',
          }
        },
        {
          devNo: '253',
          name: '48口交换机（前）',
          isInterrupt: '0',
          workStatus: '0',
          isAlarm: '0',
          isUseStandby: false,
          masterOrSlave: '1',
          pos: {
            top: '175px',
            marginLeft: '1010px',
            width: '16px',
            height: '16px',
          }
        },
        {
          devNo: '252',
          name: '24口交换机',
          isInterrupt: '0',
          workStatus: '0',
          isAlarm: '0',
          isUseStandby: false,
          masterOrSlave: '0',
          pos: {
            top: '376px',
            marginLeft: '1333px',
            width: '16px',
            height: '16px',
          }
        },
        {
          devNo: '34',
          name: '被复线',
          isInterrupt: '0',
          workStatus: '0',
          isAlarm: '0',
          isUseStandby: false,
          masterOrSlave: '1',
          pos: {
            top: '391px',
            marginLeft: '847px',
            width: '16px',
            height: '16px',
          }
        },

        {
          devNo: '51',
          name: 'FDMACDMA1',
          isInterrupt: '0',
          workStatus: '0',
          isAlarm: '0',
          isUseStandby: false,
          masterOrSlave: '1',
          pos: {
            top: '136px',
            marginLeft: '864px',
            width: '16px',
            height: '16px',
          }
        },
        {
          devNo: '52',
          name: 'FDMACDMA2',
          isInterrupt: '0',
          workStatus: '0',
          isAlarm: '0',
          isUseStandby: false,
          masterOrSlave: '1',
          pos: {
            top: '176px',
            marginLeft: '864px',
            width: '16px',
            height: '16px',
          }
        },
        {
          devNo: '53',
          name: 'FDMACDMA3',
          isInterrupt: '0',
          workStatus: '0',
          isAlarm: '0',
          isUseStandby: false,
          masterOrSlave: '1',
          pos: {
            top: '215px',
            marginLeft: '864px',
            width: '16px',
            height: '16px',
          }
        },
        {
          devNo: '54',
          name: 'FDMACDMA4',
          isInterrupt: '0',
          workStatus: '0',
          isAlarm: '0',
          isUseStandby: false,
          masterOrSlave: '1',
          pos: {
            top: '255px',
            marginLeft: '864px',
            width: '16px',
            height: '16px',
          }
        },
        {
          devNo: '65',
          name: '通信控制器',
          isInterrupt: '0',
          workStatus: '0',
          isAlarm: '0',
          isUseStandby: false,
          masterOrSlave: '1',
          pos: {
            top: '570px',
            marginLeft: '1010px',
            width: '16px',
            height: '16px',
          }
        },
      ],
      masterPosition: {
        '11': {
          mark: 'A调制解调器1',
          border: '5px solid green',
          width: '152px',
          height: '32px',
          top: '120px',
          left: '785px',
        },
        '12': {
          mark: 'A调制解调器2',
          border: '5px solid green',
          width: '152px',
          height: '32px',
          top: '208px',
          left: '785px',
        },
        '13': {
          mark: 'B调制解调器1',
          border: '5px solid green',
          width: '152px',
          height: '32px',
          top: '328px',
          left: '785px',
        },
        '14': {
          mark: 'B调制解调器2',
          border: '5px solid green',
          width: '152px',
          height: '32px',
          top: '416px',
          left: '785px',
        },
        '16': {
          mark: '400W高功放',
          border: '',
          width: '125px',
          height: '62px',
          top: '700px',
          left: '100px',
        },
        // '32': {
        //   mark: '天线控制单元',
        //   border: '5px solid green',
        //   width: '132px',
        //   height: '32px',
        //   top: '554px',
        //   left: '136px',
        // },
        '36': {
          mark: '上变频器1',
          border: '5px solid green',
          width: '110px',
          height: '42px',
          top: '127px',
          left: '463px',
        },
        '37': {
          mark: '上变频器2',
          border: '5px solid green',
          width: '110px',
          height: '42px',
          top: '208px',
          left: '463px',
        },
        '24': {
          mark: '下变频器1',
          border: '5px solid green',
          width: '110px',
          height: '42px',
          top: '360px',
          left: '458px',
        },
        '40': {
          mark: '下变频器2',
          border: '5px solid green',
          width: '110px',
          height: '42px',
          top: '437px',
          left: '458px',
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
    }
  },
  beforeDestroy() {
    let dom = echarts.getInstanceByDom(this.$refs.dom)
    if (dom) {
      dom.clear()
      echarts.dispose(dom)
    }
    this.equipments = []
    // off(window, 'resize', this.resize)
  },
  mounted() {
    // this.initTime()


    this.init()
  },
  methods: {
    confirm() {
      // if(this.dom){
      //   this.dom.off('click')
      // }
      this.$xy.vector.$emit("closeModal")
      this.paramModal = false
      this.$refs.test.remove()
    },
    initTime() {
      this.timer = setInterval(this.scrollAnimate, 100);
    },
    scrollAnimate() {
      setTimeout(() => {
        console.log(this.number)
        if (this.number == '0') {
          this.number = '1'
        } else {
          this.number = '0'
        }
        let data = [
          {
            "devDeployType": "0031002",
            "devNo": "121",
            "devTypeCode": "8",
            "isAlarm": "0",
            "isInterrupt": "1",
            "isUseStandby": "1",
            "masterOrSlave": this.number,
            "stationId": null,
            "workStatus": "0"
          },

          {
            "devDeployType": "0031002",
            "devNo": "135",
            "devTypeCode": "8",
            "isAlarm": "1",
            "isInterrupt": "0",
            "isUseStandby": "1",
            "masterOrSlave": "0",
            "stationId": null,
            "workStatus": "0"
          },
          {
            "devDeployType": "0031003",
            "devNo": "137",
            "devTypeCode": "8",
            "isAlarm": "0",
            "isInterrupt": "0",
            "isUseStandby": "1",
            "masterOrSlave": this.number,
            "stationId": null,
            "workStatus": "0"
          },
          {
            "devDeployType": "0031004",
            "devNo": "138",
            "devTypeCode": "4",
            "isAlarm": "0",
            "isInterrupt": "0",
            "isUseStandby": "0",
            "masterOrSlave": "0",
            "stationId": null,
            "workStatus": "0"
          },
          {
            "devDeployType": "0031003",
            "devNo": "151",
            "devTypeCode": "8",
            "isAlarm": "0",
            "isInterrupt": "1",
            "isUseStandby": "1",
            "masterOrSlave": "0",
            "stationId": null,
            "workStatus": "0"
          },
          {
            "devDeployType": "0031004",
            "devNo": "154",
            "devTypeCode": "4",
            "isAlarm": "0",
            "isInterrupt": "0",
            "isUseStandby": "0",
            "masterOrSlave": "0",
            "stationId": null,
            "workStatus": "0"
          },
          {
            "devDeployType": "0031003",
            "devNo": "19",
            "devTypeCode": "8",
            "isAlarm": "0",
            "isInterrupt": "0",
            "isUseStandby": "1",
            "masterOrSlave": "0",
            "stationId": null,
            "workStatus": "0"
          },
          {
            "devDeployType": "0031004",
            "devNo": "252",
            "devTypeCode": "4",
            "isAlarm": "0",
            "isInterrupt": "0",
            "isUseStandby": "0",
            "masterOrSlave": "0",
            "stationId": null,
            "workStatus": "0"
          },
          {
            "devDeployType": "0031003",
            "devNo": "253",
            "devTypeCode": "8",
            "isAlarm": "0",
            "isInterrupt": "0",
            "isUseStandby": "1",
            "masterOrSlave": "0",
            "stationId": null,
            "workStatus": "0"
          },
          {
            "devDeployType": "0031004",
            "devNo": "34",
            "devTypeCode": "4",
            "isAlarm": "0",
            "isInterrupt": "0",
            "isUseStandby": "0",
            "masterOrSlave": "0",
            "stationId": null,
            "workStatus": "0"
          },
          {
            "devDeployType": "0031003",
            "devNo": "51",
            "devTypeCode": "8",
            "isAlarm": "0",
            "isInterrupt": "0",
            "isUseStandby": "1",
            "masterOrSlave": "0",
            "stationId": null,
            "workStatus": "0"
          },
          {
            "devDeployType": "0031004",
            "devNo": "52",
            "devTypeCode": "4",
            "isAlarm": "0",
            "isInterrupt": "0",
            "isUseStandby": "0",
            "masterOrSlave": "0",
            "stationId": null,
            "workStatus": "0"
          },
          {
            "devDeployType": "0031003",
            "devNo": "53",
            "devTypeCode": "8",
            "isAlarm": "0",
            "isInterrupt": "0",
            "isUseStandby": "1",
            "masterOrSlave": "0",
            "stationId": null,
            "workStatus": "0"
          },
          {
            "devDeployType": "0031004",
            "devNo": "54",
            "devTypeCode": "4",
            "isAlarm": "0",
            "isInterrupt": "0",
            "isUseStandby": "0",
            "masterOrSlave": "0",
            "stationId": null,
            "workStatus": "0"
          },
          {
            "devDeployType": "0031003",
            "devNo": "65",
            "devTypeCode": "8",
            "isAlarm": "0",
            "isInterrupt": "0",
            "isUseStandby": "1",
            "masterOrSlave": "0",
            "stationId": null,
            "workStatus": "0"
          },
        ]
        this.getWSData(data)
      }, 100)
    },
    getWSData(WSdata) {
      if (WSdata.length) {
        this.equipments.forEach(device => {
          let dIndex = WSdata.findIndex(value => value.devNo == device.devNo)
          if (dIndex > -1) {
            WSdata.forEach(item => {
              if (item.devNo == device.devNo) {
                this.setWSDate(item, device)
              }
            })
          } else {
            this.$set(device, 'noData', true)
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
      // if (device.noData) {//推送的数据中不存在当前设备状态
      //   info = {background: 'black'}
      // }
      return info
    },
    masterStatus(equipment) {
      return {
        zIndex: this.masterPosition[equipment.devNo].zIndex ? this.masterPosition[equipment.devNo].zIndex : 999,
        top: this.masterPosition[equipment.devNo].top,
        marginLeft: this.masterPosition[equipment.devNo].left,
        width: this.masterPosition[equipment.devNo].width,
        height: this.masterPosition[equipment.devNo].height,
        // border: this.masterPosition[equipment.devNo].border,
        border: equipment.masterOrSlave == '0' && equipment.devNo != 16 ? this.masterPosition[equipment.devNo].border : '5px solid rgba(0,0,0,0)',
      }
    },
    init() {
       let dom = echarts.init(this.$refs.dom);
      let nodes = [
        {
          x: '34',
          y: '680',
          nodeName: '     KuKa双频段动中通天线\n\n\n\n\n\n\n\n\n\n',
          img: 'image://' + require('@/assets/images/home/wn_track.png'),
          size: [160, 130]
        },
        {
          x: '30',
          y: '510',
          nodeName: '天地增强型车载天线\n\n\n\n\n\n\n',
          img: 'image://' + require('@/assets/images/home/green_ann.png'),
          size: [100, 100],
          color: '#c4e889',
          border: 'black',
        },
        {
          x: '300',
          y: '730',
          nodeName: ' 400W Ka发射机',
          img: 'rect',
          size: [130, 30],
          color: '#e2c777',
          border: 'black',
        },
        {
          x: '300',
          y: '670',
          nodeName: '100W ku发射机',
          img: 'rect',
          size: [130, 30],
          color: '#e2c777',
          border: 'black',
        },

        {
          x: '300',
          y: '630',
          nodeName: 'Ka接收机',
          img: 'rect',
          size: [130, 30],
          color: '#e2c777',
          border: 'black',
        },
        {
          x: '300',
          y: '580',
          nodeName: 'Ku接收机',
          img: 'rect',
          size: [130, 30],
          color: '#e2c777',
          border: 'black',
        },
        {
          x: '300',
          y: '500',
          nodeName: '天通手持终端',
          img: 'rect',
          size: [130, 30],
          color: '#e2c777',
          border: 'black',
        },
        {
          devNo: '121',
          x: '550',
          y: '640',
          nodeName: 'C\n频\n段\n切\n换\n矩\n阵',
          img: 'rect',
          size: [50, 220],
          color: '#e2c777',
          border: 'black',
        },
        {
          devNo: '19',
          x: '550',
          y: '500',
          nodeName: '频谱监测  ',
          img: 'rect',
          size: [100, 30],
          color: '#e2c777',
          border: 'black',
        },
        {
          x: '790',
          y: '730',
          nodeName: 'TDMA终端',
          img: 'rect',
          size: [130, 20],
          color: '#e2c777',
          border: 'black',
        },
        {
          x: '790',
          y: '690',
          nodeName: 'TDMA终端',
          img: 'rect',
          size: [130, 20],
          color: '#e2c777',
          border: 'black',
        },
        {
          devNo: '51',
          x: '790',
          y: '650',
          nodeName: 'FDMACDMA终端    ',
          img: 'rect',
          size: [140, 20],
          color: '#e2c777',
          border: 'black',
        },
        {
          devNo: '52',
          x: '790',
          y: '610',
          nodeName: 'FDMACDMA终端    ',
          img: 'rect',
          size: [140, 20],
          color: '#e2c777',
          border: 'black',
        },
        {
          devNo: '53',
          x: '790',
          y: '570',
          nodeName: 'FDMACDMA终端    ',
          img: 'rect',
          size: [140, 20],
          color: '#e2c777',
          border: 'black',
        },
        {
          devNo: '54',
          x: '790',
          y: '530',
          nodeName: 'FDMACDMA终端   ',
          img: 'rect',
          size: [140, 20],
          color: '#e2c777',
          border: 'black',
        },
        {
          devNo: '253',
          x: '1000',
          y: '550',
          nodeName: '48\n口\n交\n换\n机',
          img: 'rect',
          size: [40, 440],
          color: '#d3f1a5',
          border: 'black',
        },


        {
          x: '50',
          y: '442',
          nodeName: '车载转接盒',
          img: 'rect',
          size: [110, 30],
          color: 'rgba(227,221,152,1)',
          border: 'black',
        },
        {
          devNo: '151',
          x: '790',
          y: '442',
          nodeName: 'SDH光端机   ',
          img: 'rect',
          size: [110, 30],
          color: 'rgba(227,221,152,1)',
          border: 'black',
        },
        {
          x: '50',
          y: '390',
          nodeName: '车载转接盒',
          img: 'rect',
          size: [110, 30],
          color: 'rgba(227,221,152,1)',
          border: 'black',
        },
        {
          devNo: '34',
          x: '790',
          y: '390',
          nodeName: '被复线',
          img: 'rect',
          size: [110, 30],
          color: 'rgba(227,221,152,1)',
          border: 'black',
        },
        {
          x: '50',
          y: '340',
          nodeName: '车载天线',
          img: 'rect',
          size: [110, 30],
          color: '#c4e889',
          border: 'black',
        },
        {
          devNo: '135',
          x: '550',
          y: '340',
          nodeName: '无线宽带中心站     ',
          img: 'rect',
          size: [120, 30],
          color: '#c4e889',
          border: 'black',
        },
        {
          x: '320',
          y: '200',
          nodeName: '超\n短\n波\n电\n台\n天\n线\n合\n路\n器',
          img: 'rect',
          size: [40, 170],
          color: '#c4e889',
          border: 'black',
        },
        {
          x: '550',
          y: '280',
          nodeName: '超短波电台',
          img: 'rect',
          size: [120, 30],
          color: '#c4e889',
          border: 'black',
        },
        {
          x: '550',
          y: '230',
          nodeName: '超短波电台',
          img: 'rect',
          size: [120, 30],
          color: '#c4e889',
          border: 'black',
        },
        {
          x: '550',
          y: '180',
          nodeName: '超短波电台',
          img: 'rect',
          size: [120, 30],
          color: '#c4e889',
          border: 'black',
        },
        {
          x: '550',
          y: '130',
          nodeName: '超短波电台',
          img: 'rect',
          size: [120, 30],
          color: '#c4e889',
          border: 'black',
        },

        {
          x: '550',
          y: '70',
          nodeName: '短波电台',
          img: 'rect',
          size: [120, 30],
          color: '#c4e889',
          border: 'black',
        },
        {
          x: '550',
          y: '10',
          nodeName: '高速数传电台',
          img: 'rect',
          size: [120, 30],
          color: '#c4e889',
          border: 'black',
        },
        {
          x: '50',
          y: '200',
          nodeName: '车载天线',
          img: 'rect',
          size: [110, 30],
          color: '#c4e889',
          border: 'black',
        },
        {
          x: '50',
          y: '70',
          nodeName: '车载天线',
          img: 'rect',
          size: [110, 30],
          color: '#c4e889',
          border: 'black',
        },
        {
          x: '50',
          y: '10',
          nodeName: '车载天线',
          img: 'rect',
          size: [110, 30],
          color: '#c4e889',
          border: 'black',
        },
        {
          devNo: '65',
          x: '1000',
          y: '155',
          nodeName: '通\n信\n控\n制\n器',
          img: 'rect',
          size: [40, 320],
          color: '#d3f1a5',
          border: 'black',
        },
        {
          devNo: '154',
          x: '1120',
          y: '500',
          nodeName: '路\n由\n器',
          img: 'rect',
          size: [40, 100],
          color: '#d3f1a5',
          border: 'black',
        },
        {
          x: '1220',
          y: '500',
          nodeName: '保\n密\n机',
          img: 'rect',
          size: [40, 100],
          color: '#eae4cd',
          border: 'black',
        },
        {
          x: '1220',
          y: '630',
          nodeName: '监\n控\n接\n口',
          img: 'rect',
          size: [40, 100],
          color: 'rgba(0,0,0,0)',
          border: '',
        },
        {
          devNo: '252',
          x: '1330',
          y: '350',
          nodeName: '24\n口\n交\n换\n机',
          img: 'rect',
          size: [40, 700],
          color: '#d3f1a5',
          border: 'black',
        },
        {
          x: '1500',
          y: '650',
          nodeName: 'TDMA网管',
          img: 'rect',
          size: [120, 40],
          color: '#e2c777',
          border: 'black',
        },
        {
          x: '1500',
          y: '580',
          nodeName: '集中监控',
          img: 'rect',
          size: [120, 40],
          color: '#e2c777',
          border: 'black',
        },
        {
          x: '1500',
          y: '510',
          nodeName: '规划管理计算机',
          img: 'rect',
          size: [120, 40],
          color: '#d3f1a5',
          border: 'black',
        },
        {
          devNo: '137',
          x: '1500',
          y: '440',
          nodeName: '时间统一设备    ',
          img: 'rect',
          size: [120, 40],
          color: '#b4dfea',
          border: 'black',
        },
        {
          x: '1500',
          y: '370',
          nodeName: '北斗用户机',
          img: 'rect',
          size: [120, 40],
          color: '#b4dfea',
          border: 'black',
        },
        {
          x: '1500',
          y: '300',
          nodeName: '音视频服务器',
          img: 'rect',
          size: [120, 40],
          color: '#b4dfea',
          border: 'black',
        },


        {
          mark: '400w ka',
          x: '320',
          y: '755',
          nodeName: '',
          img: 'image://' + require('@/assets/images/home/arrow_down.png'),
          size: [55, 30],
          color: '#c4e889',
          border: 'black',
        },

        {
          mark: '100w ku',
          x: '320',
          y: '695',
          nodeName: '',
          img: 'image://' + require('@/assets/images/home/arrow_down.png'),
          size: [55, 30],
          color: '#c4e889',
          border: 'black',
        },
        {
          mark: '天通手持终端',
          x: '320',
          y: '525',
          nodeName: '',
          img: 'image://' + require('@/assets/images/home/arrow_down.png'),
          size: [55, 30],
          color: '#c4e889',
          border: 'black',
        },
        {
          mark: 'C频段',
          x: '570',
          y: '760',
          nodeName: '',
          img: 'image://' + require('@/assets/images/home/arrow_down.png'),
          size: [55, 30],
          color: '#c4e889',
          border: 'black',
        },
        {
          mark: 'TDMA',
          x: '800',
          y: '750',
          nodeName: '',
          img: 'image://' + require('@/assets/images/home/arrow_down.png'),
          size: [55, 30],
          color: '#c4e889',
          border: 'black',
        },
        {
          mark: 'TDMA',
          x: '800',
          y: '710',
          nodeName: '',
          img: 'image://' + require('@/assets/images/home/arrow_down.png'),
          size: [55, 30],
          color: '#c4e889',
          border: 'black',
        },
        {
          mark: 'TDMA',
          x: '800',
          y: '670',
          nodeName: '',
          img: 'image://' + require('@/assets/images/home/arrow_down.png'),
          size: [55, 30],
          color: '#c4e889',
          border: 'black',
        },
        {
          mark: 'TDMA',
          x: '800',
          y: '630',
          nodeName: '',
          img: 'image://' + require('@/assets/images/home/arrow_down.png'),
          size: [55, 30],
          color: '#c4e889',
          border: 'black',
        },
        {
          mark: 'TDMA',
          x: '800',
          y: '590',
          nodeName: '',
          img: 'image://' + require('@/assets/images/home/arrow_down.png'),
          size: [55, 30],
          color: '#c4e889',
          border: 'black',
        },
        {
          mark: 'TDMA',
          x: '800',
          y: '550',
          nodeName: '',
          img: 'image://' + require('@/assets/images/home/arrow_down.png'),
          size: [55, 30],
          color: '#c4e889',
          border: 'black',
        },

        {
          mark: '<-- 圆圈1',
          x: '640',
          y: '730',
          nodeName: '',
          img: 'circle',
          size: [5, 5],
          color: 'black',
          border: '',
        },
        {
          mark: '<-- 圆圈2',
          x: '640',
          y: '720',
          nodeName: '',
          img: 'circle',
          size: [5, 5],
          color: 'black',
          border: '',
        },
        {
          mark: '<-- 圆圈3',
          x: '640',
          y: '710',
          nodeName: '',
          img: 'circle',
          size: [5, 5],
          color: 'black',
          border: '',
        },
        {
          mark: '<-- 圆圈4',
          x: '640',
          y: '700',
          nodeName: '',
          img: 'circle',
          size: [5, 5],
          color: 'black',
          border: '',
        },
        {
          mark: '<-- 圆圈5',
          x: '640',
          y: '690',
          nodeName: '',
          img: 'circle',
          size: [5, 5],
          color: 'black',
          border: '',
        },
        {
          mark: '<-- 圆圈6',
          x: '640',
          y: '680',
          nodeName: '',
          img: 'circle',
          size: [5, 5],
          color: 'black',
          border: '',
        },

        {
          mark: '--> 圆圈1',
          x: '640',
          y: '600',
          nodeName: '',
          img: 'circle',
          size: [5, 5],
          color: 'black',
          border: '',
        },
        {
          mark: '--> 圆圈2',
          x: '640',
          y: '590',
          nodeName: '',
          img: 'circle',
          size: [5, 5],
          color: 'black',
          border: '',
        },
        {
          mark: '--> 圆圈3',
          x: '640',
          y: '580',
          nodeName: '',
          img: 'circle',
          size: [5, 5],
          color: 'black',
          border: '',
        },
        {
          mark: '--> 圆圈4',
          x: '640',
          y: '570',
          nodeName: '',
          img: 'circle',
          size: [5, 5],
          color: 'black',
          border: '',
        },
        {
          mark: '--> 圆圈5',
          x: '640',
          y: '560',
          nodeName: '',
          img: 'circle',
          size: [5, 5],
          color: 'black',
          border: '',
        },
        {
          mark: '--> 圆圈6',
          x: '640',
          y: '550',
          nodeName: '',
          img: 'circle',
          size: [5, 5],
          color: 'black',
          border: '',
        },

        {
          mark: 'SDH光',
          x: '800',
          y: '470',
          nodeName: '',
          img: 'image://' + require('@/assets/images/home/arrow_down.png'),
          size: [55, 30],
          color: '#c4e889',
          border: 'black',
        },
        {
          mark: '被复线',
          x: '800',
          y: '415',
          nodeName: '',
          img: 'image://' + require('@/assets/images/home/arrow_down.png'),
          size: [55, 30],
          color: '#c4e889',
          border: 'black',
        },
        {
          mark: '频谱监测',
          x: '565',
          y: '474',
          nodeName: '',
          img: 'image://' + require('@/assets/images/home/arrow_up.png'),
          size: [55, 30],
          color: '#c4e889',
          border: 'black',
        },
        {
          mark: '无线宽带中心',
          x: '565',
          y: '365',
          nodeName: '',
          img: 'image://' + require('@/assets/images/home/arrow_down.png'),
          size: [55, 30],
          color: '#c4e889',
          border: 'black',
        },
        {
          mark: '超短波1',
          x: '565',
          y: '305',
          nodeName: '',
          img: 'image://' + require('@/assets/images/home/arrow_down.png'),
          size: [55, 30],
          color: '#c4e889',
          border: 'black',
        },
        {
          mark: '超短波2',
          x: '565',
          y: '255',
          nodeName: '',
          img: 'image://' + require('@/assets/images/home/arrow_down.png'),
          size: [55, 30],
          color: '#c4e889',
          border: 'black',
        },
        {
          mark: '超短波3',
          x: '565',
          y: '205',
          nodeName: '',
          img: 'image://' + require('@/assets/images/home/arrow_down.png'),
          size: [55, 30],
          color: '#c4e889',
          border: 'black',
        },
        {
          mark: '超短波4',
          x: '565',
          y: '155',
          nodeName: '',
          img: 'image://' + require('@/assets/images/home/arrow_down.png'),
          size: [55, 30],
          color: '#c4e889',
          border: 'black',
        },
        {
          mark: '短波',
          x: '565',
          y: '95',
          nodeName: '',
          img: 'image://' + require('@/assets/images/home/arrow_down.png'),
          size: [55, 30],
          color: '#c4e889',
          border: 'black',
        },
        {
          mark: '高速数传',
          x: '565',
          y: '35',
          nodeName: '',
          img: 'image://' + require('@/assets/images/home/arrow_down.png'),
          size: [55, 30],
          color: '#c4e889',
          border: 'black',
        },
        {
          mark: '路由器',
          x: '1135',
          y: '562',
          nodeName: '',
          img: 'image://' + require('@/assets/images/home/arrow_down.png'),
          size: [55, 30],
          color: '#c4e889',
          border: 'black',
        },


        {
          mark: '--> 交换机圆圈1',
          x: '1275',
          y: '660',
          nodeName: '',
          img: 'circle',
          size: [5, 5],
          color: 'black',
          border: '',
        },
        {
          mark: '--> 交换机圆圈2',
          x: '1275',
          y: '650',
          nodeName: '',
          img: 'circle',
          size: [5, 5],
          color: 'black',
          border: '',
        },
        {
          mark: '--> 交换机圆圈3',
          x: '1275',
          y: '640',
          nodeName: '',
          img: 'circle',
          size: [5, 5],
          color: 'black',
          border: '',
        },
        {
          mark: '--> 交换机圆圈4',
          x: '1275',
          y: '630',
          nodeName: '',
          img: 'circle',
          size: [5, 5],
          color: 'black',
          border: '',
        },
        {
          mark: '--> 交换机圆圈5',
          x: '1275',
          y: '620',
          nodeName: '',
          img: 'circle',
          size: [5, 5],
          color: 'black',
          border: '',
        },
        {
          mark: '--> 交换机圆圈6',
          x: '1275',
          y: '610',
          nodeName: '',
          img: 'circle',
          size: [5, 5],
          color: 'black',
          border: '',
        },

      ]
      let charts = {
        nodes: [],
        linesData: [
          {
            mark: 'KUKA->Ka接收机',
            name: '',
            coords: [[25, 640], [230, 640]],
            lineStyle: {
              color: 'rgb(203,44,44)'
            },
            effect: {
              color: 'rgb(203,44,44)'
            }
          },
          {
            mark: '400w->KUKA',
            name: '',
            coords: [[230, 730], [25, 730]],
            lineStyle: {
              color: 'rgb(203,44,44)'
            },
            effect: {
              color: 'rgb(203,44,44)'
            }
          },
          {
            mark: '100w->KUKA',
            name: '',
            coords: [[230, 670], [55, 670]],
            lineStyle: {
              color: 'rgb(203,44,44)'
            },
            effect: {
              color: 'rgb(203,44,44)'
            }
          },
          {
            mark: '天地增强->手持',
            name: '',
            coords: [[75, 500], [230, 500]],
            lineStyle: {
              color: 'rgb(203,44,44)'
            },
            effect: {
              color: 'rgb(203,44,44)'
            }
          },
          {
            mark: '手持->天地增强',
            name: '',
            coords: [[230, 500], [75, 500]],
            lineStyle: {
            color: 'rgb(203,44,44)'
            },
            effect: {
              color: 'rgb(203,44,44)'
            }
          },
          {
            mark: 'Ka->C频段',
            name: '',
            coords: [[370, 630], [525, 630]],
            lineStyle: {
            color: 'rgb(203,44,44)'
            },
            effect: {
              color: 'rgb(203,44,44)'
            }
          },
          {
            mark: 'Ku->C频段',
            name: '',
            coords: [[370, 580], [525, 580]],
            lineStyle: {
            color: 'rgb(203,44,44)'
            },
            effect: {
              color: 'rgb(203,44,44)'
            }
          },
          {
            mark: 'C频段->400w',
            name: '',
            coords: [[525, 730], [370, 730]],
            lineStyle: {
            color: 'rgb(203,44,44)'
            },
            effect: {
              color: 'rgb(203,44,44)'
            }
          },
          {
            mark: 'C频段->100w',
            name: '',
            coords: [[525, 670], [370, 670]],
            lineStyle: {
            color: 'rgb(203,44,44)'
            },
            effect: {
              color: 'rgb(203,44,44)'
            }
          },

          {
            mark: 'C频段旁箭头 -->',
            name: '',
            coords: [[580, 605], [610, 605]],
            lineStyle: {
            color: 'rgb(203,44,44)'
            },
            effect: {
              color: 'rgb(203,44,44)'
            }
          },
          {
            mark: 'C频段旁箭头 -->',
            name: '',
            coords: [[580, 590], [610, 590]],
            lineStyle: {
            color: 'rgb(203,44,44)'
            },
            effect: {
              color: 'rgb(203,44,44)'
            }
          },
          {
            mark: 'C频段旁箭头 -->',
            name: '',
            coords: [[580, 575], [610, 575]],
            lineStyle: {
            color: 'rgb(203,44,44)'
            },
            effect: {
              color: 'rgb(203,44,44)'
            }
          },
          {
            mark: 'C频段旁箭头 -->',
            name: '',
            coords: [[580, 560], [610, 560]],
            lineStyle: {
            color: 'rgb(203,44,44)'
            },
            effect: {
              color: 'rgb(203,44,44)'
            }
          },
          {
            mark: 'C频段旁箭头 -->',
            name: '',
            coords: [[580, 545], [610, 545]],
            lineStyle: {
            color: 'rgb(203,44,44)'
            },
            effect: {
              color: 'rgb(203,44,44)'
            }
          },
          {
            mark: 'C频段旁箭头 -->',
            name: '',
            coords: [[580, 530], [610, 530]],
            lineStyle: {
            color: 'rgb(203,44,44)'
            },
            effect: {
              color: 'rgb(203,44,44)'
            }
          },

          {
            mark: 'C频段旁箭头 <--',
            name: '',
            coords: [[610, 745], [580, 745]],
            lineStyle: {
            color: 'rgb(203,44,44)'
            },
            effect: {
              color: 'rgb(203,44,44)'
            }
          },
          {
            mark: 'C频段旁箭头 <--',
            name: '',
            coords: [[610, 730], [580, 730]],
            lineStyle: {
            color: 'rgb(203,44,44)'
            },
            effect: {
              color: 'rgb(203,44,44)'
            }
          },
          {
            mark: 'C频段旁箭头 <--',
            name: '',
            coords: [[610, 715], [580, 715]],
            lineStyle: {
            color: 'rgb(203,44,44)'
            },
            effect: {
              color: 'rgb(203,44,44)'
            }
          },
          {
            mark: 'C频段旁箭头 <--',
            name: '',
            coords: [[610, 700], [580, 700]],
            lineStyle: {
            color: 'rgb(203,44,44)'
            },
            effect: {
              color: 'rgb(203,44,44)'
            }
          },
          {
            mark: 'C频段旁箭头 <--',
            name: '',
            coords: [[610, 685], [580, 685]],
            lineStyle: {
            color: 'rgb(203,44,44)'
            },
            effect: {
              color: 'rgb(203,44,44)'
            }
          },
          {
            mark: 'C频段旁箭头 <--',
            name: '',
            coords: [[610, 670], [580, 670]],
            lineStyle: {
            color: 'rgb(203,44,44)'
            },
            effect: {
              color: 'rgb(203,44,44)'
            }
          },
          {
            mark: 'TDMA <--',
            name: '',
            coords: [[715, 735], [680, 735]],
            lineStyle: {
            color: 'rgb(203,44,44)'
            },
            effect: {
              color: 'rgb(203,44,44)'
            }
          },
          {
            mark: 'TDMA-->',
            name: '',
            coords: [[680, 725], [715, 725]],
            lineStyle: {
            color: 'rgb(203,44,44)'
            },
            effect: {
              color: 'rgb(203,44,44)'
            }
          },


          {
            mark: 'TDMA <--',
            name: '',
            coords: [[715, 695], [680, 695]],
            lineStyle: {
            color: 'rgb(203,44,44)'
            },
            effect: {
              color: 'rgb(203,44,44)'
            }
          },
          {
            mark: 'TDMA-->',
            name: '',
            coords: [[680, 685], [715, 685]],
            lineStyle: {
            color: 'rgb(203,44,44)'
            },
            effect: {
              color: 'rgb(203,44,44)'
            }
          },

          {
            mark: 'TDMA <--',
            name: '',
            coords: [[715, 655], [680, 655]],
            lineStyle: {
            color: 'rgb(203,44,44)'
            },
            effect: {
              color: 'rgb(203,44,44)'
            }
          },
          {
            mark: 'TDMA-->',
            name: '',
            coords: [[680, 645], [715, 645]],
            lineStyle: {
            color: 'rgb(203,44,44)'
            },
            effect: {
              color: 'rgb(203,44,44)'
            }
          },


          {
            mark: 'TDMA <--',
            name: '',
            coords: [[715, 615], [680, 615]],
            lineStyle: {
            color: 'rgb(203,44,44)'
            },
            effect: {
              color: 'rgb(203,44,44)'
            }
          },
          {
            mark: 'TDMA-->',
            name: '',
            coords: [[680, 605], [715, 605]],
            lineStyle: {
            color: 'rgb(203,44,44)'
            },
            effect: {
              color: 'rgb(203,44,44)'
            }
          },


          {
            mark: 'TDMA <--',
            name: '',
            coords: [[715, 575], [680, 575]],
            lineStyle: {
            color: 'rgb(203,44,44)'
            },
            effect: {
              color: 'rgb(203,44,44)'
            }
          },
          {
            mark: 'TDMA-->',
            name: '',
            coords: [[680, 565], [715, 565]],
            lineStyle: {
            color: 'rgb(203,44,44)'
            },
            effect: {
              color: 'rgb(203,44,44)'
            }
          },
          {
            mark: 'TDMA <--',
            name: '',
            coords: [[715, 535], [680, 535]],
            lineStyle: {
            color: 'rgb(203,44,44)'
            },
            effect: {
              color: 'rgb(203,44,44)'
            }
          },
          {
            mark: 'TDMA-->',
            name: '',
            coords: [[680, 525], [715, 525]],
            lineStyle: {
            color: 'rgb(203,44,44)'
            },
            effect: {
              color: 'rgb(203,44,44)'
            }
          },


          {
            mark: 'TDMA1-->交换机',
            name: '',
            coords: [[860, 730], [1000, 730]],
            lineStyle: {
            color: 'rgb(203,44,44)'
            },
            effect: {
              color: 'rgb(203,44,44)'
            }
          },
          {
            mark: 'TDMA1-->交换机',
            name: '',
            coords: [[1000, 730], [860, 730]],
            lineStyle: {
            color: 'rgb(203,44,44)'
            },
            effect: {
              color: 'rgb(203,44,44)'
            }
          },

          {
            mark: 'TDMA2-->交换机',
            name: '',
            coords: [[860, 690], [1000, 690]],
            lineStyle: {
            color: 'rgb(203,44,44)'
            },
            effect: {
              color: 'rgb(203,44,44)'
            }
          },
          {
            mark: 'TDMA2-->交换机',
            name: '',
            coords: [[1000, 690], [860, 690]],
            lineStyle: {
            color: 'rgb(203,44,44)'
            },
            effect: {
              color: 'rgb(203,44,44)'
            }
          },

          {
            mark: 'TDMA3-->交换机',
            name: '',
            coords: [[860, 650], [1000, 650]],
            lineStyle: {
            color: 'rgb(203,44,44)'
            },
            effect: {
              color: 'rgb(203,44,44)'
            }
          },
          {
            mark: 'TDMA3-->交换机',
            name: '',
            coords: [[1000, 650], [860, 650]],
            lineStyle: {
            color: 'rgb(203,44,44)'
            },
            effect: {
              color: 'rgb(203,44,44)'
            }
          },

          {
            mark: 'TDMA4-->交换机',
            name: '',
            coords: [[860, 610], [1000, 610]],
            lineStyle: {
            color: 'rgb(203,44,44)'
            },
            effect: {
              color: 'rgb(203,44,44)'
            }
          },
          {
            mark: 'TDMA4-->交换机',
            name: '',
            coords: [[1000, 610], [860, 610]],
            lineStyle: {
            color: 'rgb(203,44,44)'
            },
            effect: {
              color: 'rgb(203,44,44)'
            }
          },

          {
            mark: 'TDMA5-->交换机',
            name: '',
            coords: [[860, 570], [1000, 570]],
            lineStyle: {
            color: 'rgb(203,44,44)'
            },
            effect: {
              color: 'rgb(203,44,44)'
            }
          },
          {
            mark: 'TDMA5-->交换机',
            name: '',
            coords: [[1000, 570], [860, 570]],
            lineStyle: {
            color: 'rgb(203,44,44)'
            },
            effect: {
              color: 'rgb(203,44,44)'
            }
          },

          {
            mark: 'TDMA6-->交换机',
            name: '',
            coords: [[860, 530], [1000, 530]],
            lineStyle: {
            color: 'rgb(203,44,44)'
            },
            effect: {
              color: 'rgb(203,44,44)'
            }
          },
          {
            mark: 'TDMA6-->交换机',
            name: '',
            coords: [[1000, 530], [860, 530]],
            lineStyle: {
            color: 'rgb(203,44,44)'
            },
            effect: {
              color: 'rgb(203,44,44)'
            }
          },
          {
            mark: '车载转接盒1-->SDH',
            name: '',
            coords: [[100, 440], [800, 440]],
            lineStyle: {
            color: 'black'
            },
            effect: {
              color: 'black'
            }
          },
          {
            mark: 'SDH-》车载转接盒1-->',
            name: '',
            coords: [[800, 440], [100, 440]],
            lineStyle: {
            color: 'black'
            },
            effect: {
              color: 'black'
            }
          },
          {
            mark: 'SDH-》交换机-->',
            name: '',
            coords: [[850, 440], [980, 440]],
            lineStyle: {
            color: 'black'
            },
            effect: {
              color: 'black'
            }
          },
          {
            mark: '交换机-》SDH',
            name: '',
            coords: [[980, 440], [850, 440]],
            lineStyle: {
            color: 'black'
            },
            effect: {
              color: 'black'
            }
          },
          {
            mark: '-》车载转接盒2-->被复线',
            name: '',
            coords: [[100, 390], [800, 390]],
            lineStyle: {
            color: 'black'
            },
            effect: {
              color: 'black'
            }
          },
          {
            mark: '被复线-》车载转接盒2',
            name: '',
            coords: [[850, 390], [980, 390]],
            lineStyle: {
            color: 'black'
            },
            effect: {
              color: 'black'
            }
          },
          {
            mark: '车载转接盒2-》被复线-》',
            name: '',
            coords: [[980, 390], [850, 390]],
            lineStyle: {
            color: 'black'
            },
            effect: {
              color: 'black'
            }
          },

          {
            mark: '车载天线-》无线宽带-》-->',
            name: '',
            coords: [[105, 340], [488, 340]],
            lineStyle: {
            color: 'black'
            },
            effect: {
              color: 'black'
            }
          },
          {
            mark: '无线宽带-》车载天线',
            name: '',
            coords: [[488, 340], [105, 340]],
            lineStyle: {
            color: 'black'
            },
            effect: {
              color: 'black'
            }
          },
          {
            mark: '车载天线1-》无线宽带',
            name: '',
            coords: [[610, 340], [980, 340]],
            lineStyle: {
            color: 'black'
            },
            effect: {
              color: 'black'
            }
          },
          {
            mark: '无线宽带-》车载天线1',
            name: '',
            coords: [[980, 340], [610, 340]],
            lineStyle: {
            color: 'black'
            },
            effect: {
              color: 'black'
            }
          },

          {
            mark: '车载天线2-》超短波合路器',
            name: '',
            coords: [[100, 200], [300, 200]],
            lineStyle: {
            color: 'black'
            },
            effect: {
              color: 'black'
            }
          },
          {
            mark: '超短波合路器-》车载天线2',
            name: '',
            coords: [[300, 200], [100, 200]],
            lineStyle: {
            color: 'black'
            },
            effect: {
              color: 'black'
            }
          },

          {
            mark: '超短波合路器-》超短波电台1',
            name: '',
            coords: [[330, 280], [490, 280]],
            lineStyle: {
            color: 'black'
            },
            effect: {
              color: 'black'
            }
          },
          {
            mark: '超短波电台1-》超短波合路器-》',
            name: '',
            coords: [[490, 280], [330, 280]],
            lineStyle: {
            color: 'black'
            },
            effect: {
              color: 'black'
            }
          },
          {
            mark: '超短波电台1-》通信控制器',
            name: '',
            coords: [[610, 280], [980, 280]],
            lineStyle: {
            color: 'black'
            },
            effect: {
              color: 'black'
            }
          },
          {
            mark: '通信控制器-》超短波电台1',
            name: '',
            coords: [[980, 280], [610, 280]],
            lineStyle: {
            color: 'black'
            },
            effect: {
              color: 'black'
            }
          },
          {
            mark: '超短波合路器-》超短波电台2',
            name: '',
            coords: [[330, 230], [490, 230]],
            lineStyle: {
            color: 'black'
            },
            effect: {
              color: 'black'
            }
          },

          {
            mark: '超短波电台2-》超短波合路器-》',
            name: '',
            coords: [[490, 230], [330, 230]],
            lineStyle: {
            color: 'black'
            },
            effect: {
              color: 'black'
            }
          },
          {
            mark: '超短波电台2-》通信控制器-》',
            name: '',
            coords: [[610, 230], [980, 230]],
            lineStyle: {
            color: 'black'
            },
            effect: {
              color: 'black'
            }
          },
          {
            mark: '通信控制器-》超短波电台2-》-》',
            name: '',
            coords: [[980, 230], [610, 230]],
            lineStyle: {
            color: 'black'
            },
            effect: {
              color: 'black'
            }
          },

          {
            mark: '超短波合路器-》超短波电台3',
            name: '',
            coords: [[330, 180], [490, 180]],
            lineStyle: {
            color: 'black'
            },
            effect: {
              color: 'black'
            }
          },
          {
            mark: '超短波电台3-》超短波合路器-》',
            name: '',
            coords: [[490, 180], [330, 180]],
            lineStyle: {
            color: 'black'
            },
            effect: {
              color: 'black'
            }
          },
          {
            mark: '超短波电台3-》通信控制器-》',
            name: '',
            coords: [[610, 180], [980, 180]],
            lineStyle: {
            color: 'black'
            },
            effect: {
              color: 'black'
            }
          },
          {
            mark: '通信控制器-》超短波电台3-》-》',
            name: '',
            coords: [[980, 180], [610, 180]],
            lineStyle: {
            color: 'black'
            },
            effect: {
              color: 'black'
            }
          },

          {
            mark: '超短波合路器-》超短波电台4',
            name: '',
            coords: [[330, 130], [490, 130]],
            lineStyle: {
            color: 'black'
            },
            effect: {
              color: 'black'
            }
          },
          {
            mark: '超短波电台4-》超短波合路器-》',
            name: '',
            coords: [[490, 130], [330, 130]],
            lineStyle: {
            color: 'black'
            },
            effect: {
              color: 'black'
            }
          },
          {
            mark: '超短波电台4-》通信控制器-》',
            name: '',
            coords: [[610, 130], [980, 130]],
            lineStyle: {
            color: 'black'
            },
            effect: {
              color: 'black'
            }
          },
          {
            mark: '通信控制器-》超短波电台4-》-》',
            name: '',
            coords: [[980, 130], [610, 130]],
            lineStyle: {
            color: 'black'
            },
            effect: {
              color: 'black'
            }
          },
          {
            mark: '车载天线3-》短波电台',
            name: '',
            coords: [[100, 70], [490, 70]],
            lineStyle: {
            color: 'black'
            },
            effect: {
              color: 'black'
            }
          },
          {
            mark: '短波电台-》车载天线3',
            name: '',
            coords: [[490, 70], [100, 70]],
            lineStyle: {
            color: 'black'
            },
            effect: {
              color: 'black'
            }
          },
          {
            mark: '短波电台-》通信控制器',
            name: '',
            coords: [[610, 70], [980, 70]],
            lineStyle: {
            color: 'black'
            },
            effect: {
              color: 'black'
            }
          },
          {
            mark: '通信控制器-》短波电台-》',
            name: '',
            coords: [[980, 70], [610, 70]],
            lineStyle: {
            color: 'black'
            },
            effect: {
              color: 'black'
            }
          },
          {
            mark: '车载天线4-》高速数传',
            name: '',
            coords: [[100, 10], [490, 10]],
            lineStyle: {
            color: 'black'
            },
            effect: {
              color: 'black'
            }
          },
          {
            mark: '高速数传-》车载天线4-》',
            name: '',
            coords: [[490, 10], [100, 10]],
            lineStyle: {
            color: 'black'
            },
            effect: {
              color: 'black'
            }
          },
          {
            mark: '高速数传-》通信控制器-》',
            name: '',
            coords: [[610, 10], [980, 10]],
            lineStyle: {
            color: 'black'
            },
            effect: {
              color: 'black'
            }
          },
          {
            mark: '通信控制器-》高速数传',
            name: '',
            coords: [[980, 10], [610, 10]],
            lineStyle: {
            color: 'black'
            },
            effect: {
              color: 'black'
            }
          },

          {
            mark: '交换机-》路由器',
            name: '',
            coords: [[1010, 500], [1100, 500]],
            lineStyle: {
            color: '#e6c835'
            },
            effect: {
              color: '#e6c835'
            }
          },
          {
            mark: '路由器-》交换机-》',
            name: '',
            coords: [[1100, 500], [1010, 500]],
            lineStyle: {
            color: '#e6c835'
            },
            effect: {
              color: '#e6c835'
            }
          },

          {
            mark: '路由器-》保密机',
            name: '',
            coords: [[1140, 500], [1200, 500]],
            lineStyle: {
            color: '#e6c835'
            },
            effect: {
              color: '#e6c835'
            }
          },
          {
            mark: '保密机-》路由器-》',
            name: '',
            coords: [[1200, 500], [1140, 500]],
            lineStyle: {
            color: '#e6c835'
            },
            effect: {
              color: '#e6c835'
            }
          },

          {
            mark: '保密机-》交换机2',
            name: '',
            coords: [[1240, 500], [1320, 500]],
            lineStyle: {
            color: '#e6c835'
            },
            effect: {
              color: '#e6c835'
            }
          },
          {
            mark: '交换机2-》保密机-》',
            name: '',
            coords: [[1320, 500], [1240, 500]],
            lineStyle: {
            color: '#e6c835'
            },
            effect: {
              color: '#e6c835'
            }
          },
          {
            mark: '通信控制器-》交换机2-》',
            name: '',
            coords: [[1010, 200], [1320, 200]],
            lineStyle: {
            color: '#e6c835'
            },
            effect: {
              color: '#e6c835'
            }
          },
          {
            mark: '交换机2-》通信控制器-》-》',
            name: '',
            coords: [[1320, 200], [1010, 200]],
            lineStyle: {
            color: '#e6c835'
            },
            effect: {
              color: '#e6c835'
            }
          },

          {
            mark: '通信控制器-》交换机2-》',
            name: '',
            coords: [[1010, 150], [1320, 150]],
            lineStyle: {
            color: '#456bde'
            },
            effect: {
              color: '#456bde'
            }
          },
          {
            mark: '交换机2-》通信控制器-》-》',
            name: '',
            coords: [[1320, 150], [1010, 150]],
            lineStyle: {
            color: '#456bde'
            },
            effect: {
              color: '#456bde'
            }
          },

          {
            mark: '交换机2-》箭头-》-》',
            name: '',
            coords: [[1250, 700], [1300, 700]],
            lineStyle: {
            color: '#456bde'
            },
            effect: {
              color: '#456bde'
            }
          },
          {
            mark: '箭头-》交换机2-》-》-》',
            name: '',
            coords: [[1300, 700], [1250, 700]],
            lineStyle: {
            color: '#456bde'
            },
            effect: {
              color: '#456bde'
            }
          },

          {
            mark: '交换机2-》箭头-》-》',
            name: '',
            coords: [[1250, 680], [1300, 680]],
            lineStyle: {
            color: '#456bde'
            },
            effect: {
              color: '#456bde'
            }
          },
          {
            mark: '箭头-》交换机2-》-》-》',
            name: '',
            coords: [[1300, 680], [1250, 680]],
            lineStyle: {
            color: '#456bde'
            },
            effect: {
              color: '#456bde'
            }
          },

          {
            mark: '交换机2-》箭头-》-》',
            name: '',
            coords: [[1250, 590], [1300, 590]],
            lineStyle: {
            color: '#456bde'
            },
            effect: {
              color: '#456bde'
            }
          },
          {
            mark: '箭头-》交换机2-》-》-》',
            name: '',
            coords: [[1300, 590], [1250, 590]],
            lineStyle: {
            color: '#456bde'
            },
            effect: {
              color: '#456bde'
            }
          },

          {
            mark: '交换机2-》TDMA网管',
            name: '',
            coords: [[1350, 650], [1440, 650]],
            lineStyle: {
            color: '#456bde'
            },
            effect: {
              color: '#456bde'
            }
          },
          {
            mark: 'TDMA网管-》交换机2-》-》-》',
            name: '',
            coords: [[1440, 650], [1350, 650]],
            lineStyle: {
            color: '#456bde'
            },
            effect: {
              color: '#456bde'
            }
          },

          {
            mark: '交换机2-》集中监控',
            name: '',
            coords: [[1350, 580], [1440, 580]],
            lineStyle: {
            color: '#456bde'
            },
            effect: {
              color: '#456bde'
            }
          },
          {
            mark: '集中监控-》交换机2',
            name: '',
            coords: [[1440, 580], [1350, 580]],
            lineStyle: {
            color: '#456bde'
            },
            effect: {
              color: '#456bde'
            }
          },


          {
            mark: '交换机2-》时间统一设备',
            name: '',
            coords: [[1350, 440], [1440, 440]],
            lineStyle: {
            color: '#e6c835'
            },
            effect: {
              color: '#e6c835'
            }
          },
          {
            mark: '时间统一设备-》交换机2',
            name: '',
            coords: [[1440, 440], [1350, 440]],
            lineStyle: {
            color: '#e6c835'
            },
            effect: {
              color: '#e6c835'
            }
          },

          {
            mark: '交换机2-》北斗用户机',
            name: '',
            coords: [[1350, 370], [1440, 370]],
            lineStyle: {
            color: '#e6c835'
            },
            effect: {
              color: '#e6c835'
            }
          },
          {
            mark: '北斗用户机-》交换机2',
            name: '',
            coords: [[1440, 370], [1350, 370]],
            lineStyle: {
            color: '#e6c835'
            },
            effect: {
              color: '#e6c835'
            }
          },

          {
            mark: '交换机2-》音视频服务',
            name: '',
            coords: [[1350, 300], [1440, 300]],
            lineStyle: {
            color: '#e6c835'
            },
            effect: {
              color: '#e6c835'
            }
          },
          {
            mark: '音视频服务-》交换机2',
            name: '',
            coords: [[1440, 300], [1350, 300]],
            lineStyle: {
            color: '#e6c835'
            },
            effect: {
              color: '#e6c835'
            }
          },
        ],
        polyLines: [

          {
            mark: 'KUKA->Ka接收机',
            name: '',
            coords: [[10, 640], [10, 580], [230, 580]],
            lineStyle: {
            color: 'rgb(203,44,44)'
            },
            effect: {
              color: 'rgb(203,44,44)'
            }
          },
        ],
        lines: [{
          mark: 'C频段->频谱',
          name: '',
          coords: [[550, 530], [550, 500]],
          lineStyle: {
            color: 'black'
          },
          effect: {
            color: 'black'
          }
        },
          {
            mark: 'KUKA->Ka接收机',
            name: '',
            coords: [[1010, 250], [1120, 250], [1120, 460]],
            lineStyle: {
            color: 'black'
            },
            effect: {
              color: 'black'
            }
          },]
      }

      let len = nodes.length
      for (let j = 0; j < len; j++) {
        let x = parseInt(nodes[j].x)
        let y = parseInt(nodes[j].y)
        let node = {
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
              color: nodes[j].color ? nodes[j].color : '#12b5d0',
          },
          emphasis: {}
        }
        if (nodes[j].border) {
          node.itemStyle.borderType = nodes[j].border
          node.itemStyle.borderDashOffset = nodes[j].offset
          node.itemStyle.borderColor = nodes[j].borderColor ? nodes[j].borderColor : 'grey'
          node.itemStyle.borderWidth = '1'
        }
        charts.nodes.push(node)
      }
      let option = {
        animation: false,
        grid: {left: '40', right: '15', bottom: '30', top: '10'},
        xAxis: {
          min: 0,
          max: 1600,
          show: false,
          type: 'value'
        },
        yAxis: {
          min: 0,
          max: 770,
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
              width: 1.5,
              opacity: 1,
              curveness: 0
            },
            effect: {
              show: true,
              trailLength: 0.1,
              symbol: 'arrow',
              color: '#87e2ef',
              symbolSize: 5
            },
            data: charts.polyLines
          },
          {
            type: "lines",
            symbol: ['none', 'none'],
            z: 4,
            symbolSize: 4,
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
            data: charts.lines
          },
          {
            type: "lines",
            symbol: ['none', 'none'],
            z: 3,
            symbolSize: 4,
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
              symbolSize: 5
            },
            data: charts.linesData
          },
          {
            type: 'graph',
            z: 6,
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
      dom.off('click')
      let that = this
      dom.on('click', function (info) {
        if (info.data.devNo) {
          that.paramModal = true
          that.$xy.vector.$emit("deviceNumber", info.data.devNo)
        }
      });
      dom.setOption(option);
    },
    openParam(info) {
      if (info.devNo) {
        this.$xy.vector.$emit("deviceNumber", info.devNo == '2-2' ? '2' : info.devNo)
        this.show = true
        this.paramModal = true
      }
    }
  }
}
</script>
<style>
.charts {

  height: 800px;
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
  margin-top: -31px;
  z-index: 999;
  position: relative;
}

.device_status {
  margin-top: -16px;
  z-index: 100;
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
