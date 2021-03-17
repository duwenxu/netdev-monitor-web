<template>
  <div class="home"  type="flex" justify="space-between">
    <template v-for="equipment in equipments">
      <!--多个主设备-->
      <div class="equipment_box" :key="equipment.devNo">
        <!--有子设备-->
        <template v-if="equipment.childList.length">
          <Row>
            <Col class="equipment_parent" span="24">
              {{equipment.name}}
            </Col>
          </Row>
          <!--子设备-->
          <template v-for="device in equipment.childList">
            <Row class="equipment_child" :key="device.devNo"
                 :class="{'equipment_master_status': judgeMasterAndSlave(device)}">

              <Col span="24" class="equipment_name">
                <img :src="equipImgType[device.src]" alt="">
              </Col>
              <Col span="24" class="equipment_status">
                <div>
                  <!--                  <p >{{judgeDeviceStatus(device, 1)}}</p>-->
                  <div style="margin-right: 4px">{{device.name}}</div>
                  <span :style="judgeDeviceStatus(device, 0)"></span>
                </div>
              </Col>
            </Row>
          </template>
        </template>
        <!--没有子设备-->
        <template v-else>
          <Row class="equipment_child">
            <Col span="24" class="equipment_name">
              <img :src="equipImgType[equipment.src]" alt="">
            </Col>
            <Col span="24" class="equipment_status">
              <div>
                <div style="margin-right: 4px">{{equipment.name}}</div>
                <!--                <p >{{judgeDeviceStatus(equipment, 1)}}</p>-->
                <span :style="judgeDeviceStatus(equipment, 0)"></span>
              </div>
            </Col>
          </Row>
        </template>
      </div>
    </template>
  </div>
</template>

<script>
  export default {
    name: 'home',
    components: {
    },
    data () {
      return {
        test: [
          {num:1,ch:[
              {num:7},
              {num:8},
              {num:9},
            ]},
          {num:2,ch:[
              {num:8},
              {num:9},
            ]},
          {num:3, ch: []},
        ],
        equipImgType: {
          1: require('@/assets/images/logo.png')
        },

        equipments:[
          {devNo: '3001', name: '冗余变频器', childList: [
              /*isInterrupt是否中断，workStatus工作状态，isUseStandby是否启用主备，masterOrSlave是否备用，isAlarm是否警告*/
              {devNo: '3201', name: '切换单元', isInterrupt:'0', workStatus: '1', isAlarm: false, isUseStandby: false, masterOrSlave: '0',src: 1},
              {devNo: '3101', name: 'A变频器', isInterrupt:'1', workStatus: '0', isAlarm: false, isUseStandby: false, masterOrSlave: '0',src: 1}, //0是主用
              {devNo: '3102', name: 'B变频器', isInterrupt:'0', workStatus: '0', isAlarm: false, isUseStandby: false, masterOrSlave: '1',src: 1}, //1是主用
            ],},
          {devNo: '4001', name: '调制解调器1', childList: [
              {devNo: '4101', name: 'A调制解调器1', isInterrupt:'0', workStatus: '0', isAlarm: false, isUseStandby: false, masterOrSlave: '0'},
              {devNo: '4102', name: 'B调制解调器1', isInterrupt:'0', workStatus: '0', isAlarm: false, isUseStandby: false, masterOrSlave: '1'},
            ]},
          {devNo: '1001', name: '天线控制单元', childList: [], isInterrupt:'0', workStatus: '0', isAlarm: false, isUseStandby: false, masterOrSlave: '0', src:1},
          {devNo: '2001', name: '功放', childList: [
              {devNo: '2101', name: 'A功放', isInterrupt:'0', workStatus: '0', isAlarm: false, isUseStandby: false, masterOrSlave: '0'},
              {devNo: '2102', name: 'B功放', isInterrupt:'0', workStatus: '0', isAlarm: false, isUseStandby: false, masterOrSlave: '1'},
            ]},
          {devNo: '4002', name: '调制解调器2', childList: [
              {devNo: '4103', name: 'A调制解调器2', isInterrupt:'0', workStatus: '0', isAlarm: false, isUseStandby: false, masterOrSlave: '0'},
              {devNo: '4104', name: 'B调制解调器2', isInterrupt:'0', workStatus: '0', isAlarm: false, isUseStandby: false, masterOrSlave: '1'},
            ]},
        ],
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
      judgeDeviceStatus (device, type) {
        let info = {}
        if (device.isInterrupt === '0' && device.workStatus === '0') { // 0正常
          console.warn(4444)
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
          if (device.name.substr(0, 1)==="A" && device.masterOrSlave === '0') { // 0 主
            status = true
          } else if (device.name.substr(0, 1)==="B" && device.masterOrSlave === '1') { // 1 主
            status = true
          }
        }
        return status
      },
      getWSData(WSdata) {
        console.warn(55555)
        console.warn(WSdata)
        // if (WSdata.length) {
        //   WSdata.forEach(item => {
        //     this.equipments.forEach(equip => {
        //       if (item.devNo === equip.devNo) {
        //         this.setWSDate (item, equip)
        //       } else {
        //         if (equip.childList.length) {
        //           equip.childList.forEach(value => {
        //             if (item.devNo === value.devNo) {
        //               this.setWSDate (item, value)
        //             }
        //           })
        //         }
        //       }
        //     })
        //   })
        // }
      },
      setWSDate (data, obj) {
        obj.isInterrupt = data.isInterrupt
        obj.workStatus = data.workStatus
        obj.masterOrSlave = data.masterOrSlave
        obj.isUseStandby = data.isUseStandby
        obj.isAlarm = data.isAlarm
        console.warn(999999)
        console.warn(this.equipments)
      }

    }
  }
</script>

<style lang="less" scoped>
  .home {
    padding: 20px; //暂时
    color: #fff;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    .equipment_box {
      background: #2e3039;
      padding: 15px;
      width: 11%;
      margin-bottom: 20px;
      margin-right: 20px;
      &:nth-of-type(5n + 0) {
        margin-right: 0;
        /*background: red;*/
      }
      .equipment_parent {
        border-bottom: 1px solid #24262e;
        margin-bottom: 6px;
      }
      .equipment_child {
        border: 1px solid rgb(144, 144, 144);
        padding: 10px;
        margin-bottom: 10px;
        &:last-child{
          margin-bottom: 0;
        }
        &.equipment_master_status {
          background: rgba(255, 142, 77, 0.32);
        }
        .equipment_name {
          text-align: center;
          img {
            height: 100px;
            width: 100px;
          }
        }
        .equipment_status {
          div {
            display: flex;
            flex-direction: row;
            justify-content: center;
            align-items: center;
            p{
              color: #fff;
              margin-right: 4px;
            }

            span{
              display: inline-block;
              background: red;
              height: 20px;
              width: 20px;
              border-radius: 50%;
              &.equipment_active_status{
                background: #009688;
              }
            }
          }
        }
      }


    }





  }

</style>
