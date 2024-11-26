<script lang="ts" setup>
import { ref } from 'vue'
import FormItem from "../../../components/FormItem.vue";
import NodeLabel from '../../../components/NodeFormLabel.vue'
import { DatePickerFormProp } from './define'
import SlotBtnGroup from '../../../components/SlotBtnGroup.vue'

const props = defineProps<{ value: DatePickerFormProp, isMobile: boolean }>();
const activeNode = ref<DatePickerFormProp>(props.value);

</script>

<template>
  <div class="right-bar-setting--box">
    <FormItem :label="`宽度比例 ${activeNode.pos.pc.w}`">
      <SliderNode v-model="activeNode.pos.pc.w" />
    </FormItem>
    <NodeLabel v-model="activeNode.label" />
    <div class="mpl-divider" label="时间框配置"></div>
    <FormItem var="mpl.rg5fv6.input.text" label="初始值" init-value>
      <select v-model="activeNode.datePicker.model" class="mpl-select">
        <option value="currentTime">用户当前时间</option>
        <option value="calculator">计算器</option>
        <option value="calculator">固定时间</option>
      </select>
    </FormItem>
    <FormItem label="可清空" var="mpl.rg5fv6.input.clearable">
      <input type="checkbox" class="mpl-input" v-model="activeNode.datePicker.clearable" />
    </FormItem>
    <FormItem label="必填">
      <input type="checkbox" class="mpl-input" v-model="activeNode.datePicker.required" />
    </FormItem>
    <SlotBtnGroup v-model="activeNode.slotBtn" :cid="activeNode.cid" />
  </div>
</template>

<style lang="less" scoped>
.right-bar-setting--box {
  padding: 5px;
  box-sizing: border-box;
  font-size: 12px;
}
</style>
