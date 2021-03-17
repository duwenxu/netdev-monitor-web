import Vue from 'vue'
import {queryParamByParentId} from '@/api/admin/sysParam';
import dayjs from 'dayjs';


const Setting = {}
Setting.vector = new Vue()
let proto = document.location.protocol

// Setting.SPACE_URL = ('https:' == proto ? '' : 'http://172.21.2.100:8083')
Setting.SPACE_URL = ('https:' == proto ? '' : 'http://172.21.2.190:8080')
Setting.wsUrl = 'ws://172.21.5.226:9000/ws'
// if (location.hostname == '172.23.4.31' ||  location.hostname == 'ybtest.xy.in') {
//   Setting.SPACE_URL = ('https:' == proto ? '' : 'http://172.23.4.31:8081/api/v1.0');
//   Setting.FORMULA_URL = ('https:' == proto ? '' : 'http://172.23.4.31:8082/dsl-service/v1.0');
//   Setting.ORDER_URL = ('https:' == proto ? '' : 'http://172.23.4.31:8086/cloud-flight/v1.0');
//   Setting.FILE_URL = ('https:' == proto ? '' : 'http://172.23.4.31:8085/cloud-api-zt/v1.0');
//   Setting.SOCKET_URL = ('https:' == proto ? '' : 'http://172.23.4.31:8086');
//   Setting.PLAY_URL = ('https:' == proto ? '' : 'http://172.23.4.31:8089/cloud-data-playback/v1.0');
//   Setting.PLAY_SOCKET = ('https:' == proto ? '' : 'http://172.23.4.31:8089');
//   Setting.RULE = ('https:' == proto ? '' : 'http://172.23.4.31:8089/criteria/v1.0');
// }else if (location.hostname == 'cloud.xy.uat' || location.hostname == '172.23.1.226') {
//   Setting.SPACE_URL = ('https:' == proto ? '' : 'http://cloud-core.uat/api/v1.0');
//   Setting.FORMULA_URL = ('https:' == proto ? '' : 'http://cloud-dsl.uat/dsl-service/v1.0');
//   Setting.ORDER_URL = ('https:' == proto ? '' : 'http://cloud-flight.uat/cloud-flight/v1.0');
//   Setting.FILE_URL = ('https:' == proto ? '' : 'http://cloud-api-zt.uat/cloud-api-zt/v1.0');
//   Setting.SOCKET_URL = ('https:' == proto ? '' : 'http://cloud-flight.uat');
//   Setting.PLAY_URL = ('https:' == proto ? '' : 'http://cloud-playback.uat/cloud-data-playback/v1.0');
//   Setting.PLAY_SOCKET = ('https:' == proto ? '' : 'http://cloud-playback.uat');
// }else{
// //  Setting.SPACE_URL = ('https:' == proto ? '' : 'http://cloud-core.fat/api/v1.0');
//   Setting.SPACE_URL = ('https:' == proto ? '' : 'http://127.0.0.1:8080/netmgr/');
//   Setting.FORMULA_URL = ('https:' == proto ? '' :'http://cloud-dsl.fat/dsl-service/v1.0');
//   Setting.ORDER_URL = ('https:' == proto ? '' : 'http://172.21.2.61:9091/cloud-flight/v1.0');
//   Setting.FILE_URL = ('https:' == proto ? '' : 'http://cloud-api-zt.fat/cloud-api-zt/v1.0');
//   Setting.SOCKET_URL = ('https:' == proto ? '' : 'http://cloud-flight.fat');
//   Setting.PLAY_URL = ('https:' == proto ? '' : 'http://cloud-playback.fat/cloud-data-playback/v1.0');
//   Setting.PLAY_SOCKET = ('https:' == proto ? '' : 'http://cloud-playback.fat');
//   Setting.wsOrder = ('https:' == proto ? '' : 'http://172.21.2.61:8088/criteria/v1.0');
// }

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


