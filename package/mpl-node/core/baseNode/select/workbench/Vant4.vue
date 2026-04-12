<script lang="ts" setup>
import { ref, watch } from 'vue'
import { SelectFormProp } from '../define'

const props = defineProps<{ node: SelectFormProp }>()
const defaultValue = ref<string | number>(props.node.select.model || '')

watch(
  () => props.node.select.model,
  (value: string) => {
    defaultValue.value = value
  }
)

function formatSelect() {
  return ''
}

function clickNode() {
  showPicker.value = true
}

function cancelPopup() {
  showPicker.value = false
}

const showPicker = ref(false)
const pickerValue = ref<string[]>([])

// 静态演示数据 或者绑定动态数据
// 一键查看所有组件是否绑定动态接口。
const columns = [
  { text: '杭州', value: '杭州' },
  { text: '宁波', value: '宁波' },
  { text: '温州', value: '温州' },
  { text: '绍兴', value: '绍兴' },
  { text: '湖州', value: '湖州' }
]
</script>

<template>
  <van-field v-model="defaultValue" type="number" label-align="top" clearable class="mpl-no-pointer" @click="clickNode">
    <template #label>
      {{ props.node.label.text }}
    </template>
    <template #input>
      <span v-if="!defaultValue" class="placeholder-span">{{ props.node.select.placeholder }}</span>
      <span v-else class="value-line">{{ formatSelect }}</span>
      <span class="delete-btn">
        <van-icon name="arrow" />
      </span>
    </template>
  </van-field>
  <van-popup v-model:show="showPicker" destroy-on-close position="bottom" teleport="body">
    <van-picker :model-value="pickerValue" :columns="columns" @cancel="cancelPopup" @confirm="cancelPopup" />
  </van-popup>
</template>
