<script setup lang="ts">
	const modelInput = defineModel<number>({ default: 1 })

	function decrease() {
		if (modelInput.value <= 1) return
		modelInput.value--
	}

	function increase() {
		if (modelInput.value >= 12) return
		modelInput.value++
	}
</script>

<template>
	<input :value="modelInput" disabled readonly max="100000000000" maxlength="20" type="number" class="mpl-input mr-5" autocomplete="off">
	<button type="button" class="mpl-btn ml-5 ml-10 icon icon-line" :disabled="modelInput <= 1" @click="decrease" />
	<button type="button" class="mpl-btn mpl-btn ml-5 icon icon-add" :disabled="modelInput >= 12" @click="increase" />
</template>
