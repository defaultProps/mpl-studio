<script setup lang="ts">
import { ref, watch } from 'vue'

const props = defineProps<{ modelValue: number | string; readonly?: boolean, placeholder?: string }>()
const emit = defineEmits(['update:modelValue', 'blur'])
const modelInput = ref<string | number>(props.modelValue)

watch(
	() => props.modelValue,
	() => {
		modelInput.value = props.modelValue
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
	<textarea v-model="modelInput" class="mpl-textarea" :placeholder="placeholder || ''" rows="5" maxlength="200"
		style="resize: none" @blur="handleBlur" />
</template>
