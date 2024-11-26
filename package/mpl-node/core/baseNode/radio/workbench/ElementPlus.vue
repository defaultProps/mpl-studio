<script lang="ts" setup>
import { ref, watch } from 'vue'
import { formContentPosClassName, labelPosWithClassName } from '../../../../libs'
import {
  type RadioBoxFormProp,
  type RadioBoxNode,
  getDefaultRadioOptions,
} from '../define'

const props = defineProps<{ node: RadioBoxFormProp }>()
const select = ref<RadioBoxNode>(props.node.radio)
const radioValue = ref<string>(props.node.radio.model)

watch(
  () => props.node.radio.model,
  (value: string) => {
    radioValue.value = value
  },
)
</script>

<template>
  <el-form-item theme="mpl" :required="select.required" class="mpl-form-item" :cid="props.node.cid" :class="[
    { 'mpl-none': !props.node.label.show },
    labelPosWithClassName.get(props.node.label.pos),
  ]" :label-width="props.node.label.width === 0 ? 80 : props.node.label.width">
    <template #label>
      <div v-show="props.node.label.show" class="mpl-label">
        <span :title="props.node.label.text">
          {{ props.node.label.text }}
        </span>
        <div v-if="props.node.label.icon" class="mpl-label-icon">
          <i class="mpl icon" :class="[props.node.label.icon]" :style="{ color: props.node.label.iconTheme }" />
        </div>
      </div>
    </template>
    <div class="mpl-content" :class="[formContentPosClassName.get(select.pos)]">
      <el-radio-group v-model="radioValue" class="ml-4">
        <template v-for="p in getDefaultRadioOptions()" :key="p.value">
          <el-radio v-if="select.service.mode === 'static'" :value="p.value">{{ p.label }}</el-radio>
          <div v-else class="service-dynamic">
            动态数据，预览生效
          </div>
        </template>
      </el-radio-group>
    </div>
    <template #error>
      <div class="mpl-form-item-error">
        错误信息提示
      </div>
    </template>
  </el-form-item>
</template>

<style lang="less">
.service-dynamic {
  width: 100%;
  text-align: center;
  user-select: none;
  color: #666;
  font-size: 12px;
}
</style>
