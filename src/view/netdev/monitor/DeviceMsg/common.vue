<template>
 <div>
   <div v-if="infos.length" class="box">
     <div v-for="(info,index) in infos" class="node">
       <template  v-if="($route.name == 'home' && info.ndpaIsTopology) || ($route.name != 'home' && info.ndpaIsTopology)">
         <template v-if="info.parahowMode == '0024001'">
           <div v-if="paramType.indexOf(info.paraCmplexLevel) > -1 || info.paraSpellFmt" >
                 <span style="color: red;"  v-if="accessView && (info.accessRight == '0022003' || info.accessRight == '0022001')">*</span>
                 <span :style="{letterSpacing:info.paraName.length<=8?2+'px':0+'px'}">{{ info.paraName }}：</span>
                 <template v-if="info.splitArr.length">
<!--                   显示组合参数值为绿色-->
                 <template v-for="item in info.splitArr">
                    <span style="cursor: pointer;" @click="changeMode(info)">{{item.param}}
                         <template v-if="item.subList.length">
                            <template v-for="cell in item.subList">
                                     <span  v-if="cell.code == item.oldVal" style="color: #009688">{{cell.name}} </span>
                             </template>
                         </template>
                           <span v-else  style="color: #009688">{{item.paraVal}}</span>
                    </span>
                 </template>
               </template>
                 <span  v-else style="color:#009688;">暂无数据&nbsp;&nbsp;</span>
