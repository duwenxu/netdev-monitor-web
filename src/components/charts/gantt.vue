<template>
  <div ref="dom" class="charts gantt-bar "></div>
</template>

<script>
    import echarts from 'echarts'
    import tdTheme from './dark.json'
    import {on, off} from '@/libs/tools'
    echarts.registerTheme('tdTheme', tdTheme);
    export default {
        name: 'GanttBar',
        props: {
            valueData: Array,
            text: String,
            subtext: String,
            ylabels: Array,
            checkIdList: Array
        },
        data() {
            return {
                dom: null
            }
        },

        methods: {
            resize() {
                this.dom.resize()
            },
            renderItem(params, api) {
                var categoryIndex = api.value(0);
                var start = api.coord([api.value(1), categoryIndex]);
                var end = api.coord([api.value(2), categoryIndex]);
                var height = api.size([0, 1])[1] * 0.6;

                var rectShape = echarts.graphic.clipRectByRect({
                    x: start[0],
                    y: start[1] - height / 2,
                    width: end[0] - start[0],
                    height: height
                }, {
                    x: params.coordSys.x,
                    y: params.coordSys.y,
                    width: params.coordSys.width,
                    height: params.coordSys.height
                });

                return rectShape && {
                    type: 'rect',
                    shape: rectShape,
                    style: api.style()
                };
            }

        },
        watch: {
            valueData: {
                handler() {
                    this.dom.setOption({
                        series: [{
                            type: 'custom',
                            renderItem: this.renderItem,
                            itemStyle: {
                                normal: {
                                    label: {show: true},
                                    color: function (params) {
                                        if (params.name === 'Selected') {
                                            return 'rgba(6,151,252,0.8)'
                                        } else if (params.name === 'Idle') {
                                            return '#aad8d4'
                                        } else if (params.name === 'Busy') {
                                            return 'rgba(226,162,113,0.75)'
                                        } else {
                                            console.log("error color")
                                        }
                                    }
                                }
                            },
                            encode: {
                                x: [1, 2],
                                y: 0
                            },
                            data: this.valueData
                        }],
                        yAxis: {
                            type: 'category',
                            name: '设备',
                            data: this.ylabels
                        },
                    })
                },
                deep: true
            },
        },

        mounted() {
            let checkId = this.checkIdList;
            this.$nextTick(() => {
                let option = {
                    // backgroundColor: 'rgba(249,249,245,0.64)',
                    title: {
                        text: this.text,
                        subtext: this.subtext,
                        x: 'center'
                    },
                    tooltip: {
                        trigger: 'item',
                        position: 'top',
                        formatter: function (params) {
                            // console.error(params)
                            return "卫星代号 ： " + params.data.value[4] + "<br/>" + "设备代号 ： " + params.data.value[6]
                                + "<br/>" + "弧段开始时间 ： " + params.data.value[1] + "<br/>" + "弧段结束时间 ： " + params.data.value[2]
                                + "<br/>" + "弧段时长 ： " + params.data.value[3] + 's';
                        }
                    },
                    grid: {
                        left: '3%',
                        right: '4%',
                        bottom: '5%',
                        containLabel: true
                    },
                    legend: {
                        data: ['Busy', 'Idle', 'Selected'],
                        top: 'top',
                    },
                    xAxis: {
                        type: 'time',
                        name: '时间',
                        axisLabel: {
                            rotate: -10,
                        },
                    },
                    yAxis: {
                        type: 'category',
                        name: '设备',
                        data: this.ylabels
                    },
                    dataZoom: [{
                        type: 'slider',
                        filterMode: 'weakFilter',
                        showDataShadow: false,
                        height: 8,
                        bottom: 20,
                        borderColor: 'transparent',
                        backgroundColor: '#e2e2e2',
                        handleIcon: 'M10.7,11.9H9.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4h1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7v-1.2h6.6z M13.3,22H6.7v-1.2h6.6z M13.3,19.6H6.7v-1.2h6.6z', // jshint ignore:line
                        handleSize: 20,
                        handleStyle: {
                            shadowBlur: 6,
                            shadowOffsetX: 1,
                            shadowOffsetY: 2,
                            shadowColor: '#red'
                        }
                    }, {
                        type: 'inside',
                        filterMode: 'weakFilter'
                    }],
                    series: [{
                        type: 'custom',
                        renderItem: this.renderItem,
                        itemStyle: {
                            normal: {
                                label: {show: true},
                                color: function (params) {
                                    if (params.name === 'Selected') {
                                        return 'rgba(6,151,252,0.8)'
                                    } else if (params.name === 'Idle') {
                                        return '#aad8d4'
                                    } else if (params.name === 'Busy') {
                                        return 'rgba(226,162,113,0.75)'
                                    } else {
                                        console.log("error color")
                                    }
                                }
                            }
                        },
                        encode: {
                            x: [1, 2],
                            y: 0
                        },
                        data: this.valueData
                    }]

                };
                this.dom = echarts.init(this.$refs.dom, 'tdTheme');
                this.dom.setOption(option);
                on(window, 'resize', this.resize);
                this.dom.on("click", params => {
                    let data = this.valueData;
                    if ((checkId.indexOf(params.data.id) === -1) && (params.name === 'Idle')) {
                        data.forEach(t => {
                            if (t.id === params.data.id) {
                                t.name = 'Selected';
                                checkId.push(params.data.id);
                            }
                        });
                        this.dom.setOption(option);

                    } else if ((params.name === 'Selected') && (checkId.indexOf(params.data.id) > -1)) {
                        data.forEach((t, i) => {
                            if (t.id === params.data.id) {
                                t.name = 'Idle';
                            }
                        });
                        checkId.forEach((v, i) => {
                            if (v === params.data.id) {
                                checkId.splice(i, 1)
                            }
                        });
                        this.dom.setOption(option);
                    } else{
                        console.log("busy");
                        console.log(params);
                        console.log(checkId)
                    }

                    this.$xy.vector.$emit("updateData", data, checkId)
                })

            })
        },
        beforeDestroy() {
            off(window, 'resize', this.resize)
        },


    }
</script>
<style>
  .gantt-bar {
    width: 100px;
  }
</style>
