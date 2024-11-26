<script lang="ts" setup>
import { ref } from 'vue'
import FormItem from "../../../components/FormItem.vue";
import { RadioBoxFormProp } from './define'
import { watchDebounced } from "@vueuse/core";
import InputNode from "../../../components/InputNode.vue";
import SliderNode from "../../../components/SliderNode.vue";

const props = defineProps<{ value: RadioBoxFormProp }>()
const activeNode = ref<RadioBoxFormProp>(props.value)
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
    <div class="mpl-divider" label="单选配置"></div>
    <FormItem var="mpl.rg5fv6.input.text" label="初始值">
      <InputNode v-model="activeNode.radio.model" />
    </FormItem>
    <FormItem label="显示字段" var="mpl.radio.db5ht6.labelKey">
      <InputNode v-model="activeNode.radio.service.labelKey" />
    </FormItem>
    <FormItem label="绑定字段" var="mpl.radio.db5ht6.valueKey">
      <InputNode v-model="activeNode.radio.service.valueKey" />
    </FormItem>
    <FormItem label="禁用字段" var="mpl.radio.db5ht6.disabledKey">
      <InputNode v-model="activeNode.radio.service.disabledKey" />
    </FormItem>

    <FormItem v-model:serviceType="activeNode.radio.service.mode" label="选项数据" var="mpl.radio.db5ht6.options" service>
      <button class="mpl-btn icon icon-setting" />
    </FormItem>
    <FormItem label="必填">
      <input type="checkbox" class="mpl-input" v-model="activeNode.radio.required" />
    </FormItem>
  </div>
</template>

<style lang="less">
.right-bar-setting--box {
  padding: 5px;
  box-sizing: border-box;
  font-size: 12px;
}
</style>
