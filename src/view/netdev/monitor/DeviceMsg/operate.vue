<template>
  <div class="device-param">

    <div class="order-wrap" v-if="orderDatas.length">
      <div style="margin-bottom: 5px">命令区</div>
      <div  style="display: flex;margin-left: 20px;">
        <Button v-for="(info,index) in orderDatas" @click="save(info,true)"
                style="margin-right: 5px;background: #009688;color: white">
          {{ info.paraName }}
        </Button>
      </div>
    </div>
    <div class="param-wrap" :style="{height:orderDatas.length?400+'px':450+'px'}">
      <common :infos="infos"></common>
      <div>
<!--      <Row>-->
<!--        <div v-for="(info,index) in textDatas">-->
<!--          <Col :xs="24" :lg="6">-->
<!--            <Row>-->
<!--              <Col :xs="11" :lg="11">-->
<!--                <div style="text-align: right">-->
<!--                  <span style="color: red;"-->
<!--                        v-if="info.accessRight == '0022003' || info.accessRight == '0022001'">*</span>-->
<!--                  <span :style="{letterSpacing:info.paraName.length<=8?2+'px':0+'px'}">{{ info.paraName }}：</span>-->
<!--                </div>-->
<!--              </Col>-->

<!--              <Col :xs="13" :lg="13">-->
<!--                          <span style="cursor: pointer"-->
<!--                                @click="changeMode(info)">{{-->
<!--                              (info.oldVal != null && info.oldVal) ? info.oldVal : '暂无数据'-->
<!--                            }}&nbsp;&nbsp;-->
<!--                            <span v-if="info.oldVal && info.paraUnit">{{ info.paraUnit }}</span></span>-->
<!--              </Col>-->
<!--              <template v-if="info.selected &&  (info.accessRight == '0022003' || info.accessRight == '0022001')">-->
<!--                <Col :xs="16" :lg="16" push="4" style="display: flex">-->
<!--                  <template v-if="info.paraSimpleDatatype == 0 || info.paraSimpleDatatype == 2">-->
<!--                    <template v-if="info.paraValMin || info.paraValMax">-->
<!--                      <Poptip trigger="focus" transfer>-->
<!--                        <InputNumber v-if="info.paraValStep" v-model="info.paraVal"-->
<!--                                     :step='info.paraValStep' @on-blur="textValid(info)"></InputNumber>-->
<!--                        <Input v-if="!info.paraValStep" v-model.trim="info.paraVal"-->
<!--                               :placeholder="info.paraName" @on-blur="textValid(info)" number>-->
<!--                          <span v-if="info.paraUnit" slot="suffix">{{ info.paraUnit }}</span>-->
<!--                        </Input>-->
<!--                        <div slot="content">下限:{{ info.paraValMin }}~上限:{{ info.paraValMax }}</div>-->
<!--                      </Poptip>-->
<!--                    </template>-->
<!--                    <template v-else>-->
<!--                      <Input v-model.trim="info.paraVal" :placeholder="info.paraName" number> <span-->
<!--                        v-if="info.paraVal && info.paraUnit" slot="suffix">{{ info.paraUnit }}</span></Input>-->
<!--                    </template>-->
<!--                  </template>-->
<!--                  <template v-else>-->
<!--                    <Input v-model.trim="info.paraVal" :placeholder="info.paraName" @on-blur="textValid(info)">-->
<!--                      <span v-if="info.paraVal && info.paraUnit" slot="suffix">{{ info.paraUnit }}</span>-->
<!--                    </Input>-->
<!--                  </template>-->
<!--                  <Button type="primary" @click="handleSubmit(info)" size="small">-->
<!--                    <Icon type="md-checkmark" size="15"></Icon>-->
<!--                  </Button>-->
<!--                  <Button type="default" @click="close(info)" size="small">-->
<!--                    <Icon type="md-close" size="15"></Icon>-->
<!--                  </Button>-->
<!--                </Col>-->
<!--                <Col :xs="16" :lg="16" push="4">-->
<!--                  <span v-if="info.errorMsg" style="color: red;font-size: 12px">{{ info.errorMsg }}</span>-->
<!--                </Col>-->
<!--              </template>-->
<!--              <Col :xs="24" :lg="24">&nbsp;</Col>-->
<!--            </Row>-->
<!--          </Col>-->
<!--        </div>-->
<!--        <div v-for="(info,index) in selectDatas">-->
<!--          <Col :xs="24" :lg="6">-->
<!--            <Row>-->
<!--              <Col :xs="11" :lg="11">-->
<!--                <div style="text-align: right">-->
<!--                  <span style="color: red;"-->
<!--                        v-if="info.accessRight == '0022003' || info.accessRight == '0022001'">*</span>-->
<!--                  <span :style="{letterSpacing:info.paraName.length<=8?2+'px':0+'px'}">{{ info.paraName }}：</span>-->
<!--                </div>-->
<!--              </Col>-->
<!--              <Col :xs="13" :lg="13">-->
<!--                <template v-if="info.oldVal">-->
<!--                  <div v-for="(item,i) in info.spinnerInfoList" @click="changeMode(info)">-->
<!--                    <span style="cursor: pointer" v-if="info.oldVal == item.code">{{ item.name }}</span>-->
<!--                  </div>-->
<!--                </template>-->
<!--                <template v-else>-->
<!--                  <span style="cursor: pointer" @click="changeMode(info)">暂无数据</span>-->
<!--                </template>-->
<!--              </Col>-->
<!--              <Col :xs="24" :lg="24"-->
<!--                   v-if="info.selected && (info.accessRight == '0022003' || info.accessRight == '0022001')"-->
<!--                   style="display: flex">-->
<!--                <Select v-if="info.selected" v-model="info.paraVal" :placeholder="info.paraName">-->
<!--                  <Option v-for="(item,i) in info.spinnerInfoList" :value="item.code" :key="i">{{ item.name }}-->
<!--                  </Option>-->
<!--                </Select>-->
<!--                <Button type="primary" @click="handleSubmit(info)" size="small">-->
<!--                  <Icon type="md-checkmark" size="15"></Icon>-->
<!--                </Button>-->
<!--                <Button type="default" style="margin-left: 1px" @click="close(info)" size="small">-->
<!--                  <Icon type="md-close" size="15"></Icon>-->
<!--                </Button>-->
<!--              </Col>-->
<!--              <Col :xs="24" :lg="24">&nbsp;</Col>-->
<!--            </Row>-->
<!--          </Col>-->
<!--        </div>-->
<!--        <div v-for="(info,index) in viewDatas">-->
<!--          <Col :xs="24" :lg="6">-->
<!--            <Row>-->
<!--              <Col :xs="11" :lg="11">-->
<!--                <div style="text-align: right">-->
<!--                  <span style="color: red;"-->
<!--                        v-if="info.accessRight == '0022003' || info.accessRight == '0022001'">*</span>-->
<!--                  <span :style="{letterSpacing:info.paraName.length<=8?2+'px':0+'px'}">{{ info.paraName }}：</span>-->
<!--                </div>-->
<!--              </Col>-->
<!--              <Col :xs="13" :lg="13">-->
<!--                      <span style="cursor: pointer" @click="changeMode(info)">{{-->
<!--                          (info.transViewFmt != null) ? info.transViewFmt : '暂无数据'-->
<!--                        }}&nbsp;&nbsp;<span-->
<!--                          v-if="info.oldVal && info.paraUnit">{{ info.paraUnit }}</span></span>-->
<!--              </Col>-->
<!--              <div v-if="info.selected && (info.accessRight == '0022003' || info.accessRight == '0022001')">-->
<!--                <Col :xs="24" :lg="24">-->
<!--                  <template v-for="temp in info.splitArr">-->
<!--                    <Col :xs="info.splitArr.length<=2?8:6" :lg="info.splitArr.length<=2?8:6">-->
<!--                      <Select v-if="temp.subList" v-model="temp.paraVal" @on-change="validCombine(info,$event)">-->
<!--                        <Option v-for="(item,i) in temp.subList" :value="item.code" :key="i">{{ item.name }}-->
<!--                        </Option>-->
<!--                        <span slot="prefix">{{ temp.param }}</span>-->
<!--                      </Select>-->
<!--                      <template v-else>-->
<!--                        <Poptip v-if="temp.paraValMin || temp.paraValMax" trigger="focus" transfer>-->
<!--                          <Input v-model.trim="temp.paraVal" @on-blur="textValid(temp)" number>-->
<!--                            <span slot="prefix">{{ temp.param }}</span>-->
<!--                          </Input>-->
<!--                          <div slot="content">下限:{{ temp.paraValMin }}~上限:{{ temp.paraValMax }}</div>-->
<!--                        </Poptip>-->
<!--                        <Input v-else v-model.trim="temp.paraVal" @on-blur="textValid(temp)">-->
<!--                          <span slot="prefix">{{ temp.param }}</span>-->
<!--                        </Input>-->
<!--                        <span v-if="temp.errorMsg" style="color: red;font-size: 12px">{{ temp.errorMsg }}</span>-->
<!--                      </template>-->
<!--                    </Col>-->
<!--                  </template>-->
<!--                  <Button type="primary" @click="handleSubmit(info)" size="small"-->
<!--                          style="margin-right:1px;margin-top: 4px">-->
<!--                    <Icon type="md-checkmark" size="15"></Icon>-->
<!--                  </Button>-->
<!--                  <Button type="default" @click="close(info)" size="small" style="margin-top: 4px">-->
<!--                    <Icon type="md-close" size="15"></Icon>-->
<!--                  </Button>-->
<!--                </Col>-->
<!--              </div>-->
<!--              <Col :xs="24" :lg="24">&nbsp;</Col>-->
<!--            </Row>-->
<!--          </Col>-->
<!--        </div>-->
<!--      </Row>-->
      </div>
    </div>
    <div :style="{height:orderDatas.length?240+'px':300+'px',overflow:'auto'}">
      <Table disabled-hover :columns="logColumns" :data="logs"></Table>
    </div>
  </div>
