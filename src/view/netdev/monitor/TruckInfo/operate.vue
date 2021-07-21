<template>
  <div class="content-box">
    <Form ref="form" :model="TruckInfo" :rules="rulePro" :label-width="150">
      <Row>
        <Col :xs="20" :sm="16" :md="16" :lg="8">
          <FormItem label="卫通车类型" prop="devType">
            <Select v-model="TruckInfo.truckType" clearable>
              <Option v-for='choose in truckTypeList' :value='choose.value' :key="choose.id">{{choose.name}}</Option>
            </Select>
          </FormItem>
        </Col>
        <Col :xs="20" :sm="16" :md="16" :lg="8">
          <FormItem label="卫通车名称" prop="itfCode">
            <Input v-model="TruckInfo.truckName" placeholder="请输入卫通车名称"></Input>
          </FormItem>
        </Col>
        <Col :xs="20" :sm="16" :md="16" :lg="8">
          <FormItem label="卫通车机构" prop="itfName">
            <Input v-model="TruckInfo.truckDept" placeholder="请输入卫通车所属机构"></Input>
          </FormItem>
        </Col>
        <Col :xs="20" :sm="16" :md="16" :lg="8">
          <FormItem label="卫通车状态" prop="itfStatus">
            <Select v-model="TruckInfo.truckStatus" clearable>
              <Option v-for='choose in isDefaultList' :value='choose.value' :key="choose.id">{{choose.name}}</Option>
            </Select>
          </FormItem>
        </Col>
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

    import {addTruckInfo, editTruckInfo} from '@/api/monitor/TruckInfo'
    export default {
        name: 'operate',
        data() {
            return {
                updateMark: false,
                TruckInfo: {
                    truckType:'',
                    truckName:'',
                    truckDept:'',
                    truckStatus:'',
                    truckDevs:'',
                },
                validateList: [],
                isDefaultList:[],
                devInterList:[],   //设备接口类型
                truckTypeList:[],    //通讯车类型
                rulePro: {
                  truckType: [
                        {required: true, message: '卫通车类型不能为空', trigger: 'blur'}
                    ],
                  truckName: [
                        {required: false}
                    ],
                  truckDept: [
                        {required: false}
                    ],
                  truckStatus: [
                        {required: true, message: '卫通车不能为空', trigger: 'blur'}
                    ],
                  truckDevs: [
                        {required: true, message: '卫通设备', trigger: 'blur'}
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
            this.getTruckTypeList();
        },
        methods: {
            async init() {
                this.getDefaultType();
                this.getInterTypeList();
                this.getTruckTypeList();
            },
            operateRow(obj) {
                if (obj != null) {
                    this.TruckInfo = obj;
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
                let data = (this.updateMark) ? editTruckInfo(this.TruckInfo) : addTruckInfo(this.TruckInfo);
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
            async getTruckTypeList(){
                this.$xy.getParamGroup('0033').then(res=>{
                    this.truckTypeList = res;
                })
            },

        }
    }
</script>
