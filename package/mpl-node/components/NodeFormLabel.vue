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
import { workbenchStore, userStore, viewStore } from '@mpl/store'
import I18nSub from './subSettingBox/I18nSub.vue'

const view = viewStore()
const user = userStore()
const id = useId()
const emit = defineEmits(['blur'])
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

function handleSelectI18n() {
  view.$patch({
    subBoxSettingModel: 'i18n',
    subBoxSettingModelId: id
  })
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
        <InputNode :model-value="label.iconTheme.toLocaleUpperCase()" :readonly="true" />
      </FormItem>
      <FormItem :var="`mpl.${props.cid}.label.icon.info`" label="图标信息">
        <InputNode v-model="label.iconText" />
        <button v-if="user.authority === 'enterprise'" type="button" class="icon-in1 icon mpl-btn ml-5"
          :class="{ 'is-active': view.subBoxSettingModel === 'i18n' && view.subBoxSettingModelId === id }"
          @click="handleSelectI18n" />
        <I18nSub v-if="view.subBoxSettingModel === 'i18n' && view.subBoxSettingModelId === id" v-model="label.iconText" />
      </FormItem>
    </template>
  </template>
</template>