</template>

<script>

import {splitCharacter} from '@/libs/util'
import common from './common'
export default {
  components:{common},
  data() {
    return {
      paramSocket: null,
      logSocket: null,
      infos:[],
      // oldDatas: [],
      // viewDatas: [],
      // selectDatas: [],
      // textDatas: [],
      orderDatas: [],
      paramType: ['0019002', '0019003'],
      logColumns: [
        {
          title: '日志时间',
          width: 200,
          key: 'logTime',
        },
        {
          title: '访问类型名称',
          width: 120,
          key: 'logAccessTypeName',
        },
        {
          title: '操作类型名称',
          width: 120,
          key: 'logOperTypeName',
        },
        {
          title: '命令标识符',
          width: 120,
          key: 'logCmdMark',
        },
        {
          title: '操作对象名称',
          width: 200,
          key: 'logOperObjName',
        },
        {
          title: '操作内容',
          key: 'logOperContent',

          tooltip: true,
        },
        {
          title: '原始数据',

          key: 'orignData',
        },
      ],
      logs: [],
    }
  },
  mounted() {
    this.initWebSocket()
  },
  beforeRouteLeave(to, from, next) {
    this.paramSocket.close()
    this.logSocket.close()
    this.paramSocket = null
    this.logSocket = null
    next()
  },
  methods: {
    initWebSocket() { //初始化weosocket
      let wsurl =  document.documentURI.split("#")[0].replace("http://","ws://")+"track_socket/ws"
      // const wsurl = 'ws://' + this.$xy.SOCKET_URL + '/ws'
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
      let msg = JSON.parse(frame.data)
      this.editData(msg)
    },
    editData(msg) {
      let textArr = [], viewArr = [], selectArr = [], oderArr = []
      msg.forEach(v => {
        v.selected = false
        v.errorMsg = ''
        if (v.accessRight == '0022005') {
          oderArr.push(v)
        } else {
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
          } else {
            // selectArr.push(v)
          }
        }
        v.oldVal = JSON.parse(JSON.stringify(v.paraVal))
      })
      this.orderDatas = oderArr
      // this.textDatas = textArr
      // this.selectDatas = selectArr
      // this.viewDatas = viewArr
      console.log(msg)
      this.infos = msg
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

<style  lang="less">
.order-wrap {
  border: 1px solid #009688;
  height: 100px;
  border-radius: 5px;
  padding: 10px;
  overflow: auto;
  margin-bottom: 5px;
}

.param-wrap {
  border: 1px solid #009688;
  //height: 450px;
  margin-bottom: 10px;
  overflow: auto;
  border-radius: 5px;
  padding: 10px
}
</style>
