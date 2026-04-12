<script lang="ts" setup>
import { ref, useId } from 'vue'
import { FormLabelProp } from '@mpl/typings'
import { textAlignPosition } from '../libs/constant'
import FormItem from './FormItem.vue'
import InputNumber from './InputNumber.vue'
import InputNode from './InputNode.vue'
import RadioBtnGroup from './RadioBtnGroup.vue'
import FormIconItem from './FormIconItem.vue'
import FormItemSingle from './FormItemSingle.vue'
import FormItemLabelI18n from './FormItemLabelI18n.vue'
import { workbenchStore } from '@mpl/store'

const props = defineProps<{ cid: string }>()
const label = defineModel<FormLabelProp>({ default: {} })
const mpl_zh = defineModel<string>('mpl_zh')
const labelWidth = ref<number | ''>(label.value.width)
const labelText = ref<string>(label.value.text)

function blurLabelWidth() {
  label.value.width = labelWidth.value || ''
}

function blueLabelText() {
  // 更新事件列表名称
  workbenchStore().updateEventNodeListByNameText({
    labelText: labelText.value,
    cid: props.cid
  })
  label.value.text = mpl_zh.value = labelText.value
}
</script>

<template>
  <div class="mpl-divider">标题配置</div>
  <FormItemSingle :var="`mpl.${props.cid}.label.show`" label="显示标题">
    <input v-model="label.show" type="checkbox" class="mpl-input" autocomplete="off">
  </FormItemSingle>
  <template v-if="label.show">
    <FormItemLabelI18n v-model="labelText" label="标题名称" :var="`mpl.${props.cid}.label.text`" @blur="blueLabelText" />
    <FormItem label="标题宽度">
      <InputNumber v-model="labelWidth" @blur="blurLabelWidth" />
    </FormItem>
    <FormItemSingle label="标题位置">
      <RadioBtnGroup v-model="label.pos" :option="textAlignPosition" />
    </FormItemSingle>
    <FormIconItem v-model="label.icon" label="图标" :style="{ color: label.iconTheme || '' }" />
    <template v-if="label.icon">
      <!-- 使用第三方库支持颜色选择-透明度, 已使用颜色, 常用颜色等 -->
      <FormItem label="图标颜色">
        <input v-model="label.iconTheme" type="color" class="mpl-input mr-5" autocomplete="off">
        <InputNode v-model="label.iconTheme" :readonly="true" />
      </FormItem>
      <FormItem :var="`mpl.${props.cid}.label.icon.info`" label="图标信息">
        <InputNode v-model="label.iconText" />
        <button type="button" class="icon-in1 icon mpl-btn ml-5" />
      </FormItem>
    </template>
  </template>
</template>
