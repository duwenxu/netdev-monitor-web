<template>
  <div ref="dom" class="piled-bar "></div>
</template>

<script>
import echarts from 'echarts'
import tdTheme from './dark.json'
import { on, off } from '@/libs/tools'
echarts.registerTheme('tdTheme', tdTheme);
  export default {
    name: 'PileBar',
    props: {
        value: Array,
        text: String,
        subtext: String,
        maxX: Number,
        legend: Array,
        ylabels: Array
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
           this.dom.setOption({
               legend: {
                   data: this.legend
               },
               yAxis: {
                   type: 'category',
                   data: this.ylabels
               },
               xAxis: {
                   type: 'value',
                   max: this.maxX,
                   min: 0,
               },
               series: this.value
           })
       },
          deep:true
      }
    },
    mounted () {
      this.$nextTick(() => {
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
                    type:'shadow',
                    label:{
                        backgroundColor: '#6a7985'
                    }
                },
                // formatter: '{b} : : {c} '
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
            },
            legend: {
              data: this.legend,
                right: "right",
            },
            yAxis: {
              type: 'category',
              data: this.ylabels
            },
            xAxis: {
              type: 'value',
              max: this.maxX,
              min: 0,
            },

            series: this.value
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
<style>
  .piled-bar{
    width:100px;
  }
</style>
