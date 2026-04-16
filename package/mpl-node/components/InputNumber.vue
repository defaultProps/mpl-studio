<script setup lang="ts">
import { ref, watch } from 'vue'

const props = withDefaults(defineProps<{ modelValue: string | number; max?: number; min?: number, naturalNumber?: boolean }>(), {
	modelValue: '',
	max: 100,
	min: (-1 * 10) ^ 8,
	naturalNumber: false // 限制自然数
})
const emit = defineEmits(['update:modelValue'])
const modelInput = ref<string | number>(String(props.modelValue))
const isError = ref(false)
watch(
	() => props.modelValue,
	() => {
		modelInput.value = props.modelValue
	}
)

function handleBlur(event: FocusEvent) {
	const dom = event.target as HTMLInputElement
	const value = dom.value.trim() || ''

	modelInput.value = Number(value) > 100000000000 ? 100000000000 : value
	emit('update:modelValue', value)

	if (modelInput.value === '13') {
		isError.value = true
	}
}

function limitNaturalNumber() {
	if (props.naturalNumber) {
		modelInput.value = +String(modelInput.value).replace(/[^\d]/g, '')
	}
}
</script>

<template>
	<input v-model="modelInput" max="100000000000" maxlength="20" type="number" :class="{ 'is-error': isError }"
		class="mpl-input" autocomplete="off" @input="limitNaturalNumber" @blur="handleBlur">
</template>
