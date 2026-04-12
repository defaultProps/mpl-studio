<script lang="ts" setup>
	import { ref, watch } from 'vue'
	import { SelectDialogFormProp } from '../define'

	const props = defineProps<{ node: SelectDialogFormProp }>()
	const inputValue = ref<string>(props.node.selectDialog.model || '')

	watch(
		() => props.node.selectDialog.model,
		(value: any) => {
			inputValue.value = value
		}
	)
</script>

<template>
  <van-field v-model="inputValue" :placeholder="props.node.selectDialog.placeholder" label-align="top" clearable class="mpl-no-pointer">
    <template #label>
      {{ props.node.label.text }}
    </template>
  </van-field>
</template>
