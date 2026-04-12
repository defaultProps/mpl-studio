<script lang="ts" setup>
import { ref, inject, onBeforeUnmount } from 'vue'
import { watchDebounced } from '@vueuse/core'
import { SearchBoxProp } from './define'

const props = defineProps<{ value: SearchBoxProp }>()
const activeNode = ref<SearchBoxProp>(props.value)
const changeNode = inject('changeNode') as any

const stopWatcher = watchDebounced(activeNode.value, val => { changeNode(val) }, { debounce: 500 })

onBeforeUnmount(() => {
  stopWatcher()
})
</script>

<template>
  <div class="right-bar-setting--box">
    查询容器组件
  </div>
</template>
