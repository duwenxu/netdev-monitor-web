<template>
  <div class="bottom_wrapper">
    <div style="clear:both"></div>
    <div class="special-modal">
      <div class="table-title">
            <span v-for="info in columns" class="self-title" :style="{width:info.width +'%'}">
              {{info.title}}
            </span>
      </div>
      <div class="scroll-container table-container">
        <table class="mytable">
          <tr v-for="(info, index) in list" :key="index" :id="index" :style="{color:info.alertDesc.indexOf('故障')>-1?'red':''}">
            <td style="width: 15%" align="center">{{info.alertLevelName}}</td>
            <td style="width: 15%" align="center">{{info.alertNum}}</td>
            <td style="width: 20%" align="center">{{info.alertTime}}</td>
            <td style="width: 50%" class="width_len"  align="center">{{info.alertDesc}}</td>
          </tr>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "customTable",
  props:{
    columns:{
      type:Array,
      default:[]
    },
    list:{
      type:Array,
      default:[]
    },
  },
  mounted() {

  }
}
</script>


<style scoped>
.width_len{
  max-width: 250px;
}
.bottom_wrapper {
  height: 160px;
  width: 100%;
}
.bottom_wrapper th {
  border: 1px solid #e6e6e6;
  line-height: 4vh;
  color: #666666;
  font-size: 16px;
}
.bottom_wrapper table {
  border-collapse: collapse;
  height: 160px;
  width: 100%;
}
.mytable td {
  padding: 5px;
  border: 1px solid #e6e6e6;
  font-size: 14px;
  white-space: break-spaces;
  overflow: hidden;
  text-overflow: ellipsis;
}
.table-head {
  padding-right: 4px;
  color: #000;
  height: 4vh;
}

.table-body {
  width: 100%;
  height: 240px;
  overflow-y: scroll;
}

.table-head table, .table-body table {
  width: 100%;
}

</style>
