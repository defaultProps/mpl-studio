<script lang="ts" setup>
import { ref } from "vue";
import { watchDebounced } from "@vueuse/core"
import FormItem from "../../../components/FormItem.vue"
import SliderNode from "../../../components/SliderNode.vue";
import InputNode from "../../../components/InputNode.vue";
import { ColorPickerFormProp } from "./define";

const props = defineProps<{ value: ColorPickerFormProp }>();
const emit = defineEmits(["changeNode"]);
const activeNode = ref<ColorPickerFormProp>(props.value);

watchDebounced(activeNode.value, (val) => {
  emit("changeNode", val);
})

function removeColor(pos: number) {
  activeNode.value.colorPicker.predefineColors.splice(pos, 1)
}

function addPredefineColors() {
  activeNode.value.colorPicker.predefineColors.push('#000')
}
</script>

<template>
  <div class="right-bar-setting--box">
    <FormItem :label="`宽度比例 ${activeNode.pos.pc.w}`">
      <SliderNode v-model="activeNode.pos.pc.w" />
    </FormItem>
    <NodeLabel v-model="activeNode.label" />
    <div class="mpl-divider" label="颜色器设置"></div>
    <FormItem var="mpl.rg5fv6.input.text" label="初始值" init-value>
      <InputNode v-model="activeNode.colorPicker.model" />
    </FormItem>
    <div class="mpl-divider" label="预定义颜色"></div>
    <div v-for="(_, i) in activeNode.colorPicker.predefineColors" class="predefine-line">
      <el-color-picker v-model="activeNode.colorPicker.predefineColors[i]" size="small" />
      <InputNode v-model="activeNode.colorPicker.predefineColors[i]" disabled class="ml-2 mr-2" />
      <button class="mpl-btn del-btn icon icon-close1" @click="removeColor(i)" />
    </div>
    <button class="mpl-btn plus-btn icon icon-plus" @click="addPredefineColors">添加按钮</button>
    <FormItem label="必填">
      <input type="checkbox" class="mpl-input" v-model="activeNode.colorPicker.required" />
    </FormItem>
    <FormItem label="禁用" var="mpl.sf4ht6.disabled">
      <input type="checkbox" class="mpl-input" v-model="activeNode.colorPicker.disabled" />
    </FormItem>
  </div>
</template>

<style lang="less">
.right-bar-setting--box {
  padding: 5px;
  box-sizing: border-box;
  font-size: 12px;
  .predefine-line {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    height: 30px;
    overflow: hidden;
  }
}
</style>
