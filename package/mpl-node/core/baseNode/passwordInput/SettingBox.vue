<script lang="ts" setup>
import { ref } from 'vue'
import { systemRuleOption } from "@mpl/const";
import { watchDebounced } from '@vueuse/core'
import FormItem from '../../../components/FormItem.vue'
import NodeLabel from '../../../components/NodeFormLabel.vue'
import { textAlignPosition, ruleOption, ruleTriggerOption } from "../../../libs";
import InputNumber from '../../../components/InputNumber.vue'
import InputNode from '../../../components/InputNode.vue'
import SliderNode from '../../../components/SliderNode.vue'
import RadioBtnGroup from '../../../components/RadioBtnGroup.vue'
import { PasswordInputFormProp } from './define'
import SlotBtnGroup from '../../../components/SlotBtnGroup.vue'

const props = defineProps<{ value: PasswordInputFormProp }>()
const emit = defineEmits(['changeNode'])
const activeNode = ref<PasswordInputFormProp>(props.value)

watchDebounced(activeNode.value, (val) => {
  emit('changeNode', val)
})

function removeRule(i: number) {
  activeNode.value.input.rules.splice(i, 1)
}

function addRule() {
  activeNode.value.input.rules.push({
    mod: 'system',
    trigger: ['blur'],
    option: [
      { value: 'required', message: '请输入' }
    ],
    message: ''
  })
}

</script>
<template>
  <div class="right-bar-setting--box">
    <FormItem :label="`宽度比例 ${activeNode.pos.pc.w}`">
      <SliderNode v-model="activeNode.pos.pc.w" />
    </FormItem>
    <NodeLabel v-model="activeNode.label" />
    <div class="mpl-divider" label="输入框配置"></div>
    <FormItem var="mpl.rg5fv6.input.text" label="初始值">
      <InputNode v-model="activeNode.input.model" />
    </FormItem>
    <FormItem label="输入宽度">
      <InputNode v-model="activeNode.input.width" />
    </FormItem>
    <FormItem v-if="activeNode.input.width" label="输入位置">
      <RadioBtnGroup v-model="activeNode.input.pos" :option="textAlignPosition" />
    </FormItem>
    <FormItem label="提示信息" var="mpl.rg5fv6.input.placeholder">
      <InputNode v-model="activeNode.input.placeholder" />
    </FormItem>
    <FormItem label="显示长度限制">
      <input type="checkbox" class="mpl-input" v-model="activeNode.input.showLimit" />
    </FormItem>
    <FormItem label="最大长度">
      <InputNumber v-model="activeNode.input.maxlength" />
    </FormItem>
    <FormItem v-model="activeNode.input.prefixIcon" var="mpl.rg5fv6.input.prefixIcon" label="前置图标" icon />
    <FormItem v-model="activeNode.input.suffixIcon" var="mpl.rg5fv6.input.suffixIcon" label="后置图标" icon />
    <FormItem label="可清空" var="mpl.rg5fv6.input.clearable">
      <input type="checkbox" class="mpl-input" v-model="activeNode.input.clearable" />
    </FormItem>
    <FormItem label="必填">
      <input type="checkbox" class="mpl-input" v-model="activeNode.input.required" />
    </FormItem>
    <div class="mpl-divider" label="密码输入规则"></div>
    <div class="form-block" v-for="(rule, i) in activeNode.input.rules">
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
    <SlotBtnGroup v-model="activeNode.slotBtn" :cid="activeNode.cid" />
  </div>
</template>

<style lang="less" scoped>
.right-bar-setting--box {
  padding: 5px;
  box-sizing: border-box;
  font-size: 12px;
}
</style>
