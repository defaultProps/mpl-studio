<script setup lang="ts">
import { ref, watch } from 'vue'

const props = defineProps<{ modelValue: number | string | undefined; readonly?: boolean; placeholder?: string }>()

// 不使用defineModel，延迟blur更新v-model
const emit = defineEmits(['update:modelValue', 'blur'])
const modelInput = ref<string | number>(props.modelValue || '')

watch(
  () => props.modelValue,
  () => {
    modelInput.value = props.modelValue || ''
  }
)

function handleBlur(event: FocusEvent) {
  const dom = event.target as HTMLInputElement
  const value = dom.value.trim() || ''

  emit('update:modelValue', value)
  emit('blur', value)
}
</script>

<template>
  <input v-model="modelInput" maxlength="100" class="mpl-input" :placeholder="placeholder || ''"
         :readonly="props.readonly" autocomplete="off" @blur="handleBlur">
</template>