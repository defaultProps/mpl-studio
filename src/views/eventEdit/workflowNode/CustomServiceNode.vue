<script setup lang="ts">
import { Handle, Position } from '@vue-flow/core'
import ToolBtnGroup from '../ToolBtnGroup.vue'
import { inject, ref } from 'vue'
import FlowItem from './FlowItem.vue'

const removeFlowNode = inject('removeFlowNode') as any
const props = defineProps<{ value: any }>()
const isCollapse = ref(true)

function collapseFlowNode(collapse: boolean) {
  isCollapse.value = collapse
}
</script>

<template>
  <div class="mpl-event-flow-node set-model-node" :class="{ 'is-error': false, 'is-collapse': isCollapse }">
    <Handle type="target" :position="Position.Top" />
    <Handle type="source" :position="Position.Bottom" />
    <FlowItem label="描述" is-label>
      自定义接口服务
      <ToolBtnGroup copy @delete="removeFlowNode(props.value.id)" @collapse="collapseFlowNode" />
    </FlowItem>
    <FlowItem label="配置">
      <button type="button" class="mpl-btn icon icon-select5" />
    </FlowItem>
  </div>
</template>

<style lang="less" scoped>
.set-model-node {
  width: 300px;
}
</style>
