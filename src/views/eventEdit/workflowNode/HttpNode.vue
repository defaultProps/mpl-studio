<script setup lang="ts">
  import { ref } from 'vue'
  import { Handle, Position } from '@vue-flow/core'
  import ToolBtnGroup from '../ToolBtnGroup.vue'

  const nodes = [
    { label: '基础输入', value: 'rg5ht6' }
  ]
  const selectNode = ref<string>('rg5ht6')
</script>

<template>
  <div class="set-model-node mpl-event-flow-node" :class="{ 'is-error': !selectNode }">
    <ToolBtnGroup copy splice />
    <Handle type="target" :position="Position.Left" />
    <div class="line-box">
      <div class="label">
        描述：
      </div>
      <div class="content">
        接口服务
      </div>
    </div>
    <div class="line-box">
      <div class="label">
        接口选择
      </div>
      <div class="content">
        <select v-model="selectNode" placeholder="请选择">
          <option v-for="item in nodes" :key="item.value" :label="item.label" :value="item.value" />
        </select>
      </div>
    </div>
    <Handle type="source" :position="Position.Right" />
  </div>
</template>

<style lang="less" scoped>
  .set-model-node {
    width: 200px;
  }
</style>
