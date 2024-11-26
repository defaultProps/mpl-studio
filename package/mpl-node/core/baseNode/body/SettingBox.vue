<script lang="ts" setup>
import { ref } from "vue";
import FormItem from "../../../components/FormItem.vue";
import InputNode from "../../../components/InputNode.vue";

const color = ref("#ffffff");
const bodyNode = ref<any>({
  layout: "内部滚动型页面排版",
  note: true,
});
</script>
<template>
  <div class="right-bar-body-setting--box">
    <div class="mpl-divider" label="页面设置"></div>
    <FormItem label="背景颜色">
      <InputNode v-model="color" class="mr-5" :readonly="true" />
      <input v-model="color" type="color" class="mpl-input">
    </FormItem>
    <FormItem label="页面容器">
      <InputNode v-model="bodyNode.layout" />
      <button class="mpl-btn ml-5 icon icon-select5" />
    </FormItem>
  </div>
</template>

<style lang="less">
.right-bar-body-setting--box {
  padding: 5px;
  box-sizing: border-box;
}
</style>
