<script lang="ts" setup>
import { inject, ref, watch } from 'vue'
import { VISIBLE_NOTE } from '../../../../libs'
import { DateRangePickerFormProp } from '../define'

const props = defineProps<{ node: DateRangePickerFormProp }>()
const defaultValue = ref<string[] | null>(props.node.dateRangePicker.model || null)

watch(
  () => props.node.dateRangePicker.model,
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
      <span class="value-line">{{ formatSelect }}</span>
      <span class="delete-btn">
        <van-icon name="arrow" />
      </span>
    </template>
  </van-field>
</template>