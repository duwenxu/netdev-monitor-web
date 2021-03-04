<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>


<script>
 //import LoginForm  from '@/components/login-form'
 //import LoginForm  from '@/view/single-page/home'
import LoginForm  from '@/view/system/login/login'

  export default {
    name: 'App',
    components: {
      'LoginForm': LoginForm
    },
    data() {
      return {}
    }
  }
</script>



<style lang="less">
.size{
  width: 100%;
  height: 100%;
}
html,body{
  .size;
  overflow: hidden;
  margin: 0;
  padding: 0;
  //background-image: url('./assets/images/theme/背景.jpg'); ;
}
#app {
  .size;
}
</style>
