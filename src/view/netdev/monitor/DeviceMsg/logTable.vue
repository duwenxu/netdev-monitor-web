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
          <tr v-for="(info, index) in list" :key="index" :id="index">
            <td style="width: 20%" align="center">{{info.logTime}}</td>
            <td style="width: 10%" align="center">{{info.logAccessTypeName}}</td>
            <td style="width: 10%" align="center">{{info.logOperTypeName}}</td>
            <td style="width: 10%" align="center">{{info.logCmdMark}}</td>
            <td style="width: 15%"  align="center">
              <Tooltip max-width="1000" :content="info.logOperObjName">
                <div class="width_len">{{info.logOperObjName}}</div>
              </Tooltip>
<!--              {{info.logOperObjName}}-->
            </td>
            <td style="width: 22%;"  align="center">
              <Tooltip max-width="1000" :content="info.logOperContent">
                <div class="width_len">{{info.logOperContent}}</div>
              </Tooltip>
            </td>

            <td style="width: 13%"   align="center">
              <Tooltip max-width="200" :content="info.orignData">
                <div class="width_len">{{info.orignData}}</div>
              </Tooltip>
            </td>
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

  margin-top: 10px;
  max-width: 120px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.bottom_wrapper {
  height: 200px;
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
  height: 400px;
  width: 100%;
}

.mytable td {
  padding: 5px;
  border: 1px solid #e6e6e6;
  font-size: 14px;


}

.table-head {
  padding-right: 4px;
  color: #000;
  height: 5vh;
}

.table-body {
  width: 100%;
  height: 240px;
  overflow-y: scroll;
}

.table-head table, .table-body table {
  width: 100%;
}

.table-body::-webkit-scrollbar {
  width: 4px;
  height: 8px;
}

.table-body::-webkit-scrollbar-track {
  background: #1D1F2E;
}

.table-body::-webkit-scrollbar-thumb {
  background: #415dbe;
  border-radius: 4px;
}

.table-body::-webkit-scrollbar-corner {
  background: #415dbe;
}


</style>
