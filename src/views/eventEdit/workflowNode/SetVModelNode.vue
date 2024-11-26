<script setup lang="ts">
  import { ref } from 'vue'
  import { Handle, Position } from '@vue-flow/core'
  import ToolBtnGroup from '../ToolBtnGroup.vue'

  const nodes = [
    { label: '基础输入', value: 'rg5ht6' },
    { label: '下拉菜单', value: 'sd2gr6' },
    { label: '级联选择', value: 'bf3ht5' },
    { label: '多行输入', value: 'mj7ku8' }
  ]

  const selectNode = ref<string>('rg5ht6')
</script>

<template>
  <div class="set-model-node mpl-event-flow-node" :class="{ 'is-error': !selectNode }">
    <ToolBtnGroup copy splice />
    <Handle type="target" :position="Position.Left" />
    <div class="line-box">
      <div class="label">
        交互：
      </div>
      <div class="content">
        设置表单值
      </div>
    </div>
    <div class="line-box">
      <div class="label">
        选择组件：
      </div>
      <div class="content">
        <el-select v-model="selectNode" placeholder="请选择" size="small">
          <el-option v-for="item in nodes" :key="item.value" :label="item.label" :value="item.value" />
        </el-select>
      </div>
    </div>
    <Handle type="source" :position="Position.Right" />
  </div>
</template>

<style lang="less" scoped>
  .set-model-node {
    width: 300px;
  }
</style>
