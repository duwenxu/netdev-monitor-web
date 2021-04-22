<template>
  <div class="param-wrap" :style="{height:normalHeight+'px'}">
    <Row>
      <Col :xs="24" :md="24" v-for="item in infos">
        <div style="color: #009688;font-size: 16px;margin-bottom: 10px">{{ item.itfName }}</div>
        <div v-for="temp in item.subInterList">
          <div style="color: #009688;margin-bottom: 10px;margin-left: 30px">{{ temp.itfName }}</div>
            <Row>
              <template v-if="temp.subParaList.length">
                <div v-for="(info,index) in temp.subParaList">
                  <Col :xs="24" :lg="8">
                    <Row>
                      <template v-if="info.parahowMode == '0024001'">
                        <template v-if="paramType.indexOf(info.paraCmplexLevel) > -1 || info.paraSpellFmt">
                          <Row>
                            <Col :xs="11" :lg="11">
                              <div style="text-align: right">
                                <span :style="{letterSpacing:info.paraName.length<=8?2+'px':0+'px'}">{{ info.paraName }}：</span>
                              </div>
                            </Col>
                            <Col :xs="13" :lg="13">
                                  <span>{{(info.transViewFmt != null) ? info.transViewFmt : '暂无数据'}}&nbsp;&nbsp;<span
                                    v-if="info.oldVal && info.paraUnit">{{ info.paraUnit }}</span></span>
                            </Col>
                            <div v-if="info.selected">
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
                              </Col>
                            </div>
                            <Col :xs="24" :lg="24">&nbsp;</Col>
                          </Row>
                        </template>
                        <template v-else>
                          <Row>
                            <Col :xs="11" :lg="11">
                              <div style="text-align: right">

                                <span :style="{letterSpacing:info.paraName.length<=8?2+'px':0+'px'}">{{ info.paraName }}：</span>
                              </div>
                            </Col>
                            <Col :xs="13" :lg="13">
                                      <span>{{(info.oldVal != null && info.oldVal) ? info.oldVal : '暂无数据'}}&nbsp;&nbsp;
                                        <span v-if="info.oldVal && info.paraUnit">{{ info.paraUnit }}</span></span>
                            </Col>
                            <template v-if="info.selected">
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

                              <span :style="{letterSpacing:info.paraName.length<=8?2+'px':0+'px'}">{{ info.paraName }}：</span>
                            </div>
                          </Col>
                          <Col :xs="13" :lg="13">
                            <template v-if="info.oldVal">
                              <div v-for="(item,i) in info.spinnerInfoList">
                                <span style="cursor: pointer" v-if="info.oldVal == item.code">{{ item.name }}</span>
                              </div>
                            </template>
                            <template v-else>
                              <span >暂无数据</span>
                            </template>
                          </Col>
                          <Col :xs="16" :lg="16" push="4" v-if="info.selected"  style="display: flex">
                            <Select v-if="info.selected" v-model="info.paraVal" :placeholder="info.paraName">
                              <Option v-for="(item,i) in info.spinnerInfoList" :value="item.code" :key="i">{{ item.name }}
                              </Option>
                            </Select>
                          </Col>
                          <Col :xs="24" :lg="24">&nbsp;</Col>
                        </Row>
                      </template>
                    </Row>
                  </Col>
                </div>
              </template>
            <template v-else>
              <Col :xs="24" :lg="24">
                <div style="margin-left: 40px"> 暂无数据</div>
              </Col>
            </template>
              <Col :xs="24" :lg="24">
                <Button v-if="temp.subParaList.length" type="primary" @click="changeMode(temp)"  style="margin-left:30px;" size="small">{{temp.selected?'取消':'编辑'}}</Button>
                <Button v-if="temp.selected" type="success" @click="handleSubmit(temp)"  size="small" style="margin-left:2px;">保存</Button>
              </Col>
            </Row>
        </div>
      </Col>
    </Row>
  </div>
</template>

<script>
import common from './common'
import {saveCtrlInfo} from "@/api/monitor/DeviceParam";
import {splitCharacter} from "@/libs/util";

