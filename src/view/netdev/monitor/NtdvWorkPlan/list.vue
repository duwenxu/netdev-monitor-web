<template>
  <div class="content-box">
    <Row>
      <Col :xs="24" :sm="24" :md="24" :lg="20">
        <search :search-data='searchData'></search>
      </Col>
      <Col :xs="24" :sm="24" :md="24" :lg="4">
        <Button icon="md-add" style="float:right;margin-bottom: 10px;border: 0px;margin-left: 800px" type="primary"
                @click="operate()">新增
        </Button>
      </Col>
      <Col :xs="24" :sm="24" :md="24" :lg="24">
        <Table :columns="columns1" :data="infos"></Table>
        <div class="text-right page">
          <Page :current.sync="page.current" :total="otherPage.total" :page-size='page.size'
                :page-size-opts='otherPage.pageSize'
                show-elevator @on-change='changePage'
                @on-page-size-change='skipPage'></Page>
        </div>
      </Col>
    </Row>
    <Modal v-model="operateModal"  :title="name" footer-hide :mask-closable="false" :closable="false">
      <operate-row></operate-row>
    </Modal>
  </div>
</template>

<script>
    import {queryWorkPlanPageList, deleteWorkPlan} from '@/api/monitor/NtdvWorkPlan'
    import search from '@/components/tables/searchCheck'
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
                    {
                        title: '计划值班人员',
                        key: 'wpName',
                        width: 350
                    },
                    {
                        title: '值班开始时间',
                        key: 'wpStartTime',
                        width: 350
                    },
                    {
                        title: '值班结束时间',
                        key: 'wpEndTime',
                        width: 350
                    },
                    {
                        title: '状态',
                        key: 'wpStatus_paraName',
                    },
                    {
                        title: '操作',
                        key: 'action',
                        width: 260,
                        fixed: 'right',
                        align: 'center',
                        render: (h, rows) => {
                            return h('div', [
                                h('Button', {
                                    props: {
                                        icon: 'md-create',
                                        type: 'primary'
                                    },
                                    attrs: {
                                        title: '编辑'
                                    },
                                    style: {
                                        marginRight: '30px',
                                    },
                                    on: {
                                        click: () => {
                                            this.operate(rows.row)
                                        }
                                    }
                                }),
                                h('Button', {
                                    props: {
                                        icon: 'md-trash',
                                        type: 'error'
                                    },
                                    attrs: {
                                        title: '删除'
                                    },
                                    on: {
                                        click: () => {
                                            this.delete(rows.row.wpId)//id需要修改
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
                        type: 1,
                        key: 'wpName',
                        name: '',
                        value: '',
                        data: [],
                        placeholder: '请输入计划值班人员'
                    },
                ],
                search: {
                    wpStatus:'0001001'
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
                let {result, success, message} = await queryWorkPlanPageList(searchAll)
                if (success) {
                    this.infos = result.records
                    this.page.current = result.current ? result.current : result.current + 1
                    this.otherPage.total = result.total
                } else {
                    let notice = this.$Notice;
                    notice.error({
                        title: '失败',
                        desc: message,
                        duration: 3
                    })
                }
                ;
            },
            skipPage: function (page) {
                this.page.current = page
                this.doQuery()
            },
            changePage(page) {
                this.page.current = page
                this.doQuery()
            },
            delete(wpId) {
                let that = this
                let modal = that.$Modal;
                let notice = that.$Notice;
                modal.confirm({
                    title: '你确定要删除这条值班安排吗?',
                    content: '删除后将无法撤销！',
                    onOk: () => {
                        that.deleteData(wpId)
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
            async deleteData(wpId) {
                let {data, code, msg} = await deleteWorkPlan(wpId)
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
            operate(WorkPlan) {
                this.name = WorkPlan == null ? '添加值班安排' : '编辑值班安排'
                this.operateModal = true
                this.$xy.vector.$emit('operateRow', WorkPlan)
            },
            initSelect() {
                this.$xy.getParamGroup('0303').then(res => {
                    this.searchData[1].data = res
                    this.doQuery()
                })
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
