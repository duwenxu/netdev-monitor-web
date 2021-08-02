<template>
  <div class="content-box">
    <Row>
      <Col :xs="24" :sm="24" :md="24" :lg="20">
        <search :search-data='searchData'></search>
      </Col>
      <Col :xs="24" :sm="24" :md="24" :lg="4">
        <Button icon="md-add" style="float:right;margin-bottom: 10px;border: 0px;margin-left: 0px" type="primary"
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
    <Modal v-model="operateModal" width="80%"  :title="name" footer-hide :mask-closable="false" :closable="false">
      <operate-row></operate-row>
    </Modal>
  </div>
</template>

<script>
    import {querySpacePresetPageList, deleteSpacePreset} from '@/api/monitor/NtdvSpacePreset'
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
                        title: '预置卫星代号',
                        key: 'spCode',
                        width: 140
                    },
                    {
                        title: '预置卫星名称',
                        key: 'spName',
                        width: 140
                    },
                    {
                        title: '卫星经度',
                        key: 'spLongitude',
                        width: 120
                    },
                    {
                        title: '本振',
                        key: 'spLocalOscillator_paraName',
                        width: 120
                    },
                    {
                        title: '信标频率',
                        key: 'spBeaconFrequency',
                        width: 140
                    },
                    {
                        title: '极化方向',
                        key: 'spPolarization_paraName',
                        width: 140
                    },
                    {
                        title: '备注一',
                        key: 'spRemark1',
                        width: 140
                    },
                    {
                        title: '备注二',
                        key: 'spRemark2',
                        width: 140
                    },
                    {
                        title: '备注三',
                        key: 'spRemark3',
                        width: 140
                    },
                    {
                        title: '备注四',
                        key: 'spRemark4',
                        width: 140
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
                                            this.delete(rows.row.spId)//id需要修改
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
                        key: 'spCode',
                        name: '',
                        value: '',
                        data: [],
                        placeholder: '请输入预置卫星代号'
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
                let {result, success, message} = await querySpacePresetPageList(searchAll)
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
            delete(spId) {
                let that = this
                let modal = that.$Modal;
                let notice = that.$Notice;
                modal.confirm({
                    title: '你确定要删除这条卫星预置信息吗?',
                    content: '删除后将无法撤销！',
                    onOk: () => {
                        that.deleteData(spId)
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
            async deleteData(spId) {
                let {data, code, msg} = await deleteSpacePreset(spId)
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
            operate(SpacePreset) {
                this.name = SpacePreset == null ? '添加卫星预置信息' : '编辑卫星预置信息'
                this.operateModal = true
                this.$xy.vector.$emit('operateRow', SpacePreset)
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
