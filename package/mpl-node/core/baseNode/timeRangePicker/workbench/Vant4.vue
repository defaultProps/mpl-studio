<script lang="ts" setup>
import { ref, watch } from 'vue'
import { TimeRangePickerFormProp } from '../define'

const props = defineProps<{ node: TimeRangePickerFormProp }>()
const defaultValue = ref<null | string[]>(props.node.timeRangePicker.model || null)

watch(
  () => props.node.timeRangePicker.model,
  (value: string[] | null) => {
    defaultValue.value = value
  }
)

function formatSelect() {
  return ''
}
</script>

<template>
  <van-field v-model="defaultValue" type="number" label-align="top" clearable class="mpl-no-pointer">
    <template #label>
      {{ props.node.label.text }}
    </template>
    <template #input>
      <span v-if="!defaultValue" class="placeholder-span">{{ props.node.timeRangePicker.placeholder }}</span>
      <span v-else class="value-line">{{ formatSelect }}</span>
      <span class="delete-btn">
        <van-icon name="arrow" />
      </span>
    </template>
  </van-field>
</template>
