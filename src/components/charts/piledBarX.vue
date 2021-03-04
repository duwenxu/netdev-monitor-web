<template>
  <div ref="dom" class="piled-bar-x"></div>
</template>

<script>
    import echarts from 'echarts'
    import tdTheme from './dark.json'
    import { on, off } from '@/libs/tools'
    echarts.registerTheme('tdTheme', tdTheme);
    export default {
        name: 'PiledBarX',
        props: {
            value: Array,
            text: String,
            subtext: String,
            maxY: Number,
            legend: Array,
            xlabels: Array
        },
        data () {
            return {
                dom: null
            }
        },
        mounted () {
            this.dom = echarts.init(this.$refs.dom, 'tdTheme');
            this.init()
            on(window, 'resize', this.resize)
        },
        beforeDestroy () {
            off(window, 'resize', this.resize)
        },
        watch:{
            value(val,oldVal){
                this.init(val)
                this.resize()
            }
        },
        methods: {
            resize () {
                this.dom.resize()
            },
            init(val){
                this.dom.clear()
                this.dom.setOption( {
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
                        // padding: [0,0,0,0]
                    },
                    xAxis: {
                        type: 'category',
                        data: this.xlabels
                    },
                    yAxis: {
                        type: 'value',
                        splitLine:{
                            show:true,
                            lineStyle:{
                                type:'dashed',
                                color:'#1a2e44'
                            }
                        },
                        max: this.maxY,
                        min: 0,
                    },

                    series: val
                })
            }
        },


    }
</script>
<style>
  .piled-bar-x{
    width:100px;
  }
</style>
