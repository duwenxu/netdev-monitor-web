<template>
 <div>
   <Row v-if="infos.length">
     <template v-for="(info,index) in infos">
         <Col :xs="24" :lg="lgCol">
           <template v-if="($route.name == 'home' && info.ndpaIsTopology) || $route.name != 'home'">
             <template v-if="info.parahowMode == '0024001'">
               <template v-if="paramType.indexOf(info.paraCmplexLevel) > -1 || info.paraSpellFmt">
                 <Row>
                   <Col :xs="12" :lg="info.paraName.length<=10?11:12">
                     <div style="text-align: right">
                      <span style="color: red;"
                            v-if="info.accessRight == '0022003' || info.accessRight == '0022001'">*</span>
                       <span :style="{letterSpacing:info.paraName.length<=8?2+'px':0+'px'}">{{ info.paraName }}：</span>
                     </div>
                   </Col>
                   <Col :xs="12" :lg="info.paraName.length<=10?13:12">

                     <!--                      <span style="cursor: pointer" @click="changeMode(info)">{{-->
                     <!--                          (info.transViewFmt !== null) ? info.transViewFmt : '暂无数据'-->
                     <!--                        }}&nbsp;&nbsp;-->
                     <template v-if="info.splitArr.length">
                       <template v-for="item in info.splitArr">
                                 <span style="cursor: pointer;" @click="changeMode(info)">{{item.param}}
                                   <template v-for="cell in item.subList">
                                     <span  v-if="cell.code == item.oldVal" style="color: #009688">{{cell.name}}
                                     </span>
                                   </template>
                                 </span>
                       </template>

                     </template>
                     <template v-else>
                       <span style="color:#009688;">暂无数据&nbsp;&nbsp;</span>
                     </template>
                   </Col>
                   <template  v-if="info.selected &&  (info.accessRight == '0022003' || info.accessRight == '0022001')">
                     <Col :xs="24" :lg="24">
                       <Row>
                       <template v-for="temp in info.splitArr">
                         <Col :xs="info.splitArr.length<=2?9:8" :lg="info.splitArr.length<=2?9:8">
                           <Select v-if="temp.subList" v-model="temp.inputVal" @on-change="validCombine(info,$event,temp)">
                             <Option v-for="(item,i) in temp.subList" :value="item.code" :key="i">{{ item.name }}
                             </Option>
                             <span slot="prefix">{{ temp.param }}</span>
                           </Select>
                           <template v-else>
                             <Poptip v-if="temp.paraValMin || temp.paraValMax" trigger="focus" transfer>
                               <Input v-model.trim="temp.inputVal" @on-blur="textValid(temp)" number  @on-change="splitValue(info,temp)">
                                 <span slot="prefix">{{ temp.param }}</span>
                               </Input>
                               <div slot="content">下限:{{ temp.paraValMin }}~上限:{{ temp.paraValMax }}</div>
                             </Poptip>
                             <Input v-else v-model.trim="temp.inputVal" @on-blur="textValid(temp)"  @on-change="splitValue(info,temp)">
                               <span slot="prefix">{{ temp.param }}</span>
                             </Input>
                             <span v-if="temp.errorMsg" style="color: red;font-size: 12px">{{ temp.errorMsg }}</span>
                           </template>
                         </Col>
                       </template>

                       <Button type="primary" @click="handleSubmit(info)" size="small"
                               style="margin-right:1px;margin-top: 4px">
                         <Icon type="md-checkmark" size="15"></Icon>
                       </Button>
                       <Button type="default" @click="close(info)" size="small" style="margin-top: 4px">
                         <Icon type="md-close" size="15"></Icon>
                       </Button>
                       </Row>
                     </Col>
                   </template>
                   <Col :xs="24" :lg="24">&nbsp;</Col>
                 </Row>
               </template>
               <template v-else>
                 <Row>
                   <Col :xs="12" :lg="info.paraName.length<=10?11:12">
                     <div style="text-align: right">
                  <span style="color: red;"
                        v-if="info.accessRight == '0022003' || info.accessRight == '0022001'">*</span>
                       <span :style="{letterSpacing:info.paraName.length<=8?2+'px':0+'px'}">{{ info.paraName }}：</span>
                     </div>
                   </Col>
                   <Col :xs="12" :lg="info.paraName.length<=10?13:12">
                          <span style="cursor: pointer;color:#009688"
                                @click="changeMode(info)">{{
                              (info.oldVal !== null && info.oldVal !== '') ? info.oldVal : '暂无数据'
                            }}&nbsp;&nbsp;
                            <span v-if="info.oldVal && info.paraUnit">{{ info.paraUnit }}</span></span>
                   </Col>
                   <template v-if="info.selected &&  (info.accessRight == '0022003' || info.accessRight == '0022001')">
                     <Col :xs="16" :lg="16" push="4" style="display: flex">
                       <template v-if="info.paraSimpleDatatype == 0 || info.paraSimpleDatatype == 2">
                         <template v-if="info.paraValMin || info.paraValMax">
                           <Poptip trigger="focus" transfer>
                             <InputNumber v-if="info.paraValStep" v-model="info.inputVal"  @on-change="setValues(info)"
                                          :step='info.paraValStep' @on-blur="textValid(info)" style="width: 100%"></InputNumber>
                             <Input v-if="!info.paraValStep" v-model.trim="info.inputVal"
                                    :placeholder="info.paraName" @on-blur="textValid(info)"  @on-change="setValues(info)" number>
                               <span v-if="info.paraUnit" slot="suffix">{{ info.paraUnit }}</span>
                             </Input>
                             <div slot="content">下限:{{ info.paraValMin }}~上限:{{ info.paraValMax }}</div>
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
                     </Col>
                     <Col :xs="16" :lg="16" push="4">
                       <span v-if="info.errorMsg" style="color: red;font-size: 12px">{{ info.errorMsg }}</span>
                     </Col>
                   </template>
                   <Col :xs="24" :lg="24">&nbsp;</Col>
                 </Row>
               </template>
             </template>
             <template v-else>
               <Row>
                 <Col :xs="12" :lg="info.paraName.length<=10?11:12">
                   <div style="text-align: right">
                  <span style="color: red;"
                        v-if="info.accessRight == '0022003' || info.accessRight == '0022001'">*</span>
                     <span :style="{letterSpacing:info.paraName.length<=8?2+'px':0+'px'}">{{ info.paraName }}：</span>
                   </div>
                 </Col>
                 <Col :xs="12" :lg="info.paraName.length<=10?13:12">
                   <template v-if="info.oldVal !== '' && info.oldVal !== null">
                     <div v-for="(item,i) in info.spinnerInfoList" @click="changeMode(info)">
                       <span style="cursor: pointer;color: #009688" v-if="info.oldVal == item.code">{{ item.name }}</span>
                     </div>
                   </template>
                   <template v-else>
                     <span style="cursor: pointer;color: #009688" @click="changeMode(info)">暂无数据</span>
                   </template>
                 </Col>
                 <Col :xs="16" :lg="16" push="4"
                      v-if="info.selected && (info.accessRight == '0022003' || info.accessRight == '0022001')"
                      style="display: flex">
                   <Select v-if="info.selected" v-model="info.inputVal" :placeholder="info.paraName"  @on-change="setValues(info)">
                     <Option v-for="(item,i) in info.spinnerInfoList" :value="item.code" :key="i">{{ item.name }}
                     </Option>
                   </Select>
                   <Button style="margin-top: 4px" type="primary" @click="handleSubmit(info)" size="small">
                     <Icon type="md-checkmark" size="15"></Icon>
                   </Button>
                   <Button type="default" style="margin-left: 1px;margin-top: 4px" @click="close(info)" size="small">
                     <Icon type="md-close" size="15"></Icon>
                   </Button>
                 </Col>
                 <Col :xs="24" :lg="24">&nbsp;</Col>
               </Row>
             </template>
           </template>

         </Col>


     </template>
   </Row>
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
      paramType: ['0019002']
    }
  },
  mounted() {
    if(window.screen.width<=1024 || this.$route.name == 'home'){
      this.lgCol = 12
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
            this.$set(v, 'paraValMax', Number(obj.paraValMax))
            this.$set(v, 'paraValMin', Number(obj.paraValMin))
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
      } else {
        this.$Message.error('无数据时无法更改，请稍后再试。')
      }
      this.$xy.vector.$emit('selectStatus', {paraId:info.paraId,status:info.selected,oldVal:info.oldVal,splitArr:info.splitArr})
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
            this.$set(x, 'paraValMax', Number(v.paraValMax))
            this.$set(x, 'paraValMin', Number(v.paraValMin))
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
              this.validTag = false
            }
          } else {
            this.validTag = false
          }
        } else {
          let reg = new RegExp('^[+-]?(0|([1-9]\\d*))(\\.\\d+)?$')
          if (reg.test(info.inputVal)) {
            if (info.paraValMax && info.paraValMin) {
              if (info.inputVal > info.paraValMax || info.inputVal < info.paraValMin) {
                this.validTag = true
                this.$set(info, 'errorMsg', '下限:' + info.paraValMin + '--上限:' + info.paraValMax)


              } else {
                this.validTag = false
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
      if (obj.paraVal) {
        let {result, success, message} = await editParamValue(obj)
        if (success) {
          this.$Notice.success({
            title: '成功',
            desc: message,
            duration: 1
          })
          this.close(info)
        } else {
          this.$Notice.error({
            title: '失败',
            desc: message,
            duration: 3
          })
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

</style>