export default {
  components: {common},
  data() {
    return {
      normalHeight:450,
      infos: [],
      validTag: false,
      paramType: ['0019002', '0019003']
    }
  },
  created: function () {
    this.$xy.vector.$on('ctrlTag', this.getMsg)
    this.$xy.vector.$on('changeSize', this.sizeInfo)
  },
  beforeDestroy: function () {
    this.$xy.vector.$off('ctrlTag', this.getMsg)
    this.$xy.vector.$off('changeSize', this.sizeInfo)

  },
  mounted() {
  },
  methods: {
    sizeInfo(data){
      if(data.showAlert || data.showLog){
        this.normalHeight = 450
      }else{
        this.normalHeight = 680
      }
    },
    getMsg(data) {
      let result = JSON.parse(data.data)
      result.forEach(item=>{
        item.subInterList.forEach(key=>{
          this.$set(key, 'selected', false)
          key.subParaList.forEach(v => {
            this.$set(v, 'selected', false)
            v.errorMsg = ''
            if (v.parahowMode == '0024001') {//数字类型Number转换
              if (this.paramType.indexOf(v.paraCmplexLevel) > -1 || v.paraSpellFmt) {//如果存在复杂参数，组合参数，切割
                v.copyFmt = JSON.parse(JSON.stringify(v.paraViewFmt))
                v.splitArr = []
                let resultChar = splitCharacter(v.paraSpellFmt, v.paraVal)
                let index = -1
                let saveOffset = 0
                v.transViewFmt = v.paraViewFmt.replace(/\[(.+?)\]/g, function (match, param, offset, string) {
                  let len = param.length
                  let pos = index == -1 ? 0 : saveOffset + len + 2
                  index++
                  v.splitArr.push({
                    param: v.copyFmt.substring(pos, offset),
                    paraVal: resultChar[index],
                    name: param,
                    oldVal: JSON.parse(JSON.stringify(resultChar[index])),
                    errorMsg: '',
                    paraValMax: null,
                    paraValMin: null,
                    paraValStep: null,
                    paraSimpleDatatype: v.paraSimpleDatatype,
                    paraStrLen: v.paraStrLen,
                  })
                  saveOffset = offset
                  return match = resultChar[index]
                })
                if (v.subParaList.length) {
                  v.subParaList.forEach(n => {
                    v.splitArr.forEach(x => {
                      if (n.paraCode == x.name) {
                        if (n.spinnerInfoList) {
                          x.subList = n.spinnerInfoList || []
                        }
                      }
                    })
                  })
                }
                // viewArr.push(v)
              } else {
                if (v.paraSimpleDatatype == 0 || v.paraSimpleDatatype == 2) {
                  v.paraValStep = Number(v.paraValStep)
                  v.paraVal = (v.paraVal == null || v.paraVal == '') ? null : Number(v.paraVal)
                }
                // textArr.push(v)
              }
            }
            v.oldVal = JSON.parse(JSON.stringify(v.paraVal))
          })
        })
      })
      this.infos = result
    },
    changeMode(temp) {
      this.validTag = false
      this.$set(temp, 'selected', !temp.selected)
      temp.subParaList.forEach(info=>{
        // if (info.paraVal != null && info.paraVal) {
          this.$set(info, 'selected', !info.selected)
        // }
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
      })
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
              this.$set(info, 'errorMsg', '长度不能超过' + info.paraStrLen)
            }else{
              this.validTag = false
              this.$set(info, 'errorMsg', '')
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
                this.$set(info, 'errorMsg', '下限:' + info.paraValMin + '--上限:' + info.paraValMax)
              } else {
                this.validTag = false
                this.$set(info, 'errorMsg', '')
              }
            }
          } else {
            this.validTag = true
            this.$set(info, 'errorMsg', '请输入数字')
          }
        }
      }
    },
    handleSubmit(temp) {
      if (!this.validTag) {
        this.save(temp)
      }
    },
    async save(temp) {
      temp.subParaList.forEach(info=>{
        if (info.paraSpellFmt) {
          let index = -1
          let finallStr = info.paraSpellFmt.replace(/\[(.+?)\]/g, function (match, param, offset, string) {
            index++
            return match = '[' + info.splitArr[index].paraVal + ']'
          })
          info.paraVal = finallStr
        }
      })
      // temp.subParaList = JSON.stringify(temp.subParaList)
      let {result, success, message} = await saveCtrlInfo(temp)
      if(success){
        this.$Notice.success({
                title: '成功',
                desc: message,
                duration: 1
              })
        this.changeMode(temp)
      }else{
            this.$Notice.error({
              title: '失败',
              desc: message,
              duration: 3
            })
      }
    }
  }
}
</script>

<style scoped>

</style>
