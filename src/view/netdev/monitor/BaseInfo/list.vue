<template>
    <div class="content-box">
        <Row>
            <search :search-data='searchData'></search>
            <Button icon="ios-download-outline" style="float:right;margin-bottom: 10px;margin-left: 10px;border: 0px" type="success" @click="downFile">下载</Button>
            <Button icon="md-add" style="float:right;margin-bottom: 10px;border: 0px;margin-left: 490px" type="primary" @click="operate()">新增</Button>
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
    import {queryBaseInfoPageList, deleteBaseInfo,downDevFile} from '@/api/monitor/BaseInfo'
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
                              title: '设备编号',
                              key: 'devNo',
                              width: 150
                            },
                            {
                                title: '设备类型',
                                key: 'devType_paraName',
                                width: 150
                            },
                            {
                                title: '设备名称',
                                key: 'devName',
                                width: 180
                            },
                            {
                                title: '设备状态',
                                key: 'devStatus_paraName',
                                width: 100
                            },
                            {
                                title: '设备所属公司',
                                key: 'devCorp_paraName',
                                width: 190
                            },
                            {
                                title: '设备版本',
                                key: 'devVer',
                                width: 100
                            },
                            {
                                title: '设备IP地址',
                                key: 'devIpAddr',
                                width: 150
                            },
                            {
                                title: '设备内部地址',
                                key: 'devLocalAddr',
                                width: 100
                            },
                            {
                                title: '设备端口',
                                key: 'devPort',
                                width: 100
                            },
                            {
                                title: '上级设备编号',
                                key: 'devParentNo',
                                width: 120
                            },
                            {
                                title: '设备访间隔时间(毫秒)',
                                key: 'devIntervalTime',
                                width: 100
                            },
                            {
                              title: '网络协议',
                              key: 'devNetPtcl_paraName',
                              width: 100
                            },
                            {
                              title: '设备部署类型',
                              key: 'devDeployType_paraName',
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
                                                  console.log('-----------'+rows.row.devNo)
                                                    this.delete(rows.row.devNo)//id需要修改
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
                    type:2,
                    key:'devType',
                    name:'设备类型',
                    value:'',
                    data:[],
                    placeholder:'请输入设备类型'
                  },
                  {
                    type:1,
                    key:'devName',
                    name:'设备名称',
                    value:'',
                    data:[],
                    placeholder:'请输入设备名称'
                  },
                  {
                    type:2,
                    key:'devCorp',
                    name:'设备所属公司',
                    value:'',
                    data:[],
                    placeholder:'请输入设备所属公司'
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
            rowClassName(row, index) {
                return 'demo-table-info-row'
            },
            closeModal() {
                this.operateModal = false
                this.doQuery();
            },
            sendReq: function (obj) {
              console.warn(666)
              console.warn(obj)
                this.search = Object.assign(this.search, obj)
                this.init()
            },
            async init() {
                /*this.page.current = 0;*/
                this.page.current = 1;
                /*this.page.current = 2;*/
                this.doQuery();
            },
            async doQuery() {
                let searchAll = this.page
                searchAll = Object.assign(searchAll, this.search)
                let {result, success, message} = await queryBaseInfoPageList(searchAll)
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
            delete(devNo) {
                let that = this
                let modal = that.$Modal;
                let notice = that.$Notice;
                modal.confirm({
                title: '你确定要删除这条设备信息吗?',
                content: '删除后将无法撤销！',
                onOk: () => {
                that.deleteData(devNo)
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
            async deleteData(devNo) {
                let {data, code, msg} = await deleteBaseInfo(devNo)
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
            //下载所有设备模型定义文件
            async downFile(){
                await downDevFile().then(res=>{
                    let fileName = res.headers.filename;
                    let blob = new Blob([res.data]);
                    let link = document.createElement('a');
                    link.href = window.URL.createObjectURL(blob);
                    link.download = fileName+'.xml';
                    link.click();
                    link.remove();
                })
            },
            operate(BaseInfo) {
                this.name = BaseInfo == null ? '添加设备信息' : '编辑设备信息'
                this.operateModal = true
                this.$xy.vector.$emit('operateRow', BaseInfo)
            },
          initSelect() {
            this.$xy.getParamGroup('0020').then(res => {
              this.searchData[0].data = res
              this.init()
            })
            this.$xy.getParamGroup('0010').then(res =>{
              this.searchData[2].data = res
              this.init()
            })
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
