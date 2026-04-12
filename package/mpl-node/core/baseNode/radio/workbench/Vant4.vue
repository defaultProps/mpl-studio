<script lang="ts" setup>
import { ref, watch } from 'vue'
import { RadioBoxFormProp } from '../define'

const props = defineProps<{ node: RadioBoxFormProp }>()
const defaultValue = ref<string | number>(props.node.radio.model || '')

watch(
  () => props.node.radio.model,
  (value: string) => {
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
      <span v-if="!defaultValue" class="placeholder-span">{{ props.node.radio.placeholder }}</span>
      <span v-else class="value-line">{{ formatSelect }}</span>
      <span class="delete-btn">
        <van-icon name="arrow" />
      </span>
    </template>
  </van-field>
</template>
