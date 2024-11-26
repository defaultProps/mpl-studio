<script lang="ts" setup>
import { inject, ref, watch } from 'vue'
import { VISIBLE_NOTE } from '../../../../libs'
import { SelectDialogFormProp } from '../define'

const props = defineProps<{ node: SelectDialogFormProp }>()
const inputValue = ref<string>(props.node.selectDialog.model || '')

watch(
  () => props.node.selectDialog.model,
  (value: any) => {
    inputValue.value = value
  },
)

const visibleNote = inject(VISIBLE_NOTE, ref(false))

console.log(visibleNote)
</script>

<template>
  <div>弹窗选择组件 element-plus</div>
</template>
