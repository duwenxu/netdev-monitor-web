<template>
  <div>

  <Modal :closable="false" :styles="{marginTop:'-90px'}" v-model="paramModal" @on-ok="confirm" @on-cancel="confirm"
         width="1400" :mask-closable="false">
    <div slot="header"><span>参数信息</span>
      <Button style="float: right" size="small" @click="confirm">关闭</Button>
    </div>
    <DeviceMain></DeviceMain>
  </Modal>

  </div>
</template>

<script>
export default {
name: "test",
  data(){
  return{
    shineData: [],
    devNo: null,
    // dom: null,
    show: false,
    paramModal: false,
    equipments: [
      {
        devNo: '121',
        name: 'C中频切换矩阵',
        isInterrupt: '0',
        workStatus: '0',
        isAlarm: '0',
        isUseStandby: false,
        masterOrSlave: '0',
        pos:{
          top: '80px',
          marginLeft: '570px',
          width: '16px',
          height: '16px',
        }
      },
      {
        devNo: '135',
        name: '无线宽带中心站',
        isInterrupt: '0',
        workStatus: '0',
        isAlarm: '0',
        isUseStandby: false,
        masterOrSlave: '1',
        pos:{
          top: '441px',
          marginLeft: '620px',
          width: '16px',
          height: '16px',
        }
      },
      {
        devNo: '137',
        name: '时间统一设备',
        isInterrupt: '0',
        workStatus: '0',
        isAlarm: '0',
        isUseStandby: false,
        masterOrSlave: '0',
        pos:{
          top: '341px',
          marginLeft: '1545px',
          width: '16px',
          height: '16px',
        }
      },
      {
        devNo: '151',
        name: 'SDH',
        isInterrupt: '0',
        workStatus: '0',
        isAlarm: '0',
        isUseStandby: false,
        masterOrSlave: '1',
        pos:{
          top: '340px',
          marginLeft: '847px',
          width: '16px',
          height: '16px',
        }
      },
      {
        devNo: '154',
        name: '路由器',
        isInterrupt: '0',
        workStatus: '0',
        isAlarm: '0',
        isUseStandby: false,
        masterOrSlave: '0',
        pos:{
          top: '250px',
          marginLeft: '1128px',
          width: '16px',
          height: '16px',
        }
      },
      {
        devNo: '19',
        name: '频谱监测',
        isInterrupt: '0',
        workStatus: '0',
        isAlarm: '0',
        isUseStandby: false,
        masterOrSlave: '0',
        pos:{
          top: '283px',
          marginLeft: '605px',
          width: '16px',
          height: '16px',
        }
      },
      {
        devNo: '253',
        name: '48口交换机（前）',
        isInterrupt: '0',
        workStatus: '0',
        isAlarm: '0',
        isUseStandby: false,
        masterOrSlave: '1',
        pos:{
          top: '175px',
          marginLeft: '1010px',
          width: '16px',
          height: '16px',
        }
      },
      {
        devNo: '252',
        name: '24口交换机',
        isInterrupt: '0',
        workStatus: '0',
        isAlarm: '0',
        isUseStandby: false,
        masterOrSlave: '0',
        pos:{
          top: '376px',
          marginLeft: '1333px',
          width: '16px',
          height: '16px',
        }
      },
      {
        devNo: '34',
        name: '被复线',
        isInterrupt: '0',
        workStatus: '0',
        isAlarm: '0',
        isUseStandby: false,
        masterOrSlave: '1',
        pos:{
          top: '391px',
          marginLeft: '847px',
          width: '16px',
          height: '16px',
        }
      },

      {
        devNo: '51',
        name: 'FDMACDMA1',
        isInterrupt: '0',
        workStatus: '0',
        isAlarm: '0',
        isUseStandby: false,
        masterOrSlave: '1',
        pos:{
          top: '136px',
          marginLeft: '864px',
          width: '16px',
          height: '16px',
        }
      },
      {
        devNo: '52',
        name: 'FDMACDMA2',
        isInterrupt: '0',
        workStatus: '0',
        isAlarm: '0',
        isUseStandby: false,
        masterOrSlave: '1',
        pos:{
          top: '176px',
          marginLeft: '864px',
          width: '16px',
          height: '16px',
        }
      },
      {
        devNo: '53',
        name: 'FDMACDMA3',
        isInterrupt: '0',
        workStatus: '0',
        isAlarm: '0',
        isUseStandby: false,
        masterOrSlave: '1',
        pos:{
          top: '215px',
          marginLeft: '864px',
          width: '16px',
          height: '16px',
        }
      },
      {
        devNo: '54',
        name: 'FDMACDMA4',
        isInterrupt: '0',
        workStatus: '0',
        isAlarm: '0',
        isUseStandby: false,
        masterOrSlave: '1',
        pos:{
          top: '255px',
          marginLeft: '864px',
          width: '16px',
          height: '16px',
        }
      },
      {
        devNo: '65',
        name: '通信控制器',
        isInterrupt: '0',
        workStatus: '0',
        isAlarm: '0',
        isUseStandby: false,
        masterOrSlave: '1',
        pos:{
          top: '570px',
          marginLeft: '1010px',
          width: '16px',
          height: '16px',
        }
      },
    ],
    masterPosition: {
      '11': {
        mark: 'A调制解调器1',
        border: '5px solid green',
        width: '152px',
        height: '32px',
        top: '120px',
        left: '785px',
      },
      '12': {
        mark: 'A调制解调器2',
        border: '5px solid green',
        width: '152px',
        height: '32px',
        top: '208px',
        left: '785px',
      },
      '13': {
        mark: 'B调制解调器1',
        border: '5px solid green',
        width: '152px',
        height: '32px',
        top: '328px',
        left: '785px',
      },
      '14': {
        mark: 'B调制解调器2',
        border: '5px solid green',
        width: '152px',
        height: '32px',
        top: '416px',
        left: '785px',
      },
      '16': {
        mark: '400W高功放',
        border: '',
        width: '125px',
        height: '62px',
        top: '700px',
        left: '100px',
      },
      // '32': {
      //   mark: '天线控制单元',
      //   border: '5px solid green',
      //   width: '132px',
      //   height: '32px',
      //   top: '554px',
      //   left: '136px',
      // },
      '36': {
        mark: '上变频器1',
        border: '5px solid green',
        width: '110px',
        height: '42px',
        top: '127px',
        left: '463px',
      },
      '37': {
        mark: '上变频器2',
        border: '5px solid green',
        width: '110px',
        height: '42px',
        top: '208px',
        left: '463px',
      },
      '24': {
        mark: '下变频器1',
        border: '5px solid green',
        width: '110px',
        height: '42px',
        top: '360px',
        left: '458px',
      },
      '40': {
        mark: '下变频器2',
        border: '5px solid green',
        width: '110px',
        height: '42px',
        top: '437px',
        left: '458px',
      },
    },
    legendType: [
      {shape: 'square', color: 'rgba(0,0,0,0)', borderColor: '#009688', description: '运行'},
      {shape: 'square', color: 'rgba(0,150,136,0.2)', description: '主机'},
      {shape: 'square', color: '#ccc', description: '备机'},
      {shape: 'circle', color: '#009688', description: '正常'},
      {shape: 'circle', color: '#ff1400', description: '故障'},
      {shape: 'circle', color: '#ffbe08', description: '告警'}
    ],
    number: '0',
    screenWidth: document.documentElement.clientWidth,
  }
  }
}
</script>

<style scoped>

</style>
