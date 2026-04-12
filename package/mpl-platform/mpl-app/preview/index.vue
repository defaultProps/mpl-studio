<script setup lang="ts">
import { onMounted, defineComponent, ref } from 'vue'
// import { generatorSinglePageCode } from '@mpl/node'

let asyncComponent = ref()

// onMounted(async () => {
// 	// 模板代码
// 	const template = await Promise.all(generatorSinglePageCode('vant4'))
// 	// 脚本代码 - 引入子组件、setup重新绑定
// 	// 样式代码

// 	// 本地库、第三方库、请求库全局引入

// 	asyncComponent.value = defineComponent({
// 		template: template.join('')
// 	})

// 	window.addEventListener('message', e => {
// 		const obj = e.data

// 		if (obj.type === 'UPDATE_NODE_LIST_PREVIEW') {
// 			console.log(obj.payload)
// 		}
// 	})
// })
</script>
<template>
	<component :is="asyncComponent" />
</template>
