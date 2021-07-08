
let leaveMixin ={
  beforeRouteLeave: function(to, from, next) {
    if (this.ctrl_socket) {
      this.ctrl_socket.close()
      this.ctrl_socket = null
    }
    this.warnSocket.close()
    this.warnSocket = null
    this.logSocket.close()
    this.logSocket = null

    if (this.$vnode && this.$vnode.data.keepAlive && from.name == 'register' && to.path.indexOf('home') != -1) {
      if (this.$vnode.parent && this.$vnode.parent.componentInstance && this.$vnode.parent.componentInstance.cache) {
        if (this.$vnode.componentOptions) {
          var key = this.$vnode.key == null ? this.$vnode.componentOptions.Ctor.cid + (this.$vnode.componentOptions.tag ? `::${this.$vnode.componentOptions.tag}` : '') : this.$vnode.key
          var cache = this.$vnode.parent.componentInstance.cache
          var keys = this.$vnode.parent.componentInstance.keys
          if (cache[key]) {
            if (keys.length) {
              var index = keys.indexOf(key)
              if (index > -1) {
                keys.splice(index, 1)
              }
            }
            delete cache[key]
          }
        }
      }
    }
    next()
  }
}
export default leaveMixin
