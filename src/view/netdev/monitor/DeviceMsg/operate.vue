<template>
  <div class="device-param">
    <div style="border: 1px solid #009688;height: 500px;margin-bottom:10px;overflow: auto">
      <Row>
        <div v-for="(info,index) in paramInfo.datas">
          <Col :xs="24" :lg="8">
            <Form ref="formValidate" :model="info" :label-width="180">
              <Row>
                <Col :xs="24" :lg="24" v-if="info.parahowMode == '0024001'">
                  <template v-if="info.paraSpellFmt">
                    <FormItem prop="paraVal">
                      <span slot="label">{{ info.paraName }}：</span>
                      <Row>
                        <Col :xs="24" :lg="24">
                        <span style="cursor: pointer" @click="changeMode(info)">{{
                            info.transViewFmt ? info.transViewFmt : '暂无数据'
                          }}&nbsp;&nbsp;<span
                            v-if="info.oldVal && info.paraUnit">{{ info.paraUnit }}</span></span>
                        </Col>
                        <Col :xs="24" :lg="24" style="display: flex;margin-left: -60px">
                          <template v-if="info.selected && info.accessRight == '0022003'">
                            <template v-for="temp in info.splitArr">
                              <Input v-model.trim="temp.value"  number>
                                <span  slot="prepend">{{ temp.param }}</span>
                              </Input>
                            </template>
                            <Button type="primary" @click="handleSubmit(info,index)">
                              <Icon type="md-checkmark" size="15"></Icon>
                            </Button>
                            <Button type="default" @click="close(info)">
                              <Icon type="md-close" size="15"></Icon>
                            </Button>
                          </template>
                        </Col>
                      </Row>
                    </FormItem>
                  </template>
                  <template v-else>
                    <FormItem prop="paraVal" :rules="info.ruleMap">
                      <span slot="label">{{ info.paraName }}：</span>
                      <Row>
                        <Col :xs="24" :lg="6">
                        <span style="cursor: pointer" @click="changeMode(info)">{{ info.oldVal ? info.oldVal : '暂无数据' }}&nbsp;&nbsp;<span
                          v-if="info.oldVal && info.paraUnit">{{ info.paraUnit }}</span></span>
                        </Col>
                        <Col :xs="24" :lg="18" style="display: flex">
                          <template v-if="info.selected && info.accessRight == '0022003'">
                            <template
                              v-if="info.paraDatatype == '0023001' ||info.paraDatatype == '0023002' ||info.paraDatatype == '0023003'">
                              <template v-if="info.paraValMin || info.paraValMax">
                                <Poptip trigger="focus" transfer>
                                  <InputNumber v-if="info.paraValStep" v-model="info.paraVal"
                                               :step='info.paraValStep'></InputNumber>
                                  <Input v-if="!info.paraValStep" v-model.trim="info.paraVal"
                                         :placeholder="info.paraName" number>
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
                              <Input v-model.trim="info.paraVal" :placeholder="info.paraName"> <span
                                v-if="info.paraVal && info.paraUnit" slot="suffix">{{ info.paraUnit }}</span></Input>
                            </template>
                            <Button type="primary" @click="handleSubmit(info,index)">
                              <Icon type="md-checkmark" size="15"></Icon>
                            </Button>
                            <Button type="default" @click="close(info)">
                              <Icon type="md-close" size="15"></Icon>
                            </Button>
                          </template>
                        </Col>
                      </Row>
                    </FormItem>
                  </template>
                </Col>
                <Col :xs="24" :lg="24" v-else>
                  <FormItem prop="paraVal">
                    <span slot="label">{{ info.paraName }}：</span>
                    <Row>
                      <Col :xs="24" :lg="4">
                        <template v-if="info.oldVal">
                          <div v-for="(item,i) in info.spinnerInfoList" @click="changeMode(info)">
                            <span style="cursor: pointer" v-if="info.oldVal == item.code">{{ item.name }}</span>
                          </div>
                        </template>
                        <template v-else>
                          <span style="cursor: pointer" @click="changeMode(info)">暂无数据</span>
                        </template>
                      </Col>
                      <Col :xs="24" :lg="18" v-if="info.selected && info.accessRight == '0022003'"
                           style="display: flex">
                        <Select v-if="info.selected" v-model="info.paraVal" :placeholder="info.paraName">
                          <Option v-for="(item,i) in info.spinnerInfoList" :value="item.code" :key="i">{{
                              item.name
                            }}
                          </Option>
                        </Select>
                        <Button type="primary" @click="handleSubmit(info,index)">
                          <Icon type="md-checkmark" size="15"></Icon>
                        </Button>
                        <Button type="default" style="margin-left: 1px" @click="close(info)">
                          <Icon type="md-close" size="15"></Icon>
                        </Button>
                      </Col>
                    </Row>
                  </FormItem>
                </Col>
              </Row>
            </Form>
          </Col>
        </div>
      </Row>
    </div>
    <div style="height: 240px;overflow: auto">
      <Table disabled-hover :columns="logColumns" :data="logs"></Table>
    </div>
  </div>
