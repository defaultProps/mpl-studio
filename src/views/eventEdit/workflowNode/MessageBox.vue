<script setup lang="ts">
import { ref, inject } from 'vue'
import { Handle, Position } from '@vue-flow/core'
import ToolBtnGroup from '../ToolBtnGroup.vue'

const nodes = [
  { label: '默认提示', value: 'default' },
  { label: '成功提示', value: 'success' },
  { label: '警告提示', value: 'warn' },
  { label: '错误提示', value: 'error' }
]

const flowNodeObj = ref({
  type: 'default',
  val: ''
})
const removeFlowNode = inject('removeFlowNode') as any
const props = defineProps<{ value: any }>()
const isCollapse = ref(true)

function collapseFlowNode(collapse: boolean) {
  isCollapse.value = collapse
} 
</script>

<template>
  <div class="mpl-event-flow-node" :class="{ 'is-error': !flowNodeObj.val, 'is-collapse': isCollapse }">
    <Handle type="target" :position="Position.Top" />
    <ToolBtnGroup copy @delete="removeFlowNode(props.value.id)" @collapse="collapseFlowNode" />
    <div class="line-box">
      <div class="label">
        描述：
      </div>
      <div class="content">
        弹窗提示信息
      </div>
    </div>
    <div class="line-box">
      <div class="label">
        选择类型：
      </div>
      <select v-model="flowNodeObj.type" class="mpl-select full-w">
        <option v-for="item in nodes" :key="item.value" :label="item.label" :value="item.value" />
      </select>
      <input v-model="flowNodeObj.val" type="text" class="mpl-input full-w ml-5">
      <button type="button" class="mpl-btn ml-5 icon icon-select5" />
    </div>
    <Handle type="source" :position="Position.Bottom" />
  </div>
</template>