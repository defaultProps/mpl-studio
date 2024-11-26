<script setup lang="ts">
  import { ref } from 'vue'
  import ToolBtnGroup from '../ToolBtnGroup.vue'

  const selectNode = ref<string>('rg5ht6')
</script>

<template>
  <div class="set-model-node mpl-event-flow-node" :class="{ 'is-error': !selectNode }">
    <ToolBtnGroup copy splice />
    <div class="line-box">
      <div class="label">
        选择服务：
      </div>
      <div class="content">
        接口参数
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped>
  .set-model-node {
    width: 300px;
  }
</style>
