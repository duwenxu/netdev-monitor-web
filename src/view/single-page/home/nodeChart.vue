<template>
  <div>
    <div ref="dom" :style="{width:baseData.width+'px',height:baseData.height+'px'}"></div>
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
export default {
  props: {
    //节点
    nodes: {
      type: Array,
      default: () => []
    },
    //直线
    straightLines: {
      type: Array,
      default: () => []
    },
    //直线无动画
    noEffectLines: {
      type: Array,
      default: () => []
    },
    //折线
    polyLines: {
      type: Array,
      default: () => []
    },
    //折线无动画
    polyNoEffect: {
      type: Array,
      default: () => []
    },
    //前后箭头
    arrowLines: {
      type: Array,
      default: () => []
    },
    //单箭头
    singleArrowLines: {
      type: Array,
      default: () => []
    },
    //虚线框
    dottedLines: {
      type: Array,
      default: () => []
    },
    //箭头
    markPoint: {
      type: Object,
      default: () => {
      }
    },
    grid: {
      type: Object,
      default: () => {
      }
    },
    baseData: {
      type: Object,
      default: () => {
      }
    },
    height: {
      type: Number,
      default: 800
    },
    width: {
      type: Number,
      default: 1600
    },
    xMax: {
      type: Number,
      default: 0
    },
    yMax: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      seriesObj: {
        type: "lines",
        symbol: ['none', 'none'],
        symbolSize: 4,
        coordinateSystem: "cartesian2d",
        label: {
          show: true,
          position: 'middle',
        },
        lineStyle: {
          color: 'green',
          width: 1.5,
          opacity: 1
        },
        effect: {
          show: true,
          trailLength: 0.1,
          symbol: 'arrow',
          color: '#87e2ef',
          symbolSize: 5
        },
        data: []
      },
      legendType: [
        {shape: 'square', color: 'rgba(0,0,0,0)', borderColor: '#009688', description: '运行'},
        {shape: 'square', color: '#b1f83c', description: '主机'},
        {shape: 'square', color: 'rgba(184,181,181)', description: '备机'},
        {shape: 'circle', color: '#009688', description: '正常'},
        {shape: 'circle', color: '#ff1400', description: '故障'},
        {shape: 'circle', color: '#ffbe08', description: '告警'}
      ]
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
    this.init()
  },
  methods: {
    init() {
      let dom = echarts.init(this.$refs.dom)
      let nodes = this.nodes.map(val => {
        let x = parseInt(val.x)
        let y = parseInt(val.y)
        return {
          devNo: val.devNo,
          isMove: val.id,
          nodeName: val.nodeName,
          value: [x, y],
          fixed: true,
          symbol: val.img,
          symbolSize: val.size,
          symbolRotate: val.symbolRotate ? val.symbolRotate : '',//若为三角形
          itemStyle: {
            color: val.color ? val.color : '#12b5d0',
            borderColor: val.border ? val.borderColor : '',
            borderType: val.border || '',
            borderDashOffset: val.border ? val.offset : '',
            borderWidth: val.border ? 1 : ''
          }
        }
      })
      let seriesData = [
        {
          type: 'graph',
          z: 8,
          coordinateSystem: 'cartesian2d',
          label: {
            show: true,
            fontSize: this.baseData.fontSize,
            color: 'black',
            position: 'inside',
            formatter: function (item) {
              return item.data.nodeName
            }
          },
          data: nodes
        }
      ]
      if (this.straightLines.length) {
        let seriesObj = JSON.parse(JSON.stringify(this.seriesObj))
        this.$set(seriesObj, 'z', 1)
        this.$set(seriesObj, 'data', this.straightLines)
        seriesData.push(seriesObj)
      }
      if (this.polyLines.length) {
        let seriesObj = JSON.parse(JSON.stringify(this.seriesObj))
        this.$set(seriesObj, 'z', 2)
        this.$set(seriesObj, 'polyline', true)
        this.$set(seriesObj, 'data', this.polyLines)
        seriesData.push(seriesObj)
      }
      if (this.polyNoEffect.length) {
        let seriesObj = JSON.parse(JSON.stringify(this.seriesObj))
        this.$set(seriesObj, 'z', 7)
        delete seriesObj['effect']
        this.$set(seriesObj, 'polyline', true)
        this.$set(seriesObj, 'markPoint', this.markPoint)
        this.$set(seriesObj, 'data', this.polyNoEffect)
        seriesData.push(seriesObj)
      }
      if (this.noEffectLines.length) {
        let seriesObj = JSON.parse(JSON.stringify(this.seriesObj))
        this.$set(seriesObj, 'z', 3)
        delete seriesObj['effect']
        seriesObj.data = this.noEffectLines
        seriesData.push(seriesObj)
      }
      if (this.arrowLines.length) {
        let seriesObj = JSON.parse(JSON.stringify(this.seriesObj))
        this.$set(seriesObj, 'z', 4)
        delete seriesObj['effect']
        this.$set(seriesObj, 'symbol', ['arrow', 'arrow'])
        this.$set(seriesObj, 'data', this.arrowLines)
        seriesData.push(seriesObj)
      }
      if (this.singleArrowLines.length) {
        let seriesObj = JSON.parse(JSON.stringify(this.seriesObj))
        this.$set(seriesObj, 'z', 5)
        delete seriesObj['effect']
        this.$set(seriesObj, 'symbol', ['none', 'arrow'])
        this.$set(seriesObj.label, 'position', 'start')
        this.$set(seriesObj, 'data', this.singleArrowLines)
        seriesData.push(seriesObj)
      }
      if (this.dottedLines.length) {
        let seriesObj = JSON.parse(JSON.stringify(this.seriesObj))
        let lineStyle = {
          type: [5, 10],
          dashOffset: 5,
          color: 'green',
          width: 1.5,
          opacity: 1
        }
        this.$set(seriesObj, 'z', 6)
        delete seriesObj['effect']
        this.$set(seriesObj, 'polyline', true)
        this.$set(seriesObj, 'lineStyle', lineStyle)
        this.$set(seriesObj, 'data', this.dottedLines)
        seriesData.push(seriesObj)
      }
      let option = {
        animation: false,
        grid: this.grid,
        xAxis: {
          min: 0,
          max: this.baseData.xMax,
          show: false,
          type: 'value'
        },
        yAxis: {
          min: 0,
          max: this.baseData.yMax,
          show: false,
          type: 'value'
        },
        series: seriesData
      }
      dom.off('mouseover')
      dom.off('click')
      let that = this
      dom.on('mouseover', function (info) {
        if (info.data.isMove === 1) {
          dom.dispatchAction({
            type: 'downplay',
            seriesIndex: info.seriesIndex
          })
        }
      })
      dom.on('click', function (info) {
        if (info.data.devNo) {
          that.$emit('on-click', info.data.devNo)
        }
      })
      dom.setOption(option)
    }
  }
}
</script>
<style scoped lang="less">
.legend {
  margin-left: 20px;
  display: flex;
  flex-direction: row;

  .legend_status {
    margin-top: -15px;
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
</style>
