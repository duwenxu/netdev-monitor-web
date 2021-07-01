<template>
  <div class="content-box">
    <Row>
      <Col :xs="24" :sm="24" :md="24" :lg="24">
        <Button icon="md-add" style="float:right;margin-bottom: 10px;border: 0px" type="primary" @click="operate(search,'add')">新增</Button>
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
    <Modal v-model="operateModal" width="1000" :title="name" footer-hide :mask-closable="false" :closable="false">
      <operate-row></operate-row>
    </Modal>

    <Modal v-model="transModal" width="800" title="绑定参数" footer-hide :mask-closable="false">
      <trans left-name="未绑定参数" right-name="绑定参数"></trans>
    </Modal>
  </div>
</template>

<script>
    import {queryInterfacePageList, deleteInterface,getUnlinkedParams,getLinkedParams,editInterface,updateCache} from '@/api/monitor/Interface'
    import operateRow from './subOperate'
    import trans from '@/components/tables/trans'
    import {queryPrtclFormatAllList} from '@/api/monitor/PrtclFormat'

    export default {
        components: {
            operateRow,
            trans
        },
        data() {
            return {
                operateModal: false,
                name: '',
                columns1: [
                            {
                                title: '设备类型',
                                key: 'devType_paraName',
                                width: 180
                            },
                            {
                                title: '解析协议',
                                key: 'fmtId',
                                width: 220,
                                render:(h,params) =>{
                                    return h('span',this.handlerPrtFomat(params.row.fmtId));
                                },
                            },
                            {
                                title: '接口编码',
                                key: 'itfCode',
                            },
                            {
                                title: '接口名称',
                                key: 'itfName',
                                width: 220
                            },
                            {
                                title: '接口类型',
                                key: 'itfType_paraName',
                            },
                            {
                                title: '接口命令标识',
                                key: 'itfCmdMark',
                            },
                            {
                                title: '接口状态',
                                key: 'itfStatus_paraName',
                            },
                            {
                                title: '页面路径',
                                key: 'itfPagePath',
                            },
                            {
                                title: '操作',
                                key: 'action',
                                width: 200,
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
                                                marginRight: '5px',
                                            },
                                            on: {
                                                click: () => {
                                                    this.operate(rows.row,'update')
                                                }
                                            }
                                        }),
                                        h('Button', {
                                            props: {
                                                icon:'ios-browsers-outline',
                                                type: 'success'
                                            },
                                            attrs:{
                                                title:'选择参数'
                                            },
                                            style: {
                                                marginRight: '5px',
                                            },
                                            on: {
                                                click: () => {
                                                    this.editParam(rows.row.itfId)
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
                                                    this.delete(rows.row.itfId)//id需要修改
                                                }
                                            }
                                        })
                                    ])
                                }
                            }
                ],
                infos: [],
                search: {
                    devType:this.$route.query.devType,
                    itfParentId:this.$route.query.itfId,
                    itfFlag:'-1'
                },
                page: {
                    current: 1,
                    size: 8
                },
                otherPage: {
                    total: 0,
                    pageSize: [10, 20, 30]
                },
                transModal: false,
                prtclList:[],   //协议列表
                eventInfos:{
                    itfId:''
                },
            }
        },
        created: function () {
            this.$xy.vector.$on('closeModal', this.closeModal)
            this.$xy.vector.$on('sendReq', this.sendReq)
            this.$xy.vector.$on('closeTrans', this.closeTrans)
            this.$xy.vector.$on('saveTrans', this.saveTrans)
        },
        beforeDestroy: function () {
            this.$xy.vector.$off('closeModal', this.closeModal)
            this.$xy.vector.$off('sendReq', this.sendReq)
            this.$xy.vector.$off('closeTrans', this.closeTrans)
            this.$xy.vector.$off('saveTrans', this.saveTrans)
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
                this.getPrtclList();
            },
            async doQuery() {
                let searchAll = this.page
                searchAll = Object.assign(searchAll, this.search)
                let {result, success, message} = await queryInterfacePageList(searchAll)
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
                title: '你确定要删除这条设备接口吗?',
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
                let {data, code, msg} = await deleteInterface(id)
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
            operate(Interface,type) {
                this.name = type == 'add' ? '添加设备接口' : '编辑设备接口'
                this.operateModal = true
                this.$xy.vector.$emit('operateRow', Interface,type)
            },
            //编辑弹出窗口关闭按钮触发方法
            closeModal() {
                this.operateModal = false
                this.doQuery();
            },
            //绑定弹出窗口关闭按钮触发方法
            closeTrans(){
                this.transModal = false;
                this.doQuery()
            },
            //绑定参数
            async editParam(id) {
                this.transModal = true;
                this.eventInfos.itfId = id;
                this.getUnLinkedParam(id);
                this.getLinkedParam(id);
            },
            //查询未绑定参数
            async getUnLinkedParam(id) {
                let {result, success, msg} = await getUnlinkedParams(id);
                if (success) {
                    this.leftInfos = result;
                    this.$xy.vector.$emit('initLeft', {leftInfos: this.leftInfos})
                }
            },
            //查询绑定参数
            async getLinkedParam(id) {
                let {result, success, msg} = await getLinkedParams(id);
                if (success) {
                    this.rightInfos = result;
                    this.$xy.vector.$emit('initRight', {rightInfos: this.rightInfos})
                }
            },
            //保存绑定的数据格式：设备参数
            saveTrans: async function (obj) {
                var params='';
                if(obj.length>0){
                    obj.forEach(trans => {
                        params=params+trans.id+",";
                    })
                    //剔除掉最后一个逗号
                    params = params.substr(0,params.length-1)
                }
                var devInter = {itfId:this.eventInfos.itfId,
                          itfDataFormat:params};
                let {result, success, message} = await editInterface(devInter);
                if (success) {
                    this.transModal = false;
                    this.$Notice.success({
                        title: '成功',
                        desc: message,
                        duration: 3
                    });
                }
                this.init();
            },
            //查询协议列表
            async getPrtclList(){
                let that = this
                let {result, success, message} = await queryPrtclFormatAllList()
                if (success) {
                    that.prtclList = result
                }
            },
            //协议id和名称转换
            handlerPrtFomat(prtId){
                let lists = this.prtclList
                for(var value in lists){
                    if(lists[value].fmtId == prtId){
                        return lists[value].fmtName
                    }
                }
                return ''
            },
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
