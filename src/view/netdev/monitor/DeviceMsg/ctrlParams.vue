<template>
  <div class="param-wrap" :style="{height:setPanelHeight(infos.length)}">
    <Col :xs="24" :md="24" v-for="(item,index) in infos" :key="index">
      <div style="color: #009688;font-size: 16px;margin-bottom: 10px">{{ item.itfName }}</div>
      <div v-for="temp in item.subInterList">
        <div style="color: #009688;margin-bottom: 10px;margin-left: 30px">{{ temp.itfName }}</div>
        <div v-if="temp.subParaList.length" class="box">
          <div v-for="(info,index) in temp.subParaList" class="node" v-if="info.ndpaIsImportant != 2">
            <template v-if="info.parahowMode == '0024001'">
              <div v-if="paramType.indexOf(info.paraCmplexLevel) > -1 || info.paraSpellFmt">
                <span :style="{letterSpacing:info.paraName.length<=8?2+'px':0+'px'}">{{ info.paraName }}：</span>
                <template v-if="info.splitArr.length">
                  <!--                   显示组合参数值为绿色-->
                  <template v-for="item in info.splitArr">
                       <span style="cursor: pointer;">{{ item.param }}
                         <template v-if="item.subList.length">
                            <template v-for="cell in item.subList">
                                     <span v-if="cell.code == item.oldVal"
                                           style="color: #009688">{{ cell.name }} </span>
                             </template>
                         </template>
                           <span v-else style="color: #009688">{{ item.paraVal }}</span>
                       </span>
                  </template>
                </template>
                <span v-else style="color:#009688;">暂无数据&nbsp;&nbsp;</span>
                <!--             组合参数分割-->
                <div class="combine-class" v-if="info.selected">
                  <template v-for="temp in info.splitArr">
                    <Select v-if="temp.subList.length" v-model="temp.paraVal"
                            @on-change="validCombine(info,$event,temp)">
                      <Option v-for="(item,i) in temp.subList" :value="item.code" :key="i">{{ item.name }}
                      </Option>
                      <span slot="prefix">{{ temp.param }}</span>
                    </Select>
                    <template v-else>
                      <Poptip v-if="temp.paraValMin1 || temp.paraValMax1" trigger="focus" transfer>
                        <Input v-model.trim="temp.paraVal" @on-blur="textValid(temp)" number
                               @on-change="splitValue(info,temp)">
                          <span slot="prefix">{{ temp.param }}</span>
                        </Input>
                        <div slot="content">
                          <span v-if="temp.paraValMin1 || temp.paraValMax1">&nbsp;&nbsp;&nbsp;下限:{{
                              temp.paraValMin1
                            }}~上限:{{ temp.paraValMax1 }}</span><Br/>
                          <span v-if="temp.paraValMin2 || temp.paraValMax2">或下限:{{
                              temp.paraValMin2
                            }}~上限:{{ temp.paraValMax2 }}</span>
                        </div>
                      </Poptip>
                      <Input v-else v-model.trim="temp.paraVal" @on-blur="textValid(temp)"
                             @on-change="splitValue(info,temp)">
                        <span slot="prefix">{{ temp.param }}</span>
                      </Input>
                      <span v-if="temp.errorMsg" style="color: red;font-size: 12px">{{ temp.errorMsg }}</span>
                    </template>
                  </template>

                </div>
              </div>
              <div v-else>

                <span :style="{letterSpacing:info.paraName.length<=8?2+'px':0+'px'}">{{ info.paraName }}：</span>
                <span
                  style="cursor: pointer;color:#009688">{{ (info.oldVal !== null && info.oldVal !== '') ? info.oldVal : '暂无数据' }}&nbsp;&nbsp;
                      <span v-if="info.oldVal && info.paraUnit">{{ info.paraUnit }}</span></span>
                <template v-if="info.selected">
                  <div style="display: flex">
                    <template
                      v-if="(info.paraValMin1 || info.paraValMax1) && (info.paraSimpleDatatype == 0 || info.paraSimpleDatatype == 2)">
                      <Poptip trigger="focus" transfer>
                        <InputNumber v-if="info.paraValStep" v-model="info.paraVal"
                                     :step='info.paraValStep' @on-blur="textValid(info)"
                                     style="width: 100%"></InputNumber>
                        <Input v-if="!info.paraValStep" v-model.trim="info.paraVal"
                               :placeholder="info.paraName" @on-blur="textValid(info)" number>
                          <span v-if="info.paraUnit" slot="suffix">{{ info.paraUnit }}</span>
                        </Input>
                        <div slot="content">
                          <span v-if="info.paraValMin1 || info.paraValMax1">&nbsp;&nbsp;&nbsp;下限:{{
                              info.paraValMin1
                            }}~上限:{{ info.paraValMax1 }}</span><Br/>
                          <span v-if="info.paraValMin2 || info.paraValMax2">或下限:{{
                              info.paraValMin2
                            }}~上限:{{ info.paraValMax2 }}</span>
                        </div>
                      </Poptip>
                    </template>
                    <template v-else>
                      <Input v-if="info.paraSimpleDatatype == 0 || info.paraSimpleDatatype == 2"
                             v-model.trim="info.paraVal" :placeholder="info.paraName" number>
                        <span v-if="info.paraVal && info.paraUnit" slot="suffix">{{ info.paraUnit }}</span>
                      </Input>
                      <Input v-else v-model.trim="info.paraVal" :placeholder="info.paraName"
                             @on-blur="textValid(info)"/>
                    </template>
                  </div>
                  <span v-if="info.errorMsg" style="color: red;font-size: 12px">{{ info.errorMsg }}</span>
                </template>
              </div>
            </template>
            <template v-else>
              <span :style="{letterSpacing:info.paraName.length<=8?2+'px':0+'px'}">{{ info.paraName }}：</span>
              <template v-if="info.oldVal !== '' && info.oldVal !== null">
                <span v-for="(item,i) in info.spinnerInfoList" style="cursor: pointer;color: #009688"
                      v-if="info.oldVal == item.code">{{ item.name }}</span>
              </template>
              <span v-else style="cursor: pointer;color: #009688">暂无数据</span>
              <div v-if="info.selected" style="display: flex">
                <Select v-model="info.paraVal" :placeholder="info.paraName">
                  <Option v-for="(item,i) in info.spinnerInfoList" :value="item.code" :key="i">{{ item.name }}
                  </Option>
                </Select>
              </div>
            </template>
          </div>
        </div>
        <div v-else style="margin-left: 40px"> 暂无数据</div>
        <Button v-if="temp.subParaList.length && accessView" type="primary" @click="changeMode(temp)"
                style="margin-left:30px;" size="small">{{ temp.selected ? '取消' : '编辑' }}
        </Button>
        <Button v-if="temp.selected" type="success" @click="handleSubmit(temp)" size="small" style="margin-left:2px;">
          保存
        </Button>
      </div>
    </Col>
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
      normalHeight: 250,
      infos: [],
      validTag: false,
      receiveMsg: false,
      showLog: false,
      showAlert: false,
      paramType: ['0019002', '0019003'],
      accessView: false
    }
  },
  created: function () {
    this.$xy.vector.$on('ctrlTag', this.getMsg)
    this.$xy.vector.$on('changesize', this.sizeInfo)
  },
  beforeDestroy: function () {
    this.$xy.vector.$off('ctrlTag', this.getMsg)
    this.$xy.vector.$off('changesize', this.sizeInfo)
  },
  mounted() {
    let obj = JSON.parse(localStorage.userInfo)
    if (obj.userName == 'admin') {
      this.accessView = true
    }
  },
  methods: {
    sizeInfo(data) {
      this.$set(this, 'showLog', data.showLog)
      this.$set(this, 'showAlert', data.showAlert)
    },
    setPanelHeight(infoLen) {
      let panelHeight = 400
      if (this.showAlert || this.showLog) {
        if (infoLen) panelHeight = 250
      }
      return panelHeight + 'px'
    },
    getMsg(data) {
      if (!this.receiveMsg) {
        let result = JSON.parse(data.data)
        result.forEach(item => {
          item.subInterList.forEach(key => {
            this.$set(key, 'selected', false)
            key.subParaList.forEach(v => {
              this.$set(v, 'selected', false)
              v.oldVal = JSON.parse(JSON.stringify(v.paraVal))
              v.errorMsg = null
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
                    saveOffset = offset
                    v.splitArr.push({
                      param: v.copyFmt.substring(pos, offset),
                      paraVal: resultChar[index],
                      name: param,
                      oldVal: JSON.parse(JSON.stringify(resultChar[index])),
                      errorMsg: '',
                      subList: [],
                      paraValMax1: null,
                      paraValMin1: null,
                      paraValMax2: null,
                      paraValMin2: null,
                      paraValStep: null,
                      paraSimpleDatatype: v.paraSimpleDatatype,
                      paraStrLen: v.paraStrLen,
                    })
                    if (v.subParaList.length) {
                      if (v.subParaList[index].spinnerInfoList) {
                        let valIndex = v.subParaList[index].spinnerInfoList.findIndex((value) => value.code == v.subParaList[index].paraVal);
                        return match = valIndex > -1 ? v.subParaList[index].spinnerInfoList[valIndex].name : resultChar[index]
                      }
                    }
                    return match = resultChar[index]
                  })
                  if (v.subParaList.length) {
                    v.subParaList.forEach(item => {
                      v.splitArr.forEach(cell => {
                        if (item.subParaLinkVal == cell.paraVal && item.subParaLinkCode == cell.name) {
                          this.commonTransFormate(cell)
                          this.setParamVal(cell, item)
                        }
                        if (item.paraCode == cell.name && item.spinnerInfoList) {
                          cell.subList = n.spinnerInfoList
                        }
                      })
                    })
                  }
                } else {
                  this.commonTransFormate(v)
                }
              }

            })
          })
        })
        this.infos = result
      }

    },
    commonTransFormate(v) {
      if (v.paraSimpleDatatype == 0 || v.paraSimpleDatatype == 2) {
        v.paraValStep = Number(v.paraValStep)
        v.paraVal = (v.paraVal === null || v.paraVal === '') ? null : Number(v.paraVal)
        v.oldVal = (v.paraVal === null || v.paraVal === '') ? null : Number(JSON.parse(JSON.stringify(v.paraVal)))
      }
    },
    changeMode(temp) {
      this.receiveMsg = !this.receiveMsg
      this.validTag = false
      this.$set(temp, 'selected', !temp.selected)
      temp.subParaList.forEach(info => {
        this.$set(info, 'selected', !info.selected)
      })
    },
    /*-----------------验证--------------*/
    validCombine(info, data) {
      info.subParaList.forEach(v => {
        info.splitArr.forEach(x => {
          if (data == v.subParaLinkVal && v.paraCode == x.name) {
            this.setParamVal(x, v)
            this.$set(x, 'paraSimpleDatatype', v.paraSimpleDatatype)
          }
        })
      })
    },
    setParamVal(val, obj) {
      let data = ['paraValMax1', 'paraValMin1', 'paraValMax2', , 'paraValMin2', 'paraSimpleDatatype', 'paraStrLen']
      data.forEach(item => {
        this.$set(val, item, Number(obj[item]))
      })
    },
    validFunc(info,bool,msg){
      this.validTag = bool
      this.$set(info, 'errorMsg', msg)
    },
    textValid(info) {
      if (info.paraVal) {
        switch (info.paraSimpleDatatype) {
          case '0':
          case '2'://数字
            let reg = new RegExp('^[+-]?(0|([1-9]\\d*))(\\.\\d+)?$')//是否数字
            if (reg.test(info.paraVal)) {
              if (info.paraValMax1 && info.paraValMin1) {
                if (info.paraValMin2 && info.paraValMax2) {
                  let bool = (info.paraVal > info.paraValMax1 || info.paraVal < info.paraValMin1) && (info.paraVal > info.paraValMax2 || info.paraVal < info.paraValMin2)
                  if (bool) {
                    this.validFunc(info,true,'下限:' + info.paraValMin1 + '--上限:' + info.paraValMax1 + '或下限:' + info.paraValMin2 + '--上限:' + info.paraValMax2)
                  }
                  this.validFunc(info,false,'')
                } else {
                  if (info.paraVal > info.paraValMax1 || info.paraVal < info.paraValMin1) {
                    this.validFunc(info,true,'下限:' + info.paraValMin1 + '--上限:' + info.paraValMax1)
                  }
                  this.validFunc(info,false,'')
                }
              }
            } else {
              this.validFunc(info,true,'请输入数字')
            }
            break;
          case '1'://字符串
            if (info.paraStrLen) {
              if (info.paraVal.length > info.paraStrLen) {
                this.validFunc(info,true,'长度不能超过' + info.paraStrLen)
              }
              this.validFunc(info,false,'')
            }
            break;
        }
      }
    },
    handleSubmit(temp) {
      if (!this.validTag) {
        this.save(temp)
      }
    },
    async save(temp) {
      temp.subParaList.forEach(info => {
        if (info.paraSpellFmt) {
          let index = -1
          let finallStr = info.paraSpellFmt.replace(/\[(.+?)\]/g, function (match, param, offset, string) {
            index++
            return match = '[' + info.splitArr[index].paraVal + ']'
          })
          info.paraVal = finallStr
        }
      })
      let {success} = await saveCtrlInfo(temp)
      if (success) {
        this.$Notice.success({
          title: '成功',
          desc: '修改成功！',
          duration: 1
        })
        this.changeMode(temp)
      }
    }
  }
}
</script>

<style scoped>
.box {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  width: 100%;
}

.node {
  margin-bottom: 10px;
  width: 46%;
  margin-left: 20px;
}
</style>

<style lang="less">
.param-wrap {
  .ivu-poptip {
    width: 100%;

    .ivu-poptip-rel {
      width: 100%;
    }
  }

}

.combine-class {
  .ivu-input-prefix {
    width: 20%;
  }

  .ivu-input-with-prefix {
    padding-left: 22%;
  }
}
</style>
