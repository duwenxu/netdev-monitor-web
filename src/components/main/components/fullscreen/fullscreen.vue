<template>
  <div v-if="showFullScreenBtn" class="full-screen-btn-con">
    <Tooltip :content="value ? '退出全屏' : '全屏'" placement="bottom">
      <Icon @click.native="handleChange" :type="value ? 'md-contract' : 'md-expand'" :size="22"></Icon>
    </Tooltip>
  </div>
</template>

<script>
export default {
  name: 'Fullscreen',
  computed: {
    showFullScreenBtn () {
      return window.navigator.userAgent.indexOf('MSIE') < 0 && this.screenWidth > 768
    }
  },
  props: {
    value: {
      type: Boolean,
      default: false
    },
    screenWidth: 0
  },
  methods: {
    handleFullscreen () {
      let main = document.body
      if (this.value) {
        if (document.exitFullscreen) {
          document.exitFullscreen()
        } else if (document.mozCancelFullScreen) {
          document.mozCancelFullScreen()
        } else if (document.webkitCancelFullScreen) {
          document.webkitCancelFullScreen()
        } else if (document.msExitFullscreen) {
          document.msExitFullscreen()
        }
      } else {
        if (main.requestFullscreen) {
          main.requestFullscreen()
        } else if (main.mozRequestFullScreen) {
          main.mozRequestFullScreen()
        } else if (main.webkitRequestFullScreen) {
          main.webkitRequestFullScreen()
        } else if (main.msRequestFullscreen) {
          main.msRequestFullscreen()
        }
      }
    },
    handleChange () {
      this.handleFullscreen()
    },
    getValue(){
      this.$emit('input', !this.value)
      this.$emit('on-change', !this.value)
    }
  },
  mounted () {
    let isFullscreen = document.fullscreenElement || document.mozFullScreenElement || document.webkitFullscreenElement || document.fullScreen || document.mozFullScreen || document.webkitIsFullScreen
    isFullscreen = !!isFullscreen
    document.addEventListener('fullscreenchange', this.getValue)
    document.addEventListener('mozfullscreenchange', this.getValue)
    document.addEventListener('webkitfullscreenchange', this.getValue)
    document.addEventListener('msfullscreenchange', this.getValue)
    this.$emit('input', isFullscreen)
  },
  beforeDestroy() {
    document.removeEventListener('msfullscreenchange', this.getValue);
    document.removeEventListener('fullscreenchange', this.getValue);
    document.removeEventListener('webkitfullscreenchange', this.getValue);
    document.removeEventListener('msfullscreenchange', this.getValue);
  }
}
</script>

<style lang="less">
.full-screen-btn-con {
  height: 100%;
  .ivu-tooltip {
    height: 100%;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    .ivu-tooltip-rel{
      height: 100%;
      i{
        cursor: pointer;
        border-radius: 50%;
        text-align: center;
        box-sizing: border-box;
        border: 1px solid;
      }
    }
  }
}
</style>
