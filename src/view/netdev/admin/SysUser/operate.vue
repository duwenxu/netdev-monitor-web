<template>
  <div style="height:100%;padding: 10px 10px">
    <Form ref="sysUser" :model="sysUser" :rules="rulePro" :label-width="150">
      <Row>
        <Col :xs="20" :sm="16" :md="16" :lg="8">
          <FormItem  label="登录账号" prop="paraCode">
            <Input  v-model.trim="sysUser.userName" placeholder="请输入用户账号"></Input>
          </FormItem>
        </Col>
        <Col :xs="20" :sm="16" :md="16" :lg="8">
          <FormItem label="用户姓名" prop="userChname">
            <Input v-model.trim="sysUser.userChname" placeholder="请输入用户姓名"></Input>
          </FormItem>
        </Col>
        <Col :xs="20" :sm="16" :md="16" :lg="8">
          <FormItem  label="登录密码" prop="userPwd">
            <Input v-model.trim="sysUser.userPwd" placeholder="请输入登录密码"></Input>
          </FormItem>
        </Col>
        <Col :xs="20" :sm="16" :md="16" :lg="8">
          <FormItem label="用户类型" prop="userType">
            <Select v-model="sysUser.userType" clearable style="width:200px;margin-right: 15px" @on-change="selectUserType" placeholder="请选择用户类型">
              <Option  v-for='choose in userTypeList' :value='choose.value' :key="choose.id">{{choose.name}}</Option>
            </Select>
          </FormItem>
        </Col>
        <Col :xs="20" :sm="16" :md="16" :lg="8">
          <FormItem v-if="showDept" label="所属部门" prop="userOrgid">
            <Select v-model="sysUser.userOrgid" clearable style="width:200px;margin-right: 15px" placeholder="请选择用户类型">
              <Option  v-for='item in deptList' :value='item.departId' :key="item.departId">{{item.departName}}</Option>
            </Select>
          </FormItem>
        </Col>
        <Col :xs="20" :sm="16" :md="16" :lg="8">
          <FormItem v-if="showCstmr" label="所属客户" prop="userOrgid">
            <Select v-model="sysUser.userOrgid" clearable style="width:200px;margin-right: 15px" placeholder="请选择用户类型" >
              <Option  v-for='item in cstmrList' :value='item.ctmrId' :key="item.ctmrId">{{item.ctmrName}}</Option>
            </Select>
          </FormItem>
        </Col>
        <Col :xs="20" :sm="16" :md="16" :lg="8">
          <FormItem v-if="showStation" label="所属测站" prop="userOrgid">
            <Select v-model="sysUser.userOrgid" clearable style="width:200px;margin-right: 15px"  placeholder="请选择所属测站">
              <Option  v-for='item in stationList' :value='item.stationId' :key="item.stationId">{{item.stationName}}</Option>
            </Select>
          </FormItem>
        </Col>
        <Col :xs="20" :sm="16" :md="16" :lg="8">
          <FormItem label="用户手机号" prop="userPhone">
            <Input  v-model.trim="sysUser.userPhone" placeholder="请输入用户手机号"></Input>
          </FormItem>
        </Col>
        <Col :xs="20" :sm="16" :md="16" :lg="8">
          <FormItem label="用户邮箱" prop="userEmail">
            <Input  v-model.trim="sysUser.userEmail" placeholder="请输入用户邮箱"></Input>
          </FormItem>
        </Col>
        <Col :xs="20" :sm="16" :md="16" :lg="8">
          <FormItem label="用户角色" prop="roles">
            <i-select v-model="sysUser.userRole" multiple label-in-value @on-change="saveRoleLable"  style="width:200px"   clearable filterable>
              <i-option v-for="item in roleList" :value="item.roleId">{{ item.roleName }}</i-option>
            </i-select>
          </FormItem>
        </Col>
        <Col :xs="20" :sm="16" :md="16" :lg="15">
          <FormItem>
            <Button  type="primary" @click="handleSubmit('sysUser')">保存</Button>
            <Button type="default" @click="cancel()" style="margin-left: 8px">关闭</Button>
          </FormItem>
        </Col>
      </Row>
    </Form>
  </div>
</template>

<script>

    import {addUser, editUser} from '@/api/admin/sysUser'
    import {queryAllDepartList} from '@/api/admin/sysDepart'
    import {queryAllCstmrList} from '@/api/cstmr/cstmrInfo'
    import {queryAllRoles} from '@/api/admin/sysRole'
    import {queryAllStationList} from '@/api/base/stationInfo'

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
                stationList:[],
                showDept:false,
                showCstmr:false,
                showStation:false,
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
                            {required: false, message: '非法的手机号',trigger: 'blur',pattern:/^((13[0-9])|(17[0-1,6-8])|(15[^4,\\D])|(18[0-9]))\d{8}$/ }
                        ],
                    userEmail:
                        [
                            {required: false,message: '非法的邮箱账号', trigger: 'blur',pattern: /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/}
                        ],
                    userRole:
                        [
                            {required: true, trigger: 'blur'}
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
            this.getUserType();
            this.getAllRoles();
            this.getAllDeparts();
            this.getAllCstmrs();
            this.getAllStations();
        },
        methods: {
            operateRow(obj) {
                if (obj != null) {
                    let userRole = obj.userRole
                    let roleIds = [];
                    for (let i = 0; i <userRole.length ; i++) {
                        roleIds.push(userRole[i].roleId);
                    }
                    obj.userRole = roleIds;
                    let temp = obj.userOrgid;
                    this.sysUser = obj;
                    this.selectUserType(this.sysUser.userType);
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
            async getAllCstmrs(){
                let id =0;
                let {result, success, message} = await queryAllCstmrList(id)
                if (success) {
                    this.cstmrList=result;
                }
            },
            async getAllStations(){
              let {result, success, message} = await queryAllStationList()
              if (success) {
                this.stationList=result;
              }
            },
            selectUserType(userType){
                if(userType == '0004002'){
                    this.showCstmr = false;
                    this.showStation = false;
                    this.showDept = true;
                }else if(userType == '0004003'){
                    this.showDept = false;
                    this.showStation = false;
                    this.showCstmr = true;
                }else{
                    this.showDept = false;
                    this.showCstmr = false;
                    this.showStation = true;
                }
            },

            saveRoleLable(data){
                let userRoles = [];
                for (let i = 0; i < data.length; i++) {
                    let role = {"roleId":data[i].value,"roleName":data[i].label}
                    userRoles.push(role);
                }
                this.roleListTemp = userRoles;
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
                this.sysUser.userRole = this.roleListTemp;
                let data = (this.updateMark) ? editUser(this.sysUser) : addUser(this.sysUser);
                let {result, success, message} = await data
                if (success) {
                    this.$Notice.success({
                        title: '成功',
                        desc: message,
                        duration: 1
                    })
                    this.$refs[name].resetFields()
                    this.sysUser = {};
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
                this.$refs['sysUser'].resetFields();
                this.$xy.vector.$emit('closeModal');
                this.sysUser = {};
            }
        }
    }
</script>
