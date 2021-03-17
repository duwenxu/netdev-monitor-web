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
          <template v-for="device in equipment.childList">
            <Row class="equipment_child" :key="device.devNo"
                 :class="{'equipment_master_status': judgeMasterAndSlave(device)}">
              <Col span="9" class="equipment_name">
                {{device.name}}
              </Col>
              <Col span="15" class="equipment_status">
                <div :class="{'equipment_active_status':device.isInterrupt==='0'}">
                  <p>正常</p>
                  <span :class="{'equipment_active_status':device.isInterrupt==='0'}"></span>
                  <p>中断</p>
                  <span :class="{'equipment_active_status':device.isInterrupt==='1'}"></span>
                  <p>维修</p>
                  <span :class="{'equipment_active_status':device.workStatus==='1'}"></span>
                </div>
              </Col>
            </Row>
          </template>
        </template>
        <!--没有子设备-->
        <template v-else>
          <Row class="equipment_child">
            <Col span="24">
              {{equipment.name}}
            </Col>
            <Col span="24" class="equipment_status">
              <div>
                <p>正常</p>
                <span :class="{'equipment_active_status':equipment.isInterrupt=='0'}"></span>
                <p>中断</p>
                <span :class="{'equipment_active_status':equipment.isInterrupt=='1'}"></span>
                <p>维修</p>
                <span :class="{'equipment_active_status':equipment.workStatus==='1'}"></span>
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
        equipments:[
          {devNo: '3001', name: '冗余变频器', childList: [
              /*isInterrupt是否中断，workStatus工作状态，isUseStandby是否启用主备，masterOrSlave是否备用，isAlarm是否警告*/
              {devNo: '3201', name: '切换单元', isInterrupt:0, workStatus: 0, isAlarm: false, isUseStandby: false, masterOrSlave: '0'},
              {devNo: '3101', name: 'A变频器', isInterrupt:0, workStatus: 0, isAlarm: false, isUseStandby: false, masterOrSlave: '0'}, //0是主用
              {devNo: '3102', name: 'B变频器', isInterrupt:0, workStatus: 0, isAlarm: false, isUseStandby: false, masterOrSlave: '1'}, //1是主用
            ],},
          {devNo: '4001', name: '调制解调器1', childList: [
              {devNo: '4101', name: 'A调制解调器1', isInterrupt:0, workStatus: 0, isAlarm: false, isUseStandby: false, masterOrSlave: '0'},
              {devNo: '4102', name: 'B调制解调器1', isInterrupt:0, workStatus: 0, isAlarm: false, isUseStandby: false, masterOrSlave: '1'},
            ]},
          {devNo: '1001', name: '天线控制单元', childList: [], isInterrupt:0, workStatus: 0, isAlarm: false, isUseStandby: false, masterOrSlave: '0'},
          {devNo: '2001', name: '功放', childList: [
              {devNo: '2101', name: 'A功放', isInterrupt:0, workStatus: 0, isAlarm: false, isUseStandby: false, masterOrSlave: '0'},
              {devNo: '2102', name: 'B功放', isInterrupt:0, workStatus: 0, isAlarm: false, isUseStandby: false, masterOrSlave: '1'},
            ]},
          {devNo: '4002', name: '调制解调器2', childList: [
              {devNo: '4103', name: 'A调制解调器2', isInterrupt:0, workStatus: 0, isAlarm: false, isUseStandby: false, masterOrSlave: '0'},
              {devNo: '4104', name: 'B调制解调器2', isInterrupt:0, workStatus: 0, isAlarm: false, isUseStandby: false, masterOrSlave: '1'},
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
      border: 1px solid red;
      height: 160px;
      width: 24%;
      margin-bottom: 20px;
      margin-right: 20px;
      &:nth-of-type(4n + 0) {
        margin-right: 0;
      }
      .equipment_parent {
        border-bottom: 1px solid #24262e;
        height: 39px;
        line-height: 39px;
        padding: 0 15px;
      }
      .equipment_child {
        height: 39px;
        line-height: 39px;
        padding: 0 20px;
        border-bottom: 1px solid #24262e;
        &.equipment_master_status {
          background: rgba(255, 142, 77, 0.32);
        }
        .equipment_name {
          height: 39px;
          /*border: 1px solid red;*/
        }
        .equipment_status {
          height: 40px;
          /*border: 1px solid blue;*/
          line-height: 40px;
          div {
            display: flex;
            flex-direction: row;
            justify-content: center;
            align-items: center;
            p{
              margin-right: 6px;
              color: #fff;
            }

            span{
              display: inline-block;
              background: red;
              height: 20px;
              width: 20px;
              border-radius: 50%;
              margin-right: 15px;
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
