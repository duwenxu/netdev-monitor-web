import Vue from 'vue'
import {queryParamByParentId} from '@/api/admin/sysParam';
import dayjs from 'dayjs';


const Setting = {}
Setting.vector = new Vue()
let proto = document.location.protocol

Setting.SPACE_URL = '/track'
Setting.SOCKET_URL = '/track_socket'

// Setting.SPACE_URL = ('https:' == proto ? '' : 'http://172.21.2.100:8080')
// Setting.SOCKET_URL = ('https:' == proto ? '' : '172.21.2.100:8888')
//
// Setting.SPACE_URL = ('https:' == proto ? '' : 'http://172.21.7.4:8080')
// Setting.SOCKET_URL = ('https:' == proto ? '' : '172.21.7.4:8888')


 Setting.getParamGroup = async(parentId) => {
  let params = [];
  await queryParamByParentId(parentId).then(res=>{
    if (res.success) {
      for(let i in res.result){
        let map = res.result[i];
        params.push({id:map.paraCode,name:map.paraName,value:map.paraCode,remark1:map.remark1,remark2:map.remark2,remark3:map.remark3});
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


