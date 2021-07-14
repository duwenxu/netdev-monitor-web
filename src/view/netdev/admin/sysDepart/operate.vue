<template>
  <div style="height:100%;padding: 10px 10px">
    <Form ref="sysDepart" :model="sysDepart" :rules="rulePro" :label-width="150">
      <Row>
        <Col :xs="24" :sm="12" :md="12" :lg="12">
          <FormItem label="部门名称" prop="paraCode">
            <Input v-model.trim="sysDepart.departName" placeholder="请输入部门名称"></Input>
          </FormItem>
        </Col>
        <Col :xs="24" :sm="12" :md="12" :lg="12">
          <FormItem label="部门代号" prop="userChname">
            <Input v-model.trim="sysDepart.departCode" placeholder="请输入部门代号"></Input>
          </FormItem>
        </Col>
        <Col :xs="24" :sm="12" :md="12" :lg="12">
          <FormItem label="备注" prop="userEmail">
            <Input type="textarea"  v-model.trim="sysDepart.remark1" placeholder="请输入备注信息"></Input>
          </FormItem>
        </Col>
        <Col :xs="24" :sm="24" :md="24" :lg="24">
          <FormItem>
            <Button type="primary" @click="handleSubmit('sysDepart')">保存</Button>
            <Button type="default" @click="cancel()" style="margin-left: 8px">关闭</Button>
          </FormItem>
        </Col>
      </Row>
    </Form>
  </div>
</template>

<script>

    import {editDepart, addDepart} from '@/api/admin/sysDepart'

    export default {
        name: 'operate',
        data() {
            return {
                updateMark: false,
                sysDepart: {},
                rulePro: {
                    departName:
                        [
                            {required: true, message: '必填', trigger: 'blur'}
                        ],
                    departCode:
                        [
                            {required: true, message: '必填', trigger: 'blur'}
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
        },
        methods: {
            operateRow(obj) {
                if (obj != null) {
                    this.sysDepart = obj;
                    this.updateMark = true
                } else {
                    this.updateMark = false
                }
            },
            handleSubmit(name) {
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        this.save(name)
                    } else {
                        this.$Message.error('验证未通过!')
                    }
                })
            },
            async save(name) {
                let data = (this.updateMark) ? editDepart(this.sysDepart) : addDepart(this.sysDepart);
                let {result, success, message} = await data
                if (success) {
                    this.$Notice.success({
                        title: '成功',
                        desc: message,
                        duration: 1
                    })
                    this.$refs[name].resetFields()
                    this.$xy.vector.$emit('closeModal')
                } else {
                    this.$Notice.error({
                        title: '失败',
                        desc: message,
                        duration: 3
                    })
                }
            },
            cancel() {
                this.$refs['sysDepart'].resetFields()
                this.$xy.vector.$emit('closeModal')
            }
        }
    }
</script>
