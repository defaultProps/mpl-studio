<script setup lang="ts">
import FormItem from '../FormItem.vue'
import InputNode from '../InputNode.vue'
import type { DatePickerFormProp } from '../../core/baseNode/datePicker/define'

const activeNode = defineModel<DatePickerFormProp & { slotPos: 'l' | 'r' }>()
</script>
<template>
  <template v-if="activeNode">
    <FormItem label="提示信息" var="mpl.rg5fv6.input.placeholder">
      <InputNode v-model="activeNode.datePicker.placeholder" />
    </FormItem>
    <FormItem label="可清空" var="mpl.rg5fv6.input.clearable">
      <input v-model="activeNode.datePicker.clearable" type="checkbox" class="mpl-input">
    </FormItem>
  </template>
</template>