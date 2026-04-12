<script lang="ts" setup>
	import { QrCodeBox } from '../define'
	import { ref } from 'vue'

	const props = defineProps<{ node: QrCodeBox }>()
	const qrCodeModal = ref<string>(props.node.qrCode.model || '')

	console.log(qrCodeModal)
</script>

<template>
	<div class="mpl-qr-code mpl-no-pointer">
		二维码
	</div>
</template>
<style lang="less" scoped>
	.mpl-qr-code {
		font-size: 12px;
		width: 100%;
		height: 100%;
		overflow: hidden;
		text-align: left;
		outline: 1px solid #ccc;
		box-sizing: border-box;
		position: relative;
		background: #f0f0f0;
	}
</style>
