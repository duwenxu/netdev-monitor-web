<template>
  <div class="param-wrap" :style="{height:normalHeight+'px'}">
  <Row>
    <template v-if="infos.length">
      <Col :xs="8" :md="8" v-for="(info,index) in infos"   :key="index"  style="padding: 8px">
        <template v-if="($route.name == 'home' && info.ndpaIsImportant) || $route.name != 'home'">
          <span class="name-text">{{info.name}}</span>:<span class="value-text">{{info.value}}</span>
        </template>
      </Col>
    </template>
   <template v-else>
     <span>暂无数据</span>
   </template>
  </Row>
</div>
</template>

<script>
export default {
  name: "dztSingle",
  data(){
    return{
      devNo:'',
      normalHeight:250,
      pageObj:{},
      infos:[],
      page_socket:null
    }
  },
  mounted() {

  },
  created: function () {
    this.$xy.vector.$on('changesize', this.sizeInfo)
    this.$xy.vector.$on('pageInfo', this.getInfo)
  },
  beforeDestroy: function () {
    this.$xy.vector.$off('changesize', this.sizeInfo)
    this.$xy.vector.$off('pageInfo', this.getInfo)
  },
  beforeRouteLeave(to, from, next) {
    this.page_socket.close()
    this.page_socket = null
    next()
  },
  methods:{
    sizeInfo(data){
      if(data.showAlert || data.showLog){
        this.normalHeight = 250
      }else{
        this.normalHeight = 400
      }
    },
    getInfo(data){
      this.devNo = data.devNo
      data.forEach(item=>{
        if(item.itfPagePath == 'dztSingle'){
          this.pageObj = item
          this.getWs()
        }
      })
    },
    getWs() { //初始化weosocket
      let wsurl = this.$xy.isLocal?'ws://' + this.$xy.SOCKET_URL:document.documentURI.split("#")[0].replace("http://","ws://")+this.$xy.SOCKET_URL
      this.ws = new WebSocket(wsurl)
      /*-----------------设备参数--------------*/
      this.page_socket = new WebSocket(wsurl)
      this.page_socket.onopen = this.pageSend
      this.page_socket.onmessage = this.getPageData
    },
    pageSend() {
      let obj = JSON.stringify({'interfaceMark': "DevPageInfos", 'devNo':this.devNo?this.devNo: this.$route.name,"cmdMark":this.pageObj.itfCmdMark})
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
  height: 250px;
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
