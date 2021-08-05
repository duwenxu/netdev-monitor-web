<template>
  <div class="bottom_wrapper">
    <div style="clear:both"></div>
    <div class="special-modal">
      <div class="table-title">
            <span v-for="info in columns" class="self-title" :style="{width:info.width +'%'}">
              {{info.title}}
            </span>
      </div>
      <div class="scroll-container table-container" v-if="list.length">
        <table class="mytable">
          <tr v-for="(info, index) in list" :key="index" :id="index">
            <td style="width: 20%" align="center">{{info.logTime}}</td>
            <td style="width: 10%" align="center">{{info.logAccessTypeName}}</td>
            <td style="width: 10%" align="center">{{info.logOperTypeName}}</td>
            <td style="width: 10%" align="center">{{info.logCmdMark}}</td>
            <td style="width: 15%"  align="center">
              <Tooltip max-width="1000" :content="info.logOperObjName">
                <div class="width_len" style=" max-width: 90px;">{{info.logOperObjName}}</div>
              </Tooltip>
            </td>
            <td style="width: 22%;"  align="center">
              <Tooltip max-width="1000" :content="info.logOperContent">
                <div class="width_len" style=" max-width: 120px;">{{info.logOperContent}}</div>
              </Tooltip>
            </td>

            <td style="width: 13%"   align="center">
              <Tooltip max-width="200" :content="info.orignData">
                <div class="width_len" style=" max-width: 80px;">{{info.orignData}}</div>
              </Tooltip>
            </td>
          </tr>
        </table>
      </div>
        <div v-else style="width: 100%;padding: 20px;text-align: center">暂无数据</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "customTable",
  props:{
    columns:{
      type:Array,
      default: () => []
    },
    list:{
      type:Array,
      default: () => []
    },
  }
}
</script>
<style scoped>
.width_len{
  margin-top: 10px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.bottom_wrapper {
  height: 120px;
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
  height: 120px;
  width: 100%;
}
.mytable td {
  padding: 5px;
  border: 1px solid #e6e6e6;
  font-size: 14px;
}
</style>
