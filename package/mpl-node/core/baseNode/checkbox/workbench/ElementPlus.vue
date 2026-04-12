<script lang="ts" setup>
import { inject, ref, watch } from 'vue'
import { formContentPosClassName, labelPosWithClassName } from '../../../../libs'
import { CheckboxFormProp, CheckboxNode } from '../define'

const props = defineProps<{ node: CheckboxFormProp }>()
const checkbox = ref<CheckboxNode>(props.node.checkbox)
const checkValue = ref<string[]>(props.node.checkbox.model)

watch(
  () => props.node.checkbox.model,
  (value: string[]) => {
    checkValue.value = value
  }
)
</script>

<template>
  <el-form-item theme="mpl" :required="props.node.checkbox.required" class="mpl-form-item" :cid="props.node.cid"
    :class="[{ 'mpl-none': !props.node.label.show }, labelPosWithClassName.get(props.node.label.pos)]"
    :label-width="props.node.label.width === 0 ? 80 : props.node.label.width">
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
    <div class="mpl-content" :class="[formContentPosClassName.get(props.node.checkbox.pos)]">
      <el-checkbox-group v-model="props.node.checkbox.model">
        <el-checkbox value="1">
          北京
        </el-checkbox>
        <el-checkbox value="2">
          上海
        </el-checkbox>
        <el-checkbox value="3">
          广州
        </el-checkbox>
        <el-checkbox value="1">
          深圳
        </el-checkbox>
      </el-checkbox-group>
    </div>
    <template #error>
      <div class="mpl-form-item-error">
        错误信息提示
      </div>
    </template>
  </el-form-item>
</template>
