<template>
  <div class="param-wrap">
    <Row>
      <Col :xs="24" :md="24" v-for="info in infos">
        <div style="color: #009688;font-size: 16px;margin-bottom: 10px">{{ info.itfName }}</div>
        <div v-for="temp in info.subInterList">
          <div style="color: #009688;margin-bottom: 10px;margin-left: 30px">{{ temp.itfName }}</div>
          <Row>
            <common :infos="temp.subParaList"></common>
          </Row>
        </div>
      </Col>
    </Row>
  </div>
</template>

<script>
import common from './common'

export default {
  components: {common},
  data() {
    return {
      infos: [],
    }
  },
  created: function () {
    this.$xy.vector.$on('ctrlTag', this.getMsg)
  },
  beforeDestroy: function () {
    this.$xy.vector.$off('ctrlTag', this.getMsg)

  },
  mounted() {
  },
  methods: {
    getMsg(data) {
      let result = JSON.parse(data.data)
      this.infos = result
    }
  }
}
</script>

<style scoped>

</style>
