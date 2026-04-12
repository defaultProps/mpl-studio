<script setup lang="ts">
import FormItem from '../FormItem.vue'
import type { TimeRangePickerFormProp } from '../../core/baseNode/timeRangePicker/define'

const activeNode = defineModel<TimeRangePickerFormProp & { slotPos: 'l' | 'r' }>()
</script>
<template>
  <template v-if="activeNode">
    <FormItem label="范围类型">
      <select v-model="activeNode.timeRangePicker.type" class="mpl-select">
        <option value="hh-mm-ss">
          时分秒
        </option>
        <option value="hh-mm">
          时分
        </option>
        <option value="mm-ss">
          分秒
        </option>
      </select>
    </FormItem>
    <FormItem label="初始值" var="mpl.rg5fv6.switch.model" mini-label>
      <input v-model="activeNode.timeRangePicker.model" type="date" placeholder="请选择" class="mpl-input mr-5"
             style="width: 100px">
      <input v-model="activeNode.timeRangePicker.model" type="date" placeholder="请选择" class="mpl-input"
             style="width: 100px">
    </FormItem>
  </template>
</template>