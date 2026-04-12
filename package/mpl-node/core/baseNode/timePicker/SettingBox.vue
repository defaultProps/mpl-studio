<script lang="ts" setup>
import { ref, inject, onBeforeUnmount } from 'vue'
import { watchDebounced } from '@vueuse/core'
import { TimePickerFormProp } from './define'
import NodeLabel from '../../../components/NodeFormLabel.vue'
import FormItem from '../../../components/FormItem.vue'
import SliderNode from '../../../components/SliderNode.vue'

const props = defineProps<{ value: TimePickerFormProp }>()
const activeNode = ref<TimePickerFormProp>(props.value)
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
    <div class="mpl-divider">时间选择</div>
    <FormItem label="初始值" var="mpl.rg5fv6.switch.model">
      <input v-model="activeNode.timePicker.model" type="date" placeholder="请选择" class="mpl-input">
    </FormItem>
    <FormItem label="必填">
      <input v-model="activeNode.timePicker.required" type="checkbox" class="mpl-input">
    </FormItem>
    <div class="mpl-divider">关联子组件设置</div>
    <!-- <SlotNodeGroup v-model="activeNode.slotNodes" /> -->
  </div>
</template>