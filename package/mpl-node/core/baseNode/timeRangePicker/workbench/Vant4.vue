<script lang="ts" setup>
import { inject, ref, watch } from 'vue'
import { VISIBLE_NOTE } from '../../../../libs'
import { TimeRangePickerFormProp } from '../define'

const props = defineProps<{ node: TimeRangePickerFormProp }>()
const defaultValue = ref<null | string[]>(props.node.timeRangePicker.model || null)

watch(
  () => props.node.timeRangePicker.model,
  (value: any) => {
    defaultValue.value = value
  },
)

function formatSelect() {
  return ''
}

const visibleNote = inject(VISIBLE_NOTE, ref(false))
</script>

<template>
  <van-field v-model="defaultValue" type="number" label-align="top" clearable class="mpl-no-pointer">
    <template #label>
      {{ props.node.label.text }}
      <mpl-note v-if="visibleNote"></mpl-note>
    </template>
    <template #input>
      <span v-if="!defaultValue" class="placeholder-span">{{ props.node.timeRangePicker.placeholder }}</span>
      <span class="value-line" v-else>{{ formatSelect }}</span>
      <span class="delete-btn">
        <van-icon name="arrow" />
      </span>
    </template>
  </van-field>
</template>