<template>
    <div class="content-box">
        <Form ref="form" :model="OperLog" :rules="rulePro" :label-width="150">
            <Row>
                        <Col :xs="20" :sm="16" :md="16" :lg="8">
                        <FormItem label="设备类型" prop="devType">
                            <Input v-model="OperLog.devType"  placeholder="请输入设备类型"></Input>
                        </FormItem>
                        </Col>
                        <Col :xs="20" :sm="16" :md="16" :lg="8">
                        <FormItem label="设备编号" prop="devNo">
                            <Input v-model="OperLog.devNo"  placeholder="请输入设备编号"></Input>
                        </FormItem>
                        </Col>
                        <Col :xs="20" :sm="16" :md="16" :lg="8">
                        <FormItem label="日志时间" prop="logTime">
                            <Input v-model="OperLog.logTime"  placeholder="请输入日志时间"></Input>
                        </FormItem>
                        </Col>
                        <Col :xs="20" :sm="16" :md="16" :lg="8">
                        <FormItem label="访问类型" prop="logAccessType">
                            <Input v-model="OperLog.logAccessType"  placeholder="请输入访问类型"></Input>
                        </FormItem>
                        </Col>
                        <Col :xs="20" :sm="16" :md="16" :lg="8">
                        <FormItem label="操作类型" prop="logOperType">
                            <Input v-model="OperLog.logOperType"  placeholder="请输入操作类型"></Input>
                        </FormItem>
                        </Col>
                        <Col :xs="20" :sm="16" :md="16" :lg="8">
                        <FormItem label="操作对象" prop="logOperObj">
                            <Input v-model="OperLog.logOperObj"  placeholder="请输入操作对象"></Input>
                        </FormItem>
                        </Col>
                        <Col :xs="20" :sm="16" :md="16" :lg="8">
                        <FormItem label="操作内容" prop="logOperContent">
                            <Input v-model="OperLog.logOperContent"  placeholder="请输入操作内容"></Input>
                        </FormItem>
                        </Col>
                        <Col :xs="20" :sm="16" :md="16" :lg="8">
                        <FormItem label="操作人" prop="logUserId">
                            <Input v-model="OperLog.logUserId"  placeholder="请输入操作人"></Input>
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

    import { addOperLog, editOperLog } from '@/api/monitor/OperLog'

    export default {
        name: 'operate',
        data () {
            return {
                updateMark: false,
                    OperLog: {},
                validateList:[],
                rulePro: {
                            devType: [
                            {required: true, message: '设备类型不能为空', trigger: 'blur'}
                        ],
                            devNo: [
                            {required: true, message: '设备编号不能为空', trigger: 'blur'}
                        ],
                            logTime: [
                            {required: true, message: '日志时间不能为空', trigger: 'blur'}
                        ],
                            logAccessType: [
                            {required: true, message: '访问类型不能为空', trigger: 'blur'}
                        ],
                            logOperType: [
                            {required: true, message: '操作类型不能为空', trigger: 'blur'}
                        ],
                            logOperObj: [
                            {required: true, message: '操作对象不能为空', trigger: 'blur'}
                        ],
                            logOperContent: [
                            {required: true, message: '操作内容不能为空', trigger: 'blur'}
                        ],
                            logUserId: [
                            {required: true, message: '操作人不能为空', trigger: 'blur'}
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
                    this.OperLog = obj;
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
                let data = (this.updateMark) ? editOperLog(this.OperLog) : addOperLog(this.OperLog);
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
