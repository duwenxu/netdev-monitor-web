<template>
  <div style="height:100%;padding: 10px 10px">
    <Form ref="sysUser" :model="sysUser" :rules="rulePro" :label-width="150">
      <Row>
        <Col :xs="20" :sm="16" :md="16" :lg="8">
          <FormItem  label="登录账号" prop="paraCode">
            <Input  v-model.trim="sysUser.userName" placeholder="请输入用户账号" readonly></Input>
          </FormItem>
        </Col>
        <Col :xs="20" :sm="16" :md="16" :lg="8">
          <FormItem label="用户姓名" prop="userChname">
            <Input v-model.trim="sysUser.userChname" placeholder="请输入用户姓名" readonly></Input>
          </FormItem>
        </Col>
        <Col :xs="20" :sm="16" :md="16" :lg="8">
          <FormItem  label="登录密码" prop="userPwd">
            <Input v-model.trim="sysUser.userPwd" placeholder="请输入登录密码" readonly></Input>
          </FormItem>
        </Col>
        <Col :xs="20" :sm="16" :md="16" :lg="8">
          <FormItem label="用户类型" prop="userType">
            <Select v-model="sysUser.userType" clearable style="width:200px;margin-right: 15px"  placeholder="请选择用户类型" :disabled="true"  >
              <Option  v-for='choose in userTypeList' :value='choose.value' :key="choose.id">{{choose.name}}</Option>
            </Select>
          </FormItem>
        </Col>
        <Col :xs="20" :sm="16" :md="16" :lg="8">
          <FormItem v-if="showDept" label="所属部门" prop="userOrgid">
            <Select v-model="sysUser.userOrgid" clearable style="width:200px;margin-right: 15px" placeholder="请选择用户类型"  :disabled="true"  >
              <Option  v-for='item in deptList' :value='item.departId' :key="item.departId">{{item.departName}}</Option>
            </Select>
          </FormItem>
        </Col>
        <Col :xs="20" :sm="16" :md="16" :lg="8">
          <FormItem v-if="showCstmr" label="所属客户" prop="userOrgid">
            <Select v-model="sysUser.userOrgid" clearable style="width:200px;margin-right: 15px" placeholder="请选择用户类型"  :disabled="true"  >
              <Option  v-for='item in cstmrList' :value='item.ctmrId' :key="item.ctmrId">{{item.ctmrName}}</Option>
            </Select>
          </FormItem>
        </Col>
        <Col :xs="20" :sm="16" :md="16" :lg="8">
          <FormItem label="用户手机号" prop="userPhone">
            <Input  v-model.trim="sysUser.userPhone" placeholder="请输入用户手机号" readonly></Input>
          </FormItem>
        </Col>
        <Col :xs="20" :sm="16" :md="16" :lg="8">
          <FormItem label="用户邮箱" prop="userEmail">
            <Input  v-model.trim="sysUser.userEmail" placeholder="请输入用户邮箱" readonly></Input>
          </FormItem>
        </Col>
        <Col :xs="20" :sm="16" :md="16" :lg="8">
          <FormItem label="用户角色" prop="roles">
            <i-select v-model="sysUser.userRole" multiple label-in-value  style="width:200px"   clearable filterable  :disabled="true" >
              <i-option v-for="item in roleList" :value="item.roleId">{{ item.roleName }}</i-option>
            </i-select>
          </FormItem>
        </Col>
        <Col :xs="20" :sm="16" :md="16" :lg="15">
          <FormItem>
            <Button type="default" @click="cancel()" style="margin-left: 8px">关闭</Button>
          </FormItem>
        </Col>
      </Row>
    </Form>
  </div>
</template>

<script>

    import {queryAllDepartList} from '@/api/admin/sysDepart'
    import {queryAllRoles} from '@/api/admin/sysRole'

    export default {
        name: 'operate',
        data() {
            return {
                updateMark: false,
                sysUser: {},
                userTypeList: [],
                roleListTemp:[],
                deptList:[],
                cstmrList:[],
                roleList:[],
                showDept:false,
                showCstmr:false,
                rulePro: {
                    userName:
                        [
                            {required: true, message: '必填', trigger: 'blur'}
                        ],
                    userChname:
                        [
                            {required: true, message: '必填', trigger: 'blur'}
                        ],
                    userType:
                        [
                            {required: true, message: '必填', trigger: 'blur'}
                        ],
                    userPwd:
                        [
                            {required: true, message: '必填',trigger: 'blur'}
                        ],
                    userPhone:
                        [
                            {required: false, trigger: 'blur'}
                        ],
                    userEmail:
                        [
                            {required: false, trigger: 'blur'}
                        ],
                    userRole:
                        [
                            {required: true, trigger: 'blur'}
                        ]
                }
            }
        },
        created: function () {
            this.$xy.vector.$on('detailRow', this.detailRow)
        },
        beforeDestroy: function () {
            this.$xy.vector.$off('detailRow', this.detailRow)
        },
        mounted() {
            this.getUserType();
            this.getAllRoles();
            this.getAllDeparts();
        },
        methods: {
            detailRow(obj) {
                if (obj != null) {
                    let userRole = obj.userRole
                    let roleIds = [];
                    for (let i = 0; i <userRole.length ; i++) {
                        roleIds.push(userRole[i].roleId);
                    }
                    obj.userRole = roleIds;
                    let temp = obj.userOrgid;
                    let userType = obj.userType;

                    if(userType == '0004002'){
                        obj["departId"] = temp;
                        this.showCstmr = false;
                        this.showDept = true;
                    }else if(userType == '0004003'){
                        obj["ctmrId"] = temp;
                        this.showDept = false;
                        this.showCstmr = true;
                    }
                    this.sysUser = obj;
                    this.updateMark = true
                } else {
                    this.updateMark = false
                }
            },
            async getUserType(){
                this.$xy.getParamGroup('0004').then(res=>{
                    this.userTypeList = res;
                })
            },
            async getAllRoles(){
                let id =0;
                let {result, success, message} = await queryAllRoles(id)
                if (success) {
                    this.roleList=result;
                }
            },

            async getAllDeparts(){
                let id =0;
                let {result, success, message} = await queryAllDepartList(id)
                if (success) {
                    this.deptList=result;
                }
            },
            cancel() {
                this.$refs['sysUser'].resetFields()
                this.$xy.vector.$emit('closeDetail')
            }
        }
    }
</script>
