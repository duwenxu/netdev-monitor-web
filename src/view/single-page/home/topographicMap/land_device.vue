<template>
  <div style="border: 1px solid red">
<!--    <template v-for="equipment in equipments">-->
<!--      <div class="device_status" :style="devicePosition(equipment)">-->
<!--        <span :style="judgeDeviceStatus(equipment)" :class="(equipment.isAlarm == '1' && equipment.isInterrupt == '0' && equipment.workStatus == '0')?'point-flicker':''"></span>-->
<!--      </div>-->
<!--      <div class="device_title" :style="masterStatus(equipment)" @click="openParam(equipment)"></div>-->
<!--    </template>-->
    <div ref="dom" class="charts"></div>
    <div class="legend">
      <div class="legend_status" v-for="(item, index) in legendType" :key="index">
        <span :class="[item.shape]"
              :style="{background: item.color, borderColor: item.borderColor}"></span>{{ item.description }}
      </div>
    </div>
    <Modal :closable="false" :styles="{marginTop:'-90px'}" v-model="paramModal" @on-ok="confirm" @on-cancel="confirm"
           width="800" :mask-closable="false">
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
import mixin from "_c/common/websocket";
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
          devNo: '36',
          name: '上变频器',
          isInterrupt: '0',
          workStatus: '0',
          isAlarm: '0',
          isUseStandby: false,
          masterOrSlave: '0'
        },
        {
          devNo: '32',
          name: '天线控制单元',
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
          masterOrSlave: '0'
        },
        {
          devNo: '40',
          name: '下变频器2',
          isInterrupt: '0',
          workStatus: '0',
          isAlarm: '0',
          isUseStandby: false,
          masterOrSlave: '1'
        },
      ],
      position: {
        '11': {
          mark: 'A调制解调器1',
          top: '117px',
          left: '910px',
        },
        '12': {
          mark: 'A调制解调器2',
          top: '205px',
          left: '910px',

        },
        '13': {
          mark: 'B调制解调器1',
          top: '322px',
          left: '910px',

        },
        '14': {
          mark: 'B调制解调器2',
          top: '408px',
          left: '910px',

        },
        '16': {
          mark: '400W高功放',
          top: '174px',
          left: '327px',

        },
        '30': {
          mark: '1:1转换开关（上）',
          top: '192px',
          left: '910px',
        },
        '31': {
          mark: '1:1转换开关（下）',
          top: '382px',
          left: '910px',
        },
        '32': {
          mark: '天线控制单元',
          top: '646px',
          left: '278px',
        },
        '36': {
          mark: '上变频器1',
          top: '148px',
          left: '547px',

        },
        '37': {
          mark: '上变频器2',
          top: '213px',
          left: '547px',

        },
        '24': {
          mark: '下变频器1',
          top: '362px',
          left: '545px',

        },
        '40': {
          mark: '下变频器2',
          top: '436px',
          left: '545px',

        },
      },
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
          top: '210px',
          left: '785px',
        },
        '13': {
          mark: 'B调制解调器1',
          border: '5px solid green',
          width: '152px',
          height: '32px',
          top: '326px',
          left: '785px',
        },
        '14': {
          mark: 'B调制解调器2',
          border: '5px solid green',
          width: '152px',
          height: '32px',
          top: '413px',
          left: '785px',
        },
        '30': {
          mark: '1:1（上）',
          border: '5px solid green',
          width: '152px',
          height: '32px',
          top: '197px',
          left: '785px',
        },
        '31': {
          mark: '1:1（下）',
          border: '5px solid green',
          width: '152px',
          height: '32px',
          top: '388px',
          left: '785px',
        },
        '16': {
          mark: '400W高功放',
          border: '',
          width: '135px',
          height: '62px',
          top: '178px',
          left: '218px',
        },
        '32': {
          mark: '天线控制单元',
          border: '',
          width: '142px',
          height: '58px',
          top: '645px',
          left: '216px',
        },
        '36': {
          mark: '上变频器1',
          border: '5px solid green',
          width: '110px',
          height: '42px',
          top: '148px',
          left: '463px',
        },
        '37': {
          mark: '上变频器2',
          border: '5px solid green',
          width: '110px',
          height: '42px',
          top: '214px',
          left: '463px',
        },
        '24': {
          mark: '下变频器1',
          border: '5px solid green',
          width: '110px',
          height: '42px',
          top: '361px',
          left: '458px',
        },
        '40': {
          mark: '下变频器2',
          border: '5px solid green',
          width: '110px',
          height: '42px',
          top: '439px',
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
      number: '0',
      screenWidth: document.documentElement.clientWidth,
    }
  },
  beforeDestroy() {
    off(window, 'resize', this.resize)
  },
  mounted() {
    // this.initTime()
    this.dom = echarts.init(this.$refs.dom);
    // this.$nextTick(() => {
    //   on(window, 'resize', this.resize)
    // })
    this.init()
  },
  // computed: {
  //   ...mapState({
  //     mediaWidthType: state => state.user.mediaWidthType
  //   }),
  // },
  methods: {
    getMediaWidth() {
      // this.$nextTick(() => {
      //   this.$xy.vector.$emit("siderTriggher", true)//收起菜单
      // })

      this.init()
    },
    confirm() {
      this.paramModal = false
      this.$xy.vector.$emit("closeModal")
    },
    initTime() {
      this.timer = setInterval(this.scrollAnimate, 2000);
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
            "devNo": "11",
            "devTypeCode": "8",
            "isAlarm": "0",
            "isInterrupt": "0",
            "isUseStandby": "1",
            "masterOrSlave": this.number,
            "stationId": null,
            "workStatus": "0"
          },

          {
            "devDeployType": "0031002",
            "devNo": "12",
            "devTypeCode": "8",
            "isAlarm": "0",
            "isInterrupt": "0",
            "isUseStandby": "1",
            "masterOrSlave": "0",
            "stationId": null,
            "workStatus": "0"
          },
          {
            "devDeployType": "0031003",
            "devNo": "13",
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
            "devNo": "35",
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
            "devNo": "14",
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
      }, 1000)
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
      if (device.noData) {//推送的数据中不存在当前设备状态
        info = {background: 'black'}
      }
      return info
    },
    devicePosition(equipment) {
      return {
        top: this.position[equipment.devNo].top,
        marginLeft: this.position[equipment.devNo].left,
        width: this.position[equipment.devNo].width,
        height: this.position[equipment.devNo].height,
      }
    },
    masterStatus(equipment) {
      // if(equipment.devNo !=30 && equipment.devNo !=31){
      return {
        zIndex: this.masterPosition[equipment.devNo].zIndex ? this.masterPosition[equipment.devNo].zIndex : 999,
        top: this.masterPosition[equipment.devNo].top,
        marginLeft: this.masterPosition[equipment.devNo].left,
        width: this.masterPosition[equipment.devNo].width,
        height: this.masterPosition[equipment.devNo].height,
        // border: this.masterPosition[equipment.devNo].border,
        border: equipment.masterOrSlave == '0' && (equipment.devNo != '32' && equipment.devNo != '16' && equipment.devNo !=30 && equipment.devNo !=31) ? this.masterPosition[equipment.devNo].border : '5px solid rgba(0,0,0,0)',
      }
      // }
    },
    resize() {
      this.dom.resize()
    },
    init() {
      let nodes = [
        {
          x: '490',
          y: '435',
          nodeName: '',
          img: 'rect',
          color: 'white',
          size: [1000, 745]
        },
        {
          x: '0',
          y: '500',
          nodeName: '',
          img: 'image://' + require('@/assets/images/home/antenna.png'),
          size: [100, 110]
        },
        {
          x: '90',
          y: '660',
          nodeName: 'Ka\n发射\n\n\n\n\n\nKa\n接收\n\n\n\n\nKa\n跟踪\n',
          img: 'rect',
          size: [30, 240],
          color: '#c4e889',
          border: 'black',
        },
        {
          x: '90',
          y: '410',
          nodeName: 'Ku\n接收\n\n\n\n\n\n\nKu\n发射\n\n',
          img: 'rect',
          size: [30, 160],
          color: '#c4e889',
          border: 'black',
        },
        //--------------天线中心体------------------------
        {
          x: '200',
          y: '765',
          nodeName: 'Ka频段\n100W功放\n\n\nKa频段\n100W功放',
          img: 'image://' + require('@/assets/images/home/down_trans.png'),
          size: [110, 80],
        },
        {
          x: '200',
          y: '660',
          nodeName: 'KaLNA    \n\n\n\nKaLNA   ',
          img: 'image://' + require('@/assets/images/home/tranigle_up.png'),
          size: [110, 80],
        },
        {
          x: '470',
          y: '765',
          nodeName: 'C-Ka\n上变频器\n\n\nC-Ka\n上变频器',
          img: 'image://' + require('@/assets/images/home/down_trans.png'),
          size: [110, 80],
        },
        {
          x: '470',
          y: '660',
          nodeName: 'Ka-C\n下变频器\n\n\nKa-C\n下变频器',
          img: 'image://' + require('@/assets/images/home/up_trans.png'),
          size: [110, 80],
        },
        {
          x: '200',
          y: '570',
          nodeName: 'Ka频段LNA    ',
          img: 'triangle',
          symbolRotate: -90,
          size: [45, 80],
          color: '#c4e889'
        },
        {
          x: '200',
          y: '480',
          nodeName: 'KuLNA    \n\n\n\nKuLNA   ',
          img: 'image://' + require('@/assets/images/home/tranigle_up.png'),
          size: [110, 80],
        },

        {
          x: '320',
          y: '660',
          nodeName: '耦合器',
          img: 'rect',
          size: [50, 30],
          color: '#c4e889',
          border: 'black',
        },
        {
          x: '340',
          y: '570',
          nodeName: '合成网络',
          img: 'rect',
          size: [60, 30],
          color: '#c4e889',
          border: 'black',
        },
        {
          x: '470',
          y: '570',
          nodeName: 'Ka-L下变频器',
          img: 'rect',
          size: [100, 30],
          color: '#c4e889',
          border: 'black',
        },


//-------------------------射频机房----------------------------
        {
          x: '460',
          y: '480',
          nodeName: 'Ku-L\n下变频器\n\n\nKu-L\n下变频器',
          img: 'image://' + require('@/assets/images/home/up_trans.png'),
          size: [110, 80],
        },
        {
          x: '200',
          y: '360',
          nodeName: 'Ku频段\n400W功放\n\n\nKu频段\n400W功放',
          img: 'image://' + require('@/assets/images/home/down_trans.png'),
          size: [110, 80],
        },
        {
          x: '380',
          y: '360',
          nodeName: 'L-Ku频段\n上变频器\n\n\nL-Ku频段\n上变频器',
          img: 'image://' + require('@/assets/images/home/down_trans.png'),
          size: [110, 80],
        },
        {
          x: '640',
          y: '765',
          nodeName: 'L-C\n上变频器\n\n\nL-C\n上变频器',
          img: 'image://' + require('@/assets/images/home/down_trans.png'),
          size: [110, 80],
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
          x: '640',
          y: '660',
          nodeName: 'C-L\n下变频器\n\n\nC-L\n下变频器',
          img: 'image://' + require('@/assets/images/home/up_trans.png'),
          size: [110, 80],
        },
        {
          x: '760',
          y: '760',
          nodeName: 'L频段\n中频光\n传输设备',
          img: 'rect',
          size: [60, 80],
          color: '#c4e889',
          border: 'black',
        },
        {
          x: '600',
          y: '480',
          nodeName: '功分器',
          img: 'rect',
          size: [60, 30],
          color: '#c4e889',
          border: 'black',
        },
        {
          x: '620',
          y: '420',
          nodeName: 'L频段跟踪接收机',
          img: 'rect',
          size: [100, 30],
          color: '#c4e889',
          border: 'black',
        },
        {
          x: '200',
          y: '220',
          nodeName: '六选一开关',
          img: 'rect',
          size: [80, 30],
          color: '#c4e889',
          border: 'black',
        },
        {
          x: '380',
          y: '280',
          nodeName: 'KaLNA切换单元',
          img: 'rect',
          size: [100, 30],
          color: '#c4e889',
          border: 'black',
        },
        {
          x: '380',
          y: '230',
          nodeName: 'KaLNA切换单元',
          img: 'rect',
          size: [100, 30],
          color: '#c4e889',
          border: 'black',
        },
        {
          x: '340',
          y: '170',
          nodeName: '天线驱动单元\n（ADU）',
          img: 'rect',
          size: [80, 30],
          color: '#c4e889',
          border: 'black',
        },
        {
          x: '380',
          y: '130',
          nodeName: '轴角编码单元\n（PDU）',
          img: 'rect',
          size: [80, 30],
          color: '#c4e889',
          border: 'black',
        },
        {
          x: '420',
          y: '90',
          nodeName: '轴角编码单元\n（PCU）',
          img: 'rect',
          size: [80, 30],
          color: '#c4e889',
          border: 'black',
        },
        {
          x: '200',
          y: '20',
          nodeName: '供电',
          img: 'rect',
          size: [120, 30],
          color: '#c4e889',
          border: 'black',
        },
        {
          x: '540',
          y: '130',
          nodeName: '天线控制\n单元\n（ACU）',
          img: 'rect',
          size: [60, 150],
          color: '#c4e889',
          border: 'black',
        },




      ]
      var charts = {
        nodes: [],
        dottedLines:[
          {
            mark: '天线中心体线框',
            name: '',
            coords: [[120, 820], [540, 820],[120, 820], [120, 430],[120, 430], [380, 430],[380, 430], [380, 540],[540,540],[540,820]],
            lineStyle: {
              normal: {
                color: '#c670de'
              }
            }
          },

          // {
          //   mark: '射频机房',
          //   name: '',
          //   coords: [],
          //   lineStyle: {
          //     normal: {
          //       color: '#c670de'
          //     }
          //   }
          // },

        ],
        linesData: [

          {
            mark: '设备->低噪声放大器',
            name: '',
            coords: [[70, 655], [185, 655]],
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
      // this.dom.clear()
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
        grid: {left: '40',right:'15',bottom:'0',top:'0'},
        xAxis: {
          min: 0,
          max: 1000,
          show: false,
          type: 'value'
        },
        yAxis: {
          min: 0,
          max: 870,
          show: false,
          type: 'value'
        },
        series: [
          {
            type: "lines",
            symbol: ['none', 'none'],
            z: 4,
            symbolSize: 10,
            polyline: true,
            coordinateSystem: "cartesian2d",
            label: {
              show: true,
              position: 'middle',
            },
            lineStyle: {
              type: [5, 10],
              dashOffset: 5,
              color: 'green',
              width: 1.5,
              opacity: 1,
              curveness: 0
            },
            // effect: {
            //   show: true,
            //   trailLength: 0.1,
            //   symbol: 'arrow',
            //   color: '#87e2ef',
            //   symbolSize: 6
            // },
            data: charts.dottedLines
          },




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
              fontSize: 12,
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
  border: 1px solid red;
  height: 750px;
  width: 1000px;

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
  margin-top: 50px;
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
  margin-top: -30px;
  z-index: 999;
  position: relative;
}

.device_status {
  margin-top: -30px;
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
