<template>
    <div class="content-box">
        <Row>
          <Col :xs="24" :sm="24" :md="24" :lg="20">
            <search :search-data='searchData' @input="handleClick()"></search>
          </Col>
          <Col :xs="24" :sm="24" :md="24" :lg="4">
            <Button icon="ios-download-outline" style="float:right;margin-bottom: 10px;border: 0px" type="primary"
                    @click="exportData">导出
            </Button>
          </Col>
          <Col :xs="24" :sm="24" :md="24" :lg="24">
            <Table :columns="columns1" :data="infos" ref="logTable"></Table>
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
    import {queryOperLogPageByTime} from '@/api/monitor/OperLog'
    import search from '@/components/tables/search'
    import exportCsv from "../../../../components/tables/tables";

    export default {
        components: {
            search,
            exportCsv
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
                                title: '日志时间',
                                key: 'logTime',
                            },
                            {
                                title: '访问类型',
                                key: 'logAccessType_paraName',
                            },
                            {
                                title: '操作类型',
                                key: 'logOperType_paraName',
                            },
                            {
                                title: '操作对象',
                                key: 'logOperObjName',
                            },
                            {
                                title: '操作内容',
                                key: 'logOperContent',
                                tooltip:true
                            },
                            {
                                title: '原始数据',
                                key: 'orignData',
                                tooltip:true
                            },
                            {
                                title: '操作人',
                                key: 'logUserId',
                            },
                ],
                infos: [],
                searchData: [//搜索框根据需要自定义添加
                    {
                        type: 3,
                        key: ['startTime', 'endTime'],
                        name: '时间',
                        value: '',
                        long: 1,
                        placeholder: '请选择时间范围',
                    },
                    {
                        type: 1,
                        key: 'devNo',
                        name: '设备序号',
                        value: '',
                        data:[] ,
                        placeholder: '设备序号'
                    },
                ],
                search: {
                    startTime:'',
                    endTime:'',
                    devNo:'',
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
        },
        methods: {
            rowClassName(row, index) {
                return 'demo-table-info-row'
            },
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
                let {result, success, message} = await queryOperLogPageByTime(searchAll)
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
            //导出
            async exportData() {
                if (this.infos.length) {
                    if (this.infos.length > 500) {
                        this.$Notice.error({
                            title: '查询到的条数过多',
                            desc: '查询到的日志条数不得超过500条，请您重新选择查询条件',
                            duration: 5
                        })
                    } else {
                        this.$refs.logTable.exportCsv({
                            filename: "日志信息列表",
                            original: false,
                            columns: this.columns1,
                            data: this.infos
                        });
                    }
                } else {
                    this.$Message.info("表格数据不能为空！")
                }
            },
            //搜索框填充数据方法
            handleClick(data, item) {
                if (data.key == 'devNo') {
                    this.search.devNo = data.value
                }
                if (data.key == 'startTime') {
                    this.search.startTime = data.value
                }
                if (data.key == 'endTime') {
                    this.search.endTime = data.value
                }
                this.init();
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
