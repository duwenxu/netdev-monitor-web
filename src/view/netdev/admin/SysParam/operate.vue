<template>
  <div style="height:100%;padding: 10px 10px">
    <Form ref="sysParam" :model="sysParam" :rules="rulePro" :label-width="150">
      <Row>
        <Col :xs="20" :sm="16" :md="16" :lg="8">
          <FormItem label="参数代码" prop="paraCode">
            <Input v-model.trim="sysParam.paraCode" placeholder="请输入参数代码"></Input>
          </FormItem>
        </Col>
        <Col :xs="20" :sm="16" :md="16" :lg="8">
          <FormItem label="参数名称" prop="paraName">
            <Input v-model.trim="sysParam.paraName" placeholder="请输入参数名称"></Input>
          </FormItem>
        </Col>
        <Col :xs="20" :sm="16" :md="16" :lg="8">
          <FormItem label="参数父代码" prop="paraParentId">
            <Input v-model.trim="sysParam.paraParentId" placeholder="请输入参数父代码"></Input>
          </FormItem>
        </Col>
        <Col :xs="20" :sm="16" :md="16" :lg="8">
          <FormItem label="是否有效" prop="roleStatus">
            <Select v-model="sysParam.isValidate" clearable  placeholder="请选择角色状态">
              <Option  v-for='choose in validateList' :value='choose.value' :key="choose.id">{{choose.name}}</Option>
            </Select>
          </FormItem>
        </Col>
        <Col :xs="20" :sm="16" :md="16" :lg="8">
          <FormItem label="备注一" prop="remark1">
            <Input type="textarea" v-model.trim="sysParam.remark1" placeholder="请输入备注一"></Input>
          </FormItem>
        </Col>
        <Col :xs="20" :sm="16" :md="16" :lg="8">
          <FormItem label="备注二" prop="remark2">
            <Input type="textarea" v-model.trim="sysParam.remark2" placeholder="请输入备注二"></Input>
          </FormItem>
        </Col>
        <Col :xs="20" :sm="16" :md="16" :lg="8">
          <FormItem label="备注三" prop="remark3">
            <Input type="textarea" v-model.trim="sysParam.remark3" placeholder="请输入备注三"></Input>
          </FormItem>
        </Col>
        <Col :xs="20" :sm="16" :md="16" :lg="15">
          <FormItem>
            <Button type="primary" @click="handleSubmit('sysParam')">保存</Button>
            <Button type="default" @click="cancel()" style="margin-left: 8px">关闭</Button>
          </FormItem>
        </Col>
      </Row>
    </Form>
  </div>
</template>

<script>

import { addParam, editParam } from '@/api/admin/sysParam'

export default {
  name: 'operate',
  data () {
    return {
      updateMark: false,
      sysParam: {},
      validateList:[],
      rulePro: {
        paraCode:
            [
                {required: true, message: '必填', trigger: 'blur'}
            ],
        paraName:
            [
              { required: true, message: '必填', trigger: 'blur' }
            ],
        paraParentId:
            [
              { required: true, message: '必填', trigger: 'blur' }
            ],
        isValidate:
            [
                { required: true, message: '必填', trigger: 'blur' }
            ],
        remark1:
            [
              { required: false, trigger: 'blur' }
            ],
        remark2:
            [
              { required: false, trigger: 'blur' }
            ],
        remark3:
            [
              { required: false, trigger: 'blur' }
            ]
      }
    }
  },
  created: function () {
    this.$xy.vector.$on('operateParam', this.operateParam)
  },
  beforeDestroy: function () {
    this.$xy.vector.$off('operateParam', this.operateParam)
  },
  mounted () {
    this.getValidateList();
  },
  methods: {
    operateParam (obj) {
      if (obj != null) {
          this.sysParam = obj;
          this.updateMark = true
      }else{
          this.updateMark = false
      }
    },
      async getValidateList(){
          this.$xy.getParamGroup('0001').then(res=>{
              this.validateList = res;
          })
      },
    handleSubmit (name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          this.save(name)
        } else {
          this.$Message.error('验证未通过!')
        }
      })
    },
    async save (name) {
      let data = (this.updateMark) ? editParam(this.sysParam) : addParam(this.sysParam);
      let { result, success, message } = await data
      if (success) {
        this.$Notice.success({
          title: '成功',
          desc: message,
          duration: 1
        })
        this.$refs[name].resetFields()
        this.$xy.vector.$emit('closeParam')
      } else {
        this.$Notice.error({
          title: '失败',
          desc: message,
          duration: 3
        })
      }
    },
    cancel () {
      this.$refs['sysParam'].resetFields()
      this.$xy.vector.$emit('closeParam')
    }
  }
}
</script>
