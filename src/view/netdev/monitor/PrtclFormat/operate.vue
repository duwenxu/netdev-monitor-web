<template>
    <div class="content-box">
        <Form ref="form" :model="PrtclFormat" :rules="rulePro" :label-width="150">
            <Row>
                        <Col :xs="20" :sm="16" :md="16" :lg="8">
                        <FormItem label="设备类型" prop="devType">
                            <Select clearable placeholder="请选择设备类型" v-model="PrtclFormat.devType">
                              <Option :key="choose.id" :value='choose.value' v-for='choose in devTypeList'>{{choose.name}}
                              </Option>
                            </Select>
                        </FormItem>
                        </Col>
                        <Col :xs="20" :sm="16" :md="16" :lg="8">
                        <FormItem label="查询关键字" prop="fmtSkey">
                            <Input v-model="PrtclFormat.fmtSkey"  placeholder="请输入查询关键字"></Input>
                        </FormItem>
                        </Col>
                        <Col :xs="20" :sm="16" :md="16" :lg="8">
                        <FormItem label="控制关键字" prop="fmtCkey">
                            <Input v-model="PrtclFormat.fmtCkey"  placeholder="请输入控制关键字"></Input>
                        </FormItem>
                        </Col>
                        <Col :xs="20" :sm="16" :md="16" :lg="8">
                        <FormItem label="控制响应关键字" prop="fmtCckey">
                            <Input v-model="PrtclFormat.fmtCckey"  placeholder="请输入控制响应关键字"></Input>
                        </FormItem>
                        </Col>
                        <Col :xs="20" :sm="16" :md="16" :lg="8">
                        <FormItem label="查询响应关键字" prop="fmtSckey">
                            <Input v-model="PrtclFormat.fmtSckey"  placeholder="请输入查询响应关键字"></Input>
                        </FormItem>
                        </Col>
                        <Col :xs="20" :sm="16" :md="16" :lg="8">
                        <FormItem label="查询响应条数" prop="fmtScNum">
                            <Input v-model="PrtclFormat.fmtScNum"  placeholder="请输入查询响应条数"></Input>
                        </FormItem>
                        </Col>
                        <Col :xs="20" :sm="16" :md="16" :lg="8">
                        <FormItem label="控制响应条数" prop="fmtCcNum">
                            <Input v-model="PrtclFormat.fmtCcNum"  placeholder="请输入控制响应条数"></Input>
                        </FormItem>
                        </Col>
                        <Col :xs="20" :sm="16" :md="16" :lg="8">
                        <FormItem label="格式处理类" prop="fmtHandlerClass">
                            <Input v-model="PrtclFormat.fmtHandlerClass"  placeholder="请输入格式处理类"></Input>
                        </FormItem>
                        </Col>
                        <Col :xs="20" :sm="16" :md="16" :lg="8">
                        <FormItem label="查询响应类型" prop="fmtScType">
                            <Input v-model="PrtclFormat.fmtScType"  placeholder="请输入查询响应类型"></Input>
                        </FormItem>
                        </Col>
                        <Col :xs="20" :sm="16" :md="16" :lg="8">
                        <FormItem label="控制响应类型" prop="fmtCcType">
                            <Input v-model="PrtclFormat.fmtCcType"  placeholder="请输入控制响应类型"></Input>
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

    import { addPrtclFormat, editPrtclFormat } from '@/api/monitor/PrtclFormat'

    export default {
        name: 'operate',
        data () {
            return {
                updateMark: false,
                PrtclFormat: {},
                //设备类型列表：
                devTypeList:[],
                validateList:[],
                rulePro: {
                            devType: [
                            {required: true, message: '设备类型不能为空', trigger: 'blur'}
                        ],
                            fmtSkey: [
                        ],
                            fmtCkey: [
                        ],
                            fmtCckey: [
                        ],
                            fmtSckey: [
                        ],
                            fmtScNum: [
                        ],
                            fmtCcNum: [
                        ],
                            fmtHandlerClass: [
                            {required: true, message: '格式处理类不能为空', trigger: 'blur'}
                        ],
                            fmtScType: [
                        ],
                            fmtCcType: [
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
          this.getDeviceTypes()
        },
        methods: {
            operateRow (obj) {
                if (obj != null) {
                    this.PrtclFormat = obj;
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
                let data = (this.updateMark) ? editPrtclFormat(this.PrtclFormat) : addPrtclFormat(this.PrtclFormat);
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
            },
            async getDeviceTypes () {
              this.$xy.getParamGroup('0020').then(res => {
                this.devTypeList = res
              })
            }
        }
    }
</script>