<!--             组合参数分割-->
             <div class="combine-class"  v-if="accessView && info.selected &&  (info.accessRight == '0022003' || info.accessRight == '0022001')">
                   <template v-for="temp in info.splitArr">
                       <Select v-if="temp.subList.length" v-model="temp.inputVal" @on-change="validCombine(info,$event,temp)">
                         <Option v-for="(item,i) in temp.subList" :value="item.code" :key="i">{{ item.name }}
                         </Option>
                         <span slot="prefix">{{ temp.param }}</span>
                       </Select>
                       <template v-else>
                         <Poptip v-if="temp.paraValMin1 || temp.paraValMax1" trigger="focus" transfer>
                           <Input v-model.trim="temp.inputVal" @on-blur="textValid(temp)" number  @on-change="splitValue(info,temp)">
                             <span slot="prefix">{{ temp.param }}</span>
                           </Input>
                           <div slot="content">
                             <span v-if="temp.paraValMin1 || temp.paraValMax1">&nbsp;&nbsp;&nbsp;下限:{{ temp.paraValMin1 }}~上限:{{ temp.paraValMax1 }}</span><Br/>
                             <span v-if="temp.paraValMin2 || temp.paraValMax2">或下限:{{ temp.paraValMin2 }}~上限:{{ temp.paraValMax2 }}</span>
                           </div>
                         </Poptip>
                         <Input v-else v-model.trim="temp.inputVal" @on-blur="textValid(temp)"  @on-change="splitValue(info,temp)">
                           <span slot="prefix">{{ temp.param }}</span>
                         </Input>
                         <span v-if="temp.errorMsg" style="color: red;font-size: 12px">{{ temp.errorMsg }}</span>
                       </template>
                   </template>
                   <Button type="primary" @click="handleSubmit(info)" size="small"
                           style="margin-right:1px;margin-top: 4px">
                     <Icon type="md-checkmark" size="15"></Icon>
                   </Button>
                   <Button type="default" @click="close(info)" size="small" style="margin-top: 4px">
                     <Icon type="md-close" size="15"></Icon>
                   </Button>
             </div>
           </div>
           <div v-else>
                  <span style="color: red;"  v-if="accessView && (info.accessRight == '0022003' || info.accessRight == '0022001')">*</span>
                   <span :style="{letterSpacing:info.paraName.length<=8?2+'px':0+'px'}">{{ info.paraName }}：</span>
                          <span style="cursor: pointer;color:#009688"     @click="changeMode(info)">{{(info.oldVal !== null && info.oldVal !== '') ? info.oldVal : '暂无数据'}}&nbsp;&nbsp;
                            <span v-if="info.oldVal && info.paraUnit">{{ info.paraUnit }}</span></span>
             <template v-if="accessView && info.selected &&  (info.accessRight == '0022003' || info.accessRight == '0022001')">
               <div style="display: flex">
                 <template v-if="info.paraSimpleDatatype == 0 || info.paraSimpleDatatype == 2">
                   <template v-if="info.paraValMin1 || info.paraValMax1">
                     <Poptip trigger="focus" transfer>
                       <InputNumber v-if="info.paraValStep" v-model="info.inputVal"  @on-change="setValues(info)"
                                    :step='info.paraValStep' @on-blur="textValid(info)" style="width: 100%"></InputNumber>
                       <Input v-if="!info.paraValStep" v-model.trim="info.inputVal"
                              :placeholder="info.paraName" @on-blur="textValid(info)"  @on-change="setValues(info)" number>
                         <span v-if="info.paraUnit" slot="suffix">{{ info.paraUnit }}</span>
                       </Input>
                       <div slot="content">
                         <span v-if="info.paraValMin1 || info.paraValMax1">&nbsp;&nbsp;&nbsp;下限:{{ info.paraValMin1 }}~上限:{{ info.paraValMax1 }}</span><Br/>
                         <span v-if="info.paraValMin2 || info.paraValMax2">或下限:{{ info.paraValMin2 }}~上限:{{ info.paraValMax2 }}</span>
                       </div>
                     </Poptip>
                   </template>
                   <template v-else>
                     <Input v-model.trim="info.inputVal" :placeholder="info.paraName" number  @on-change="setValues(info)"> <span
                       v-if="info.paraVal && info.paraUnit" slot="suffix">{{ info.paraUnit }}</span></Input>
                   </template>
                 </template>
                 <template v-else>
                   <Input v-model.trim="info.inputVal" :placeholder="info.paraName" @on-blur="textValid(info)"  @on-change="setValues(info)">
                     <span v-if="info.paraVal && info.paraUnit" slot="suffix">{{ info.paraUnit }}</span>
                   </Input>
                 </template>
                 <Button style="margin-top: 4px" type="primary" @click="handleSubmit(info)" size="small">
                   <Icon type="md-checkmark" size="15"></Icon>
                 </Button>
                 <Button style="margin-top: 4px" type="default" @click="close(info)" size="small">
                   <Icon type="md-close" size="15"></Icon>
                 </Button>
               </div>
                 <span v-if="info.errorMsg" style="color: red;font-size: 12px">{{ info.errorMsg }}</span>
             </template>
           </div>
         </template>
         <template v-else>
               <span style="color: red;"  v-if="accessView && (info.accessRight == '0022003' || info.accessRight == '0022001')">*</span>
               <span :style="{letterSpacing:info.paraName.length<=8?2+'px':0+'px'}">{{ info.paraName }}：</span>
             <template v-if="info.oldVal !== '' && info.oldVal !== null">
                 <span  v-for="(item,i) in info.spinnerInfoList" @click="changeMode(info)" style="cursor: pointer;color: #009688" v-if="info.oldVal == item.code">{{ item.name }}</span>
             </template>
             <template v-else>
               <span style="cursor: pointer;color: #009688" @click="changeMode(info)">暂无数据</span>
             </template>
           <div  v-if="accessView && info.selected && (info.accessRight == '0022003' || info.accessRight == '0022001')"   style="display: flex">
             <Select  v-model="info.inputVal" :placeholder="info.paraName"  @on-change="setValues(info)">
               <Option v-for="(item,i) in info.spinnerInfoList" :value="item.code" :key="i">{{ item.name }}
               </Option>
             </Select>
             <Button style="margin-top: 4px" type="primary" @click="handleSubmit(info)" size="small">
               <Icon type="md-checkmark" size="15"></Icon>
             </Button>
             <Button type="default" style="margin-left: 1px;margin-top: 4px" @click="close(info)" size="small">
               <Icon type="md-close" size="15"></Icon>
             </Button>
           </div>
         </template>
       </template>
     </div>
   </div>
  <div v-else>
    <span>暂无数据</span>
  </div>
 </div>
