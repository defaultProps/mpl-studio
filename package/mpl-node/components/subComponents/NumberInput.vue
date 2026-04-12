<script setup lang="ts">
  import FormItem from '../FormItem.vue'
  import InputNode from '../InputNode.vue'
  import type { NumberInputFormProp } from '../../core/baseNode/numberInput/define'

  const activeNode = defineModel<NumberInputFormProp & { slotPos: 'l' | 'r' }>()
</script>
<template>
  <template v-if="activeNode">
    <FormItem label="提示信息" var="mpl.rg5fv6.input.placeholder">
      <InputNode v-model="activeNode.input.placeholder" />
    </FormItem>
  </template>
</template>