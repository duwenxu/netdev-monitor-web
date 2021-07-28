<template>
  <div class="content-box">
    <Form ref="form" :model="SpacePreset" :rules="rulePro" :label-width="150">
      <Row>
        <Col :xs="24" :sm="12" :md="12" :lg="12">
          <FormItem label="预置卫星代号" prop="spCode">
            <Input clearable placeholder="请输入预置卫星代号" v-model="SpacePreset.spCode">
            </Input>
          </FormItem>
        </Col>
        <Col :xs="24" :sm="12" :md="12" :lg="12">
          <FormItem label="预置卫星名称" prop="spName">
            <Input clearable placeholder="请输入预置卫星名称" v-model="SpacePreset.spName">
            </Input>
          </FormItem>
        </Col>
        <Col :xs="24" :sm="12" :md="12" :lg="12">
          <FormItem label="卫星经度" prop="spLongitude">
            <Input clearable placeholder="请输入卫星经度" v-model="SpacePreset.spLongitude">
            </Input>
          </FormItem>
        </Col>
        <Col :xs="24" :sm="12" :md="12" :lg="12">
          <FormItem label="信标频率" prop="spBeaconFrequency">
            <Input clearable placeholder="请输入信标频率" v-model="SpacePreset.spBeaconFrequency">
            </Input>
          </FormItem>
        </Col>
        <Col :xs="24" :sm="12" :md="12" :lg="12">
          <FormItem label="极化方向" prop="spPolarization">
            <Input clearable placeholder="请输入极化方向" v-model="SpacePreset.spPolarization">
            </Input>
          </FormItem>
        </Col>
        <Col :xs="24" :sm="12" :md="12" :lg="12">
          <FormItem label="本振" prop="spLocalOscillator">
            <Input clearable placeholder="请输入本振" v-model="SpacePreset.spLocalOscillator">
            </Input>
          </FormItem>
        </Col>
        <Col :xs="24" :sm="12" :md="12" :lg="12">
          <FormItem label="备注一" prop="spRemark1">
            <Input clearable placeholder="请输入备注一" v-model="SpacePreset.spRemark1">
            </Input>
          </FormItem>
        </Col>
        <Col :xs="24" :sm="12" :md="12" :lg="12">
          <FormItem label="备注二" prop="spRemark2">
            <Input clearable placeholder="请输入备注二" v-model="SpacePreset.spRemark2">
            </Input>
          </FormItem>
        </Col>
        <Col :xs="24" :sm="12" :md="12" :lg="12">
          <FormItem label="备注三" prop="spRemark3">
            <Input clearable placeholder="请输入备注三" v-model="SpacePreset.spRemark3">
            </Input>
          </FormItem>
        </Col>
        <Col :xs="24" :sm="12" :md="12" :lg="12">
          <FormItem label="备注四" prop="spRemark4">
            <Input clearable placeholder="请输入备注四" v-model="SpacePreset.spRemark4">
            </Input>
          </FormItem>
        </Col>
        <Col :xs="24" :sm="24" :md="24" :lg="24">
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

    import {addSpacePreset, editSpacePreset} from '@/api/monitor/NtdvSpacePreset'

    export default {
        name: 'operate',
        data() {
            return {
                SpacePreset: false,
                SpacePreset: {
                    spCode:'',
                    spName:'',
                    spLongitude:'',
                    spLocalOscillator:'',
                    spBeaconFrequency:'',
                    spPolarization:'',
                    spRemark1:'',
                    spRemark2:'',
                    spRemark3:'',
                    spRemark4:''
                },
                rulePro: {
                    spCode: [
                        {required: true, message: '必填', trigger: 'blur'}
                    ],
                    spName: [
                        {required: true, message: '必填', select: 'blur'}
                    ],
                    spLongitude: [
                        {required: true, message: '必填', select: 'blur'}
                    ],
                    spBeaconFrequency: [
                        {required: true, message: '必填', select: 'blur'}
                    ],
                    spPolarization: [
                        {required: true, message: '必填', select: 'blur'}
                    ],
                    spLocalOscillator: [
                    ],
                    spRemark1: [
                    ],
                    spRemark2: [
                    ],
                    spRemark3: [
                    ],
                    spRemark4: [
                    ]
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
            this.getWpStatusList()
        },
        methods: {
            operateRow(obj) {
                if (obj != null) {
                    this.SpacePreset = obj;
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
            async save(spId) {
                let data = (this.updateMark) ? editSpacePreset(this.SpacePreset) : addSpacePreset(this.SpacePreset);
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

        }
    }
</script>
