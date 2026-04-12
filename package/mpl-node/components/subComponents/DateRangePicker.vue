<script setup lang="ts">
import FormItem from '../FormItem.vue'
import type { DateRangePickerFormProp } from '../../core/baseNode/dateRangePicker/define'

const activeNode = defineModel<DateRangePickerFormProp & { slotPos: 'l' | 'r' }>()
</script>
<template>
  <template v-if="activeNode">
    <FormItem label="范围类型">
      <select v-model="activeNode.dateRangePicker.type" class="mpl-select">
        <option value="daterange">
          日期范围
        </option>
        <option value="monthrange">
          月范围
        </option>
        <option value="yearrange">
          年范围
        </option>
      </select>
    </FormItem>
    <FormItem label="初始值" var="mpl.rg5fv6.switch.model">
      <input v-model="activeNode.dateRangePicker.model" maxlength="100" autocomplete="off" placeholder="请输入" class="mpl-input">
    </FormItem>
  </template>
</template>