<script lang="ts" setup>
import { ref, inject, onBeforeUnmount, onMounted } from 'vue'
import { watchDebounced } from '@vueuse/core'
import { SelectDialogFormProp } from './define'
import FormItem from '../../../components/FormItem.vue'
import SliderNode from '../../../components/SliderNode.vue'
import NodeLabel from '../../../components/NodeFormLabel.vue'
import SlotBtnGroup from '../../../components/SlotBtnGroup.vue'
import InputNode from '../../../components/InputNode.vue'
import type { DialogProp } from '../dialog/define'
import LimitBox from '../../../components/LimitBox.vue'
import FormIconItem from '../../../components/FormIconItem.vue'
import SlotNodeGroup from '../../../components/SlotNodeGroup.vue'
import BaseRuleIDE from '../../../components/BaseRuleIDE.vue'
import FormVModel from '../../../components/FormVModel.vue'
import FormItemSingle from '../../../components/FormItemSingle.vue'
import { textAlignPosition } from '../../../libs'
import NoteNode from '../../../components/NoteNode.vue'

const props = defineProps<{ value: SelectDialogFormProp }>()
const activeNode = ref<SelectDialogFormProp>(props.value)
const dialog = ref<DialogProp>(props.value.selectDialog.dialog)
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
    <div class="mpl-divider">基础设置</div>
    <FormItem var="mpl.rg5fv6.input.text" label="初始值" init-value>
      <FormVModel v-model:value="activeNode.selectDialog.model" v-model:model-type="activeNode.selectDialog.modelType"
        :tag="activeNode.tag" type="string" desc="初始值" />
    </FormItem>
    <FormItemSingle v-if="activeNode.selectDialog.width" label="输入位置">
      <RadioBtnGroup v-model="activeNode.selectDialog.pos" :option="textAlignPosition" />
    </FormItemSingle>
    <FormItemSingle label="提示信息" var="mpl.rg5fv6.input.placeholder">
      <InputNode v-model="activeNode.selectDialog.placeholder" class="reduce-80" />
    </FormItemSingle>
    <FormIconItem v-model="activeNode.selectDialog.prefixIcon" label="前置图标" />
    <!-- <FormIconItem v-model="activeNode.selectDialog.suffixIcon" label="后置图标" /> -->
    <FormItemSingle label="可清空" var="mpl.rg5fv6.input.clearable">
      <input v-model="activeNode.selectDialog.clearable" type="checkbox" class="mpl-input">
    </FormItemSingle>
    <FormItemSingle label="必填">
      <input v-model="activeNode.selectDialog.required" type="checkbox" class="mpl-input">
    </FormItemSingle>
    <div class="mpl-divider">注解设置</div>
    <NoteNode v-model="activeNode.note" />
    <div class="mpl-divider">弹框设置</div>
    <FormItem label="弹框宽度" init-value>
      <InputNode v-model="dialog.width" />
    </FormItem>
    <FormItem label="弹框标题" init-value>
      <InputNode v-model="dialog.header.title" />
    </FormItem>
    <FormItem label="弹框底部">
      <input v-model="dialog.footer.visible" type="checkbox" class="mpl-input">
    </FormItem>
    <template v-if="dialog.footer.visible">
      <SlotBtnGroup v-model="dialog.footer.btnGroup" :cid="activeNode.cid" />
    </template>
    <div class="mpl-divider">表格设置</div>
    <div>表格UI + 数据源 + 分页 + 辅助功能</div>
  </div>
</template>