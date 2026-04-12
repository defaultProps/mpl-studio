<script lang="ts" setup>
import { ref, inject, onBeforeUnmount } from 'vue'
import { watchDebounced } from '@vueuse/core'
import { TimeRangePickerFormProp } from './define'
import NodeLabel from '../../../components/NodeFormLabel.vue'
import FormItem from '../../../components/FormItem.vue'
import SliderNode from '../../../components/SliderNode.vue'

const props = defineProps<{ value: TimeRangePickerFormProp }>()
const activeNode = ref<TimeRangePickerFormProp>(props.value)
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
    <FormItem label="初始值" var="mpl.rg5fv6.switch.model">
      <input v-model="activeNode.timeRangePicker.model" type="date" placeholder="请选择" class="mpl-input mr-5"
        style="width: 100px">
      <input v-model="activeNode.timeRangePicker.model" type="date" placeholder="请选择" class="mpl-input"
        style="width: 100px">
    </FormItem>
    <FormItem label="必填">
      <input v-model="activeNode.timeRangePicker.required" type="checkbox" class="mpl-input">
    </FormItem>
    <div class="mpl-divider">关联子组件设置</div>
    <!-- <SlotNodeGroup v-model="activeNode.slotNodes" /> -->
  </div>
</template>