<script lang="ts" setup>
import { ref, inject, onBeforeUnmount } from 'vue'
import { BaseBoxProp } from './define'
import FormItem from '../../../components/FormItem.vue'
import SliderNode from '../../../components/SliderNode.vue'
import { watchDebounced } from '@vueuse/core'
import { predefineColors } from '@mpl/const'

const props = defineProps<{ value: BaseBoxProp }>()
const activeNode = ref<BaseBoxProp>(JSON.parse(JSON.stringify(props.value)))
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
    <FormItem :label="`高度 ${activeNode.pos.pc.h}`">
      <SliderNode v-model:slider="activeNode.pos.pc.h" v-model:unit="activeNode.pos.pc.hType" is-height />
    </FormItem>
    <FormItem label="背景色">
      <div style="flex: 1;text-align: left;font-size: 12px;user-select: text;">
        {{ activeNode.bgColor }}
      </div>
      <el-color-picker v-model="activeNode.bgColor" color-format="hex" size="small" show-alpha :predefine="predefineColors" />
    </FormItem>
    <FormItem label="隐藏/显示" var="mpl.df4tg5.visible">
      <input v-model="activeNode.visible" type="checkbox" class="mpl-input mr-5">
    </FormItem>
    <FormItem v-model="activeNode.layout" label="排版类型" layout />
  </div>
</template>
