<script lang="ts" setup>
import { ref, watch } from 'vue'
import { CheckboxFormProp } from '../define'

const props = defineProps<{ node: CheckboxFormProp }>()
const defaultValue = ref<string[]>(props.node.checkbox.model)

watch(
  () => props.node.checkbox.model,
  (value: string[]) => {
    defaultValue.value = value
  }
)

function formatSelect() {
  return ''
}
</script>

<template>
  <van-field :value="defaultValue.length" type="number" label-align="top" clearable class="mpl-no-pointer">
    <template #label>
      {{ props.node.label.text }}
    </template>
    <template #input>
      <span v-if="!defaultValue.length" class="placeholder-span">{{ props.node.checkbox.placeholder }}</span>
      <span v-else class="value-line">{{ formatSelect }}</span>
      <span class="delete-btn">
        <van-icon name="arrow" />
      </span>
    </template>
  </van-field>
</template>
