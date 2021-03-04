<template>
  <div style="height:100%;padding: 10px 10px">
    <Form ref="sysMenu" :model="sysMenu" :rules="rulePro" :label-width="150">
      <Row>
        <Col :xs="20" :sm="16" :md="16" :lg="8">
          <FormItem label="菜单标题" prop="menuTitle">
            <Input v-model.trim="sysMenu.menuTitle" placeholder="请输入菜单中文标题"></Input>
          </FormItem>
        </Col>
        <Col :xs="20" :sm="16" :md="16" :lg="8">
          <FormItem label="菜单名称" prop="menuName">
            <Input v-model.trim="sysMenu.menuName" placeholder="请输入菜单英文名称"></Input>
          </FormItem>
        </Col>
        <Col :xs="20" :sm="16" :md="16" :lg="8">
          <FormItem label="菜单图标" prop="menuIcon">
            <Input v-model.trim="sysMenu.menuIcon" placeholder="请输入菜单图标"></Input>
          </FormItem>
        </Col>
        <Col :xs="20" :sm="16" :md="16" :lg="8">
          <FormItem label="菜单序号" prop="menuSeq">
            <Input v-model.trim="sysMenu.menuSeq" placeholder="请输入排序编号"></Input>
          </FormItem>
        </Col>
        <Col :xs="20" :sm="16" :md="16" :lg="8">
          <FormItem label="是否隐藏菜单" prop="menuHidden">
            <Select v-model="sysMenu.menuHidden" clearable  placeholder="请选择菜单隐藏状态">
              <Option  v-for='choose in codiList' :value='choose.value'>{{choose.name}}</Option>
            </Select>
          </FormItem>
        </Col>
        <Col :xs="20" :sm="16" :md="16" :lg="8">
          <FormItem label="是否隐藏面包屑" prop="menuBread">
            <Select v-model="sysMenu.menuBread" clearable  placeholder="请选择面包屑隐藏状态">
              <Option  v-for='choose in codiList' :value='choose.value'>{{choose.name}}</Option>
            </Select>
          </FormItem>
        </Col>
        <Col :xs="20" :sm="16" :md="16" :lg="8">
          <FormItem label="是否添加缓存" prop="menuCache">
            <Select v-model="sysMenu.menuCache" clearable  placeholder="请选择面包屑隐藏状态">
              <Option  v-for='choose in codiList' :value='choose.value'>{{choose.name}}</Option>
            </Select>
          </FormItem>
        </Col>
        <Col :xs="20" :sm="16" :md="16" :lg="16">
          <FormItem label="菜单路径" prop="menuPath">
            <Input v-model.trim="sysMenu.menuPath" placeholder="请输入菜单路径"></Input>
          </FormItem>
        </Col>

        <Col :xs="20" :sm="16" :md="16" :lg="16">
          <FormItem label="菜单组件" prop="menuComponent">
            <Input v-model.trim="sysMenu.menuComponent" placeholder="请输入菜单组件"></Input>
          </FormItem>
        </Col>
        <Col :xs="20" :sm="16" :md="16" :lg="15">
          <FormItem>
            <Button type="primary" @click="handleSubmit('sysMenu')">保存</Button>
            <Button type="default" @click="cancel()" style="margin-left: 8px">关闭</Button>
          </FormItem>
        </Col>
      </Row>
    </Form>
  </div>
</template>

<script>

  import {addMenu, editMenu} from '@/api/admin/sysMenu'

  export default {
    name: 'operate',
    data() {
      return {
        updateMark: false,
        sysMenu: {},
        roleList: [],
        roleListTemp: [],
        codiList:[{"name":"是","value":1},{"name":"否","value":0}],
        rulePro: {
          menuTitle:
            [
              {required: true, message: '必填', trigger: 'blur'}
            ],
          menuName:
            [
              {required: true, message: '必填', trigger: 'blur'}
            ],
          menuIcon:
            [
              {required: false,}
            ],
          menuComponent:
            [
              {required: true, message: '必填', trigger: 'blur'}
            ],
          menuPath:
            [
              {required: true, message: '必填', trigger: 'blur'}
            ],
          menuHidden:
            [
              { required: false }
            ],
          menuBread:
            [
              { required: false }
            ],
          menuCache:
            [
              { required: false  }
            ],
          menuSeq:
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
        if (obj.isUpd) {
          this.sysMenu = obj.sysMenu;
          if(obj.sysMenu.menuHidden){
            this.sysMenu.menuHidden = 1;
          }else{
            this.sysMenu.menuHidden = 0;
          }
          if(obj.sysMenu.menuBread){
            this.sysMenu.menuBread = 1;
          }else{
            this.sysMenu.menuBread = 0;
          }
          if(obj.sysMenu.menuCache){
            this.sysMenu.menuCache = 1;
          }else{
            this.sysMenu.menuCache = 0;
          }
          this.updateMark = true;
        } else {
          this.updateMark = false;
          this.sysMenu.menuParentId = obj.sysMenu.menuParentId;
          this.sysMenu.menuType = 0;
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
        let data = (this.updateMark) ? editMenu(this.sysMenu) : addMenu(this.sysMenu);
        let {result, success, message} = await data;
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
        this.$refs['sysMenu'].resetFields()
        this.$xy.vector.$emit('closeModal')
      }
    }
  }
</script>
