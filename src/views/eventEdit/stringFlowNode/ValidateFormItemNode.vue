<script setup lang="ts">
import { ref } from 'vue'
import ToolBtnGroup from '../ToolBtnGroup.vue'
import { StringFlowNode } from './init'

const props = defineProps<{ value: StringFlowNode }>()
const modelValue = ref(props.value)
const visible = ref(false)

const dialogNodes = [
  { label: '弹窗1', value: 'a' },
  { label: '弹窗2', value: 'sd2gr6' },
  { label: '弹窗3', value: 'bf3ht5' },
  { label: '弹窗4', value: 'mj7ku8' }
]

const selectNode = ref<string>('a')
</script>

<template>
  <div class="mpl-event-flow-node">
    清除表单校验
  </div>
</template>
