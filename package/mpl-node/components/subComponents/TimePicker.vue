<script setup lang="ts">
import FormItem from '../FormItem.vue'
import type { TimePickerFormProp } from '../../core/baseNode/timePicker/define'

const activeNode = defineModel<TimePickerFormProp & { slotPos: 'l' | 'r' }>()
</script>
<template>
  <template v-if="activeNode">
    <FormItem label="初始值" var="mpl.rg5fv6.switch.model">
      <input v-model="activeNode.timePicker.model" type="date" placeholder="请选择" class="mpl-input">
    </FormItem>
  </template>
</template>