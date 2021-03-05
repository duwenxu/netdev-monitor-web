<template>
    <div class="content-box">
        <Form ref="form" :model="AlertInfo" :rules="rulePro" :label-width="150">
            <Row>
                        <Col :xs="20" :sm="16" :md="16" :lg="8">
                        <FormItem label="设备类型" prop="devType">
                            <Input v-model="AlertInfo.devType"  placeholder="请输入设备类型"></Input>
                        </FormItem>
                        </Col>
                        <Col :xs="20" :sm="16" :md="16" :lg="8">
                        <FormItem label="设备编号" prop="devNo">
                            <Input v-model="AlertInfo.devNo"  placeholder="请输入设备编号"></Input>
                        </FormItem>
                        </Col>
                        <Col :xs="20" :sm="16" :md="16" :lg="8">
                        <FormItem label="参数编号" prop="ndpaNo">
                            <Input v-model="AlertInfo.ndpaNo"  placeholder="请输入参数编号"></Input>
                        </FormItem>
                        </Col>
                        <Col :xs="20" :sm="16" :md="16" :lg="8">
                        <FormItem label="告警个数" prop="alertNum">
                            <Input v-model="AlertInfo.alertNum"  placeholder="请输入告警个数"></Input>
                        </FormItem>
                        </Col>
                        <Col :xs="20" :sm="16" :md="16" :lg="8">
                        <FormItem label="告警时间" prop="alertTime">
                            <Input v-model="AlertInfo.alertTime"  placeholder="请输入告警时间"></Input>
                        </FormItem>
                        </Col>
                        <Col :xs="20" :sm="16" :md="16" :lg="8">
                        <FormItem label="站号" prop="alertStationNo">
                            <Input v-model="AlertInfo.alertStationNo"  placeholder="请输入站号"></Input>
                        </FormItem>
                        </Col>
                        <Col :xs="20" :sm="16" :md="16" :lg="8">
                        <FormItem label="告警级别" prop="alertLevel">
                            <Input v-model="AlertInfo.alertLevel"  placeholder="请输入告警级别"></Input>
                        </FormItem>
                        </Col>
                        <Col :xs="20" :sm="16" :md="16" :lg="8">
                        <FormItem label="告警描述" prop="alertDesc">
                            <Input v-model="AlertInfo.alertDesc"  placeholder="请输入告警描述"></Input>
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

  import {addAlertInfo, editAlertInfo} from '@/api/monitor/AlertInfo'

  export default {
        name: 'operate',
        data () {
            return {
                updateMark: false,
                    AlertInfo: {},
                validateList:[],
                rulePro: {
                            devType: [
                            {required: true, message: '设备类型不能为空', trigger: 'blur'}
                        ],
                            devNo: [
                            {required: true, message: '设备编号不能为空', trigger: 'blur'}
                        ],
                            ndpaNo: [
                            {required: true, message: '参数编号不能为空', trigger: 'blur'}
                        ],
                            alertNum: [
                            {required: true, message: '告警个数不能为空', trigger: 'blur'}
                        ],
                            alertTime: [
                            {required: true, message: '告警时间不能为空', trigger: 'blur'}
                        ],
                            alertStationNo: [
                            {required: true, message: '站号不能为空', trigger: 'blur'}
                        ],
                            alertLevel: [
                            {required: true, message: '告警级别不能为空', trigger: 'blur'}
                        ],
                            alertDesc: [
                            {required: true, message: '告警描述不能为空', trigger: 'blur'}
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
        mounted () {
        },
        methods: {
            operateRow (obj) {
                if (obj != null) {
                    this.AlertInfo = obj;
                    this.updateMark = true
                }else{
                    this.updateMark = false
                }
            },
            handleSubmit() {
                let form  = this.$refs['form']
                form.validate((valid) => {
                    if (valid) {
                        this.save(name)
                    } else {
                        this.$Message.error('验证未通过!')
                    }
                })
            },
            async save (name) {
                let data = (this.updateMark) ? editAlertInfo(this.AlertInfo) : addAlertInfo(this.AlertInfo);
                let { result, success, message } = await data
                let notice = this.$Notice;
                if (success) {
                    notice.success({
                        title:'成功',
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
            cancel () {
                this.$refs['form'].resetFields()
                this.$xy.vector.$emit('closeModal')
            }
        }
    }
</script>
