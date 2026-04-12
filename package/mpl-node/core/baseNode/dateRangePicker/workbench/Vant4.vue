<script lang="ts" setup>
import { ref, watch } from 'vue'
import { DateRangePickerFormProp } from '../define'

const props = defineProps<{ node: DateRangePickerFormProp }>()
const defaultValue = ref<string[] | null>(props.node.dateRangePicker.model)

watch(
  () => props.node.dateRangePicker.model,
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
      <span v-if="!defaultValue" class="placeholder-span">请选择</span>
      <span v-else class="value-line">{{ formatSelect }}</span>
      <span class="delete-btn">
        <van-icon name="arrow" />
      </span>
    </template>
  </van-field>
</template>
