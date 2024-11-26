<script setup lang="ts">
import { ref } from 'vue'
import ToolBtnGroup from '../ToolBtnGroup.vue'
import { StringFlowNode } from './init'

const props = defineProps<{ value: StringFlowNode }>()
const modelValue = ref(props.value)
const visible = ref(false)

const dialogNodes = [
  { label: '弹窗1', value: 'rg5ht6' },
  { label: '弹窗2', value: 'sd2gr6' },
  { label: '弹窗3', value: 'bf3ht5' },
  { label: '弹窗4', value: 'mj7ku8' }
]

const selectNode = ref<string>('rg5ht6')
</script>

<template>
  <div class="mpl-event-flow-node">
    <div class="header-title" @click="visible = !visible">
      <button class="mpl-btn icon-drag icon flow-node-handle" @click.stop></button>
      <div class="title">{{ modelValue.label }}</div>
      <ToolBtnGroup copy :collapse="modelValue.type === 'if'" />
    </div>
    <template v-if="visible">
      <div class="line-box">
        选择弹窗：
        <select v-model="selectNode" class="mpl-select" placeholder="请选择">
          <option v-for="rule in dialogNodes" :label="rule.label" :value="rule.value" :title="rule.value" />
        </select>
      </div>
      <div class="line-box">
        选择弹窗：
        <select v-model="selectNode" class="mpl-select" style="width: 100%" placeholder="请选择">
          <option v-for="rule in dialogNodes" :label="rule.label" :value="rule.value" :title="rule.value" />
        </select>
      </div>
      <div class="line-box">
        选择弹窗：
        <select v-model="selectNode" class="mpl-select" style="width: 100%" placeholder="请选择">
          <option v-for="rule in dialogNodes" :label="rule.label" :value="rule.value" :title="rule.value" />
        </select>
      </div>
    </template>
  </div>
</template>