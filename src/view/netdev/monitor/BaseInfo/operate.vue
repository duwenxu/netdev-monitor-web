<template>
    <div class="content-box">
        <Form ref="form" :model="BaseInfo" :rules="rulePro" :label-width="150">
            <Row>
                        <Col :xs="20" :sm="16" :md="16" :lg="8">
                        <FormItem label="设备编号" prop="devNo">
                          <Input v-model="BaseInfo.devNo"  placeholder="请输入设备编号"></Input>
                        </FormItem>
                        </Col>
                        <Col :xs="20" :sm="16" :md="16" :lg="8">
                        <FormItem label="设备类型" prop="devType">
                            <Input v-model="BaseInfo.devType"  placeholder="请输入设备类型"></Input>
                        </FormItem>
                        </Col>
                        <Col :xs="20" :sm="16" :md="16" :lg="8">
                        <FormItem label="设备名称" prop="devName">
                            <Input v-model="BaseInfo.devName"  placeholder="请输入设备名称"></Input>
                        </FormItem>
                        </Col>
                        <Col :xs="20" :sm="16" :md="16" :lg="8">
                        <FormItem label="设备状态" prop="devStatus">
                            <Input v-model="BaseInfo.devStatus"  placeholder="请输入设备状态"></Input>
                        </FormItem>
                        </Col>
                        <Col :xs="20" :sm="16" :md="16" :lg="8">
                        <FormItem label="设备所属公司" prop="devCorp">
                            <Input v-model="BaseInfo.devCorp"  placeholder="请输入设备所属公司"></Input>
                        </FormItem>
                        </Col>
                        <Col :xs="20" :sm="16" :md="16" :lg="8">
                        <FormItem label="设备版本" prop="devVer">
                            <Input v-model="BaseInfo.devVer"  placeholder="请输入设备版本"></Input>
                        </FormItem>
                        </Col>
                        <Col :xs="20" :sm="16" :md="16" :lg="8">
                        <FormItem label="设备IP地址" prop="devIpAddr">
                            <Input v-model="BaseInfo.devIpAddr"  placeholder="请输入设备IP地址"></Input>
                        </FormItem>
                        </Col>
                        <Col :xs="20" :sm="16" :md="16" :lg="8">
                        <FormItem label="设备内部地址" prop="devLocalAddr">
                            <Input v-model="BaseInfo.devLocalAddr"  placeholder="请输入设备内部地址"></Input>
                        </FormItem>
                        </Col>
                        <Col :xs="20" :sm="16" :md="16" :lg="8">
                        <FormItem label="设备端口" prop="devPort">
                            <Input v-model="BaseInfo.devPort"  placeholder="请输入设备端口"></Input>
                        </FormItem>
                        </Col>
                        <Col :xs="20" :sm="16" :md="16" :lg="8">
                        <FormItem label="上级设备编号" prop="devParentNo">
                            <Input v-model="BaseInfo.devParentNo"  placeholder="请输入上级设备编号"></Input>
                        </FormItem>
                        </Col>
                        <Col :xs="20" :sm="16" :md="16" :lg="8">
                        <FormItem label="设备访间隔时间(毫秒)" prop="devIntervalTime">
                            <Input v-model="BaseInfo.devIntervalTime"  placeholder="请输入设备访间隔时间(毫秒)"></Input>
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

    import { addBaseInfo, editBaseInfo } from '@/api/monitor/BaseInfo'

    export default {
        name: 'operate',
        data () {
            return {
                updateMark: false,
                    BaseInfo: {},
                validateList:[],
                rulePro: {
                            devNo: [
                          {required: true, message: '设备类型不能为空', trigger: 'blur'}
                        ],
                            devType: [
                            {required: true, message: '设备类型不能为空', trigger: 'blur'}
                        ],
                            devName: [
                            {required: true, message: '设备名称不能为空', trigger: 'blur'}
                        ],
                            devStatus: [
                            {required: true, message: '设备状态不能为空', trigger: 'blur'}
                        ],
                            devCorp: [
                            {required: true, message: '设备所属公司不能为空', trigger: 'blur'}
                        ],
                            devVer: [
                        ],
                            devIpAddr: [
                        ],
                            devLocalAddr: [
                        ],
                            devPort: [
                        ],
                            devParentNo: [
                        ],
                            devIntervalTime: [
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
                    this.BaseInfo = obj;
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
                let data = (this.updateMark) ? editBaseInfo(this.BaseInfo) : addBaseInfo(this.BaseInfo);
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
