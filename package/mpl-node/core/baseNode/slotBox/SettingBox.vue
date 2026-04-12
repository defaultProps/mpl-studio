<script lang="ts" setup>
import { ref } from 'vue'
import { SlotBoxProp } from './define'
import FormItem from '../../../components/FormItem.vue'
import SliderNode from '../../../components/SliderNode.vue'
import InputNode from '../../../components/InputNode.vue'

const props = defineProps<{ value: SlotBoxProp }>()
const activeNode = ref<SlotBoxProp>(props.value)

function clearBgColor() {
  activeNode.value.bgColor = ''
}
</script>

<template>
  <div class="right-bar-setting--box">
    <FormItem :label="`宽度 ${activeNode.pos.pc.wType === '%' ? activeNode.pos.pc.w : ''}`">
      <SliderNode v-model:slider="activeNode.pos.pc.w" v-model:unit="activeNode.pos.pc.wType" />
  </FormItem>
    <FormItem label="背景色">
      <input v-model="activeNode.bgColor" type="color" class="mpl-input mr-5">
      <InputNode v-model="activeNode.bgColor" readonly />
      <button type="button" class="mpl-btn del-btn icon icon-close1 ml-5" @click="clearBgColor" />
    </FormItem>
    <FormItem label="显示隐藏" var="mpl.df4tg5.visible">
      <input v-model="activeNode.visible" type="checkbox" class="mpl-input mr-5">
    </FormItem>
  </div>
</template>
