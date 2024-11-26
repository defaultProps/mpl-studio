<script lang="ts" setup>
import { ref } from "vue"
import { watchDebounced } from "@vueuse/core"
import FormItem from "../../../components/FormItem.vue"
import NodeLabel from "../../../components/NodeFormLabel.vue"
import { textAlignPosition } from "../../../libs"
import InputNumber from "../../../components/InputNumber.vue"
import InputNode from "../../../components/InputNode.vue"
import SliderNode from "../../../components/SliderNode.vue"
import RadioBtnGroup from "../../../components/RadioBtnGroup.vue"
import { SingleInputFormProp } from "./define"
import SlotBtnGroup from '../../../components/SlotBtnGroup.vue'
import BaseRuleGroup from '../../../components/BaseRuleGroup.vue'

const props = defineProps<{ value: SingleInputFormProp }>()
const emit = defineEmits(["changeNode"])
const activeNode = ref<SingleInputFormProp>(props.value)

watchDebounced(activeNode.value, (val) => {
  emit("changeNode", val)
})

</script>

<template>
  <div class="right-bar-setting--box">
    <FormItem :label="`宽度比例 ${activeNode.pos.pc.w}`">
      <SliderNode v-model="activeNode.pos.pc.w" />
    </FormItem>
    <FormItem label="显示隐藏" :var="`mpl.var.${activeNode.cid}_visible`" />
    <NodeLabel v-model="activeNode.label" />
    <div class="mpl-divider" label="输入框配置"></div>
    <FormItem var="mpl.rg5fv6.input.text" label="初始值" init-value>
      <InputNode v-model="activeNode.input.model" />
    </FormItem>
    <FormItem label="输入宽度">
      <InputNode v-model="activeNode.input.width" />
    </FormItem>
    <FormItem v-if="activeNode.input.width" label="输入位置">
      <RadioBtnGroup v-model="activeNode.input.pos" :option="textAlignPosition" />
    </FormItem>
    <FormItem label="提示信息" var="mpl.rg5fv6.input.placeholder">
      <InputNode v-model="activeNode.input.placeholder" />
    </FormItem>
    <FormItem label="显示长度限制">
      <input type="checkbox" class="mpl-input" v-model="activeNode.input.showLimit" />
    </FormItem>
    <FormItem label="最大长度">
      <InputNumber v-model="activeNode.input.maxlength" placeholder="默认无限制" />
    </FormItem>
    <FormItem v-model="activeNode.input.prefixIcon" var="activeNode.input.prefixIcon" label="前置图标" icon />
    <FormItem v-model="activeNode.input.suffixIcon" var="activeNode.input.suffixIcon" label="后置图标" icon />
    <FormItem label="可清空" var="mpl.rg5fv6.input.clearable">
      <input type="checkbox" class="mpl-input" v-model="activeNode.input.clearable" />
    </FormItem>
    <FormItem label="必填">
      <input type="checkbox" class="mpl-input" v-model="activeNode.input.required" />
    </FormItem>
    <div class="mpl-divider" label="输入框规则"></div>
    <BaseRuleGroup v-model="activeNode.input.rules" :cid="activeNode.cid" />
    <div class="mpl-divider" label="辅助按钮设置"></div>
    <SlotBtnGroup v-model="activeNode.slotBtn" :cid="activeNode.cid" />
    <div class="mpl-divider" label="关联组件"></div>
    <button class="mpl-btn plus-btn icon icon-plus">添加组件</button>
  </div>
</template>
<style lang="less" scoped>
.right-bar-setting--box {
  padding: 5px;
  box-sizing: border-box;
}
</style>