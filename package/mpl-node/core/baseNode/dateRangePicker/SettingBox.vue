<script lang="ts" setup>
import { ref, inject, onBeforeUnmount } from 'vue'
import { watchDebounced } from '@vueuse/core'
import { DateRangePickerFormProp } from './define'
import NodeLabel from '../../../components/NodeFormLabel.vue'
import FormItem from '../../../components/FormItem.vue'
import SliderNode from '../../../components/SliderNode.vue'

const props = defineProps<{ value: DateRangePickerFormProp }>()
const activeNode = ref<DateRangePickerFormProp>(props.value)
const changeNode = inject('changeNode') as any

const stopWatcher = watchDebounced(activeNode.value, val => { changeNode(val) }, { debounce: 500 })

onBeforeUnmount(() => {
  stopWatcher()
})

</script>

<template>
  <div class="right-bar-setting--box">
    <FormItem :label="`宽度 ${activeNode.pos.pc.wType === '%' ? activeNode.pos.pc.w : ''}`">
      <SliderNode v-model:slider="activeNode.pos.pc.w" v-model:unit="activeNode.pos.pc.wType" />
    </FormItem>
    <NodeLabel v-model="activeNode.label" :cid="activeNode.cid" />
    <div class="mpl-divider">时间范围选择</div>
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
      <input v-model="activeNode.dateRangePicker.model" placeholder="请输入" class="mpl-input">
    </FormItem>
    <FormItem label="必填">
      <input v-model="activeNode.dateRangePicker.required" type="checkbox" class="mpl-input">
    </FormItem>
  </div>
</template>
