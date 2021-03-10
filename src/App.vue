<template>
  <div id="app" :class="themeClass" class="monitorDeviceClass">
    <router-view/>
  </div>
</template>

<script>
import LoginForm  from '@/view/system/login/login'
import { mapState } from 'vuex'
export default {
  comments:{LoginForm},
  name: 'App',
  computed: {
    ...mapState({
      theme: state => state.user.theme
    }),
    themeClass () {
      return `deviceMonitor-theme-${this.theme}`
    }
  }
}
</script>

<style lang="less">
.size {
  width: 100%;
  height: 100%;
}

html, body {
  .size;
  overflow: hidden;
  margin: 0;
  padding: 0;
}

#app {
  .size;
}
</style>