</template>

<script>
import {editParamValue} from "@/api/monitor/ParaInfo";
export default {
  name: "common",
  props: {
    infos: {
      type: Array
    }
  },
  data(){
    return{
      lgCol:8,
      validTag: false,
      paramType: ['0019002'],
      accessView:false,
    }
  },
  mounted() {
    let obj = JSON.parse(sessionStorage.userInfo)
    if(obj.userName == 'admin'){
      this.accessView = true
    }
  },
  methods:{
    setValues(info){
      this.$xy.vector.$emit('selectStatus', {paraId:info.paraId,status:info.selected,oldVal:info.inputVal})
    },
    splitValue(info,temp){
      this.$xy.vector.$emit('selectStatus', {paraId:info.paraId,status:info.selected,oldVal:temp.inputVal,name:temp.name,splitArr:info.splitArr})
    },
    changeMode(info) {
      if(this.accessView){
      this.validTag = false
      if (info.subParaList.length) {
        let obj = {}
        info.subParaList.forEach(v => {
          info.splitArr.forEach(x => {
            if (v.subParaLinkVal == x.paraVal && v.subParaLinkCode == x.name) {
              obj = v
            }
          })
        })
        info.splitArr.forEach(v => {
          if (obj.paraCode == v.name) {
            this.$set(v, 'paraValMax1', Number(obj.paraValMax1))
            this.$set(v, 'paraValMin1', Number(obj.paraValMin1))
            this.$set(v, 'paraValMax2', Number(obj.paraValMax2))
            this.$set(v, 'paraValMin2', Number(obj.paraValMin2))
            this.$set(v, 'paraValStep', Number(obj.paraValStep))
            this.$set(v, 'paraSimpleDatatype', obj.paraSimpleDatatype)
            this.$set(v, 'paraStrLen', Number(obj.paraStrLen))
            if (v.paraSimpleDatatype == 0 || v.paraSimpleDatatype == 2) {
              this.$set(v, 'paraVal', Number(v.paraVal))
              // this.$set(v, 'inputVal', Number(v.inputVal))
            }
          }
        })
      }
      if (info.paraVal !== null && info.paraVal !== '') {
        this.$set(info, 'selected', true)
        this.$set(info, 'inputVal', info.oldVal)
        console.log(info)
      } else {
        this.$Message.error('无数据时无法更改，请稍后再试。')
      }
      this.$xy.vector.$emit('selectStatus', {paraId:info.paraId,status:info.selected,oldVal:info.oldVal,splitArr:info.splitArr})
      }
    },
    close(info) {
      if (!info.paraSpellFmt) {
        this.$set(info, 'paraVal', info.oldVal)
        this.$set(info, 'errorMsg', '')
      } else {
        info.splitArr.forEach(v => {
          this.$set(v, 'errorMsg', '')
          this.$set(v, 'paraVal', v.oldVal)
        })
      }
      this.$set(info, 'selected', false)
      this.$xy.vector.$emit('selectStatus', {paraId:info.paraId,status:info.selected,close:true})
    },

    /*-----------------验证--------------*/
    validCombine(info, data,temp) {
      this.$xy.vector.$emit('selectStatus', {paraId:info.paraId,status:info.selected,oldVal:temp.inputVal,name:temp.name,splitArr:info.splitArr})
      info.subParaList.forEach(v => {
        info.splitArr.forEach(x => {
          if (data == v.subParaLinkVal && v.paraCode == x.name) {
            this.$set(x, 'paraValMax1', Number(v.paraValMax1))
            this.$set(x, 'paraValMin1', Number(v.paraValMin1))
            this.$set(x, 'paraValMax2', Number(v.paraValMax2))
            this.$set(x, 'paraValMin2', Number(v.paraValMin2))
            this.$set(x, 'paraValStep', Number(v.paraValStep))
            this.$set(x, 'paraSimpleDatatype', v.paraSimpleDatatype)
            this.$set(x, 'paraStrLen', Number(v.paraStrLen))
          }
        })
      })
    },
    textValid(info) {
      if (info.inputVal) {
        if (info.paraSimpleDatatype == 1) {
          if (info.paraStrLen) {
            if (info.inputVal.length > info.paraStrLen) {
              this.validTag = true
              this.$set(info, 'errorMsg', '长度不能超过' + info.paraStrLen)
            }else {
              this.$set(info, 'errorMsg','')
              this.validTag = false
            }
          } else {
            this.$set(info, 'errorMsg','')
            this.validTag = false
          }
        } else {
          let reg = new RegExp('^[+-]?(0|([1-9]\\d*))(\\.\\d+)?$')
          if (reg.test(info.inputVal)) {
            if (info.paraValMax1 && info.paraValMin1) {
              if(info.paraValMin2 && info.paraValMax2){
                if ((Number(info.inputVal) > Number(info.paraValMax1) || Number(info.inputVal) < Number(info.paraValMin1)) &&
                  (Number(info.inputVal) > Number(info.paraValMax2) || Number(info.inputVal) < Number(info.paraValMin2))
                ) {
                  this.validTag = true
                  this.$set(info, 'errorMsg', '下限:' + info.paraValMin1 + '--上限:' + info.paraValMax1 +'或下限:' + info.paraValMin2 + '--上限:' + info.paraValMax2)
                } else {
                  this.validTag = false
                  this.$set(info, 'errorMsg','')
                }
              }else{
                if (Number(info.inputVal) > Number(info.paraValMax1) || Number(info.inputVal) < Number(info.paraValMin1)) {
                  this.validTag = true
                  this.$set(info, 'errorMsg', '下限:' + info.paraValMin1 + '--上限:' + info.paraValMax1)
                } else {
                  this.validTag = false
                  this.$set(info, 'errorMsg','')
                }
              }

            }
          } else {
            this.validTag = true
            // this.$Message.error({
            //   content: '请输入数字',
            //   duration: 6,
            //   closable: true
            // });
            this.$set(info, 'errorMsg', '请输入数字')
          }
        }
      }
    },
    handleSubmit(info) {
      if (!this.validTag) {
        this.save(info)
      }
    },
    async save(info) {

      let obj = {
        devNo: info.devNo,
        paraCmdMark: info.paraCmdMark,
        paraNo: info.paraNo,
        paraId: info.paraId
      }
      if (info.paraSpellFmt) {
        let index = -1
        let finallStr = info.paraSpellFmt.replace(/\[(.+?)\]/g, function (match, param, offset, string) {
          index++
          return match = '[' + info.splitArr[index].inputVal + ']'
        })
        obj.paraVal = finallStr
      } else {
        obj.paraVal = info.inputVal
      }
      if (obj.paraVal !== '') {
        let {success,error} = await editParamValue(obj)
        if (success) {
           this.$Notice.success({
             title: '成功',
             desc: '修改成功！',
             duration: 1
           })
           this.close(info)
         }
      } else {
        this.$set(info, 'paraVal', info.oldVal)
        this.$set(info, 'inputVal', info.oldVal)
        this.$set(info, 'selected', false)
      }
    }
  }
}
</script>

<style scoped>
.box{
  display: flex;
  flex-wrap: wrap;
  justify-content:space-between;
  width: 100%;
}
.node{
  margin-bottom: 10px;
  width: 46%;
  margin-left: 20px;

}
</style>
<style lang="less">
.combine-class{
 .ivu-input-prefix{
   width: 20%;
 }
  .ivu-input-with-prefix {
    padding-left: 22%;
  }
  .ivu-select-prefix{
    width: 20%;
    text-align: center;
  }
  .ivu-select-single .ivu-select-head-with-prefix, .ivu-select-multiple .ivu-select-head-with-prefix{
    padding-left: 13px !important;
  }
}
</style>
