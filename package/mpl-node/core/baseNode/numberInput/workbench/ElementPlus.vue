<script lang="ts" setup>
import { inject, ref, watch } from 'vue'
import { VISIBLE_NOTE, formContentPosClassName, labelPosWithClassName } from '../../../../libs'
import { NumberInputFormProp } from '../define'

const props = defineProps<{ node: NumberInputFormProp }>()
const inputValue = ref<string>(props.node.input.model || '0')

watch(
  () => props.node.input.model,
  (value: any) => {
    inputValue.value = value
  },
)

const visibleNote = inject(VISIBLE_NOTE, ref(false))
</script>

<template>
  <el-form-item theme="mpl" :required="props.node.input.required" class="mpl-form-item" :cid="props.node.cid"
    :class="[{ 'mpl-none': !props.node.label.show }, labelPosWithClassName.get(props.node.label.pos)]"
    :label-width="props.node.label.width === 0 ? 80 : props.node.label.width">
    <template #label>
      <div v-show="visibleNote" class="mpl-input--note mpl-note square-btn" mpl="note">
        2
      </div>
      <div v-show="props.node.label.show" class="mpl-label">
        <span :title="props.node.label.text">
          {{ props.node.label.text }}
        </span>
        <div v-if="props.node.label.icon" class="mpl-label-icon">
          <i class="mpl icon" :class="[props.node.label.icon]" :style="{ color: props.node.label.iconTheme }" />
        </div>
      </div>
    </template>
    <div class="mpl-content" :class="[formContentPosClassName.get(props.node.input.pos)]">
      <el-input-number v-model="inputValue" theme="mpl" controls-position="right"
        :style="{ width: props.node.input.width ? `${props.node.input.width}px` : '100%' }"
        :placeholder="props.node.input.placeholder" />
    </div>
    <template #error>
      <div class="mpl-form-item-error">
        错误信息提示
      </div>
    </template>
  </el-form-item>
</template>