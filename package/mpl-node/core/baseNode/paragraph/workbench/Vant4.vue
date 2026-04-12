<script lang="ts" setup>
import { ref, watch } from 'vue'
import { Paragraph } from '../define'

const props = defineProps<{ node: Paragraph }>()
const defaultValue = ref<string>(props.node.model || '')

watch(
  () => props.node.model,
  (value: string) => {
    defaultValue.value = value
  }
)
</script>

<template>
  <van-field label-align="top" clearable class="mpl-no-pointer">
    <template #label>
      {{ props.node.label }}
    </template>
    <template #input>
      <div v-html="defaultValue" />
    </template>
  </van-field>
</template>
