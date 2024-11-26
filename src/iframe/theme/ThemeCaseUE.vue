<script lang="ts" setup>
import ElButton from './componentCase/ElButton.vue'
import ElLink from './componentCase/ElLink.vue'
import ElTable from './componentCase/ElTable.vue'
import ElInput from './componentCase/ElInput.vue'
</script>

<template>
  <div class="mpl-theme--container">
    <ElButton />
    <ElInput />
    <ElTable />
    <ElLink />
  </div>
</template>

<style lang="less" scoped>
  .mpl-theme--container {
    box-sizing: border-box;
    width: 100%;
    height: 100%;
  }
</style>
