<template>
  <div class="searchPar" @keyup.enter="init">
    <template v-for='(data,index) in searchData'>
      <template v-if='data.type==1 && !data.isHide'>
        <Input v-model.trim="data.value" :name='data.key'
               :placeholder="data.placeholder" :readonly="data.readonly" clearable style="width: 120px;margin-right: 10px"></Input>
      </template>
      <template v-if='data.type==2'>
        <Select v-model="data.value" clearable :placeholder="data.placeholder" @on-change="handleClick(data,$event)" style="width:120px;margin-right: 10px">
          <Option  v-for='choose in data.data' :value='choose.value' :key="choose.id">{{choose.name}}</Option>
        </Select>
      </template>
      <template v-if='data.type==3'>
        <DatePicker :placeholder="data.placeholder" v-model="data.value" :style="{width: data.long == 2?'150px':'250px'}" :type="data.long == 2?'date':'datetimerange'" style="margin-right: 10px"></DatePicker>
      </template>
      <template v-if='index==searchData.length-1'>
        <Button @click="init" style="background-color: #fea230;border: 0px;color: #ffffff;">搜索</Button>
        <Button @click="reset" style="background-color: #2fb685;border: 0px;color: #ffffff">重置</Button>
      </template>
    </template>
  </div>
</template>
<style scoped>
.searchPar {
  margin-bottom: 15px;
}

.searchPar .date{
  float: left;
  /*margin-top: 10px;*/
  width: 200px;
  margin-right: 20px;

}

.searchPar button {
  /*margin-top: 2px;*/
  margin-right: 5px;
}
</style>
<script>
export default{
  name:'search',
  props:{
    searchData: {
      type: Array,
      default: []
    },
  },
  data(){
    return {
      time: '',
      value1: '',
      search: {},
    }
  },
  methods: {
    handleClick(data,item){
      this.$emit('input',data,item)
    },
    init: function () {
      var that = this
      var isSend = false
      for (var i = 0, j = that.searchData.length; i < j; i++) {
        var obj = that.searchData[i]
        if(obj.type == 3){
          if(obj.long == 1){//区间模式
            if (obj.value.length || that.search[obj.key]) {
              if(!obj.value[0] && !obj.value[1]){
                // that.search[obj.key[0]] = ''
                // that.search[obj.key[1]] = ''
              }else{
                that.search[obj.key[0]] = that.$xy.formatDate(obj.value[0],true)
                that.search[obj.key[1]] = that.$xy.formatDate(obj.value[1],true)
                isSend = true
              }
            }
          }else if(obj.long == 2){//日期时间模式
            if (obj.value !== '' || that.search[obj.key]) {
              if (that.search[obj.key] != obj.value) {
                that.search[obj.key] = that.$xy.formatDate(obj.value)
                isSend = true
              }
            }
          }
        }else{
          if (obj.value !== '' || that.search[obj.key]) {
            if (that.search[obj.key] != obj.value) {
              that.search[obj.key] = obj.value
              isSend = true
            }
          }
        }
      }
      if (isSend) {
        this.$xy.vector.$emit('sendReq', that.search)
      }
    },
    reset: function () {
      var isSend = false
      for (var i = 0, j = this.searchData.length; i < j; i++) {
        var obj = this.searchData[i]
        if(obj.type == 3){
          if(obj.long == 1){
            obj.value = []
          }else{
            obj.value = ''
          }
        }else{
          obj.value = ''
        }
      }
      for (var i in this.search) {
        if (this.search[i]) {
          this.search[i] = ''
          isSend = true
        }
      }
      if (isSend) {
        this.$xy.vector.$emit('sendReq', this.search)
      }
    }
  }
}
</script>


