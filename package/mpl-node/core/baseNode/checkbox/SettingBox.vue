<script lang="ts" setup>
import { ref } from 'vue'
import NodeLabel from '../../../components/NodeFormLabel.vue'
import { CheckboxFormProp } from './define'
import FormItem from "../../../components/FormItem.vue";
import SlotBtnGroup from '../../../components/SlotBtnGroup.vue'
import SliderNode from "../../../components/SliderNode.vue";
import InputNode from "../../../components/InputNode.vue";
import { serviceOption } from '@mpl/const'

const props = defineProps<{ value: CheckboxFormProp }>()
const activeNode = ref<CheckboxFormProp>(props.value)

function removeItem(pos: number) {
  activeNode.value.checkbox.service.staticData.splice(pos, 1)
}
</script>
<template>
  <div class="right-bar-setting--box">
    <FormItem :label="`宽度比例 ${activeNode.pos.pc.w}`">
      <SliderNode v-model="activeNode.pos.pc.w" />
    </FormItem>
    <NodeLabel v-model="activeNode.label" />
    <div class="mpl-divider" label="多选框配置"></div>
    <FormItem label="提示信息" var="mpl.rg5fv6.input.placeholder">
      <InputNode v-model="activeNode.checkbox.placeholder" />
    </FormItem>
    <FormItem label="必填">
      <input type="checkbox" class="mpl-input" v-model="activeNode.checkbox.required" />
    </FormItem>
    <SlotBtnGroup v-model="activeNode.slotBtn" :cid="activeNode.cid" />
    <div class="mpl-divider" label="数据管理"></div>
    <FormItem label="数据类型">
      <RadioBtnGroup :option="serviceOption" v-model="activeNode.checkbox.service.mode" />
    </FormItem>
    <!-- 静态数据 -->
    <template v-if="activeNode.checkbox.service.mode === 'static'">
      <div v-for="(item, i) in activeNode.checkbox.service.staticData" :key="i" class="service-static-item">
        <InputNode v-model="item[activeNode.checkbox.service.labelKey]" />
        <button class="mpl-btn del-btn ml-5 icon icon-close1" @click="removeItem(i)" />
      </div>
    </template>
    <!-- 动态数据 -->
    <InputNode v-else v-model="activeNode.checkbox.service.defaultValue" />
  </div>
</template>

<style lang="less">
.right-bar-setting--box {
  padding: 5px;
  box-sizing: border-box;
}
</style>
