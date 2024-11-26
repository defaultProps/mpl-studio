<script setup lang="ts">
import { systemRuleOption } from "@mpl/const"
import FormItem from './FormItem.vue'
import { ruleOption, ruleTriggerOption } from "../libs";
import { FormItemRule } from '@mpl/typings'
import RadioBtnGroup from './RadioBtnGroup.vue'

const rules = defineModel<FormItemRule[]>({ default: [] })

function addRule() {
  rules.value.push({
    mod: 'system',
    trigger: ['blur'],
    option: [
      { value: 'required', message: '请输入' }
    ],
    message: ''
  })
}

function removeRule(i: number) {
  rules.value.splice(i, 1)
}

</script>
<template>
  <div class="form-block" v-for="(rule, i) in rules">
    <FormItem label="规则类型">
      <RadioBtnGroup :option="ruleOption" v-model="rule.mod" />
    </FormItem>
    <template v-if="rule.mod === 'system'">
      <FormItem label="规则">
        <template v-for="opt in rule.option">
          <select v-model="opt.value" class="mpl-select">
            <option v-for="rule in systemRuleOption" :label="rule.label" :value="rule.value" :title="rule.message" />
          </select>
        </template>
      </FormItem>
    </template>
    <FormItem label="错误提示">
      <input class="mpl-input" placeholder="默认显示为：请输入" />
      <button class="icon-in1 icon mpl-btn ml-5"></button>
    </FormItem>
    <FormItem label="触发条件">
      <RadioBtnGroup :option="ruleTriggerOption" checkbox v-model="rule.trigger" />
    </FormItem>
    <FormItem label="操作">
      <button class="mpl-btn del-btn icon icon-close1" @click="removeRule(i)" />
      <button class="mpl-btn ml-5 icon icon-select5" />
    </FormItem>
  </div>
  <button class="mpl-btn plus-btn icon icon-plus" @click="addRule">添加规则</button>
</template>