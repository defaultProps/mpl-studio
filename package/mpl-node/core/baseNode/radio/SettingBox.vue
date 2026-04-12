<script lang="ts" setup>
import { watchDebounced } from '@vueuse/core'
import FormItem from '../../../components/FormItem.vue'
import { RadioBoxFormProp } from './define'
import InputNode from '../../../components/InputNode.vue'
import SliderNode from '../../../components/SliderNode.vue'
import { ref, inject, onBeforeUnmount, onMounted } from 'vue'
import NodeLabel from '../../../components/NodeFormLabel.vue'
import SlotNodeGroup from '../../../components/SlotNodeGroup.vue'
import FormVModel from '../../../components/FormVModel.vue'
import FormItemSingle from '../../../components/FormItemSingle.vue'
import NoteNode from '../../../components/NoteNode.vue'

const props = defineProps<{ value: RadioBoxFormProp }>()
const activeNode = ref<RadioBoxFormProp>(props.value)
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
    <FormItem label="显示隐藏" :var="`mpl.var.${activeNode.cid}_visible`">
      <FormVModel v-model:value="activeNode.visible" v-model:model-type="activeNode.visibleType" :tag="activeNode.tag"
        desc="显示隐藏" :option="[{ label: '显示', value: '1' }, { label: '隐藏', value: '0' }]" type="boolean" />
    </FormItem>
    <FormItem label="唯一标识" :var="activeNode.cid" cid />
    <NodeLabel v-model="activeNode.label" v-model:mpl_zh="activeNode.mpl_zh" :cid="activeNode.cid" />
    <div class="mpl-divider">单选配置</div>
    <FormItem var="mpl.rg5fv6.input.text" label="初始值">
      静态select/动态变量
    </FormItem>
    <FormItemSingle label="必填">
      <input v-model="activeNode.radio.required" type="checkbox" class="mpl-input">
    </FormItemSingle>
    <FormItem label="显示值字段" var="mpl.radio.db5ht6.labelKey">
      <InputNode v-model="activeNode.radio.service.labelKey" />
    </FormItem>
    <FormItem label="保存值字段" var="mpl.radio.db5ht6.valueKey">
      <InputNode v-model="activeNode.radio.service.valueKey" />
    </FormItem>
    <FormItem label="禁用字段" var="mpl.radio.db5ht6.disabledKey">
      <InputNode v-model="activeNode.radio.service.disabledKey" />
    </FormItem>
    <div class="mpl-divider">关联子组件设置</div>
    <SlotNodeGroup v-model="activeNode.slotNodes" />
    <div class="mpl-divider">注解设置</div>
    <NoteNode v-model="activeNode.note" />
  </div>
</template>
