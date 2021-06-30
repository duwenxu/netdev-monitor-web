<template>
  <div style="height:100%;padding: 10px 10px">
    <Row>
      <Col :xs="24" :sm="24" :md="24" :lg="22">
        <search :search-data='searchData'></search>
      </Col>
      <Col :xs="24" :sm="24" :md="24" :lg="2">
        <Button icon="md-add" style="float:right;margin-bottom: 10px;border: 0px" type="primary" @click="operate()">新增</Button>
      </Col>
      <Col :xs="24" :sm="24" :md="24" :lg="24">
        <Table  :columns="columns1" :data="infos"></Table>
        <div class="text-right page">
          <Page :current.sync="current" :total="otherPage.total" :page-size='page.size'
                :page-size-opts='otherPage.pageSize'
                show-elevator @on-change='changePage'
                @on-page-size-change='skipPage'></Page>
        </div>
      </Col>
    </Row>
    <Modal v-model="operateModal" width="1000" :title="name" footer-hide :mask-closable="false" :closable="false">
      <operate-param></operate-param>
    </Modal>
  </div>
</template>

<script>
    import {queryParamList, deleteParam} from '@/api/admin/sysParam'
    import search from '@/components/tables/search'
    import operateParam from './operate'

    export default {
        components: {
            search,
            operateParam
        },
        data() {
            return {
                operateModal: false,
                name: '',
                columns1: [
                    {
                        title: '参数编码',
                        key: 'paraCode',
                        minWidth: 100,
                    },
                    {
                        title: '参数名称',
                        key: 'paraName',
                      minWidth: 120,
                    },
                    {
                        title: '上级编码',
                        key: 'paraParentId',
                      minWidth: 100,
                    },
                    {
                        title: '备注一',
                        key: 'remark1',
                      minWidth: 100,
                    },
                    {
                        title: '备注二',
                        key: 'remark2',
                      minWidth: 100,
                    },
                    {
                        title: '备注三',
                        key: 'remark3',
                      minWidth: 100,
                    },
                    {
                        title: '是否有效',
                        key: 'isValidate_paraName',
                      minWidth: 100,
                    },
                    {
                        title: '操作',
                        key: 'action',
                      width: 140,
                      fixed: 'right',
                        align: 'center',
                        render: (h, rows) => {
                            return h('div', [
                                h('Button', {
                                  props: {
                                      icon:'md-create',
                                  },
                                    attrs:{
                                        title:'编辑'
                                    },
                                    class:'edit_btn',
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
                                    },
                                    attrs:{
                                        title:'删除'
                                    },
                                    class:'edit_btn2',
                                    on: {
                                        click: () => {
                                            this.delete(rows.row.paraCode)
                                        }
                                    }
                                })
                            ])
                        }
                    }
                ],
                infos: [],
                searchData: [
                    {
                        type: 1,
                        key: 'paraName',
                        name: '参数名称',
                        value: '',
                        placeholder: '参数名称'
                    },
                    {
                        type: 1,
                        key: 'paraCode',
                        name: '参数编码',
                        value: '',
                        placeholder: '参数编码'
                    },
                    {
                        type: 1,
                        key: 'paraParentId',
                        name: '上级编码',
                        value: '',
                        placeholder: '上级编码'
                    },
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
                    paraCode: ''
                },
                current: 1,
                page: {
                    current: 1,
                    size: 8
                },
                otherPage: {
                    total: 0,
                    pageSize: [10, 20, 30]
                }
            }
        },
        created: function () {
            this.$xy.vector.$on('closeParam', this.closeParam)
            this.$xy.vector.$on('sendReq', this.sendReq)
        },
        beforeDestroy: function () {
            this.$xy.vector.$off('closeParam', this.closeParam)
            this.$xy.vector.$off('sendReq', this.sendReq)
        },
        mounted() {
            this.init();
            this.initSelect();
        },
        methods: {
            initSelect(){
                this.$xy.getParamGroup('0001').then(res=>{
                    this.searchData[3].data = res
                })
            },
            rowClassName(row, index) {
                return 'demo-table-info-row'
            },
            closeParam() {
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
                let {result, success, message} = await queryParamList(searchAll)
                if (success) {
                    this.infos = result.records
                    this.current = result.current ? result.current : result.current + 1
                    this.otherPage.total = result.total
                }else {
                    this.$Notice.error({
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
                that.$Modal.confirm({
                    title: '你确定要删除这条参数吗?',
                    content: '删除后将无法撤销！',
                    onOk: () => {
                        that.deleteData(id)
                    },
                    onCancel: () => {
                        that.$Notice.warning({
                            title: '取消',
                            desc: '已取消！',
                            duration: 3
                        })
                    }
                })
            },
            async deleteData(id) {
                let {data, code, msg} = await deleteParam(id)
                if (code == 200) {
                    this.$Notice.success({
                        title: '成功',
                        desc: '删除成功！',
                        duration: 3
                    })
                    this.init()
                } else {
                    this.$Notice.error({
                        title: '失败',
                        desc: msg,
                        duration: 3
                    })
                }
            },
            operate(sysParam) {
                this.name = sysParam == null ? '添加参数' : '编辑参数'
                this.operateModal = true
                this.$xy.vector.$emit('operateParam', sysParam)
            }
        }
    }
</script>

<style scoped>
  .text-right {
    text-align: right;
  }

  .page {
    margin-top: 5px;
  }
</style>
