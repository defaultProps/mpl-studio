<script setup lang="ts">
import { Handle, Position } from '@vue-flow/core'
import ToolBtnGroup from '../ToolBtnGroup.vue'
import { inject, ref } from 'vue'

const removeFlowNode = inject('removeFlowNode') as any
const props = defineProps<{ value: any }>()
const isCollapse = ref(true)

function collapseFlowNode(collapse: boolean) {
  isCollapse.value = collapse
}
</script>

<template>
  <div class="mpl-event-flow-node set-model-node" :class="{ 'is-error': false, 'is-collapse': isCollapse }">
    <ToolBtnGroup copy @delete="removeFlowNode(props.value.id)" @collapse="collapseFlowNode" />
    <Handle type="target" :position="Position.Top" />
    <div class="line-box">
      <div class="label">
        描述：
      </div>
      <div class="content">
        系统默认服务
      </div>
    </div>
    <Handle type="source" :position="Position.Bottom" />
  </div>
</template>

<style lang="less" scoped>
  .set-model-node {
    width: 300px;
  }
</style>
