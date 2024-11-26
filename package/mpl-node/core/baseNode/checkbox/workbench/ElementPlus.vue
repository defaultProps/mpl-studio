<script lang="ts" setup>
import { inject, ref, watch } from 'vue'
import { VISIBLE_NOTE, formContentPosClassName, labelPosWithClassName } from '../../../../libs'
import { CheckboxFormProp, CheckboxNode } from '../define'

const props = defineProps<{ node: CheckboxFormProp }>()
const checkbox = ref<CheckboxNode>(props.node.checkbox)
const checkValue = ref<string[]>(props.node.checkbox.model)

watch(
  () => props.node.checkbox.model,
  (value: any) => {
    checkValue.value = value
  },
)

console.log(checkbox)

const visibleNote = inject(VISIBLE_NOTE, ref(false))

</script>

<template>
  <el-form-item theme="mpl" :required="props.node.checkbox.required" class="mpl-form-item" :cid="props.node.cid"
    :class="[{ 'mpl-none': !props.node.label.show }, labelPosWithClassName.get(props.node.label.pos)]"
    :label-width="props.node.label.width === 0 ? 80 : props.node.label.width">
    <template #label>
      <note-point v-if="visibleNote" />
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
      多选组件
    </div>
    <template #error>
      <div class="mpl-form-item-error">
        错误信息提示
      </div>
    </template>
  </el-form-item>
</template>
