<template>
    <div class="content-box">
        <Form ref="form" :model="ParaInfo" :rules="rulePro" :label-width="150">
            <Row>
                        <Col :xs="20" :sm="16" :md="16" :lg="8">
                        <FormItem label="格式ID" prop="fmtId">
                            <Input v-model="ParaInfo.fmtId"  placeholder="请输入格式ID"></Input>
                        </FormItem>
                        </Col>
                        <Col :xs="20" :sm="16" :md="16" :lg="8">
                        <FormItem label="参数编号" prop="ndpaNo">
                            <Input v-model="ParaInfo.ndpaNo"  placeholder="请输入参数编号"></Input>
                        </FormItem>
                        </Col>
                        <Col :xs="20" :sm="16" :md="16" :lg="8">
                        <FormItem label="参数编码" prop="ndpaCode">
                            <Input v-model="ParaInfo.ndpaCode"  placeholder="请输入参数编码"></Input>
                        </FormItem>
                        </Col>
                        <Col :xs="20" :sm="16" :md="16" :lg="8">
                        <FormItem label="参数名称" prop="ndpaName">
                            <Input v-model="ParaInfo.ndpaName"  placeholder="请输入参数名称"></Input>
                        </FormItem>
                        </Col>
                        <Col :xs="20" :sm="16" :md="16" :lg="8">
                        <FormItem label="设备类型" prop="devType">
                            <Input v-model="ParaInfo.devType"  placeholder="请输入设备类型"></Input>
                        </FormItem>
                        </Col>
                        <Col :xs="20" :sm="16" :md="16" :lg="8">
                        <FormItem label="访问权限" prop="ndpaAccessRight">
                            <Input v-model="ParaInfo.ndpaAccessRight"  placeholder="请输入访问权限"></Input>
                        </FormItem>
                        </Col>
                        <Col :xs="20" :sm="16" :md="16" :lg="8">
                        <FormItem label="参数单位" prop="ndpaUnit">
                            <Input v-model="ParaInfo.ndpaUnit"  placeholder="请输入参数单位"></Input>
                        </FormItem>
                        </Col>
                        <Col :xs="20" :sm="16" :md="16" :lg="8">
                        <FormItem label="参数数据类型" prop="ndpaDatatype">
                            <Input v-model="ParaInfo.ndpaDatatype"  placeholder="请输入参数数据类型"></Input>
                        </FormItem>
                        </Col>
                        <Col :xs="20" :sm="16" :md="16" :lg="8">
                        <FormItem label="参数长度" prop="ndpaStrLen">
                            <Input v-model="ParaInfo.ndpaStrLen"  placeholder="请输入参数长度"></Input>
                        </FormItem>
                        </Col>
                        <Col :xs="20" :sm="16" :md="16" :lg="8">
                        <FormItem label="显示模式" prop="ndpaShowMode">
                            <Input v-model="ParaInfo.ndpaShowMode"  placeholder="请输入显示模式"></Input>
                        </FormItem>
                        </Col>
                        <Col :xs="20" :sm="16" :md="16" :lg="8">
                        <FormItem label="最大值" prop="ndpaValMax">
                            <Input v-model="ParaInfo.ndpaValMax"  placeholder="请输入最大值"></Input>
                        </FormItem>
                        </Col>
                        <Col :xs="20" :sm="16" :md="16" :lg="8">
                        <FormItem label="最小值" prop="ndpaValMin">
                            <Input v-model="ParaInfo.ndpaValMin"  placeholder="请输入最小值"></Input>
                        </FormItem>
                        </Col>
                        <Col :xs="20" :sm="16" :md="16" :lg="8">
                        <FormItem label="步进" prop="ndpaValStep">
                            <Input v-model="ParaInfo.ndpaValStep"  placeholder="请输入步进"></Input>
                        </FormItem>
                        </Col>
                        <Col :xs="20" :sm="16" :md="16" :lg="8">
                        <FormItem label="下拉值域" prop="ndpaSelectData">
                            <Input v-model="ParaInfo.ndpaSelectData"  placeholder="请输入下拉值域"></Input>
                        </FormItem>
                        </Col>
                        <Col :xs="20" :sm="16" :md="16" :lg="8">
                        <FormItem label="字节长度" prop="ndpaByteLen">
                            <Input v-model="ParaInfo.ndpaByteLen"  placeholder="请输入字节长度"></Input>
                        </FormItem>
                        </Col>
                        <Col :xs="20" :sm="16" :md="16" :lg="8">
                        <FormItem label="命令标识" prop="ndpaCmdMark">
                            <Input v-model="ParaInfo.ndpaCmdMark"  placeholder="请输入命令标识"></Input>
                        </FormItem>
                        </Col>
                        <Col :xs="20" :sm="16" :md="16" :lg="8">
                        <FormItem label="参数状态" prop="ndpaStatus">
                            <Input v-model="ParaInfo.ndpaStatus"  placeholder="请输入参数状态"></Input>
                        </FormItem>
                        </Col>
                        <Col :xs="20" :sm="16" :md="16" :lg="8">
                        <FormItem label="是否该字段提供给54所访问" prop="ndpaOutterStatus">
                            <Input v-model="ParaInfo.ndpaOutterStatus"  placeholder="请输入是否该字段提供给54所访问"></Input>
                        </FormItem>
                        </Col>
                        <Col :xs="20" :sm="16" :md="16" :lg="8">
                        <FormItem label="提供给54所时 数据映射规则" prop="ndpaTransRule">
                            <Input v-model="ParaInfo.ndpaTransRule"  placeholder="请输入提供给54所时 数据映射规则"></Input>
                        </FormItem>
                        </Col>
                        <Col :xs="20" :sm="16" :md="16" :lg="8">
                        <FormItem label="该字段是否是表明设备是否故障" prop="ndpaAlertPara">
                            <Input v-model="ParaInfo.ndpaAlertPara"  placeholder="请输入该字段是否是表明设备是否故障"></Input>
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

    import { addParaInfo, editParaInfo } from '@/api/monitor/ParaInfo'

    export default {
        name: 'operate',
        data () {
            return {
                updateMark: false,
                    ParaInfo: {},
                validateList:[],
                rulePro: {
                            fmtId: [
                            {required: true, message: '格式ID不能为空', trigger: 'blur'}
                        ],
                            ndpaNo: [
                            {required: true, message: '参数编号不能为空', trigger: 'blur'}
                        ],
                            ndpaCode: [
                            {required: true, message: '参数编码不能为空', trigger: 'blur'}
                        ],
                            ndpaName: [
                            {required: true, message: '参数名称不能为空', trigger: 'blur'}
                        ],
                            devType: [
                            {required: true, message: '设备类型不能为空', trigger: 'blur'}
                        ],
                            ndpaAccessRight: [
                            {required: true, message: '访问权限不能为空', trigger: 'blur'}
                        ],
                            ndpaUnit: [
                            {required: true, message: '参数单位不能为空', trigger: 'blur'}
                        ],
                            ndpaDatatype: [
                            {required: true, message: '参数数据类型不能为空', trigger: 'blur'}
                        ],
                            ndpaStrLen: [
                            {required: true, message: '参数长度不能为空', trigger: 'blur'}
                        ],
                            ndpaShowMode: [
                            {required: true, message: '显示模式不能为空', trigger: 'blur'}
                        ],
                            ndpaValMax: [
                            {required: true, message: '最大值不能为空', trigger: 'blur'}
                        ],
                            ndpaValMin: [
                            {required: true, message: '最小值不能为空', trigger: 'blur'}
                        ],
                            ndpaValStep: [
                            {required: true, message: '步进不能为空', trigger: 'blur'}
                        ],
                            ndpaSelectData: [
                            {required: true, message: '下拉值域不能为空', trigger: 'blur'}
                        ],
                            ndpaByteLen: [
                            {required: true, message: '字节长度不能为空', trigger: 'blur'}
                        ],
                            ndpaCmdMark: [
                            {required: true, message: '命令标识不能为空', trigger: 'blur'}
                        ],
                            ndpaStatus: [
                            {required: true, message: '参数状态不能为空', trigger: 'blur'}
                        ],
                            ndpaOutterStatus: [
                            {required: true, message: '是否该字段提供给54所访问不能为空', trigger: 'blur'}
                        ],
                            ndpaTransRule: [
                            {required: true, message: '提供给54所时 数据映射规则不能为空', trigger: 'blur'}
                        ],
                            ndpaAlertPara: [
                            {required: true, message: '该字段是否是表明设备是否故障不能为空', trigger: 'blur'}
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
                    this.ParaInfo = obj;
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
                let data = (this.updateMark) ? editParaInfo(this.ParaInfo) : addParaInfo(this.ParaInfo);
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
