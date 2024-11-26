<script lang="ts" setup>
/**
 * @desc: 仅适用于表单组件标题配置
 */
import { ref, watch } from 'vue'
import { FormLabelProp } from '@mpl/typings'
import { textAlignPosition } from '../libs/constant'
import FormItem from './FormItem.vue'
import InputNumber from './InputNumber.vue'
import InputNode from './InputNode.vue'
import RadioBtnGroup from './RadioBtnGroup.vue'

const props = defineProps<{ modelValue: FormLabelProp }>()
const emit = defineEmits(['input'])
const labelWidth = ref<number | ''>(props.modelValue.width)
const label = ref<FormLabelProp>(props.modelValue)
const labelText = ref<string>(label.value.text)
function blurLabelWidth() {
  label.value.width = labelWidth.value || ''
}

function blueLabelText() {
  label.value.text = labelText.value || ''
}

watch(label, (val) => {
  emit('input', val)
})
</script>

<template>
  <div class="mpl-divider" label="标题配置"></div>
  <FormItem var="mpl.rg5fv6.label.show" label="显示标题">
    <input type="checkbox" class="mpl-input" v-model="label.show" />
  </FormItem>
  <template v-if="label.show">
    <FormItem var="mpl.rg5fv6.label.text" label="标题名称">
      <InputNode v-model="labelText" @blur="blueLabelText" />
      <button class="icon-in1 icon mpl-btn ml-5"></button>
    </FormItem>
    <FormItem label="标题宽度">
      <InputNumber v-model="labelWidth" @blur="blurLabelWidth" />
    </FormItem>
    <FormItem label="标题位置">
      <RadioBtnGroup v-model="label.pos" :option="textAlignPosition" />
    </FormItem>
    <FormItem v-model="label.icon" label="图标" icon />
    <template v-if="label.icon">
      <FormItem label="图标颜色">
        <input type="color" class="mpl-input mr-5" v-model="label.iconTheme" />
        <InputNode v-model="label.iconTheme" :readonly="true" />
      </FormItem>
      <FormItem var="mpl.rg5fv6.label.icon.info" label="图标信息">
        <InputNode v-model="label.iconText" />
        <button class="icon-in1 icon mpl-btn ml-5"></button>
      </FormItem>
    </template>
  </template>
</template>
