<template>
  <div style="height:100%;padding: 10px 10px">
    <Row>
      <Col :xs="24" :sm="24" :md="24" :lg="20">
        <search :search-data='searchData'></search>
      </Col>
      <Col :xs="24" :sm="24" :md="24" :lg="4">
        <Button icon="md-add" style="float:right;margin-bottom: 10px;border: 0px" type="primary" @click="operate()">新增</Button>
      </Col>
      <Col :xs="24" :sm="24" :md="24" :lg="24">
        <Table :columns="columns1" :data="infos"></Table>
        <div class="text-right page">
          <Page :current.sync="current" :total="otherPage.total" :page-size='page.size'
                :page-size-opts='otherPage.pageSize'
                show-elevator @on-change='changePage'
                @on-page-size-change='skipPage'></Page>
        </div>
      </Col>
    </Row>
    <Modal v-model="operateModal" width="80%" :title="name" footer-hide :mask-closable="false" :closable="false">
      <operate-row></operate-row>
    </Modal>
  </div>
</template>

<script>
    import {queryDepartList, deleteDepart} from '@/api/admin/sysDepart'
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
                    {
                        title: '部门名称',
                        key: 'departName',
                        minWidth: 100,
                    },
                    {
                        title: '部门代号',
                        key: 'departCode',
                        minWidth: 100,
                    },
                    {
                        title: '部门状态',
                        key: 'departStatus_paraName',
                        minWidth: 100,
                    },
                    {
                        title: '创建人',
                        key: 'departUesrid_userName',
                        minWidth: 100,
                    },
                    {
                        title: '创建日期',
                        key: 'departDate',
                        minWidth: 170,
                    },
                    {
                        title: '操作',
                        key: 'action',
                        width: 190,
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
                                        icon:'md-person',
                                    },
                                    attrs:{
                                        title:'用户'
                                    },
                                    class:'edit_btn3',
                                    style: {
                                        marginRight: '10px',
                                    },
                                    on: {
                                        click: () => {
                                            this.openUserList(rows.row.departId)
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
                                            this.delete(rows.row.departId)
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
                        key: 'departName',
                        name: '部门名称',
                        value: '',
                        placeholder: '部门名称'
                    }
                ],
                search: {
                    departName: ''
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
            //this.initSelect();
        },
        methods: {
            /*initSelect(){
                this.$xy.getParamGroup('0001').then(res=>{
                    this.searchData[3].data = res
                })
            },*/
            rowClassName(row, index) {
                return 'demo-table-info-row'
            },
            closeModal() {
                this.operateModal = false;
                this.init()
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
                let {result, success, message} = await queryDepartList(searchAll)
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
                    }
                })
            },
            async deleteData(id) {
                let {data, code, msg} = await deleteDepart(id)
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
            operate(sysDepart) {
                this.name = sysDepart == null ? '添加部门' : '编辑部门'
                this.operateModal = true
                this.$xy.vector.$emit('operateRow', sysDepart)
            },
            openUserList(departId){
                this.$router.push({
                    name: 'sysuserManagement',
                    query: {
                        userOrgid:departId,
                        userType:'0004002'
                    }
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
    margin-top: 5px;
  }
</style>
