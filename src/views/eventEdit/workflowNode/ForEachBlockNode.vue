<script setup lang="ts">
import { inject, ref } from 'vue'
import { Handle, Position } from '@vue-flow/core'
import ToolBtnGroup from '../ToolBtnGroup.vue'

const nodes = [{ label: '基础输入', value: 'a' }]
const selectNode = ref<string>('a')
const isCollapse = ref(true)

function collapseFlowNode(collapse: boolean) {
  isCollapse.value = collapse
}
</script>

<template>
  <div class="set-model-node mpl-event-flow-node" :class="{ 'is-error': !selectNode, 'is-collapse': isCollapse }">
    <ToolBtnGroup copy @collapse="collapseFlowNode" />
    <Handle type="target" :position="Position.Top" />
    <div class="line-box">
      <div class="label">
        循环对象：
      </div>
      <div class="content">
        <el-select size="small">
          <el-option />
        </el-select>
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
    <Handle type="source" :position="Position.Bottom" />
  </div>
</template>

<style lang="less" scoped>
.set-model-node {
  width: 200px;
}
</style>
