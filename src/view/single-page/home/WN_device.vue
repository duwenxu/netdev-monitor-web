<template>
  <div>
    <div ref="dom" class="charts"></div>
    <div class="legend">
      <div class="legend_status" v-for="(item, index) in legendType" :key="index">
        <span :class="[item.shape]"
              :style="{background: item.color, borderColor: item.borderColor}"></span>{{ item.description }}
      </div>
    </div>
    <Modal :closable="false" :styles="{marginTop:'-90px'}" v-model="paramModal"  @on-ok="confirm" @on-cancel="confirm"
           width="1000" :mask-closable="false">
      <div slot="header"><span>参数信息</span>    <Button style="float: right" size="small" @click="confirm">关闭</Button></div>
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
      nodes: [
        {
          x: '10',
          y: '500',
          nodeName: '',
          img: 'image://' + require('@/assets/images/home/wn_track.png'),
          size: [260, 200]
        },
//---------------舱外
        {
          mark: '舱外',
          x: '290',
          y: '520',
          nodeName: '舱外\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n',
          img: 'rect',
          color: 'white',
          border: 'dotted',
          id: 1,
          size: [200, 500],
        },

        {
          x: '250',
          y: '650',
          nodeName: 'ka发射\n\n\n\n\n\n\n\nKa接收',
          img: 'rect',
          size: [60, 220],
          color: '#c4e889'
        },
        {
          x: '250',
          y: '380',
          nodeName: 'ku发射\n\n\n\n\n\n\n\n\nKu接收',
          img: 'rect',
          size: [60, 220],
          color: '#c4e889'
        },
        {
          x: '365',
          y: '300',
          nodeName: 'LNA',
          img: 'triangle',
          symbolRotate: -90,
          size: [50, 70],
          color: '#c4e889'
        },
//---------------维修舱
        {
          mark: '维修舱',
          x: '565',
          y: '520',
          nodeName: '维修舱\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n',
          img: 'rect',
          color: 'white',
          border: 'dotted',
          id: 1,
          size: [250, 500],
        },

        {
          x: '570',
          y: '450',
          nodeName: '',
          id: 1,
          img: 'image://' + require('@/assets/images/home/down_trans_no.png'),
          size: [230, 120]
        },

        {
          x: '577',
          y: '494',
          devNo: 2,
          type: 1,//主机
          isMajor: true,
          nodeName: 'Ku buc       ',
          img: 'rect',
          size: [122, 38],
          color: 'rgba(0,150,136,0.2)'
        },
        {
          mark: 'ku buc 状态1 ',
          x: '625',
          y: '495',
          isMajor: false,
          type: 1,//主机
          devNo: 2,
          nodeName: '',
          img: 'circle',
          size: [20, 20],
          color: 'black'
        },
        {
          x: '577',
          y: '407',
          devNo: 2,
          type: 0,//备机
          isMajor: true,
          nodeName: 'Ku buc       ',
          img: 'rect',
          size: [122, 38],
          color: 'rgba(184,181,181,0.7)'
        },
        {
          mark: 'ku buc 状态2',
          x: '625',
          y: '410',
          isMajor: false,
          type: 0,//备机
          devNo: 2,
          nodeName: '',
          img: 'circle',
          size: [20, 20],
          color: 'black'
        },
        {
          x: '580',
          y: '300',
          nodeName: '',
          id: 1,
          img: 'image://' + require('@/assets/images/home/up_trans_no.png'),
          size: [200, 120]
        },
        {
          x: '581',
          y: '340',
          devNo: 40,
          isMajor: true,
          type: 1,//主机
          nodeName: '下变频器       ',
          img: 'rect',
          size: [105, 40],
          color: 'rgba(0,150,136,0.2)'
        },
        {
          mark: '下变频器1 状态',
          devNo: 40,
          type: 1,//主机
          isMajor: false,
          x: '620',
          y: '338',
          nodeName: '',
          img: 'circle',
          size: [20, 20],
          color: 'black'
        },
        {
          x: '580',
          y: '255',
          devNo: 41,
          isMajor: true,
          type: 0,//备机
          nodeName: '下变频器      ',
          img: 'rect',
          size: [105, 40],
          color: 'rgba(184,181,181,0.7)'
        },
        {
          mark: '下变频器2 状态',
          devNo: 41,
          isMajor: false,
          type: 0,//备机
          x: '620',
          y: '260',
          nodeName: '',
          img: 'circle',
          size: [20, 20],
          color: 'black'
        },
//---------------工作舱
        {
          mark: '工作舱',
          x: '1245',
          y: '374',
          nodeName: '工作舱\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n',
          img: 'rect',
          color: 'white',
          border: 'dotted',
          id: 1,
          size: [850, 750],
        },
        {
          x: '800',
          y: '470',
          nodeName: '中\n\n频\n\n单\n\n元',
          img: 'rect',
          size: [60, 520],
          color: 'rgba(227,221,152,0.8)'
        },

        {
          x: '1020',
          y: '660',
          nodeName: '调制解调器(1:1)\n\n\n\n\n\n\n\n\n',
          id: 1,
          img: 'rect',
          size: [160, 160],
          category: 1,
          color: 'rgba(227,221,152,0.8)'
        },
        {
          x: '1020',
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
          mark: 'A调制解调器1 状态',
          devNo: 11,
          isMajor: false,
          type: 1,//主机
          x: '1090',
          y: '700',
          nodeName: '',
          img: 'circle',
          size: [20, 20],
          color: 'black',
        },
        {
          x: '1020',
          y: '650',
          nodeName: '1:1转换单元',
          img: 'rect',
          size: [150, 30],
          color: 'white',
          category: 2
        },
        {
          x: '1020',
          y: '600',
          devNo: 12,
          isMajor: true,
          type: 0,//备机
          nodeName: '650调制解调器       ',
          img: 'rect',
          size: [150, 30],
          color: 'rgba(184,181,181,0.7)',
          category: 2
        },
        {
          mark: 'A调制解调器2 状态',
          devNo: 12,
          isMajor: false,
          type: 0,//备机
          x: '1090',
          y: '600',
          nodeName: '',
          img: 'circle',
          size: [20, 20],
          color: 'black'
        },
        {
          x: '1020',
          y: '450',
          nodeName: '调制解调器(1:1)\n\n\n\n\n\n\n\n\n',
          id: 1,
          img: 'rect',
          size: [160, 160],
          color: 'rgba(227,221,152,0.8)'
        },
        {
          x: '1020',
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
          mark: 'B调制解调器1 状态',
          devNo: 13,
          isMajor: false,
          type: 1,//主机
          x: '1090',
          y: '490',
          nodeName: '',
          img: 'circle',
          size: [20, 20],
          color: 'black'
        },
        {
          x: '1020',
          y: '440',
          nodeName: '1:1转换单元',
          img: 'rect',
          size: [150, 30],
          color: 'white',
          category: 2
        },
        {
          x: '1020',
          y: '390',
          devNo: 14,
          type: 0,//备机
          isMajor: true,
          nodeName: '650调制解调器       ',
          img: 'rect',
          size: [150, 30],
          color: 'rgba(184,181,181,0.7)',
          category: 2
        },
        {
          mark: 'B调制解调器2 状态',
          devNo: 14,
          isMajor: false,
          type: 0,//备机
          x: '1090',
          y: '390',
          nodeName: '',
          img: 'circle',
          size: [20, 20],
          color: 'black'
        },
        {
          x: '1020',
          y: '300',
          nodeName: '串口服务器',
          img: 'rect',
          size: [160, 50],
          color: 'rgba(227,221,152,0.8)',
          category: 2
        },
        {
          x: '1020',
          y: '210',
          nodeName: 'L频段跟踪接收机',
          img: 'rect',
          size: [160, 50],
          color: 'rgba(227,221,152,0.8)',
          category: 2
        },
        {
          x: '810',
          y: '60',
          nodeName: '天线驱动\n单元\n(ADU)',
          img: 'rect',
          size: [100, 110],
          color: 'rgba(227,221,152,0.8)',
          category: 2
        },
        {
          x: '1020',
          y: '60',
          devNo: 20,
          isMajor: true,
          nodeName: '天线控制\n单元\n(ACU)',
          img: 'rect',
          size: [100, 110],
          color: 'rgba(227,221,152,0.8)',
          category: 2
        },
        {
          mark: '天线控制 状态',
          devNo: 20,
          isMajor: false,
          x: '1020',
          y: '100',
          nodeName: '',
          img: 'circle',
          size: [20, 20],
          color: 'black'
        },
        {
          x: '1250',
          y: '620',
          nodeName: '路\n由\n器',
          img: 'rect',
          size: [60, 80],
          color: 'rgba(227,221,152,0.8)',
          category: 2
        },
        {
          x: '1250',
          y: '480',
          nodeName: '保\n密\n机',
          img: 'rect',
          size: [60, 80],
          color: 'rgba(227,221,152,0.8)',
          category: 2
        },
        {
          x: '1250',
          y: '340',
          nodeName: '防\n火\n墙',
          img: 'rect',
          size: [60, 80],
          color: 'rgba(227,221,152,0.8)',
          category: 2
        },
        {
          x: '1240',
          y: '200',
          nodeName: '接入交换机',
          img: 'rect',
          size: [100, 40],
          color: 'rgba(227,221,152,0.8)',
          category: 2
        },


        {
          x: '1370',
          y: '680',
          nodeName: '路\n由\n器',
          img: 'rect',
          size: [60, 80],
          color: 'rgba(227,221,152,0.8)',
          category: 2
        },
        {
          x: '1370',
          y: '510',
          nodeName: '保\n密\n机',
          img: 'rect',
          size: [60, 80],
          color: 'rgba(227,221,152,0.8)',
          category: 2
        },
        {
          x: '1370',
          y: '340',
          nodeName: '防\n火\n墙',
          img: 'rect',
          size: [60, 80],
          color: 'rgba(227,221,152,0.8)',
          category: 2
        },
        {
          x: '1400',
          y: '200',
          nodeName: '接入交换机',
          img: 'rect',
          size: [100, 40],
          color: 'rgba(227,221,152,0.8)',
          category: 2
        },

        {
          x: '1500',
          y: '680',
          nodeName: 'SDD设备',
          img: 'rect',
          size: [80, 60],
          color: 'rgba(227,221,152,0.8)',
          category: 2
        },
        {
          x: '1550',
          y: '270',
          nodeName: '',
          img: 'rect',
          size: [8, 500],
          color: 'rgb(78,147,177)',
          category: 2
        },
        {
          x: '1640',
          y: '500',
          nodeName: '指\n挥\n调\n度\n系\n统',
          img: 'rect',
          size: [50, 100],
          color: 'rgba(227,221,152,0.8)',
          category: 2
        },
        {
          x: '1640',
          y: '350',
          nodeName: '时\n间\n统\n一\n系\n统',
          img: 'rect',
          size: [50, 100],
          color: 'rgba(227,221,152,0.8)',
          category: 2
        },
        {
          x: '1640',
          y: '200',
          nodeName: '电\n话\n交\n换\n系\n统',
          img: 'rect',
          size: [50, 100],
          color: 'rgba(227,221,152,0.8)',
          category: 2
        },
        {
          x: '1400',
          y: '50',
          nodeName: '卫通站监控系统',
          img: 'rect',
          size: [120, 60],
          color: 'rgb(175,153,198)',
          category: 2
        },

        {
          x: '0',
          y: '120',
          nodeName: '配电及控保单元',
          img: 'rect',
          size: [160, 60],
          color: 'rgb(124,203,238)',
          category: 2
        },
        {
          x: '300',
          y: '120',
          nodeName: 'UPS',
          img: 'rect',
          size: [130, 60],
          color: 'rgb(124,203,238)',
          category: 2
        },
        {
          x: '300',
          y: '0',
          nodeName: '市电',
          img: 'rect',
          size: [60, 30],
          color: 'rgb(124,203,238)',
          category: 2
        },
        {
          x: '600',
          y: '120',
          nodeName: '油机',
          img: 'rect',
          size: [130, 60],
          color: 'rgb(124,203,238)',
          category: 2
        },
      ],
      equipments: [
        {
          devNo: '2',
          name: 'Ku 1:1热备份开关切换控制器',
          isInterrupt: '',
          workStatus: '',
          isAlarm: false,
          isUseStandby: false,
          masterOrSlave: '0'
        },
        {
          devNo: '11',
          name: 'A调制解调器1',
          isInterrupt: '',
          workStatus: '',
          isAlarm: false,
          isUseStandby: false,
          masterOrSlave: '0'
        },
        {
          devNo: '12',
          name: 'A调制解调器2',
          isInterrupt: '',
          workStatus: '',
          isAlarm: false,
          isUseStandby: false,
          masterOrSlave: '1'
        },
        {
          devNo: '13',
          name: 'B调制解调器1',
          isInterrupt: '',
          workStatus: '',
          isAlarm: false,
          isUseStandby: false,
          masterOrSlave: '0'
        },
        {
          devNo: '14',
          name: 'B调制解调器2',
          isInterrupt: '',
          workStatus: '',
          isAlarm: false,
          isUseStandby: false,
          masterOrSlave: '1'
        },
        {
          devNo: '20',
          name: '2.4m天线ACU',
          isInterrupt: '',
          workStatus: '',
          isAlarm: false,
          isUseStandby: false,
          masterOrSlave: '0'
        },
        {
          devNo: '40',
          name: '下变频器1',
          isInterrupt: '',
          workStatus: '',
          isAlarm: false,
          isUseStandby: false,
          masterOrSlave: '0'
        },
        {
          devNo: '41',
          name: '下变频器2',
          isInterrupt: '',
          workStatus: '',
          isAlarm: false,
          isUseStandby: false,
          masterOrSlave: '1'
        },
      ],
      legendType: [
        {shape: 'square', color: 'rgba(0,0,0,0)', borderColor: '#009688', description: '运行'},
        {shape: 'square', color: 'rgba(0,150,136,0.2)', description: '主机'},
        {shape: 'square', color: '#ccc', description: '备机'},
        {shape: 'circle', color: '#009688', description: '正常'},
        {shape: 'circle', color: '#ff1400', description: '故障'},
        {shape: 'circle', color: '#ffbe08', description: '告警'}
      ],
      number:'0',
    }
  },
  beforeDestroy() {
    off(window, 'resize', this.resize)
  },
  mounted() {
    // this.initTime()
    this.dom = echarts.init(this.$refs.dom);
    this.init(this.nodes, this.shineData)
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
    getWSData(WSdata) {
      if (WSdata.length) {
        WSdata.forEach(item => {
          this.nodes.forEach(device => {
            if (item.devNo == device.devNo) {
              this.setWSDate(item, device)
            }
          })
        })
        if(this.dom){
          this.dom.clear()
        }
        this.init(this.nodes,this.shineData)
      }
    },
    //主机type 1,备机0，对设备来说 isMajor为false的时候  改的是对应圆圈状态
    setWSDate(item, device) {
      if (!device.isMajor) {//是否 状态灯图形isMajor False为状态圆形\true 为背景方块
        if (item.isInterrupt === '0') {//是否中断 否0
          if (item.workStatus === '0') {//如果工作状态正常 0
            if (item.isAlarm === '1') {//告警为1  则告警
              if (item.devNo != 2) {
                let valIndex = this.shineData.findIndex((value) => value.devNo == item.devNo);
                if (valIndex == -1) {
                  this.shineData.push({devNo: item.devNo, value: [device.x, device.y, 22]})
                }
              }else {
                if (item.masterOrSlave === '0') {
                  if (device.type === 1) {//上面ku buc 设主
                    let valIndex = this.shineData.findIndex((value) => value.devNo == item.devNo && value.type == 1);
                    if (valIndex == -1) {
                      this.shineData.push({devNo: item.devNo, type: 1, value: [device.x, device.y, 22]})
                    }
                  } else {
                    let valIndex = this.shineData.findIndex((value) => value.devNo == item.devNo && value.type == 0);
                    if (valIndex == -1) {
                      this.shineData.push({devNo: item.devNo, type: 0, value: [device.x, device.y, 22]})
                    }
                  }
                }
              }
            } else {//告警为0  则状态为正常
              this.$set(device, 'color', '#009688')
            }
          } else {//不正常 则直接故障
            this.$set(device, 'color', '#ff1400')
          }
        } else {//中断 是 1
          this.$set(device, 'color', '#ff1400')
        }
      }

      if (item.masterOrSlave !== null && device.devNo != 20) {
        if (item.devNo == 2) {
          if (item.masterOrSlave === '0') {
            if (device.type === 1 && device.isMajor) {//上面ku buc 设主
              this.commonSetStatus(device)
            }
            if (device.type === 0 && !device.isMajor) {
              this.$set(device, 'color', 'black')
            }
          } else {
            if (device.type === 0 && device.isMajor) { //下面ku buc 设主
              this.commonSetStatus(device)
            }
            if (device.type === 1 && !device.isMajor) {
              this.$set(device, 'color', 'black')
            }
          }
        } else {
          console.log(item)
          if (item.masterOrSlave === '0') {
            if (device.isMajor) {
              this.commonSetStatus(device)
            }
          }
          else {
            if (device.isMajor) {
              this.$set(device, 'borderColor', '')
              this.$set(device, 'border', '')
            }
          }
          // if (((item.devDeployType === "0031002" && item.masterOrSlave === '0')
          //   || (item.devDeployType === "0031003" && item.masterOrSlave === '1'))  && device.isMajor) {
          //   this.commonSetStatus(device)
          // }
        }
      }
    },
    commonSetStatus(device) {
      this.$set(device, 'borderColor', '#009688')
      this.$set(device, 'border', 'solid')
    },
    resize() {
      this.dom.resize()
    },
    init(nodes, shineData) {
      var charts = {
        nodes: [],
        linesData: [
          {
            mark: '设备->ka',
            name: '',
            coords: [[90, 540], [200, 540]],
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
            mark: 'Ku->设备',
            name: '',
            coords: [[200, 450], [80, 450]],
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
            coords: [[290, 300], [320, 300]],
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
            coords: [[410, 300], [480, 300]],
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
            coords: [[440, 450], [290, 450]],
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
            coords: [[760, 450], [710, 450]],
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
            coords: [[680, 300], [760, 300]],
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
            coords: [[1560, 500], [1600, 500]],
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
            coords: [[1560, 350], [1600, 350]],
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
            coords: [[1560, 200], [1600, 200]],
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
            coords: [[1475, 50], [1540, 50]],
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
            coords: [[1550, 680], [1600, 680]],
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
            coords: [[1600, 680], [1550, 680]],
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
            coords: [[1410, 680], [1450, 680]],
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
            coords: [[1450, 680], [1410, 680]],
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
            coords: [[1370, 630], [1370, 560]],
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
            coords: [[1370, 560], [1370, 630]],
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
            coords: [[1370, 460], [1370, 390]],
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
            coords: [[1370, 390], [1370, 460]],
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
            coords: [[1465, 190], [1540, 190]],
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
            coords: [[1250, 570], [1250, 530]],
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
            coords: [[1250, 530], [1250, 570]],
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
            coords: [[1250, 430], [1250, 390]],
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
            coords: [[1250, 390], [1250, 430]],
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
            coords: [[1270, 220], [1350, 295]],
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
            coords: [[1350, 295], [1270, 220]],
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
            coords: [[1350, 220], [1270, 295]],
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
            coords: [[1270, 295], [1350, 220]],
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
            coords: [[840, 660], [920, 660]],
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
            coords: [[920, 640], [840, 640]],
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
            coords: [[840, 450], [920, 450]],
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
            coords: [[920, 430], [840, 430]],
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
            coords: [[840, 210], [920, 210]],
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
            coords: [[1020, 180], [1020, 125]],
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
            coords: [[870, 60], [960, 60]],
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
            coords: [[960, 60], [870, 60]],
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
            coords: [[1120, 660], [1210, 660]],
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
            coords: [[1210, 660], [1120, 660]],
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
            coords: [[1140, 630], [1140, 500]],
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
            coords: [[1180, 440], [1160, 440]],
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
            coords: [[1160, 430], [1160, 300]],
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
            coords: [[3, 160], [3, 210]],
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
            coords: [[20, 160], [20, 210]],
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
            coords: [[40, 160], [40, 210]],
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
            coords: [[5, 250], [5, 420]],
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
            coords: [[220, 120], [100, 120]],
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
            coords: [[520, 120], [380, 120]],
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
            coords: [[300, 20], [300, 80]],
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
            mark: '设备->Ku',
            name: '',
            coords: [[40, 440], [40, 300], [200, 300]],
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
            coords: [[1380, 295], [1390, 295], [1390, 220], [1380, 220]],
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
            coords: [[1380, 220], [1390, 220], [1390, 295], [1380, 295]],
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
            coords: [[1240, 220], [1250, 220], [1250, 295], [1240, 295]],
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
            coords: [[1240, 295], [1250, 295], [1250, 220], [1240, 220]],
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
            coords: [[1250, 170], [1250, 150], [1540, 150]],
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
            coords: [[1120, 280], [1140, 280], [1140, 110], [1540, 110]],
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
            coords: [[1540, 110], [1140, 110], [1140, 280], [1120, 280]],
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
            coords: [[1120, 650], [1140, 650], [1140, 320], [1120, 320]],
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
            coords: [[1120, 320], [1140, 320], [1140, 650], [1120, 650]],
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
            coords: [[1120, 300], [1160, 300], [1160, 430], [1120, 430]],
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
            coords: [[1120, 430], [1160, 430], [1160, 300], [1120, 300]],
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
            coords: [[1120, 440], [1180, 440], [1180, 630], [1210, 630]],
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
            coords: [[1210, 630], [1180, 630], [1180, 440], [1120, 440]],
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
        grid:{left:'6%'},
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
            type: "effectScatter",
            scaling: 1,
            z: 4,
            color: '#ffbe08',
            //该系列使用的坐标系
            coordinateSystem: "cartesian2d",
            symbolSize: function (val) {
              return val[2] * 0.8;
            },
            data: shineData,
            showEffectOn: "render",
            effectType: "ripple",
            rippleEffect: {
              period: 4,
              scale: 4,
              brushType: "stroke"
            }
          },
          {
            type: 'graph',
            z: 1,
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
.legend {
  //position: fixed;
  bottom: 10px;
  margin-left: 20px;
  display: flex;
  flex-direction: row;

  .legend_status {
    display: flex;
    flex-direction: row;
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
  position: absolute;
  span {
    display: inline-block;
    background: #ccc;
    height: 16px;
    width: 16px;
    border-radius: 50%;
  }
}

</style>
