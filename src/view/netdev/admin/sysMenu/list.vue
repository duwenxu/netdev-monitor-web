<template>
  <div style="height:100%;padding: 10px 10px">
    <Row>
      <Col :xs="24" :sm="24" :md="24" :lg="20">
        <search :search-data='searchData'></search>
      </Col>
      <Col :xs="24" :sm="24" :md="24" :lg="4">
        <Button icon="md-add" style="float:right;margin-bottom: 10px;border: 0px" type="primary" @click="operate(0,null)">新增</Button>
      </Col>
      <Col :xs="24" :sm="24" :md="24" :lg="24">
       <template>
          <Table row-key="menuId" :load-data="handleLoadData" :columns="columns1" :data="infos" ></Table>
        </template>
      </Col>
    </Row>
    <Modal v-model="operateModal" width="1000" :title="name" footer-hide :mask-closable="false" :closable="false">
      <operate-row></operate-row>
    </Modal>
  </div>
</template>

<script>
  import {queryMenuInfo,deleteMenu} from '@/api/admin/sysMenu'
  import search from '@/components/tables/search'
  import operateRow from './operate'

  export default {
    components: {
      search,
      operateRow,
    },
    data() {
      return {
        operateModal: false,
        name: '',
        columns1: [
          {
            title: '菜单名称',
            key: 'menuTitle',
            minWidth: 120,
            tree: true
          },
          {
            title: '菜单类型',
            key: 'menuType',
            minWidth: 100,
            render:(h,rows) =>{
              return h('div',rows.row.menuType == 0 ? '一级菜单' : '子菜单')
            }
          },
          {
            title: '图标',
            key: 'menuIcon',
            minWidth: 140,
          },
          {
            title: '组件',
            key: 'menuComponent',
            minWidth: 300,
          },
          {
            title: '路径',
            key: 'menuPath',
            minWidth: 160,
          },
          {
            title: '排序',
            key: 'menuSeq',
            minWidth: 100,
          },
          {
              title: '操作',
              key: 'action',
              width: 190,
              fixed:'right',
              type: 'template',
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
                                  this.operate(rows.row.menuId,rows.row)
                              }
                          }
                      }),
                      h('Button', {
                          props: {
                              icon:'md-filing',
                          },
                          attrs:{
                              title:'添加子菜单'
                          },
                          class:'edit_btn3',
                          style: {
                              marginRight: '10px',
                          },
                          on: {
                              click: () => {
                                  this.operate(rows.row.menuId,null)
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
                                  this.delete(rows.row)
                              }
                          }
                      })
                  ])
              }
          }
        ],
        infos: [],
        subNode:[],
        searchData: [
          {
            type: 1,
            key: 'menuTitle',
            name: '菜单名称',
            value: '',
            placeholder: '菜单名称'
          }
        ],
        search: {
          menuParentId: 0
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
        this.operateModal = false;
        this.init()
      },
      sendReq: function (obj) {
        this.search = Object.assign(this.search, obj)
        this.init()
      },
      handleLoadData(item, callback) {
        this.search.menuParentId = item.menuId;
        this.queryMenuSubNode();
        setTimeout(() => {
          callback(this.subNode);
        }, 300);
      },
      async init() {
        this.queryMenuTopNode();
      },
      async queryMenuTopNode() {
        this.search.menuParentId = 0;
        let searchAll = Object.assign(this.search)
        let {result, success, message} = await queryMenuInfo(searchAll)
        if (success) {
          this.infos = result.menu
        } else {
          this.$Notice.error({
            title: '失败',
            desc: message,
            duration: 3
          })
        };
      },
      async queryMenuSubNode() {
        let searchAll = Object.assign(this.search)
        let {result, success, message} = await queryMenuInfo(searchAll)
        if (success) {
          this.subNode =  result.menu;
        } else {
          this.$Notice.error({
            title: '失败',
            desc: message,
            duration: 3
          })
        };
      },
      delete(row) {
        let that = this
        that.$Modal.confirm({
          title: '你确定要删除这条参数吗?',
          content: '删除后将无法撤销！',
          onOk: () => {
            that.deleteData(row)
          }
        })
      },
      async deleteData(row) {
        let {result, success, message} = await deleteMenu(row)
        if (success) {
          this.$Notice.success({
            title: '成功',
            desc: '删除成功！',
            duration: 3
          })
          this.init()
        } else {
          this.$Notice.error({
            title: '失败',
            desc: message,
            duration: 3
          })
        }
      },
      operate(prentId,sysMenu) {
        let obj = {};

        if(sysMenu == null){
          obj["isUpd"] = false;
          this.name = '添加角色'
          sysMenu = {};
          sysMenu.menuParentId = prentId;
        }else{
          obj["isUpd"] = true;
          this.name = '编辑角色'
        }
        obj["sysMenu"] = sysMenu;
        this.operateModal = true;
        this.$xy.vector.$emit('operateRow', obj)
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
