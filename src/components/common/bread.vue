<template>
  <div style="margin-bottom: 16px;" >
    <Breadcrumb separator=">">
      <template v-for="info in breads">
        <BreadcrumbItem :to="info.url">
          <Icon :type="info.icon"></Icon>{{info.name}}</BreadcrumbItem>
      </template>
    </Breadcrumb>
  </div>
</template>
<script>
    export default {
        props:{
            breads:{
                type:Array,
                default:[]
            }
        },
        data() {
            return {

            }
        }
    }
</script>
