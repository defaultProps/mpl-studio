<script setup lang="ts">
import { ref, inject } from 'vue'
import { Handle, Position } from '@vue-flow/core'
import ToolBtnGroup from '../ToolBtnGroup.vue'
import FlowItem from './FlowItem.vue'

const dialogNodes = [
  { label: '弹窗1', value: 'a' },
  { label: '弹窗2', value: 'sd2gr6' },
  { label: '弹窗3', value: 'bf3ht5' },
  { label: '弹窗4', value: 'mj7ku8' }
]
const dialogModelOption = [
  { label: '开启', value: 'open' },
  { label: '关闭', value: 'close' },
  { label: '相反展示', value: 'trigger' },
  { label: '自定义参数', value: 'c' }
]

const visibleDialogType = ref<string>('open')
const selectNode = ref<string>('a')
const visibleDialogValue = ref<string>('open')
const removeFlowNode = inject('removeFlowNode') as any
const props = defineProps<{ value: any }>()
const isCollapse = ref(true)

function isError() {
  if (!selectNode.value || visibleDialogValue.value === '') {
    return true
  }
  if (visibleDialogType.value === 'c' && visibleDialogValue.value === '') {
    return true
  }
  return false
}

function changeDialogType() {
  if (visibleDialogType.value === 'c') {
    visibleDialogValue.value = ''
  } else {
    visibleDialogValue.value = visibleDialogType.value
  }
}

function collapseFlowNode(collapse: boolean) {
  isCollapse.value = collapse
}
</script>

<template>
  <div class="mpl-event-flow-node" style="width: 300px;" :class="{ 'is-error': isError(), 'is-collapse': isCollapse }">
    <Handle type="target" :position="Position.Top" />
    <Handle type="source" :position="Position.Bottom" />
    <FlowItem label="交互" is-label>
      开启/关闭弹窗
      <ToolBtnGroup copy @delete="removeFlowNode(props.value.id)" @collapse="collapseFlowNode" />
    </FlowItem>
    <template v-if="isCollapse">
      <FlowItem label="选择弹窗">
        <select v-model="selectNode" class="mpl-select w-full">
          <option v-for="rule in dialogNodes" :label="rule.label" :value="rule.value" :title="rule.value" />
        </select>
      </FlowItem>
      <FlowItem label="弹窗状态">
        <div class="flex-center">
          <select v-model="visibleDialogType" class="mpl-select w-full flex-1" style="min-width: 85px;"
            @change="changeDialogType">
            <option v-for="rule in dialogModelOption" :label="rule.label" :value="rule.value" :title="rule.value" />
          </select>
          <template v-if="visibleDialogType === 'c'">
            <input class="mpl-input ml-5" readonly :value="visibleDialogValue">
            <button type="button" class="mpl-btn ml-5 icon icon-select5" />
          </template>
        </div>
      </FlowItem>
    </template>
  </div>
</template>
