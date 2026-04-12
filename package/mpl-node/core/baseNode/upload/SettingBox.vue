<script lang="ts" setup>
import { ref } from 'vue'
import FormItem from '../../../components/FormItem.vue'
import NodeLabel from '../../../components/NodeFormLabel.vue'
import InputNumber from '../../../components/InputNumber.vue'
import InputNode from '../../../components/InputNode.vue'
import SliderNode from '../../../components/SliderNode.vue'
import { UploadInputFormProp } from './define'

const props = defineProps<{ value: UploadInputFormProp }>()
const activeNode = ref<UploadInputFormProp>(props.value)
</script>

<template>
  <div class="right-bar-setting--box">
    <FormItem :label="`宽度 ${activeNode.pos.pc.wType === '%' ? activeNode.pos.pc.w : ''}`">
      <SliderNode v-model:slider="activeNode.pos.pc.w" v-model:unit="activeNode.pos.pc.wType" />
    </FormItem>
    <FormItem label="显示隐藏" :var="`mpl.var.${activeNode.cid}_visible`" />
    <NodeLabel v-model="activeNode.label" :cid="activeNode.cid" />
    <div class="mpl-divider">输入框配置</div>
    <FormItem label="提示信息" var="mpl.rg5fv6.upload.placeholder">
      <InputNode v-model="activeNode.upload.placeholder" />
    </FormItem>
    <FormItem label="上传数量限制">
      <InputNumber v-model="activeNode.upload.limit" placeholder="默认无限制" />
    </FormItem>
    <FormItem label="可清空" var="mpl.rg5fv6.upload.clearable">
      <input v-model="activeNode.upload.clearable" type="checkbox" class="mpl-input">
    </FormItem>
    <FormItem label="必填">
      <input v-model="activeNode.upload.required" type="checkbox" class="mpl-input">
    </FormItem>
    <div class="mpl-divider">上传文件规则</div>
  </div>
</template>