</template>

<script>
import {editParamValue} from "@/api/monitor/ParaInfo"
import {splitCharacter} from '@/libs/util'

export default {
  data() {
    return {
      value11: 1,
      paramSocket: null,
      logSocket: null,
      paramInfo: {datas: []},
      logColumns: [
        {
          title: '设备类型',
          key: 'devType',
        },
        {
          title: '设备编号',
          key: 'devNo',
        },
        {
          title: '时间',
          key: 'logTime',
          // render: (h, params) => {
          //   return h('span', this.$xy.formatDate(params.row.logTime, true))
          // }
        },
        {
          title: '访问类型',
          key: 'logAccessType',
          render: (h, params) => {
            return h('span', params.row.logAccessType == '0025001' ? '参数' : '接口')
          }
        },
        {
          title: '访问类型名称',
          key: 'logAccessTypeName',
        },
        {
          title: '操作类型',
          key: 'logOperType',
        },
        {
          title: '操作类型名称',
          key: 'logOperTypeName',
        },
        {
          title: '操作对象',
          key: 'logOperObj',
        },
        {
          title: '命令标识符',
          key: 'logCmdMark',
        },
        {
          title: '操作对象名称',
          key: 'logOperObjName',
        },
        {
          title: '操作内容',
          key: 'logOperContent',
        },
        {
          title: '操作人',
          key: 'logUserId',
        },
        {
          title: '原始数据',
          key: 'orignData',
        },
      ],
      logs: []
    }
  },
  mounted() {
    this.initWebSocket()
  },
  beforeRouteLeave(to, from, next) {
    console.error('leave')
    this.paramSocket.close()
    this.logSocket.close()
    this.paramSocket = null
    this.logSocket = null
    next()
  },
  watch: {
    '$route'(newRoute) {
      if (!this.paramSocket && !this.logSocket) {
        this.initWebSocket()
      }
    }
  },
  methods: {
    initWebSocket() { //初始化weosocket
      console.log('链接')
      const wsurl = 'ws://'+this.$xy.SOCKET_URL+'/ws'
      /*-----------------设备参数--------------*/
      this.paramSocket = new WebSocket(wsurl)
      this.paramSocket.onopen = this.paramSendMsg
      this.paramSocket.onmessage = this.getParamMsg
      /*-----------------日志--------------*/
      this.logSocket = new WebSocket(wsurl)
      this.logSocket.onopen = this.logSendMsg
      this.logSocket.onmessage = this.getLogMsg
    },
    /*-----------------设备参数--------------*/
    paramSendMsg() {
      let obj = JSON.stringify({'interfaceMark': "DevParaInfos", 'devNo': this.$route.name})
      this.paramSocket.send(obj)
    },
    getParamMsg(frame) {
      let arr = [
        {
          accessRight: "0022003",
          devNo: "DEV_Ku/L_A",
          devType: "0020005",
          devTypeCode: null,
          paraCmdMark: "SPAA",
          paraCode: "SPAA",
          paraDatatype: "0023002",
          paraId: 2,
          paraName: "测试1",
          paraNo: "998",
          paraStrLen: null,
          paraUnit: null,
          paraVal: "X54.1Y276.2Z445.99",
          paraValMax: 10,
          paraValMin: 2,
          paraValStep: null,
          paraSpellFmt: '{X}[A]{Y}[B]{Z}[C]',
          paraViewFmt: 'X[A]-Y[B]-Z[C]',
          parahowMode: "0024001",
          spinnerInfoList: null,
        },
        {
          accessRight: "0022003",
          devNo: "DEV_Ku/L_A",
          devType: "0020005",
          devTypeCode: null,
          paraCmdMark: "SPAB",
          paraCode: "SPAB",
          paraDatatype: "0023004",
          paraId: 2,
          paraName: "测试2",
          paraNo: "999",
          paraStrLen: 5,
          paraUnit: null,
          paraVal: "2-3",
          paraValMax: null,
          paraValMin: null,
          paraValStep: null,
          paraSpellFmt: '[A]{-}[B]',
          paraViewFmt: 'A[A]-B[B]',
          parahowMode: "0024001",
          spinnerInfoList: null,
        },
      ]
      let data = JSON.parse(frame.data)
      let msg = data.concat(arr)
      msg.forEach(v => {
        v.selected = false
        if (v.paraSpellFmt) {
          v.copyFmt = JSON.parse(JSON.stringify(v.paraViewFmt))
          v.splitArr = []
          let resultChar = splitCharacter(v.paraSpellFmt,v.paraVal)
          let index = -1
          v.transViewFmt =  v.paraViewFmt.replace(/\[(.+?)\]/g,function (match,param,offset,string) {
            index++
            v.splitArr.push({param:v.copyFmt.substring(offset-1,offset),value:resultChar[index]})
            return match = '['+ resultChar[index] +']'
          })
        } else {
          v.oldVal = JSON.parse(JSON.stringify(v.paraVal))
          if (v.paraDatatype == '0023001' || v.paraDatatype == '0023002' || v.paraDatatype == '0023003') {
            if (!v.spinnerInfoList) {
              v.paraValStep = Number(v.paraValStep)
              v.paraVal = Number(v.paraVal)
              if (v.paraValMin && v.paraValMax) {
                v.ruleMap = [{required: true, message: '必填'}, {
                  message: '数值型',
                  trigger: 'blur',
                  pattern: /^(([1-9]\d{0,3})|0)(\.\d{0,2})?$/
                }, {type: 'number', min: Number(v.paraValMin), message: '不能小于' + v.paraValMin, trigger: 'blur'}, {
                  type: 'number',
                  max: Number(v.paraValMax),
                  message: '不能大于' + v.paraValMax,
                  trigger: 'blur'
                }]
              }
            }
          } else {
            v.ruleMap = [{required: true, message: '必填', trigger: 'blur'}, {
              Length: Number(v.paraStrLen),
              message: '长度为' + v.paraStrLen,
              trigger: 'blur'
            }]
          }
        }
      })
      this.paramInfo.datas = msg
    },
    changeMode(info) {
      if (info.paraVal) {
        this.$set(info, 'selected', true)
      } else {
        this.$Message.error('无数据时无法更改，请稍后再试。')
      }
    },
    close(info) {
      this.$set(info, 'selected', false)
    },
    handleSubmit(info, index) {
      this.$refs['formValidate'][index].validate((valid) => {
        if (valid) {
          this.save(info)
        } else {
          this.$Message.error('验证未通过!')
        }
      })
    },
    async save(info) {
      let obj = {
        devNo: info.devNo,
        paraCmdMark: info.paraCmdMark,
        paraNo: info.paraNo,
        paraId: info.paraId
      }
      if(info.paraSpellFmt){
        let index = -1
         let finallStr =  info.paraSpellFmt.replace(/\[(.+?)\]/g,function (match,param,offset,string) {
          index++
          return match = '['+ info.splitArr[index].value +']'
        })
        obj.paraVal = finallStr
      }else{
        obj.paraVal = info.paraVal
      }
      let {result, success, message} = await editParamValue(obj)
      if (success) {
        this.$Notice.success({
          title: '成功',
          desc: message,
          duration: 1
        })
      } else {
        this.$Notice.error({
          title: '失败',
          desc: message,
          duration: 3
        })
      }
    },
    /*-----------------日志--------------*/
    logSendMsg() {
      let obj = JSON.stringify({'interfaceMark': "DevLogInfos", 'devNo': this.$route.name})
      this.logSocket.send(obj)
    },
    getLogMsg(frame) {
      let msg = JSON.parse(frame.data)
      this.logs = msg
    }
  }
}
</script>

<style lang="less">
 .device-param{
   .ivu-form{
     .ivu-form-item{
       margin-bottom: 10px;
     }
   }

 }
</style>
