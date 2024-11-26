<script lang="ts" setup>
  import { ref } from "vue"
  import { watchDebounced } from "@vueuse/core"
  import FormItem from "../../../components/FormItem.vue"
  import NodeLabel from "../../../components/NodeFormLabel.vue"
  import InputNumber from "../../../components/InputNumber.vue"
  import InputNode from "../../../components/InputNode.vue"
  import SliderNode from "../../../components/SliderNode.vue"
  import { UploadInputFormProp } from "./define"
  import BaseRuleGroup from '../../../components/BaseRuleGroup.vue'

  const props = defineProps<{ value: UploadInputFormProp }>()
  const emit = defineEmits(["changeNode"])
  const activeNode = ref<UploadInputFormProp>(props.value)

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
    <FormItem label="提示信息" var="mpl.rg5fv6.upload.placeholder">
      <InputNode v-model="activeNode.upload.placeholder" />
    </FormItem>
    <FormItem label="上传数量限制">
      <InputNumber v-model="activeNode.upload.limit" placeholder="默认无限制" />
    </FormItem>
    <FormItem label="可清空" var="mpl.rg5fv6.upload.clearable">
      <input type="checkbox" class="mpl-input" v-model="activeNode.upload.clearable" />
    </FormItem>
    <FormItem label="必填">
      <input type="checkbox" class="mpl-input" v-model="activeNode.upload.required" />
    </FormItem>
    <div class="mpl-divider" label="上传文件规则"></div>
    <BaseRuleGroup v-model="activeNode.upload.rules" :cid="activeNode.cid" />
  </div>
</template>
<style lang="less" scoped>
  .right-bar-setting--box {
    padding: 5px;
    box-sizing: border-box;
  }
</style>