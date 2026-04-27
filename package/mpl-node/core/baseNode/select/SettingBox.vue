<script lang="ts" setup>
import { ref, inject, onBeforeUnmount, onMounted } from 'vue'
import { watchDebounced } from '@vueuse/core'
import FormItem from '../../../components/FormItem.vue'
import NodeLabel from '../../../components/NodeFormLabel.vue'
import { SelectFormProp } from './define'
import { textAlignPosition } from '../../../libs'
import SliderNode from '../../../components/SliderNode.vue'
import RadioBtnGroup from '../../../components/RadioBtnGroup.vue'
import InputNode from '../../../components/InputNode.vue'
import FormIconItem from '../../../components/FormIconItem.vue'
import BaseRuleIDE from '../../../components/BaseRuleIDE.vue'
import SlotNodeGroup from '../../../components/SlotNodeGroup.vue'
import FormItemSingle from '../../../components/FormItemSingle.vue'
import FormVModel from '../../../components/FormVModel.vue'
import { systemSelectRuleOption } from '@mpl/const'
import ServiceSetting from '../../../components/ServiceSetting.vue'
import NoteNode from '../../../components/NoteNode.vue'

const props = defineProps<{ value: SelectFormProp }>()
const activeNode = ref<SelectFormProp>(props.value)
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
    <div class="mpl-divider">下拉框配置</div>
    <FormItem var="mpl.rg5fv6.input.text" label="初始值" init-value>
      <FormVModel v-model:value="activeNode.select.model" v-model:model-type="activeNode.select.modelType"
        :tag="activeNode.tag" type="string" desc="初始值" />
    </FormItem>
    <FormItemSingle v-if="activeNode.select.width" label="输入位置">
      <RadioBtnGroup v-model="activeNode.select.pos" :option="textAlignPosition" />
    </FormItemSingle>
    <FormItemSingle label="提示信息" var="mpl.rg5fv6.input.placeholder">
      <InputNode v-model="activeNode.select.placeholder" class="reduce-80" />
    </FormItemSingle>
    <FormIconItem v-model="activeNode.select.prefixIcon" label="前置图标" />
    <!-- <FormIconItem v-model="activeNode.select.suffixIcon" label="后置图标" /> -->
    <FormItemSingle label="可清空" var="mpl.rg5fv6.input.clearable">
      <input v-model="activeNode.select.clearable" type="checkbox" class="mpl-input">
    </FormItemSingle>
    <FormItemSingle label="必填">
      <input v-model="activeNode.select.required" type="checkbox" class="mpl-input">
    </FormItemSingle>
    <div class="mpl-divider">数据配置</div>
    <FormItem label="数据赋值" :var="`mpl.var.table.${activeNode.cid}_list`" cid />
    <ServiceSetting v-model="activeNode.select.service" label="下拉框-数据接口服务设置" />
    <div class="mpl-divider">下拉框规则</div>
    <BaseRuleIDE v-model="activeNode.rule" :options="systemSelectRuleOption" />
    <div class="mpl-divider">关联子组件设置</div>
    <SlotNodeGroup v-model="activeNode.slotNodes" />
    <div class="mpl-divider">注解设置</div>
    <NoteNode v-model="activeNode.note" />
  </div>
</template>
