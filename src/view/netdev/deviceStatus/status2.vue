<template>
  <div class="home">
    <div class="line">
      <svg width="100%" height="100%">
        <defs>
          <marker id="arrow"
                  markerUnits="strokeWidth"
                  markerWidth="9"
                  markerHeight="9"
                  viewBox="0 0 10 10"
                  refX="5"
                  refY="5"
                  orient="auto">
            <path d="M0,0 L0,10 L10,5 L0,0" :style="{fill: polylineColor}" />
          </marker>
        </defs>
        <template v-for="equipment in equipments">
          <template v-for="(line, index) in position[equipment.devNo].polyline">
            <g transform="translate(0.5,0.5)">
              <polyline :key="equipment.devNo + '_' + index " :points="line" fill="transparent"
                        :stroke="polylineColor" stroke-width="1" marker-end="url(#arrow)"></polyline>
            </g>
          </template>
        </template>
      </svg>
    </div>

    <template v-for="equipment in equipments">
      <template v-if="equipment.childList.length">
        <div class="equipment_box" :key="equipment.devNo"
             :style="devicePosition(equipment)">
          <div class="equipment_parent">
            {{equipment.name}}
          </div>
          <template v-for="device in equipment.childList">
            <div class="equipment_child" :key="device.devNo"
                 @click="pageJump(device)"
                 :class="{'equipment_master_status': judgeMasterAndSlave(device)}">
              <div class="device_img">
                <img :src="equipImgType[device.src]" alt="">
              </div>
              <div class="device_title">
                <div style="margin-right: 4px">{{device.name}}</div>
                <span :style="judgeDeviceStatus(device, 0)"></span>
              </div>
            </div>
          </template>
        </div>
      </template>
      <template v-else>
        <div class="equipment_box equipment_child equipment_padding" :key="equipment.devNo"
             :style="devicePosition(equipment)"  style="margin-bottom: 0"
             @click="pageJump(equipment)">
          <div class="device_img">
            <img :src="equipImgType[equipment.src]" alt="">
          </div>
          <div class="device_title">
            <div style="margin-right: 4px">{{equipment.name}}</div>
            <!--                <p >{{judgeDeviceStatus(equipment, 1)}}</p>-->
            <span :style="judgeDeviceStatus(equipment, 0)"></span>
          </div>
        </div>
      </template>
    </template>

    <div class="legend">
      <div class="legend_status" v-for="(item, index) in legendType" :key="index">
        <span :class="[item.shape]" :style="{background: item.color, borderColor: item.borderColor}"></span>{{item.description}}
      </div>
    </div>

  </div>
</template>

