<template>
  <div>
    <div v-if="infos.length" class="box">
      <div v-for="(info,index) in infos" class="node" v-if="info.ndpaIsImportant !=2">
        <template v-if="info.parahowMode == '0024001'">
          <div v-if="paramType.indexOf(info.paraCmplexLevel) > -1 || info.paraSpellFmt">
            <span style="color: red;"
                  v-if="accessView && (info.accessRight == '0022003' || info.accessRight == '0022001')">*</span>
            <span :style="{letterSpacing:info.paraName.length<=8?2+'px':0+'px'}">{{ info.paraName }}：</span>
            <template v-if="info.splitArr.length">
              <!-- 显示组合参数值为绿色-->
              <template v-for="item in info.splitArr">
                    <span style="cursor: pointer;" @click="clickParamValue(info)">{{ item.param }}
                         <span v-if="item.subList.length">
                            <span v-for="cell in item.subList" v-if="cell.code == item.oldVal" style="color: #009688">{{ cell.name }} </span>
                         </span>
                           <span v-else style="color: #009688">{{ item.paraVal }}</span>
                    </span>
              </template>
            </template>
            <span v-else style="color:#009688;">暂无数据&nbsp;&nbsp;</span>
            <!--             组合参数分割-->
            <div class="combine-class"  v-if="accessView && info.selected &&  (info.accessRight == '0022003' || info.accessRight == '0022001')">
              <template v-for="temp in info.splitArr">
                <Select v-if="temp.subList.length" v-model="temp.paraVal" @on-change="validCombine(info,$event)">
                  <Option v-for="(item,i) in temp.subList" :value="item.code" :key="i">{{ item.name }}
                  </Option>
                  <span slot="prefix">{{ temp.param }}</span>
                </Select>
                <template v-else>
                  <Poptip v-if="temp.paraValMin1 || temp.paraValMax1" trigger="focus" transfer>
                    <Input v-model.trim="temp.paraVal" @on-blur="textValid(temp)" number>
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
                         >
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
            <span style="color: red;"
                  v-if="accessView && (info.accessRight == '0022003' || info.accessRight == '0022001')">*</span>
            <span :style="{letterSpacing:info.paraName.length<=8?2+'px':0+'px'}">{{ info.paraName }}：</span>
            <span style="cursor: pointer;color:#009688"
                  @click="clickParamValue(info)">{{ (info.oldVal !== null && info.oldVal !== '') ? info.oldVal : '暂无数据' }}&nbsp;&nbsp;
                            <span v-if="info.oldVal && info.paraUnit">{{ info.paraUnit }}</span></span>
            <template v-if="accessView && info.selected &&  (info.accessRight == '0022003' || info.accessRight == '0022001')">
              <div style="display: flex">
                <template v-if="info.paraSimpleDatatype == 0 || info.paraSimpleDatatype == 2">
                  <template v-if="info.paraValMin1 || info.paraValMax1">
                    <Poptip trigger="focus" transfer>
                      <InputNumber v-if="info.paraValStep" v-model="info.paraVal"
                                   :step='info.paraValStep' @on-blur="textValid(info)"
                                   style="width: 100%"></InputNumber>
                      <Input v-if="!info.paraValStep" v-model.trim="info.paraVal"
                             :placeholder="info.paraName" @on-blur="textValid(info)"
                             number>
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
                    <Input v-model.trim="info.paraVal" :placeholder="info.paraName" number>
                      <span v-if="info.paraVal && info.paraUnit" slot="suffix">{{ info.paraUnit }}</span></Input>
                  </template>
                </template>
                <template v-else>
                  <Input v-model.trim="info.paraVal" :placeholder="info.paraName" @on-blur="textValid(info)">
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
          <span style="color: red;"
                v-if="accessView && (info.accessRight == '0022003' || info.accessRight == '0022001')">*</span>
          <span :style="{letterSpacing:info.paraName.length<=8?2+'px':0+'px'}">{{ info.paraName }}：</span>
          <template v-if="info.oldVal !== '' && info.oldVal !== null">
            <span v-for="(item,i) in info.spinnerInfoList" @click="clickParamValue(info)"
                  style="cursor: pointer;color: #009688" v-if="info.oldVal == item.code">{{ item.name }}</span>
          </template>
          <template v-else>
            <span style="cursor: pointer;color: #009688" @click="clickParamValue(info)">暂无数据</span>
          </template>
          <div v-if="accessView && info.selected && (info.accessRight == '0022003' || info.accessRight == '0022001')"
               style="display: flex">
            <Select v-model="info.paraVal" :placeholder="info.paraName">
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
      </div>
    </div>
    <div v-else>
      <span>暂无数据</span>
    </div>
    <Modal width="400" v-model="showModal" footer-hide>
      <div slot="header">
        <Icon size="24" style="color: #ffbf00" type="md-alert"/>
        确定选择当前卫星进行一键对星命令吗？
      </div>
      <Form ref="planetData" :model="planetData" class="planet-wrapper">
        <FormItem  :label-width="100" v-for="info in planets">
          <span slot="label">
            <span style="color: red" v-if="info.type !=3">*</span>{{info.name}}：
          </span>
          <Row>
            <Col :xs="18" :sm="18" :md="18" :lg="18">
              <span v-if="!info.show" style="cursor: pointer"
                    @click="editparaValue(info)">
                <span v-if="info.type===1">
                  <span v-for="item in chooseList" v-if="item.value === planetData[info.value]">
                    {{item.name}}
                  </span>
                </span>
              <span v-else>{{ planetData[info.value] }}</span>
              </span>
              <Input v-if="info.show && info.type === 2" v-model.trim="planetData[info.value]"
                     :placeholder="info.name"></Input>
              <Select v-if="info.show && info.type === 1" v-model="planetData[info.value]" clearable
                      :placeholder="info.name">
                <Option v-for='(choose,index) in chooseList' :key="index" :value='choose.value'>{{ choose.name }}
                </Option>
              </Select>
            </Col>
            <Col :xs="6" :sm="6" :md="6" :lg="6">
              <Button v-if="info.show" type="primary" @click="operate(info)" size="small"
                      style="margin-right:2px;margin-top: 4px">
                <Icon type="md-checkmark" size="15"></Icon>
              </Button>
              <Button v-if="info.show" type="default" @click="operate(info)" size="small" style="margin-top: 4px">
                <Icon type="md-close" size="15"></Icon>
              </Button>
            </Col>
          </Row>
        </FormItem>
        <div style="color:red;font-size: 12px">
          <Icon size="20" type="ios-warning-outline"/>
          此操作一经确认，无法取消！
        </div>
        <Divider></Divider>
        <FormItem style="float: right;margin-top: -20px">
          <Button type="primary" @click="savePlanetInfo()" style="margin-right: 10px">确认</Button>
          <Button @click="closePlanetModal()">取消</Button>
        </FormItem>
      </Form>
    </Modal>
  </div>
