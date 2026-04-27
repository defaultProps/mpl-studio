<script lang="ts" setup>
import { ref, inject, onBeforeUnmount, provide, onMounted } from 'vue'
import { watchDebounced } from '@vueuse/core'
import FormItem from '../../../components/FormItem.vue'
import NodeLabel from '../../../components/NodeFormLabel.vue'
import { textAlignPosition } from '../../../libs'
import InputNumber from '../../../components/InputNumber.vue'
import InputNode from '../../../components/InputNode.vue'
import SliderNode from '../../../components/SliderNode.vue'
import RadioBtnGroup from '../../../components/RadioBtnGroup.vue'
import { SingleInputFormProp } from './define'
import SlotNodeGroup from '../../../components/SlotNodeGroup.vue'
import BaseRuleIDE from '../../../components/BaseRuleIDE.vue'
import FormVModel from '../../../components/FormVModel.vue'
import FormItemSingle from '../../../components/FormItemSingle.vue'
import { ACTIVE_NODE } from '../../../libs'
import LimitBox from '../../../components/LimitBox.vue'
import FormIconItem from '../../../components/FormIconItem.vue'
import { systemRuleOption } from '@mpl/const'
import NoteNode from '../../../components/NoteNode.vue'

const props = defineProps<{ value: SingleInputFormProp }>()
const activeNode = ref<SingleInputFormProp>(JSON.parse(JSON.stringify(props.value)))
const changeNode = inject('changeNode') as any
const stopWatcher = watchDebounced(activeNode.value, val => { changeNode(val) }, { debounce: 500 })

provide(ACTIVE_NODE, activeNode)

onBeforeUnmount(() => {
  stopWatcher()
})

function onlyNumber(event: any) {
  // input原生输入框, 可以输入 + - e . 需要都排除, 仅仅保留正整数
  activeNode.value.input.maxlength = event.target.value.replace(/[^0-9]/g, '')
}
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
    <div class="mpl-divider">输入框配置</div>
    <FormItem :var="`mpl.${activeNode.cid}.input.model`" label="初始值" init-value>
      <FormVModel v-model:value="activeNode.input.model" v-model:model-type="activeNode.input.modelType"
        :tag="activeNode.tag" type="string" desc="初始值" />
    </FormItem>
    <FormItem v-if="activeNode.input.width" label="输入位置">
      <RadioBtnGroup v-model="activeNode.input.pos" :option="textAlignPosition" />
    </FormItem>
    <FormItem label="提示信息" :var="`mpl.${activeNode.cid}.input.placeholder`">
      <InputNode v-model="activeNode.input.placeholder" />
    </FormItem>
    <FormItemSingle label="显示长度限制">
      <input v-model="activeNode.input.showLimit" type="checkbox" class="mpl-input">
    </FormItemSingle>
    <FormItem label="最大长度">
      <!-- Natural Number -->
      <InputNumber v-model="activeNode.input.maxlength" natural-number placeholder="默认无限制" @input="onlyNumber" />
    </FormItem>
    <FormIconItem v-model="activeNode.input.prefixIcon" label="前置图标" />
    <!-- <FormIconItem v-model="activeNode.input.suffixIcon" label="后置图标" /> -->
    <FormItem label="可清空" :var="`mpl.${activeNode.cid}.input.clearable`">
      <input v-model="activeNode.input.clearable" type="checkbox" class="mpl-input">
    </FormItem>
    <FormItem label="必填" :var="`mpl.${activeNode.cid}.input.required`">
      <input v-model="activeNode.input.required" type="checkbox" class="mpl-input">
    </FormItem>
    <div class="mpl-divider">输入框限制</div>
    <LimitBox v-model="activeNode.input.limit" />
    <div class="mpl-divider">输入框规则</div>
    <BaseRuleIDE v-model="activeNode.rule" :options="systemRuleOption" />
    <div class="mpl-divider">关联子组件设置</div>
    <SlotNodeGroup v-model="activeNode.slotNodes" />
    <div class="mpl-divider">注解设置</div>
    <NoteNode v-model="activeNode.note" />
  </div>
</template>
