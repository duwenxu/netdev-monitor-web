<template>
  <div style="max-height:3000px;padding: 0px 10px">
    <Tree :data="menuTree" ref="tree" show-checkbox multiple></Tree>
    <div style="margin-top: 30px;">
      <Button type="primary" @click="handleSubmit()">保存</Button>
      <Button type="default" @click="cancel()" style="margin-left: 8px">关闭</Button>
    </div>
  </div>
</template>
<script>
  import {queryMenuByRole,updateRoleMenu} from '@/api/admin/sysRole'

  export default {
    data () {
      return {
        sysRole: {},
        menuTree:[]
      }
    },
    created: function () {
      this.$xy.vector.$on('assignMenu', this.assignMenu)
    },
    beforeDestroy: function () {
      this.$xy.vector.$off('assignMenu', this.assignMenu)
    },
    mounted() {
    },
    methods: {
      assignMenu(obj) {
        if (obj != null) {
          this.sysRole = obj;
          this.getMenuTree();
        }
      },
      async getMenuTree() {
        let {result, success, message} = await queryMenuByRole(this.sysRole)
        if (success) {
          this.menuTree = result.menuTree
        }else {
          this.$Notice.error({
            title: '失败',
            desc: message,
            duration: 3
          })
        };
      },
      async save(name) {

        /* let data = (this.updateMark) ? editRole(this.sysRole) : addRole(this.sysRole);
         */
      },
      async handleSubmit() {
        console.log(this.$refs.tree.getCheckedAndIndeterminateNodes());
        let roleMenu = {};
        let checkedMenus =  this.$refs.tree.getCheckedAndIndeterminateNodes();
        roleMenu['roleId'] = this.sysRole.roleId;
        roleMenu['roleMenus'] = checkedMenus;
        let {result, success, message} = await updateRoleMenu(roleMenu)
        if (success) {
          this.$Notice.success({
            title: '成功',
            desc: message,
            duration: 1
          })
          this.$xy.vector.$emit('closeAuthModal')
        } else {
          this.$Notice.error({
            title: '失败',
            desc: message,
            duration: 3
          })
        }
      },
      cancel() {
        this.$xy.vector.$emit('closeAuthModal')
      }
    }
  }
</script>
