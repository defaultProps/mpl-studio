<script lang="ts" setup>
import { inject, ref, watch } from 'vue'
import { VISIBLE_NOTE, formContentPosClassName, labelPosWithClassName } from '../../../../libs'
import { SingleInputFormProp } from '../define'
import notePoint from '../../../../components/NotePoint.vue'

const props = defineProps<{ node: SingleInputFormProp }>()
const inputValue = ref<string>(props.node.input.model || '')

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
    <div class="mpl-content" :class="[formContentPosClassName.get(props.node.input.pos)]">
      <el-input v-model="inputValue" theme="mpl" :autofocus="false" :show-word-limit="props.node.input.showLimit"
        :maxlength="props.node.input.maxlength"
        :style="{ width: props.node.input.width ? `${props.node.input.width}px` : '100%' }"
        :placeholder="props.node.input.placeholder" :clearable="props.node.input.clearable">
        <template #prefix>
          <i class="mpl icon" :class="[props.node.input.prefixIcon]" />
        </template>
        <template #suffix>
          <i class="icon" :class="[props.node.input.suffixIcon]" />
        </template>
      </el-input>
      <el-button v-for="slotBtn in props.node.slotBtn" :class="[slotBtn.icon, 'icon']">{{ slotBtn.title }}</el-button>
    </div>
    <template #error>
      <div class="mpl-form-item-error">
        错误信息提示
      </div>
    </template>
  </el-form-item>
</template>
<style lang="less" scoped>
.mpl-form-item .mpl-content > button {
  margin-left: 5px;
}
</style>
