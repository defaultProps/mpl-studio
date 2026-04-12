<script lang="ts" setup>
	import { onMounted } from 'vue'

	onMounted(() => {
		console.log('down')
	})
</script>

<template>
  <div class="mpl-style--container">
    组件演示 按钮
  </div>
</template>

<style lang="less" scoped>
	.mpl-style--container {
		box-sizing: border-box;
		width: 100%;
		height: 100%;
	}
</style>
