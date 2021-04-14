<template>
 <div>
   <div v-for="(info,index) in infos">
     <Col :xs="24" :lg="6">
       <Row>
         <template v-if="info.parahowMode == '0024001'">
           <template v-if="paramType.indexOf(info.paraCmplexLevel) > -1 || info.paraSpellFmt">
               <Row>
                 <Col :xs="11" :lg="11">
                   <div style="text-align: right">
                  <span style="color: red;"
                        v-if="info.accessRight == '0022003' || info.accessRight == '0022001'">*</span>
                     <span :style="{letterSpacing:info.paraName.length<=8?2+'px':0+'px'}">{{ info.paraName }}：</span>
                   </div>
                 </Col>
                 <Col :xs="13" :lg="13">
                      <span style="cursor: pointer" @click="changeMode(info)">{{
                          (info.transViewFmt != null) ? info.transViewFmt : '暂无数据'
                        }}&nbsp;&nbsp;<span
                          v-if="info.oldVal && info.paraUnit">{{ info.paraUnit }}</span></span>
                 </Col>
                 <div v-if="info.selected && (info.accessRight == '0022003' || info.accessRight == '0022001')">
                   <Col :xs="24" :lg="24">
                     <template v-for="temp in info.splitArr">
                       <Col :xs="info.splitArr.length<=2?8:6" :lg="info.splitArr.length<=2?8:6">
                         <Select v-if="temp.subList" v-model="temp.paraVal" @on-change="validCombine(info,$event)">
                           <Option v-for="(item,i) in temp.subList" :value="item.code" :key="i">{{ item.name }}
                           </Option>
                           <span slot="prefix">{{ temp.param }}</span>
                         </Select>
                         <template v-else>
                           <Poptip v-if="temp.paraValMin || temp.paraValMax" trigger="focus" transfer>
                             <Input v-model.trim="temp.paraVal" @on-blur="textValid(temp)" number>
                               <span slot="prefix">{{ temp.param }}</span>
                             </Input>
                             <div slot="content">下限:{{ temp.paraValMin }}~上限:{{ temp.paraValMax }}</div>
                           </Poptip>
                           <Input v-else v-model.trim="temp.paraVal" @on-blur="textValid(temp)">
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
                   </Col>
                 </div>
                 <Col :xs="24" :lg="24">&nbsp;</Col>
               </Row>
           </template>
           <template v-else>
               <Row>
             <Col :xs="11" :lg="11">
               <div style="text-align: right">
                  <span style="color: red;"
                        v-if="info.accessRight == '0022003' || info.accessRight == '0022001'">*</span>
                 <span :style="{letterSpacing:info.paraName.length<=8?2+'px':0+'px'}">{{ info.paraName }}：</span>
               </div>
             </Col>
             <Col :xs="13" :lg="13">
                          <span style="cursor: pointer"
                                @click="changeMode(info)">{{
                              (info.oldVal != null && info.oldVal) ? info.oldVal : '暂无数据'
                            }}&nbsp;&nbsp;
                            <span v-if="info.oldVal && info.paraUnit">{{ info.paraUnit }}</span></span>
             </Col>
             <template v-if="info.selected &&  (info.accessRight == '0022003' || info.accessRight == '0022001')">
               <Col :xs="16" :lg="16" push="4" style="display: flex">
                 <template v-if="info.paraSimpleDatatype == 0 || info.paraSimpleDatatype == 2">
                   <template v-if="info.paraValMin || info.paraValMax">
                     <Poptip trigger="focus" transfer>
                       <InputNumber v-if="info.paraValStep" v-model="info.paraVal"
                                    :step='info.paraValStep' @on-blur="textValid(info)"></InputNumber>
                       <Input v-if="!info.paraValStep" v-model.trim="info.paraVal"
                              :placeholder="info.paraName" @on-blur="textValid(info)" number>
                         <span v-if="info.paraUnit" slot="suffix">{{ info.paraUnit }}</span>
                       </Input>
                       <div slot="content">下限:{{ info.paraValMin }}~上限:{{ info.paraValMax }}</div>
                     </Poptip>
                   </template>
                   <template v-else>
                     <Input v-model.trim="info.paraVal" :placeholder="info.paraName" number> <span
                       v-if="info.paraVal && info.paraUnit" slot="suffix">{{ info.paraUnit }}</span></Input>
                   </template>
                 </template>
                 <template v-else>
                   <Input v-model.trim="info.paraVal" :placeholder="info.paraName" @on-blur="textValid(info)">
                     <span v-if="info.paraVal && info.paraUnit" slot="suffix">{{ info.paraUnit }}</span>
                   </Input>
                 </template>
                 <Button type="primary" @click="handleSubmit(info)" size="small">
                   <Icon type="md-checkmark" size="15"></Icon>
                 </Button>
                 <Button type="default" @click="close(info)" size="small">
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
               <Col :xs="11" :lg="11">
                 <div style="text-align: right">
                  <span style="color: red;"
                        v-if="info.accessRight == '0022003' || info.accessRight == '0022001'">*</span>
                   <span :style="{letterSpacing:info.paraName.length<=8?2+'px':0+'px'}">{{ info.paraName }}：</span>
                 </div>
               </Col>
               <Col :xs="13" :lg="13">
                 <template v-if="info.oldVal">
                   <div v-for="(item,i) in info.spinnerInfoList" @click="changeMode(info)">
                     <span style="cursor: pointer" v-if="info.oldVal == item.code">{{ item.name }}</span>
                   </div>
                 </template>
                 <template v-else>
                   <span style="cursor: pointer" @click="changeMode(info)">暂无数据</span>
                 </template>
               </Col>
               <Col :xs="24" :lg="24"
                    v-if="info.selected && (info.accessRight == '0022003' || info.accessRight == '0022001')"
                    style="display: flex">
                 <Select v-if="info.selected" v-model="info.paraVal" :placeholder="info.paraName">
                   <Option v-for="(item,i) in info.spinnerInfoList" :value="item.code" :key="i">{{ item.name }}
                   </Option>
                 </Select>
                 <Button type="primary" @click="handleSubmit(info)" size="small">
                   <Icon type="md-checkmark" size="15"></Icon>
                 </Button>
                 <Button type="default" style="margin-left: 1px" @click="close(info)" size="small">
                   <Icon type="md-close" size="15"></Icon>
                 </Button>
               </Col>
               <Col :xs="24" :lg="24">&nbsp;</Col>
             </Row>
         </template>
       </Row>
     </Col>
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
      validTag: false,
      paramType: ['0019002', '0019003']
    }
  },
  mounted() {
  },
  methods:{
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
            }
          }
        })
      }
      if (info.paraVal != null && info.paraVal) {
        this.$set(info, 'selected', true)
      } else {
        this.$Message.error('无数据时无法更改，请稍后再试。')
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
    },
    /*-----------------验证--------------*/
    validCombine(info, data) {
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
      if (info.paraVal) {
        if (info.paraSimpleDatatype == 1) {
          if (info.paraStrLen) {
            if (info.paraVal.length > info.paraStrLen) {
              this.validTag = true
              // this.$Message.error({
              //   content: '长度不能超过'+info.paraStrLen,
              //   duration: 6,
              //   closable: true
              // });
              this.$set(info, 'errorMsg', '长度不能超过' + info.paraStrLen)
            }
          } else {
            this.validTag = false
          }
        } else {
          let reg = new RegExp('^[+-]?(0|([1-9]\\d*))(\\.\\d+)?$')
          if (reg.test(info.paraVal)) {
            if (info.paraValMax && info.paraValMin) {
              if (info.paraVal > info.paraValMax || info.paraVal < info.paraValMin) {
                this.validTag = true
                // this.$Message.error({
                //   content: '请在区间'+info.paraValMin+'--'+info.paraValMax+'内输入',
                //   duration: 6,
                //   closable: true
                // });
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
    async save(info, tag) {
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
          return match = '[' + info.splitArr[index].paraVal + ']'
        })
        obj.paraVal = finallStr
      } else {
        obj.paraVal = info.paraVal
      }
      if (obj.paraVal || tag) {
        let {result, success, message} = await editParamValue(obj)
        if (success) {
          this.$Notice.success({
            title: '成功',
            desc: message,
            duration: 1
          })
          this.$set(info, 'selected', false)
        } else {
          this.$Notice.error({
            title: '失败',
            desc: message,
            duration: 3
          })
        }
      } else {
        this.$set(info, 'paraVal', info.oldVal)
        this.$set(info, 'selected', false)
      }
    },
  }
}
</script>

<style scoped>

</style>
