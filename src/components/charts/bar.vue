<template>
  <div ref="dom" class="charts chart-bar"></div>
</template>

<script>
import echarts from 'echarts'
import tdTheme from './dark.json'
import { on, off } from '@/libs/tools'
echarts.registerTheme('tdTheme', tdTheme);
export default {
  name: 'ChartBar',
  props: {
    value: Object,
    text: String,
    subtext: String,
    maxY: Number
  },
  data () {
    return {
      dom: null
    }
  },
  methods: {
    resize () {
      this.dom.resize()
    }
  },
  watch:{
    value:{
     handler(){
         let xAxisData = Object.keys(this.value);
         let seriesData = Object.values(this.value);
         this.dom.setOption({
             series: [{
                 data: seriesData,
                 type: 'bar'
             }],
             yAxis: {
                 type: 'value',
                 max: this.maxY,
                 min: 0,
                 scale: true,
             },
             xAxis: {
                 type: 'category',
                 data: xAxisData
             },
         })
     },
        deep:true
    }
  },
  mounted () {
    this.$nextTick(() => {
      let xAxisData = Object.keys(this.value);
      let seriesData = Object.values(this.value);
      let option = {
          // backgroundColor: '#eee',
        title: {
          text: this.text,
          subtext: this.subtext,
          x: 'center'
        },
          tooltip: {
              trigger: 'axis',
              axisPointer:{
                  type:'cross',
                  label:{
                      backgroundColor: '#6a7985'
                  }
              },
              formatter: '{b} : {c} '
          },
        xAxis: {
          type: 'category',
          data: xAxisData
        },
        yAxis: {
          type: 'value',
          max: this.maxY,
          min: 0,
          scale: true
        },
        series: [{
          data: seriesData,
          type: 'bar',
          // label:{
          //     show: true,
          //     position:'top',
          //     color: '#f7ba0e',
          //     lineHeight: 10,
          //     borderColor: '#449933',
          //     fontFamily: 'Microsoft YaHei',
          //     fontSize:15
          //   },
        }]
      };
      this.dom = echarts.init(this.$refs.dom, 'tdTheme');
      this.dom.setOption(option);
      on(window, 'resize', this.resize)
    })
  },
  beforeDestroy () {
    off(window, 'resize', this.resize)
  }
}
</script>
