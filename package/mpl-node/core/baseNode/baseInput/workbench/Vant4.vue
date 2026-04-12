<script lang="ts" setup>
import { ref, watch } from 'vue'
import { SingleInputFormProp } from '../define'

const props = defineProps<{ node: SingleInputFormProp }>()
const inputValue = ref<string>(props.node.input.model || '')

watch(
  () => props.node.input.model,
  (value: string) => {
    inputValue.value = value
  }
)
</script>

<template>
  <van-field v-model="inputValue" :placeholder="props.node.input.placeholder" label-align="top" clearable
    class="mpl-no-pointer">
    <template #label>
      {{ props.node.label.text }}
    </template>
  </van-field>
</template>
