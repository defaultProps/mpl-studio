<script setup lang="ts">
import { ref, inject } from 'vue'
import { Handle, Position } from '@vue-flow/core'
import ToolBtnGroup from '../ToolBtnGroup.vue'

const nodes = [
  { label: '表单容器1', value: 'a' },
  { label: '表单容器2', value: 'sd2gr6' },
  { label: '表单容器3', value: 'bf3ht5' },
  { label: '表单容器4', value: 'mj7ku8' }
]

const selectNode = ref<string>('a')
const removeFlowNode = inject('removeFlowNode') as any
const props = defineProps<{ value: any }>()
const isCollapse = ref(true)

function collapseFlowNode(collapse: boolean) {
  isCollapse.value = collapse
}
</script>

<template>
  <div class="set-model-node mpl-event-flow-node" :class="{ 'is-error': !selectNode, 'is-collapse': isCollapse }">
    <ToolBtnGroup copy @delete="removeFlowNode(props.value.id)" @collapse="collapseFlowNode" />
    <Handle type="target" :position="Position.Top" />
    <div class="line-box">
      <div class="label">
        描述：
      </div>
      <div class="content">
        校验表单内部控件
      </div>
    </div>
    <div class="line-box">
      <div class="label">
        表单容器：
      </div>
      <select v-model="selectNode" class="mpl-select full-w">
        <option v-for="item in nodes" :key="item.value" :label="item.label" :value="item.value" />
      </select>
    </div>
    <Handle type="source" :position="Position.Bottom" />
  </div>
</template>

<style lang="less" scoped>
.set-model-node {
  width: 300px;
}
</style>
