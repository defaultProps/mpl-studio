<script lang="ts" setup>
import type { ButtonGroupProp } from './define'
import { ref } from 'vue'
import { watchDebounced } from '@vueuse/core'
import SlotNodeGroup from '../../../components/SlotNodeGroup.vue'
import FormItem from '../../../components/FormItem.vue'
import SliderNode from '../../../components/SliderNode.vue'
import FormVModel from '../../../components/FormVModel.vue'

function debouncedTargetNode<T>(value: T) {
  const activeNode = ref(value)
  return activeNode
}

const props = defineProps<{ value: ButtonGroupProp }>()

const activeNode = debouncedTargetNode(props.value)
</script>

<template>
  <div class="right-bar-base-button--box">
    <FormItem :label="`宽度 ${activeNode.pos.pc.wType === '%' ? activeNode.pos.pc.w : ''}`">
      <SliderNode v-model:slider="activeNode.pos.pc.w" v-model:unit="activeNode.pos.pc.wType" />
    </FormItem>
    <FormItem label="显示隐藏" :var="`mpl.var.${activeNode.cid}_visible`">
      <FormVModel v-model:value="activeNode.visible" v-model:model-type="activeNode.visibleType" :tag="activeNode.tag"
        desc="显示隐藏" :option="[{ label: '显示', value: '1' }, { label: '隐藏', value: '0' }]" type="boolean" />
    </FormItem>
    <FormItem label="唯一标识" :var="activeNode.cid" />
    <div class="mpl-divider">关联子组件设置</div>
    <!-- <SlotNodeGroup v-model="activeNode.slotNodes" /> -->
  </div>
</template>
<style lang="less" scoped>
.right-bar-base-button--box {
  padding: 5px;
  box-sizing: border-box;
}
</style>
