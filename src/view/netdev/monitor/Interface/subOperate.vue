<template>
  <div class="content-box">
    <Form ref="form" :model="Interface" :rules="rulePro" :label-width="150">
      <Row>
        <Col :xs="20" :sm="16" :md="16" :lg="8">
          <FormItem label="设备类型">
            <Select v-model="Interface.devType"  disabled clearable>
              <Option v-for='choose in devTypeList' :value='choose.value' :key="choose.id">{{choose.name}}</Option>
            </Select>
          </FormItem>
        </Col>
        <Col :xs="20" :sm="16" :md="16" :lg="8">
          <FormItem label="解析协议" prop="fmtId">
            <Select v-model="Interface.fmtId" clearable>
              <Option v-for='choose in prtclList.filter(value => {return value.devType == Interface.devType})' :value='choose.fmtId' :key="choose.fmtId">{{choose.fmtName}}</Option>
            </Select>
          </FormItem>
        </Col>
        <Col :xs="20" :sm="16" :md="16" :lg="8">
          <FormItem label="接口编码" prop="itfCode">
            <Input v-model="Interface.itfCode" placeholder="请输入接口编码"></Input>
          </FormItem>
        </Col>
        <Col :xs="20" :sm="16" :md="16" :lg="8">
          <FormItem label="接口名称" prop="itfName">
            <Input v-model="Interface.itfName" placeholder="请输入接口名称"></Input>
          </FormItem>
        </Col>
        <Col :xs="20" :sm="16" :md="16" :lg="8">
          <FormItem label="接口类型" prop="itfType">
            <Select v-model="Interface.itfType" clearable>
              <Option v-for='choose in devInterList' :value='choose.value' :key="choose.id">{{choose.name}}</Option>
            </Select>
          </FormItem>
        </Col>
        <Col :xs="20" :sm="16" :md="16" :lg="8">
          <FormItem label="接口命令标识" prop="itfCmdMark">
            <Input v-model="Interface.itfCmdMark" placeholder="请输入接口命令标识"></Input>
          </FormItem>
        </Col>
        <Col :xs="20" :sm="16" :md="16" :lg="8">
          <FormItem label="页面路径" prop="itfPagePath">
            <Input v-if="Interface.itfType != '0027003'" readonly placeholder="禁用"></Input>
            <Input v-else v-model="Interface.itfPagePath" placeholder="请输入页面路径"></Input>
          </FormItem>
        </Col>
        <Col :xs="20" :sm="16" :md="16" :lg="8">
          <FormItem label="接口状态" prop="itfStatus">
            <Select v-model="Interface.itfStatus" clearable>
              <Option v-for='choose in isDefaultList' :value='choose.value' :key="choose.id">{{choose.name}}</Option>
            </Select>
          </FormItem>
        </Col>
        <!--<Col :xs="20" :sm="16" :md="16" :lg="8">
          <FormItem label="数据格式" prop="itfDataFormat">
            <Input v-model="Interface.itfDataFormat" placeholder="数据格式"></Input>
          </FormItem>
        </Col>-->
        <Col :xs="20" :sm="16" :md="16" :lg="15">
          <FormItem>
            <Button type="primary" @click="handleSubmit()">保存</Button>
            <Button type="default" @click="cancel()" style="margin-left: 8px">关闭</Button>
          </FormItem>
        </Col>
      </Row>
    </Form>
  </div>
</template>

<script>

    import {addInterface, editInterface} from '@/api/monitor/Interface'
    import {queryPrtclFormatAllList} from '@/api/monitor/PrtclFormat'

    export default {
        name: 'operate',
        data() {
            return {
                updateMark: false,
                Interface: {
                    fmtId:'',
                    devType:'',
                    itfCode:'',
                    itfName:'',
                    itfType:'',
                    itfCmdMark:'',
                    itfStatus:'',
                    itfDataFormat:'',
                    itfParentId: '',
                    itfPagePath:''
                },
                validateList: [],
                isDefaultList:[],
                devInterList:[],   //设备接口类型
                devTypeList:[],    //设备类型
                prtclList:[],      //协议列表
                rulePro: {
                    fmtId: [
                        {required: true, type:'number', message: '解析协议不能为空', trigger: 'blur'}
                    ],
                    itfName: [
                        {required: true, message: '接口名称不能为空', trigger: 'blur'}
                    ],
                    itfType: [
                        {required: true, message: '接口类型不能为空', trigger: 'blur'}
                    ],
                    itfStatus: [
                        {required: true, message: '接口状态不能为空', trigger: 'blur'}
                    ],
                    itfDataFormat: [
                        {required: true, message: '数据格式', trigger: 'blur'}
                    ],
                }
            }
        },
        created: function () {
            this.$xy.vector.$on('operateRow', this.operateRow)
        },
        beforeDestroy: function () {
            this.$xy.vector.$off('operateRow', this.operateRow)
        },
        mounted() {
            this.getDefaultType();
            this.getInterTypeList();
            this.getDevTypeList();
            this.getPrtclList();
        },
        methods: {
            async init() {
                this.getDefaultType();
                this.getInterTypeList();
                this.getDevTypeList();
                this.getPrtclList();
            },
            operateRow(obj,type) {
                this.Interface = obj;
                if (type != 'add') {
                    this.updateMark = true
                } else {
                    this.updateMark = false
                }
            },
            handleSubmit() {
                let form = this.$refs['form']
                form.validate((valid) => {
                    if (valid) {
                        this.save(name)
                    } else {
                        this.$Message.error('验证未通过!')
                    }
                })
            },
            async save(name) {
                let data = (this.updateMark) ? editInterface(this.Interface) : addInterface(this.Interface);
                let {result, success, message} = await data
                let notice = this.$Notice;
                if (success) {
                    notice.success({
                        title: '成功',
                        desc: message,
                        duration: 1
                    })
                    this.$refs['form'].resetFields()
                    this.$xy.vector.$emit('closeModal')
                } else {
                    notice.error({
                        title: '失败',
                        desc: message,
                        duration: 3
                    })
                }
            },
            cancel() {
                this.$refs['form'].resetFields()
                this.$xy.vector.$emit('closeModal')
            },
            //查询状态
            async getDefaultType(){
                this.$xy.getParamGroup('0001').then(res=>{
                    this.isDefaultList = res;
                })
            },
            //查询接口类型
            async getInterTypeList(){
                this.$xy.getParamGroup('0027').then(res=>{
                    this.devInterList = res;
                })
            },
            //查询设备类型
            async getDevTypeList(){
                this.$xy.getParamGroup('0020').then(res=>{
                    this.devTypeList = res;
                })
            },
            //查询协议列表
            async getPrtclList(){
                let that = this
                let {result, success, message} = await queryPrtclFormatAllList()
                if (success) {
                    that.prtclList = result
                }
            },
        }
    }
</script>
