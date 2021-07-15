<template>

</template>
<script>
export default {
  data() {
    return {

    }
  },
  created() {
    // 获取当前的路由
    console.log(this.$route)
    let path=this.$route.params.link
//替换为原先路由
    this.$router.replace({
      path:path
    })
  }
}
</script>
