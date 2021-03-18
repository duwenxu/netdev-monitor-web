let mixin = {
  data () {
    return {
      reconnect: {
        timer: '',
        currentCount: 0,
        allCount: 200,
        step: 3000,
        tag: false
      },
      ws: null,
      dataTag: false,
      connectTag: false,

      WSPages: ['home']
    }
  },
  watch: {
    $route() {
      this.openHomePage();
    },
  },
  mounted () {
    this.connectWs()
    this.openHomePage()
  },
  methods: {
    clearWsStatus() {
      this.reconnect.currentCount = 0;
      if (this.reconnect.timer) {
        clearTimeout(this.reconnect.timer);
        this.reconnect.timer = null;
      }
    },
    connectWs () {
      this.ws = new WebSocket(`ws://${this.$xy.SOCKET_URL}/ws`)
      this.ws.onopen = (evt) => {
        this.connectTag = true;
        this.clearWsStatus()
        if (this.dataTag) {
          this.sendData();
          this.dataTag = false;
        }
      }
      this.ws.onmessage = (evt) => {
        this.onmessage(evt)
      }
      this.ws.onclose = this.onClose
    },
    onmessage (evt) {
      if (evt.data) {
        let info = JSON.parse(evt.data)
        this.dealData(info)

        // let { header, body } = info
        // if (header.businessType === 'INVALID_TOKEN') {
        //   this.$Message.warning('请重新登录')
        //   // this.removeToken()
        //   this.$router.push({
        //     name: 'login'
        //   })
        // } else if (header.messageType === 1 && header.serviceName === 'xy-orbit-service') {
        //   this.dealData(body)
        // }
      }
    },
    dealData (info) {
      if (this.$route.name === 'home') {
        this.$xy.vector.$emit("WS_homeInfo", info)
      }
    },
    sendData(){
      if (this.connectTag) {
        let sendData = JSON.stringify({interfaceMark:"DevStatusInfos"})
        this.ws.send(sendData);
      } else {
        this.dataTag = true;
      }
    },
    openHomePage () {
      if (this.WSPages.includes(this.$route.name) && this.$route.name === 'home') {
        this.sendData()
      }
    },
    onClose () {
      if (this.reconnect.currentCount < this.reconnect.allCount) {
        this.reconnect.timer = setTimeout(() => {
          this.reconnect.currentCount++
          this.connectWs()
          this.reconnect.tag = true
        }, this.reconnect.step)
      }
    }
  }
}

export default mixin
