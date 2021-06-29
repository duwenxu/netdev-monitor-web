<template>
    <div class="content-box">
        <Row>
          <Col :xs="24" :sm="24" :md="24" :lg="20">
            <search :search-data='searchData' @input="handleClick()"></search>
          </Col>
          <Col :xs="24" :sm="24" :md="24" :lg="4">
            <Button icon="ios-download-outline" style="float:right;margin-bottom: 10px;border: 0px" type="primary" @click="exportData">导出</Button>
          </Col>
          <Col :xs="24" :sm="24" :md="24" :lg="24">
            <Table  :columns="columns1" :data="infos" ref="alterTable"></Table>
            <div class="text-right page">
                <Page :current.sync="page.current" :total="otherPage.total" :page-size='page.size'
                      :page-size-opts='otherPage.pageSize'
                      show-elevator @on-change='changePage'
                      @on-page-size-change='skipPage'></Page>
            </div>
          </Col>
        </Row>
    </div>
</template>

<script>
    import {queryAlertInfoPageByTime} from '@/api/monitor/AlertInfo'
    import search from '@/components/tables/search'
    import exportCsv from "../../../../components/tables/tables";

    export default {
        components: {
            search,
            exportCsv,
        },
        data() {
            return {
                columns1: [
                            {
                                title: '设备类型',
                                key: 'devType_paraName',
                            },
                            {
                                title: '设备编号',
                                key: 'devNo',
                            },
                            {
                                title: '参数编号',
                                key: 'ndpaNo',
                            },
                            {
                                title: '告警个数',
                                key: 'alertNum',
                            },
                            {
                                title: '告警时间',
                                key: 'alertTime',
                                width: 180
                            },
                            {
                                title: '站号',
                                key: 'alertStationNo',
                            },
                            {
                                title: '告警级别',
                                key: 'alertLevel_paraName',
                            },
                            {
                                title: '告警描述',
                                key: 'alertDesc',
                                width: 400
                            },
                ],
                infos: [],
                searchData: [//搜索框根据需要自定义添加
                    {
                        type: 2,
                        key: 'devType',
                        name: '设备类型',
                        value: '',
                        data:[] ,
                        placeholder: '设备类型'
                    },
                    {
                        type: 3,
                        key: ['startTime', 'endTime'],
                        name: '时间',
                        value: '',
                        long: 1,
                        placeholder: '请选择时间范围',
                    },
                ],
                search: {
                    startTime:'',
                    endTime:'',
                    devType:'',
                },
                page: {
                    current: 1,
                    size: 10
                },
                otherPage: {
                    total: 0,
                    pageSize: [10, 20, 30]
                }
            }
        },
        created: function () {
            this.$xy.vector.$on('closeModal', this.closeModal)
            this.$xy.vector.$on('sendReq', this.sendReq)
        },
        beforeDestroy: function () {
            this.$xy.vector.$off('closeModal', this.closeModal)
            this.$xy.vector.$off('sendReq', this.sendReq)
        },
        mounted() {
            this.init();
            this.initSelect()
        },
        methods: {
            rowClassName(row, index) {
                return 'demo-table-info-row'
            },
            //查询按钮方法
            sendReq: function (obj) {
                this.search = Object.assign(this.search, obj)
                this.init()
            },
            async init() {
                this.page.current = 1;
                this.doQuery();
            },
            async doQuery() {
                let searchAll = this.page
                searchAll = Object.assign(searchAll, this.search)
                let {result, success, message} = await queryAlertInfoPageByTime(searchAll)
                if (success) {
                    this.infos = result.records
                    this.page.current = result.current ? result.current : result.current + 1
                    this.otherPage.total = result.total
                }else {
                    let notice = this.$Notice;
                    notice.error({
                    title: '失败',
                    desc: message,
                    duration: 3
                    })
                };
            },
            skipPage: function (page) {
                this.page.current = page
                this.doQuery()
            },
            changePage(page) {
                this.page.current = page
                this.doQuery()
            },
            //搜索框填充数据方法
            handleClick(data, item) {
                if (data.key == 'devType') {
                    this.search.devType = data.value
                }
                if (data.key == 'startTime') {
                    this.search.startTime = data.value
                }
                if (data.key == 'endTime') {
                    this.search.endTime = data.value
                }
                this.init();
            },
            //导出
            async exportData() {
                if (this.infos.length) {
                    if (this.infos.length > 500) {
                        this.$Notice.error({
                            title: '查询到的条数过多',
                            desc: '查询到的告警条数不得超过500条，请您重新选择查询条件',
                            duration: 5
                        })
                    } else {
                        this.$refs.alterTable.exportCsv({
                            filename: "告警信息列表",
                            original: false,
                            columns: this.columns1,
                            data: this.infos
                        });
                    }
                } else {
                    this.$Message.info("表格数据不能为空！")
                }
            },
            initSelect() {
                this.$xy.getParamGroup('0020').then(res => {
                    this.searchData[0].data = res.filter(value => {
                        return value.status == '0001001'
                    })
                })
            },
        }
    }
</script>

<style scoped>
    .text-right {
        text-align: right;
    }

    .page {
        margin-top: 20px;
    }
</style>
