<script lang="ts" setup>
import { ref, inject, onBeforeUnmount } from 'vue'
import { watchDebounced } from '@vueuse/core'
import FormItem from '../../../components/FormItem.vue'
import NodeLabel from '../../../components/NodeFormLabel.vue'
import { DatePickerFormProp } from './define'
import SlotBtnGroup from '../../../components/SlotBtnGroup.vue'

const props = defineProps<{ value: DatePickerFormProp }>()
const activeNode = ref<DatePickerFormProp>(props.value)
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
    <div class="mpl-divider">时间框配置</div>
    <FormItem var="mpl.rg5fv6.input.text" label="初始值" init-value>
      <select v-model="activeNode.datePicker.model" class="mpl-select">
        <option value="currentTime">
          用户当前时间
        </option>
        <option value="calculator">
          计算器
        </option>
        <option value="calculator">
          固定时间
        </option>
      </select>
    </FormItem>
    <FormItem label="可清空" var="mpl.rg5fv6.input.clearable">
      <input v-model="activeNode.datePicker.clearable" type="checkbox" class="mpl-input">
    </FormItem>
    <FormItem label="必填">
      <input v-model="activeNode.datePicker.required" type="checkbox" class="mpl-input">
    </FormItem>
    <SlotBtnGroup v-model="activeNode.slotBtn" :cid="activeNode.cid" />
  </div>
</template>