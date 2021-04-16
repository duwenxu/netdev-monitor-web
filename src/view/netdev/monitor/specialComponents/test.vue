<template>
<div class="param-wrap">
  <Row>
    <Col :xs="8" :md="8" v-for="info in infos" style="padding: 8px">
      <span class="name-text">{{info.name}}</span>:<span class="value-text">{{info.value}}</span>
    </Col>
  </Row>
</div>
</template>

<script>
export default {
  name: "test",
  data(){
    return{
      pageObj:{},
      infos:[]
    }
  },
  mounted() {

  },
  created: function () {
    this.$xy.vector.$on('pageInfo', this.getInfo)
  },
  beforeDestroy: function () {
    this.$xy.vector.$off('pageInfo', this.getInfo)
  },
  methods:{
    getInfo(data){
      data.forEach(item=>{
        if(item.itfPagePath == 'test'){
          this.pageObj = item
          this.getWs()
        }
      })
    },
    getWs() { //初始化weosocket
      const wsurl = 'ws://' + this.$xy.SOCKET_URL + '/ws'
      /*-----------------设备参数--------------*/
      this.page_socket = new WebSocket(wsurl)
      this.page_socket.onopen = this.pageSend
      this.page_socket.onmessage = this.getPageData
    },
    pageSend() {
      let obj = JSON.stringify({'interfaceMark': "DevPageInfos", 'devNo': this.$route.name,"cmdMark":this.pageObj.itfCmdMark})
      this.page_socket.send(obj)
    },
    getPageData(frame){
      let data = JSON.parse(frame.data)
      let result = []
     data.forEach(item=>{
       for(var info in item){
         result.push({name:info,value:item[info]})
       }
     })
      this.infos = result
    },

  }
}
</script>

<style scoped>
.param-wrap {
  border: 1px solid #009688;
  margin-bottom: 10px;
  overflow: auto;
  height: 450px;
  border-radius: 5px;
  padding: 10px
}
.name-text{
  font-size: 16px;
  color: #009688;
  letter-spacing: 3px;
}
.value-text{
  font-size: 16px;
}
</style>
