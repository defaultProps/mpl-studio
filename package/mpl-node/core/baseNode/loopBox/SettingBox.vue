<script lang="ts" setup>
import { ref } from 'vue'
import { LoopBoxProp } from './define'
import FormItem from '../../../components/FormItem.vue'
import { colorPickerOptions } from '../../../libs/constant'
import SliderNode from '../../../components/SliderNode.vue'

const props = defineProps<{ value: LoopBoxProp }>()
const activeNode = ref<LoopBoxProp>(props.value)
const backgroundColor = ref<string>('')
</script>

<template>
  <div class="right-bar-setting--box">
    <FormItem :label="`宽度 ${activeNode.pos.pc.wType === '%' ? activeNode.pos.pc.w : ''}`">
      <SliderNode v-model:slider="activeNode.pos.pc.w" v-model:unit="activeNode.pos.pc.wType" />
    </FormItem>
    <FormItem :label="`高度比例 ${activeNode.pos.pc.h}`">
      <SliderNode v-model="activeNode.pos.pc.h" :min="1" :max="100" />
    </FormItem>
    <FormItem label="背景色">
      <el-color-picker v-model="backgroundColor" size="small" show-alpha :predefine="colorPickerOptions" />
    </FormItem>
    <FormItem label="显示隐藏">
      <input v-model="activeNode.visible" type="checkbox" class="mpl-input">
    </FormItem>
    <FormItem v-model="activeNode.layout" label="排版类型" layout />
  </div>
</template>