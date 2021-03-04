<template>
  <div style="height:100%;padding: 10px 10px">
    <Form ref="sysRole" :model="sysRole" :rules="rulePro" :label-width="150">
      <Row>
        <Col :xs="20" :sm="16" :md="16" :lg="8">
          <FormItem label="角色名称" prop="roleName">
            <Input v-model.trim="sysRole.roleName" placeholder="请输入角色名称"></Input>
          </FormItem>
        </Col>
        <Col :xs="20" :sm="16" :md="16" :lg="10">
          <FormItem label="角色状态" prop="roleStatus">
            <Select v-model="sysRole.roleStatus" clearable style="width:200px;margin-right: 15px" placeholder="请选择角色状态">
              <Option  v-for='choose in roleStatus' :value='choose.value' :key="choose.id">{{choose.name}}</Option>
            </Select>
          </FormItem>
        </Col>

        <Col :xs="20" :sm="16" :md="16" :lg="8">
          <FormItem label="角色描述" prop="roleDesc">
            <Input type="textarea"  v-model.trim="sysRole.roleDesc" placeholder="请输入备注信息"></Input>
          </FormItem>
        </Col>
        <Col :xs="20" :sm="16" :md="16" :lg="15">
          <FormItem>
            <Button type="primary" @click="handleSubmit('sysRole')">保存</Button>
            <Button type="default" @click="cancel()" style="margin-left: 8px">关闭</Button>
          </FormItem>
        </Col>
      </Row>
    </Form>
  </div>
</template>

<script>

    import {addRole, editRole} from '@/api/admin/sysRole'

    export default {
        name: 'operate',
        data() {
            return {
                updateMark: false,
                sysRole: {},
                roleStatus:[],
                rulePro: {
                    roleName:
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
            this.getRoleStatus();
        },
        methods: {
            operateRow(obj) {
                if (obj != null) {
                    this.sysRole = obj;
                    this.updateMark = true
                } else {
                    this.updateMark = false
                }
            },
            async getRoleStatus(){
                this.$xy.getParamGroup('0001').then(res=>{
                    this.roleStatus = res;
                })
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
                let data = (this.updateMark) ? editRole(this.sysRole) : addRole(this.sysRole);
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
                this.$refs['sysRole'].resetFields()
                this.$xy.vector.$emit('closeModal')
            }
        }
    }
</script>
