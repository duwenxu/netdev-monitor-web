<template>
    <div class="content-box">
        <Row>
            <Button icon="md-add" style="float:right;margin-bottom: 10px;border: 0px" type="primary" @click="operate()">新增</Button>
            <search :search-data='searchData'></search>
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
        <Modal v-model="operateModal" width="1000" :title="name" footer-hide :mask-closable="false" :closable="false">
            <operate-row></operate-row>
        </Modal>
    </div>
</template>

<script>
    import {queryPrtclFormatPageList, deletePrtclFormat} from '@/api/monitor/PrtclFormat'
    import search from '@/components/tables/search'
    import operateRow from './operate'

    export default {
        components: {
            search,
            operateRow
        },
        data() {
            return {
                operateModal: false,
                name: '',
                columns1: [
                            {title: '格式ID',
                              key: 'fmtId',
                              width: 100
                            },
                            {
                                title: '设备类型',
                                key: 'devType_paraName',
                                width: 100
                            },
                            {
                                title: '查询关键字',
                                key: 'fmtSkey',
                                width: 100
                            },
                            {
                                title: '控制关键字',
                                key: 'fmtCkey',
                                width: 100
                            },
                            {
                                title: '控制响应关键字',
                                key: 'fmtCckey',
                                width: 100
                            },
                            {
                                title: '查询响应关键字',
                                key: 'fmtSckey',
                                width: 100
                            },
                            {
                                title: '查询响应条数',
                                key: 'fmtScNum',
                                width: 100
                            },
                            {
                                title: '控制响应条数',
                                key: 'fmtCcNum',
                                width: 100
                            },
                            {
                                title: '格式处理类',
                                key: 'fmtHandlerClass',
                                width: 100
                            },
                            {
                                title: '查询响应类型',
                                key: 'fmtScType',
                                width: 100
                            },
                            {
                                title: '控制响应类型',
                                key: 'fmtCcType',
                                width: 100
                            },
                            {
                                title: '操作',
                                key: 'action',
                                width: 180,
                                align: 'center',
                                render: (h, rows) => {
                                    return h('div', [
                                        h('Button', {
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
                                        }),
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
                                                    this.delete(rows.row.PrtclFormatId)//id需要修改
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
                        type: 2,
                        key: 'isValidate',
                        name: '是否有效',
                        value: '',
                        data:[] ,
                        placeholder: '是否有效'
                    }
                ],
                search: {

                },
                current: 1,
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
                let {result, success, message} = await queryPrtclFormatPageList(searchAll)
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
                title: '你确定要删除这条协议格式吗?',
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
                let {data, code, msg} = await deletePrtclFormat(id)
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
            operate(PrtclFormat) {
                this.name = PrtclFormat == null ? '添加协议格式' : '编辑协议格式'
                this.operateModal = true
                this.$xy.vector.$emit('operateParam', PrtclFormat)
            }
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
