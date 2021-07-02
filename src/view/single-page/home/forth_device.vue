<template>
<!--  四类车-->
  <div style="border:1px solid red">
    <div  ref="dom" class="charts"></div>
    <div class="legend">
      <div class="legend_status" v-for="(item, index) in legendType" :key="index">
        <span :class="[item.shape]"
              :style="{background: item.color, borderColor: item.borderColor}"></span>{{ item.description }}
      </div>
    </div>
  </div>

</template>

<script>
import * as echarts from 'echarts'
import {on, off} from '@/libs/tools'

// echarts.registerTheme('tdTheme');
export default {
  data() {
    return {
      dom: null,
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
          y: '280',
          nodeName: '',
          img: 'image://' + require('@/assets/images/home/wn_track.png'),
          size: [120,80]
        },
        {
          x: '120',
          y: '390',
          nodeName: 'ka\n发射\n\n\n\n\n\nKa\n接收',
          img: 'rect',
          size: [30, 200],
          color: 'rgb(228,225,192)'
        },
        {
          x: '120',
          y: '160',
          nodeName: 'ku\n发射\n\n\n\n\n\nKu\n接收',
          img: 'rect',
          size: [30, 200],
          color: 'rgb(228,225,192)'
        },

        //---------------------------------天线座

        {
          x: '210',
          y: '440',
          nodeName: 'ka发射机',
          img: 'rect',
          size: [70, 30],
          color: '#e9cdf6'
        },
        {
          x: '200',
          y: '335',
          nodeName: 'LNA   ',
          img: 'triangle',
          symbolRotate: -90,
          size: [40, 45],
          color: '#e9cdf6'
        },
        //-------------------up_noKa-c下---------
        {
          x: '310',
          y: '365',
          nodeName: ' Ka-c       \n  下变频器     ',
          img: 'rect',
          size: [70, 30],
          color: '#b1f83c'
        },
        {
          x: '290',
          y: '335',
          nodeName: '',
          img: 'rect',
          size: [10, 5],
          color: '#c4e889'
        },
        {
          x: '330',
          y: '335',
          nodeName: '',
          img: 'rect',
          size: [10, 5],
          color: '#c4e889'
        },
        {
          x: '260',
          y: '335',
          nodeName: '',
          img: 'circle',
          size: [10, 10],
          color: 'rgba(0,0,0,0)',
          border: 'black'
        },
        {
          x: '360',
          y: '335',
          nodeName: '',
          img: 'circle',
          size: [10, 10],
          color: 'rgba(0,0,0,0)',
          border: 'black'
        },
        {
          x: '310',
          y: '305',
          nodeName: ' Ka-c       \n  下变频器     ',
          img: 'rect',
          size: [70, 30],
          color: 'rgba(184,181,181)'
        },
//----------------------------维修仓
        //-------------------up_noKu发射机---------
        {
          x: '260',
          y: '240',
          nodeName: 'Ku       \n 发射机     ',
          img: 'rect',
          size: [70, 30],
          color: '#b1f83c'
        },
        {
          x: '240',
          y: '210',
          nodeName: '',
          img: 'rect',
          size: [10, 5],
          color: '#c4e889'
        },
        {
          x: '280',
          y: '210',
          nodeName: '',
          img: 'rect',
          size: [10, 5],
          color: '#c4e889'
        },
        {
          x: '310',
          y: '210',
          nodeName: '',
          img: 'circle',
          size: [10, 10],
          color: 'rgba(0,0,0,0)',
          border: 'black'
        },
        {
          x: '210',
          y: '210',
          nodeName: '',
          img: 'circle',
          size: [10, 10],
          color: 'rgba(0,0,0,0)',
          border: 'black'
        },
        {
          x: '260',
          y: '180',
          nodeName: 'Ku       \n 发射机     ',
          img: 'rect',
          size: [70, 30],
          color: 'rgba(184,181,181)'
        },

        //---------------------------------天线座 下
        {
          x: '230',
          y: '110',
          nodeName: 'LNA   ',
          img: 'triangle',
          symbolRotate: -90,
          size: [40, 45],
          color: '#e9cdf6'
        },
        {
          x: '250',
          y: '25',
          nodeName: '天线驱动单元  ',
          img: 'rect',
          size: [110, 30],
          color: 'rgb(202,196,185)'
        },



//--------------------------------卫通信道分系统

        //-------------------down_lc上变频器---------
        {
          x: '490',//310  120
          y: '480',//270  220
          nodeName: ' L-C       \n   上变频器A     ',
          img: 'rect',
          size: [70, 30],
          color: '#b1f83c'
        },
        {
          x: '470',
          y: '450',
          nodeName: '',
          img: 'rect',
          size: [10, 5],
          color: '#c4e889'
        },
        {
          x: '510',
          y: '450',
          nodeName: '',
          img: 'rect',
          size: [10, 5],
          color: '#c4e889'
        },
        {
          x: '540',
          y: '450',
          nodeName: '',
          img: 'circle',
          size: [10, 10],
          color: 'rgba(0,0,0,0)',
          border: 'black'
        },
        {
          x: '440',
          y: '450',
          nodeName: '',
          img: 'circle',
          size: [10, 10],
          color: 'rgba(0,0,0,0)',
          border: 'black'
        },
        {
          x: '490',
          y: '420',
          nodeName: ' L-C       \n   上变频器B     ',
          img: 'rect',
          size: [70, 30],
          color: 'rgba(184,181,181)'
        },


        //-------------------up_cl下---------
        {
          x: '490',
          y: '365',
          nodeName: ' C-L       \n   下变频器A     ',
          img: 'rect',
          size: [70, 30],
          color: '#b1f83c'
        },
        {
          x: '510',
          y: '335',
          nodeName: '',
          img: 'rect',
          size: [10, 5],
          color: '#c4e889'
        },
        {
          x: '470',
          y: '335',
          nodeName: '',
          img: 'rect',
          size: [10, 5],
          color: '#c4e889'
        },
        {
          x: '540',
          y: '335',
          nodeName: '',
          img: 'circle',
          size: [10, 10],
          color: 'rgba(0,0,0,0)',
          border: 'black'
        },
        {
          x: '440',
          y: '335',
          nodeName: '',
          img: 'circle',
          size: [10, 10],
          color: 'rgba(0,0,0,0)',
          border: 'black'
        },
        {
          x: '490',
          y: '305',
          nodeName: ' C-L       \n   下变频器B     ',
          img: 'rect',
          size: [70, 30],
          color: 'rgba(184,181,181)'
        },



        //-------------------down l-KU上---------
        {
          x: '490',
          y: '240',
          nodeName: ' L-ku       \n   上变频器A     ',
          img: 'rect',
          size: [70, 30],
          color: '#b1f83c'
        },
        {
          x: '510',
          y: '210',
          nodeName: '',
          img: 'rect',
          size: [10, 5],
          color: '#c4e889'
        },
        {
          x: '470',
          y: '210',
          nodeName: '',
          img: 'rect',
          size: [10, 5],
          color: '#c4e889'
        },
        {
          x: '540',
          y: '210',
          nodeName: '',
          img: 'circle',
          size: [10, 10],
          color: 'rgba(0,0,0,0)',
          border: 'black'
        },
        {
          x: '440',
          y: '210',
          nodeName: '',
          img: 'circle',
          size: [10, 10],
          color: 'rgba(0,0,0,0)',
          border: 'black'
        },
        {
          x: '490',
          y: '180',
          nodeName: ' L-ku       \n   上变频器B     ',
          img: 'rect',
          size: [70, 30],
          color: 'rgba(184,181,181)'
        },

        //-------------------down ku-l下---------
        {
          x: '490',
          y: '140',
          nodeName: ' Ku-L       \n   下变频器A     ',
          img: 'rect',
          size: [70, 30],
          color: '#b1f83c'
        },
        {
          x: '510',
          y: '110',
          nodeName: '',
          img: 'rect',
          size: [10, 5],
          color: '#c4e889'
        },
        {
          x: '470',
          y: '110',
          nodeName: '',
          img: 'rect',
          size: [10, 5],
          color: '#c4e889'
        },
        {
          x: '540',
          y: '110',
          nodeName: '',
          img: 'circle',
          size: [10, 10],
          color: 'rgba(0,0,0,0)',
          border: 'black'
        },
        {
          x: '440',
          y: '110',
          nodeName: '',
          img: 'circle',
          size: [10, 10],
          color: 'rgba(0,0,0,0)',
          border: 'black'
        },
        {
          x: '490',
          y: '80',
          nodeName: ' Ku-L       \n   下变频器B     ',
          img: 'rect',
          size: [70, 30],
          color: 'rgba(184,181,181)'
        },

        {
          x: '600',
          y: '25',
          nodeName: '天线控制单元   ',
          img: 'rect',
          size: [110, 30],
          color: 'rgb(202,196,185)'
        },
        {
          x: '620',
          y: '280',
          nodeName: 'L\n\n波\n\n段\n\n中\n\n频\n\n矩\n\n阵\n',
          img: 'rect',
          size: [30, 400],
          color: '#c4e889'
        },

        {
          x: '750',
          y: '400',
          nodeName: '调制解调器(1:1)\n\n\n\n\n\n\n\n\n\n',
          id: 1,
          img: 'rect',
          size: [120, 140],
          category: 1,
          color: 'rgb(214,188,169)'
        },
        {
          x: '750',
          y: '430',
          nodeName: '2300调制解调器   ',
          img: 'rect',
          size: [110, 25],
          color: '#b1f83c',
          category: 2
        },
        {
          x: '750',
          y: '390',
          nodeName: '1:1转换单元    ',
          img: 'rect',
          size: [110, 25],
          color: 'white',
          category: 2
        },
        {
          x: '750',
          y: '350',
          nodeName: '2300调制解调器   ',
          img: 'rect',
          size: [110, 25],
          color: 'rgba(184,181,181)',
          category: 2
        },

        {
          x: '750',
          y: '220',
          nodeName: '调制解调器(1:1)\n\n\n\n\n\n\n\n\n\n',
          id: 1,
          img: 'rect',
          size: [120, 140],
          category: 1,
          color: 'rgb(214,188,169)'
        },
        {
          x: '750',
          y: '250',
          nodeName: '2300调制解调器   ',
          img: 'rect',
          size: [110, 25],
          color: '#b1f83c',
          category: 2
        },
        {
          x: '750',
          y: '210',
          nodeName: '1:1转换单元    ',
          img: 'rect',
          size: [110, 25],
          color: 'white',
          category: 2
        },
        {
          x: '750',
          y: '180',
          nodeName: '2300调制解调器   ',
          img: 'rect',
          size: [110, 25],
          color: 'rgba(184,181,181)',
          category: 2
        },
        {
          x: '750',
          y: '100',
          nodeName: 'L频段跟踪接收机',
          img: 'rect',
          size: [110, 30],
          color: 'rgb(206,215,209)'
        },

      ]
      var charts = {
        nodes: [],
        linesData: [
          //一段式连线天线驱动单元ADU->设备
          {
            mark: '设备->天线驱动单元',
            name: '',
            coords: [ [100, 210],[600, 210]],
            lineStyle: {
              normal: {
                color: '#020202'
              }
            }
          },

          {
            mark: '天线驱动单元ADU->设备',
            name: '',
            coords: [[370, 300], [20, 300], [20, 720]],
            lineStyle: {
              normal: {
                color: '#020202'
              }
            }
          },

          {
            mark: '天线驱动单元ADU->天线控制单元acu',
            name: '',
            coords: [[590, 320], [740, 320]],
            lineStyle: {
              normal: {
                color: '#020202'
              }
            }
          },
          {
            mark: '天线控制单元acu->天线驱动单元ADU',
            name: '',
            coords: [[740, 300], [590, 300]],
            lineStyle: {
              normal: {
                color: '#020202'
              }
            }
          },

          //----------------------------上行------------
          {
            mark: 'KU发射接收->设备',
            coords: [[200, 680],[140,680]],
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
            coords: [[200, 1080], [70, 1080], [70, 850]],
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
            coords: [[410, 1080], [300, 1080]],
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
            coords: [[375, 680], [290, 680]],
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
            mark: 'lc上变频器器-》ka发射机',
            name: '',
            coords: [[760, 1080], [530, 1080]],
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
            mark: 'l ku上变频器器->ku 发射机',
            name: '',
            coords: [[760, 680], [570, 680]],
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
            mark: 'L波段中频矩阵 上行->L-c上变频器器',
            name: '',
            coords: [[1010, 1080], [950, 1080]],
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
            mark: 'L波段中频矩阵 上行->L-ku 上变频器器',
            name: '',
            coords: [[1010, 680], [950, 680]],
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
            coords: [[1085, 920], [1160, 920]],
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
            coords: [[1340, 920], [1390, 920]],
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
            coords: [[1085, 520], [1160, 520]],
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
            coords: [[1340, 520], [1390, 520]],
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
            coords: [[1085, 410], [1150, 410]],
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
            mark: '天线控制单元=》L波段跟踪接收机',
            name: '',
            coords: [[950, 320], [1250, 320],[1250,350]],
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
            mark: 'L波段跟踪接收机- 》 天线控制单元 ',
            name: '',
            coords: [[1270,350],[1270, 300], [950, 300]],
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
            coords: [[120,840],[120, 920], [200, 920]],
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
            coords: [[70, 700], [70, 520], [210, 520]],
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
            coords: [[300, 920], [350, 920]],
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
            coords: [[300, 520], [410, 520]],
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
            mark: 'ka lwa ->ka-c下变频器器',
            name: '',
            coords: [[470, 920], [500, 920]],
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
            mark: 'lna -> ku-l下变频器器',
            name: '',
            coords: [[530, 520], [750, 520]],
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
            mark: ' ku-l下变频器器 -》L波段中频矩阵下行',
            name: '',
            coords: [[950, 520], [1010, 520]],
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
            mark: 'ka c下变频器器->cl下变频器器',
            name: '',
            coords: [[700, 920], [750, 920]],
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
            coords: [[950, 920], [1010, 920]],
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
            coords: [[1160, 1080], [1085, 1080]],
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
            coords: [[1160, 680], [1085, 680]],
            lineStyle: {
              normal: {
                color: '#dc6414'
              }
            },
            effect: {
              color: '#dc6414'
            }
          },

        ],
        dottedLines:[
          {
            mark: '天线座',
            name: '',
            coords: [ [150, 500],[400, 500],[400,280],[150,280],[150,500]],
            lineStyle: {
              normal: {
                color: '#020202'
              }
            }
          },
          {
            mark: '维修仓',
            name: '',
            coords: [ [150, 270],[400, 270],[400,150],[150,150],[150,270]],
            lineStyle: {
              normal: {
                color: '#020202'
              }
            }
          },
          {
            mark: '天线座',
            name: '',
            coords: [ [150, 140],[400, 140],[400,0],[150,0],[150,140]],
            lineStyle: {
              normal: {
                color: '#020202'
              }
            }
          },
          {
            mark: '卫通信道分系统',
            name: '',
            coords: [ [410, 500],[820, 500],[820,0],[410,0],[410,500]],
            lineStyle: {
              normal: {
                color: '#020202'
              }
            }
          },
        ],
        polyLines:[]
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
        grid:  {left: '10',bottom:'15',top:'5',right:'5'},
        xAxis: {
          min: 0,
          max:830,
          show: false,
          type: 'value'
        },
        yAxis: {
          min: 0,
          max:510,
          show: false,
          type: 'value'
        },
        series: [{
          type: 'graph',
          coordinateSystem: 'cartesian2d',
          z:4,
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
          //正常折线
          {
            type: "lines",
            coordinateSystem: "cartesian2d",
            polyline: true,
            symbol: ['none', 'none'],
            z:3,
            symbolSize: 6,

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
          //虚线框
          {
            type: "lines",
            coordinateSystem: "cartesian2d",
            polyline: true,
            symbol: ['none', 'none'],
            z:2,
            symbolSize: 6,
            label: {
              show: true,
              position: 'middle',
            },
            lineStyle: {
              type: [5, 10],
              dashOffset: 5,
              color: 'green',
              // normal: {
              //   color: 'green',
              //   width: 1,
              //   opacity: 1,
              //   curveness: 0
              // }
            },
            data: charts.dottedLines
          },
          //功放组图线条
          {
            type: "lines",
            coordinateSystem: "cartesian2d",
            polyline: true,
            symbol: ['none', 'none'],
            z:1,
            symbolSize: 6,
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
            data: charts.polyLines
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
      this.dom.setOption(option);
      on(window, 'resize', this.resize)
    }
  }
}
</script>
<style>
.charts {
  height: 518px;
  width: 830px;
  border:1px solid red
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
    margin-top: -8px;
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
  margin-top: -27px;
  z-index: 999;
  position: relative;
  span {
    display: inline-block;
    background: #009688;
    height: 10px;
    width: 10px;
    border-radius: 50%;
  }
}
.device_status {
  margin-top: -27px;
  z-index: 100;
  position: relative;
  span {
    display: inline-block;
    background: #009688;
    height: 10px;
    width: 10px;
    border-radius: 50%;
  }
}
</style>
