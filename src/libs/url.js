import Vue from 'vue'
import {queryParamByParentId} from '@/api/admin/sysParam';
// import dayjs from 'dayjs';


const Setting = {}
Setting.vector = new Vue()
let proto = document.location.protocol


Setting.isLocal = true//是否开发环境
if(Setting.isLocal){
  // Setting.SPACE_URL = 'http://172.21.2.184:8080'
  // Setting.SOCKET_URL =  'ws://172.21.2.184:8888/ws'
  Setting.SPACE_URL = 'http://172.21.5.226:8080'
  Setting.SOCKET_URL = 'ws://172.21.5.226:8888/ws'
}else{
  Setting.SPACE_URL = '/track'
  Setting.SOCKET_URL = document.documentURI.split("#")[0].replace("http://", "ws://") + 'track_socket/ws'
}


 Setting.getParamGroup = async(parentId) => {
  let params = [];
  await queryParamByParentId(parentId).then(res=>{
    if (res.success) {
      for(let i in res.result){
        let map = res.result[i];
        params.push({id:map.paraCode,name:map.paraName,value:map.paraCode,remark1:map.remark1,remark2:map.remark2,remark3:map.remark3,status:map.isValidate});
      }
    }
  })
   return params;
},

Setting.formatDate = function(time) {
  let date=new Date(time);
  let year=date.getFullYear();
  let month= date.getMonth()+1<10 ? "0"+(date.getMonth()+1) : date.getMonth()+1;
  let day=date.getDate()<10 ? "0"+date.getDate() : date.getDate();
  let hours=date.getHours()<10 ? "0"+date.getHours() : date.getHours();
  let minutes=date.getMinutes()<10 ? "0"+date.getMinutes() : date.getMinutes();
  let seconds=date.getSeconds()<10 ? "0"+date.getSeconds() : date.getSeconds();
  return year+"-"+month+"-"+day+" "+hours+":"+minutes+":"+seconds;
},

Setting.error =   function(title,message) {
  this.$Notice.error({
    title: title,
    desc: message,
    duration: 3
  })
}

Setting.warning =  function(title,message) {
  this.$Notice.warning({
    title: title,
    desc: message,
    duration: 3
  })
}

Setting.success =   function(title,message) {
  this.$Notice.success({
    title: title,
    desc: message,
    duration: 3
  })
}

export default {
  Setting,
  install(Vue) {
    Vue.prototype.$xy = Setting
  }
}


