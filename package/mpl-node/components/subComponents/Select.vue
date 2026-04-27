<script setup lang="ts">
import FormItem from '../FormItem.vue'
import InputNode from '../InputNode.vue'
import type { SelectFormProp } from '../../core/baseNode/select/define'

const activeNode = defineModel<SelectFormProp & { slotPos: 'l' | 'r' }>()
</script>
<template>
  <template v-if="activeNode">
    <FormItem label="提示信息" var="mpl.rg5fv6.input.placeholder">
      <InputNode v-model="activeNode.select.placeholder" />
    </FormItem>
    <FormItem v-model="activeNode.select.prefixIcon" var="mpl.rg5fv6.select.prefixIcon" label="前置图标" icon />
    <!-- <FormItem v-model="activeNode.select.suffixIcon" var="mpl.rg5fv6.select.suffixIcon" label="后置图标" icon /> -->
    <FormItem label="可清空" var="mpl.rg5fv6.select.clearable">
      <input v-model="activeNode.select.clearable" type="checkbox" class="mpl-input">
    </FormItem>
  </template>
</template>