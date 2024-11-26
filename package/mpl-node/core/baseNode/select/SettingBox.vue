<script lang="ts" setup>
import { ref } from 'vue'
import FormItem from "../../../components/FormItem.vue"
import NodeLabel from '../../../components/NodeFormLabel.vue'
import { SelectFormProp } from './define'
import { textAlignPosition } from "../../../libs";
import SliderNode from "../../../components/SliderNode.vue";
import RadioBtnGroup from "../../../components/RadioBtnGroup.vue";
import InputNode from "../../../components/InputNode.vue";
import { watchDebounced } from "@vueuse/core";
import SlotBtnGroup from '../../../components/SlotBtnGroup.vue'

const props = defineProps<{ value: SelectFormProp }>()
const activeNode = ref<SelectFormProp>(props.value)
const emit = defineEmits(["changeNode"]);

watchDebounced(activeNode.value, (val) => {
  emit("changeNode", val);
});

</script>

<template>
  <div class="right-bar-setting--box">
    <FormItem :label="`宽度比例 ${activeNode.pos.pc.w}`">
      <SliderNode v-model="activeNode.pos.pc.w" />
    </FormItem>
    <NodeLabel v-model="activeNode.label" />
    <div class="mpl-divider" label="输入框配置"></div>
    <FormItem var="mpl.rg5fv6.select.vModel" label="初始值">
      <InputNode v-model="activeNode.select.model" />
    </FormItem>
    <FormItem label="输入宽度">
      <InputNode v-model="activeNode.select.width" />
    </FormItem>
    <FormItem v-if="activeNode.select.width" label="输入位置">
      <RadioBtnGroup v-model="activeNode.select.pos" :option="textAlignPosition" />
    </FormItem>
    <FormItem label="提示信息" var="mpl.rg5fv6.input.placeholder">
      <InputNode v-model="activeNode.select.placeholder" />
    </FormItem>
    <FormItem v-model="activeNode.select.prefixIcon" var="activeNode.select.prefixIcon" label="前置图标" icon />
    <FormItem v-model="activeNode.select.suffixIcon" var="activeNode.select.suffixIcon" label="后置图标" icon />
    <FormItem label="可清空" var="mpl.rg5fv6.select.clearable">
      <input type="checkbox" class="mpl-input" v-model="activeNode.select.clearable" />
    </FormItem>
    <FormItem label="必填">
      <input type="checkbox" class="mpl-input" v-model="activeNode.select.required" />
    </FormItem>
    <SlotBtnGroup v-model="activeNode.slotBtn" :cid="activeNode.cid" />
    <div class="mpl-divider" label="数据管理"></div>
  </div>
</template>

<style lang="less">
.right-bar-setting--box {
  padding: 5px;
  box-sizing: border-box;
  font-size: 12px;
}
</style>
