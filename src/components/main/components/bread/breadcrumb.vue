<template>
  <div class="pageBread">
    <Breadcrumb separator=">">
      <template v-for="info in breads">
        <BreadcrumbItem :to="info.url">{{info.breadName}}</BreadcrumbItem>
      </template>
    </Breadcrumb>
  </div>
</template>
<script>
export default {
  props: {
    breads: {
      type: Array,
      default: []
    }
  },
  data () {
    return {

    }
  }
}
</script>
<style>
</style>
