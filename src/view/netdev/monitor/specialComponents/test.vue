<template>
<div>2222222222222222222</div>
</template>

<script>
export default {
  name: "test",
  mounted() {
    // console.log('我是test')
  },
  created: function () {
    this.$xy.vector.$on('ceshi', this.ceshi)
  },
  beforeDestroy: function () {
    this.$xy.vector.$off('ceshi', this.ceshi)
  },
  methods:{
    ceshi(obj){
      console.log('我是test')
    }
  }
}
</script>

<style scoped>

</style>
