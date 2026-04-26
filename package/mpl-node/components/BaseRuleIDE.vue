<script setup lang="ts">
import FormItem from './FormItem.vue'
import { ruleOption, ruleTriggerOption } from '../libs'
import { FormItemRule } from '@mpl/typings'
import RadioBtnGroup from './RadioBtnGroup.vue'
import CustomValidate from './subSettingBox/CustomValidate.vue'
import { viewStore, userStore } from '@mpl/store'
import type { SUB_BOX_SETTING_MODEL } from '@mpl/typings'
import { useId } from 'vue'

const user = userStore()
const rule = defineModel<FormItemRule>({ default: { type: 'system', option: [] } })
const props = defineProps<{ options: any[] }>()
const view = viewStore()
const id = useId()

function addRule() {
  rule.value.option.push({
    type: 'required',
    trigger: ['blur'],
    message: ''
  })
}

function removeRule(i: number) {
  rule.value.option.splice(i, 1)
}

function locationIDEByMethodName() {
  //
}

function changeRule(icon: string) {
  if (view.subBoxSettingModel === 'iconSelect' && view.subBoxSettingModelId === id) {
    changeSubBoxSetting('')
  }
}

function changeSubBoxSetting(model: SUB_BOX_SETTING_MODEL) {
  view.$patch({
    subBoxSettingModel: model,
    subBoxSettingModelId: model === '' ? '' : id
  })
}
</script>
<template>
  <FormItem label="规则类型">
    <RadioBtnGroup v-model="rule.type" :option="ruleOption" :disabled="user.authority !== 'enterprise'"
      @change="changeRule" />
  </FormItem>
  <template v-if="rule.type === 'system'">
    <div v-for="(r, i) in rule.option" class="mpl-sub-form-block">
      <FormItem label="规则">
        <select v-model="r.type" class="mpl-select">
          <option v-for="p in props.options" :label="p.label" :value="p.value" :title="p.message" />
        </select>
      </FormItem>
      <FormItem label="错误提示">
        <input v-model="r.message" autocomplete="off" class="mpl-input" maxlength="100">
        <button v-if="user.authority === 'enterprise'" type="button" class="icon-in1 icon mpl-btn ml-5" />
      </FormItem>
      <FormItem label="触发条件">
        <RadioBtnGroup v-model="r.trigger" :option="ruleTriggerOption" checkbox />
      </FormItem>
      <FormItem label="操作">
        <div>
          <button type="button" class="mpl-btn del-btn icon icon-close1" @click="removeRule(i)" />
          <button v-if="i !== 0" type="button" class="mpl-btn ml-2 icon icon-top" />
          <button v-if="i !== rule.option.length - 1" type="button" class="mpl-btn ml-2 icon icon-bottom" />
          <button type="button" class="mpl-btn ml-2 icon icon-select5" />
        </div>
      </FormItem>
    </div>
    <button type="button" class="mpl-btn plus-btn icon icon-plus" :disabled="rule.option.length >= 5" @click="addRule">
      添加规则
    </button>
  </template>
  <FormItem v-else label="自定义校验">
    <CustomValidate v-if="view.subBoxSettingModel === 'iconSelect' && view.subBoxSettingModelId === id"
      @change="changeRule" @cancel="changeSubBoxSetting('')" />
    <button class="mpl-btn ml-2 icon icon-select5" type="button" @click="locationIDEByMethodName" />
  </FormItem>
</template>