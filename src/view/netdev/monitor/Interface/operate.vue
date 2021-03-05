<template>
    <div class="content-box">
        <Form ref="form" :model="Interface" :rules="rulePro" :label-width="150">
            <Row>
                        <Col :xs="20" :sm="16" :md="16" :lg="8">
                        <FormItem label="设备类型" prop="devType">
                            <Input v-model="Interface.devType"  placeholder="请输入设备类型"></Input>
                        </FormItem>
                        </Col>
                        <Col :xs="20" :sm="16" :md="16" :lg="8">
                        <FormItem label="格式ID" prop="fmtId">
                            <Input v-model="Interface.fmtId"  placeholder="请输入格式ID"></Input>
                        </FormItem>
                        </Col>
                        <Col :xs="20" :sm="16" :md="16" :lg="8">
                        <FormItem label="接口编码" prop="itfCode">
                            <Input v-model="Interface.itfCode"  placeholder="请输入接口编码"></Input>
                        </FormItem>
                        </Col>
                        <Col :xs="20" :sm="16" :md="16" :lg="8">
                        <FormItem label="接口名称" prop="itfName">
                            <Input v-model="Interface.itfName"  placeholder="请输入接口名称"></Input>
                        </FormItem>
                        </Col>
                        <Col :xs="20" :sm="16" :md="16" :lg="8">
                        <FormItem label="接口类型" prop="itfType">
                            <Input v-model="Interface.itfType"  placeholder="请输入接口类型"></Input>
                        </FormItem>
                        </Col>
                        <Col :xs="20" :sm="16" :md="16" :lg="8">
                        <FormItem label="接口状态" prop="itfStatus">
                            <Input v-model="Interface.itfStatus"  placeholder="请输入接口状态"></Input>
                        </FormItem>
                        </Col>
                        <Col :xs="20" :sm="16" :md="16" :lg="8">
                        <FormItem label="数据格式" prop="itfDataFormat">
                            <Input v-model="Interface.itfDataFormat"  placeholder="数据格式"></Input>
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

    import { addInterface, editInterface } from '@/api/monitor/Interface'

    export default {
        name: 'operate',
        data () {
            return {
                updateMark: false,
                    Interface: {},
                validateList:[],
                rulePro: {
                            devType: [
                            {required: true, message: '设备类型不能为空', trigger: 'blur'}
                        ],
                            fmtId: [
                            {required: true, message: '格式ID不能为空', trigger: 'blur'}
                        ],
                            itfCode: [
                            {required: true, message: '接口编码不能为空', trigger: 'blur'}
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
        mounted () {
        },
        methods: {
            operateRow (obj) {
                if (obj != null) {
                    this.Interface = obj;
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
                let data = (this.updateMark) ? editInterface(this.Interface) : addInterface(this.Interface);
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
