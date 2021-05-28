<template>
<!-- 二类车-->
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
          x: '40',
          y: '780',
          nodeName: '',
          img: 'image://' + require('@/assets/images/home/antenna_turn.png'),
          size: [200,220]
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
        {
          x: '470',
          y: '1130',
          nodeName: 'ka发射机',
          img: 'rect',
          size: [90, 60],
          color: '#c4e889'
        },
        {
          x: '470',
          y: '880',
          nodeName: 'Ka  LWA',
          img: 'triangle',
          symbolRotate: -90,
          size: [60, 90],
          color: '#c4e889'
        },
        {
          x: '470',
          y: '580',
          nodeName: 'Ka  LWA',
          img: 'rect',
          id: 1,
          size: [300, 150],
          color: 'rgb(239,180,78)'
        },
        {
          x: '470',
          y: '600',
          nodeName: 'Ku  IWTA \n 400W \n\n\n\nKu  IWTA \n 400W ',
          img: 'image://' + require('@/assets/images/home/down_trans_no.png'),
          size: [180, 110]
        },

        {
          x: '470',
          y: '400',
          nodeName: 'Ku  LWA',
          img: 'triangle',
          symbolRotate: -90,
          size: [60, 90],
          color: '#c4e889'
        },


        //Ka-C下变频器
        {
          x: '750',
          y: '880',
          nodeName: 'Ka-C \n下变频器 \n\n\n\nKa-C \n下变频器',
          img: 'image://' + require('@/assets/images/home/up_trans_no.png'),
          size: [180, 110]
        },

        //L-Ku 上变频器
        {
          x: '750',
          y: '600',
          nodeName: 'L-Ku \n上变频器 \n\n\n\nL-Ku \n上变频器',
          img: 'image://' + require('@/assets/images/home/down_trans.png'),
          size: [180, 110]
        },
        //L-Ku 下变频器

        {
          x: '750',
          y: '400',
          nodeName: 'Ku-L \n下变频器 \n\n\n\nKu-L \n下变频器',
          img: 'image://' + require('@/assets/images/home/up_trans_no.png'),
          size: [180, 110]
        },
        //C-L 下变频器
        {
          x: '980',
          y: '880',
          nodeName: 'C-L \n下变频器 \n\n\n\nC-L \n下变频器',
          img: 'image://' + require('@/assets/images/home/up_trans.png'),
          size: [180, 110]
        },
        //L-C上变频器
        {
          x: '980',
          y: '1130',
          nodeName: 'L-C \n上变频器 \n\n\n\nL-C \n上变频器',
          img: 'image://' + require('@/assets/images/home/down_trans.png'),
          size: [180, 110]
        },

        {
          x: '800',
          y: '100',
          nodeName: '天\n线\n驱\n动\n单\n元\n(ADU)',
          img: 'rect',
          size: [60, 120],
          color: 'rgb(202,196,185)'
        },
        {
          x: '920',
          y: '100',
          nodeName: '天\n线\n控\n制\n单\n元\n(ACU)',
          img: 'rect',
          size: [60, 120],
          color: 'rgb(202,196,185)'
        },
        {
          x: '1200',
          y: '1000',
          nodeName: 'L波段\n中频矩阵\n(上行)',
          img: 'rect',
          size: [60, 245],
          color: '#c4e889'
        },
        {
          x: '1200',
          y: '500',
          nodeName: 'L波段\n中频矩阵\n(下行)',
          img: 'rect',
          size: [60, 245],
          color: '#c4e889'
        },
        {
          x: '1400',
          y: '1040',
          nodeName: '调制解调器(1:1)\n\n\n\n\n\n\n\n\n',
          id: 1,
          img: 'rect',
          size: [160, 160],
          category: 1,
          color: 'rgb(214,188,169)'
        },

        {
          x: '1400',
          y: '1100',
          nodeName: '2300调制解调器',
          img: 'rect',
          size: [120, 30],
          color: 'white',
          category: 2
        },
        {
          x: '1400',
          y: '1030',
          nodeName: '1:1转换单元',
          img: 'rect',
          size: [120, 30],
          color: 'white',
          category: 2
        },

        {
          x: '1400',
          y: '960',
          nodeName: '2300调制解调器',
          img: 'rect',
          size: [120, 30],
          color: 'white',
          category: 2
        },
        {
          x: '1400',
          y: '750',
          nodeName: '调制解调器(1:1)\n\n\n\n\n\n\n\n\n',
          id: 1,
          img: 'rect',
          size: [160, 160],
          color: 'rgb(214,188,169)'
        },

        {
          x: '1400',
          y: '810',
          nodeName: '2300调制解调器',
          img: 'rect',
          size: [120, 30],
          color: 'white',
          category: 2
        },
        {
          x: '1400',
          y: '740',
          nodeName: '1:1转换单元',
          img: 'rect',
          size: [120, 30],
          color: 'white',
          category: 2
        },
        {
          x: '1400',
          y: '670',
          nodeName: '2300调制解调器',
          img: 'rect',
          size: [120, 30],
          color: 'white',
          category: 2
        },


        {
          x: '1400',
          y: '500',
          nodeName: '频谱监测接收设备',
          img: 'rect',
          size: [140, 60],
          color: 'rgb(206,215,209)'
        },
        {
          x: '1700',
          y: '880',
          nodeName: '网络\n\n承载\n\n及\n\n业务\n\n分系统',
          img: 'rect',
          size: [60, 260],
          color: 'rgb(175,158,174)'

        },

        //网管交换机


        {
          x: '1700',
          y: '400',
          nodeName: '网管交换机',
          img: 'rect',
          id:1,
          size: [150, 80],
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
          x: '1700',
          y: '100',
          nodeName: '',
          img: 'rect',
          size: [180, 140],
          color:'white',
          border:'dotted',
          id:1,
        },
        {
          x: '1700',
          y: '100',
          nodeName: '二级网管站',
          img: 'rect',
          size:[150, 80],
          color: 'rgb(202,196,185)'
        },

        {
          x: '1450',
          y: '100',
          nodeName: '网管计算机',
          img: 'rect',
          size: [150, 80],
          color: 'rgb(202,196,185)'
        },
        {
          x: '1200',
          y: '100',
          nodeName: '串口服务器',
          img: 'rect',
          size: [150, 80],
          color: 'rgb(202,196,185)'
        },

        {
          x: '330',
          y: '680',
          nodeName: '维修仓',
          size: 0
        },

        {
          x: '480',
          y: '1200',
          nodeName: '',
          img: 'image://' + require('@/assets/images/home/trans-line-down.png'),
          size: [75, 45]
        },
        {
          x: '480',
          y: '740',
          nodeName: '',
          img: 'image://' + require('@/assets/images/home/trans-line-down.png'),
          size: [75, 45]
        },
        {
          x: '760',
          y: '1000',
          nodeName: '',
          img: 'image://' + require('@/assets/images/home/trans-line-down.png'),
          size: [75, 45]
        },
        {
          x: '870',
          y: '1200',
          nodeName: '',
          img: 'image://' + require('@/assets/images/home/trans_line.png'),
          size: [80, 30]
        },
        {
          x: '1280',
          y: '1200',
          nodeName: '',
          img: 'image://' + require('@/assets/images/home/trans_line.png'),
          size: [80, 30]
        },
        {
          x: '1280',
          y: '400',
          nodeName: '',
          img: 'image://' + require('@/assets/images/home/trans_line.png'),
          size: [80, 30]
        },
        {
          x: '1550',
          y: '1140',
          nodeName: '',
          img: 'image://' + require('@/assets/images/home/trans_line.png'),
          size: [80, 30]
        },
        {
          x: '1550',
          y: '860',
          nodeName: '',
          img: 'image://' + require('@/assets/images/home/trans_line.png'),
          size: [80, 30]
        },
        {
          x: '900',
          y: '570',
          nodeName: '',
          img: 'image://' + require('@/assets/images/home/trans_line.png'),
          size: [80, 30]
        },
        {
          x: '900',
          y: '370',
          nodeName: '',
          img: 'image://' + require('@/assets/images/home/trans_line.png'),
          size: [80, 30]
        },
        {
          x: '1000',
          y: '750',
          nodeName: '',
          img: 'image://' + require('@/assets/images/home/trans_line_up.png'),
          size: [75, 45]
        },
        {
          x: '1000',
          y: '100',
          nodeName: '',
          img: 'image://' + require('@/assets/images/home/trans_line.png'),
          size: [80, 30]
        },
      ]
      var charts = {
        nodes: [],
        linesData: [
          //一段式连线天线驱动单元ADU->设备
          {
            mark: '设备->天线驱动单元ADU',
            name: '',
            coords: [[760, 100], [0, 100]],
            lineStyle: {
              normal: {
                color: '#020202'
              }
            }
          },
          {
            mark: '设备->天线驱动单元ADU',
            name: '',
            coords: [[0, 100], [0, 590]],
            lineStyle: {
              normal: {
                color: '#020202'
              }
            }
          },
          {
            mark: '天线驱动单元ADU->天线控制单元acu',
            name: '',
            coords: [[840, 80], [880, 80]],
            lineStyle: {
              normal: {
                color: '#020202'
              }
            }
          },
          {
            mark: '天线控制单元acu->天线驱动单元ADU',
            name: '',
            coords: [[880, 120], [840, 120]],
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
            coords: [[1200, 280], [1200, 250]],
            lineStyle: {
              normal: {
                color: '#020202'
              }
            }
          },
          {
            mark: 'I频段跟踪接收-》天线控制单元ACU',
            name: '',
            coords: [[1200, 250], [920, 250]],
            lineStyle: {
              normal: {
                color: '#020202'
              }
            }
          },
          {
            mark: 'I频段跟踪接收-》天线控制单元ACU',
            name: '',
            coords: [[920, 250], [920, 200]],
            lineStyle: {
              normal: {
                color: '#020202'
              }
            }
          },

          //----------------------------上行------------
          {
            mark: 'KU发射接收->设备',
            coords: [[200, 600], [120, 600]],
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
            coords: [[200, 1130], [70, 1130]],
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
            mark: 'KA发射接收->设备',
            coords: [[70, 1130], [70, 900]],
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
            mark: 'ku iwta到ku发射接收',
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
            coords: [[890, 1130], [530, 1130]],
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
            mark: 'l ku上变频器->ku iwta',
            name: '',
            coords: [[650, 600], [560, 600]],
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
            coords: [[1160, 1130], [1080, 1130]],
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
            mark: 'L波段中频矩阵 上行->L-ku 上变频器',
            name: '',
            coords: [[1160, 1000], [1110, 1000]],
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
            name: '',
            coords: [[1110, 1000], [1110, 600]],
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
            name: '',
            coords: [[1110, 600], [850, 600]],
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
            coords: [[1300, 1000], [1235, 1000]],
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
            coords: [[1300, 800], [1235, 800]],
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
            coords: [[120, 880], [200, 880]],
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
            coords: [[70, 590], [70, 400]],
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
            coords: [[70, 400], [210, 400]],
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
            coords: [[300, 880], [410, 880]],
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
            coords: [[500, 880], [650, 880]],
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
            coords: [[530, 400], [650, 400]],
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
            coords: [[850, 400], [1160, 400]],
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
            coords: [[840, 880], [890, 880]],
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
            coords: [[1080, 880], [1130, 880]],
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
            name: '',
            coords: [[1130, 880], [1130, 500]],
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
            name: '',
            coords: [[1130, 500], [1160, 500]],
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
            coords: [[1240, 650], [1300, 650]],
            lineStyle: {
              normal: {
                color: '#143fdc '
              }
            },
            effect: {
              color: '#143fdc '
            }
          },
          //一段式
          {
            mark: 'L波段中频下行-》上方 调制解调器 ',
            name: '',
            coords: [[1240, 700], [1290, 700]],
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
            mark: 'L波段中频下行-》调制解调器 上方',
            coords: [[1290, 950], [1310, 950]],
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
            coords: [[1240, 500], [1310, 500]],
            lineStyle: {
              normal: {
                color: '#143fdc '
              }
            },
            effect: {
              color: '#143fdc '
            }
          },
          // {
          //   mark: 'L波段中频下行-》I频段跟踪接收',
          //   name: '',
          //   coords: [[1240, 400], [1310, 400]],
          //   lineStyle: {
          //     normal: {
          //       color: '#143fdc '
          //     }
          //   },
          //   effect: {
          //     color: '#143fdc '
          //   }
          // },
          //双向
          {
            mark: '网络承载分系统-》调制解调器',
            name: '',
            coords: [[1660, 1000], [1500, 1000]],
            lineStyle: {
              normal: {
                color: '#7f14dc'
              }
            },
            effect: {
              color: '#7f14dc'
            }
          },
          {
            mark: '网络承载分系统-》调制解调器',
            name: '',
            coords: [[1500, 950], [1660, 950]],
            lineStyle: {
              normal: {
                color: '#7f14dc'
              }
            },
            effect: {
              color: '#7f14dc'
            }
          },
          //双向
          {
            mark: '网络承载分系统-》调制解调器',
            name: '',
            coords: [[1660, 750], [1500, 750]],
            lineStyle: {
              normal: {
                color: '#7f14dc'
              }
            },
            effect: {
              color: '#7f14dc'
            }
          },
          {
            mark: '网络承载分系统-》调制解调器',
            name: '',
            coords: [[1500, 700], [1660, 700]],
            lineStyle: {
              normal: {
                color: '#7f14dc'
              }
            },
            effect: {
              color: '#7f14dc'
            }
          },
          //2级网管站-》网管计算机
          {
            mark: '2级网管站-》网管计算机',
            name: '',
            coords: [[1610, 130], [1540, 130]],
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
            coords: [[1540, 80], [1610, 80]],
            lineStyle: {
              normal: {
                color: 'rgb(57 181 74)'
              }
            },
            effect: {
              color: 'rgb(57 181 74)'
            }
          },

          // {
          //   mark: '网管交换机-》网管计算机',
          //   name: '',
          //   coords: [[1650, 470], [1650, 180]],
          //   lineStyle: {
          //     normal: {
          //       color: 'rgb(57 181 74)'
          //     }
          //   },
          //   effect: {
          //     color: 'rgb(57 181 74)'
          //   }
          // },
          // {
          //   mark: '网管计算机-》网管交换机',
          //   name: '',
          //   coords: [[1750, 180], [1750, 470]],
          //   lineStyle: {
          //     normal: {
          //       color: 'rgb(57 181 74)'
          //     }
          //   },
          //   effect: {
          //     color: 'rgb(57 181 74)'
          //   }
          // },
          {
            mark: '网管计算机-》串口服务器',
            name: '',
            coords: [[1360, 130], [1290, 130]],
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
            mark: '串口服务器->网管计算机',
            name: '',
            coords: [[1290, 80], [1360, 80]],
            lineStyle: {
              normal: {
                color: 'rgb(57 181 74)'
              }
            },
            effect: {
              color: 'rgb(57 181 74)'
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
          node.itemStyle.normal.borderType = [5, 10]
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

          show: false,
          type: 'value'
        },
        yAxis: {
          min: 0,
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
            type: 'lines',
            symbol: ['none', 'none'],
            zlevel: 1,
            symbolSize: 10,
            coordinateSystem: 'cartesian2d',

            label: {
              show: true,
              position: 'middle',
            },
            lineStyle: {
              normal: {
                color: 'green',
                width: 2,
                opacity: 1,
                curveness: 0
              }
            },
            effect: {
              show: true,
              trailLength: 0.1,
              symbol: 'arrow',
              color: '#87e2ef',
              symbolSize: 8
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
  height: 800px;
  width: 1700px;
}
</style>
