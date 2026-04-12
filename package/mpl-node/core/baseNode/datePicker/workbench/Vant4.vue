<script lang="ts" setup>
	import { ref, watch } from 'vue'
	import { DatePickerFormProp } from '../define'

	const props = defineProps<{ node: DatePickerFormProp }>()
	const defaultValue = ref<string>(props.node.datePicker.model)

	watch(
		() => props.node.datePicker.model,
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
      <span v-if="!defaultValue || defaultValue.length" class="placeholder-span">{{ props.node.datePicker.placeholder }}</span>
      <span v-else class="value-line">{{ formatSelect }}</span>
      <span class="delete-btn">
        <van-icon name="arrow" />
      </span>
    </template>
  </van-field>
</template>