</template>
<script>
import {editParamValue} from "@/api/monitor/ParaInfo";
import {querySpacePresetById, savePlanetData} from "@/api/monitor/NtdvSpacePreset";
export default {
  name: "common",
  props: {
    infos: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      showModal: false,
      validTag: false,
      accessView: false,
      receiveMsg:true,
      //1下拉框2输入框3不能改
      planets: [
        {name: '卫星名称', value: 'spName', show: false, type: 3},
        {name: '卫星经度', value: 'spLongitude', show: false, type: 2},
        {name: '信标频率', value: 'spBeaconFrequency', show: false, type: 2},
        {name: '极化方向', value: 'spPolarization', show: false, type: 1},
      ],
      planetData: {},
      planetInfo: {},
      currentParam: {},
      chooseList: [],
      paramType: ['0019002']//组合参数类型
    }
  },
  mounted() {
    let obj = JSON.parse(localStorage.userInfo)
    if (obj.userName == 'admin') {
      this.accessView = true
    }
  },
  methods: {
   // -------paraCmdMark === 'optSate' && devType === '0020001'----------------
    getPlanetDropList() {
      this.$xy.getParamGroup('0101').then(res => {
        this.chooseList = res;
      })
    },
    async getTypeAndValue(info) {
      let {success, result} = await querySpacePresetById(info.paraVal)
      if (success) {
        this.showConfirmModal(success, result, info)
      }
    },
    showConfirmModal(success, result, info) {
      if (success) {
        this.getPlanetDropList()
        this.planetInfo = {
          devNo: info.devNo,
          paraNo: info.paraNo,
          paraCmdMark: info.paraCmdMark
        }
        this.planetData = result
        this.currentParam = info
        this.showModal = true
      }
    },
    closePlanetModal() {
      this.showModal = false
    },
    async savePlanetInfo() {
      let obj = Object.assign(this.planetData, this.planetInfo)
      let {success} = await savePlanetData(obj)
      if (success) {
        this.$Notice.success({
          title: '成功',
          desc: '保存成功！',
          duration: 1
        })
        this.showModal = false
        this.close(this.currentParam)
      }
    },
    editparaValue(info) {
      if (info.type == 3) return
      this.$set(info, 'show', !info.show)
    },
    operate(info) {
      info.show = false
    },
  //---------基础参数------
    commonSetParamVal(val,obj){
      let data = ['paraValMax1','paraValMin1','paraValMax2','paraValMin2','paraValStep','paraSimpleDatatype','paraStrLen']
      data.forEach(item=>{
        this.$set(val, item, Number(obj[item]))
      })
    },
    clickParamValue(info) {
      if (this.accessView) {
        this.receiveMsg = !this.receiveMsg
        this.validTag = false//每次点击前将验证状态初始化
        if (info.subParaList.length) {
          info.subParaList.forEach(val => {
            info.splitArr.forEach(item=>{
              if(val.subParaLinkVal == item.paraVal && val.subParaLinkCode == item.name && val.paraCode == item.name){
                this.commonSetParamVal(item,val)
                if (item.paraSimpleDatatype == 0 || item.paraSimpleDatatype == 2) {
                  this.$set(item, 'paraVal', Number(item.paraVal))
                }
              }
            })
          })
        }
        if (info.paraVal !== null && info.paraVal !== '') {
          this.$set(info, 'selected', true)
        } else {
          this.$Message.error('无数据时无法更改，请稍后再试。')
        }
        this.$xy.vector.$emit('receiveMsg', !this.receiveMsg)
      }
    },
    close(info) {
      if (!info.paraSpellFmt) {
        this.$set(info, 'errorMsg', '')
        this.$set(info, 'paraVal', info.oldVal)
      } else {
        info.splitArr.forEach(v => {
          this.$set(v, 'errorMsg', '')
          this.$set(v, 'paraVal', v.oldVal)
        })
      }
      this.$set(info, 'selected', false)
    },
    validCombine(info, data) {
      info.subParaList.forEach(val => {
        info.splitArr.forEach(item => {
          if (data == val.subParaLinkVal && val.paraCode == item.name) {
            this.commonSetParamVal(item,val)
          }
        })
      })
    },
    /*-----------------验证--------------*/
    textValid(info) {
      if (info.paraVal) {
        if (info.paraSimpleDatatype == 1) {
          if (info.paraStrLen) {
            if (info.paraVal.length > info.paraStrLen) {
              this.validTag = true
              this.$set(info, 'errorMsg', '长度不能超过' + info.paraStrLen)
            } else {
              this.resetErrorMsg(info)
            }
          } else {
            this.resetErrorMsg(info)
          }
        } else {
          let reg = new RegExp('^[+-]?(0|([1-9]\\d*))(\\.\\d+)?$')
          if (reg.test(info.paraVal)) {
            if (info.paraValMax1 && info.paraValMin1) {
              if (info.paraValMin2 && info.paraValMax2) {
                if ((Number(info.paraVal) > Number(info.paraValMax1) || Number(info.paraVal) < Number(info.paraValMin1)) &&
                  (Number(info.paraVal) > Number(info.paraValMax2) || Number(info.paraVal) < Number(info.paraValMin2))
                ) {
                  this.validTag = true
                  this.$set(info, 'errorMsg', '下限:' + info.paraValMin1 + '--上限:' + info.paraValMax1 + '或下限:' + info.paraValMin2 + '--上限:' + info.paraValMax2)
                } else {
                 this.resetErrorMsg(info)
                }
              } else {
                if (Number(info.paraVal) > Number(info.paraValMax1) || Number(info.paraVal) < Number(info.paraValMin1)) {
                  this.validTag = true
                  this.$set(info, 'errorMsg', '下限:' + info.paraValMin1 + '--上限:' + info.paraValMax1)
                } else {
                  this.resetErrorMsg(info)
                }
              }

            }
          } else {
            this.validTag = true
            this.$set(info, 'errorMsg', '请输入数字')
          }
        }
      }
    },
    resetErrorMsg(info){
      this.validTag = false
      this.$set(info, 'errorMsg', '')
    },
    handleSubmit(info) {
      if (!this.validTag) {
        if (info.paraCmdMark === 'optSate' && info.devType === '0020001') {
          this.getTypeAndValue(info)
        } else {
          this.save(info)
        }
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
          return match = '[' + info.splitArr[index].paraVal + ']'
        })
        obj.paraVal = finallStr
      } else {
        obj.paraVal = info.paraVal
      }
      if (obj.paraVal !== '') {
        let {success, error} = await editParamValue(obj)
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
        this.$set(info, 'selected', false)
      }
    }
  }
}
</script>

<style scoped lang="less">
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
.combine-class {
  .ivu-input-prefix {
    width: 20%;
  }

  .ivu-input-with-prefix {
    padding-left: 22%;
  }

  .ivu-select-prefix {
    width: 20%;
    text-align: center;
  }

  .ivu-select-single .ivu-select-head-with-prefix, .ivu-select-multiple .ivu-select-head-with-prefix {
    padding-left: 13px !important;
  }
}

.planet-wrapper {
  .ivu-form-item {
    margin-bottom: 5px;
  }
}
</style>
