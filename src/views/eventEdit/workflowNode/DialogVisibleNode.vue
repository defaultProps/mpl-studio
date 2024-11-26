<script setup lang="ts">
  import { ref } from 'vue'
  import { Handle, Position } from '@vue-flow/core'
  import ToolBtnGroup from '../ToolBtnGroup.vue'

  const dialogNodes = [
    { label: '弹窗1', value: 'rg5ht6' },
    { label: '弹窗2', value: 'sd2gr6' },
    { label: '弹窗3', value: 'bf3ht5' },
    { label: '弹窗4', value: 'mj7ku8' }
  ]

  const selectNode = ref<string>('rg5ht6')
</script>

<template>
  <div class="dialog-visible-node mpl-event-flow-node" :class="{ 'is-error': !selectNode }">
    <Handle type="target" :position="Position.Left" />
    <ToolBtnGroup copy splice />
    <div class="line-box">
      <div class="label">
        交互：
      </div>
      <div class="content">
        开启/关闭弹窗
      </div>
    </div>
    <div class="line-box">
      <div class="label">
        选择弹窗：
      </div>
      <div class="content">
        <select v-model="selectNode" class="mpl-select" placeholder="请选择">
          <option v-for="rule in dialogNodes" :label="rule.label" :value="rule.value" :title="rule.value" />
        </select>
      </div>
    </div>
    <Handle type="source" :position="Position.Right" />
  </div>
</template>

<style lang="less" scoped>
  .dialog-visible-node {
    width: 300px;
  }
</style>
