<template>
  <div class="content-box">
    <Row>
      <Col :xs="24" :sm="24" :md="24" :lg="20">
        <search :search-data='searchData'></search>
      </Col>
      <Col :xs="24" :sm="24" :md="24" :lg="4">
        <Button icon="md-add" style="float:right;margin-bottom: 10px;border: 0px" type="primary" @click="operate()">新增</Button>
      </Col>
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
  import {querySubParaInfoPageList, deleteParaInfo} from '@/api/monitor/ParaInfo'
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
            title: '格式ID',
            key: 'fmtId',
            width: 80
          },
          {
            title: '参数编号',
            key: 'ndpaNo',
            width: 100
          },
          {
            title: '上级参数编号',
            key: 'ndpaParentNo',
            width: 100
          },
          {
            title: '参数编码',
            key: 'ndpaCode',
            width: 110

          },
          {
            title: '参数名称',
            key: 'ndpaName',
            tooltip: true,
            width: 150
          },
          {
            title: '设备类型',
            key: 'devType_paraName',
            width: 100
          },
          {
            title: '访问权限',
            key: 'ndpaAccessRight_paraName',
            width: 100
          },
          {
            title: '参数单位',
            key: 'ndpaUnit',
            width: 100
          },
          {
            title: '参数数据类型',
            key: 'ndpaDatatype_paraName',
            width: 100
          },
          {
            title: '参数长度',
            key: 'ndpaStrLen',
            width: 100
          },
          {
            title: '显示模式',
            key: 'ndpaShowMode_paraName',
            width: 100
          },
          {
            title: '最大值',
            key: 'ndpaValMax',
            width: 100
          },
          {
            title: '最小值',
            key: 'ndpaValMin',
            width: 100
          },
          {
            title: '步进',
            key: 'ndpaValStep',
            width: 100
          },
          {
            title: '下拉值域',
            key: 'ndpaSelectData',
            tooltip: true,
            width: 100
          },
          {
            title: '字节长度',
            key: 'ndpaByteLen',
            width: 100
          },
          {
            title: '命令标识',
            key: 'ndpaCmdMark',
            width: 100
          },
          {
            title: '参数状态',
            key: 'ndpaStatus_paraName',
            width: 100
          },
          {
            title: '供54所访问',
            key: 'ndpaOutterStatus_paraName',
            width: 100
          },
          {
            title: '数据映射规则',
            key: 'ndpaTransRule',
            tooltip: true,
            width: 100
          },
          {
            title: '状态上报类型',
            key: 'ndpaAlertPara_paraName',
            width: 100
          },
          {
            title: '报警级别',
            key: 'ndpaAlertLevel_paraName',
            width: 100
          },
          {
            title: '拼装样式',
            key: 'ndpaSpellFmt',
            width: 100
          },
          {
            title: '显示样式',
            key: 'ndpaViewFmt',
            width: 100
          },
          {
            title: '复杂级别',
            key: 'ndpaCmplexLevel_paraName',
            width: 100
          },
          {
            title: '缺省值',
            key: 'ndpaDefaultVal',
            width: 100
          },
          {
            title: '关联类型',
            key: 'ndpaLinkType_paraName',
            width: 100
          },
          {
            title: '关联参数编码',
            key: 'ndpaLinkCode',
            width: 100
          },
          {
            title: '关联值',
            key: 'ndpaLinkVal',
            width: 100
          },
          {
            title: '是否在拓扑图显示',
            key: 'ndpaIsTopology',
            width: 150,
            render:(h,params) =>{
                return h('span',params.row.ndpaIsTopology == true ? '是':'否');
            }
          },
          {
            title: '操作',
            key: 'action',
            width: 220,
            fixed: 'right',
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
                  style: {
                    marginRight: '10px',
                  },
                  on: {
                    click: () => {
                      this.delete(rows.row.ndpaId)//id需要修改
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
            key: 'ndpaName',
            name: '参数名称',
            value: '',
            data:[] ,
            placeholder: '参数名称'
          },
          {
            type: 2,
            key: 'devType',
            name: '设备类型',
            value: '',
            data:[] ,
            placeholder: '设备类型'
          },
          {
            type: 2,
            key: 'ndpaAlertPara',
            name: '上报类型',
            value: '',
            data:[] ,
            placeholder: '状态上报类型'
          },
          {
            type: 2,
            key: 'ndpaAlertLevel',
            name: '告警级别',
            value: '',
            data:[] ,
            placeholder: '告警级别'
          },

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
      this.initSelect();
    },
    methods: {
      initSelect() {
        this.$xy.getParamGroup('0020').then(res => {
          this.searchData[1].data = res
        })
        this.$xy.getParamGroup('0029').then(res => {
          this.searchData[2].data = res
        })
        this.$xy.getParamGroup('0021').then(res => {
          this.searchData[3].data = res
        })
      },
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
        searchAll.ndpaParentNo = this.$route.query.ndpaNo
        searchAll.devType = this.$route.query.devType
        searchAll = Object.assign(searchAll, this.search)
        let {result, success, message} = await querySubParaInfoPageList(searchAll)
        if (success) {
          this.infos = result.records
          //将是否展示在拓扑图数据值转换   否则不好处理
          this.infos.forEach(value => {
             value.ndpaIsTopology = value.ndpaIsTopology == true ? '1' : '0';
          })
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
        let modal = that.$Modal;
        let notice = that.$Notice;
        modal.confirm({
          title: '你确定要删除这条设备参数吗?',
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
        let {data, code, msg} = await deleteParaInfo(id)
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
      operate(ParaInfo) {
        this.name = ParaInfo == null ? '添加设备参数' : '编辑设备参数'
        this.operateModal = true
        this.$xy.vector.$emit('operateRow', ParaInfo)
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
