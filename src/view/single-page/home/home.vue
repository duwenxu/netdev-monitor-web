<template>
  <div class="home">
    <div class="line">
      <svg width="100%" height="100%">
        <defs>
          <marker id="arrow"
                  markerUnits="strokeWidth"
                  markerWidth="6"
                  markerHeight="6"
                  viewBox="0 0 10 10"
                  refX="5"
                  refY="5"
                  orient="auto">
            <path d="M0,0 L0,10 L10,5 L0,0" :style="{fill: polylineColor}" />
          </marker>
        </defs>
        <template v-for="equipment in equipments">
          <template v-for="(line, index) in position[equipment.devNo].polyline">
            <polyline :key="equipment.devNo + '_' + index " :points="line" fill="transparent"
                      :stroke="polylineColor" stroke-width="2" marker-end="url(#arrow)"></polyline>
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
              <img :src="equipImgType[device.src]" alt="">
              <div>
                <div style="margin-right: 4px">{{device.name}}</div>
                <span :style="judgeDeviceStatus(device, 0)"></span>
              </div>
            </div>
          </template>
      </div>
      </template>
      <template v-else>
        <div class="equipment_box equipment_child" :key="equipment.devNo"
             :style="devicePosition(equipment)"  style="margin-bottom: 0"
             @click="pageJump(equipment)">
          <img :src="equipImgType[equipment.src]" alt="">
          <div>
            <div style="margin-right: 4px">{{equipment.name}}</div>
            <!--                <p >{{judgeDeviceStatus(equipment, 1)}}</p>-->
            <span :style="judgeDeviceStatus(equipment, 0)"></span>
          </div>
        </div>
      </template>
    </template>

    <div class="legend">
      <div class="legend_status" v-for="(item, index) in legendType" :key="index">
        <span :class="[item.shape]" :style="{background: item.color}"></span>{{item.description}}
      </div>
    </div>

  </div>
</template>

<script>
  export default {
    name: 'home',
    components: {
    },
    data () {
      return {
        polylineColor: '#000',
        heightType: {
          1: '180px',
          2: '365px',
          3: '525px'
        },
        equipImgType: {
          1: require('@/assets/images/home/computer.png')
        },
        position: {
          '5': {
            top: '0px',
            left: '0px',
            // polyline: ['178,440 490,440 490,155']
          },
          '9': {
            top: '0px',
            left: '200px',
          },
          '1': {
            top: '0px',
            left: '400px',
          },
          '2': {
            top: '0px',
            left: '600px',
          },
          '10': {
            top: '0px',
            left: '800px',
          }
        },
        equipments:[
          {devNo: '5', name: '冗余变频器', childList: [
            /*isInterrupt是否中断，workStatus工作状态，isUseStandby是否启用主备，masterOrSlave是否备用，isAlarm是否警告*/
              {devNo: '8', name: '切换单元', isInterrupt:'0', workStatus: '1', isAlarm: false, isUseStandby: false, masterOrSlave: '0',src: 1},
              {devNo: '6', name: 'A变频器', isInterrupt:'1', workStatus: '0', isAlarm: false, isUseStandby: false, masterOrSlave: '0',src: 1}, //0是主用
              {devNo: '7', name: 'B变频器', isInterrupt:'0', workStatus: '0', isAlarm: false, isUseStandby: false, masterOrSlave: '1',src: 1}, //1是主用
            ],},
          {devNo: '9', name: '调制解调器1', childList: [
              {devNo: '11', name: 'A调制解调器1', isInterrupt:'0', workStatus: '0', isAlarm: false, isUseStandby: false, masterOrSlave: '0',src: 1},
              {devNo: '12', name: 'B调制解调器1', isInterrupt:'0', workStatus: '0', isAlarm: false, isUseStandby: false, masterOrSlave: '1',src: 1},
            ]},
          {devNo: '1', name: '天线控制单元', childList: [], isInterrupt:'0', workStatus: '0', isAlarm: false, isUseStandby: false, masterOrSlave: '0', src:1},
          {devNo: '2', name: '功放', childList: [
              {devNo: '3', name: 'A功放', isInterrupt:'0', workStatus: '0', isAlarm: false, isUseStandby: false, masterOrSlave: '0',src: 1},
              {devNo: '4', name: 'B功放', isInterrupt:'0', workStatus: '0', isAlarm: false, isUseStandby: false, masterOrSlave: '1',src: 1},
            ]},
          {devNo: '10', name: '调制解调器2', childList: [
              {devNo: '13', name: 'A调制解调器2', isInterrupt:'0', workStatus: '0', isAlarm: false, isUseStandby: false, masterOrSlave: '0',src: 1},
              {devNo: '14', name: 'B调制解调器2', isInterrupt:'0', workStatus: '0', isAlarm: false, isUseStandby: false, masterOrSlave: '1',src: 1},
            ]},
        ],
        legendType: [
          {shape: 'circle', color: '#009688', description: '正常'},
          {shape: 'circle', color: '#ff1400', description: '中断'},
          {shape: 'circle', color: '#ffbe08', description: '维修'},
          {shape: 'square', color: 'rgba(201, 201, 201, 0.66)', description: '运行'},
        ]
      }
    },
    created() {
      this.$xy.vector.$on('WS_homeInfo', this.getWSData)
    },
    beforeDestroy() {
      this.$xy.vector.$off('WS_homeInfo', this.getWSData)
    },
    mounted () {
    },
    methods: {
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
  .home {
    position: relative;
    height: calc(~"100vh - 160px");
    margin: 20px;

    .equipment_box {
      position: absolute;
      top: 0;
      left: 0;
      padding: 15px 15px;
      width: 180px;
    }
    .equipment_parent {
      margin-bottom: 5px;
      text-align: center;
    }
    .equipment_child {
      text-align: center;
      padding: 10px;
      margin-bottom: 10px;
      &:last-child {
        margin-bottom: 0 !important;
      }

      img {
        height: 100px;
        width: 100px;
      }
      div {
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;

        span{
          display: inline-block;
          background: #ccc;
          height: 20px;
          width: 20px;
          border-radius: 50%;
        }
      }
    }

    .line {
      height: 100%;
      width: 100%;
      svg {
        position: absolute;
        top: 0;
        left: 0;
      }

    }

    .legend {
      position: absolute;
      top: 0;
      right: 0;
      .legend_status {
        display: flex;
        flex-direction: row;
        align-items: center;
        margin-bottom: 10px;

        &:last-child{
          margin-bottom: 0;
        }
        span {
          display: inline-block;
          background: #ccc;
          height: 20px;
          width: 20px;
          margin-right: 5px;
        }
        .circle {
          border-radius: 50%;
        }
        .square {

        }
      }

    }
  }
</style>
