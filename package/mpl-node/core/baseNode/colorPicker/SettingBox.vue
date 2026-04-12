<script lang="ts" setup>
import { ref, inject, onBeforeUnmount } from 'vue'
import { watchDebounced } from '@vueuse/core'
import FormItem from '../../../components/FormItem.vue'
import SliderNode from '../../../components/SliderNode.vue'
import InputNode from '../../../components/InputNode.vue'
import { ColorPickerFormProp } from './define'

const props = defineProps<{ value: ColorPickerFormProp }>()
const activeNode = ref<ColorPickerFormProp>(props.value)
const changeNode = inject('changeNode') as any

const stopWatcher = watchDebounced(activeNode.value, val => { changeNode(val) }, { debounce: 500 })

onBeforeUnmount(() => {
  stopWatcher()
})

function removeColor(pos: number) {
  activeNode.value.colorPicker.predefineColors.splice(pos, 1)
}

function addPredefineColors() {
  activeNode.value.colorPicker.predefineColors.push('#1E1E1E')
}
</script>

<template>
  <div class="right-bar-setting--box">
    <FormItem :label="`宽度 ${activeNode.pos.pc.wType === '%' ? activeNode.pos.pc.w : ''}`">
      <SliderNode v-model:slider="activeNode.pos.pc.w" v-model:unit="activeNode.pos.pc.wType" />
    </FormItem>
    <NodeLabel v-model="activeNode.label" :cid="activeNode.cid" />
    <div class="mpl-divider">颜色器设置</div>
    <FormItem var="mpl.rg5fv6.input.text" label="初始值" init-value>
      <InputNode v-model="activeNode.colorPicker.model" />
    </FormItem>
    <div class="mpl-divider">预定义颜色</div>
    <div v-for="(_, i) in activeNode.colorPicker.predefineColors" class="predefine-line">
      <el-color-picker v-model="activeNode.colorPicker.predefineColors[i]" size="small" />
      <InputNode v-model="activeNode.colorPicker.predefineColors[i]" disabled class="ml-2 mr-2" />
      <button type="button" class="mpl-btn del-btn icon icon-close1" @click="removeColor(i)" />
    </div>
    <button type="button" class="mpl-btn plus-btn icon icon-plus" @click="addPredefineColors">
      添加按钮
    </button>
    <FormItem label="必填">
      <input v-model="activeNode.colorPicker.required" type="checkbox" class="mpl-input">
    </FormItem>
    <FormItem label="禁用" var="mpl.sf4ht6.disabled">
      <input v-model="activeNode.colorPicker.disabled" type="checkbox" class="mpl-input">
    </FormItem>
  </div>
</template>

<style lang="less">
.right-bar-setting--box {
  .predefine-line {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    height: 30px;
    overflow: hidden;
  }
}
</style>
