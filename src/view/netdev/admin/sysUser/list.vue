<template>
  <div style="height:100%;padding: 10px 10px">
    <Row>
      <Col :xs="24" :sm="24" :md="24" :lg="20">
        <search :search-data='searchData'></search>
      </Col>
      <Col :xs="24" :sm="24" :md="24" :lg="4">
        <Button v-if='defultPage' icon="md-add" style="float:right;margin-bottom: 10px;border: 0px" type="primary" @click="operate()">新增</Button>
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
    <Modal v-model="operateModal" width="1200" :title="name" footer-hide :mask-closable="false" :closable="false">
      <operate-row></operate-row>
    </Modal>
    <Modal v-model="detailModal" width="1200" :title="detailName" footer-hide :mask-closable="false" :closable="false">
      <detail-row></detail-row>
    </Modal>
  </div>
</template>

<script>
  import {queryUserList, deleteUser} from '@/api/admin/sysUser'
  import search from '@/components/tables/search'
  import operateRow from './operate'
  import detailRow from './detail'

  export default {
    components: {
      search,
      operateRow,
      detailRow,
    },
    data() {
      return {
        defultPage: false,
        operateModal: false,
        detailModal: false,
        name: '',
        detailName: '',
        columns1: [
          {
            title: '用户账号',
            key: 'userName',
            minWidth: 100
          },
          {
            title: '用户姓名',
            key: 'userChname',
            minWidth: 100
          },
          {
            title: '用户手机号',
            key: 'userPhone',
            minWidth: 140
          },
          {
            title: '用户邮箱',
            key: 'userEmail',
            minWidth: 160
          },
          {
            title: '用户状态',
            key: 'userStatus_paraName',
            minWidth: 100
          },
          {
            title: '操作',
            key: 'action',
            fixed: 'right',
            width: 190,
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
                      icon:'md-list',
                  },
                    attrs:{
                        title:'详情'
                    },
                    class:'edit_btn3',
                    style: {
                        marginRight: '10px',
                    },
                  on: {
                    click: () => {
                      this.showDetail(rows.row)
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
                      this.delete(rows.row.userId)
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
            key: 'userName',
            name: '用户名称',
            value: '',
            placeholder: '用户名称'
          },
          {
            type: 2,
            key: 'userType',
            name: '用户类型',
            value: '',
            data: [],
            placeholder: '用户类型'
          }
        ],
        search: {
          userName: '',
          userOrgid: this.$route.query.userOrgid,
          userType: this.$route.query.userType

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
      this.$xy.vector.$on('closeDetail', this.closeDetail)
      this.$xy.vector.$on('closeModal', this.closeModal)
      this.$xy.vector.$on('sendReq', this.sendReq)
    },
    beforeDestroy: function () {
      this.$xy.vector.$on('closeDetail', this.closeDetail)
      this.$xy.vector.$off('closeModal', this.closeModal)
      this.$xy.vector.$off('sendReq', this.sendReq)
    },
    mounted() {
      if (this.$route.query.userOrgid == null) {
        this.defultPage = true;
      }
      this.init();
      this.initSelect();
    },
    methods: {
      initSelect() {
        this.$xy.getParamGroup('0004').then(res => {
          this.searchData[1].data = res
          console.warn(2222)
          console.warn(res)
        })
      },
      rowClassName(row, index) {
        return 'demo-table-info-row'
      },
      closeModal() {
        this.operateModal = false;
        this.init()
      },
      closeDetail() {
        this.detailModal = false;
        this.init();
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
        let {result, success, message} = await queryUserList(searchAll)
        if (success) {
          this.infos = result.records
          this.current = result.current ? result.current : result.current + 1
          this.otherPage.total = result.total
        } else {
          this.$Notice.error({
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
        let {data, code, msg} = await deleteUser(id)
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
      operate(sysUser) {
        this.name = sysUser == null ? '添加用户' : '编辑用户'
        this.operateModal = true
        this.$xy.vector.$emit('operateRow', sysUser)
      },
      showDetail(sysUser) {
        this.detailName = '用户详情'
        this.detailModal = true
        this.$xy.vector.$emit('detailRow', sysUser)
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