<script>
  import mixin from "../../../components/common/websocket";
  import {mapState} from "vuex";

  export default {
    mixins: [mixin],
    data () {
      return {
        polylineColor: '#7f7f7f',
        heightType: {
          1: '180px',
          2: '365px',
          3: '525px'
        },
        equipImgType: {
          1: require('@/assets/images/home/switching.png'),
          2: require('@/assets/images/home/antenna.png'),
          3: require('@/assets/images/home/inverter1.png'),
          4: require('@/assets/images/home/modem2.png'),
          5: require('@/assets/images/home/power.png'),
        },
        position: {
          '5': {
            top: '0px',
            left: '0px',
            // polyline: ['179,440 490,440 490,150']
          },
          '19': {
            top: '0px',
            left: '190px',
          },
          '20': {
            top: '0px',
            left: '350px',
          },
          '2': {
            top: '0px',
            left: '510px',
          },
        },
        equipments:[
          {devNo: '5', name: '冗余变频器', childList: [
              /*isInterrupt是否中断，workStatus工作状态，isUseStandby是否启用主备，masterOrSlave是否备用，isAlarm是否警告*/
              {devNo: '8', name: '切换单元', isInterrupt:'', workStatus: '', isAlarm: false, isUseStandby: false, masterOrSlave: '0',src: 1},
              {devNo: '6', name: 'A变频器', isInterrupt:'', workStatus: '', isAlarm: false, isUseStandby: false, masterOrSlave: '0',src: 3}, //0是主用
              {devNo: '7', name: 'B变频器', isInterrupt:'', workStatus: '', isAlarm: false, isUseStandby: false, masterOrSlave: '1',src: 3}, //1是主用
            ],},
          {devNo: '19', name: '调制解调器', childList: [], isInterrupt:'', workStatus: '', isAlarm: false, isUseStandby: false, masterOrSlave: '0', src:4},
          {devNo: '20', name: '天线控制单元', childList: [], isInterrupt:'', workStatus: '', isAlarm: false, isUseStandby: false, masterOrSlave: '0', src:2},
          {devNo: '2', name: '功放', childList: [
              {devNo: '3', name: 'A功放', isInterrupt:'', workStatus: '', isAlarm: false, isUseStandby: false, masterOrSlave: '0',src: 5},
              {devNo: '4', name: 'B功放', isInterrupt:'', workStatus: '', isAlarm: false, isUseStandby: false, masterOrSlave: '1',src: 5},
            ]},
        ],
        legendType: [
          {shape: 'circle', color: '#009688', description: '正常'},
          {shape: 'circle', color: '#ff1400', description: '中断'},
          {shape: 'circle', color: '#ffbe08', description: '维修'},
          {shape: 'square', color: 'rgba(0,150,136,0.05)', borderColor:'#009688', description: '运行'},
        ]
      }
    },
    computed: {
      ...mapState({
        mediaWidthType: state => state.user.mediaWidthType
      }),
    },
    watch: {
      mediaWidthType(){
        this.getMediaWidth()
      }
    },
    mounted () {
      this.getMediaWidth()
    },
    methods: {
      getMediaWidth(){
        if (this.mediaWidthType === 0){
          this.position = {
            '5': {
              top: '0px',
              left: '0px',
              // polyline: ['179,440 490,440 490,150']
            },
            '19': {
              top: '0px',
              left: '155px',
            },
            '20': {
              top: '0px',
              left: '290px',
            },
            '2': {
              top: '0px',
              left: '425px',
            },
          }
        }else if (this.mediaWidthType === 1) {
          this.position = {
            '5': {
              top: '0px',
              left: '0px',
              // polyline: ['179,440 490,440 490,150']
            },
            '19': {
              top: '0px',
              left: '190px',
            },
            '20': {
              top: '0px',
              left: '350px',
            },
            '2': {
              top: '0px',
              left: '510px',
            },
          }
        }
      },
      devicePosition (equipment){
        return {
          top: this.position[equipment.devNo].top,
          left: this.position[equipment.devNo].left
        }
      },
      pageJump(device){
        if (device.devNo) {
          this.$router.push({path: device.hasOwnProperty('childList')
              ? `/devices/list/${device.devNo}`
              :`/devices/list/list/${device.devNo}`})
        }
      },
      judgeDeviceStatus (device, type) {
        let info = {}
        if (device.isInterrupt === '0' && device.workStatus === '0') { // 0正常
          info = type ? '正常' : {
            background: '#009688'
          }
        } else if (device.isInterrupt === '1') { // 中断
          info = type ? '中断': {
            background: '#ff1400'
          }
        } else if(device.workStatus === '1') { // 1 维修
          info = type ? '维修':{
            background: '#ffbe08'
          }
        }
        return info
      },
      judgeMasterAndSlave(device) {
        let status = false
        if (device.masterOrSlave !== null) {
          if ((device.devDeployType ==="0031002" && device.masterOrSlave === '0')
            || (device.devDeployType ==="0031003" && device.masterOrSlave === '1')) {
            status = true
          }
        }
        return status
      },
      getWSData(WSdata) {
        if (WSdata.length) {
          WSdata.forEach(item => {
            this.equipments.forEach(equip => {
              if (item.devNo === equip.devNo) {
                this.setWSDate (item, equip)
              } else {
                if (equip.childList.length) {
                  equip.childList.forEach(value => {
                    if (item.devNo === value.devNo) {
                      this.setWSDate (item, value)
                    }
                  })
                }
              }
            })
          })
        }
      },
      setWSDate (data, obj) {
        obj.devDeployType = data.devDeployType /*0031002 主设备运行 0031003 备设备运行*/
        obj.isInterrupt = data.isInterrupt
        obj.workStatus = data.workStatus
        obj.masterOrSlave = data.masterOrSlave
        obj.isUseStandby = data.isUseStandby
        obj.isAlarm = data.isAlarm
      }

    }
  }
</script>

<style lang="less" scoped>
  @import "./status.less";
</style>
