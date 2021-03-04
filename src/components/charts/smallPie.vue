<template>
  <div style="height: 210px" ref="dom" class="charts chart-pie"></div>
</template>

<script>
    import echarts from 'echarts'
    import tdTheme from './dark.json'
    import { on, off } from '@/libs/tools'
    echarts.registerTheme('tdTheme', tdTheme)
    export default {
        name: 'SmallPie',
        props: {
            valueData: Array,
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
            valueData:{
                handler(){
                    let legend = this.valueData.map(_ => _.name);
                    this.dom.setOption({
                        legend: {
                            orient: 'vertical',
                            x: "right",
                            top:'30%',
                            right:'85%',
                            data: legend,
                            itemWidth: 30,
                            itemHeight: 15,
                        },
                        title: {
                            title: {
                                text: this.text,
                                subtext: this.subtext,
                                bottom: 'bottom',

                                textStyle:{
                                    fontSize:13,
                                    fontWeight:'lighter',
                                    color: 'white'
                                },
                                x:'center'
                            },
                        },
                        series: [
                            {
                                type: 'pie',
                                radius: ['25%', '55%'],
                                center: ['33%', '45%'],
                                data: this.valueData,
                                label:{
                                    normal:{
                                        show:false,
                                        position:'center'
                                    }
                                },
                                labelLine:{
                                    show:false
                                }
                                // itemStyle: {
                                //     emphasis: {
                                //         shadowBlur: 10,
                                //         shadowOffsetX: 0,
                                //         shadowColor: 'rgba(0, 0, 0, 0.5)'
                                //     }
                                // }
                            }
                        ]
                    })
                },
                deep:true
            }
        },
        mounted () {
            this.$nextTick(() => {
                let legend = this.valueData.map(_ => _.name)
                let option = {
                    // backgroundColor: 'white',
                    title: {
                        textColor: 'white',
                        text: this.text,
                        subtext: this.subtext,
                        bottom: 'bottom',
                        textStyle:{
                            fontSize:13,
                            fontWeight:'lighter',
                            color: 'white'
                        },
                        x:'center'
                    },
                    tooltip: {
                        trigger: 'item',
                        formatter: '{b} : {d}%'
                    },
                    legend: {
                        orient: 'vertical',
                        x: "right",
                        top:'30%',
                        right:'85%',
                        data: legend,
                        itemWidth: 30,
                        itemHeight:15,
                    },
                    series: [
                        {
                            type: 'pie',
                            radius: ['25%', '55%'],
                            center: ['33%', '45%'],
                            data: this.valueData,
                            label:{
                                normal:{
                                    show:false,
                                    position:'center'
                                }
                            },
                            labelLine:{
                                show:false
                            }
                            // itemStyle: {
                            //   emphasis: {
                            //     shadowBlur: 10,
                            //     shadowOffsetX: 0,
                            //     shadowColor: 'rgba(0, 0, 0, 0.5)'
                            //   }
                            // }
                        }
                    ]
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
