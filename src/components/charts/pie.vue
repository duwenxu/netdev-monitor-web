<template>
  <div ref="dom" class="charts chart-pie"></div>
</template>

<script>
    import echarts from 'echarts'
    import tdTheme from './dark.json'
    import { on, off } from '@/libs/tools'
    echarts.registerTheme('tdTheme', tdTheme);
    export default {
        name: 'ChartPie',
        props: {
            value: Array,
            text: String,
            subtext: String
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
                    let legend = this.value.map(_ => _.name)
                    this.dom.setOption({
                        legend: {
                            orient: 'vertical',
                            bottom: "bottom",
                            data: legend,
                            itemWidth: 40,
                            itemHeight:15,
                        },
                        title: {
                            text: this.text,
                            subtext: this.subtext,
                            x: 'center'
                        },
                        series: [
                            {
                                type: 'pie',
                                radius: '55%',
                                center: ['50%', '50%'],
                                data: this.value,
                                itemStyle: {
                                    emphasis: {
                                        shadowBlur: 10,
                                        shadowOffsetX: 0,
                                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                                    }
                                }
                            }
                        ]
                    })
                },
                deep:true
            }
        },
        mounted () {
            this.$nextTick(() => {
                let legend = this.value.map(_ => _.name);
                let option = {
                    // backgroundColor: '#eee',
                    title: {
                        text: this.text,
                        subtext: this.subtext,
                        x: 'center'
                    },
                    tooltip: {
                        trigger: 'item',
                        formatter: '{b} : {d}%'
                    },
                    legend: {
                        orient: 'vertical',
                        bottom: "bottom",
                        data: legend,
                        itemWidth: 40,
                        itemHeight:15,
                    },
                    series: [
                        {
                            type: 'pie',
                            radius: '55%',
                            center: ['55%', '55%'],
                            data: this.value,

                            itemStyle: {
                                emphasis: {
                                    shadowBlur: 10,
                                    shadowOffsetX: 0,
                                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                                }
                            }
                        }
                    ],
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
