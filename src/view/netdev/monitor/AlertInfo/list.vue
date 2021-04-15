<template>
    <div class="content-box">
        <Row>
            <!--<Button icon="md-add" style="float:right;margin-bottom: 10px;border: 0px" type="primary" @click="operate()">新增</Button>-->
            <Button icon="ios-download-outline" style="float:right;margin-bottom: 10px;border: 0px" type="primary" @click="exportData">导出</Button>
            <search :search-data='searchData' @input="handleClick()"></search>
            <Col :xs="24" :sm="24" :md="24" :lg="24">
            <Table  :columns="columns1" :data="infos"></Table>
            <div class="text-right page">
                <Page :current.sync="page.current" :total="otherPage.total" :page-size='page.size'
                      :page-size-opts='otherPage.pageSize'
                      show-elevator @on-change='changePage'
                      @on-page-size-change='skipPage'></Page>
            </div>
            </Col>
        </Row>
        <!--<Modal v-model="operateModal" width="1000" :title="name" footer-hide :mask-closable="false" :closable="false">
            <operate-row></operate-row>
        </Modal>-->
    </div>
</template>

<script>
    import {queryAlertInfoPageList, deleteAlertInfo,queryAlertInfoPageByTime} from '@/api/monitor/AlertInfo'
    import search from '@/components/tables/search'
    /*import operateRow from './operate'*/

    export default {
        components: {
            search,
            /*operateRow*/
        },
        data() {
            return {
                /*operateModal: false,
                name: '',*/
                columns1: [
                            {
                                title: '设备类型',
                                key: 'devType',
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
                            },
                            {
                                title: '站号',
                                key: 'alertStationNo',
                            },
                            {
                                title: '告警级别',
                                key: 'alertLevel',
                            },
                            {
                                title: '告警描述',
                                key: 'alertDesc',
                            },
                            {
                                title: '操作',
                                key: 'action',
                                width: 180,
                                align: 'center',
                                render: (h, rows) => {
                                    return h('div', [
                                        /*h('Button', {
                                            props: {
                                                icon:'md-create',
                                                type: 'primary'
                                            },
                                            attrs:{
                                                title:'编辑'
                                            },
                                            style: {
                                                marginRight: '10px',
                                            },
                                            on: {
                                                click: () => {
                                                    this.operate(rows.row)
                                                }
                                            }
                                        }),*/
                                        h('Button', {
                                            props: {
                                                icon:'md-trash',
                                                type: 'error'
                                            },
                                            attrs:{
                                                title:'删除'
                                            },
                                            on: {
                                                click: () => {
                                                    this.delete(rows.row.AlertInfoId)//id需要修改
                                                }
                                            }
                                        })
                                    ])
                                }
                            }
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
            closeModal() {
                this.operateModal = false
                this.doQuery();
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
                //let {result, success, message} = await queryAlertInfoPageList(searchAll)
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
            delete(id) {
                let that = this
                let modal = that.$Modal;
                let notice = that.$Notice;
                modal.confirm({
                title: '你确定要删除这条告警信息吗?',
                content: '删除后将无法撤销！',
                onOk: () => {
                that.deleteData(id)
                },
                onCancel: () => {
                    notice.warning({
                        title: '取消',
                        desc: '已取消！',
                        duration: 3
                    })
                }
                })
            },
            async deleteData(id) {
                let {data, code, msg} = await deleteAlertInfo(id)
                let notice = this.$Notice;
                if (code == 200) {
                    notice.success({
                    title: '成功',
                    desc: '删除成功！',
                    duration: 3
                    })
                    this.doQuery();
                } else {
                    notice.error({
                    title: '失败',
                    desc: msg,
                    duration: 3
                    })
                }
            },
            /*operate(AlertInfo) {
                this.name = AlertInfo == null ? '添加告警信息' : '编辑告警信息'
                this.operateModal = true
                this.$xy.vector.$emit('operateRow', AlertInfo)
            },*/
            //按照检索条件分页查询告警信息
            async queryAlertInfoPageByTime() {
                let searchAll = this.page
                searchAll = Object.assign(searchAll, this.search)
                let {result, success, message} = await queryAlertInfoPageByTime(searchAll)
                if (success) {
                    this.infos = result.records
                    this.page.current = result.current ? result.current : result.current + 1
                    this.otherPage.total = result.total
                } else {
                    let notice = this.$Notice;
                    notice.error({
                        title: '查询失败',
                        desc: message,
                        duration: 3
                    })
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
                        this.$refs.selection.exportCsv({
                            filename: "告警信息列表列表",
                            original: false,
                            columns: this.columns1,
                            data: this.infos
                        });
                    }
                } else {
                    this.$Message.info("表格数据不能为空！")
                }
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
