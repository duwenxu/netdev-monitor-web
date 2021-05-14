let mixin = {
  data () {
    return {
      reconnect: {
        timer: '',
        currentCount: 0,
        allCount: 50,
        step: 3000,
        tag: false
      },
      ws: null,
      dataTag: false,
      connectTag: false,

      WSPages: ['home'],
    }
  },
  beforeRouteLeave(to, from, next) {
    this.ws.close()
    this.ws = null
    next()
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
      // let socket_url =  document.documentURI.split("#")[0].replace("http://","ws://")+"track_socket/ws"
      this.ws = new WebSocket(`ws://${this.$xy.SOCKET_URL}/ws`)
      // this.ws = new WebSocket(socket_url)
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
      }
    },
    dealData (info) {
      // this.$xy.vector.$emit("WS_Info", info)
      this.getWSData(info)
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
      this.sendData()
    },
    onClose (event) {
      this.connectTag = false
      if (this.$route.name === 'home' || this.$route.name === 'status') {
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
}

export default mixin
