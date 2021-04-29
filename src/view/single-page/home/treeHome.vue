<template>
  <div ref="dom" class="charts"></div>
</template>

<script>
import * as echarts from 'echarts'
import {on, off} from '@/libs/tools'

// echarts.registerTheme('tdTheme');
export default {
  data() {
    return {
      dom: null
    }
  },
  beforeDestroy() {
    off(window, 'resize', this.resize)
  },
  mounted() {
    this.dom = echarts.init(this.$refs.dom);
    this.init()
  },
  methods: {
    resize() {
      this.dom.resize()
    },
    init() {
      var nodes = [
        {
          x: '70',
          y: '760',
          nodeName: '',
          img: 'image://' + require('@/assets/images/home/track.png'),
          size: [320,200]
        },
        {
          x: '250',
          y: '1000',
          nodeName: 'ka发射\n\n\n\n\n\n\n\n\n\nKa接收',
          img: 'rect',
          size: [60, 245],
          color: 'rgb(228,225,192)'
        },
        {
          x: '250',
          y: '500',
          nodeName: 'ku发射\n\n\n\n\n\n\n\nKu接收',
          img: 'rect',
          size: [60, 245],
          color: 'rgb(228,225,192)'
        },
        //---------------------------------天线座
        {
          mark:'天线座',
          x: '500',
          y: '1000',
          nodeName: '天线座\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n',
          img: 'rect',
          color:'white',
          border:'dotted',
          id:1,
          size: [340, 300],
        },
        {
          x: '470',
          y: '1130',
          nodeName: 'ka发射机',
          img: 'rect',
          size: [90, 60],
          color: '#c4e889'
        },
        {
          x: '410',
          y: '880',
          nodeName: 'LNA',
          img: 'triangle',
          symbolRotate: -90,
          size: [60, 90],
          color: '#c4e889'
        },
        //Ka-C下变频器
        {
          x: '600',
          y: '880',
          nodeName: 'Ka-C \n下变频器 \n\n\n\nKa-C \n下变频器',
          img: 'image://' + require('@/assets/images/home/up_trans_no.png'),
          size: [180, 110]
        },
//----------------------------维修仓
        {
          mark:'维修仓',
          x: '500',
          y: '600',
          nodeName: '',
          img: 'rect',
          color:'white',
          border:'dotted',
          id:1,
          size: [340, 120],
        },
        {
          x: '470',
          y: '600',
          nodeName: 'Ku  发射机  \n\n\n\n\nKu  发射机',
          img: 'image://' + require('@/assets/images/home/down_trans_no.png'),
          size: [180, 110]
        },



        //---------------------------------天线座 下
        {
          mark:'天线座',
          x: '500',
          y: '290',
          nodeName: '天线座\n\n\n\n\n\n\n\n\n\n\n\n',
          img: 'rect',
          color:'white',
          border:'dotted',
          id:1,
          size: [340, 200],
        },

        {
          x: '470',
          y: '400',
          nodeName: 'LNA',
          img: 'triangle',
          symbolRotate: -90,
          size: [60, 90],
          color: '#c4e889'
        },
        {
          x: '480',
          y: '200',
          nodeName: '天线驱动单元',
          img: 'rect',
          size: [180, 50],
          color: 'rgb(202,196,185)'
        },



//--------------------------------卫通信道分系统
        {
          mark:'卫通信道分系统',
          x: '1020',
          y: '690',
          nodeName: '天线座\n\n\n\n\n\n\n\n\n\n\n\n',
          img: 'rect',
          color:'white',
          border:'dotted',
          id:1,
          size: [640, 645],
        },
        //L-Ku 上变频器
        {
          x: '850',
          y: '600',
          nodeName: 'L-Ku \n上变频器 \n\n\n\nL-Ku \n上变频器',
          img: 'image://' + require('@/assets/images/home/down_trans.png'),
          size: [180, 110]
        },
        //L-Ku 下变频器

        {
          x: '850',
          y: '400',
          nodeName: 'Ku-L \n下变频器 \n\n\n\nKu-L \n下变频器',
          img: 'image://' + require('@/assets/images/home/up_trans_no.png'),
          size: [180, 110]
        },
        //C-L 下变频器
        {
          x: '850',
          y: '880',
          nodeName: 'C-L \n下变频器 \n\n\n\nC-L \n下变频器',
          img: 'image://' + require('@/assets/images/home/up_trans.png'),
          size: [180, 110]
        },
        //L-C上变频器
        {
          x: '850',
          y: '1130',
          nodeName: 'L-C \n上变频器 \n\n\n\nL-C \n上变频器',
          img: 'image://' + require('@/assets/images/home/down_trans.png'),
          size: [180, 110]
        },

        {
          x: '850',
          y: '200',
          nodeName: '天线控制单元',
          img: 'rect',
          size: [180, 60],
          color: 'rgb(202,196,185)'
        },
        {
          x: '1050',
          y: '750',
          nodeName: 'L\n\n波\n\n段\n\n中\n\n频\n\n矩\n\n阵\n',
          img: 'rect',
          size: [60, 520],
          color: '#c4e889'
        },

        {
          x: '1250',
          y: '1040',
          nodeName: '调制解调器(1:1)\n\n\n\n\n\n\n\n\n\n\n\n\n\n',
          id: 1,
          img: 'rect',
          size: [160, 220],
          category: 1,
          color: 'rgb(214,188,169)'
        },
        {
          x: '1250',
          y: '1160',
          nodeName: '2300调制解调器',
          img: 'rect',
          size: [120, 30],
          color: 'white',
          category: 2
        },
        {
          x: '1250',
          y: '1030',
          nodeName: '1:1转换单元',
          img: 'rect',
          size: [120, 30],
          color: 'white',
          category: 2
        },
        {
          x: '1250',
          y: '900',
          nodeName: '2300调制解调器',
          img: 'rect',
          size: [120, 30],
          color: 'white',
          category: 2
        },
        {
          x: '1250',
          y: '570',
          nodeName: '调制解调器(1:1)\n\n\n\n\n\n\n\n\n\n\n\n\n\n',
          id: 1,
          img: 'rect',
          size: [160, 220],
          color: 'rgb(214,188,169)'
        },
        {
          x: '1250',
          y: '690',
          nodeName: '2300调制解调器',
          img: 'rect',
          size: [120, 30],
          color: 'white',
          category: 2
        },
        {
          x: '1250',
          y: '570',
          nodeName: '1:1转换单元',
          img: 'rect',
          size: [120, 30],
          color: 'white',
          category: 2
        },
        {
          x: '1250',
          y: '430',
          nodeName: '2300调制解调器',
          img: 'rect',
          size: [120, 30],
          color: 'white',
          category: 2
        },
        {
          x: '1250',
          y: '230',
          nodeName: 'L频段跟踪接收机',
          img: 'rect',
          size: [160, 120],
          color: 'rgb(206,215,209)'
        },
//--------------------------------业务承载网分系统
        {
          mark:'业务承载网分系统',
          x: '1550',
          y: '710',
          nodeName: '业务承载网分系统\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n',
          img: 'rect',
          color:'white',
          border:'dotted',
          id:1,
          size: [330, 650],
        },
        {
          mark:'信息安全分系统',
          x: '1550',
          y: '700',
          nodeName: '\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n信息安全分系统',
          img: 'rect',
          color:'white',
          border:'dotted',
          id:1,
          size: [160, 450],
        },
        {
          mark:'路由器2',
          x: '1420',
          y: '750',
          nodeName: '路\n\n由\n\n器\n\n2',
          img: 'rect',
          size: [40, 500],
        },
        {
          mark:'保密机2',
          x: '1510',
          y: '750',
          nodeName: '保\n\n密\n\n机\n\n2',
          img: 'rect',
          size: [40, 350],
        },
        {
          mark:'多功能网络防护设备',
          x: '1590',
          y: '750',
          nodeName: '多\n功\n能\n网\n络\n防\n护\n设\n备',
          img: 'rect',
          size: [40, 350],
        },

        {
          mark:'接入交换机2',
          x: '1680',
          y: '940',
          nodeName: '接\n入\n交\n换\n机\n2',
          img: 'rect',
          size: [40, 290],
        },
        {
          mark:'接入交换机2',
          x: '1680',
          y: '400',
          nodeName: '接\n入\n交\n换\n机\n2\n（备）',
          img: 'rect',
          size: [40, 270],
        },
        //------------------------时间统一分系统
        {
          mark:'时间统一分系统',
          x: '2040',
          y: '1170',
          nodeName: '时间统一分系统\n\n\n\n\n\n\n',
          img: 'rect',
          color:'white',
          border:'dotted',
          id:1,
          size: [550, 150],
        },
        {
          mark:'时间统一设备',
          x: '1880',
          y: '1140',
          nodeName: '时间统一设备',
          img: 'rect',
          size: [150, 110],
        },

        {
          mark:'B（AC）,B（DC）',
          x: '2150',
          y: '1180',
          nodeName: 'B（AC）,B（DC）',
          img: 'rect',
          size: [150, 20],
        },
        {
          mark:'',
          x: '2150',
          y: '1140',
          nodeName: '10M,5M',
          img: 'rect',
          size: [150, 20],
        },
        {
          mark:'',
          x: '2150',
          y: '1100',
          nodeName: '北斗/GPS天线',
          img: 'rect',
          size: [150, 20],
        },
        {
          mark:'',
          x: '2150',
          y: '1060',
          nodeName: '长波天线',
          img: 'rect',
          size: [150, 20],
        },
        //------------------------通信业务分系统
        {
          mark:'通信业务分系统',
          x: '2040',
          y: '855',
          nodeName: '                                                                                                           通信业务分系统\n\n\n\n\n\n\n\n\n\n\n\n',
          img: 'rect',
          color:'white',
          border:'dotted',
          id:1,
          size: [550, 202],
        },
        {
          mark:'',
          x: '1840',
          y: '980',
          nodeName: '通信业务服务器',
          img: 'rect',
          size: [150, 20],
        },
        {
          mark:'',
          x: '2050',
          y: '980',
          nodeName: '普通电话X10',
          img: 'rect',
          size: [150, 20],
        },
        {
          mark:'',
          x: '2050',
          y: '940',
          nodeName: '高标清视频编码X4',
          img: 'rect',
          size: [150, 20],
        },
        {
          mark:'',
          x: '2250',
          y: '940',
          nodeName: '光学图像X3+X1',
          img: 'rect',
          size: [120, 20],
        },


        {
          mark:'',
          x: '2050',
          y: '900',
          nodeName: '多格式视频编码X2',
          img: 'rect',
          size: [150, 20],
        },
        {
          mark:'',
          x: '2250',
          y: '900',
          nodeName: '视频切换设备',
          img: 'rect',
          size: [120, 20],
        },


        {
          mark:'',
          x: '2050',
          y: '820',
          nodeName: 'IP电话单机X4',
          img: 'rect',
          size: [150, 20],
        },
        {
          mark:'',
          x: '2250',
          y: '820',
          nodeName: '显示器X2',
          img: 'rect',
          size: [120, 20],
        },


        {
          mark:'',
          x: '1840',
          y: '940',
          nodeName: 'IP调度单机X10',
          img: 'rect',
          size: [150, 20],
        },
        {
          mark:'',
          x: '1840',
          y: '900',
          nodeName: '高清网络摄像机X3',
          img: 'rect',
          size: [150, 20],
        },
        {
          mark:'',
          x: '1840',
          y: '860',
          nodeName: '操作维护终端X2',
          img: 'rect',
          size: [150, 20],
        },
        {
          mark:'',
          x: '1840',
          y: '820',
          nodeName: 'IP语音网关',
          img: 'rect',
          size: [150, 20],
        },
        {
          mark:'',
          x: '1840',
          y: '780',
          nodeName: 'IP语音网关',
          img: 'rect',
          size: [150, 20],
        },
        {
          mark:'',
          x: '1840',
          y: '740',
          nodeName: '会商终端',
          img: 'rect',
          size: [150, 20],
        },
        {
          mark:'',
          x: '1840',
          y: '700',
          nodeName: '录音录像服务器',
          img: 'rect',
          size: [150, 20],
        },

        //------------------------业务承载网分系统
        {
          mark:'业务承载网分系统',
          x: '2040',
          y: '625',
          nodeName: '业务承载网分系统\n\n',
          img: 'rect',
          color:'white',
          border:'dotted',
          id:1,
          size: [550, 50],
        },
        {
          mark:'',
          x: '1840',
          y: '620',
          nodeName: '网络测试设备',
          img: 'rect',
          size: [150, 20],
        },

        //------------------------信息安全分系统
        {
          mark:'信息安全分系统',
          x: '2040',
          y: '480',
          nodeName: '信息安全分系统\n\n\n\n\n',
          img: 'rect',
          color:'white',
          border:'dotted',
          id:1,
          size: [550, 110],
        },
        {
          mark:'',
          x: '1840',
          y: '540',
          nodeName: '指纹仪、TF卡X10',
          img: 'rect',
          size: [150, 20],
        },
        {
          mark:'',
          x: '1840',
          y: '500',
          nodeName: '安全运维终端',
          img: 'rect',
          size: [150, 20],
        },
        {
          mark:'',
          x: '1840',
          y: '460',
          nodeName: '安全网管服务器',
          img: 'rect',
          size: [150, 20],
        },
        {
          mark:'',
          x: '1840',
          y: '420',
          nodeName: '操作管理平台',
          img: 'rect',
          size: [150, 20],
        },
        //------------------------通信网络管理分系统
        {
          mark:'通信网络管理分系统',
          x: '2040',
          y: '270',
          nodeName: '通信网络管理分系统\n\n\n\n\n',
          img: 'rect',
          color:'white',
          border:'dotted',
          id:1,
          size: [550, 110],
        },
        {
          mark:'',
          x: '1840',
          y: '320',
          nodeName: '通信网管服务器',
          img: 'rect',
          size: [150, 20],
        },
        {
          mark:'',
          x: '1840',
          y: '280',
          nodeName: '串口服务器',
          img: 'rect',
          size: [150, 20],
        },
        {
          mark:'',
          x: '2100',
          y: '280',
          nodeName: '串口设备监控信息',
          img: 'rect',
          size: [150, 20],
        },
        {
          mark:'',
          x: '1840',
          y: '240',
          nodeName: '通信网管客户机',
          img: 'rect',
          size: [150, 20],
        },
        {
          mark:'',
          x: '1840',
          y: '200',
          nodeName: '其它设备监控信息',
          img: 'rect',
          size: [150, 20],
        },


        //------------------------供电分系统
        {
          mark:'供电分系统',
          x: '1970',
          y: '10',
          nodeName: '\n\n\n\n\n\n\n供电分系统',
          img: 'rect',
          color:'white',
          border:'dotted',
          id:1,
          size: [700, 130],
        },
        {
          mark:'',
          x: '1720',
          y: '80',
          nodeName: '配电及控保单元',
          img: 'rect',
          size: [160, 50],
        },
        {
          mark:'',
          x: '1950',
          y: '80',
          nodeName: 'UPS',
          img: 'rect',
          size: [160, 50],
        },
        {
          mark:'',
          x: '1950',
          y: '-40',
          nodeName: '市电',
          img: 'rect',
          size: [160, 30],
        },

        {
          mark:'',
          x: '2200',
          y: '80',
          nodeName: '1:1油机',
          img: 'rect',
          size: [160, 50],
        },
        {
          x: '330',
          y: '680',
          nodeName: '维修仓',
          size: 0
        }
      ]
      var charts = {
        nodes: [],
        linesData: [
          //一段式连线天线驱动单元ADU->设备
          {
            mark: '设备->天线驱动单元',
            name: '',
            coords: [ [50, 720],[50, 210], [370, 210]],
            lineStyle: {
              normal: {
                color: '#020202'
              }
            }
          },

          {
            mark: '天线驱动单元ADU->设备',
            name: '',
            coords: [[370, 190], [0, 190], [0, 720]],
            lineStyle: {
              normal: {
                color: '#020202'
              }
            }
          },

          {
            mark: '天线驱动单元ADU->天线控制单元acu',
            name: '',
            coords: [[590, 210], [740, 210]],
            lineStyle: {
              normal: {
                color: '#020202'
              }
            }
          },
          {
            mark: '天线控制单元acu->天线驱动单元ADU',
            name: '',
            coords: [[740, 190], [590, 190]],
            lineStyle: {
              normal: {
                color: '#020202'
              }
            }
          },

          //----------------------------上行------------
          {
            mark: 'KU发射接收->设备',
            coords: [[200, 600], [120, 600],[120,680]],
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
            coords: [[200, 1130], [70, 1130], [70, 850]],
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
            mark: 'Ka到ka发射接收',
            name: 'LHCP',
            coords: [[410, 1130], [300, 1130]],
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
            mark: 'ku发射机 到ku发射接收',
            name: '',
            coords: [[375, 600], [290, 600]],
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
            mark: 'lc上变频器-》ka发射机',
            name: '',
            coords: [[760, 1130], [530, 1130]],
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
            mark: 'l ku上变频器->ku 发射机',
            name: '',
            coords: [[760, 600], [570, 600]],
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
            mark: 'L波段中频矩阵 上行->L-c上变频器',
            name: '',
            coords: [[1010, 1130], [950, 1130]],
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
            mark: 'L波段中频矩阵 上行->L-ku 上变频器',
            name: '',
            coords: [[1010, 600], [950, 600]],
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
            mark: 'L波段中频矩阵  - 》调制解调器 上',
            name: '',
            coords: [[1085, 880], [1160, 880]],
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
            mark: 'L波段中频矩阵  - 》路由器2',
            name: '',
            coords: [[1340, 880], [1390, 880]],
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
            mark: 'L波段中频矩阵  - 》调制解调器 下',
            name: '',
            coords: [[1085, 400], [1160, 400]],
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
            mark: '调制解调器 下-》路由器2',
            name: '',
            coords: [[1340, 400], [1390, 400]],
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
            mark: '路由器2 -》保密机-》路由器2',
            name: '',
            coords: [[1440, 800], [1490, 800]],
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
            mark: '保密机-》多功能',
            name: '',
            coords: [[1530, 800], [1570, 800]],
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
            mark: '多功能-》接入交换机 主',
            name: '',
            coords: [[1610, 1000], [1660, 1000]],
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
            mark: '多功能-》接入交换机 备用',
            name: '',
            coords: [[1610, 500], [1660, 500]],
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
            mark: '接入交换机 主用 - 》多功能-》',
            name: '',
            coords: [[1690, 640], [1690, 700]],
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
            mark: 'L波段中频矩阵  - 》L频段跟踪接收机',
            name: '',
            coords: [[1085, 300], [1160, 300]],
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
            mark: 'L波段中频矩阵  - 》天线控制单元',
            name: '',
            coords: [[950, 220], [1150, 220]],
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
            mark: '天线控制单元 - 》L波段中频矩阵  - 》',
            name: '',
            coords: [[1150, 190], [950, 190]],
            lineStyle: {
              normal: {
                color: '#143fdc'
              }
            },
            effect: {
              color: '#143fdc'
            }
          },
          //----------------------------下行----------------------
          {
            mark: '设备->KA发射接收',
            name: '',
            coords: [[120,840],[120, 880], [200, 880]],
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
            mark: '设备->KU发射接收',
            coords: [[70, 700], [70, 400], [210, 400]],
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
            mark: 'ka发射接收到Ka lwa',
            name: 'RHCP',
            coords: [[300, 880], [350, 880]],
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
            mark: 'ku-》ku lwa',
            name: '',
            coords: [[300, 400], [410, 400]],
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
            mark: 'ka lwa ->ka-c下变频器',
            name: '',
            coords: [[470, 880], [500, 880]],
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
            mark: 'ku lwa -> ku-l下变频器',
            name: '',
            coords: [[530, 400], [750, 400]],
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
            mark: ' ku-l下变频器 -》L波段中频矩阵下行',
            name: '',
            coords: [[950, 400], [1010, 400]],
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
            mark: 'ka c下变频器->cl下变频器',
            name: '',
            coords: [[700, 880], [750, 880]],
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
            mark: 'c-l-》l波段中频',
            name: '',
            coords: [[950, 880], [1010, 880]],
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
            mark: '调制解调器 上-》L波段中频矩阵',
            name: '',
            coords: [[1160, 1130], [1085, 1130]],
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
            mark: '路由器2 -》调制解调器上',
            name: '',
            coords: [[1390, 1130], [1340, 1130]],
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
            mark: '调制解调器 下-》L波段中频矩阵 ',
            name: '',
            coords: [[1160, 600], [1085, 600]],
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
            mark: '路由器2 - 》调制解调器 下-》',
            name: '',
            coords: [[1390, 600], [1340, 600]],
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
            mark: '保密机=》路由器2-》保密机-》',
            name: '',
            coords: [[1490, 700], [1440, 700]],
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
            mark: '多功能=》保密机-》-》',
            name: '',
            coords: [[1570, 700], [1530, 700]],
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
            mark: '接入交换机 备用 - 》多功能-》',
            name: '',
            coords: [[1660, 550], [1610, 550]],
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
            mark: '接入交换机 主用 - 》多功能-》',
            name: '',
            coords: [[1660, 950], [1610, 950]],
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
            mark: '接入交换机 主用 - 》多功能-》',
            name: '',
            coords: [[1670, 700], [1670, 640]],
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
            mark: '时间统一设备 - 》主交换机-》',
            name: '',
            coords: [[1800, 1140], [1700, 1140]],
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
            mark: '时间统一设备 - 》BAC BDC',
            name: '',
            coords: [[1960, 1180], [2070, 1180]],
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
            mark: '时间统一设备 - 》10M 5M',
            name: '',
            coords: [[1960, 1140], [2070, 1140]],
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
            mark: '北斗-》时间统一设备',
            name: '',
            coords: [[2070, 1100], [2030, 1100],[2030, 1080],[1960, 1080]],
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
            mark: '北斗-》时间统一设备',
            name: '',
            coords: [[2070, 1060], [2030, 1060],[2030, 1080],[1960, 1080]],
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
            mark: '接入交换机-》通信分系统',
            name: '',
            coords: [[1700,980],[1760,980]],
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
            mark: '接入交换机-》通信分系统',
            name: '',
            coords: [[1760,980],[1700,980]],
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
            mark: '接入交换机-》通信分系统',
            name: '',
            coords: [[1700,940],[1760,940]],
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
            mark: '接入交换机-》通信分系统',
            name: '',
            coords: [[1760,940],[1700,940]],
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
            mark: '接入交换机-》通信分系统',
            name: '',
            coords: [[1700,900],[1760,900]],
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
            mark: '接入交换机-》通信分系统',
            name: '',
            coords: [[1760,900],[1700,900]],
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
            mark: '接入交换机-》通信分系统',
            name: '',
            coords: [[1700,860],[1760,860]],
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
            mark: '接入交换机-》通信分系统',
            name: '',
            coords: [[1760,860],[1700,860]],
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
            mark: '接入交换机-》通信分系统',
            name: '',
            coords: [[1700,820],[1760,820]],
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
            mark: '接入交换机-》通信分系统',
            name: '',
            coords: [[1760,820],[1700,820]],
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
            mark: '接入交换机-》通信分系统',
            name: '',
            coords: [[1700,780],[1760,780]],
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
            mark: '接入交换机-》通信分系统',
            name: '',
            coords: [[1760,780],[1700,780]],
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
            mark: '接入交换机-》通信分系统',
            name: '',
            coords: [[1700,740],[1760,740]],
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
            mark: '接入交换机-》通信分系统',
            name: '',
            coords: [[1760,740],[1700,740]],
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
            mark: '接入交换机-》通信分系统',
            name: '',
            coords: [[1700,700],[1760,700]],
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
            mark: '接入交换机-》通信分系统',
            name: '',
            coords: [[1760,700],[1700,700]],
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
            mark: '接入交换机-》通信分系统',
            name: '',
            coords: [[1920,980],[1945,980],[1945,940],[1970,940]],
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
            mark: '接入交换机-》通信分系统',
            name: '',
            coords: [[1920,980],[1945,980],[1945,900],[1970,900]],
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
            mark: '接入交换机-》通信分系统',
            name: '',
            coords: [[1920,980],[1970,980]],
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
            mark: '接入交换机-》通信分系统',
            name: '',
            coords: [[1970,980],[1920,980]],
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
            mark: '接入交换机-》通信分系统',
            name: '',
            coords: [[1920,820],[1970,820]],
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
            mark: '接入交换机-》通信分系统',
            name: '',
            coords: [[1970,820],[1920,820]],
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
            mark: '光学图像-》高标清视频',
            name: '',
            coords: [[2190,940],[2130,940]],
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
            mark: '视频切换-》多格式视频',
            name: '',
            coords: [[2130,900],[2190,900]],
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
            mark: '视频切换-》多格式视频',
            name: '',
            coords: [[2190,900],[2130,900]],
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
            mark: '视频切换-》多格式视频',
            name: '',
            coords: [[2200,880],[2200,830]],
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
            mark: '视频切换-》多格式视频',
            name: '',
            coords: [[2200,830],[2200,880]],
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
            mark: '视频切换-》多格式视频',
            name: '',
            coords: [[1760,620],[1700,620]],
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
            mark: '视频切换-》多格式视频',
            name: '',
            coords: [[1700,620],[1760,620]],
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
            mark: '交换机备用-》信息安全分系统',
            name: '',
            coords: [[1760,540],[1700,540]],
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
            mark: '交换机备用-》信息安全分系统',
            name: '',
            coords: [[1700,540],[1760,540]],
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
            mark: '交换机备用-》信息安全分系统',
            name: '',
            coords: [[1760,500],[1700,500]],
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
            mark: '交换机备用-》信息安全分系统',
            name: '',
            coords: [[1700,500],[1760,500]],
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
            mark: '交换机备用-》信息安全分系统',
            name: '',
            coords: [[1760,460],[1700,460]],
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
            mark: '交换机备用-》信息安全分系统',
            name: '',
            coords: [[1700,460],[1760,460]],
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
            mark: '交换机备用-》信息安全分系统',
            name: '',
            coords: [[1760,420],[1700,420]],
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
            mark: '交换机备用-》信息安全分系统',
            name: '',
            coords: [[1700,420],[1760,420]],
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
            mark: '交换机备用-》通信网络管理分系统',
            name: '',
            coords: [[1760,320],[1700,320]],
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
            mark: '交换机备用-》通信网络管理分系统',
            name: '',
            coords: [[1700,320],[1760,320]],
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
            mark: '交换机备用-》通信网络管理分系统',
            name: '',
            coords: [[1760,280],[1700,280]],
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
            mark: '交换机备用-》通信网络管理分系统',
            name: '',
            coords: [[1700,280],[1760,280]],
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
            mark: '交换机备用-》通信网络管理分系统',
            name: '',
            coords: [[1760,240],[1700,240]],
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
            mark: '交换机备用-》通信网络管理分系统',
            name: '',
            coords: [[1700,240],[1760,240]],
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
            mark: '交换机备用-》通信网络管理分系统',
            name: '',
            coords: [[1760,200],[1700,200]],
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
            mark: '交换机备用-》通信网络管理分系统',
            name: '',
            coords: [[1700,200],[1760,200]],
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
            mark: '交换机备用-》通信网络管理分系统',
            name: '',
            coords: [[1920,280],[2020,280]],
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
            mark: '市电-》UPS',
            name: '222222222222222222222',
            coords: [[1950,0],[1950,40]],
            lineStyle: {
              normal: {
                color: '#143fdc'
              }
            },
            effect: {
              color: '#143fdc'
            }
          },
        ]
      }
      for (var j = 0; j < nodes.length; j++) {
        var x = parseInt(nodes[j].x)
        var y = parseInt(nodes[j].y)
        var node = {
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
        if(nodes[j].border){
          node.itemStyle.normal.borderType = nodes[j].border
          node.itemStyle.normal.borderDashOffset = nodes[j].offset
          node.itemStyle.normal.borderColor = 'grey'
        }

        charts.nodes.push(node)
      }
      var option = {
        grid: {
          left: '3%',
          right: '8%',

        },
        xAxis: {
          min: 0,
          max:2210,
          show: false,
          type: 'value'
        },
        yAxis: {
          min: 0,
          max:1300,
          show: false,
          type: 'value'
        },
        series: [{
          type: 'graph',
          coordinateSystem: 'cartesian2d',
          label: {
            normal: {
              show: true,
              position: 'inside',
              //offset: [0,-60],//居上 20
              textStyle: {
                fontSize: 14,
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
            coordinateSystem: "cartesian2d",
            polyline: true,
            symbol: ['none', 'none'],
            zlevel: 1,
            symbolSize: 6,

            label: {
              show: true,
              position: 'middle',
            },
            lineStyle: {
              normal: {
                color: 'green',
                width: 1.5,
                opacity: 1,
                curveness: 0
              }
            },
            effect: {
              show: true,
              trailLength: 0.1,
              symbol: 'arrow',
              color: '#87e2ef',
              symbolSize: 6
            },
            data: charts.linesData
          }]
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
      this.dom.setOption(option);
      on(window, 'resize', this.resize)
    }
  }
}
</script>
<style>
.charts {
  height:850px;
  width: 2400px;
}
</style>
