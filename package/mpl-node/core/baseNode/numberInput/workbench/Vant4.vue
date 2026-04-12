<script lang="ts" setup>
import { ref, watch } from 'vue'
import { NumberInputFormProp } from '../define'

const props = defineProps<{ node: NumberInputFormProp }>()
const inputValue = ref<string | number>(props.node.input.model || '')

watch(
  () => props.node.input.model,
  (value: string) => {
    inputValue.value = value
  }
)
</script>

<template>
  <van-field v-model="inputValue" type="number" :placeholder="props.node.input.placeholder" label-align="top" clearable
    class="mpl-no-pointer">
    <template #label>
      {{ props.node.label.text }}
    </template>
  </van-field>
</template>
