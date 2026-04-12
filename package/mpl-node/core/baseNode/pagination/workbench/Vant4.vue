<script lang="ts" setup>
  import { ref, watch } from 'vue'
  import { Pagination } from '../define'

  const props = defineProps<{ node: Pagination }>()
  const defaultValue = ref<number>(props.node.model)

  watch(
    () => props.node.model,
    (value: number) => {
      defaultValue.value = value
    }
  )
</script>

<template>
  <div>分页</div>
</template>
