<script lang="ts" setup>
  import { ref } from 'vue'
 import { BaseBoxProp } from './define'
  import { watchDebounced } from '@vueuse/core'
  import FormItem from '../../../components/FormItem.vue'
  import { colorPickerOptions } from '../../../libs/constant'
  import SliderNode from '../../../components/SliderNode.vue'

  const props = defineProps<{ value: BaseBoxProp }>()
  const emit = defineEmits(['changeNode'])
  const activeNode = ref<BaseBoxProp>(props.value)
  const backgroundColor = ref<string>('')
  watchDebounced(activeNode.value, (val) => {
    emit('changeNode', val)
  })
</script>

<template>
  <div class="right-bar-setting--box">
    <FormItem :label="`宽度比例 ${activeNode.pos.pc.w}`">
      <SliderNode v-model="activeNode.pos.pc.w" />
    </FormItem>
    <FormItem :label="`高度比例 ${activeNode.pos.pc.h}`">
      <SliderNode v-model="activeNode.pos.pc.h" :min="1" :max="100" />
    </FormItem>
    <FormItem label="背景色">
      <el-color-picker v-model="backgroundColor" size="small" show-alpha :predefine="colorPickerOptions" />
    </FormItem>
    <FormItem label="显示隐藏">
      <input type="checkbox" class="mpl-input" v-model="activeNode.visible" />
    </FormItem>
    <FormItem v-model="activeNode.layout" label="排版类型" layout />
  </div>
</template>

<style lang="less">
  .right-bar-setting--box {
    padding: 5px;
    box-sizing: border-box;
  }
</style>
